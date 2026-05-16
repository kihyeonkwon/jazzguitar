'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { useRouter } from '@/lib/i18n/navigation'
import { useLocale } from 'next-intl'
import { topics, stages } from '@/lib/curriculum/data'
import { useCompletedTopicIds, useStartedTopicIds } from '@/lib/progress/hooks'
import { Locale } from '@/lib/curriculum/types'

// ─── 노드 좌표 (나무뿌리 탑다운) ─────────────────────────────────────────
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'jazz-setup':         { x: 380, y: 80  },
  'seventh-chords':     { x: 740, y: 80  },
  'major-scale-review': { x: 150, y: 240 },
  'guide-tones':        { x: 490, y: 240 },
  'drop2-voicing':      { x: 850, y: 240 },
  'blues-scale':        { x:  60, y: 420 },
  'blues-form':         { x: 270, y: 420 },
  'mixolydian':         { x: 510, y: 420 },
  'dorian-tetrachord':  { x: 790, y: 420 },
  'first-licks':        { x:  90, y: 600 },
  'blues-turnaround':   { x: 330, y: 600 },
  'iivi-theory':        { x: 580, y: 600 },
  'hw-dim-whole-tone':  { x: 880, y: 600 },
  'chord-tones':        { x: 370, y: 780 },
  'tension-resolution': { x: 680, y: 780 },
  'enclosure':          { x: 210, y: 960 },
  'iivi-licks':         { x: 500, y: 960 },
  'altered-chord':      { x: 820, y: 960 },
  'autumn-leaves':      { x: 330, y:1140 },
  'chord-melody':       { x: 720, y:1140 },
  'sunny-solo':         { x: 490, y:1310 },
  'improvisation':      { x: 540, y:1480 },
}

// ─── 엣지 ────────────────────────────────────────────────────────────────
const EDGES: Array<{ from: string; to: string; dashed?: boolean }> = [
  { from: 'jazz-setup',         to: 'major-scale-review' },
  { from: 'jazz-setup',         to: 'guide-tones',        dashed: true },
  { from: 'seventh-chords',     to: 'guide-tones' },
  { from: 'seventh-chords',     to: 'drop2-voicing' },
  { from: 'seventh-chords',     to: 'blues-form',         dashed: true },
  { from: 'major-scale-review', to: 'blues-scale' },
  { from: 'major-scale-review', to: 'blues-form' },
  { from: 'major-scale-review', to: 'mixolydian',         dashed: true },
  { from: 'guide-tones',        to: 'mixolydian' },
  { from: 'guide-tones',        to: 'dorian-tetrachord' },
  { from: 'blues-scale',        to: 'first-licks' },
  { from: 'blues-form',         to: 'first-licks' },
  { from: 'blues-form',         to: 'blues-turnaround' },
  { from: 'mixolydian',         to: 'blues-turnaround' },
  { from: 'mixolydian',         to: 'iivi-theory',        dashed: true },
  { from: 'dorian-tetrachord',  to: 'iivi-theory' },
  { from: 'dorian-tetrachord',  to: 'hw-dim-whole-tone',  dashed: true },
  { from: 'first-licks',        to: 'chord-tones',        dashed: true },
  { from: 'blues-turnaround',   to: 'chord-tones',        dashed: true },
  { from: 'iivi-theory',        to: 'chord-tones' },
  { from: 'iivi-theory',        to: 'tension-resolution' },
  { from: 'hw-dim-whole-tone',  to: 'tension-resolution' },
  { from: 'chord-tones',        to: 'enclosure' },
  { from: 'chord-tones',        to: 'iivi-licks' },
  { from: 'tension-resolution', to: 'iivi-licks' },
  { from: 'tension-resolution', to: 'altered-chord' },
  { from: 'enclosure',          to: 'autumn-leaves' },
  { from: 'iivi-licks',         to: 'autumn-leaves' },
  { from: 'iivi-licks',         to: 'chord-melody',       dashed: true },
  { from: 'altered-chord',      to: 'chord-melody' },
  { from: 'drop2-voicing',      to: 'chord-melody' },
  { from: 'autumn-leaves',      to: 'sunny-solo' },
  { from: 'chord-melody',       to: 'sunny-solo' },
  { from: 'altered-chord',      to: 'sunny-solo',         dashed: true },
  { from: 'sunny-solo',         to: 'improvisation' },
  { from: 'autumn-leaves',      to: 'improvisation',      dashed: true },
  { from: 'chord-melody',       to: 'improvisation',      dashed: true },
]

