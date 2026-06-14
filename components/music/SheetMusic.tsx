'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { IconPlay, IconStop } from '@/components/icons'

interface SheetMusicProps {
  notation: string
  bpm?: number
  className?: string
  /** minimal=true 면 재생/슬라이더 컨트롤 없이 악보만 노출. notation의 Q를 그대로 사용. */
  minimal?: boolean
  /** 여러 마디 lead sheet에 쓰는 촘촘 모드 — 4마디/줄, 더 작은 스케일 */
  compact?: boolean
}

function parseQuarter(notation: string): number | null {
  const m = notation.match(/Q:\s*1\/4\s*=\s*(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

function normalizeChordLabels(container: HTMLElement): void {
  container.querySelectorAll<SVGTextElement>('.abcjs-chord').forEach((label) => {
    const raw = label.textContent?.replace(/\s+/g, '').trim()
    if (raw === 'F♯dim7' || raw === 'F#dim7' || raw === 'Fdim7') {
      label.textContent = 'F#dim7'
    }
  })
}

function SheetMusicInner({
  notation,
  bpm,
  className = '',
  minimal = false,
  compact = false,
}: SheetMusicProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // 우선순위: prop bpm > notation Q > 80
  const initialBpm = bpm ?? parseQuarter(notation) ?? 80
  const [currentBpm, setCurrentBpm] = useState(initialBpm)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const synthRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const abcRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false

    const render = (abcjs: typeof import('abcjs')) => {
      if (!containerRef.current) return
      const finalNotation = minimal
        ? notation
        : notation.replace(/Q:[^\n]*/, `Q:1/4=${currentBpm}`)
      const w = containerRef.current.clientWidth || 600
      // 코드 진행 리드시트는 4마디/줄이 보여야 해서 compact 모드에서 더 넓게 잡는다.
      const maxStaffWidth = compact ? 1120 : 640
      const staffwidth = Math.min(Math.max(220, w - 32), maxStaffWidth)
      const isNarrow = w < 420
      abcjs.renderAbc(containerRef.current, finalNotation, {
        responsive: 'resize',
        add_classes: true,
        staffwidth,
        scale: compact ? (isNarrow ? 0.75 : 0.9) : (isNarrow ? 0.95 : 1.0),
        print: false,
        paddingbottom: 8,
        paddingtop: 8,
        wrap: compact
          ? { minSpacing: 0.9, maxSpacing: 1.8, preferredMeasuresPerLine: 4 }
          : { minSpacing: 1.4, maxSpacing: 2.7, preferredMeasuresPerLine: 4 },
        format: {
          stretchlast: compact ? 1 : 0,
          titlefont: 'Kakao Small Sans 12',
          subtitlefont: 'Kakao Small Sans 10',
          composerfont: 'Kakao Small Sans italic 10',
          tempofont: 'Kakao Small Sans bold 10',
          gchordfont: 'Kakao Small Sans 10',
          annotationfont: 'Kakao Small Sans 10',
          vocalfont: 'Kakao Small Sans 10',
          wordsfont: 'Kakao Small Sans 10',
          partsfont: 'Kakao Small Sans 10',
        },
      })
      normalizeChordLabels(containerRef.current)
    }

    import('abcjs').then((abcjs) => {
      if (cancelled || !containerRef.current) return
      abcRef.current = abcjs
      render(abcjs)
    })

    // 컨테이너 크기 변화에 따라 재렌더링
    const ro = new ResizeObserver(() => {
      if (abcRef.current) render(abcRef.current)
    })
    ro.observe(containerRef.current)

    return () => {
      cancelled = true
      ro.disconnect()
    }
  }, [notation, currentBpm, minimal, compact])

  const handlePlay = async () => {
    if (!abcRef.current || !containerRef.current) return

    if (isPlaying) {
      synthRef.current?.stop()
      setIsPlaying(false)
      return
    }

    const abcjs = abcRef.current
    const notationWithTempo = notation.replace(/Q:[^\n]*/, `Q:1/4=${currentBpm}`)
    const parsed = abcjs.parseOnly(notationWithTempo)
    if (!parsed || parsed.length === 0) return

    try {
      const audioContext = new AudioContext()
      const synth = new abcjs.synth.CreateSynth()
      synthRef.current = synth

      await synth.init({
        audioContext,
        visualObj: parsed[0],
        millisecondsPerMeasure: (60000 / currentBpm) * 4,
        options: {
          soundFontUrl: 'https://paulrosen.github.io/midi-js-soundfonts/abcjs/',
        },
      })

      await synth.prime()
      synth.start()
      setIsPlaying(true)

      const duration = parsed[0].getTotalTime?.() ?? 10
      setTimeout(() => setIsPlaying(false), duration * 1000 + 500)
    } catch {
      setIsPlaying(false)
    }
  }

  if (minimal) {
    return (
      <div className={`bg-paper-bright ${className}`}>
        <div
          ref={containerRef}
          className="sheet-music-container [&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:block"
          style={{ minHeight: '80px' }}
        />
      </div>
    )
  }

  return (
    <div className={`bg-paper-bright border border-rule overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="sheet-music-container p-3 sm:p-4 [&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:block"
        style={{ minHeight: '80px' }}
      />
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3 border-t border-rule">
        <button
          onClick={handlePlay}
          className={`inline-flex items-center justify-center gap-2 h-8 px-3 sm:px-4 text-xs font-mono tracking-widest border transition-colors shrink-0 ${
            isPlaying
              ? 'bg-ink text-ink-inv border-ink'
              : 'bg-paper-bright text-ink border-rule hover:border-ink-soft'
          }`}
        >
          {isPlaying ? <><IconStop size={12} /> STOP</> : <><IconPlay size={12} /> PLAY</>}
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="eyebrow shrink-0">BPM</span>
          <input
            type="range"
            min={50}
            max={200}
            value={currentBpm}
            onChange={(e) => setCurrentBpm(Number(e.target.value))}
            className="flex-1 min-w-0 h-1 appearance-none bg-rule cursor-pointer"
            style={{ accentColor: '#0a0a0a' }}
          />
          <span className="text-ink text-xs font-mono tabular w-7 text-right shrink-0">{currentBpm}</span>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(SheetMusicInner), {
  ssr: false,
  loading: () => (
    <div className="bg-paper-bright border border-rule p-4 min-h-[120px] flex items-center justify-center">
      <span className="text-ink-faint text-xs">악보 로딩 중...</span>
    </div>
  ),
})
