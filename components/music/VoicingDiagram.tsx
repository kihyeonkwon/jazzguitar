'use client'

/**
 * 코드 보이싱 다이어그램 — 표준 chord box 스타일.
 *
 * 6줄을 세로로 그립니다(왼쪽이 6번줄=저음 E, 오른쪽이 1번줄=고음 E).
 * 프렛은 가로로. 음을 짚는 자리에 동그라미를 그리고, 베이스 음은 채워진 점.
 *
 * 마크다운 fenced 블록 예시:
 *   ```voicing
 *   title: Cmaj7 Drop 2 · 솔(G) 베이스
 *   frets: x x 5 5 5 7        # 6번줄부터 1번줄 순서
 *   labels: . . G C E B       # 각 프렛의 라벨 (점은 비표시)
 *   bass: 4                   # 베이스가 되는 줄 번호 (1-6, 옵션)
 *   ```
 */

interface VoicingDiagramProps {
  title?: string
  /** 6번줄→1번줄 순서. 'x' = 뮤트, 0 = 개방, N = 프렛 번호 */
  frets: Array<number | 'x'>
  /** 각 프렛 라벨 (6개). '.' 또는 빈 값이면 라벨 없음. */
  labels?: Array<string | undefined>
  /** 베이스로 강조할 줄 (1-6). 지정 시 그 점이 검정 채움. */
  bass?: number
  className?: string
}

export default function VoicingDiagram({
  title,
  frets,
  labels,
  bass,
  className = '',
}: VoicingDiagramProps) {
  // 표시할 프렛 범위 결정 (최소 4프렛 폭)
  const fretted = frets.filter((f): f is number => typeof f === 'number' && f > 0)
  const minFret = fretted.length > 0 ? Math.min(...fretted) : 1
  const maxFret = fretted.length > 0 ? Math.max(...fretted) : 4
  // 최소 4프렛 폭 유지, 시작은 최소 1
  const span = Math.max(4, maxFret - minFret + 1)
  const startFret = Math.max(1, minFret)

  const CELL_W = 32           // 한 줄 간격
  const CELL_H = 36           // 한 프렛 높이
  const PAD_LEFT = 28         // 좌측 (프렛 번호 라벨)
  const PAD_RIGHT = 12
  const PAD_TOP = 24          // 상단 (뮤트/개방 표시)
  const PAD_BOTTOM = 12

  const stringCount = 6
  const width = PAD_LEFT + (stringCount - 1) * CELL_W + PAD_RIGHT
  const height = PAD_TOP + span * CELL_H + PAD_BOTTOM

  // 줄 인덱스 → x 좌표 (0=6번줄, 5=1번줄)
  const stringX = (i: number) => PAD_LEFT + i * CELL_W
  // 프렛 → y 좌표 (1프렛=top 줄 바로 아래)
  const fretY = (relFret: number) => PAD_TOP + relFret * CELL_H - CELL_H / 2

  return (
    <div className={`my-6 flex flex-col items-center ${className}`}>
      {title && (
        <div className="mb-3 text-[11px] font-mono tracking-widest text-ink-faint uppercase text-center">
          {title}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto select-none"
        style={{ width, maxWidth: '100%' }}
      >
        {/* 너트 (1프렛부터 시작할 때만 굵게) */}
        {startFret === 1 && (
          <rect
            x={PAD_LEFT - 1}
            y={PAD_TOP - 3}
            width={(stringCount - 1) * CELL_W + 2}
            height={4}
            fill="#0a0a0a"
          />
        )}

        {/* 시작 프렛 번호 (1프렛이 아닐 때) */}
        {startFret > 1 && (
          <text
            x={PAD_LEFT - 8}
            y={PAD_TOP + CELL_H / 2}
            fontSize={11}
            fontFamily="var(--font-mono)"
            fill="#737373"
            textAnchor="end"
            dominantBaseline="central"
          >
            {startFret}fr
          </text>
        )}

        {/* 프렛 가로선 */}
        {Array.from({ length: span + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={PAD_LEFT}
            y1={PAD_TOP + i * CELL_H}
            x2={PAD_LEFT + (stringCount - 1) * CELL_W}
            y2={PAD_TOP + i * CELL_H}
            stroke="#0a0a0a"
            strokeWidth={i === 0 && startFret === 1 ? 0 : 1}
          />
        ))}

        {/* 줄 세로선 */}
        {Array.from({ length: stringCount }).map((_, i) => (
          <line
            key={`string-${i}`}
            x1={stringX(i)}
            y1={PAD_TOP}
            x2={stringX(i)}
            y2={PAD_TOP + span * CELL_H}
            stroke="#0a0a0a"
            strokeWidth={1}
          />
        ))}

        {/* 점 / 뮤트 / 개방 표시 */}
        {frets.map((f, i) => {
          // i=0 → 6번줄, i=5 → 1번줄
          const x = stringX(i)
          const stringNum = 6 - i  // 6번줄이 i=0
          const label = labels?.[i]
          const showLabel = label && label !== '.' && label !== '-'

          if (f === 'x') {
            return (
              <text
                key={`m-${i}`}
                x={x}
                y={PAD_TOP - 10}
                fontSize={13}
                fontFamily="var(--font-mono)"
                fill="#737373"
                textAnchor="middle"
                dominantBaseline="central"
              >
                ×
              </text>
            )
          }
          if (f === 0) {
            return (
              <circle
                key={`o-${i}`}
                cx={x}
                cy={PAD_TOP - 10}
                r={5}
                fill="none"
                stroke="#0a0a0a"
                strokeWidth={1.5}
              />
            )
          }

          // fretted note
          const relFret = f - startFret + 1
          if (relFret < 1 || relFret > span) return null

          const cy = fretY(relFret)
          const isBass = bass === stringNum
          const fillColor = isBass ? '#0a0a0a' : '#ffffff'
          const textColor = isBass ? '#ffffff' : '#0a0a0a'

          return (
            <g key={`d-${i}`}>
              <circle
                cx={x}
                cy={cy}
                r={11}
                fill={fillColor}
                stroke="#0a0a0a"
                strokeWidth={1.5}
              />
              {showLabel && (
                <text
                  x={x}
                  y={cy}
                  fontSize={10}
                  fontFamily="var(--font-mono)"
                  fontWeight={600}
                  fill={textColor}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {label}
                </text>
              )}
            </g>
          )
        })}

        {/* 줄 번호 (아래) */}
        {Array.from({ length: stringCount }).map((_, i) => (
          <text
            key={`sn-${i}`}
            x={stringX(i)}
            y={PAD_TOP + span * CELL_H + 8}
            fontSize={9}
            fontFamily="var(--font-mono)"
            fill="#a3a3a3"
            textAnchor="middle"
            dominantBaseline="hanging"
          >
            {6 - i}
          </text>
        ))}
      </svg>
    </div>
  )
}
