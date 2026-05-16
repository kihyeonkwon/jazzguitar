'use client'

import React from 'react'

export type SelectorState = 'idle' | 'correct' | 'wrong' | 'reveal'

export interface SelectorChoice {
  value: string
  label: string
}

interface DrillSelectorProps {
  choices: SelectorChoice[]
  selected: string | null
  correctValue: string | null
  state: SelectorState
  columns?: number
  onSelect: (value: string) => void
}

export default function DrillSelector({
  choices,
  selected,
  correctValue,
  state,
  columns = 6,
  onSelect,
}: DrillSelectorProps) {
  const colsClass =
    columns === 2 ? 'grid-cols-2' :
    columns === 3 ? 'grid-cols-3' :
    columns === 4 ? 'grid-cols-4' :
    columns === 5 ? 'grid-cols-5' :
    'grid-cols-6'

  const disabled = state === 'correct' || state === 'wrong' || state === 'reveal'

  return (
    <div className={`grid ${colsClass} gap-2`}>
      {choices.map((c) => {
        const isSelected = selected === c.value
        const isCorrect = correctValue === c.value

        // 기본
        let cls = 'bg-paper-bright text-ink border-rule'

        if (state === 'idle') {
          if (isSelected) cls = 'bg-ink text-ink-inv border-ink'
        } else {
          // 결과 표시 상태
          if (isCorrect) {
            cls = 'bg-ink text-ink-inv border-ink border-2'
          } else if (isSelected && !isCorrect) {
            // 미세한 빨강 — 오답
            cls = 'bg-paper-bright text-red-500 border-red-300'
          } else {
            cls = 'bg-paper-bright text-ink-faint border-rule'
          }
        }

        return (
          <button
            key={c.value}
            onClick={() => !disabled && onSelect(c.value)}
            disabled={disabled}
            className={`
              h-12 border font-mono text-sm font-medium
              transition-colors
              ${cls}
              ${!disabled && !isSelected ? 'hover:border-ink-soft' : ''}
              ${disabled ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
