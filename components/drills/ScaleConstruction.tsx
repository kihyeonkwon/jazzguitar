'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import DrillFrame from './shared/DrillFrame'
import { Button } from '@/components/ui'
import { IconArrowRight } from '@/components/icons'
import { saveDrillScore } from '@/lib/progress/drills'

const ROOTS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'G', 'D'] as const
const NOTES_12 = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const BLACK_KEYS = new Set(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
const ROUND_SIZE = 10

type Result = 'correct' | 'wrong' | null

interface ScaleDef {
  id: string
  name: string
  label: string
  formula: string
  intervals: number[]
}

const SCALES: ScaleDef[] = [
  {
    id: 'major',
    name: 'Major',
    label: '메이저',
    formula: '1 2 3 4 5 6 7',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor',
    label: '내츄럴 마이너',
    formula: '1 2 b3 4 5 b6 b7',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 'jazz-minor',
    name: 'Jazz Minor',
    label: '재즈 마이너',
    formula: '1 2 b3 4 5 6 7',
    intervals: [0, 2, 3, 5, 7, 9, 11],
  },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    label: '하모닉 마이너',
    formula: '1 2 b3 4 5 b6 7',
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    label: '마이너 펜타토닉',
    formula: '1 b3 4 5 b7',
    intervals: [0, 3, 5, 7, 10],
  },
  {
    id: 'blues',
    name: 'Blues Scale',
    label: '블루스 스케일',
    formula: '1 b3 4 b5 5 b7',
    intervals: [0, 3, 5, 6, 7, 10],
  },
  {
    id: 'dorian',
    name: 'Dorian',
    label: '도리안',
    formula: '1 2 b3 4 5 6 b7',
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    label: '믹솔리디안',
    formula: '1 2 3 4 5 6 b7',
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    id: 'lydian',
    name: 'Lydian',
    label: '리디안',
    formula: '1 2 3 #4 5 6 7',
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
]

const ROOT_TO_PC: Record<string, number> = Object.fromEntries(
  NOTES_12.map((note, index) => [note, index])
)

interface Problem {
  root: string
  scale: ScaleDef
}

function pickRandom<T>(arr: readonly T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr
  return pool[Math.floor(Math.random() * pool.length)] ?? arr[0]
}

function notesFor(root: string, scale: ScaleDef): string[] {
  const rootPc = ROOT_TO_PC[root] ?? 0
  return scale.intervals.map((interval) => NOTES_12[(rootPc + interval) % NOTES_12.length])
}

function sameNoteSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const setA = new Set(a)
  return b.every((note) => setA.has(note))
}

