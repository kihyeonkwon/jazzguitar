'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Chord, Note } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import DrillSelector, { SelectorState } from './shared/DrillSelector'
import ScoreDisplay from './shared/ScoreDisplay'
import { Button } from '@/components/ui'
import { IconPlay, IconArrowRight } from '@/components/icons'
import { saveDrillRound } from '@/lib/progress/drills'

const QUALITIES = [
  { value: 'maj7', label: 'Maj7' },
  { value: 'm7',   label: 'm7' },
  { value: '7',    label: '7' },
  { value: 'm7b5', label: 'm7b5' },
  { value: 'dim7', label: 'dim7' },
]

const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']

const ROUND_LENGTH = 10

interface PolySynth {
  triggerAttackRelease: (notes: string[], duration: string, time?: number) => void
  dispose?: () => void
}
interface ToneNS {
  start: () => Promise<void>
  PolySynth: new (voice: unknown, opts?: unknown) => PolySynth
  Synth: unknown
  now: () => number
}

export default function ChordQualityEar() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)
  const [chordNotes, setChordNotes] = useState<string[] | null>(null)
  const [state, setState] = useState<SelectorState>('idle')
  const [finished, setFinished] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const polyRef = useRef<PolySynth | null>(null)
  const toneRef = useRef<ToneNS | null>(null)
  const roundStartRef = useRef<number>(0)

  const ensure = useCallback(async () => {
    if (!toneRef.current) {
      const mod = await import('tone')
      toneRef.current = mod as unknown as ToneNS
    }
    await toneRef.current.start()
    if (!polyRef.current) {
      polyRef.current = new toneRef.current.PolySynth(toneRef.current.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.4, release: 1.2 },
      })
      ;(polyRef.current as unknown as { toDestination?: () => PolySynth }).toDestination?.()
    }
    setAudioReady(true)
  }, [])

  const play = useCallback(
    async (notes: string[]) => {
      await ensure()
      const poly = polyRef.current
      if (!poly) return
      poly.triggerAttackRelease(notes, '2n')
    },
    [ensure]
  )

  const newQuestion = useCallback(async () => {
    const quality = QUALITIES[Math.floor(Math.random() * QUALITIES.length)]
    const root = ROOTS[Math.floor(Math.random() * ROOTS.length)]
    const chordName = root + quality.value
    const c = Chord.get(chordName)
    // 4성부, 옥타브 4부터
    const baseOctave = 4
    const rootMidi = Note.midi(root + baseOctave) ?? 60
    const notes: string[] = []
    let lastMidi = rootMidi - 1
    for (const n of c.notes) {
      // 다음 음은 항상 직전 음보다 위에 있도록
      let m = Note.midi(n + baseOctave)
      if (m == null) continue
      while (m <= lastMidi) m += 12
      notes.push(Note.fromMidi(m))
      lastMidi = m
    }
    setAnswer(quality.value)
    setChordNotes(notes)
    setSelected(null)
    setState('idle')
    await play(notes)
  }, [play])

  const start = async () => {
    setRound(1)
    setScore(0)
    setFinished(false)
    roundStartRef.current = Date.now()
    await newQuestion()
  }

  const replay = async () => {
    if (chordNotes) await play(chordNotes)
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
      setFinished(true)
      setState('idle')
      const durationSec = Math.max(
        1,
        Math.round((Date.now() - roundStartRef.current) / 1000)
      )
      saveDrillRound('chord-quality-ear', {
        correct: score,
        total: ROUND_LENGTH,
        durationSec,
      })
      return
    }
    setRound((r) => r + 1)
    await newQuestion()
  }

  useEffect(() => {
    return () => {
      polyRef.current?.dispose?.()
    }
  }, [])

  return (
    <DrillFrame
      number={3}
      title="코드 퀄리티 청음"
      description="4성부 코드를 듣고 퀄리티를 맞춥니다. Maj7, m7, 7, m7b5, dim7."
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
          choices={QUALITIES}
          selected={selected}
          correctValue={state === 'idle' ? null : answer}
          state={state}
          columns={5}
          onSelect={onSelect}
        />
      </div>

      {state !== 'idle' && chordNotes && (
        <div className="border-l border-ink pl-4 py-1">
          <div className="eyebrow mb-1">정답 음</div>
          <div className="font-mono text-sm text-ink-soft tracking-widest">
            {chordNotes.join('  ·  ')}
          </div>
        </div>
      )}

      {finished && (
        <div className="border border-ink p-4">
          <div className="eyebrow mb-2">Round Result</div>
          <ScoreDisplay correct={score} total={ROUND_LENGTH} />
        </div>
      )}
    </DrillFrame>
  )
}
