'use client'

import { Note } from 'tonal'

/**
 * 정적 지판 다이어그램 — 스케일/코드의 음을 지판 위에 표시합니다.
 *
 * 사용 예 (마크다운 fenced block):
 * ```fretboard
 * title: F Minor Pentatonic · 1포지션
 * root: F
 * notes: F, Ab, Bb, C, Eb
 * frets: 1-5
 * ```
 */

// 표준 튜닝: 1번줄(고음 e)이 위, 6번줄(저음 E)이 아래
const TUNING_MIDI = [64, 59, 55, 50, 45, 40] // 1→6번줄

interface FretboardDiagramProps {
  title?: string
  root: string                       // 'F', 'C#', 'Bb' 등
  notes: string[]                    // 표시할 음 ('F', 'Ab', 'Bb', ...)
  frets?: [number, number]           // 예: [1, 5] (포함 범위), 기본 [0, 12]
  showDegrees?: boolean              // true면 도수(1, b3, 4...), false면 음 이름
  className?: string
}

function pc(midi: number): number {
  return ((midi % 12) + 12) % 12
}
function pcFromName(name: string): number | null {
  const m = Note.midi(name + '4')
  return m == null ? null : pc(m)
}

// 도수 계산: 루트 PC 기준 반음 차이를 도수 표기로
function semitoneToDegree(semi: number): string {
  const map: Record<number, string> = {
    0: '1', 1: '♭2', 2: '2', 3: '♭3', 4: '3', 5: '4',
    6: '♭5', 7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7',
  }
  return map[semi] ?? String(semi)
}