const CANVAS_W = 1040
const CANVAS_H = 1570
const NODE_R   = 16

type NodeState = 'completed' | 'in_progress' | 'available' | 'locked'

function getNodeState(
  topicId: string,
  completed: string[],
  started: string[],
): NodeState {
  if (completed.includes(topicId)) return 'completed'
  if (started.includes(topicId))   return 'in_progress'
  const roots = ['jazz-setup', 'seventh-chords']
  if (roots.includes(topicId))     return 'available'
  const required = EDGES.filter(e => e.to === topicId && !e.dashed).map(e => e.from)
  if (required.length === 0)       return 'available'
  if (required.some(p => completed.includes(p))) return 'available'
  return 'locked'
}

function cubicPath(x1: number, y1: number, x2: number, y2: number) {
  const dy = y2 - y1
  return `M ${x1},${y1} C ${x1},${y1+dy*0.45} ${x2},${y2-dy*0.45} ${x2},${y2}`
}

// 스테이지 배경 밴드
const BANDS = [
  { label: 'Stage 1 · Foundations', y1: 30,   y2: 330  },
  { label: 'Stage 2 · Jazz Blues',  y1: 330,  y2: 680  },
  { label: 'Stage 3 · ii–V–I',      y1: 680,  y2: 1060 },
  { label: 'Stage 4 · Standards',   y1: 1060, y2: 1540 },
]

const STAGE_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#f43f5e']

