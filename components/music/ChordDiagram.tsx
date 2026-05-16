'use client'

import { useState } from 'react'

interface ChordDiagramProps {
  chordName: string
  className?: string
}

// Simple chord fingering data
const CHORD_DATA: Record<
  string,
  {
    frets: number[] // -1=mute, 0=open, 1-5=fret number
    fingers: number[] // finger numbers (0=none, 1-4)
    baseFret: number
    barres?: { fret: number; fromString: number; toString: number }[]
  }
> = {
  Cmaj7: { frets: [-1, 3, 2, 4, 3, -1], fingers: [0, 2, 1, 4, 3, 0], baseFret: 1 },
  Cm7: { frets: [-1, 3, 5, 3, 4, 3], fingers: [0, 1, 3, 1, 2, 1], baseFret: 1, barres: [{ fret: 3, fromString: 2, toString: 6 }] },
  C7: { frets: [-1, 3, 2, 3, 1, -1], fingers: [0, 3, 2, 4, 1, 0], baseFret: 1 },
  Cm7b5: { frets: [-1, 3, 4, 3, 4, -1], fingers: [0, 1, 3, 2, 4, 0], baseFret: 1 },
  Cdim7: { frets: [-1, 3, 4, 2, 4, -1], fingers: [0, 2, 3, 1, 4, 0], baseFret: 1 },
  Gmaj7: { frets: [3, 2, 0, 0, 0, 2], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  Gm7: { frets: [3, 5, 3, 3, 3, 3], fingers: [1, 4, 1, 1, 1, 1], baseFret: 1, barres: [{ fret: 3, fromString: 1, toString: 6 }] },
  G7: { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  Dm7: { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 3, 1, 2], baseFret: 1 },
  Am7b5: { frets: [-1, 0, 1, 2, 1, -1], fingers: [0, 0, 1, 3, 2, 0], baseFret: 1 },
  D7: { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], baseFret: 1 },
  F7: { frets: [1, 1, 2, 3, 3, 1], fingers: [1, 1, 2, 3, 4, 1], baseFret: 1, barres: [{ fret: 1, fromString: 1, toString: 6 }] },
  Bb7: { frets: [-1, 1, 3, 1, 3, 1], fingers: [0, 1, 3, 1, 4, 1], baseFret: 1, barres: [{ fret: 1, fromString: 1, toString: 5 }] },
}

const FRET_COUNT = 5
const STRING_COUNT = 6
const CELL_W = 32
const CELL_H = 28
const MARGIN_LEFT = 24
const MARGIN_TOP = 36
const DOT_R = 9