export default function ScaleConstruction() {
  const [activeRoots, setActiveRoots] = useState<string[]>([...ROOTS])
  const [activeScaleIds, setActiveScaleIds] = useState<string[]>(SCALES.map((s) => s.id))
  const [problem, setProblem] = useState<Problem>({ root: 'C', scale: SCALES[0] })
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<Result>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [shake, setShake] = useState(false)
  const roundStartRef = useRef<number>(0)

  const activeScales = useMemo(
    () => SCALES.filter((scale) => activeScaleIds.includes(scale.id)),
    [activeScaleIds]
  )

  const correctNotes = useMemo(
    () => notesFor(problem.root, problem.scale),
    [problem]
  )

  const targetCount = correctNotes.length
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  const inRoundProgress = score.total % ROUND_SIZE
  const currentRound = Math.floor(score.total / ROUND_SIZE) + 1

  const nextProblem = useCallback(() => {
    const nextRoot = pickRandom(activeRoots, problem.root)
    const nextScale = pickRandom(activeScales, problem.scale)
    setProblem({ root: nextRoot, scale: nextScale })
    setSelected([])
    setResult(null)
  }, [activeRoots, activeScales, problem.root, problem.scale])

  const toggleRoot = useCallback((root: string) => {
    setActiveRoots((prev) => {
      if (prev.includes(root)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== root)
      }
      return [...prev, root]
    })
  }, [])

  const toggleScale = useCallback((scaleId: string) => {
    setActiveScaleIds((prev) => {
      if (prev.includes(scaleId)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== scaleId)
      }
      return [...prev, scaleId]
    })
  }, [])

  const grade = useCallback(
    (nextSelected: string[]) => {
      const isCorrect = sameNoteSet(nextSelected, correctNotes)
      const nextScore = {
        correct: score.correct + (isCorrect ? 1 : 0),
        total: score.total + 1,
      }

      if (roundStartRef.current === 0) {
        roundStartRef.current = Date.now()
      }
      if (nextScore.total > 0 && nextScore.total % ROUND_SIZE === 0) {
        const elapsedSec = Math.round((Date.now() - roundStartRef.current) / 1000)
        saveDrillScore('scale-construction', Math.round((nextScore.correct / nextScore.total) * 100), elapsedSec)
        roundStartRef.current = Date.now()
      }

      setResult(isCorrect ? 'correct' : 'wrong')
      setScore(nextScore)
      if (!isCorrect) {
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    },
    [correctNotes, score]
  )

  const toggleNote = useCallback(
    (note: string) => {
      if (result !== null) return
      const nextSelected = selected.includes(note)
        ? selected.filter((item) => item !== note)
        : selected.length >= targetCount
        ? selected
        : [...selected, note]

      setSelected(nextSelected)
      if (nextSelected.length === targetCount) {
        grade(nextSelected)
      }
    },
    [grade, result, selected, targetCount]
  )

  const resetAnswer = useCallback(() => {
    setSelected([])
    setResult(null)
  }, [])

  return (
    <DrillFrame
      number={7}
      title="스케일 구구단"
      description="루트와 스케일 이름을 보고 구성음을 빠르게 선택합니다. 루트와 스케일은 설정에서 출제 제외할 수 있습니다."
      footerStats={[
        { label: 'Round', value: currentRound },
        { label: 'Progress', value: `${inRoundProgress}/${ROUND_SIZE}` },
        { label: 'Accuracy', value: `${accuracy}%` },
      ]}
    >
      <section className="border border-rule bg-paper-bright">
        <div className="p-5 border-b border-rule space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="eyebrow mb-1">Problem</div>
              <div className={`display text-4xl md:text-5xl text-ink font-mono leading-none ${shake ? 'animate-shake' : ''}`}>
                {problem.root} {problem.scale.name}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="eyebrow mb-1">Select</div>
              <div className="text-2xl font-mono tabular text-ink">
                {selected.length}/{targetCount}
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono tracking-widest text-ink-faint">
            {problem.scale.formula}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-px bg-rule">
          {NOTES_12.map((note) => {
            const isSelected = selected.includes(note)
            const isCorrectNote = correctNotes.includes(note)
            const isBlack = BLACK_KEYS.has(note)

            let bg = isBlack ? 'bg-surface' : 'bg-paper-bright'
            let text = isBlack ? 'text-ink-soft' : 'text-ink'
            let border = ''

            if (isSelected) {
              if (result === 'wrong' && !isCorrectNote) {
                bg = 'bg-red-50'
                text = 'text-red-500'
                border = 'ring-1 ring-red-300'
              } else {
                bg = 'bg-ink'
                text = 'text-ink-inv'
              }
            } else if (result !== null && isCorrectNote) {
              bg = 'bg-surface'
              text = 'text-ink'
              border = 'ring-1 ring-ink-soft'
            }

            return (
              <button
                key={note}
                onClick={() => toggleNote(note)}
                disabled={result !== null}
                className={`relative h-14 font-mono text-sm font-medium transition-colors ${bg} ${text} ${border}
                  ${result === null && !isSelected ? 'hover:bg-surface' : ''}
                  ${result !== null ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {note}
                {isSelected && result === null && (
                  <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-paper text-ink text-[9px] font-mono tabular flex items-center justify-center">
                    {selected.indexOf(note) + 1}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="border-t border-rule p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {result === null ? (
              <div className="text-[11px] font-mono tracking-widest text-ink-faint">
                SELECT {targetCount} NOTES TO AUTO-GRADE
              </div>
            ) : (
              <div className="space-y-1">
                <div className={`eyebrow ${result === 'wrong' ? '!text-red-500' : ''}`}>
                  {result === 'correct' ? 'Correct' : 'Wrong'}
                </div>
                <div className="font-mono text-sm tracking-widest text-ink">
                  {correctNotes.join('  ·  ')}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {result === null ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={resetAnswer}
                disabled={selected.length === 0}
              >
                RESET
              </Button>
            ) : result === 'wrong' ? (
              <Button variant="secondary" size="sm" onClick={resetAnswer}>
                RETRY
              </Button>
            ) : null}
            {result !== null && (
              <Button size="sm" onClick={nextProblem}>
                NEXT
                <IconArrowRight size={14} />
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="border border-rule bg-paper-bright">
        <div className="p-4 border-b border-rule">
          <div className="eyebrow mb-3">출제 루트</div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-px bg-rule border border-rule">
            {ROOTS.map((root) => {
              const enabled = activeRoots.includes(root)
              return (
                <button
                  key={root}
                  onClick={() => toggleRoot(root)}
                  className={`h-9 text-xs font-mono transition-colors ${
                    enabled
                      ? 'bg-ink text-ink-inv'
                      : 'bg-paper-bright text-ink-faint hover:text-ink hover:bg-surface'
                  }`}
                >
                  {root}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4">
          <div className="eyebrow mb-3">출제 스케일</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-rule border border-rule">
            {SCALES.map((scale) => {
              const enabled = activeScaleIds.includes(scale.id)
              return (
                <button
                  key={scale.id}
                  onClick={() => toggleScale(scale.id)}
                  className={`min-h-12 text-left px-3 py-2 transition-colors ${
                    enabled
                      ? 'bg-ink text-ink-inv'
                      : 'bg-paper-bright text-ink-faint hover:text-ink hover:bg-surface'
                  }`}
                >
                  <span className="block text-sm font-medium">{scale.label}</span>
                  <span className={`block text-[10px] font-mono tracking-widest mt-1 ${
                    enabled ? 'text-ink-inv/50' : 'text-ink-faint'
                  }`}>
                    {scale.formula}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </DrillFrame>
  )
}
