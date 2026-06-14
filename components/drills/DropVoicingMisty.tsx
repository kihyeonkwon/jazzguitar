'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DrillFrame from './shared/DrillFrame'
import { Button, Card } from '@/components/ui'
import { IconArrowLeft, IconArrowRight, IconPlay, IconStop } from '@/components/icons'
import { saveDrillRound } from '@/lib/progress/drills'

type VoicingKind = 'drop2' | 'drop3'

interface StringSetDef {
  id: string
  name: string
  kind: VoicingKind
  strings: number[]
  description: string
}

interface ChordEvent {
  section: 'A' | 'B'
  bar: number
  chord: string
  beats: number
}

interface ShapePosition {
  string: number
  fret: number
  label: string
}

interface VoicingStep extends ChordEvent {
  shape: ShapePosition[]
  inversion: number
  bassFret: number
}

const STRING_SETS: StringSetDef[] = [
  {
    id: 'drop2-1234',
    name: 'Drop 2 · 1-4번줄',
    kind: 'drop2',
    strings: [1, 2, 3, 4],
    description: '가장 높은 4현. 멜로디 코드와 솔로 기타에 좋습니다.',
  },
  {
    id: 'drop2-2345',
    name: 'Drop 2 · 2-5번줄',
    kind: 'drop2',
    strings: [2, 3, 4, 5],
    description: '중역대 핵심 셋. 컴핑과 코드 멜로디 양쪽에 안정적입니다.',
  },
  {
    id: 'drop2-3456',
    name: 'Drop 2 · 3-6번줄',
    kind: 'drop2',
    strings: [3, 4, 5, 6],
    description: '낮은 4현. 두꺼운 컴핑과 베이스 움직임 훈련용입니다.',
  },
  {
    id: 'drop3-1235',
    name: 'Drop 3 · 1-2-3-5번줄',
    kind: 'drop3',
    strings: [1, 2, 3, 5],
    description: '5번줄 베이스형. Joe Pass식 솔로 기타 감각에 가깝습니다.',
  },
  {
    id: 'drop3-2346',
    name: 'Drop 3 · 2-3-4-6번줄',
    kind: 'drop3',
    strings: [2, 3, 4, 6],
    description: '6번줄 베이스형. 루트 이동을 몸에 넣기 좋습니다.',
  },
]

const TUNING_MIDI = [64, 59, 55, 50, 45, 40] // guitar string 1 -> 6
const NOTE_TO_PC: Record<string, number> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
}

const MISTY_EVENTS: ChordEvent[] = [
  { section: 'A', bar: 1, chord: 'Ebmaj7', beats: 4 },
  { section: 'A', bar: 2, chord: 'Bbm7', beats: 2 },
  { section: 'A', bar: 2, chord: 'Eb7', beats: 2 },
  { section: 'A', bar: 3, chord: 'Abmaj7', beats: 4 },
  { section: 'A', bar: 4, chord: 'Abm7', beats: 2 },
  { section: 'A', bar: 4, chord: 'Db7', beats: 2 },
  { section: 'A', bar: 5, chord: 'Ebmaj7', beats: 2 },
  { section: 'A', bar: 5, chord: 'Cm7', beats: 2 },
  { section: 'A', bar: 6, chord: 'Fm7', beats: 2 },
  { section: 'A', bar: 6, chord: 'Bb7', beats: 2 },
  { section: 'A', bar: 7, chord: 'Gm7', beats: 2 },
  { section: 'A', bar: 7, chord: 'C7', beats: 2 },
  { section: 'A', bar: 8, chord: 'Fm7', beats: 2 },
  { section: 'A', bar: 8, chord: 'Bb7', beats: 2 },
  { section: 'B', bar: 9, chord: 'Bbm7', beats: 4 },
  { section: 'B', bar: 10, chord: 'Eb7b9', beats: 4 },
  { section: 'B', bar: 11, chord: 'Abmaj7', beats: 4 },
  { section: 'B', bar: 12, chord: 'Abmaj7', beats: 4 },
  { section: 'B', bar: 13, chord: 'Am7', beats: 4 },
  { section: 'B', bar: 14, chord: 'D7', beats: 2 },
  { section: 'B', bar: 14, chord: 'F7', beats: 2 },
  { section: 'B', bar: 15, chord: 'Gm7', beats: 2 },
  { section: 'B', bar: 15, chord: 'C7', beats: 2 },
  { section: 'B', bar: 16, chord: 'Fm7', beats: 2 },
  { section: 'B', bar: 16, chord: 'Bb7', beats: 2 },
  { section: 'A', bar: 17, chord: 'Ebmaj7', beats: 4 },
  { section: 'A', bar: 18, chord: 'Bbm7', beats: 2 },
  { section: 'A', bar: 18, chord: 'Eb7', beats: 2 },
  { section: 'A', bar: 19, chord: 'Abmaj7', beats: 4 },
  { section: 'A', bar: 20, chord: 'Abm7', beats: 2 },
  { section: 'A', bar: 20, chord: 'Db7', beats: 2 },
  { section: 'A', bar: 21, chord: 'Ebmaj7', beats: 2 },
  { section: 'A', bar: 21, chord: 'Cm7', beats: 2 },
  { section: 'A', bar: 22, chord: 'Fm7', beats: 2 },
  { section: 'A', bar: 22, chord: 'Bb7', beats: 2 },
  { section: 'A', bar: 23, chord: 'Eb6', beats: 4 },
  { section: 'A', bar: 24, chord: 'Fm7', beats: 2 },
  { section: 'A', bar: 24, chord: 'Bb7', beats: 2 },
]