export default function ChordDiagram({ chordName, className = '' }: ChordDiagramProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const data = CHORD_DATA[chordName]

  const svgWidth = MARGIN_LEFT + CELL_W * (STRING_COUNT - 1) + 24
  const svgHeight = MARGIN_TOP + CELL_H * FRET_COUNT + 16

  const playChord = async () => {
    if (isPlaying || !data) return
    setIsPlaying(true)
    try {
      const Tone = await import('tone')
      await Tone.start()
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.6, release: 1.5 },
      }).toDestination()

      // Map frets to note names (simplified)
      const openNotes = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']
      const notes: string[] = []
      const baseFret = (data.baseFret || 1) - 1
      data.frets.forEach((fret, stringIdx) => {
        if (fret === -1) return
        const openNote = openNotes[stringIdx]
        const semitones = (fret === 0 ? 0 : fret + baseFret)
        const freq = Tone.Frequency(openNote).transpose(semitones).toNote()
        notes.push(freq)
      })

      if (notes.length > 0) {
        synth.triggerAttackRelease(notes, '2n')
      }
      setTimeout(() => setIsPlaying(false), 2000)
    } catch {
      setIsPlaying(false)
    }
  }

  if (!data) {
    return (
      <div
        className={`inline-flex flex-col items-center bg-white rounded-lg border border-gray-200 p-3 ${className}`}
      >
        <span className="text-gray-900 text-sm font-medium mb-2">{chordName}</span>
        <div className="text-gray-400 text-xs">다이어그램 없음</div>
      </div>
    )
  }

  return (
    <div
      className={`inline-flex flex-col items-center bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-gray-400 transition-colors ${className}`}
      onClick={playChord}
      title={`${chordName} 재생`}
    >
      <span className="text-gray-900 text-sm font-semibold mb-1">{chordName}</span>
      <svg width={svgWidth} height={svgHeight} style={{ display: 'block' }}>
        {/* Nut / base fret label */}
        {data.baseFret === 1 ? (
          <rect
            x={MARGIN_LEFT}
            y={MARGIN_TOP - 4}
            width={CELL_W * (STRING_COUNT - 1)}
            height={4}
            fill="#111111"
          />
        ) : (
          <text
            x={MARGIN_LEFT - 6}
            y={MARGIN_TOP + 14}
            fill="#9ca3af"
            fontSize={10}
            textAnchor="end"
          >
            {data.baseFret}fr
          </text>
        )}

        {/* Fret lines */}
        {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1={MARGIN_LEFT}
            y1={MARGIN_TOP + i * CELL_H}
            x2={MARGIN_LEFT + CELL_W * (STRING_COUNT - 1)}
            y2={MARGIN_TOP + i * CELL_H}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: STRING_COUNT }, (_, i) => (
          <line
            key={`string-${i}`}
            x1={MARGIN_LEFT + i * CELL_W}
            y1={MARGIN_TOP}
            x2={MARGIN_LEFT + i * CELL_W}
            y2={MARGIN_TOP + FRET_COUNT * CELL_H}
            stroke="#9ca3af"
            strokeWidth={1.5}
          />
        ))}

        {/* Barres */}
        {data.barres?.map((barre, idx) => {
          const x1 = MARGIN_LEFT + (STRING_COUNT - barre.toString) * CELL_W
          const x2 = MARGIN_LEFT + (STRING_COUNT - barre.fromString) * CELL_W
          const y = MARGIN_TOP + (barre.fret - (data.baseFret || 1)) * CELL_H + CELL_H / 2
          return (
            <rect
              key={`barre-${idx}`}
              x={x1}
              y={y - DOT_R}
              width={x2 - x1}
              height={DOT_R * 2}
              rx={DOT_R}
              fill="#111111"
            />
          )
        })}

        {/* Fret dots */}
        {data.frets.map((fret, stringIdx) => {
          const x = MARGIN_LEFT + (STRING_COUNT - 1 - stringIdx) * CELL_W
          if (fret === -1) {
            return (
              <text
                key={`mute-${stringIdx}`}
                x={x}
                y={MARGIN_TOP - 10}
                fill="#9ca3af"
                fontSize={12}
                textAnchor="middle"
              >
                ×
              </text>
            )
          }
          if (fret === 0) {
            return (
              <circle
                key={`open-${stringIdx}`}
                cx={x}
                cy={MARGIN_TOP - 10}
                r={5}
                fill="none"
                stroke="#9ca3af"
                strokeWidth={1.5}
              />
            )
          }
          const y = MARGIN_TOP + (fret - (data.baseFret || 1)) * CELL_H + CELL_H / 2
          // Skip if covered by barre
          const isBarre = data.barres?.some(
            (b) =>
              b.fret === fret + (data.baseFret || 1) - 1 &&
              STRING_COUNT - stringIdx >= b.fromString &&
              STRING_COUNT - stringIdx <= b.toString
          )
          if (isBarre) return null
          return (
            <circle
              key={`dot-${stringIdx}`}
              cx={x}
              cy={y}
              r={DOT_R}
              fill="#111111"
            />
          )
        })}
      </svg>
      <span className="text-gray-400 text-xs mt-1">
        {isPlaying ? '♪' : '클릭하여 재생'}
      </span>
    </div>
  )
}
