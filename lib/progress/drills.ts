'use client'

export interface DrillRound {
  at: string
  correct: number
  total: number
  durationSec: number
  cpm: number
}

export type DrillLevel = 'beginner' | 'proficient' | 'fluent' | 'master'

export interface LevelAchievement {
  level: DrillLevel
  at: string
  cpm: number
  accuracy: number
}

export interface DrillScore {
  drillType: string
  bestScore: number
  bestTime?: number
  bestCpm: number
  lastPlayedAt: string
  totalPlayed: number
  history: DrillRound[]
  achievements: LevelAchievement[]
}

const STORAGE_KEY = 'jazz-guitar-drill-scores'
export const DRILL_SCORES_EVENT = 'jazz-guitar-drill-scores-change'
const HISTORY_LIMIT = 20

const LEVEL_ORDER: DrillLevel[] = ['beginner', 'proficient', 'fluent', 'master']

const LEVEL_LABELS: Record<DrillLevel, string> = {
  beginner: '입문',
  proficient: '숙련',
  fluent: '유창',
  master: '마스터',
}

// CPM(분당 정답) 임계값 — 각 등급으로 진입하는 최소값
export const DRILL_THRESHOLDS: Record<string, Record<DrillLevel, number>> = {
  'fretboard-find':     { beginner: 0, proficient: 12, fluent: 20, master: 35 },
  'interval-ear':       { beginner: 0, proficient: 4,  fluent: 8,  master: 12 },
  'chord-quality-ear':  { beginner: 0, proficient: 5,  fluent: 10, master: 15 },
  'voicing-find':       { beginner: 0, proficient: 3,  fluent: 6,  master: 10 },
  'chord-tone-id':      { beginner: 0, proficient: 8,  fluent: 15, master: 25 },
  'chord-construction': { beginner: 0, proficient: 6,  fluent: 12, master: 20 },
  'scale-construction': { beginner: 0, proficient: 5,  fluent: 10, master: 18 },
  'drop-voicing-misty': { beginner: 0, proficient: 8,  fluent: 14, master: 22 },
}

// 등급 인정 정확도 게이트: 90% 이상이어야 해당 라운드 CPM이 등급 산정·달성기록에 반영
export const ACCURACY_GATE = 0.9

type DrillScoreMap = Record<string, DrillScore>

function emitChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(DRILL_SCORES_EVENT))
}

function readMap(): DrillScoreMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, Partial<DrillScore>>
    const out: DrillScoreMap = {}
    for (const [k, v] of Object.entries(parsed)) {
      out[k] = {
        drillType: v.drillType ?? k,
        bestScore: v.bestScore ?? 0,
        bestTime: v.bestTime,
        bestCpm: v.bestCpm ?? 0,
        lastPlayedAt: v.lastPlayedAt ?? new Date(0).toISOString(),
        totalPlayed: v.totalPlayed ?? 0,
        history: Array.isArray(v.history) ? v.history : [],
        achievements: Array.isArray(v.achievements) ? v.achievements : [],
      }
    }
    return out
  } catch {
    return {}
  }
}

function writeMap(map: DrillScoreMap): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  emitChange()
}

export function getDrillScore(drillType: string): DrillScore | null {
  return readMap()[drillType] ?? null
}

export function getAllDrillScores(): DrillScore[] {
  return Object.values(readMap())
}

export function computeCpm(correct: number, durationSec: number): number {
  if (durationSec <= 0) return 0
  return (correct * 60) / durationSec
}

export function levelForCpm(drillType: string, cpm: number): DrillLevel {
  const t = DRILL_THRESHOLDS[drillType]
  if (!t) return 'beginner'
  if (cpm >= t.master) return 'master'
  if (cpm >= t.fluent) return 'fluent'
  if (cpm >= t.proficient) return 'proficient'
  return 'beginner'
}

export function levelLabel(level: DrillLevel): string {
  return LEVEL_LABELS[level]
}

export function nextLevelTarget(
  drillType: string,
  currentCpm: number
): { next: DrillLevel; cpm: number } | null {
  const t = DRILL_THRESHOLDS[drillType]
  if (!t) return null
  if (currentCpm < t.proficient) return { next: 'proficient', cpm: t.proficient }
  if (currentCpm < t.fluent) return { next: 'fluent', cpm: t.fluent }
  if (currentCpm < t.master) return { next: 'master', cpm: t.master }
  return null
}

export interface SaveRoundInput {
  correct: number
  total: number
  durationSec: number
}

