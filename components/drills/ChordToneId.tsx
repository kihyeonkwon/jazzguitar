'use client'

import { useCallback, useState } from 'react'
import { Chord } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import DrillSelector, { SelectorState } from './shared/DrillSelector'
import ScoreDisplay from './shared/ScoreDisplay'
import { Button } from '@/components/ui'
import { IconArrowRight, IconPlay } from '@/components/icons'
import { saveDrillScore } from '@/lib/progress/drills'

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

  const start = () => {
    setRound(1)
    setScore(0)
    setFinished(false)
    setProblem(generate())
    setSelected(null)
    setState('idle')
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
      saveDrillScore('chord-tone-id', Math.round((score / ROUND_LENGTH) * 100))
      setProblem(null)
      return
    }
    setRound((r) => r + 1)
    setProblem(generate())
    setSelected(null)
    setState('idle')
  }

  return (
    <DrillFrame
      number={5}
      title="코드톤 식별"
      description="코드와 한 음이 주어집니다. 그 음의 도수를 고르세요 (1, 3, 5, 7)."
      footerStats={[
        { label: 'Round', value: `${round}/${ROUND_LENGTH}` },
        { label: 'Score', value: score },
        { label: 'Rate', value: round === 0 ? '0%' : `${Math.round((score / Math.max(round, 1)) * 100)}%` },
      ]}
    >
      <div className="flex items-center justify-between">
        <div className="eyebrow">
          {round === 0 ? 'Idle' : `Question ${round}`}
        </div>
        <div className="flex gap-2">
          {round === 0 || finished ? (
            <Button onClick={start} size="md">
              <IconPlay size={16} />
              {finished ? '다시' : '시작'}
            </Button>
          ) : state !== 'idle' ? (
            <Button onClick={next} size="md">
              {round >= ROUND_LENGTH ? '결과' : '다음'}
              <IconArrowRight size={16} />
            </Button>
          ) : null}
        </div>
      </div>

      {problem && (
        <div className="border border-rule bg-paper-bright p-8 flex items-center justify-center gap-6">
          <div className="display text-5xl font-mono text-ink">{problem.chordName}</div>
          <div className="text-ink-faint text-2xl font-mono">·</div>
          <div className="flex flex-col items-center">
            <span className="eyebrow mb-1">Note</span>
            <span className="display text-5xl font-mono text-ink border-b-2 border-ink pb-1 px-2">
              {problem.highlightedNote}
            </span>
          </div>
        </div>
      )}

      <div className="border border-rule bg-paper-bright p-6">
        <DrillSelector
          choices={DEGREES}
          selected={selected}
          correctValue={state === 'idle' ? null : problem?.correctDegree ?? null}
          state={state}
          columns={4}
          onSelect={onSelect}
        />
      </div>

      {finished && (
        <div className="border border-ink p-4">
          <div className="eyebrow mb-2">Round Result</div>
          <ScoreDisplay correct={score} total={ROUND_LENGTH} />
        </div>
      )}
    </DrillFrame>
  )
}
