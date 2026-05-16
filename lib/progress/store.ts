'use client'

import { Progress, TopicProgress } from './types'

const STORAGE_KEY = 'jazz-guitar-progress'
export const PROGRESS_STORE_EVENT = 'jazz-guitar-progress-change'

function emitProgressStoreChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(PROGRESS_STORE_EVENT))
}

export function getProgress(): Progress {
  if (typeof window === 'undefined') return { topics: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { topics: {} }
    return JSON.parse(raw) as Progress
  } catch {
    return { topics: {} }
  }
}

export function saveProgress(progress: Progress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  emitProgressStoreChange()
}

export function getTopicProgress(topicId: string): TopicProgress {
  const progress = getProgress()
  return (
    progress.topics[topicId] ?? {
      topicId,
      completedCheckpoints: [],
      started: false,
      completed: false,
    }
  )
}

export function markTopicStarted(topicId: string): void {
  const progress = getProgress()
  if (!progress.topics[topicId]) {
    progress.topics[topicId] = {
      topicId,
      completedCheckpoints: [],
      started: true,
      completed: false,
      startedAt: new Date().toISOString(),
    }
  } else {
    progress.topics[topicId].started = true
    if (!progress.topics[topicId].startedAt) {
      progress.topics[topicId].startedAt = new Date().toISOString()
    }
  }
  saveProgress(progress)
}

export function toggleCheckpoint(topicId: string, checkpointIndex: number, totalCheckpoints: number): void {
  const progress = getProgress()
  if (!progress.topics[topicId]) {
    progress.topics[topicId] = {
      topicId,
      completedCheckpoints: [],
      started: true,
      completed: false,
    }
  }
  const tp = progress.topics[topicId]
  const idx = tp.completedCheckpoints.indexOf(checkpointIndex)
  if (idx >= 0) {
    tp.completedCheckpoints.splice(idx, 1)
  } else {
    tp.completedCheckpoints.push(checkpointIndex)
  }
  tp.completed = tp.completedCheckpoints.length === totalCheckpoints
  if (tp.completed && !tp.completedAt) {
    tp.completedAt = new Date().toISOString()
  }
  if (!tp.completed) {
    tp.completedAt = undefined
  }
  saveProgress(progress)
}

export function getCompletedTopicIds(): string[] {
  const progress = getProgress()
  return Object.values(progress.topics)
    .filter(tp => tp.completed)
    .map(tp => tp.topicId)
}

export function getStartedTopicIds(): string[] {
  const progress = getProgress()
  return Object.values(progress.topics)
    .filter(tp => tp.started && !tp.completed)
    .map(tp => tp.topicId)
}

// ─── Self-check (Leaf 단위 체크박스) 영속화 ────────────────────────────
const SELFCHECK_KEY = 'jazz-guitar-selfcheck'

type SelfCheckMap = Record<string, Record<number, boolean>>

function getSelfCheckMap(): SelfCheckMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(SELFCHECK_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveSelfCheckMap(map: SelfCheckMap): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SELFCHECK_KEY, JSON.stringify(map))
  emitProgressStoreChange()
}

export function getLeafSelfCheck(leafSlug: string): Record<number, boolean> {
  return getSelfCheckMap()[leafSlug] ?? {}
}

export function toggleLeafSelfCheck(leafSlug: string, index: number): void {
  const map = getSelfCheckMap()
  if (!map[leafSlug]) map[leafSlug] = {}
  map[leafSlug][index] = !map[leafSlug][index]
  saveSelfCheckMap(map)
}

export function getLeafProgress(leafSlug: string, total: number): { done: number; total: number; ratio: number } {
  const checks = getLeafSelfCheck(leafSlug)
  const done = Object.values(checks).filter(Boolean).length
  return { done, total, ratio: total === 0 ? 0 : done / total }
}

export function isLeafCompleted(leafSlug: string, total: number): boolean {
  if (total === 0) return false
  return getLeafProgress(leafSlug, total).done >= total
}

export function getCompletedLeafSlugs(allLeaves: Array<{ slug: string; selfCheck: unknown[] }>): string[] {
  return allLeaves
    .filter(l => isLeafCompleted(l.slug, l.selfCheck.length))
    .map(l => l.slug)
}

// ─── Leveled checkpoint progress (Bronze/Silver/Gold/Master) ─────────
// 키 형식: `${leafSlug}__${level}` (예: blues-1-chorus-pentatonic__Bronze)

export function getLeafLevelKey(leafSlug: string, level: string): string {
  return `${leafSlug}__${level}`
}

export function getLeafLevelChecks(leafSlug: string, level: string): Record<number, boolean> {
  return getSelfCheckMap()[getLeafLevelKey(leafSlug, level)] ?? {}
}

