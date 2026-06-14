'use client'

import { useMemo, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { IconCheck } from '@/components/icons'
import type { Exercise, Locale } from '@/lib/curriculum/types'

const SheetMusic = dynamic(() => import('@/components/music/SheetMusic'), { ssr: false })

interface Props {
  leafSlug: string
  idx: number
  exercise: Exercise
  locale: Locale
  reps?: number
}

const STORAGE_KEY = 'jazz-guitar:exercise-checks'
const EXERCISE_CHECKS_EVENT = 'jazz-guitar-exercise-checks-change'
const EMPTY_CHECKS: Record<number, boolean> = {}

type ExerciseChecksMap = Record<string, Record<number, boolean>>

function key(leafSlug: string, idx: number): string {
  return `${leafSlug}:${idx}`
}

function loadAll(): ExerciseChecksMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ExerciseChecksMap) : {}
  } catch {
    return {}
  }
}

function saveAll(map: ExerciseChecksMap): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
    window.dispatchEvent(new Event(EXERCISE_CHECKS_EVENT))
  } catch {
    /* quota / serialize 실패 무시 */
  }
}

function subscribeExerciseChecks(onChange: () => void) {
  window.addEventListener(EXERCISE_CHECKS_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(EXERCISE_CHECKS_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function makeExerciseSnapshot(k: string) {
  let lastKey = ''
  let lastValue = EMPTY_CHECKS
  return () => {
    const next = loadAll()[k] ?? EMPTY_CHECKS
    const nextKey = JSON.stringify(next)
    if (nextKey !== lastKey) {
      lastKey = nextKey
      lastValue = next
    }
    return lastValue
  }
}

export default function ExerciseCard({ leafSlug, idx, exercise, locale, reps = 3 }: Props) {
  const k = key(leafSlug, idx)
  const getSnapshot = useMemo(() => makeExerciseSnapshot(k), [k])
  const checks = useSyncExternalStore(
    subscribeExerciseChecks,
    getSnapshot,
    () => EMPTY_CHECKS
  )

  const toggle = (i: number) => {
    const next = { ...checks, [i]: !checks[i] }
    const all = loadAll()
    all[k] = next
    saveAll(all)
  }

  const done = Object.values(checks).filter(Boolean).length
  const allDone = done === reps

  return (
    <div className="organic-card p-5 sm:p-6 space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="display text-xl text-ink flex-1 leading-snug">{exercise.title[locale]}</h3>
        {exercise.bpm && (
          <span className="rounded-full border border-rule bg-surface-soft px-3 py-1 text-[10px] font-mono tabular text-ink-faint shrink-0">
            {exercise.bpm} BPM
          </span>
        )}
      </div>

      <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-line">
        {exercise.description[locale]}
      </p>

      {exercise.abcNotation && (
        <SheetMusic notation={exercise.abcNotation} minimal />
      )}

      {/* 반복 체크 */}
      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-rule">
        <span className="eyebrow shrink-0 mr-1">Reps</span>
        {Array.from({ length: reps }).map((_, i) => {
          const checked = !!checks[i]
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={`flex items-center gap-1.5 rounded-full px-3 h-8 border text-[11px] font-mono transition-colors ${
                checked
                  ? 'bg-ink text-ink-inv border-ink'
                  : 'bg-paper-bright text-ink-soft border-rule hover:border-sage'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                  checked ? 'bg-paper-bright border-paper-bright text-ink' : 'border-current'
                }`}
              >
                {checked && <IconCheck size={8} />}
              </span>
              {i + 1}차
            </button>
          )
        })}
        <span className={`ml-auto text-[10px] font-mono tabular ${allDone ? 'text-ink' : 'text-ink-faint'}`}>
          {done}/{reps}
        </span>
      </div>
    </div>
  )
}
