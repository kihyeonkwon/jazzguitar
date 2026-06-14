'use client'

type VoicingKind = 'drop2' | 'drop3'
type QualityId = 'maj7' | 'm7' | '7' | 'm7b5' | 'dim7'

interface StringSetDef {
  id: string
  name: string
  kind: VoicingKind
  strings: number[]
  note: string
}

interface QualityDef {
  id: QualityId
  suffix: string
  intervals: number[]
  degreeLabels: string[]
}

interface ShapePosition {
  stringIndex: number
  fret: number
  degree: number
}

interface DropVoicingMapProps {
  title?: string
  root?: string
  quality?: QualityId
  setId?: string
  className?: string
}

const STRING_SETS: StringSetDef[] = [
  {
    id: 'drop2-2345',
    name: 'Drop 2 · 2-5번줄',
    kind: 'drop2',
    strings: [2, 3, 4, 5],
    note: '기본 중역대',
  },
  {
    id: 'drop2-1234',
    name: 'Drop 2 · 1-4번줄',
    kind: 'drop2',
    strings: [1, 2, 3, 4],
    note: '멜로디 코드',
  },
  {
    id: 'drop2-3456',
    name: 'Drop 2 · 3-6번줄',
    kind: 'drop2',
    strings: [3, 4, 5, 6],
    note: '낮은 컴핑',
  },
  {
    id: 'drop3-1235',
    name: 'Drop 3 · 1-2-3-5번줄',
    kind: 'drop3',
    strings: [1, 2, 3, 5],
    note: '위쪽 넓은 배치',
  },
  {
    id: 'drop3-2346',
    name: 'Drop 3 · 2-3-4-6번줄',
    kind: 'drop3',
    strings: [2, 3, 4, 6],
    note: '아래쪽 넓은 배치',
  },
]

const QUALITY_DEFS: Record<QualityId, QualityDef> = {
  maj7: {
    id: 'maj7',
    suffix: 'maj7',
    intervals: [0, 4, 7, 11],
    degreeLabels: ['R', '3', '5', '7'],
  },
  m7: {
    id: 'm7',
    suffix: 'm7',
    intervals: [0, 3, 7, 10],
    degreeLabels: ['R', 'b3', '5', 'b7'],
  },
  '7': {
    id: '7',
    suffix: '7',
    intervals: [0, 4, 7, 10],
    degreeLabels: ['R', '3', '5', 'b7'],
  },
  m7b5: {
    id: 'm7b5',
    suffix: 'm7b5',
    intervals: [0, 3, 6, 10],
    degreeLabels: ['R', 'b3', 'b5', 'b7'],
  },
  dim7: {
    id: 'dim7',
    suffix: 'dim7',
    intervals: [0, 3, 6, 9],
    degreeLabels: ['R', 'b3', 'b5', 'bb7'],
  },
}

const TUNING_MIDI = [64, 59, 55, 50, 45, 40] // string 1 -> 6
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
const FLAT_NOTE_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const INVERSION_COLORS = ['#2D3A31', '#6F806D', '#C27B66', '#9F5560']
const QUALITY_ORDER: QualityId[] = ['maj7', '7', 'm7', 'm7b5', 'dim7']
function mod12(n: number): number {
  return ((n % 12) + 12) % 12
}

function noteName(pc: number): string {
  return FLAT_NOTE_NAMES[mod12(pc)] ?? 'C'
}