const DROP_DEGREE_LABELS = ['R', '3', '5', '7']

function mod12(n: number): number {
  return ((n % 12) + 12) % 12
}

function guitarStringToIndex(stringNumber: number): number {
  return stringNumber - 1
}

function formatChord(chord: string): string {
  return chord
    .replaceAll('b', '♭')
    .replace('maj7', '△7')
    .replace('m7', '-7')
    .replace('7♭9', '7♭9')
    .replace('6', '6')
}

function chordIntervals(chord: string): number[] {
  if (chord.includes('maj7')) return [0, 4, 7, 11]
  if (chord.endsWith('6')) return [0, 4, 7, 9]
  if (chord.includes('m7')) return [0, 3, 7, 10]
  return [0, 4, 7, 10]
}

function parseRoot(chord: string): string {
  const match = chord.match(/^[A-G](?:b|#)?/)
  return match?.[0] ?? 'C'
}

function fretsForPc(stringIndex: number, pc: number): number[] {
  const out: number[] = []
  for (let fret = 0; fret <= 16; fret++) {
    if (mod12(TUNING_MIDI[stringIndex] + fret) === pc) out.push(fret)
  }
  return out
}

function voiceOrder(kind: VoicingKind, inversion: number, intervals: number[]): number[] {
  const closed = [0, 1, 2, 3].map((_, index) => ({
    degree: (inversion + index) % 4,
    octave: Math.floor((inversion + index) / 4),
  }))
  const droppedIndex = kind === 'drop2' ? 2 : 1
  closed[droppedIndex] = {
    ...closed[droppedIndex],
    octave: closed[droppedIndex].octave - 1,
  }
  return [...closed]
    .sort((a, b) => {
      const pitchA = a.octave * 12 + intervals[a.degree]
      const pitchB = b.octave * 12 + intervals[b.degree]
      return pitchA - pitchB
    })
    .map((voice) => voice.degree)
}

function candidateShapes(chord: string, set: StringSetDef): ShapePosition[][] {
  const root = parseRoot(chord)
  const rootPc = NOTE_TO_PC[root] ?? 0
  const intervals = chordIntervals(chord)
  const pcs = intervals.map((interval) => mod12(rootPc + interval))
  const stringIndices = [...set.strings]
    .sort((a, b) => b - a)
    .map(guitarStringToIndex)
  const out: ShapePosition[][] = []

  for (let inversion = 0; inversion < 4; inversion++) {
    const order = voiceOrder(set.kind, inversion, intervals)
    const fretChoices = order.map((degree, i) => fretsForPc(stringIndices[i], pcs[degree]))
    if (fretChoices.some((choices) => choices.length === 0)) continue

    for (const f0 of fretChoices[0]) {
      for (const f1 of fretChoices[1]) {
        for (const f2 of fretChoices[2]) {
          for (const f3 of fretChoices[3]) {
            const frets = [f0, f1, f2, f3]
            const span = Math.max(...frets) - Math.min(...frets)
            if (span > 5) continue
            if (Math.min(...frets) < 1) continue
            out.push(
              frets.map((fret, i) => ({
                string: stringIndices[i],
                fret,
                label: DROP_DEGREE_LABELS[order[i]],
              }))
            )
          }
        }
      }
    }
  }

  return out
}

function shapeCost(shape: ShapePosition[], prev?: ShapePosition[]): number {
  const frets = shape.map((p) => p.fret)
  const span = Math.max(...frets) - Math.min(...frets)
  const center = frets.reduce((sum, fret) => sum + fret, 0) / frets.length
  const centerCost = Math.abs(center - 6) * 1.4
  if (!prev) return span * 3 + centerCost
  const movement = shape.reduce((sum, p, i) => sum + Math.abs(p.fret - (prev[i]?.fret ?? p.fret)), 0)
  return movement * 4 + span * 2 + centerCost
}

function buildSteps(set: StringSetDef): VoicingStep[] {
  let prev: ShapePosition[] | undefined
  return MISTY_EVENTS.map((event) => {
    const candidates = candidateShapes(event.chord, set)
    const shape = [...candidates].sort((a, b) => shapeCost(a, prev) - shapeCost(b, prev))[0]
    const fallback = [
      { string: 3, fret: 8, label: 'R' },
      { string: 2, fret: 7, label: '3' },
      { string: 1, fret: 8, label: '5' },
      { string: 0, fret: 6, label: '7' },
    ]
    prev = shape ?? fallback
    return {
      ...event,
      shape: prev,
      inversion: 0,
      bassFret: Math.min(...prev.map((p) => p.fret)),
    }
  })
}

function useClickMetronome({
  bpm,
  currentStep,
  totalSteps,
  onStep,
  onStop,
}: {
  bpm: number
  currentStep: number
  totalSteps: number
  onStep: (index: number) => void
  onStop: (completedCount: number) => void
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const beatWithinStepRef = useRef(0)
  const currentStepRef = useRef(currentStep)
  const intervalRef = useRef<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clickRef = useRef<any>(null)

  useEffect(() => {
    currentStepRef.current = currentStep
    beatWithinStepRef.current = 0
  }, [currentStep])

  const stop = useCallback((completedCount = currentStepRef.current + 1) => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPlaying(false)
    setBeat(0)
    beatWithinStepRef.current = 0
    onStop(completedCount)
  }, [onStop])

  useEffect(() => () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    try { clickRef.current?.dispose?.() } catch { /* ignore */ }
  }, [])

  const start = useCallback(async (steps: VoicingStep[]) => {
    const Tone = await import('tone')
    toneRef.current = Tone
    await Tone.start()
    clickRef.current?.dispose?.()
    clickRef.current = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
      volume: -8,
    }).toDestination()

    setIsPlaying(true)
    intervalRef.current = window.setInterval(() => {
      const step = steps[currentStepRef.current]
      const nextBeatInBar = (beatWithinStepRef.current % 4) + 1
      try {
        clickRef.current?.triggerAttackRelease(nextBeatInBar === 1 ? 'C5' : 'C4', '32n')
      } catch { /* ignore */ }
      setBeat(nextBeatInBar)

      beatWithinStepRef.current += 1
      if (step && beatWithinStepRef.current >= step.beats) {
        beatWithinStepRef.current = 0
        const nextIndex = currentStepRef.current + 1
        if (nextIndex >= totalSteps) {
          stop(totalSteps)
        } else {
          currentStepRef.current = nextIndex
          onStep(nextIndex)
        }
      }
    }, Math.max(120, 60000 / bpm))
  }, [bpm, onStep, stop, totalSteps])

  const restart = useCallback((steps: VoicingStep[]) => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    intervalRef.current = null
    void start(steps)
  }, [start])

  return { isPlaying, beat, start, stop, restart }
}

