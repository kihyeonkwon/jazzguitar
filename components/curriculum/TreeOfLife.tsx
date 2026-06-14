'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from '@/lib/i18n/navigation'
import { useLocale } from 'next-intl'
import { trunks, leaves, getLeavesByTrunk } from '@/lib/curriculum/organic'
import { useCompletedLeafSlugs } from '@/lib/progress/hooks'
import { Locale, TrunkSlug } from '@/lib/curriculum/types'
import { TrunkIconMap, IconRoot } from '@/components/icons'

const CANVAS_W = 1100
const CANVAS_H = 920
const ROOT_X   = CANVAS_W / 2
const ROOT_Y   = 840
const TRUNK_LENGTH = 540

function trunkTop(index: number, total: number) {
  const angleDeg = total === 1 ? 0 : -52 + (104 / (total - 1)) * index
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    angleDeg,
    x: ROOT_X + TRUNK_LENGTH * Math.cos(angleRad),
    y: ROOT_Y + TRUNK_LENGTH * Math.sin(angleRad),
  }
}

function leafPosition(
  top: { x: number; y: number },
  trunkAngleDeg: number,
  index: number,
  total: number
) {
  const t = total === 1 ? 0.5 : index / (total - 1)
  const subAngle = -58 + 116 * t
  const totalAngle = trunkAngleDeg + subAngle
  const rad = ((totalAngle - 90) * Math.PI) / 180
  const dist = 78 + (index % 2) * 22
  return {
    x: top.x + dist * Math.cos(rad),
    y: top.y + dist * Math.sin(rad),
    angle: totalAngle,
  }
}

function trunkPath(top: { x: number; y: number }) {
  const bendOut = (top.x - ROOT_X) * 0.4
  const cp1x = ROOT_X + bendOut * 0.2
  const cp1y = ROOT_Y - 90
  const cp2x = top.x - bendOut * 0.3
  const cp2y = (ROOT_Y + top.y) / 2 - 30
  return `M ${ROOT_X},${ROOT_Y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${top.x},${top.y}`
}

function branchPath(
  top: { x: number; y: number },
  leaf: { x: number; y: number }
) {
  const midX = (top.x + leaf.x) / 2
  const midY = (top.y + leaf.y) / 2 - 12
  return `M ${top.x},${top.y} Q ${midX},${midY} ${leaf.x},${leaf.y}`
}

