'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { Stat } from '@/components/ui'
import {
  getDrillScore,
  DrillScore,
  DRILL_SCORES_EVENT,
} from '@/lib/progress/drills'

const NULL_SCORE: DrillScore | null = null

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', cb)
  window.addEventListener(DRILL_SCORES_EVENT, cb)
  return () => {
    window.removeEventListener('storage', cb)
    window.removeEventListener(DRILL_SCORES_EVENT, cb)
  }
}

function makeStableSnapshot(drillType: string) {
  let lastKey = ''
  let lastValue: DrillScore | null = null
  return () => {
    const nextValue = getDrillScore(drillType)
    const nextKey = nextValue
      ? `${nextValue.bestScore}|${nextValue.totalPlayed}|${nextValue.lastPlayedAt}|${nextValue.bestTime ?? ''}`
      : ''
    if (nextKey !== lastKey) {
      lastKey = nextKey
      lastValue = nextValue
    }
    return lastValue
  }
}

export default function DrillLibraryStats({ drillType }: { drillType: string }) {
  const getSnapshot = useMemo(() => makeStableSnapshot(drillType), [drillType])

  const score = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => NULL_SCORE,
  )

  if (!score) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Best" value="—" />
        <Stat label="Plays" value={0} />
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      <Stat label="Best" value={score.bestScore} />
      <Stat label="Plays" value={score.totalPlayed} />
    </div>
  )
}
