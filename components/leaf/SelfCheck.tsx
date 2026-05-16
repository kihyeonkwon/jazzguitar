'use client'

import { toggleLeafSelfCheck } from '@/lib/progress/store'
import { useLeafSelfCheck } from '@/lib/progress/hooks'
import { IconCheck } from '@/components/icons'

interface Props {
  leafSlug: string
  items: string[]
}

export default function SelfCheck({ leafSlug, items }: Props) {
  const checks = useLeafSelfCheck(leafSlug)

  const toggle = (i: number) => {
    toggleLeafSelfCheck(leafSlug, i)
  }

  const doneCount = Object.values(checks).filter(Boolean).length
  const total = items.length
  const ratio = total === 0 ? 0 : doneCount / total
  const allDone = doneCount === total && total > 0

  return (
    <section className="space-y-5">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="section-no">S</span>
          <span className="eyebrow">Self-check</span>
        </div>
        <span className="text-xs font-mono tabular text-ink-faint">
          {doneCount}<span className="text-ink-quiet"> / {total}</span>
        </span>
      </div>

      {/* 진행률 바 — 얇은 라인 */}
      <div className="h-px bg-rule overflow-hidden">
        <div
          className="h-full bg-ink transition-all duration-500"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>

      <ul className="border-t border-rule">
        {items.map((c, i) => {
          const checked = !!checks[i]
          return (
            <li key={i} className="border-b border-rule">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-4 text-left py-4 hover:bg-surface/50 -mx-3 px-3 transition-colors group"
              >
                <span
                  className={`mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 transition-all ${
                    checked
                      ? 'bg-ink border-ink text-paper'
                      : 'bg-paper-bright border-rule group-hover:border-ink-soft'
                  }`}
                >
                  {checked && <IconCheck size={12} />}
                </span>
                <span
                  className={`text-[14px] leading-relaxed transition-colors ${
                    checked ? 'text-ink-faint line-through' : 'text-ink-soft'
                  }`}
                >
                  {c}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {allDone && (
        <div className="bg-ink text-ink-inv p-4 mt-4 flex items-center gap-3">
          <IconCheck size={16} />
          <p className="text-sm">
            이 잎을 완전히 익혔습니다. 트렁크로 돌아가 다음 잎을 골라보세요.
          </p>
        </div>
      )}
    </section>
  )
}
