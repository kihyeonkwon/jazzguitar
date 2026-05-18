'use client'

import { useState } from 'react'
import { IconCheck, IconClose } from '@/components/icons'

interface Props {
  question: string
  choices: string[]
  correct: string          // 정답 텍스트 (choices 중 하나)
  hint?: string
}

export default function Quiz({ question, choices, correct, hint }: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  const isCorrect = picked === correct

  return (
    <div className="my-6 border border-rule bg-paper-bright">
      <div className="p-5 border-b border-rule">
        <div className="eyebrow mb-2">Mini Quiz</div>
        <p className="text-[15px] text-ink leading-snug font-medium">{question}</p>
      </div>

      <div className="grid grid-cols-2 gap-px bg-rule">
        {choices.map((c, i) => {
          const isThisCorrect = c === correct
          const isThisPicked = c === picked
          const reveal = picked !== null

          let className = 'bg-paper-bright text-ink hover:bg-surface'
          if (reveal) {
            if (isThisCorrect) className = 'bg-ink text-ink-inv'
            else if (isThisPicked) className = 'bg-red-50 text-red-500'
            else className = 'bg-paper-bright text-ink-faint'
          }

          return (
            <button
              key={i}
              onClick={() => picked === null && setPicked(c)}
              disabled={picked !== null}
              className={`relative h-12 px-4 text-[14px] font-mono tracking-wide transition-colors ${className}`}
            >
              <span className="flex items-center justify-center gap-2">
                {reveal && isThisCorrect && <IconCheck size={14} />}
                {reveal && isThisPicked && !isThisCorrect && <IconClose size={14} />}
                {c}
              </span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div className="px-5 py-3 border-t border-rule animate-fade-in">
          <div className={`eyebrow mb-1 ${isCorrect ? 'text-ink' : 'text-red-500'}`}>
            {isCorrect ? 'Correct' : 'Try again'}
          </div>
          {hint && (
            <p className="text-[13px] text-ink-soft leading-relaxed">{hint}</p>
          )}
          {!isCorrect && (
            <button
              onClick={() => setPicked(null)}
              className="mt-2 text-[11px] font-mono tracking-widest text-ink-faint hover:text-ink"
            >
              RESET
            </button>
          )}
        </div>
      )}
    </div>
  )
}
