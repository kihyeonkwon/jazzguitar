'use client'

import { Progress, TopicProgress } from './types'

const STORAGE_KEY = 'jazz-guitar-progress'

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
