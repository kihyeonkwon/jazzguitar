'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { Stat } from '@/components/ui'
import {
  getCurrentLevel,
  getDrillScore,
  levelLabel,
  CurrentLevelInfo,
  DrillLevel,
  LevelAchievement,
  DRILL_SCORES_EVENT,
} from '@/lib/progress/drills'

const EMPTY: Snapshot = {
  level: null,
  avgCpm: null,
  avgAccuracy: null,
  trend: null,
  roundsAnalyzed: 0,
  accuracyGated: false,
  achievements: [],
}

interface Snapshot extends CurrentLevelInfo {
  achievements: LevelAchievement[]
}

const LEVEL_TIERS: DrillLevel[] = ['proficient', 'fluent', 'master']

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', cb)
  window.addEventListener(DRILL_SCORES_EVENT, cb)
  return () => {
    window.removeEventListener('storage', cb)
    window.removeEventListener(DRILL_SCORES_EVENT, cb)
  }
}

function makeSnapshot(drillType: string) {
  let lastKey = ''
  let lastValue: Snapshot = EMPTY
  return () => {
    const level = getCurrentLevel(drillType)
    const stored = getDrillScore(drillType)
    const achievements = stored?.achievements ?? []
    const achievementKey = achievements
      .map((a) => `${a.level}:${a.at}`)
      .join(',')
    const key = `${level.level}|${level.avgCpm}|${level.avgAccuracy}|${level.trend}|${level.roundsAnalyzed}|${level.accuracyGated}|${achievementKey}`
    if (key !== lastKey) {
      lastKey = key
      lastValue = { ...level, achievements }
    }
    return lastValue
  }
}

function trendIcon(t: CurrentLevelInfo['trend']): string {
  if (t === 'up') return ' ↑'
  if (t === 'down') return ' ↓'
  if (t === 'flat') return ' →'
  return ''
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 10)
  } catch {
    return ''
  }
}

export default function DrillLibraryStats({ drillType }: { drillType: string }) {
  const getSnapshot = useMemo(() => makeSnapshot(drillType), [drillType])
  const info = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)

  const achievementsByLevel = new Map<DrillLevel, LevelAchievement>()
  for (const a of info.achievements) achievementsByLevel.set(a.level, a)

  if (info.roundsAnalyzed === 0) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Level" value="—" hint="아직 기록 없음" />
          <Stat label="CPM" value="—" />
        </div>
        <AchievementRow achievementsByLevel={achievementsByLevel} />
      </div>
    )
  }

  const levelText = info.level
    ? levelLabel(info.level) + (info.accuracyGated ? '*' : '')
    : '측정중'
  const cpmText = info.avgCpm != null ? `${info.avgCpm}${trendIcon(info.trend)}` : '—'
  const accHint =
    info.avgAccuracy != null
      ? `정확도 ${Math.round(info.avgAccuracy * 100)}%`
      : undefined

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Stat
          label="Level"
          value={levelText}
          hint={
            info.roundsAnalyzed < 3
              ? `${info.roundsAnalyzed}/3회 측정중`
              : info.accuracyGated
              ? '정확도 미달 강등'
              : `최근 ${info.roundsAnalyzed}회 평균`
          }
        />
        <Stat label="CPM" value={cpmText} hint={accHint} />
      </div>
      <AchievementRow achievementsByLevel={achievementsByLevel} />
    </div>
  )
}

function AchievementRow({
  achievementsByLevel,
}: {
  achievementsByLevel: Map<DrillLevel, LevelAchievement>
}) {
  return (
    <div className="flex items-center gap-2 pt-2 border-t border-rule">
      <span className="eyebrow text-[10px]">달성</span>
      <div className="flex gap-1.5 flex-wrap">
        {LEVEL_TIERS.map((lvl) => {
          const a = achievementsByLevel.get(lvl)
          const reached = !!a
          return (
            <span
              key={lvl}
              title={a ? `${formatDate(a.at)} · ${a.cpm} CPM` : '미달성'}
              className={`text-[10px] font-mono tracking-widest px-1.5 py-0.5 border ${
                reached
                  ? 'border-ink bg-ink text-ink-inv'
                  : 'border-rule text-ink-faint'
              }`}
            >
              {levelLabel(lvl)}
            </span>
          )
        })}
      </div>
    </div>
  )
}
