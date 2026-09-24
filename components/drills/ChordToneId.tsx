'use client'

import { useCallback, useRef, useState } from 'react'
import { Chord } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import DrillSelector, { SelectorState } from './shared/DrillSelector'
import ScoreDisplay from './shared/ScoreDisplay'
import { IconArrowRight, IconPlay } from '@/components/icons'
import { saveDrillRound } from '@/lib/progress/drills'

const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']
const QUALITIES = ['maj7', 'm7', '7', 'm7b5', 'dim7']

const ROUND_LENGTH = 20

const DEGREES = [
  { value: '1', label: '1' },
  { value: '3', label: '3' },
  { value: '5', label: '5' },
  { value: '7', label: '7' },
]

const ENH: Record<string, string> = {
  'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
  'E#': 'F',  'B#': 'C',  'Cb': 'B',  'Fb': 'E',
  'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#',
}

function normalize(n: string): string {
  // 기본형 + enharmonic 한 쌍을 동등으로 보고 정규화 — 첫 번째 후보를 반환
  return n.replace(/\d/g, '')
}

function notesEqual(a: string, b: string): boolean {
  const aN = normalize(a)
  const bN = normalize(b)
  if (aN === bN) return true
  if (ENH[aN] === bN) return true
  return false
}

interface Problem {
  chordName: string
  highlightedNote: string
  correctDegree: string
}

function generate(): Problem {
  for (let i = 0; i < 30; i++) {
    const root = ROOTS[Math.floor(Math.random() * ROOTS.length)]
    const q = QUALITIES[Math.floor(Math.random() * QUALITIES.length)]
    const chord = Chord.get(root + q)
    if (chord.notes.length < 4) continue
    const idx = Math.floor(Math.random() * 4)
    const note = chord.notes[idx]
    const degree = ['1', '3', '5', '7'][idx]
    return { chordName: root + q, highlightedNote: note, correctDegree: degree }
  }
  return { chordName: 'Cmaj7', highlightedNote: 'E', correctDegree: '3' }
}

export default function ChordToneId() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState<Problem | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<SelectorState>('idle')
  const [finished, setFinished] = useState(false)
  const roundStartRef = useRef<number>(0)

  const start = () => {
    setRound(1)
    setScore(0)
    setFinished(false)
    setProblem(generate())
    setSelected(null)
    setState('idle')
    roundStartRef.current = Date.now()
  }

  const onSelect = useCallback(
    (v: string) => {
      if (state !== 'idle' || !problem) return
      const correct = v === problem.correctDegree
      setSelected(v)
      setState(correct ? 'correct' : 'wrong')
      if (correct) setScore((s) => s + 1)
      void notesEqual
    },
    [state, problem]
  )

  const next = () => {
    if (round >= ROUND_LENGTH) {
      setFinished(true)
      setState('idle')
      const durationSec = Math.max(
        1,
        Math.round((Date.now() - roundStartRef.current) / 1000)
      )
      const result = { correct: score, total: ROUND_LENGTH, durationSec }
      saveDrillRound('chord-tone-id', result)
      setProblem(null)
      return
    }
    setRound((r) => r + 1)
    setProblem(generate())
    setSelected(null)
    setState('idle')
  }

  const answered = state !== 'idle'
  const idle = round === 0 || finished

  return (
    <DrillFrame
      number={1}
      drillType="chord-tone-id"
      title="도수 구구단"
      description="코드와 한 음이 주어집니다. 그 음이 몇 도인지 고르세요 (1, 3, 5, 7). 20문제가 한 라운드입니다."
      footerStats={[
        { label: 'Question', value: `${round}/${ROUND_LENGTH}` },
        { label: 'Score', value: score },
        { label: 'Rate', value: round === 0 ? '0%' : `${Math.round((score / Math.max(round, 1)) * 100)}%` },
      ]}
    >
      <section className="os-window" aria-label="문제">
        <div className="os-titlebar">
          <span className="os-ctl" aria-hidden />
          <span className="flex-1 truncate">
            {idle ? 'degree — ready' : `question.${String(round).padStart(3, '0')}`}
          </span>
          <span className="tabular">{`${round}/${ROUND_LENGTH}`}</span>
        </div>

        {/* 라운드 진행 막대 */}
        <div className="flex h-2 gap-px border-b border-ink bg-ink" aria-hidden>
          {Array.from({ length: ROUND_LENGTH }).map((_, i) => (
            <span key={i} className={`flex-1 ${i < round ? 'bg-pink' : 'bg-paper-bright'}`} />
          ))}
        </div>

        <div className="os-body">
          {problem ? (
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-x-4 px-5 py-10 font-sans sm:px-8 sm:py-14">
              <div>
                <div className="label text-ink-faint">Chord</div>
                <div
                  className="display mt-2 leading-[0.9] text-ink"
                  style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)' }}
                >
                  {problem.chordName}
                </div>
              </div>
              <div className="display pb-1 text-4xl text-ink-quiet sm:text-6xl" aria-hidden>·</div>
              <div className="text-right">
                <div className="label text-ink-faint">Note</div>
                <div
                  className="display mt-2 inline-block bg-pink px-3 leading-[0.9] text-ink"
                  style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)' }}
                >
                  {problem.highlightedNote}
                </div>
              </div>
            </div>
          ) : finished ? (
            <div className="px-5 py-10 font-sans sm:px-8">
              <div className="label mb-4 text-ink-faint">Round result</div>
              <ScoreDisplay correct={score} total={ROUND_LENGTH} />
            </div>
          ) : (
            <div className="px-5 py-10 font-sans sm:px-8 sm:py-14">
              <div className="label text-ink-faint">Example</div>
              <div className="display mt-2 text-5xl leading-[0.95] text-ink-quiet sm:text-7xl">
                Dm7 · C = 7
              </div>
            </div>
          )}

          <div className="border-t border-ink bg-gray p-3 sm:p-4">
            <DrillSelector
              choices={DEGREES}
              selected={selected}
              correctValue={state === 'idle' ? null : problem?.correctDegree ?? null}
              state={idle ? 'reveal' : state}
              columns={4}
              onSelect={onSelect}
            />
          </div>
        </div>

        <div
          className={`flex items-center justify-between gap-3 border-t border-ink px-3 py-3 ${
            state === 'correct' ? 'bg-blue' : state === 'wrong' ? 'bg-pink' : 'bg-gray'
          }`}
        >
          <span className="text-[11px] uppercase">
            {idle
              ? finished ? 'Round saved' : 'Press start'
              : state === 'correct'
              ? 'Correct'
              : state === 'wrong'
              ? `Wrong → ${problem?.correctDegree}`
              : 'Select a degree'}
          </span>
          {idle ? (
            <button type="button" onClick={start} className="os-btn">
              <IconPlay size={12} />
              {finished ? '다시' : '시작'}
            </button>
          ) : answered ? (
            <button type="button" onClick={next} className="os-btn">
              {round >= ROUND_LENGTH ? '결과' : '다음'}
              <IconArrowRight size={12} />
            </button>
          ) : null}
        </div>
      </section>
    </DrillFrame>
  )
}
