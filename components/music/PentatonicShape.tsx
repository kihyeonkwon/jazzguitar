'use client'

/**
 * 추상 펜타토닉 셀 다이어그램.
 * 어느 줄/프렛이든 상관없이 반복되는 두 모양:
 *
 *   Shape A — 2줄 × 4프렛 (3프렛 간격 두 줄)
 *     R  .  .  o      ← 위쪽 줄의 위에 b5 (다음 줄로 가는 통로)
 *     o  .  .  o      ← 아래쪽 줄의 옆에 b5
 *
 *   Shape B — 3줄 × 3프렛 (안쪽 세 줄)
 *     o  .  o
 *     o  .  R
 *     o  b5 o          ← b5가 안쪽에 포함
 */

interface Props {
  type: 'A' | 'B'
  title?: string
  className?: string
}

const CELL = 50
const PAD = 28

export default function PentatonicShape({ type, title, className = '' }: Props) {
  const rows = type === 'A' ? 2 : 3
  const cols = type === 'A' ? 4 : 3

  // 셀별 마커
  // 'R' = 루트(검정), 'o' = 펜타토닉 음(흰 동그라미), 'b5' = 블루 노트(파랑 사각)
  type Mark = null | 'R' | 'o' | 'b5'
  const grid: Mark[][] = type === 'A'
    ? [
        ['R',  null, null, 'o' ],
        ['o',  null, null, 'o' ],
      ]
    : [
        ['o',  null, 'o'],
        ['o',  null, 'R'],
        ['o',  'b5', 'o'],
      ]

  // 박스 외부 표시
  const outerMarks = type === 'A'
    ? [
        { kind: 'b5', side: 'top',    cellCol: 2 }, // 위쪽 줄 위에 b5 (col 인덱스는 0-based, 3번째 칸 위)
        { kind: 'b5', side: 'left',   cellRow: 1 }, // 아래쪽 줄 왼쪽에 b5
      ]
    : []

  const width  = PAD * 2 + CELL * cols
  const height = PAD * 2 + CELL * rows

  const cellCenterX = (col: number) => PAD + col * CELL + CELL / 2
  const cellCenterY = (row: number) => PAD + row * CELL + CELL / 2

  return (
    <div className={`my-6 ${className}`}>
      {title && (
        <div className="mb-3 text-[11px] font-mono tracking-widest text-ink-faint uppercase">
          {title}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width + 40} ${height + 30}`}
        className="w-full h-auto select-none"
        style={{ maxWidth: width + 40 }}
      >
        {/* 박스 외곽 */}
        <rect
          x={PAD} y={PAD}
          width={cols * CELL} height={rows * CELL}
          fill="none" stroke="#0a0a0a" strokeWidth={2}
        />

        {/* 그리드 라인 */}
        {Array.from({ length: cols - 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={PAD + (i + 1) * CELL} y1={PAD}
            x2={PAD + (i + 1) * CELL} y2={PAD + rows * CELL}
            stroke="#0a0a0a" strokeWidth={1}
          />
        ))}
        {Array.from({ length: rows - 1 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={PAD} y1={PAD + (i + 1) * CELL}
            x2={PAD + cols * CELL} y2={PAD + (i + 1) * CELL}
            stroke="#0a0a0a" strokeWidth={1}
          />
        ))}

        {/* 셀 내부 마커 */}
        {grid.flatMap((row, ri) =>
          row.map((mark, ci) => {
            if (mark === null) return null
            const cx = cellCenterX(ci)
            const cy = cellCenterY(ri)
            if (mark === 'R') {
              return (
                <g key={`m-${ri}-${ci}`}>
                  <text x={cx} y={cy} fontSize={20} fontWeight={700}
                    fill="#0a0a0a" textAnchor="middle" dominantBaseline="central"
                    fontFamily="var(--font-mono)"
                  >R</text>
                </g>
              )
            }
            if (mark === 'o') {
              return (
                <circle key={`m-${ri}-${ci}`}
                  cx={cx} cy={cy} r={10}
                  fill="white" stroke="#0a0a0a" strokeWidth={1.5}
                />
              )
            }
            if (mark === 'b5') {
              return (
                <g key={`m-${ri}-${ci}`}>
                  <rect
                    x={cx - 14} y={cy - 11}
                    width={28} height={22} rx={2}
                    fill="none" stroke="#0a0a0a" strokeWidth={1.2}
                    strokeDasharray="3,3"
                  />
                  <text x={cx} y={cy} fontSize={12} fontWeight={600}
                    fill="#0a0a0a" textAnchor="middle" dominantBaseline="central"
                    fontFamily="var(--font-mono)"
                  >♭5</text>
                </g>
              )
            }
            return null
          })
        )}

        {/* 박스 외부 b5 마커 */}
        {outerMarks.map((m, i) => {
          if (m.kind !== 'b5') return null
          let cx = 0, cy = 0
          if (m.side === 'top' && m.cellCol !== undefined) {
            cx = cellCenterX(m.cellCol)
            cy = PAD - 16
          } else if (m.side === 'left' && m.cellRow !== undefined) {
            cx = PAD - 16
            cy = cellCenterY(m.cellRow)
          } else if (m.side === 'right' && m.cellRow !== undefined) {
            cx = PAD + cols * CELL + 16
            cy = cellCenterY(m.cellRow)
          }
          return (
            <g key={`out-${i}`}>
              <rect
                x={cx - 14} y={cy - 11}
                width={28} height={22} rx={2}
                fill="none" stroke="#0a0a0a" strokeWidth={1.2}
                strokeDasharray="3,3"
              />
              <text x={cx} y={cy} fontSize={12} fontWeight={600}
                fill="#0a0a0a" textAnchor="middle" dominantBaseline="central"
                fontFamily="var(--font-mono)"
              >♭5</text>
            </g>
          )
        })}
      </svg>

      {/* 범례 */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-mono tracking-widest text-ink-faint">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-5 text-center text-ink font-bold">R</span> ROOT
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full border border-ink bg-paper-bright" /> 펜타토닉 음
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block px-1.5 border border-ink border-dashed text-[9px] font-mono">♭5</span> 블루 노트
        </div>
      </div>
    </div>
  )
}