export function saveDrillRound(drillType: string, input: SaveRoundInput): void {
  const map = readMap()
  const existing = map[drillType]
  const cpm = computeCpm(input.correct, input.durationSec)
  const accuracy = input.total > 0 ? input.correct / input.total : 0
  const at = new Date().toISOString()

  const round: DrillRound = {
    at,
    correct: input.correct,
    total: input.total,
    durationSec: Math.round(input.durationSec * 10) / 10,
    cpm: Math.round(cpm * 10) / 10,
  }

  const history = [...(existing?.history ?? []), round].slice(-HISTORY_LIMIT)

  // 등급 첫 달성 기록 — 정확도 게이트 통과 라운드만
  const achievements = [...(existing?.achievements ?? [])]
  if (accuracy >= ACCURACY_GATE) {
    const reached = levelForCpm(drillType, cpm)
    const reachedIdx = LEVEL_ORDER.indexOf(reached)
    for (let i = 1; i <= reachedIdx; i++) {
      const lvl = LEVEL_ORDER[i]
      if (!achievements.some((a) => a.level === lvl)) {
        achievements.push({
          level: lvl,
          at,
          cpm: round.cpm,
          accuracy: Math.round(accuracy * 100) / 100,
        })
      }
    }
  }

  // legacy bestScore: fretboard-find은 카운트, 나머지는 정확도(%)
  const legacyScore =
    drillType === 'fretboard-find' ? input.correct : Math.round(accuracy * 100)

  const next: DrillScore = {
    drillType,
    bestScore: Math.max(existing?.bestScore ?? 0, legacyScore),
    bestTime:
      existing?.bestTime !== undefined
        ? Math.min(existing.bestTime, input.durationSec)
        : input.durationSec,
    bestCpm:
      accuracy >= ACCURACY_GATE
        ? Math.max(existing?.bestCpm ?? 0, round.cpm)
        : existing?.bestCpm ?? 0,
    lastPlayedAt: at,
    totalPlayed: (existing?.totalPlayed ?? 0) + 1,
    history,
    achievements,
  }

  map[drillType] = next
  writeMap(map)
}

export interface CurrentLevelInfo {
  level: DrillLevel | null  // null = 측정 데이터 부족
  avgCpm: number | null
  avgAccuracy: number | null
  trend: 'up' | 'flat' | 'down' | null
  roundsAnalyzed: number
  accuracyGated: boolean    // 정확도 게이트 미달로 강등됐는지
}

const MIN_ROUNDS_FOR_LEVEL = 3
const WINDOW = 5

export function getCurrentLevel(drillType: string): CurrentLevelInfo {
  const score = getDrillScore(drillType)
  const empty: CurrentLevelInfo = {
    level: null,
    avgCpm: null,
    avgAccuracy: null,
    trend: null,
    roundsAnalyzed: 0,
    accuracyGated: false,
  }
  if (!score || score.history.length === 0) return empty

  const recent = score.history.slice(-WINDOW)
  const sumCpm = recent.reduce((s, r) => s + r.cpm, 0)
  const sumCorrect = recent.reduce((s, r) => s + r.correct, 0)
  const sumTotal = recent.reduce((s, r) => s + r.total, 0)
  const avgCpm = sumCpm / recent.length
  const avgAccuracy = sumTotal > 0 ? sumCorrect / sumTotal : 0

  let level: DrillLevel | null = null
  let gated = false
  if (recent.length >= MIN_ROUNDS_FOR_LEVEL) {
    level = levelForCpm(drillType, avgCpm)
    if (level !== 'beginner' && avgAccuracy < ACCURACY_GATE) {
      const idx = LEVEL_ORDER.indexOf(level)
      level = LEVEL_ORDER[Math.max(0, idx - 1)]
      gated = true
    }
  }

  let trend: 'up' | 'flat' | 'down' | null = null
  if (score.history.length >= 6) {
    const lastN = score.history.slice(-3)
    const prevN = score.history.slice(-6, -3)
    const lastAvg = lastN.reduce((s, r) => s + r.cpm, 0) / lastN.length
    const prevAvg = prevN.reduce((s, r) => s + r.cpm, 0) / prevN.length
    const delta = lastAvg - prevAvg
    const threshold = Math.max(prevAvg * 0.05, 0.5)
    trend = delta > threshold ? 'up' : delta < -threshold ? 'down' : 'flat'
  }

  return {
    level,
    avgCpm: Math.round(avgCpm * 10) / 10,
    avgAccuracy: Math.round(avgAccuracy * 1000) / 1000,
    trend,
    roundsAnalyzed: recent.length,
    accuracyGated: gated,
  }
}

// 약점 드릴 선택용 — master 임계값 기준 상대 점수(0 ~ 1+)
export function getRelativeStrength(drillType: string): number {
  const info = getCurrentLevel(drillType)
  if (info.avgCpm == null) return 0
  const t = DRILL_THRESHOLDS[drillType]
  if (!t || t.master <= 0) return 0
  return info.avgCpm / t.master
}
