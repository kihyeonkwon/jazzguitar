'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

interface SheetMusicProps {
  notation: string
  bpm?: number
  className?: string
}

function SheetMusicInner({ notation, bpm = 80, className = '' }: SheetMusicProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBpm, setCurrentBpm] = useState(bpm)
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

      const notationWithTempo = notation.replace(
        /Q:[^\n]*/,
        `Q:1/4=${currentBpm}`
      )

      abcjs.renderAbc(containerRef.current!, notationWithTempo, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 600,
        scale: 1.2,
        print: false,
        paddingbottom: 10,
        paddingtop: 10,
      })
    })

    return () => {
      cancelled = true
    }
  }, [notation, currentBpm])

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
      setTimeout(() => {
        setIsPlaying(false)
      }, duration * 1000 + 500)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div
        ref={containerRef}
        className="sheet-music-container"
        style={{ minHeight: '80px' }}
      />
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={handlePlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            isPlaying
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {isPlaying ? (
            <>
              <span>■</span> 정지
            </>
          ) : (
            <>
              <span>▶</span> 재생
            </>
          )}
        </button>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-gray-400 text-xs">BPM</span>
          <input
            type="range"
            min={50}
            max={200}
            value={currentBpm}
            onChange={(e) => setCurrentBpm(Number(e.target.value))}
            className="flex-1 h-1 appearance-none rounded-full cursor-pointer"
            style={{ accentColor: '#111111' }}
          />
          <span className="text-gray-700 text-sm w-8 text-right">{currentBpm}</span>
        </div>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(SheetMusicInner), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[120px] flex items-center justify-center">
      <span className="text-gray-400 text-sm">악보 로딩 중...</span>
    </div>
  ),
})
