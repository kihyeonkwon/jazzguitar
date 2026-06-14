'use client'

import { useMemo, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { LickSnippet, Locale } from '@/lib/curriculum/types'
import {
  getLickMastery,
  setLickMemorized,
  PROGRESS_STORE_EVENT,
} from '@/lib/progress/store'
import { IconCheck } from '@/components/icons'

const SheetMusic = dynamic(() => import('@/components/music/SheetMusic'), { ssr: false })

interface Props {
  lick: LickSnippet
  locale: Locale
}

export default function LickCard({ lick, locale }: Props) {
  const getSnapshot = useMemo(
    () => () => getLickMastery(lick.id).memorized,
    [lick.id]
  )
  const memorized = useSyncExternalStore(
    (onChange) => {
      window.addEventListener(PROGRESS_STORE_EVENT, onChange)
      window.addEventListener('storage', onChange)
      return () => {
        window.removeEventListener(PROGRESS_STORE_EVENT, onChange)
        window.removeEventListener('storage', onChange)
      }
    },
    getSnapshot,
    () => false
  )


  const toggle = () => {
    const next = !memorized
    setLickMemorized(lick.id, next)
  }

  return (
    <div className="border border-rule bg-paper-bright">
      <div className="flex items-baseline justify-between p-4 border-b border-rule">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">{lick.bars}-Bar Lick</span>
          {lick.source && (
            <span className="text-[11px] font-mono text-ink-faint tracking-widest">
              {lick.source[locale]}
            </span>
          )}
        </div>
        <button
            onClick={toggle}
            className={`inline-flex items-center gap-1.5 px-2.5 h-7 border text-[11px] font-mono tracking-widest transition-colors ${
            memorized
              ? 'bg-ink text-ink-inv border-ink'
              : 'bg-paper-bright text-ink-faint border-rule hover:border-ink-soft hover:text-ink'
          }`}
        >
          <IconCheck size={12} />
          {memorized ? 'MEMORIZED' : 'MEMORIZE'}
        </button>
      </div>

      <SheetMusic notation={lick.abcNotation} minimal />

      <div className="px-4 py-3 border-t border-rule">
        <div className="eyebrow mb-1">Context</div>
        <p className="text-sm text-ink-soft">{lick.context[locale]}</p>
      </div>
    </div>
  )
}