function prettyChord(symbol: string): string {
  return symbol.replaceAll('b', '♭')
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

function fretsForPc(stringIndex: number, pc: number): number[] {
  const frets: number[] = []
  for (let fret = 1; fret <= 16; fret++) {
    if (mod12(TUNING_MIDI[stringIndex] + fret) === pc) frets.push(fret)
  }
  return frets
}

function candidateShapes(
  rootPc: number,
  quality: QualityDef,
  set: StringSetDef,
  inversion: number,
): ShapePosition[][] {
  const pcs = quality.intervals.map((interval) => mod12(rootPc + interval))
  const stringIndices = [...set.strings].sort((a, b) => b - a).map((stringNumber) => stringNumber - 1)
  const order = voiceOrder(set.kind, inversion, quality.intervals)
  const fretChoices = order.map((degree, i) => fretsForPc(stringIndices[i], pcs[degree]))
  const out: ShapePosition[][] = []

  if (fretChoices.some((choices) => choices.length === 0)) return out

  for (const f0 of fretChoices[0]) {
    for (const f1 of fretChoices[1]) {
      for (const f2 of fretChoices[2]) {
        for (const f3 of fretChoices[3]) {
          const frets = [f0, f1, f2, f3]
          const span = Math.max(...frets) - Math.min(...frets)
          if (span > 5) continue
          out.push(
            frets.map((fret, i) => ({
              stringIndex: stringIndices[i],
              fret,
              degree: order[i],
            })),
          )
        }
      }
    }
  }

  return out
}

function pickShape(
  rootPc: number,
  quality: QualityDef,
  set: StringSetDef,
  inversion: number,
): ShapePosition[] {
  const candidates = candidateShapes(rootPc, quality, set, inversion)
  const sorted = [...candidates].sort((a, b) => shapeCost(a) - shapeCost(b))
  return sorted[0] ?? []
}

function shapeCost(shape: ShapePosition[]): number {
  const frets = shape.map((position) => position.fret)
  const span = Math.max(...frets) - Math.min(...frets)
  const center = frets.reduce((sum, fret) => sum + fret, 0) / frets.length
  return center * 2 + span * 1.5
}

function shapeCenter(shape: ShapePosition[]): number {
  if (shape.length === 0) return Number.POSITIVE_INFINITY
  return shape.reduce((sum, position) => sum + position.fret, 0) / shape.length
}

function inversionLabel(root: string, rootPc: number, quality: QualityDef, shape: ShapePosition[]): string {
  const bass = shape.reduce<ShapePosition | null>((lowest, position) => {
    if (!lowest) return position
    return position.stringIndex > lowest.stringIndex ? position : lowest
  }, null)
  const symbol = `${root}${quality.suffix}`
  if (!bass || bass.degree === 0) return symbol
  const bassNote = noteName(rootPc + quality.intervals[bass.degree])
  return `${symbol}/${bassNote}`
}

function MapRow({
  root,
  rootPc,
  quality,
  set,
  rowMode = 'set',
}: {
  root: string
  rootPc: number
  quality: QualityDef
  set: StringSetDef
  rowMode?: 'set' | 'quality'
}) {
  const shapes = [0, 1, 2, 3]
    .map((inversion) => pickShape(rootPc, quality, set, inversion))
    .filter((shape) => shape.length > 0)
    .sort((a, b) => shapeCenter(a) - shapeCenter(b))
  const allFrets = shapes.flatMap((shape) => shape.map((position) => position.fret))
  const startFret = Math.max(1, (allFrets.length > 0 ? Math.min(...allFrets) : 1) - 1)
  const endFret = Math.min(16, (allFrets.length > 0 ? Math.max(...allFrets) : 12) + 1)
  const fretCount = endFret - startFret + 1
  const activeStrings = new Set(set.strings.map((stringNumber) => stringNumber - 1))
  const padLeft = 34
  const padRight = 18
  const padTop = 28
  const padBottom = 34
  const cellW = 52
  const cellH = 24
  const width = padLeft + cellW * fretCount + padRight
  const height = padTop + cellH * 5 + padBottom
  const boardW = cellW * fretCount
  const xForFret = (fret: number) => padLeft + (fret - startFret + 0.5) * cellW
  const xForLine = (index: number) => padLeft + index * cellW
  const yForString = (stringIndex: number) => padTop + stringIndex * cellH
  const chordName = `${root}${quality.suffix}`
  const rowTitle = rowMode === 'quality' ? prettyChord(chordName) : set.name
  const rowNote = rowMode === 'quality' ? quality.id.toUpperCase() : set.note

  return (
    <div className="border-t border-rule first:border-t-0 py-7">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="display text-2xl text-ink leading-tight">{rowTitle}</div>
          <div className="mt-1 text-[11px] font-mono tracking-widest text-ink-faint uppercase">
            {rowNote}
          </div>
        </div>
        <div className="text-[11px] font-mono tracking-widest text-ink-faint">
          {set.strings.join(' · ')} STRING SET
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto min-w-[720px] select-none"
          style={{ width: '100%' }}
          role="img"
          aria-label={`${set.name} ${root}${quality.suffix} inversions`}
        >
          <rect x={0} y={0} width={width} height={height} rx={18} fill="var(--color-surface-soft)" />

          {[3, 5, 7, 9, 12, 15].map((fret) => {
            if (fret < startFret || fret > endFret) return null
            return (
              <circle
                key={`marker-${fret}`}
                cx={xForFret(fret)}
                cy={padTop + cellH * 2.5}
                r={fret === 12 ? 5 : 4}
                fill="var(--color-clay)"
              />
            )
          })}

          {Array.from({ length: 6 }).map((_, stringIndex) => (
            <line
              key={`string-${stringIndex}`}
              x1={padLeft}
              x2={padLeft + boardW}
              y1={yForString(stringIndex)}
              y2={yForString(stringIndex)}
              stroke={activeStrings.has(stringIndex) ? 'var(--color-ink)' : 'var(--color-rule-strong)'}
              strokeWidth={activeStrings.has(stringIndex) ? (stringIndex >= 3 ? 1.5 : 1.15) : 0.8}
            />
          ))}

          {Array.from({ length: fretCount + 1 }).map((_, index) => (
            <line
              key={`fret-${index}`}
              x1={xForLine(index)}
              x2={xForLine(index)}
              y1={padTop}
              y2={padTop + cellH * 5}
              stroke="var(--color-rule-strong)"
              strokeWidth={1}
            />
          ))}

          {Array.from({ length: fretCount }).map((_, index) => {
            const fret = startFret + index
            return (
              <text
                key={`fret-label-${fret}`}
                x={xForFret(fret)}
                y={height - 8}
                textAnchor="middle"
                fontSize={9}
                fontFamily="var(--font-mono)"
                fill="var(--color-ink-faint)"
              >
                {fret}
              </text>
            )
          })}

          {shapes.map((shape, inversion) => {
            const color = INVERSION_COLORS[inversion]
            const label = inversionLabel(root, rootPc, quality, shape)
            const labelX = shape.length > 0
              ? shape.reduce((sum, position) => sum + xForFret(position.fret), 0) / shape.length
              : 0

            return (
              <g key={`shape-${inversion}`}>
                {shape.map((position) => (
                  <g key={`${inversion}-${position.stringIndex}-${position.fret}`}>
                    <circle
                      cx={xForFret(position.fret)}
                      cy={yForString(position.stringIndex)}
                      r={12}
                      fill={color}
                    />
                    <text
                      x={xForFret(position.fret)}
                      y={yForString(position.stringIndex) + 4}
                      textAnchor="middle"
                      fontSize={9}
                      fontFamily="var(--font-mono)"
                      fontWeight={700}
                      fill="var(--color-ink-inv)"
                    >
                      {quality.degreeLabels[position.degree]}
                    </text>
                  </g>
                ))}
                <text
                  x={labelX}
                  y={height - 22}
                  textAnchor="middle"
                  fontSize={12}
                  fontFamily="var(--font-mono)"
                  fontWeight={700}
                  fill={color}
                >
                  {prettyChord(label)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default function DropVoicingMap({
  title,
  root = 'C',
  quality = 'maj7',
  setId,
  className = '',
}: DropVoicingMapProps) {
  const normalizedRoot = root.trim() || 'C'
  const rootPc = NOTE_TO_PC[normalizedRoot] ?? 0
  const qualityDef = QUALITY_DEFS[quality] ?? QUALITY_DEFS.maj7
  const selectedSet = setId ? STRING_SETS.find((set) => set.id === setId) : undefined
  const rows = selectedSet
    ? QUALITY_ORDER.map((qualityId) => ({ set: selectedSet, quality: QUALITY_DEFS[qualityId] }))
    : STRING_SETS.map((set) => ({ set, quality: qualityDef }))
  const heading = selectedSet
    ? selectedSet.name
    : `${normalizedRoot}${qualityDef.suffix} 전체 지판 지도`

  return (
    <div className={`organic-card my-8 overflow-hidden ${className}`}>
      <div className="border-b border-rule bg-paper-bright/70 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="eyebrow">{title ?? 'Drop 2/3 Map'}</div>
            <h3 className="display mt-2 text-3xl leading-tight text-ink">
              {prettyChord(heading)}
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['root', 'blue', 'amber', 'red'].map((label, index) => (
              <div key={label} className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-ink-faint uppercase">
                <span
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: INVERSION_COLORS[index] }}
                />
                INV {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-7">
        {rows.map(({ set, quality: rowQuality }) => (
          <MapRow
            key={`${set.id}-${rowQuality.id}`}
            root={normalizedRoot}
            rootPc={rootPc}
            quality={rowQuality}
            set={set}
            rowMode={selectedSet ? 'quality' : 'set'}
          />
        ))}
      </div>
    </div>
  )
}
