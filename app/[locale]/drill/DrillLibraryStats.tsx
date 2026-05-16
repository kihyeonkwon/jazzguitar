'use client'

import { useSyncExternalStore } from 'react'
import { Stat } from '@/components/ui'
import { getDrillScore, DrillScore } from '@/lib/progress/drills'

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', cb)
  return () => window.removeEventListener('storage', cb)
}

export default function DrillLibraryStats({ drillType }: { drillType: string }) {
  const score: DrillScore | null = useSyncExternalStore(
    subscribe,
    () => getDrillScore(drillType),
    () => null
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
