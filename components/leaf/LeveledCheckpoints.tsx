'use client'

import { useMemo } from 'react'
import {
  toggleLeafLevelCheck,
  touchLeafActivity,
} from '@/lib/progress/store'
import { useLeafLevelCheckMap } from '@/lib/progress/hooks'
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
  const levelCheckMap = useLeafLevelCheckMap(leafSlug, groups)

  // 전체 점수 계산
  const groupStates = useMemo(
    () =>
      groups.map((g) => {
        const checks = levelCheckMap[g.level] ?? {}
        const done = Object.values(checks).filter(Boolean).length
        return { group: g, checks, done }
      }),
    [groups, levelCheckMap]
  )

  const totalScore = Math.round(
    groupStates.reduce((sum, { group, done }) => {
      const ratio = group.items.length === 0 ? 0 : done / group.items.length
      return sum + ratio * group.weight
    }, 0)
  )

  const handleToggle = (level: string, idx: number) => {
    toggleLeafLevelCheck(leafSlug, level, idx)
    touchLeafActivity(leafSlug)
  }

  return (
    <section className="organic-card space-y-6 px-5 py-6 sm:px-7">
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span className="section-no">C</span>
          <span className="eyebrow">Checkpoints</span>
        </div>
        <span className="text-[11px] font-mono tabular text-ink-faint tracking-widest">
          {totalScore}<span className="text-ink-quiet"> / 100</span>
        </span>
      </div>

      {/* 전체 진행 바 */}
      <div className="h-px bg-rule overflow-hidden">
        <div
          className="h-full bg-terracotta transition-all duration-500"
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
              <ul className="overflow-hidden rounded-3xl border border-rule bg-paper-bright/70">
                {group.items.map((item, i) => {
                  const checked = !!checks[i]
                  return (
                    <li key={i} className="border-b border-rule last:border-b-0">
                      <button
                        onClick={() => handleToggle(group.level, i)}
                        className="w-full flex items-start gap-4 text-left px-4 py-3 hover:bg-surface/60 transition-colors group"
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            checked
                              ? 'bg-ink border-ink text-paper'
                              : 'bg-paper-bright border-rule group-hover:border-sage'
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
        <div className="rounded-3xl bg-ink text-ink-inv p-4 flex items-center gap-3">
          <IconCheck size={16} />
          <p className="text-sm">
            이 주제를 완전히 졸업했습니다. Tree에 채워진 노드로 표시됩니다.
          </p>
        </div>
      )}
    </section>
  )
}