export default function CurriculumGraph() {
  const router       = useRouter()
  const locale       = useLocale() as Locale
  const containerRef = useRef<HTMLDivElement>(null)

  const completed = useCompletedTopicIds()
  const started   = useStartedTopicIds()
  const [tooltip,   setTooltip]   = useState<{ id: string } | null>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [tick,      setTick]      = useState(0) // pulse timer

  // 맥동 타이머
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200)
    return () => clearInterval(id)
  }, [])

  // 초기 스케일
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const scale = Math.min((width - 40) / CANVAS_W, (height - 60) / CANVAS_H, 0.72)
    setTransform({ x: (width - CANVAS_W * scale) / 2, y: 30, scale })
  }, [])

  // 줌
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    setTransform(prev => {
      const s  = Math.min(2.5, Math.max(0.25, prev.scale * (e.deltaY > 0 ? 0.9 : 1.1)))
      const r  = s / prev.scale
      return { scale: s, x: mx - r * (mx - prev.x), y: my - r * (my - prev.y) }
    })
  }, [])

  // 팬
  const panning = useRef(false)
  const panOrigin = useRef({ x: 0, y: 0 })
  const onMouseDown  = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest('.gnode')) return
    panning.current = true; panOrigin.current = { x: e.clientX, y: e.clientY }
  }, [])
  const onMouseMove  = useCallback((e: React.MouseEvent) => {
    if (!panning.current) return
    const dx = e.clientX - panOrigin.current.x
    const dy = e.clientY - panOrigin.current.y
    panOrigin.current = { x: e.clientX, y: e.clientY }
    setTransform(p => ({ ...p, x: p.x + dx, y: p.y + dy }))
  }, [])
  const onMouseUp = useCallback(() => { panning.current = false }, [])

  const topicMap   = Object.fromEntries(topics.map(t => [t.id, t]))
  const totalDone  = completed.length
  const stageStats = stages.map(s => ({
    ...s,
    done: s.topics.filter(t => completed.includes(t.id)).length,
  }))

  const resetView = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const scale = Math.min((width - 40) / CANVAS_W, (height - 60) / CANVAS_H, 0.72)
    setTransform({ x: (width - CANVAS_W * scale) / 2, y: 30, scale })
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: 'calc(100vh - 56px)', background: '#0d1117', cursor: 'grab' }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* ── HUD 상단 ── */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        {/* 메인 진행 */}
        <div className="flex items-center gap-3 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm">
          <div>
            <div className="text-white/40 text-[10px] tracking-widest uppercase mb-0.5">Mastery Progress</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(totalDone / topics.length) * 100}%`,
                    background: 'linear-gradient(90deg, #6366f1, #a78bfa)',
                  }}
                />
              </div>
              <span className="text-white text-xs font-mono tabular-nums">
                {totalDone}<span className="text-white/30">/{topics.length}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 스테이지별 */}
        <div className="flex gap-1.5">
          {stageStats.map((s, i) => (
            <div
              key={s.number}
              className="flex items-center gap-1.5 bg-black/40 border border-white/8 rounded-lg px-2.5 py-1.5 backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: STAGE_COLORS[i] }} />
              <span className="text-white/50 text-[10px] font-mono">
                {s.done}<span className="text-white/20">/{s.topics.length}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 힌트 ── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/20 text-[11px] pointer-events-none">
        scroll to zoom · drag to pan · click node to study
      </div>

      {/* ── 리셋 + 범례 ── */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
        <button
          onClick={resetView}
          className="text-white/40 hover:text-white/80 border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 text-xs bg-black/40 backdrop-blur-sm transition-colors"
        >
          reset view
        </button>
        <div className="flex flex-col gap-1 bg-black/40 border border-white/8 rounded-xl px-3 py-2.5 backdrop-blur-sm text-[10px]">
          {[
            { color: '#ffffff', label: 'Completed' },
            { color: '#818cf8', label: 'Available',   border: true },
            { color: '#374151', label: 'Locked',      dim: true },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <svg width="12" height="12">
                <circle
                  cx="6" cy="6" r="5"
                  fill={item.dim ? '#111827' : item.border ? 'transparent' : item.color}
                  stroke={item.color}
                  strokeWidth={item.border ? 1.5 : 0}
                  opacity={item.dim ? 0.5 : 1}
                />
              </svg>
              <span style={{ color: item.dim ? '#374151' : '#9ca3af' }}>{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-0.5">
            <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke="#374151" strokeWidth="1" strokeDasharray="3,3"/></svg>
            <span className="text-white/20">Optional</span>
          </div>
        </div>
      </div>

      {/* ── SVG ── */}
      <svg width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          {/* 완료 노드 글로우 */}
          <filter id="glow-done" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* available 노드 글로우 */}
          <filter id="glow-avail" x="-60%" y="-60%" width="220%" height="220%">
            <feColorMatrix type="matrix" values="0.5 0 0 0 0.4  0 0.5 0 0 0.4  0 0 0.5 0 1  0 0 0 1 0" result="colored"/>
            <feGaussianBlur in="colored" stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* final 노드 */}
          <filter id="glow-final" x="-100%" y="-100%" width="300%" height="300%">
            <feColorMatrix type="matrix" values="0.6 0 0 0 0.4  0.3 0 0 0 0.3  0 0 0.6 0 1  0 0 0 1 0" result="colored"/>
            <feGaussianBlur in="colored" stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* 엣지 화살표 */}
          <marker id="arr-dim"  markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,255,255,0.08)"/>
          </marker>
          <marker id="arr-mid"  markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(129,140,248,0.5)"/>
          </marker>
          <marker id="arr-done" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(255,255,255,0.6)"/>
          </marker>
          {/* 배경 도트 그리드 */}
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.04)"/>
          </pattern>
        </defs>

        {/* 배경 도트 */}
        <rect width="100%" height="100%" fill="url(#dots)"/>

        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>

          {/* 스테이지 밴드 */}
          {BANDS.map((b, i) => (
            <g key={i}>
              <rect
                x={0} y={b.y1} width={CANVAS_W} height={b.y2 - b.y1}
                fill={`${STAGE_COLORS[i]}06`}
              />
              {/* 왼쪽 컬러 줄 */}
              <line
                x1={0} y1={b.y1} x2={0} y2={b.y2}
                stroke={STAGE_COLORS[i]} strokeWidth={2} opacity={0.3}
              />
              <text
                x={CANVAS_W - 8} y={b.y1 + 16}
                fontSize={9} fill={STAGE_COLORS[i]} opacity={0.4}
                textAnchor="end" fontFamily="monospace" letterSpacing={2}
              >
                {b.label.toUpperCase()}
              </text>
            </g>
          ))}

          {/* 엣지 */}
          {EDGES.map((edge, i) => {
            const from  = NODE_POSITIONS[edge.from]
            const to    = NODE_POSITIONS[edge.to]
            if (!from || !to) return null

            const fromState = getNodeState(edge.from, completed, started)
            const toState   = getNodeState(edge.to,   completed, started)

            const dx   = to.x - from.x
            const dy   = to.y - from.y
            const dist = Math.sqrt(dx*dx + dy*dy)
            const nx   = dx/dist; const ny = dy/dist

            const x1 = from.x + nx * NODE_R
            const y1 = from.y + ny * NODE_R
            const x2 = to.x   - nx * (NODE_R + 5)
            const y2 = to.y   - ny * (NODE_R + 5)

            const bothDone   = fromState === 'completed' && toState === 'completed'
            const pathActive = fromState === 'completed' && toState !== 'locked'

            let stroke    = 'rgba(255,255,255,0.06)'
            let marker    = 'url(#arr-dim)'
            let sw        = 1
            let dashArray: string | undefined = undefined

            if (bothDone) {
              stroke = 'rgba(255,255,255,0.5)'; marker = 'url(#arr-done)'; sw = 1.5
            } else if (pathActive && !edge.dashed) {
              stroke = 'rgba(129,140,248,0.45)'; marker = 'url(#arr-mid)'; sw = 1.2
            } else if (pathActive && edge.dashed) {
              stroke = 'rgba(129,140,248,0.2)'; marker = 'url(#arr-mid)'
              dashArray = '4,5'
            } else if (edge.dashed) {
              dashArray = '4,5'
            }

            return (
              <path
                key={i}
                d={cubicPath(x1, y1, x2, y2)}
                fill="none"
                stroke={stroke}
                strokeWidth={sw}
                strokeDasharray={dashArray}
                markerEnd={marker}
              />
            )
          })}

          {/* 노드 */}
          {topics.map(topic => {
            const pos   = NODE_POSITIONS[topic.id]
            if (!pos) return null

            const state   = getNodeState(topic.id, completed, started)
            const isFinal = topic.id === 'improvisation'
            const r       = isFinal ? NODE_R + 6 : NODE_R
            const label   = topic.title[locale]
            const pulsing = tick % 2 === 0 // 맥동 상태

            // 상태별 스타일
            const nodeStyle = {
              completed:   { fill: '#f8fafc', stroke: '#e2e8f0', strokeW: 0,   opacity: 1,   filter: 'url(#glow-done)' },
              in_progress: { fill: '#1e1b4b', stroke: '#818cf8', strokeW: 2,   opacity: 1,   filter: 'url(#glow-avail)' },
              available:   { fill: '#0f172a', stroke: '#6366f1', strokeW: 1.5, opacity: 1,   filter: 'none' },
              locked:      { fill: '#0d1117', stroke: '#1e2937', strokeW: 1,   opacity: 0.45, filter: 'none' },
            }[state]

            const labelColor = {
              completed:   '#0f172a',
              in_progress: '#c7d2fe',
              available:   '#94a3b8',
              locked:      '#1f2937',
            }[state]

            // 레이블 줄 처리
            const mid    = Math.ceil(label.length / 2)
            const line1  = label.length > 8 ? label.slice(0, mid) : label
            const line2  = label.length > 8 ? label.slice(mid)    : ''

            return (
              <g
                key={topic.id}
                className="gnode"
                transform={`translate(${pos.x},${pos.y})`}
                onClick={() => state !== 'locked' && router.push(`/topic/${topic.slug}`)}
                onMouseEnter={() => setTooltip({ id: topic.id })}
                onMouseLeave={() => setTooltip(null)}
                style={{ cursor: state === 'locked' ? 'default' : 'pointer' }}
              >
                {/* 호버 히트존 */}
                <circle r={r + 12} fill="transparent"/>

                {/* 맥동 링 — available / in_progress */}
                {(state === 'available' || state === 'in_progress') && (
                  <circle
                    r={r + (pulsing ? 7 : 4)}
                    fill="none"
                    stroke={state === 'in_progress' ? '#818cf8' : '#6366f1'}
                    strokeWidth={0.8}
                    opacity={pulsing ? 0.2 : 0.08}
                    style={{ transition: 'all 1.1s ease-in-out' }}
                  />
                )}

                {/* final 노드 외곽 링 */}
                {isFinal && state === 'completed' && (
                  <circle r={r + 10} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1}/>
                )}

                {/* 메인 원 */}
                <circle
                  r={r}
                  fill={nodeStyle.fill}
                  stroke={nodeStyle.stroke}
                  strokeWidth={nodeStyle.strokeW}
                  opacity={nodeStyle.opacity}
                  filter={nodeStyle.filter}
                />

                {/* 완료 체크 */}
                {state === 'completed' && (
                  <text
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={isFinal ? 13 : 10}
                    fill={isFinal ? '#6366f1' : '#334155'}
                    fontFamily="system-ui"
                  >✓</text>
                )}

                {/* 잠김 자물쇠 */}
                {state === 'locked' && (
                  <text
                    textAnchor="middle" dominantBaseline="central"
                    fontSize={9} fill="#1e2937" fontFamily="system-ui"
                  >🔒</text>
                )}

                {/* 진행중 점 */}
                {state === 'in_progress' && (
                  <circle r={4} fill="#818cf8"/>
                )}

                {/* 레이블 */}
                <text
                  y={r + 13}
                  textAnchor="middle"
                  fontSize={9}
                  fill={labelColor}
                  fontFamily="system-ui"
                  fontWeight={state === 'completed' ? '600' : '400'}
                  opacity={nodeStyle.opacity}
                >
                  <tspan x={0} dy={0}>{line1}</tspan>
                  {line2 && <tspan x={0} dy={11}>{line2}</tspan>}
                </text>
              </g>
            )
          })}

          {/* 툴팁 */}
          {tooltip && (() => {
            const topic = topicMap[tooltip.id]
            const pos   = NODE_POSITIONS[tooltip.id]
            if (!topic || !pos) return null
            const state = getNodeState(tooltip.id, completed, started)

            const tipX = pos.x + NODE_R + 16
            const tipY = pos.y - 38
            const desc  = topic.description[locale]
            const short = desc.length > 55 ? desc.slice(0, 55) + '…' : desc

            const stateLabel: Record<NodeState, string> = {
              completed:   '✓ 완료',
              in_progress: '▶ 진행중',
              available:   '○ 학습 가능',
              locked:      '🔒 잠김',
            }
            const stateColor: Record<NodeState, string> = {
              completed:   '#86efac',
              in_progress: '#818cf8',
              available:   '#94a3b8',
              locked:      '#374151',
            }

            return (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={tipX} y={tipY} width={220} height={72} rx={8}
                  fill="#1e2433" stroke="rgba(255,255,255,0.1)" strokeWidth={1}
                  filter="drop-shadow(0 4px 16px rgba(0,0,0,0.6))"
                />
                <text x={tipX+12} y={tipY+18} fontSize={11} fontWeight="600" fill="#f1f5f9" fontFamily="system-ui">
                  {topic.title[locale]}
                </text>
                <text x={tipX+12} y={tipY+32} fontSize={9} fill={stateColor[state]} fontFamily="system-ui">
                  {stateLabel[state]}
                </text>
                <foreignObject x={tipX+12} y={tipY+40} width={196} height={28}>
                  <p style={{ fontSize: 9, color: '#64748b', margin: 0, lineHeight: '1.4', fontFamily: 'system-ui' }}>
                    {short}
                  </p>
                </foreignObject>
              </g>
            )
          })()}

        </g>
      </svg>
    </div>
  )
}
