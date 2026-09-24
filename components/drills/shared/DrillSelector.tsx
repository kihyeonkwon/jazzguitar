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

  // 선택지가 적은 게임(도수 등)은 큰 키, 많은 경우는 촘촘한 키
  const size = columns <= 4
    ? 'h-20 font-sans text-3xl font-semibold tracking-[-0.04em] sm:h-24 sm:text-4xl'
    : 'h-14 font-mono text-sm font-medium'

  const disabled = state === 'correct' || state === 'wrong' || state === 'reveal'

  return (
    <div className={`grid ${colsClass} gap-px border border-ink bg-ink`}>
      {choices.map((c) => {
        const isSelected = selected === c.value
        const isCorrect = correctValue === c.value

        let cls = 'bg-paper-bright text-ink'

        if (state === 'idle') {
          if (isSelected) cls = 'bg-ink text-ink-inv'
        } else if (isCorrect) {
          cls = isSelected ? 'bg-ink text-ink-inv' : 'bg-blue text-ink'
        } else if (isSelected) {
          cls = 'bg-pink text-ink'
        } else {
          cls = 'bg-paper-bright text-ink-quiet'
        }

        return (
          <button
            key={c.value}
            onClick={() => !disabled && onSelect(c.value)}
            disabled={disabled}
            className={`${size} transition-colors duration-100 ${cls} ${
              !disabled && !isSelected ? 'hover:bg-ink hover:text-ink-inv' : ''
            } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
