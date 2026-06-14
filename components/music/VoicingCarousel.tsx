'use client'

import { useEffect, useRef, useState } from 'react'
import VoicingDiagram from './VoicingDiagram'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'

/**
 * 코드 보이싱 캐러셀 — translate 기반 슬라이드 + 드래그 제스처.
 *
 * 마크다운 fenced 블록 예시:
 *   ```voicings
 *   title: Cmaj7 Drop 2 — 4 뒤집기
 *
 *   --- ① 솔(G) 베이스 — 가장 가벼운 자리
 *   frets: x x 5 5 5 7
 *   labels: . . G C E B
 *   bass: 4
 *   ...
 *   ```
 */

export interface Voicing {
  title?: string
  frets: Array<number | 'x'>
  labels?: Array<string | undefined>
  bass?: number
}

interface VoicingCarouselProps {
  title?: string
  voicings: Voicing[]
  className?: string
}

const CARD_WIDTH = 240
const CARD_GAP = 16
const STEP = CARD_WIDTH + CARD_GAP

export default function VoicingCarousel({
  title,
  voicings,
  className = '',
}: VoicingCarouselProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => setViewportWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 뷰포트에 카드 몇 개가 보이는지 계산
  const visibleCount = Math.max(1, Math.floor((viewportWidth + CARD_GAP) / STEP))
  const maxIdx = Math.max(0, voicings.length - visibleCount)
  const clampedIdx = Math.min(activeIdx, maxIdx)
  const baseOffset = -clampedIdx * STEP

  const onPointerDown = (e: React.PointerEvent) => {
    if (voicings.length <= visibleCount) return
    // 마우스 우클릭/가운데클릭은 무시
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragStartX.current = e.clientX
    setIsDragging(true)
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      // iOS Safari 일부 환경에서 setPointerCapture 실패 가능
    }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    setDragOffset(delta)
  }
  const onPointerEnd = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    dragStartX.current = null
    setIsDragging(false)
    setDragOffset(0)
    // 스텝의 1/3 이상 끌리면 한 칸 이동, 빠른 플릭(>0.5 px/ms)도 인정
    if (Math.abs(delta) > STEP / 3) {
      const dir = delta < 0 ? 1 : -1
      setActiveIdx((i) => Math.min(maxIdx, Math.max(0, i + dir)))
    }
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const goTo = (i: number) => {
    setActiveIdx(Math.min(maxIdx, Math.max(0, i)))
  }

  if (voicings.length === 0) return null
  const isMulti = voicings.length > 1
  const totalOffset = baseOffset + dragOffset

  return (
    <div className={`my-6 ${className}`}>
      {(title || isMulti) && (
        <div className="mb-2 flex items-baseline justify-between">
          <div className="text-[11px] font-mono tracking-widest text-ink-faint uppercase">
            {title}
          </div>
          {isMulti && (
            <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
              {clampedIdx + 1} / {voicings.length}
            </span>
          )}
        </div>
      )}

      <div
        ref={viewportRef}
        className="overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          className="flex"
          style={{
            gap: CARD_GAP,
            transform: `translate3d(${totalOffset}px, 0, 0)`,
            transition: isDragging ? 'none' : 'transform 280ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {voicings.map((v, i) => (
            <div
              key={i}
              className="shrink-0 flex flex-col items-center"
              style={{ width: CARD_WIDTH }}
            >
              <VoicingDiagram
                title={v.title}
                frets={v.frets}
                labels={v.labels}
                bass={v.bass}
              />
            </div>
          ))}
        </div>
      </div>

      {isMulti && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {voicings.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 transition-colors ${
                  i === clampedIdx ? 'bg-ink' : 'bg-rule hover:bg-ink-soft'
                }`}
                aria-label={`Voicing ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(clampedIdx - 1)}
              disabled={clampedIdx === 0}
              className="w-7 h-7 border border-rule hover:border-ink-soft disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
              aria-label="이전 보이싱"
            >
              <IconArrowLeft size={14} />
            </button>
            <button
              onClick={() => goTo(clampedIdx + 1)}
              disabled={clampedIdx === maxIdx}
              className="w-7 h-7 border border-rule hover:border-ink-soft disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-ink-soft hover:text-ink transition-colors"
              aria-label="다음 보이싱"
            >
              <IconArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