// 음 이름을 깔끔하게 정규화 (예: Eb → E♭, F# → F♯)
function prettyNote(name: string): string {
  return name.replace(/b/g, '♭').replace(/#/g, '♯')
}

export default function FretboardDiagram({
  title,
  root,
  notes,
  frets = [0, 12],
  showDegrees = true,
  className = '',
}: FretboardDiagramProps) {
  const rootPc = pcFromName(root)
  const notePcs = notes.map(pcFromName).filter((n): n is number => n !== null)

  const [fromFret, toFret] = frets
  const fretCount = toFret - fromFret + 1
  const showOpen = fromFret === 0

  // 레이아웃
  const padLeft = showOpen ? 24 : 38
  const padRight = 16
  const padTop = title ? 28 : 16
  const padBottom = 22
  const cellW = 50
  const cellH = 22

  const width = padLeft + cellW * fretCount + padRight
  const height = padTop + cellH * 5 + padBottom

  const stringY = (s: number) => padTop + s * cellH
  const cellCenterX = (fretRelative: number) => padLeft + (fretRelative + 0.5) * cellW

  // 각 칸에 들어갈 마커 계산
  interface Mark {
    string: number
    fret: number  // absolute fret number
    fretRel: number
    pc: number
    isRoot: boolean
    label: string
  }
  const marks: Mark[] = []

  for (let s = 0; s < 6; s++) {
    for (let f = fromFret; f <= toFret; f++) {
      const notePc = pc(TUNING_MIDI[s] + f)
      if (!notePcs.includes(notePc)) continue
      const isRoot = rootPc === notePc
      let label: string
      if (showDegrees && rootPc !== null) {
        const diff = (notePc - rootPc + 12) % 12
        label = semitoneToDegree(diff)
      } else {
        label = prettyNote(Note.fromMidi(TUNING_MIDI[s] + f).replace(/\d+$/, ''))
      }
      marks.push({
        string: s,
        fret: f,
        fretRel: f - fromFret,
        pc: notePc,
        isRoot,
        label,
      })
    }
  }

  // 프렛 마커 (3, 5, 7, 9, 12)
  const singleMarkers = [3, 5, 7, 9, 15, 17, 19, 21]
  const doubleMarker  = [12, 24]

  return (
    <div className={`my-6 ${className}`}>
      {title && (
        <div className="mb-2 text-[11px] font-mono tracking-widest text-ink-faint uppercase">
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        style={{ maxWidth: width }}
      >
        {/* 위쪽 프렛 번호 */}
        {Array.from({ length: fretCount }).map((_, i) => {
          const f = fromFret + i
          if (f === 0) return null
          return (
            <text
              key={`fnum-${i}`}
              x={cellCenterX(i)}
              y={padTop - 8}
              fontSize={9}
              fill="#a3a3a3"
              fontFamily="ui-monospace, monospace"
              textAnchor="middle"
            >
              {f}
            </text>
          )
        })}

        {/* 프렛 마커 (3·5·7·9·12) */}
        {[...singleMarkers, ...doubleMarker]
          .filter(f => f >= fromFret && f <= toFret)
          .map(f => {
            const cx = cellCenterX(f - fromFret)
            const isDouble = doubleMarker.includes(f)
            if (isDouble) {
              return (
                <g key={`mark-${f}`}>
                  <circle cx={cx - 4} cy={padTop + (cellH * 5) / 2} r={2.5} fill="#e5e5e5" />
                  <circle cx={cx + 4} cy={padTop + (cellH * 5) / 2} r={2.5} fill="#e5e5e5" />
                </g>
              )
            }
            return (
              <circle
                key={`mark-${f}`}
                cx={cx}
                cy={padTop + (cellH * 5) / 2}
                r={2.5}
                fill="#e5e5e5"
              />
            )
          })}

        {/* 줄 */}
        {Array.from({ length: 6 }).map((_, s) => (
          <line
            key={`str-${s}`}
            x1={padLeft}
            y1={stringY(s)}
            x2={padLeft + cellW * fretCount}
            y2={stringY(s)}
            stroke="#a3a3a3"
            strokeWidth={s >= 4 ? 1.5 : 1}
          />
        ))}

        {/* 프렛 (세로 선) */}
        {Array.from({ length: fretCount + 1 }).map((_, i) => {
          const isNut = fromFret + i === 0
          return (
            <line
              key={`fret-${i}`}
              x1={padLeft + i * cellW}
              y1={padTop}
              x2={padLeft + i * cellW}
              y2={padTop + cellH * 5}
              stroke={isNut ? '#0a0a0a' : '#d4d4d4'}
              strokeWidth={isNut ? 3 : 1}
            />
          )
        })}

        {/* 마커 (음 표시) */}
        {marks.map((m, i) => {
          const isOpen = m.fret === 0
          // open string은 nut 왼쪽에 작게
          const cx = isOpen ? padLeft - 14 : cellCenterX(m.fretRel)
          const cy = stringY(m.string)
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={m.isRoot ? 10 : 9}
                fill={m.isRoot ? '#0a0a0a' : 'white'}
                stroke="#0a0a0a"
                strokeWidth={m.isRoot ? 0 : 1.5}
              />
              <text
                x={cx}
                y={cy}
                fontSize={9}
                fill={m.isRoot ? '#fafafa' : '#0a0a0a'}
                fontFamily="ui-monospace, monospace"
                fontWeight={600}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {m.label}
              </text>
            </g>
          )
        })}

        {/* 줄 번호 (오른쪽) */}
        {Array.from({ length: 6 }).map((_, s) => (
          <text
            key={`slbl-${s}`}
            x={padLeft + cellW * fretCount + 6}
            y={stringY(s) + 3}
            fontSize={8}
            fill="#d4d4d4"
            fontFamily="ui-monospace, monospace"
          >
            {s + 1}
          </text>
        ))}
      </svg>

      {/* 범례 */}
      <div className="mt-2 flex items-center gap-4 text-[10px] font-mono tracking-widest text-ink-faint">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-ink" /> ROOT ({prettyNote(root)})
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full border border-ink bg-paper-bright" />
          {showDegrees ? 'DEGREE' : 'NOTE'}
        </div>
      </div>
    </div>
  )
}
