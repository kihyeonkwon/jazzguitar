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
}

function parseQuarter(notation: string): number | null {
  const m = notation.match(/Q:\s*1\/4\s*=\s*(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

function SheetMusicInner({
  notation,
  bpm,
  className = '',
  minimal = false,
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

    import('abcjs').then((abcjs) => {
      if (cancelled || !containerRef.current) return
      abcRef.current = abcjs

      // minimal 모드: 원본 notation 그대로. 아니면 currentBpm으로 교체.
      const finalNotation = minimal
        ? notation
        : notation.replace(/Q:[^\n]*/, `Q:1/4=${currentBpm}`)

      abcjs.renderAbc(containerRef.current!, finalNotation, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 600,
        scale: 1.1,
        print: false,
        paddingbottom: 8,
        paddingtop: 8,
      })
    })

    return () => { cancelled = true }
  }, [notation, currentBpm, minimal])

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
          className="sheet-music-container"
          style={{ minHeight: '80px' }}
        />
      </div>
    )
  }

  return (
    <div className={`bg-paper-bright border border-rule ${className}`}>
      <div
        ref={containerRef}
        className="sheet-music-container p-4"
        style={{ minHeight: '80px' }}
      />
      <div className="flex items-center gap-4 px-4 py-3 border-t border-rule">
        <button
          onClick={handlePlay}
          className={`inline-flex items-center justify-center gap-2 h-8 px-4 text-xs font-mono tracking-widest border transition-colors ${
            isPlaying
              ? 'bg-ink text-ink-inv border-ink'
              : 'bg-paper-bright text-ink border-rule hover:border-ink-soft'
          }`}
        >
          {isPlaying ? <><IconStop size={12} /> STOP</> : <><IconPlay size={12} /> PLAY</>}
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="eyebrow">BPM</span>
          <input
            type="range"
            min={50}
            max={200}
            value={currentBpm}
            onChange={(e) => setCurrentBpm(Number(e.target.value))}
            className="flex-1 h-1 appearance-none bg-rule cursor-pointer"
            style={{ accentColor: '#0a0a0a' }}
          />
          <span className="text-ink text-xs font-mono tabular w-8 text-right">{currentBpm}</span>
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
