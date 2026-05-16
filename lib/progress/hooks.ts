'use client'

import { useMemo, useSyncExternalStore } from 'react'
import {
  getCompletedTopicIds,
  getLeafProgress,
  getLeafLevelChecks,
  getLeafScore,
  getLeafSelfCheck,
  getStartedTopicIds,
  getTopicProgress,
  PROGRESS_STORE_EVENT,
} from './store'
import type { Leaf } from '../curriculum/types'
import { TopicProgress } from './types'

const EMPTY_STRING_ARRAY: string[] = []
const EMPTY_SELF_CHECK: Record<number, boolean> = {}
const EMPTY_TOPIC_PROGRESS: TopicProgress = {
  topicId: '',
  completedCheckpoints: [],
  started: false,
  completed: false,
}

function subscribeProgressStore(onChange: () => void) {
  window.addEventListener(PROGRESS_STORE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(PROGRESS_STORE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function makeStableSnapshot<T>(read: () => T, fallback: T) {
  let lastKey = ''
  let lastValue = fallback
  return () => {
    const nextValue = read()
    const nextKey = JSON.stringify(nextValue)
    if (nextKey !== lastKey) {
      lastKey = nextKey
      lastValue = nextValue
    }
    return lastValue
  }
}

export function useCompletedTopicIds(): string[] {
  const getSnapshot = useMemo(
    () => makeStableSnapshot(getCompletedTopicIds, EMPTY_STRING_ARRAY),
    []
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => EMPTY_STRING_ARRAY
  )
}

export function useStartedTopicIds(): string[] {
  const getSnapshot = useMemo(
    () => makeStableSnapshot(getStartedTopicIds, EMPTY_STRING_ARRAY),
    []
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => EMPTY_STRING_ARRAY
  )
}

export function useTopicProgress(topicId: string): TopicProgress {
  const fallback = useMemo(
    () => ({
      ...EMPTY_TOPIC_PROGRESS,
      topicId,
    }),
    [topicId]
  )
  const getSnapshot = useMemo(
    () => makeStableSnapshot(() => getTopicProgress(topicId), fallback),
    [fallback, topicId]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => fallback
  )
}

export function useLeafSelfCheck(leafSlug: string): Record<number, boolean> {
  const getSnapshot = useMemo(
    () => makeStableSnapshot(() => getLeafSelfCheck(leafSlug), EMPTY_SELF_CHECK),
    [leafSlug]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => EMPTY_SELF_CHECK
  )
}

export function useLeafLevelChecks(
  leafSlug: string,
  level: string
): Record<number, boolean> {
  const getSnapshot = useMemo(
    () => makeStableSnapshot(() => getLeafLevelChecks(leafSlug, level), EMPTY_SELF_CHECK),
    [leafSlug, level]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => EMPTY_SELF_CHECK
  )
}

export function useLeafLevelCheckMap(
  leafSlug: string,
  groups: Array<{ level: string }>
): Record<string, Record<number, boolean>> {
  const getSnapshot = useMemo(
    () =>
      makeStableSnapshot(
        () => {
          const map: Record<string, Record<number, boolean>> = {}
          for (const group of groups) {
            map[group.level] = getLeafLevelChecks(leafSlug, group.level)
          }
          return map
        },
        {}
      ),
    [groups, leafSlug]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => ({})
  )
}

/**
 * 잎별 0-100점 진도 맵 (new shape 우선, legacy 폴백)
 */
export function useLeafScoreMap(allLeaves: Leaf[]): Record<string, number> {
  const getSnapshot = useMemo(
    () =>
      makeStableSnapshot(
        () => {
          const map: Record<string, number> = {}
          for (const leaf of allLeaves) {
            map[leaf.slug] = getLeafScore(
              leaf.slug,
              leaf.checkpoints,
              leaf.selfCheck.length,
            )
          }
          return map
        },
        {} as Record<string, number>
      ),
    [allLeaves]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => ({} as Record<string, number>)
  )
}

export function useCompletedLeafSlugs(
  allLeaves: Array<{ slug: string; selfCheck: unknown[] }>
): string[] {
  const getSnapshot = useMemo(
    () =>
      makeStableSnapshot(
        () =>
          allLeaves
            .filter((leaf) => {
              const { done, total } = getLeafProgress(leaf.slug, leaf.selfCheck.length)
              return total > 0 && done >= total
            })
            .map((leaf) => leaf.slug),
        EMPTY_STRING_ARRAY
      ),
    [allLeaves]
  )
  return useSyncExternalStore(
    subscribeProgressStore,
    getSnapshot,
    () => EMPTY_STRING_ARRAY
  )
}
