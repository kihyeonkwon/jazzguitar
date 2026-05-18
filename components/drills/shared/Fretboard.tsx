'use client'

import React from 'react'

// 표준 튜닝 — 1번줄(고음 e)이 위, 6번줄(저음 E)이 아래
// stringIndex 0 = 1번줄 (E4) ... 5 = 6번줄 (E2)
export const TUNING_MIDI = [64, 59, 55, 50, 45, 40] // 1→6번줄
export const STRING_LABELS = ['1', '2', '3', '4', '5', '6']

export const FRETS = 13 // 0(open) ~ 12

export interface FretPosition {
  string: number // 0~5 (0 = 1번줄 고음 e)
  fret: number   // 0~12
}

export interface MarkedPosition extends FretPosition {
  kind?: 'correct' | 'wrong' | 'highlight' | 'reveal'
  label?: string
}

interface FretboardProps {
  width?: number
  height?: number
  marks?: MarkedPosition[]
  onPositionClick?: (pos: FretPosition) => void
  showFretMarkers?: boolean
  excludeOpen?: boolean  // true면 0프렛(개방현) 클릭 비활성화 + 시각적으로 흐리게
}

export function midiAt(stringIdx: number, fret: number): number {
  return TUNING_MIDI[stringIdx] + fret
}

export default function Fretboard({
  width = 700,
  height = 200,
  marks = [],
  onPositionClick,
  showFretMarkers = true,
  excludeOpen = false,
}: FretboardProps) {
  const padLeft = 40
  const padRight = 16
  const padTop = 24
  const padBottom = 24

  const boardW = width - padLeft - padRight
  const boardH = height - padTop - padBottom

  const fretCount = FRETS // 0..12 = 13 columns
  // x position for fret n: nut at 0; we treat fret n center as (n + 0.5) / fretCount
  // But for open string (fret 0), draw click target left of the nut.
  const fretWidth = boardW / fretCount
  const stringSpacing = boardH / 5 // 6 strings → 5 gaps

  const stringY = (s: number) => padTop + s * stringSpacing
  const fretX = (f: number) => padLeft + f * fretWidth
  const noteCenterX = (f: number) =>
    f === 0 ? padLeft - fretWidth * 0.5 : fretX(f) - fretWidth * 0.5

  // 마커 표시(3,5,7,9,12)
  const singleMarkers = [3, 5, 7, 9]
  const doubleMarker = 12

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto select-none"
      role="img"
      aria-label="Guitar fretboard"
    >
      {/* 배경 */}
      <rect x={0} y={0} width={width} height={height} fill="var(--color-paper-bright)" />

      {/* 프렛 마커(도트) */}
      {showFretMarkers &&
        singleMarkers.map((f) => (
          <circle
            key={`m-${f}`}
            cx={fretX(f) - fretWidth * 0.5}
            cy={padTop + boardH / 2}
            r={3.5}
            fill="var(--color-ink-quiet)"
          />
        ))}
      {showFretMarkers && (
        <>
          <circle
            cx={fretX(doubleMarker) - fretWidth * 0.5}
            cy={padTop + boardH * 0.28}
            r={3.5}
            fill="var(--color-ink-quiet)"
          />
          <circle
            cx={fretX(doubleMarker) - fretWidth * 0.5}
            cy={padTop + boardH * 0.72}
            r={3.5}
            fill="var(--color-ink-quiet)"
          />
        </>
      )}

      {/* 줄(strings) */}
      {Array.from({ length: 6 }).map((_, s) => (
        <line
          key={`s-${s}`}
          x1={padLeft}
          y1={stringY(s)}
          x2={padLeft + boardW}
          y2={stringY(s)}
          stroke="var(--color-ink-faint)"
          strokeWidth={s >= 3 ? 1.4 : 0.9}
        />
      ))}

      {/* 프렛 (수직선) */}
      {Array.from({ length: fretCount + 1 }).map((_, f) => (
        <line
          key={`f-${f}`}
          x1={fretX(f)}
          y1={padTop}
          x2={fretX(f)}
          y2={padTop + boardH}
          stroke={f === 0 ? 'var(--color-ink)' : 'var(--color-ink-quiet)'}
          strokeWidth={f === 0 ? 3 : 1}
        />
      ))}

      {/* 프렛 번호 */}
      {Array.from({ length: fretCount }).map((_, f) => (
        <text
          key={`fn-${f}`}
          x={f === 0 ? padLeft - fretWidth * 0.5 : fretX(f) - fretWidth * 0.5}
          y={padTop + boardH + 14}
          textAnchor="middle"
          fontSize={9}
          fontFamily="var(--font-mono)"
          fill={
            excludeOpen && f === 0
              ? 'var(--color-ink-quiet)'
              : 'var(--color-ink-faint)'
          }
          opacity={excludeOpen && f === 0 ? 0.4 : 1}
        >
          {f}
        </text>
      ))}

      {/* 줄 라벨 (왼쪽) */}
      {STRING_LABELS.map((lbl, s) => (
        <text
          key={`sl-${s}`}
          x={padLeft - 14}
          y={stringY(s) + 3}
          textAnchor="middle"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-faint)"
        >
          {lbl}
        </text>
      ))}

      {/* 클릭 hit area + 마커 */}
      {Array.from({ length: 6 }).map((_, s) =>
        Array.from({ length: fretCount }).map((_, f) => {
          const mark = marks.find((m) => m.string === s && m.fret === f)
          const cx = noteCenterX(f)
          const cy = stringY(s)
          const isOpenDisabled = excludeOpen && f === 0
          return (
            <g key={`p-${s}-${f}`}>
              {onPositionClick && !isOpenDisabled && (
                <rect
                  x={cx - fretWidth * 0.45}
                  y={cy - stringSpacing * 0.45}
                  width={fretWidth * 0.9}
                  height={stringSpacing * 0.9}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => onPositionClick({ string: s, fret: f })}
                />
              )}
              {mark && !isOpenDisabled && <Marker cx={cx} cy={cy} mark={mark} />}
            </g>
          )
        })
      )}
    </svg>
  )
}

function Marker({ cx, cy, mark }: { cx: number; cy: number; mark: MarkedPosition }) {
  const r = 11
  const { kind = 'highlight', label } = mark
  if (kind === 'wrong') {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-paper-bright)"
          stroke="#fca5a5"
          strokeWidth={1.2}
        />
        <line
          x1={cx - 4}
          y1={cy - 4}
          x2={cx + 4}
          y2={cy + 4}
          stroke="#ef4444"
          strokeWidth={1.4}
        />
        <line
          x1={cx + 4}
          y1={cy - 4}
          x2={cx - 4}
          y2={cy + 4}
          stroke="#ef4444"
          strokeWidth={1.4}
        />
      </g>
    )
  }
  if (kind === 'reveal') {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--color-paper-bright)"
          stroke="var(--color-ink)"
          strokeWidth={1.4}
        />
        {label && (
          <text
            x={cx}
            y={cy + 3}
            textAnchor="middle"
            fontSize={9}
            fontFamily="var(--font-mono)"
            fill="var(--color-ink)"
            fontWeight={600}
          >
            {label}
          </text>
        )}
      </g>
    )
  }
  // correct or highlight — solid ink
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="var(--color-ink)" />
      {label && (
        <text
          x={cx}
          y={cy + 3}
          textAnchor="middle"
          fontSize={9}
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-inv)"
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  )
}
