'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Note } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import DrillSelector, { SelectorState } from './shared/DrillSelector'
import ScoreDisplay from './shared/ScoreDisplay'
import { Button } from '@/components/ui'
import { IconPlay, IconArrowRight } from '@/components/icons'
import { saveDrillScore } from '@/lib/progress/drills'

const INTERVALS: { value: string; label: string; semitones: number }[] = [
  { value: 'm2', label: 'm2', semitones: 1 },
  { value: 'M2', label: 'M2', semitones: 2 },
  { value: 'm3', label: 'm3', semitones: 3 },
  { value: 'M3', label: 'M3', semitones: 4 },
  { value: 'P4', label: 'P4', semitones: 5 },
  { value: 'TT', label: 'TT', semitones: 6 },
  { value: 'P5', label: 'P5', semitones: 7 },
  { value: 'm6', label: 'm6', semitones: 8 },
  { value: 'M6', label: 'M6', semitones: 9 },
  { value: 'm7', label: 'm7', semitones: 10 },
  { value: 'M7', label: 'M7', semitones: 11 },
  { value: 'P8', label: 'P8', semitones: 12 },
]

const ROUND_LENGTH = 10

interface ToneSynth {
  triggerAttackRelease: (note: string, duration: string, time?: number) => void
  dispose?: () => void
}
interface ToneNS {
  start: () => Promise<void>
  Synth: new (opts?: unknown) => ToneSynth
  now: () => number
}

function randomMidi(min = 55, max = 72): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function IntervalEar() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<SelectorState>('idle')
  const [notes, setNotes] = useState<[string, string] | null>(null)
  const [finished, setFinished] = useState(false)
  const synthRef = useRef<ToneSynth | null>(null)
  const toneRef = useRef<ToneNS | null>(null)
  const [audioReady, setAudioReady] = useState(false)

  const ensureSynth = useCallback(async () => {
    if (!toneRef.current) {
      const mod = await import('tone')
      toneRef.current = mod as unknown as ToneNS
    }
    await toneRef.current.start()
    if (!synthRef.current) {
      synthRef.current = new toneRef.current.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.3, release: 0.8 },
      })
      // toDestination()
      ;(synthRef.current as unknown as { toDestination?: () => ToneSynth }).toDestination?.()
    }
    setAudioReady(true)
  }, [])

  const playInterval = useCallback(
    async (n1: string, n2: string) => {
      await ensureSynth()
      const synth = synthRef.current
      const Tone = toneRef.current
      if (!synth || !Tone) return
      const t = Tone.now()
      synth.triggerAttackRelease(n1, '4n', t)
      synth.triggerAttackRelease(n2, '4n', t + 1)
    },
    [ensureSynth]
  )

  const newQuestion = useCallback(async () => {
    const interval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)]
    const baseMidi = randomMidi()
    const n1 = Note.fromMidi(baseMidi)
    const n2 = Note.fromMidi(baseMidi + interval.semitones)
    setAnswer(interval.value)
    setNotes([n1, n2])
    setSelected(null)
    setState('idle')
    await playInterval(n1, n2)
  }, [playInterval])

  const start = async () => {
    setRound(1)
    setScore(0)
    setFinished(false)
    await newQuestion()
  }

  const replay = async () => {
    if (notes) await playInterval(notes[0], notes[1])
  }

  const onSelect = (value: string) => {
    if (state !== 'idle' || answer == null) return
    const correct = value === answer
    setSelected(value)
    setState(correct ? 'correct' : 'wrong')
    if (correct) setScore((s) => s + 1)
  }

  const next = async () => {
    if (round >= ROUND_LENGTH) {
      const finalScore = score
      setFinished(true)
      setState('idle')
      saveDrillScore('interval-ear', Math.round((finalScore / ROUND_LENGTH) * 100))
      return
    }
    setRound((r) => r + 1)
    await newQuestion()
  }

  useEffect(() => {
    return () => {
      synthRef.current?.dispose?.()
    }
  }, [])

  const choices = INTERVALS.map((i) => ({ value: i.value, label: i.label }))

  return (
    <DrillFrame
      number={2}
      title="인터벌 청음"
      description="두 음의 간격을 듣고 인터벌을 맞춥니다. 한 라운드 10문제."
      footerStats={[
        { label: 'Round', value: `${round}/${ROUND_LENGTH}` },
        { label: 'Score', value: score },
        { label: 'Rate', value: round === 0 ? '0%' : `${Math.round((score / Math.max(round - (state === 'idle' ? 1 : 0), 1)) * 100)}%` },
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
          ) : (
            <>
              <Button onClick={replay} variant="secondary" size="md" disabled={!audioReady}>
                <IconPlay size={16} />
                다시 듣기
              </Button>
              {state !== 'idle' && (
                <Button onClick={next} size="md">
                  {round >= ROUND_LENGTH ? '결과' : '다음'}
                  <IconArrowRight size={16} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="border border-rule bg-paper-bright p-6">
        <DrillSelector
          choices={choices}
          selected={selected}
          correctValue={state === 'idle' ? null : answer}
          state={state}
          columns={6}
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
