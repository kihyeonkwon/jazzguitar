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