export function toggleLeafLevelCheck(leafSlug: string, level: string, index: number): void {
  const map = getSelfCheckMap()
  const key = getLeafLevelKey(leafSlug, level)
  if (!map[key]) map[key] = {}
  map[key][index] = !map[key][index]
  saveSelfCheckMap(map)
}

interface LevelGroup { level: string; weight: number; items: unknown[] }

/**
 * 잎의 0~100점 점수를 계산합니다.
 * - 새 shape (checkpoints[]) 있으면 가중치 합산
 * - 없으면 legacy selfCheck 비율 × 100
 */
export function getLeafScore(
  leafSlug: string,
  checkpoints?: LevelGroup[],
  legacySelfCheckLen: number = 0,
): number {
  if (checkpoints && checkpoints.length > 0) {
    let total = 0
    for (const g of checkpoints) {
      if (g.items.length === 0) continue
      const checks = getLeafLevelChecks(leafSlug, g.level)
      const done = Object.values(checks).filter(Boolean).length
      total += (done / g.items.length) * g.weight
    }
    return Math.round(total)
  }
  // legacy fallback
  if (legacySelfCheckLen === 0) return 0
  const checks = getLeafSelfCheck(leafSlug)
  const done = Object.values(checks).filter(Boolean).length
  return Math.round((done / legacySelfCheckLen) * 100)
}

/**
 * 잎의 마지막 활동 시각 (ISO). 체크 한 항목 중 가장 최근.
 * 데이터 없으면 null.
 */
export function getLeafLastActivity(leafSlug: string): string | null {
  // 현재 selfCheckMap에는 timestamp가 없으므로, 별도 키로 추적
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(`leaf-activity:${leafSlug}`)
    return raw
  } catch {
    return null
  }
}

export function touchLeafActivity(leafSlug: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(`leaf-activity:${leafSlug}`, new Date().toISOString())
  emitProgressStoreChange()
}

// ─── Lick mastery ────────────────────────────────────────────────────
// 사용자가 외운 (memorized) 릭 추적
const LICK_KEY = 'jazz-guitar-lick-mastery'

interface LickMasteryEntry {
  memorized: boolean
  citedCount: number      // 잼에서 인용한 횟수
  lastSeenAt: string      // 마지막으로 본 ISO
}

type LickMasteryMap = Record<string, LickMasteryEntry>

function getLickMap(): LickMasteryMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(LICK_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveLickMap(map: LickMasteryMap): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LICK_KEY, JSON.stringify(map))
  emitProgressStoreChange()
}

export function getLickMastery(lickId: string): LickMasteryEntry {
  return getLickMap()[lickId] ?? {
    memorized: false,
    citedCount: 0,
    lastSeenAt: '1970-01-01',
  }
}

export function setLickMemorized(lickId: string, memorized: boolean): void {
  const map = getLickMap()
  const entry = map[lickId] ?? { memorized: false, citedCount: 0, lastSeenAt: '1970-01-01' }
  entry.memorized = memorized
  entry.lastSeenAt = new Date().toISOString()
  map[lickId] = entry
  saveLickMap(map)
}

export function incrementLickCited(lickId: string): void {
  const map = getLickMap()
  const entry = map[lickId] ?? { memorized: false, citedCount: 0, lastSeenAt: '1970-01-01' }
  entry.citedCount += 1
  entry.lastSeenAt = new Date().toISOString()
  map[lickId] = entry
  saveLickMap(map)
}

// ─── Session record checks (universal 4) ─────────────────────────────
const SESSION_KEY = 'jazz-guitar-session-log'

export interface SessionRecord {
  ts: string                                 // ISO when finished
  leafSlug: string
  checks: {
    form: boolean
    silence: boolean
    lick: boolean
    landing: boolean
  }
}

export function logSessionRecord(rec: SessionRecord): void {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    const list: SessionRecord[] = raw ? JSON.parse(raw) : []
    list.push(rec)
    // 최근 200개만 유지
    const trimmed = list.slice(-200)
    localStorage.setItem(SESSION_KEY, JSON.stringify(trimmed))
    emitProgressStoreChange()
  } catch {
    // ignore
  }
}

export function getRecentSessions(limit = 20): SessionRecord[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    const list: SessionRecord[] = raw ? JSON.parse(raw) : []
    return list.slice(-limit).reverse()
  } catch {
    return []
  }
}

export function countSessionsForLeaf(leafSlug: string): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    const list: SessionRecord[] = raw ? JSON.parse(raw) : []
    return list.filter(r => r.leafSlug === leafSlug).length
  } catch {
    return 0
  }
}
