'use client'

import { useEffect, useState } from 'react'
import {
  getLeafLevelChecks,
  toggleLeafLevelCheck,
  touchLeafActivity,
  PROGRESS_STORE_EVENT,
} from '@/lib/progress/store'
import type { CheckpointGroup, Locale } from '@/lib/curriculum/types'
import { IconCheck } from '@/components/icons'

interface Props {
  leafSlug: string
  groups: CheckpointGroup[]
  locale: Locale
}

const LEVEL_LABEL: Record<string, { kr: string; range: string }> = {
  Bronze: { kr: '입문',    range: '0–30' },
  Silver: { kr: '기본',    range: '30–60' },
  Gold:   { kr: '중급',    range: '60–85' },
  Master: { kr: '마스터',  range: '85–100' },
}

export default function LeveledCheckpoints({ leafSlug, groups, locale }: Props) {
  const [version, setVersion] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onChange = () => setVersion(v => v + 1)
    window.addEventListener(PROGRESS_STORE_EVENT, onChange)
    return () => window.removeEventListener(PROGRESS_STORE_EVENT, onChange)
  }, [])

  // 전체 점수 계산
  let totalScore = 0
  const groupStates = groups.map((g) => {
    const checks = mounted ? getLeafLevelChecks(leafSlug, g.level) : {}
    const done = Object.values(checks).filter(Boolean).length
    const ratio = g.items.length === 0 ? 0 : done / g.items.length
    totalScore += ratio * g.weight
    return { group: g, checks, done }
  })
  totalScore = Math.round(totalScore)

  const handleToggle = (level: string, idx: number) => {
    toggleLeafLevelCheck(leafSlug, level, idx)
    touchLeafActivity(leafSlug)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="section-no">C</span>
          <span className="eyebrow">Checkpoints</span>
        </div>
        <span className="text-[11px] font-mono tabular text-ink-faint tracking-widest">
          {mounted ? totalScore : 0}<span className="text-ink-quiet"> / 100</span>
        </span>
      </div>

      {/* 전체 진행 바 */}
      <div className="h-px bg-rule overflow-hidden">
        <div
          className="h-full bg-ink transition-all duration-500"
          style={{ width: `${totalScore}%` }}
        />
      </div>

      {/* 레벨별 그룹 */}
      <div className="space-y-8">
        {groupStates.map(({ group, checks, done }) => {
          const label = LEVEL_LABEL[group.level]
          const allDone = done === group.items.length && group.items.length > 0
          return (
            <div key={group.level} className="space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="section-no">{group.level.toUpperCase()}</span>
                  <span className="text-xs text-ink-soft">
                    {label?.kr ?? group.level} <span className="text-ink-faint">· {label?.range}점</span>
                  </span>
                </div>
                <span className={`text-[10px] font-mono tabular tracking-widest ${allDone ? 'text-ink' : 'text-ink-faint'}`}>
                  {done}/{group.items.length}
                </span>
              </div>
              <ul className="border-t border-rule">
                {group.items.map((item, i) => {
                  const checked = !!checks[i]
                  return (
                    <li key={i} className="border-b border-rule">
                      <button
                        onClick={() => handleToggle(group.level, i)}
                        className="w-full flex items-start gap-4 text-left py-3 hover:bg-surface/50 -mx-3 px-3 transition-colors group"
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 border flex items-center justify-center shrink-0 transition-all ${
                            checked
                              ? 'bg-ink border-ink text-paper'
                              : 'bg-paper-bright border-rule group-hover:border-ink-soft'
                          }`}
                        >
                          {checked && <IconCheck size={10} />}
                        </span>
                        <span
                          className={`text-[13px] leading-relaxed transition-colors ${
                            checked ? 'text-ink-faint line-through' : 'text-ink-soft'
                          }`}
                        >
                          {item[locale]}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {totalScore >= 100 && (
        <div className="bg-ink text-ink-inv p-4 flex items-center gap-3">
          <IconCheck size={16} />
          <p className="text-sm">
            이 잎을 완전히 졸업했습니다. Tree에 채워진 노드로 표시됩니다.
          </p>
        </div>
      )}
    </section>
  )
}