export default function DropVoicingMisty() {
  const [setId, setSetId] = useState(STRING_SETS[0].id)
  const [stepIndex, setStepIndex] = useState(0)
  const [bpm, setBpm] = useState(70)
  const startedAtRef = useRef<number>(0)
  const activeSet = STRING_SETS.find((set) => set.id === setId) ?? STRING_SETS[0]
  const steps = useMemo(() => buildSteps(activeSet), [activeSet])
  const current = steps[stepIndex]
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100)

  const onStop = useCallback((completedCount: number) => {
    if (startedAtRef.current > 0 && completedCount > 1) {
      const durationSec = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000))
      saveDrillRound('drop-voicing-misty', {
        correct: completedCount,
        total: steps.length,
        durationSec,
      })
    }
    startedAtRef.current = 0
  }, [steps.length])

  const metronome = useClickMetronome({
    bpm,
    currentStep: stepIndex,
    totalSteps: steps.length,
    onStep: setStepIndex,
    onStop,
  })

  const changeSet = useCallback((nextSetId: string) => {
    metronome.stop()
    setSetId(nextSetId)
    setStepIndex(0)
  }, [metronome])

  const start = useCallback(() => {
    startedAtRef.current = Date.now()
    void metronome.start(steps)
  }, [metronome, steps])

  const prev = useCallback(() => {
    metronome.stop()
    setStepIndex((i) => Math.max(0, i - 1))
  }, [metronome])

  const next = useCallback(() => {
    metronome.stop()
    setStepIndex((i) => Math.min(steps.length - 1, i + 1))
  }, [metronome, steps.length])

  return (
    <DrillFrame
      number={8}
      wide
      title="Drop 2 / Drop 3 · Misty"
      description="선택한 스트링셋 하나만 사용해서 Misty 전체 진행을 처음부터 끝까지 연결합니다. 각 코드 칸 안에 해당 쉐입을 함께 표시합니다."
      footerStats={[
        { label: 'Tune', value: 'Misty' },
        { label: 'Step', value: `${stepIndex + 1}/${steps.length}` },
        { label: 'Progress', value: `${progress}%` },
      ]}
    >
      <section className="space-y-6">
        <Card className="grid gap-px overflow-hidden bg-rule lg:grid-cols-[280px_minmax(0,1fr)_220px_260px]">
          <div className="bg-paper-bright p-5">
            <label htmlFor="string-set" className="eyebrow">String Set</label>
            <select
              id="string-set"
              value={setId}
              onChange={(event) => changeSet(event.target.value)}
              className="mt-2 h-11 w-full border border-rule bg-paper-bright px-3 text-sm text-ink outline-none focus:border-ink"
            >
              {STRING_SETS.map((set) => (
                <option key={set.id} value={set.id}>{set.name}</option>
              ))}
            </select>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              {activeSet.description}
            </p>
          </div>

          <div className="bg-paper-bright p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Metronome</span>
              <span className="text-xl font-mono tabular text-ink">{bpm}</span>
            </div>
            <input
              type="range"
              min={45}
              max={140}
              value={bpm}
              onChange={(event) => setBpm(Number(event.target.value))}
              className="w-full h-1 cursor-pointer appearance-none bg-rule"
              style={{ accentColor: '#0a0a0a' }}
            />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-2 transition-colors ${metronome.isPlaying && metronome.beat === n ? 'bg-ink' : 'bg-rule'}`}
                />
              ))}
            </div>
          </div>

          <div className="bg-paper-bright p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="eyebrow">Current</span>
              <span className="section-no">{stepIndex + 1} / {steps.length}</span>
            </div>
            <div className="display text-3xl font-mono text-ink leading-none">
              {formatChord(current.chord)}
            </div>
            <div className="mt-2 text-xs font-mono tracking-widest text-ink-faint">
              BAR {String(current.bar).padStart(2, '0')} · {progress}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-paper-bright p-5">
            {metronome.isPlaying ? (
              <Button onClick={() => metronome.stop()} className="col-span-2">
                <IconStop size={14} />
                정지
              </Button>
            ) : (
              <Button onClick={start} className="col-span-2">
                <IconPlay size={14} />
                시작
              </Button>
            )}
            <Button variant="secondary" onClick={prev} disabled={stepIndex === 0}>
              <IconArrowLeft size={14} />
              이전
            </Button>
            <Button variant="secondary" onClick={next} disabled={stepIndex === steps.length - 1}>
              다음
              <IconArrowRight size={14} />
            </Button>
          </div>
        </Card>

        <MistySheet
          steps={steps}
          currentIndex={stepIndex}
          activeStrings={activeSet.strings}
        />
      </section>
    </DrillFrame>
  )
}

function ShapeFretboard({
  shape,
  activeStrings,
  small = false,
}: {
  shape: ShapePosition[]
  activeStrings: number[]
  small?: boolean
}) {
  const activeIndices = new Set(activeStrings.map(guitarStringToIndex))
  const frets = shape.map((p) => p.fret)
  const startFret = Math.max(1, Math.min(...frets) - 1)
  const endFret = Math.min(16, Math.max(...frets) + 1)
  const fretCount = endFret - startFret + 1
  const width = small ? 260 : 560
  const height = small ? 132 : 280
  const padX = small ? 24 : 44
  const padTop = small ? 20 : 36
  const boardW = width - padX * 2
  const boardH = height - padTop - (small ? 22 : 38)
  const stringY = (s: number) => padTop + s * (boardH / 5)
  const fretX = (f: number) => padX + ((f - startFret + 1) / fretCount) * boardW
  const noteX = (f: number) => padX + ((f - startFret + 0.5) / fretCount) * boardW

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Drop voicing shape">
      <rect width={width} height={height} fill="var(--color-paper-bright)" />
      {Array.from({ length: 6 }).map((_, s) => (
        <line
          key={`s-${s}`}
          x1={padX}
          x2={padX + boardW}
          y1={stringY(s)}
          y2={stringY(s)}
          stroke={activeIndices.has(s) ? 'var(--color-ink)' : 'var(--color-rule)'}
          strokeWidth={activeIndices.has(s) ? (s >= 3 ? 1.5 : 1.1) : 0.8}
        />
      ))}
      {Array.from({ length: fretCount + 1 }).map((_, i) => {
        const fret = startFret + i
        return (
          <g key={`f-${fret}`}>
            <line
              x1={fretX(startFret + i - 1)}
              x2={fretX(startFret + i - 1)}
              y1={padTop}
              y2={padTop + boardH}
              stroke="var(--color-rule-strong)"
              strokeWidth={1}
            />
            {i < fretCount && (
              <text
                x={noteX(fret)}
                y={height - (small ? 7 : 13)}
                textAnchor="middle"
                fontSize={small ? 8 : 10}
                fontFamily="var(--font-mono)"
                fill="var(--color-ink-faint)"
              >
                {fret}
              </text>
            )}
          </g>
        )
      })}
      {shape.map((pos) => (
        <g key={`${pos.string}-${pos.fret}`}>
          <circle
            cx={noteX(pos.fret)}
            cy={stringY(pos.string)}
            r={small ? 9 : 16}
            fill="var(--color-ink)"
          />
          <text
            x={noteX(pos.fret)}
            y={stringY(pos.string) + (small ? 3 : 5)}
            textAnchor="middle"
            fontSize={small ? 7 : 12}
            fontFamily="var(--font-mono)"
            fontWeight={600}
            fill="var(--color-ink-inv)"
          >
            {pos.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function MistySheet({
  steps,
  currentIndex,
  activeStrings,
}: {
  steps: VoicingStep[]
  currentIndex: number
  activeStrings: number[]
}) {
  const bars = useMemo(() => {
    const map = new Map<number, VoicingStep[]>()
    steps.forEach((step) => {
      const group = map.get(step.bar) ?? []
      group.push(step)
      map.set(step.bar, group)
    })
    return Array.from(map.entries()).map(([bar, items]) => ({ bar, items }))
  }, [steps])

  const current = steps[currentIndex]

  return (
    <Card className="overflow-hidden">
      <div className="flex items-baseline justify-between border-b border-rule px-5 py-4">
        <span className="eyebrow">Lead Sheet · Misty</span>
        <span className="section-no">Erroll Garner</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-rule">
        {bars.map((bar) => {
          const active = bar.bar === current.bar
          return (
            <div
              key={bar.bar}
              className={`min-h-[260px] bg-paper-bright p-4 transition-colors ${active ? 'bg-surface' : ''}`}
            >
              <div className="mb-3 flex items-baseline justify-between">
                <span className="section-no">{String(bar.bar).padStart(2, '0')}</span>
                <span className="eyebrow">{bar.items[0]?.section}</span>
              </div>
              <div className="space-y-4">
                {bar.items.map((item, itemIndex) => {
                  const isCurrent = item === current
                  return (
                    <div
                      key={`${item.bar}-${item.chord}-${item.beats}-${itemIndex}`}
                      className={`border transition-colors ${
                        isCurrent
                          ? 'border-ink bg-paper-bright'
                          : 'border-transparent'
                      }`}
                    >
                      <div className="p-2">
                        <ShapeFretboard
                          shape={item.shape}
                          activeStrings={activeStrings}
                          small
                        />
                      </div>
                      <div className="flex items-baseline justify-between border-t border-rule px-2 py-2">
                        <span
                          className={`font-mono text-2xl leading-none ${
                            isCurrent ? 'text-ink' : 'text-ink-soft'
                          }`}
                        >
                          {formatChord(item.chord)}
                        </span>
                        <span className="section-no">{item.beats}B</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
