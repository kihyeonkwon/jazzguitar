'use client'

import { useState } from 'react'
import { Note } from 'tonal'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'

/**
 * 정적 지판 다이어그램 — 단일 또는 다중 포지션(캐러셀).
 *
 * 마크다운 fenced 블록 예시:
 *   ```fretboard
 *   title: F Minor Pentatonic
 *   root: F
 *   notes: F, Ab, Bb, C, Eb
 *   frets: 1-5                    # 단일 포지션
 *   ```
 *
 *   ```fretboard
 *   title: F Minor Pentatonic · 5 포지션
 *   root: F
 *   notes: F, Ab, Bb, C, Eb
 *   positions: 1-5, 3-7, 5-9, 8-12, 10-14   # 다중 → 캐러셀
 *   ```
 */

// 표준 튜닝: 1번줄(고음 e)이 위, 6번줄(저음 E)이 아래
const TUNING_MIDI = [64, 59, 55, 50, 45, 40] // 1→6번줄

interface FretboardDiagramProps {
  title?: string
  root: string
  notes: string[]
  frets?: [number, number]
  positions?: Array<[number, number]>  // 다중 포지션 (캐러셀)
  positionLabels?: string[]            // 각 포지션 이름
  showDegrees?: boolean
  className?: string
}

function pc(midi: number): number {
  return ((midi % 12) + 12) % 12
}
function pcFromName(name: string): number | null {
  const m = Note.midi(name + '4')
  return m == null ? null : pc(m)
}

function semitoneToDegree(semi: number): string {
  const map: Record<number, string> = {
    0: '1', 1: '♭2', 2: '2', 3: '♭3', 4: '3', 5: '4',
    6: '♭5', 7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7',
  }
  return map[semi] ?? String(semi)
}

function prettyNote(name: string): string {
  return name.replace(/b/g, '♭').replace(/#/g, '♯')
}

function FretboardSvg({
  root, notes, frets, showDegrees,
}: {
  root: string
  notes: string[]
  frets: [number, number]
  showDegrees: boolean
}) {
  const rootPc = pcFromName(root)
  const notePcs = notes.map(pcFromName).filter((n): n is number => n !== null)

  const [fromFret, toFret] = frets
  const fretCount = toFret - fromFret + 1
  const showOpen = fromFret === 0

  const padLeft = showOpen ? 24 : 38
  const padRight = 16
  const padTop = 20
  const padBottom = 22
  const cellW = 50
  const cellH = 22

  const width = padLeft + cellW * fretCount + padRight
  const height = padTop + cellH * 5 + padBottom

  const stringY = (s: number) => padTop + s * cellH
  const cellCenterX = (fretRel: number) => padLeft + (fretRel + 0.5) * cellW

  interface Mark {
    string: number
    fret: number
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
      marks.push({ string: s, fret: f, fretRel: f - fromFret, pc: notePc, isRoot, label })
    }
  }

  const singleMarkers = [3, 5, 7, 9, 15, 17, 19, 21]
  const doubleMarker  = [12, 24]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto select-none"
      style={{ maxWidth: width }}
    >
      {/* 프렛 번호 */}
      {Array.from({ length: fretCount }).map((_, i) => {
        const f = fromFret + i
        if (f === 0) return null
        return (
          <text
            key={`fnum-${i}`}
            x={cellCenterX(i)} y={padTop - 8}
            fontSize={9} fill="#a3a3a3"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >{f}</text>
        )
      })}

      {/* 프렛 마커 */}
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
            <circle key={`mark-${f}`} cx={cx} cy={padTop + (cellH * 5) / 2}
              r={2.5} fill="#e5e5e5" />
          )
        })}

      {/* 줄 */}
      {Array.from({ length: 6 }).map((_, s) => (
        <line key={`str-${s}`}
          x1={padLeft} y1={stringY(s)}
          x2={padLeft + cellW * fretCount} y2={stringY(s)}
          stroke="#a3a3a3" strokeWidth={s >= 4 ? 1.5 : 1}
        />
      ))}

      {/* 프렛 */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => {
        const isNut = fromFret + i === 0
        return (
          <line key={`fret-${i}`}
            x1={padLeft + i * cellW} y1={padTop}
            x2={padLeft + i * cellW} y2={padTop + cellH * 5}
            stroke={isNut ? '#0a0a0a' : '#d4d4d4'}
            strokeWidth={isNut ? 3 : 1}
          />
        )
      })}

      {/* 음 마커 */}
      {marks.map((m, i) => {
        const isOpen = m.fret === 0
        const cx = isOpen ? padLeft - 14 : cellCenterX(m.fretRel)
        const cy = stringY(m.string)
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={m.isRoot ? 10 : 9}
              fill={m.isRoot ? '#0a0a0a' : 'white'}
              stroke="#0a0a0a"
              strokeWidth={m.isRoot ? 0 : 1.5}
            />
            <text x={cx} y={cy} fontSize={9}
              fill={m.isRoot ? '#fafafa' : '#0a0a0a'}
              fontFamily="var(--font-mono)" fontWeight={600}
              textAnchor="middle" dominantBaseline="central"
            >{m.label}</text>
          </g>
        )
      })}

      {/* 줄 번호 (오른쪽) */}
      {Array.from({ length: 6 }).map((_, s) => (
        <text key={`slbl-${s}`}
          x={padLeft + cellW * fretCount + 6} y={stringY(s) + 3}
          fontSize={8} fill="#d4d4d4"
          fontFamily="var(--font-mono)"
        >{s + 1}</text>
      ))}
    </svg>
  )
}

export default function FretboardDiagram({
  title,
  root,
  notes,
  frets = [0, 12],
  positions,
  positionLabels,
  showDegrees = true,
  className = '',
}: FretboardDiagramProps) {
  const isCarousel = positions && positions.length > 1
  const allPositions: Array<[number, number]> = isCarousel ? positions! : [frets]
  const [idx, setIdx] = useState(0)

  const currentFrets = allPositions[idx]
  const currentLabel = positionLabels?.[idx]
  const totalLabel = isCarousel
    ? `${idx + 1} / ${allPositions.length}`
    : null

  return (
    <div className={`my-6 ${className}`}>
      {(title || currentLabel) && (
        <div className="mb-2 flex items-baseline justify-between">
          <div className="text-[11px] font-mono tracking-widest text-ink-faint uppercase">
            {title}
            {currentLabel && <span className="ml-2 text-ink">· {currentLabel}</span>}
          </div>
          {totalLabel && (
            <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
              {totalLabel}
            </span>
          )}
        </div>
      )}

      <FretboardSvg
        root={root}
        notes={notes}
        frets={currentFrets}
        showDegrees={showDegrees}
      />

      {/* 캐러셀 컨트롤 */}
      {isCarousel && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {allPositions.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 transition-colors ${
                  i === idx ? 'bg-ink' : 'bg-rule hover:bg-ink-soft'
                }`}
                aria-label={`Position ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIdx(i => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="w-7 h-7 border border-rule hover:border-ink-soft disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
            >
              <IconArrowLeft size={14} />
            </button>
            <button
              onClick={() => setIdx(i => Math.min(allPositions.length - 1, i + 1))}
              disabled={idx === allPositions.length - 1}
              className="w-7 h-7 border border-rule hover:border-ink-soft disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
            >
              <IconArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

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
