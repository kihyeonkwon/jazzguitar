'use client'

import { getDrillScore } from '@/lib/progress/drills'
import {
  getLeafScore,
  getLeafLastActivity,
} from '@/lib/progress/store'
import { trunks } from '@/lib/curriculum/organic'
import type { Leaf } from '@/lib/curriculum/types'

// 트렁크 슬러그 → 학습 순서 (낮을수록 먼저)
const TRUNK_ORDER: Record<string, number> = Object.fromEntries(
  trunks.map(t => [t.slug, t.order])
)

const ALL_DRILLS = [
  'fretboard-find',
  'interval-ear',
  'chord-quality-ear',
  'voicing-find',
  'chord-tone-id',
  'chord-construction',
  'scale-construction',
]

const LAST_DRILL_KEY = 'jazz-guitar-last-daily-drill'

/**
 * 오늘의 드릴 선택 알고리즘
 *  - 점수 가장 낮은 드릴 우선 (안 한 드릴은 점수 0으로 취급)
 *  - 동률 → 마지막 플레이가 오래된 것 우선
 *  - 직전 세션에 본 드릴은 제외 (반복 회피)
 */
export function pickTodaysDrill(): string {
  const lastShown = typeof window !== 'undefined'
    ? localStorage.getItem(LAST_DRILL_KEY)
    : null

  const candidates = ALL_DRILLS.filter(d => d !== lastShown)
  const pool = candidates.length > 0 ? candidates : ALL_DRILLS

  const ranked = pool
    .map(type => {
      const s = getDrillScore(type)
      return {
        type,
        score:        s?.bestScore ?? 0,
        lastPlayedAt: s?.lastPlayedAt ?? '1970-01-01',
        totalPlayed:  s?.totalPlayed ?? 0,
      }
    })
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score
      // 점수 같으면 totalPlayed 적은 것 (덜 친숙한 것)
      if (a.totalPlayed !== b.totalPlayed) return a.totalPlayed - b.totalPlayed
      // 그래도 같으면 오래된 것
      return new Date(a.lastPlayedAt).getTime() - new Date(b.lastPlayedAt).getTime()
    })

  return ranked[0]?.type ?? ALL_DRILLS[0]
}

export function rememberTodaysDrill(type: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LAST_DRILL_KEY, type)
}

/**
 * 오늘의 잎 선택
 *  - 점수 < 100 인 잎 중에서
 *  - 점수가 0이 아닌(시작은 한) 것 우선 + 점수 가장 낮은 것
 *  - 만약 시작한 잎이 없으면 첫 트렁크의 첫 잎
 */
export function pickTodaysLeaf(allLeaves: Leaf[]): Leaf | null {
  if (allLeaves.length === 0) return null

  const scored = allLeaves.map(leaf => {
    const score = getLeafScore(
      leaf.slug,
      leaf.checkpoints,
      leaf.selfCheck.length,
    )
    return {
      leaf,
      score,
      lastActivity: getLeafLastActivity(leaf.slug),
    }
  })

  // 진행 중인 잎 (score > 0 and score < 100)
  const inProgress = scored
    .filter(x => x.score > 0 && x.score < 100)
    .sort((a, b) => {
      if (a.score !== b.score) return a.score - b.score
      // 점수 같으면 오래된 활동 우선
      const at = a.lastActivity ? new Date(a.lastActivity).getTime() : 0
      const bt = b.lastActivity ? new Date(b.lastActivity).getTime() : 0
      return at - bt
    })

  if (inProgress.length > 0) return inProgress[0].leaf

  // 진행 중인 잎이 없으면 → 첫 잎 (시작하지 않은 것 중 첫 번째)
  const fresh = scored.filter(x => x.score === 0)
  if (fresh.length > 0) {
    // 트렁크 학습 순서 (Foundation = 1, Blues = 2...) → 잎 order 순
    fresh.sort((a, b) => {
      const ta = TRUNK_ORDER[a.leaf.trunkSlug] ?? 99
      const tb = TRUNK_ORDER[b.leaf.trunkSlug] ?? 99
      if (ta !== tb) return ta - tb
      return a.leaf.order - b.leaf.order
    })
    return fresh[0].leaf
  }

  // 전부 100점 → null (졸업!)
  return null
}

export const DRILL_LABELS: Record<string, string> = {
  'fretboard-find':      '지판 음 찾기',
  'interval-ear':        '인터벌 청음',
  'chord-quality-ear':   '코드 퀄리티 청음',
  'voicing-find':        '보이싱 찾기',
  'chord-tone-id':       '코드톤 식별',
  'chord-construction':  '코드 구구단',
  'scale-construction':  '스케일 구구단',
}
