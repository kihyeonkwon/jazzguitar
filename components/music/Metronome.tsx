'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

interface MetronomeProps {
  initialBpm?: number
  showTimeSignature?: boolean
  compact?: boolean
}

type TimeSignature = '2/4' | '3/4' | '4/4'

// ─── 진자 SVG ─────────────────────────────────────────────────────────────
function Pendulum({ angle, bpm, isPlaying }: { angle: number; bpm: number; isPlaying: boolean }) {
  const duration = isPlaying ? (60 / bpm) * 0.88 : 0.6
  const pivotX = 60
  const pivotY = 12

  return (
    <svg width="120" height="220" viewBox="0 0 120 220" className="overflow-visible">
      {/* 받침대 */}
      <rect x="20" y="8" width="80" height="6" rx="3" fill="#e5e7eb" />

      {/* 진자 그룹 — pivotX, pivotY 기준으로 회전 */}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: `${pivotX}px ${pivotY}px`,
          transition: `transform ${duration}s ease-in-out`,
        }}
      >
        {/* 막대 */}
        <rect x="58.5" y={pivotY} width="3" height="175" rx="1.5" fill="#374151" />

        {/* 조절 추 (BPM에 따라 위치 변함 — 빠를수록 위) */}
        <rect
          x="48"
          y={pivotY + 60 + (240 - bpm) * 0.38}
          width="24"
          height="10"
          rx="3"
          fill="#6b7280"
        />

        {/* 메인 추 */}
        <ellipse cx={pivotX} cy={pivotY + 175} rx="16" ry="12" fill="#111827" />
        <ellipse cx={pivotX} cy={pivotY + 174} rx="12" ry="9" fill="#1f2937" />
      </g>

      {/* 피벗 핀 */}
      <circle cx={pivotX} cy={pivotY} r="5" fill="#374151" />
      <circle cx={pivotX} cy={pivotY} r="2.5" fill="#9ca3af" />
    </svg>
  )
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────
function MetronomeInner({
  initialBpm = 80,
  showTimeSignature = true,
  compact = false,
}: MetronomeProps) {
  const [bpm, setBpm] = useState(initialBpm)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beat, setBeat] = useState(-1)
  const [timeSignature, setTimeSignature] = useState<TimeSignature>('4/4')
  const [tapTimes, setTapTimes] = useState<number[]>([])
  const [pendulumAngle, setPendulumAngle] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneRef    = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seqRef     = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const synthsRef  = useRef<any[]>([])

  const beatsPerMeasure = parseInt(timeSignature.split('/')[0])

  // ── 정지 ──
  const stopMetronome = useCallback(() => {
    if (seqRef.current) {
      seqRef.current.stop()
      seqRef.current.dispose()
      seqRef.current = null
    }
    synthsRef.current.forEach(s => { try { s.dispose() } catch { /* ignore */ } })
    synthsRef.current = []
    if (toneRef.current) {
      try { toneRef.current.getTransport().stop() } catch { /* ignore */ }
    }
    setIsPlaying(false)
    setBeat(-1)
    setPendulumAngle(0)
  }, [])

  useEffect(() => () => { stopMetronome() }, [stopMetronome])

  // ── 시작 ──
  const startMetronome = useCallback(async () => {
    const Tone = await import('tone')
    toneRef.current = Tone
    await Tone.start()

    // 기존 정리
    if (seqRef.current) { seqRef.current.stop(); seqRef.current.dispose(); seqRef.current = null }
    synthsRef.current.forEach(s => { try { s.dispose() } catch { /* ignore */ } })
    synthsRef.current = []

    Tone.getTransport().bpm.value = bpm

    // ── 클릭 사운드: 실제 메트로놈처럼 날카로운 transient ──────────────
    // 다운비트: 높은 주파수 + 짧은 잔향
    const highClick = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.0002, decay: 0.018, sustain: 0, release: 0.008 },
      volume: 4,
    }).toDestination()

    // 약박: 낮은 주파수
    const lowClick = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.0002, decay: 0.014, sustain: 0, release: 0.006 },
      volume: 1,
    }).toDestination()

    // 짧은 노이즈 burst — 실제 클릭의 "탁" 질감
    const noiseHigh = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.0001, decay: 0.008, sustain: 0, release: 0.003 },
      volume: -4,
    }).toDestination()

    const noiseLow = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.0001, decay: 0.006, sustain: 0, release: 0.002 },
      volume: -8,
    }).toDestination()

    synthsRef.current = [highClick, lowClick, noiseHigh, noiseLow]

    let beatCount = 0

    const seq = new Tone.Sequence(
      (time) => {
        const currentBeat = beatCount % beatsPerMeasure
        const isDown = currentBeat === 0

        if (isDown) {
          highClick.triggerAttackRelease(1200, '64n', time)
          noiseHigh.triggerAttackRelease('32n', time)
        } else {
          lowClick.triggerAttackRelease(780, '64n', time)
          noiseLow.triggerAttackRelease('32n', time)
        }

        Tone.getDraw().schedule(() => {
          setBeat(currentBeat)
          // 진자: 박자마다 방향 전환
          setPendulumAngle(beatCount % 2 === 0 ? -26 : 26)
        }, time)

        beatCount++
      },
      Array.from({ length: beatsPerMeasure }, (_, i) => i),
      '4n'
    )

    seq.start(0)
    seqRef.current = seq
    Tone.getTransport().start()
    setIsPlaying(true)
  }, [bpm, beatsPerMeasure])

  const togglePlay = useCallback(async () => {
    if (isPlaying) stopMetronome()
    else await startMetronome()
  }, [isPlaying, startMetronome, stopMetronome])

  const handleBpmChange = useCallback((newBpm: number) => {
    setBpm(newBpm)
    if (isPlaying && toneRef.current) {
      toneRef.current.getTransport().bpm.value = newBpm
    }
  }, [isPlaying])

  const handleTap = useCallback(() => {
    const now = Date.now()
    setTapTimes(prev => {
      const updated = [...prev, now].slice(-6)
      if (updated.length >= 2) {
        const intervals = updated.slice(1).map((t, i) => t - updated[i])
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length
        handleBpmChange(Math.max(40, Math.min(240, Math.round(60000 / avg))))
      }
      return updated
    })
  }, [handleBpmChange])

  // ── compact 모드 (토픽 사이드바용) ──
  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-all ${
              isPlaying ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {isPlaying ? '■' : '▶'}
          </button>
          <div className="flex gap-1">
            {Array.from({ length: beatsPerMeasure }, (_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-75"
                style={{
                  backgroundColor: isPlaying && beat === i ? (i === 0 ? '#111' : '#6b7280') : '#e5e7eb',
                  transform: isPlaying && beat === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
          <input
            type="range" min={40} max={240} value={bpm}
            onChange={e => handleBpmChange(Number(e.target.value))}
            className="flex-1 h-1 cursor-pointer" style={{ accentColor: '#111' }}
          />
          <span className="text-gray-700 text-sm w-12 text-right font-mono">{bpm}</span>
        </div>
      </div>
    )
  }

  // ── 풀 모드 ──
  const timeSignatures: TimeSignature[] = ['2/4', '3/4', '4/4']

  return (
    <div className="bg-paper-bright border border-rule overflow-hidden">
      {/* 진자 영역 */}
      <div className="relative flex flex-col items-center pt-8 pb-4 bg-surface border-b border-rule">
        <Pendulum angle={pendulumAngle} bpm={bpm} isPlaying={isPlaying} />

        {/* 비트 인디케이터 */}
        <div className="flex justify-center gap-2.5 mt-4">
          {Array.from({ length: beatsPerMeasure }, (_, i) => (
            <div
              key={i}
              className="transition-colors duration-75"
              style={{
                width:  isPlaying && beat === i ? 10 : 6,
                height: isPlaying && beat === i ? 10 : 6,
                backgroundColor: isPlaying && beat === i
                  ? '#0a0a0a'
                  : '#d4d4d4',
              }}
            />
          ))}
        </div>
      </div>

      {/* BPM display */}
      <div className="text-center py-6 border-b border-rule">
        <div className="text-6xl font-mono font-medium text-ink tabular leading-none">{bpm}</div>
        <div className="eyebrow mt-3">BPM</div>
      </div>

      {/* 슬라이더 */}
      <div className="px-6 py-5 border-b border-rule space-y-2">
        <input
          type="range" min={40} max={240} value={bpm}
          onChange={e => handleBpmChange(Number(e.target.value))}
          className="w-full h-1 cursor-pointer appearance-none bg-rule"
          style={{ accentColor: '#0a0a0a' }}
        />
        <div className="flex justify-between text-[10px] font-mono tabular text-ink-faint tracking-widest">
          <span>40</span><span>120</span><span>240</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="grid grid-cols-2 gap-px bg-rule">
        <button
          onClick={togglePlay}
          className={`h-14 text-xs font-mono tracking-widest transition-colors ${
            isPlaying
              ? 'bg-ink text-ink-inv hover:bg-ink-soft'
              : 'bg-paper-bright text-ink hover:bg-surface'
          }`}
        >
          {isPlaying ? '■  STOP' : '▶  START'}
        </button>
        <button
          onClick={handleTap}
          className="h-14 bg-paper-bright text-ink-soft hover:bg-surface text-xs font-mono tracking-widest transition-colors"
        >
          TAP TEMPO
        </button>
      </div>

      {/* 박자 */}
      {showTimeSignature && (
        <div className="border-t border-rule">
          <div className="px-5 pt-4 eyebrow">Time Signature</div>
          <div className="flex gap-px bg-rule mt-2">
            {timeSignatures.map(ts => (
              <button
                key={ts}
                onClick={() => { setTimeSignature(ts); if (isPlaying) stopMetronome() }}
                className={`flex-1 h-12 text-xs font-mono tracking-widest transition-colors ${
                  timeSignature === ts
                    ? 'bg-ink text-ink-inv'
                    : 'bg-paper-bright text-ink-soft hover:bg-surface'
                }`}
              >
                {ts}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(MetronomeInner), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[200px] flex items-center justify-center">
      <span className="text-gray-400 text-sm">메트로놈 로딩 중...</span>
    </div>
  ),
})
