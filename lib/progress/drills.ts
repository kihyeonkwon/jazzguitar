'use client'

export interface DrillScore {
  drillType: string
  bestScore: number     // 0-100 (정답률 또는 시간 내 카운트)
  bestTime?: number     // 초 단위 (시간 기반 드릴용)
  lastPlayedAt: string  // ISO
  totalPlayed: number
}

const STORAGE_KEY = 'jazz-guitar-drill-scores'
export const DRILL_SCORES_EVENT = 'jazz-guitar-drill-scores-change'

type DrillScoreMap = Record<string, DrillScore>

function emitDrillScoresChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(DRILL_SCORES_EVENT))
}

function readMap(): DrillScoreMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as DrillScoreMap) : {}
  } catch {
    return {}
  }
}

function writeMap(map: DrillScoreMap): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  emitDrillScoresChange()
}

export function getDrillScore(drillType: string): DrillScore | null {
  return readMap()[drillType] ?? null
}

export function getAllDrillScores(): DrillScore[] {
  return Object.values(readMap())
}

export function saveDrillScore(drillType: string, score: number, time?: number): void {
  const map = readMap()
  const existing = map[drillType]
  const next: DrillScore = {
    drillType,
    bestScore: existing ? Math.max(existing.bestScore, score) : score,
    bestTime:
      time !== undefined
        ? existing?.bestTime !== undefined
          ? Math.min(existing.bestTime, time)
          : time
        : existing?.bestTime,
    lastPlayedAt: new Date().toISOString(),
    totalPlayed: (existing?.totalPlayed ?? 0) + 1,
  }
  map[drillType] = next
  writeMap(map)
}
