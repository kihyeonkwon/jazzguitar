'use client'

import { useState } from 'react'
import { logSessionRecord, touchLeafActivity, toggleLeafLevelCheck, getLeafLevelChecks } from '@/lib/progress/store'
import { IconCheck } from '@/components/icons'

interface Props {
  leafSlug: string
  onComplete?: () => void
}

interface Check {
  key: 'form' | 'silence' | 'lick' | 'landing'
  label: string
  hint?: string
}

const CHECKS: Check[] = [
  {
    key: 'form',
    label: '12바/32바 폼을 한 번도 놓치지 않고 끝까지 갔다',
    hint: '코러스의 마디 1로 정확히 돌아왔습니다.',
  },
  {
    key: 'silence',
    label: '의도적으로 쉬는 순간이 적어도 한 번 있었다',
    hint: '쉼도 연주입니다. 한 마디 정도 비워봅니다.',
  },
  {
    key: 'lick',
    label: '오늘의 릭을 1번 이상 자연스럽게 끼워 넣었다',
    hint: '같은 릭을 두 번 인용해도 좋습니다.',
  },
  {
    key: 'landing',
    label: '코드가 바뀌는 마디의 1박에 코드톤(R/3/5/7)으로 착지했다',
    hint: '한 곳만 의식적으로 떨어뜨려도 충분합니다.',
  },
]

export default function RecordCheck({ leafSlug, onComplete }: Props) {
  const [state, setState] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const allChecked = CHECKS.every(c => state[c.key])
  const checkedCount = Object.values(state).filter(Boolean).length

  const submit = () => {
    logSessionRecord({
      ts: new Date().toISOString(),
      leafSlug,
      checks: {
        form:    !!state.form,
        silence: !!state.silence,
        lick:    !!state.lick,
        landing: !!state.landing,
      },
    })
    touchLeafActivity(leafSlug)

    // Bronze 레벨의 첫 항목을 자동 가산 (백킹 위 1코러스 = form 통과 시)
    if (state.form) {
      const bronze = getLeafLevelChecks(leafSlug, 'Bronze')
      if (!bronze[0]) toggleLeafLevelCheck(leafSlug, 'Bronze', 0)
    }
    setSubmitted(true)
    onComplete?.()
  }

  if (submitted) {
    return (
      <div className="border border-ink bg-ink text-ink-inv p-6 space-y-3">
        <div className="flex items-center gap-3">
          <IconCheck size={16} />
          <span className="eyebrow !text-ink-inv/70">Session Logged</span>
        </div>
        <p className="text-base">
          {checkedCount}/4 행동 체크가 기록되었습니다.
          {checkedCount === 4 && ' 오늘 잘 하셨습니다.'}
        </p>
        <p className="text-xs text-ink-inv/60 leading-relaxed">
          이 세션은 주제의 Bronze 진도에 자동 반영되었습니다. 내일 다시 같은 미션이 추천될 수 있습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-rule bg-paper-bright">
      <div className="flex items-baseline justify-between p-5 border-b border-rule">
        <div className="flex items-baseline gap-3">
          <span className="section-no">R</span>
          <span className="eyebrow">Record Check</span>
        </div>
        <span className="text-[11px] font-mono tabular text-ink-faint tracking-widest">
          {checkedCount}<span className="text-ink-quiet"> / 4</span>
        </span>
      </div>

      <ul>
        {CHECKS.map((c) => {
          const on = !!state[c.key]
          return (
            <li key={c.key} className="border-b border-rule last:border-b-0">
              <button
                onClick={() => setState(s => ({ ...s, [c.key]: !s[c.key] }))}
                className="w-full flex items-start gap-4 text-left px-5 py-4 hover:bg-surface/50 transition-colors group"
              >
                <span
                  className={`mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 transition-all ${
                    on
                      ? 'bg-ink border-ink text-paper'
                      : 'bg-paper-bright border-rule group-hover:border-ink-soft'
                  }`}
                >
                  {on && <IconCheck size={12} />}
                </span>
                <div className="flex-1 space-y-1">
                  <span className={`block text-[14px] leading-snug transition-colors ${
                    on ? 'text-ink-faint line-through' : 'text-ink'
                  }`}>
                    {c.label}
                  </span>
                  {c.hint && (
                    <span className="block text-[11px] text-ink-faint leading-relaxed">{c.hint}</span>
                  )}
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="p-4 border-t border-rule">
        <button
          onClick={submit}
          disabled={checkedCount === 0}
          className="w-full h-11 bg-ink text-ink-inv hover:bg-ink-soft disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium tracking-widest transition-colors"
        >
          {allChecked ? '오늘 세션 완료' : `${checkedCount}/4 기록하기`}
        </button>
      </div>
    </div>
  )
}