export default function TreeOfLife() {
  const router = useRouter()
  const locale = useLocale() as Locale
  const completedLeafSlugs = useCompletedLeafSlugs(leaves)

  const [hoveredTrunk, setHoveredTrunk]       = useState<string | null>(null)
  const [hoveredLeaf,  setHoveredLeaf]        = useState<string | null>(null)

  // ─── 줌·팬 (Obsidian 스타일) ───────────────────────────────────────────
  const viewportRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<{ x: number; y: number; scale: number }>({
    x: 0, y: 0, scale: 1,
  })
  const [isDragging, setIsDragging] = useState(false)

  // 처음 진입 시 뷰포트에 fit
  const fitToViewport = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    const sx = el.clientWidth / CANVAS_W
    const sy = el.clientHeight / CANVAS_H
    const scale = Math.min(sx, sy) * 0.95
    const x = (el.clientWidth - CANVAS_W * scale) / 2
    const y = (el.clientHeight - CANVAS_H * scale) / 2
    setView({ x, y, scale })
  }, [])

  useEffect(() => {
    fitToViewport()
    const onResize = () => fitToViewport()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [fitToViewport])

  // 드래그 팬
  const dragRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null)
  const onPointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('g[data-clickable]')) return
    dragRef.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y }
    setIsDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d) return
    setView((v) => ({ ...v, x: d.vx + (e.clientX - d.x), y: d.vy + (e.clientY - d.y) }))
  }
  const onPointerEnd = () => {
    dragRef.current = null
    setIsDragging(false)
  }

  // 휠 줌 (포인터 위치 기준으로 줌) — passive: false로 직접 등록해야 preventDefault 가능
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      setView((v) => {
        const factor = e.deltaY > 0 ? 0.9 : 1.1
        const nextScale = Math.max(0.3, Math.min(2.5, v.scale * factor))
        const k = nextScale / v.scale
        return { x: px - (px - v.x) * k, y: py - (py - v.y) * k, scale: nextScale }
      })
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  const zoomBy = (factor: number) => {
    const el = viewportRef.current
    if (!el) return
    const cx = el.clientWidth / 2
    const cy = el.clientHeight / 2
    setView((v) => {
      const nextScale = Math.max(0.3, Math.min(2.5, v.scale * factor))
      const k = nextScale / v.scale
      return { x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k, scale: nextScale }
    })
  }

  const completedLeaves = useMemo(() => {
    return new Set(completedLeafSlugs)
  }, [completedLeafSlugs])

  const trunkLayout = useMemo(() => {
    return trunks.map((trunk, i) => {
      const top = trunkTop(i, trunks.length)
      const trunkLeaves = getLeavesByTrunk(trunk.slug as TrunkSlug)
      const leafPositions = trunkLeaves.map((leaf, j) => ({
        leaf,
        pos: leafPosition(top, top.angleDeg, j, trunkLeaves.length),
      }))
      return { trunk, top, leafPositions }
    })
  }, [])

  const totalLeaves    = leaves.length
  const completedCount = completedLeaves.size

  return (
    <div className="relative w-full bg-paper" style={{ height: 'calc(100vh - 64px)' }}>

      {/* 헤더 */}
      <div className="absolute top-8 left-8 z-10 max-w-xs pointer-events-none">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="section-no">00</span>
          <span className="eyebrow">The Forest</span>
        </div>
        <h1 className="display text-3xl text-ink leading-tight mb-2">
          Jazz Guitar Tree
        </h1>
        <p className="text-ink-soft text-[13px] leading-relaxed mb-4">
          뿌리에서 시작해 4개 큰 가지로. 주제를 클릭해 학습합니다.
        </p>
        <div className="flex items-baseline gap-3">
          <div className="flex-1 h-px bg-rule overflow-hidden">
            <div
              className="h-full bg-terracotta transition-all duration-500"
              style={{ width: `${(completedCount / totalLeaves) * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tabular text-ink-soft tracking-widest">
            {completedCount}<span className="text-ink-quiet"> / {totalLeaves}</span>
          </span>
        </div>
      </div>

      {/* 범례 */}
      <div className="absolute top-8 right-8 z-10 flex flex-col gap-2 text-[10px] font-mono tracking-widest text-ink-faint pointer-events-none">
        <div className="flex items-center gap-2.5 justify-end">
          <span>MASTERED</span>
          <span className="w-2.5 h-2.5 bg-ink inline-block" />
        </div>
        <div className="flex items-center gap-2.5 justify-end">
          <span>IN PROGRESS</span>
          <span className="w-2.5 h-2.5 bg-paper-bright border border-ink-soft inline-block" />
        </div>
      </div>

      {/* 줌·팬 캔버스 — Obsidian 스타일 */}
      <div
        ref={viewportRef}
        className="w-full h-full overflow-hidden touch-none select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
      <div
        style={{
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          transformOrigin: '0 0',
          width: CANVAS_W,
          height: CANVAS_H,
        }}
      >
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        width={CANVAS_W}
        height={CANVAS_H}
        className="block"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#dccfc2"/>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5" />

        {/* 땅선 */}
        <line
          x1={ROOT_X - 240} y1={ROOT_Y + 22}
          x2={ROOT_X + 240} y2={ROOT_Y + 22}
          stroke="#dccfc2" strokeWidth="1"
        />
        <line
          x1={ROOT_X - 150} y1={ROOT_Y + 36}
          x2={ROOT_X + 150} y2={ROOT_Y + 36}
          stroke="#e6e2da" strokeWidth="1"
        />

        {/* 트렁크 */}
        {trunkLayout.map(({ trunk, top }) => {
          const isHovered = hoveredTrunk === trunk.slug
          return (
            <path
              key={trunk.slug}
              d={trunkPath(top)}
              fill="none"
              stroke={isHovered ? '#2d3a31' : '#8c9a84'}
              strokeWidth={isHovered ? 2.5 : 1.5}
              strokeLinecap="round"
              style={{ transition: 'all 250ms ease' }}
            />
          )
        })}

        {/* 잔가지 */}
        {trunkLayout.map(({ trunk, top, leafPositions }) =>
          leafPositions.map(({ leaf, pos }) => {
            const isTrunkHovered = hoveredTrunk === trunk.slug
            return (
              <path
                key={`branch-${leaf.slug}`}
                d={branchPath(top, pos)}
                fill="none"
                stroke={isTrunkHovered ? '#59665d' : '#dccfc2'}
                strokeWidth="1"
                strokeLinecap="round"
                style={{ transition: 'all 200ms' }}
              />
            )
          })
        )}

        {/* 트렁크 헤더 — 아이콘 + 텍스트 */}
        {trunkLayout.map(({ trunk, top }, i) => {
          const isHovered = hoveredTrunk === trunk.slug
          const Icon = TrunkIconMap[trunk.slug as TrunkSlug]
          return (
            <g
              key={`hdr-${trunk.slug}`}
              data-clickable
              transform={`translate(${top.x}, ${top.y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push(`/trunk/${trunk.slug}`)}
              onMouseEnter={() => setHoveredTrunk(trunk.slug)}
              onMouseLeave={() => setHoveredTrunk(null)}
            >
              {/* 트렁크 결절점 */}
              <circle r={5} fill="#fffdf8" stroke="#2d3a31" strokeWidth={isHovered ? 2 : 1.5}/>

              {/* 아이콘 (위쪽 50px) */}
              <foreignObject x={-14} y={-58} width={28} height={28}>
                <div style={{ color: isHovered ? '#2d3a31' : '#59665d', transition: 'color 200ms' }}>
                  <Icon size={28} />
                </div>
              </foreignObject>

              {/* 번호 */}
              <text
                y={-68}
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                letterSpacing="2"
                fill="#8c9a84"
              >
                {String(i + 1).padStart(2, '0')}
              </text>

              {/* 이름 */}
              <text
                y={20}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={isHovered ? '#2d3a31' : '#59665d'}
                style={{ transition: 'fill 200ms' }}
              >
                {trunk.title[locale]}
              </text>
            </g>
          )
        })}

        {/* 주제 */}
        {trunkLayout.map(({ leafPositions }) =>
          leafPositions.map(({ leaf, pos }) => {
            const isCompleted = completedLeaves.has(leaf.slug)
            const isHovered   = hoveredLeaf === leaf.slug

            return (
              <g
                key={leaf.slug}
                data-clickable
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/leaf/${leaf.slug}`)}
                onMouseEnter={() => setHoveredLeaf(leaf.slug)}
                onMouseLeave={() => setHoveredLeaf(null)}
              >
                <circle r={14} fill="transparent" />

                {/* 호버 ring */}
                {isHovered && (
                  <circle r={10} fill="none" stroke="#c27b66" strokeWidth="1" opacity="0.45"/>
                )}

                {/* 주제 본체 — 작은 사각형 */}
                <rect
                  x={isHovered ? -7 : -6} y={isHovered ? -7 : -6}
                  width={isHovered ? 14 : 12} height={isHovered ? 14 : 12}
                  fill={isCompleted ? '#2d3a31' : '#fffdf8'}
                  stroke={isCompleted ? '#2d3a31' : '#8c9a84'}
                  strokeWidth="1"
                  style={{ transition: 'all 150ms ease' }}
                />

                {/* 줌인 시 노출되는 짧은 이름 (scale >= 0.7) */}
                {view.scale >= 0.7 && (() => {
                  const short = leaf.shortTitle?.[locale] ?? leaf.title[locale]
                  // 줄기에서 멀어지는 방향에 라벨을 둔다 — 주제의 각도로 결정
                  const angle = pos.angle ?? 0
                  const rad = ((angle - 90) * Math.PI) / 180
                  const offset = 20
                  const lx = offset * Math.cos(rad)
                  const ly = offset * Math.sin(rad)
                  return (
                    <text
                      x={lx} y={ly + 3}
                      textAnchor={Math.abs(lx) < 4 ? 'middle' : lx > 0 ? 'start' : 'end'}
                      fontSize="11"
                      fontWeight="500"
                      fill={isHovered ? '#2d3a31' : '#59665d'}
                      style={{ transition: 'fill 200ms', pointerEvents: 'none' }}
                    >
                      {short}
                    </text>
                  )
                })()}

                {/* 완료 체크 */}
                {isCompleted && (
                  <path d="M-3.5,0 L-1,2.5 L3.5,-2" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                )}

                {/* 호버 라벨 */}
                {isHovered && (() => {
                  // 제목 너비: 한글은 ~12px, 라틴/숫자 ~7px, 공백 ~3.5px (fontSize 11 bold 기준)
                  const titleW = [...leaf.title[locale]].reduce((sum, ch) => {
                    if (/[가-힯]/.test(ch)) return sum + 12
                    if (ch === ' ') return sum + 3.5
                    return sum + 7
                  }, 0)
                  // 부제 너비: fontSize 9 + letterSpacing 1.5
                  const sub = isCompleted ? 'MASTERED' : 'CLICK TO STUDY'
                  const subW = sub.length * 7 + Math.max(0, sub.length - 1) * 1.5
                  const labelW = Math.min(360, Math.max(titleW, subW) + 28)
                  return (
                    <g style={{ pointerEvents: 'none' }}>
                      <rect
                        x={14} y={-18}
                        width={labelW} height={36}
                        fill="#2d3a31"
                      />
                      <text
                        x={26} y={-3}
                        fontSize="11" fontWeight="600"
                        fill="#fffdf8"
                      >
                        {leaf.title[locale]}
                      </text>
                      <text
                        x={26} y={11}
                        fontSize="9"
                        fill="#dccfc2"
                        fontFamily="var(--font-mono)"
                        letterSpacing="1.5"
                      >
                        {isCompleted ? 'MASTERED' : 'CLICK TO STUDY'}
                      </text>
                    </g>
                  )
                })()}
              </g>
            )
          })
        )}

        {/* 뿌리 */}
        <g transform={`translate(${ROOT_X}, ${ROOT_Y})`}>
          <foreignObject x={-14} y={-14} width={28} height={28}>
            <div style={{ color: '#2d3a31' }}>
              <IconRoot size={28} />
            </div>
          </foreignObject>
          <text
            y={48}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            letterSpacing="3"
            fill="#59665d"
          >
            START
          </text>
          <text
            y={64}
            textAnchor="middle"
            fontSize="9"
            fill="#8c9a84"
            fontFamily="var(--font-mono)"
            letterSpacing="2"
          >
            ROOT OF ALL BRANCHES
          </text>
        </g>
      </svg>
      </div>
      </div>

      {/* 줌 컨트롤 */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-1.5">
        <button
          onClick={() => zoomBy(1.2)}
          className="w-10 h-10 rounded-full bg-paper-bright border border-rule hover:border-sage text-ink-soft hover:text-ink transition-colors flex items-center justify-center text-base font-mono shadow-[var(--shadow-tight)]"
          aria-label="확대"
        >+</button>
        <button
          onClick={() => zoomBy(1 / 1.2)}
          className="w-10 h-10 rounded-full bg-paper-bright border border-rule hover:border-sage text-ink-soft hover:text-ink transition-colors flex items-center justify-center text-base font-mono shadow-[var(--shadow-tight)]"
          aria-label="축소"
        >−</button>
        <button
          onClick={fitToViewport}
          className="w-10 h-10 rounded-full bg-paper-bright border border-rule hover:border-sage text-ink-soft hover:text-ink transition-colors flex items-center justify-center text-[9px] font-mono shadow-[var(--shadow-tight)]"
          aria-label="화면에 맞춤"
        >FIT</button>
      </div>
    </div>
  )
}
