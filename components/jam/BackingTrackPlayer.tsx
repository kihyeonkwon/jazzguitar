'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Chord } from 'tonal'
import { BackingTrack } from '@/lib/curriculum/types'

interface Props {
  track: BackingTrack
}

interface FlatStep {
  chord: string
  notes: string[] // voicing notes (with octave)
}

// Build a 4-note voicing for a chord symbol around middle range.
function voicingFor(chordSymbol: string): string[] {
  const c = Chord.get(chordSymbol)
  // tonal returns names like "C", "E", "G", "B"
  let pcs = c.notes && c.notes.length ? c.notes.slice(0, 4) : []
  if (pcs.length === 0) {
    // Fallback: use root major triad
    const root = c.tonic ?? chordSymbol.replace(/[^A-G#b]/g, '')
    pcs = [root, root, root]
  }
  // Place root low (octave 3), others octave 4
  return pcs.map((n, i) => `${n}${i === 0 ? 3 : 4}`)
}

// Get bass note one octave below root
function bassFor(chordSymbol: string): string {
  const c = Chord.get(chordSymbol)
  const root = c.tonic ?? chordSymbol.replace(/[^A-G#b]/g, '')[0] ?? 'C'
  return `${root}2`
}

export default function BackingTrackPlayer({ track }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [currentBar, setCurrentBar] = useState(0)
  const [currentChord, setCurrentChord] = useState<string>('')
  const [currentChorus, setCurrentChorus] = useState(1)
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const partRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const synthsRef = useRef<any[]>([])

  // Build flat array of "per-beat" entries.
  const beatSteps: FlatStep[] = []
  for (const c of track.chords) {
    const v = voicingFor(c.chord)
    for (let i = 0; i < c.beats; i++) {
      beatSteps.push({ chord: c.chord, notes: v })
    }
  }
  const totalBeats = beatSteps.length
  const beatsPerBar = totalBeats / track.bars

  const stop = useCallback(() => {
    if (partRef.current) {
      try {
        partRef.current.stop()
        partRef.current.dispose()
      } catch {
        /* ignore */
      }
      partRef.current = null
    }
    synthsRef.current.forEach((s) => {
      try {
        s.dispose()
      } catch {
        /* ignore */
      }
    })
    synthsRef.current = []
    if (toneRef.current) {
      try {
        toneRef.current.getTransport().stop()
        toneRef.current.getTransport().cancel()
      } catch {
        /* ignore */
      }
    }
    setIsPlaying(false)
    setCurrentBeat(0)
    setCurrentBar(0)
    setCurrentChord('')
    setCurrentChorus(1)
  }, [])

  useEffect(() => () => stop(), [stop])

  const start = useCallback(async () => {
    setLoading(true)
    const Tone = await import('tone')
    toneRef.current = Tone
    await Tone.start()

    // Cleanup any prior
    if (partRef.current) {
      try {
        partRef.current.stop()
        partRef.current.dispose()
      } catch {
        /* ignore */
      }
    }
    synthsRef.current.forEach((s) => {
      try {
        s.dispose()
      } catch {
        /* ignore */
      }
    })
    synthsRef.current = []

    Tone.getTransport().bpm.value = track.bpm

    const chordSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.4, sustain: 0.0, release: 0.3 },
      volume: -10,
    }).toDestination()

    const bassSynth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.3 },
      volume: -8,
    }).toDestination()

    const kick = new Tone.MembraneSynth({ volume: -4 }).toDestination()
    const hat = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 },
      volume: -22,
    }).toDestination()

    synthsRef.current = [chordSynth, bassSynth, kick, hat]

    const loopCount = track.loopCount ?? 8

    // Build events
    type Evt = { time: string; step: FlatStep; index: number }
    const events: Evt[] = beatSteps.map((s, i) => ({
      time: `0:0:${i}` /* not used directly; we use Part with beat increments */,
      step: s,
      index: i,
    }))

    let chorus = 1

    const part = new Tone.Part(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (time: number, evt: Evt) => {
        const { step, index } = evt
        const isBeatOne = index % beatsPerBar === 0
        // Chord hit on every beat (staccato)
        chordSynth.triggerAttackRelease(step.notes, '8n', time, 0.6)
        // Bass on beats 1 & 3
        const beatInBar = index % beatsPerBar
        if (beatInBar === 0 || beatInBar === 2) {
          bassSynth.triggerAttackRelease(bassFor(step.chord), '4n', time, 0.8)
        }
        // Kick on 1 & 3
        if (beatInBar === 0 || beatInBar === 2) {
          kick.triggerAttackRelease('C1', '8n', time, 0.8)
        }
        // Hat on 2 & 4
        if (beatInBar === 1 || beatInBar === 3) {
          hat.triggerAttackRelease('16n', time, 0.5)
        }

        Tone.getDraw().schedule(() => {
          setCurrentBeat(index % beatsPerBar)
          setCurrentBar(Math.floor(index / beatsPerBar))
          setCurrentChord(step.chord)
          if (index === 0 && isBeatOne) {
            // chorus boundary
          }
          if (index === totalBeats - 1) {
            chorus += 1
            if (chorus <= loopCount) {
              setCurrentChorus(chorus)
            }
          }
        }, time)
      },
      events.map((e, i) => [i * (60 / track.bpm), e] as [number, Evt])
    )

    part.loop = true
    part.loopEnd = totalBeats * (60 / track.bpm)
    part.start(0)
    partRef.current = part

    // Stop transport after loopCount choruses
    Tone.getTransport().scheduleOnce(() => {
      stop()
    }, totalBeats * (60 / track.bpm) * loopCount)

    Tone.getTransport().start()
    setIsPlaying(true)
    setLoading(false)
  }, [track, beatSteps, beatsPerBar, totalBeats, stop])

  const toggle = useCallback(() => {
    if (isPlaying) stop()
    else start()
  }, [isPlaying, start, stop])

  return (
    <div className="border border-rule bg-paper-bright">

      {/* 상단: 현재 코드 + BPM */}
      <div className="flex items-stretch border-b border-rule">
        <div className="flex-1 p-6 border-r border-rule">
          <div className="eyebrow mb-2">Now Playing</div>
          <div className="display text-4xl text-ink leading-none tabular font-mono">
            {currentChord || track.chords[0]?.chord || '—'}
          </div>
          <div className="text-[11px] font-mono tabular text-ink-faint tracking-widest mt-3">
            BAR {String(currentBar + 1).padStart(2, '0')}/{String(track.bars).padStart(2, '0')}
            <span className="mx-2 text-ink-quiet">·</span>
            BEAT {currentBeat + 1}
            <span className="mx-2 text-ink-quiet">·</span>
            CHORUS {currentChorus}/{track.loopCount ?? 8}
          </div>
        </div>
        <div className="w-32 p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-mono font-medium text-ink tabular leading-none">
            {track.bpm}
          </div>
          <div className="eyebrow mt-2">BPM</div>
        </div>
      </div>

      {/* 박자 인디케이터 — 4 thin bars */}
      <div className="flex gap-px bg-rule">
        {Array.from({ length: beatsPerBar }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-0.5 transition-colors"
            style={{
              backgroundColor: isPlaying && currentBeat === i
                ? '#0a0a0a'
                : '#fafafa',
            }}
          />
        ))}
      </div>

      {/* 코드 진행 */}
      <div className="p-5 border-b border-rule">
        <div className="eyebrow mb-3">Progression</div>
        <div className="flex flex-wrap gap-1.5">
          {track.chords.map((c, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-surface text-[11px] font-mono tabular text-ink-soft"
            >
              {c.chord}
              <span className="text-ink-faint ml-1">·{c.beats}b</span>
            </span>
          ))}
        </div>
      </div>

      {/* 컨트롤 */}
      <button
        onClick={toggle}
        disabled={loading}
        className={`w-full h-14 text-sm font-medium transition-colors disabled:opacity-30 ${
          isPlaying
            ? 'bg-ink text-ink-inv hover:bg-ink-soft'
            : 'bg-paper-bright text-ink hover:bg-surface'
        }`}
      >
        {loading ? 'LOADING' : isPlaying ? '■  STOP' : '▶  START'}
      </button>
    </div>
  )
}
