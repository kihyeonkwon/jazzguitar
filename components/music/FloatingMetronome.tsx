'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { IconMetronome, IconClose } from '@/components/icons'

const SEGMENTS = 16
const RADIUS = 50
const CENTER = 60

function FloatingMetronomeInner() {
  const [open, setOpen] = useState(false)
  const [bpm, setBpm] = useState(80)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeSeg, setActiveSeg] = useState(-1)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneRef       = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const synthRef      = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const noiseRef      = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loopRef       = useRef<any>(null)
  const beatStartRef  = useRef<number>(0)
  const rafRef        = useRef<number>(0)
  const dotRef        = useRef<SVGCircleElement | null>(null)

  // ── 정지 ──
  const stop = useCallback(() => {
    if (loopRef.current)  { loopRef.current.stop(); loopRef.current.dispose(); loopRef.current = null }
    if (synthRef.current) { try { synthRef.current.dispose() } catch {/* */} synthRef.current = null }
    if (noiseRef.current) { try { noiseRef.current.dispose() } catch {/* */} noiseRef.current = null }
    if (toneRef.current)  { try { toneRef.current.getTransport().stop() } catch {/* */} }
    cancelAnimationFrame(rafRef.current)
    setIsPlaying(false)
    setActiveSeg(-1)
  }, [])

  // ── 시작 ──
  const start = useCallback(async () => {
    const Tone = await import('tone')
    toneRef.current = Tone
    await Tone.start()

    const synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.0002, decay: 0.018, sustain: 0, release: 0.008 },
      volume: 3,
    }).toDestination()
    const noise = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.0001, decay: 0.008, sustain: 0, release: 0.003 },
      volume: -6,
    }).toDestination()
    synthRef.current = synth
    noiseRef.current = noise

    Tone.getTransport().bpm.value = bpm
    beatStartRef.current = performance.now()

    const loop = new Tone.Loop((time: number) => {
      synth.triggerAttackRelease(1200, '64n', time)
      noise.triggerAttackRelease('32n', time)
      Tone.getDraw().schedule(() => {
        beatStartRef.current = performance.now()
      }, time)
    }, '4n')

    loopRef.current = loop
    loop.start(0)
    Tone.getTransport().start()

    // RAF — 도트 위치는 DOM 직접 조작, 세그먼트만 setState
    let lastSeg = -1
    const frame = () => {
      const elapsed = performance.now() - beatStartRef.current
      const beatMs  = 60000 / (toneRef.current?.getTransport().bpm.value ?? bpm)
      const progress = Math.min(1, Math.max(0, (elapsed % beatMs) / beatMs))

      // 도트 위치 — DOM 직접
      const angle = progress * 360 - 90
      const rad   = (angle * Math.PI) / 180
      const x     = CENTER + RADIUS * Math.cos(rad)
      const y     = CENTER + RADIUS * Math.sin(rad)
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', String(x))
        dotRef.current.setAttribute('cy', String(y))
      }

      // 활성 세그먼트 — setState (16x per beat)
      const seg = Math.floor(progress * SEGMENTS) % SEGMENTS
      if (seg !== lastSeg) {
        lastSeg = seg
        setActiveSeg(seg)
      }
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    setIsPlaying(true)
  }, [bpm])

  const toggle = () => isPlaying ? stop() : start()

  // BPM 라이브 변경
  useEffect(() => {
    if (isPlaying && toneRef.current) {
      toneRef.current.getTransport().bpm.value = bpm
    }
  }, [bpm, isPlaying])

  // 클린업
  useEffect(() => () => stop(), [stop])

  // ESC로 닫기
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // BPM 조절 (홀드 기능)
  const adjustBpm = useCallback((delta: number) => {
    setBpm(b => Math.max(40, Math.min(240, b + delta)))
  }, [])

  // 세그먼트 마커 16개
  const segmentDots = []
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i / SEGMENTS) * 360 - 90
    const rad   = (angle * Math.PI) / 180
    const x     = CENTER + RADIUS * Math.cos(rad)
    const y     = CENTER + RADIUS * Math.sin(rad)
    const isActive = isPlaying && i === activeSeg
    const isTop    = i === 0
    segmentDots.push(
      <circle
        key={i}
        cx={x} cy={y}
        r={isActive ? 2.5 : isTop ? 2 : 1.5}
        fill={isActive ? '#111827' : isTop ? '#6b7280' : '#d1d5db'}
        style={{ transition: 'fill 80ms ease, r 80ms ease' }}
      />
    )
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-paper-bright border flex items-center justify-center transition-all hover:bg-surface active:scale-95 ${
          open ? 'border-ink' : 'border-rule'
        } ${isPlaying ? 'ring-1 ring-ink ring-offset-2 ring-offset-paper' : ''}`}
        aria-label="Metronome"
        title="Metronome"
      >
        <IconMetronome size={20} className="text-ink" />
      </button>

      {/* Overlay */}
      {open && (
        <>
          {/* 백드롭 — 클릭 시 닫힘 (메트로놈은 계속 실행) */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
          />

          {/* 패널 */}
          <div className="fixed bottom-20 right-6 z-40 bg-paper-bright border border-rule p-5 animate-metronome-up shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow">Metronome</span>
              <button
                onClick={() => setOpen(false)}
                className="text-ink-faint hover:text-ink leading-none"
              ><IconClose size={14} /></button>
            </div>

            <div className="flex items-center justify-center gap-3">
              {/* − */}
              <button
                onClick={() => adjustBpm(-1)}
                className="w-10 h-10 bg-paper-bright border border-rule hover:bg-surface hover:border-ink-soft active:scale-95 flex items-center justify-center text-ink-soft transition-colors"
              >
                <span className="text-xl leading-none">−</span>
              </button>

              {/* BPM 원 + 궤도 */}
              <button onClick={toggle} className="relative active:scale-95 transition-transform">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {/* 안쪽 원 */}
                  <circle
                    cx={CENTER} cy={CENTER} r={RADIUS - 6}
                    fill={isPlaying ? '#fafafa' : 'white'}
                    stroke="#e5e7eb" strokeWidth="1"
                  />

                  {/* 16 세그먼트 */}
                  {segmentDots}

                  {/* 궤도 도트 */}
                  {isPlaying && (
                    <circle
                      ref={dotRef}
                      cx={CENTER} cy={CENTER - RADIUS}
                      r="4"
                      fill="#111827"
                    />
                  )}

                  {/* BPM 숫자 */}
                  <text
                    x={CENTER} y={CENTER + 3}
                    textAnchor="middle"
                    fontSize="22"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                    fontWeight="700"
                    fill="#111827"
                  >{bpm}</text>
                  <text
                    x={CENTER} y={CENTER + 16}
                    textAnchor="middle"
                    fontSize="7"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="2.5"
                    fill="#9ca3af"
                  >BPM</text>
                </svg>
              </button>

              {/* + */}
              <button
                onClick={() => adjustBpm(1)}
                className="w-10 h-10 bg-paper-bright border border-rule hover:bg-surface hover:border-ink-soft active:scale-95 flex items-center justify-center text-ink-soft transition-colors"
              >
                <span className="text-xl leading-none">+</span>
              </button>
            </div>

            {/* 빠른 BPM 프리셋 */}
            <div className="flex justify-center gap-px mt-4 border border-rule bg-rule">
              {[60, 80, 100, 120, 140].map(p => (
                <button
                  key={p}
                  onClick={() => setBpm(p)}
                  className={`flex-1 py-1.5 text-[10px] font-mono tabular transition-colors ${
                    bpm === p
                      ? 'bg-ink text-ink-inv'
                      : 'bg-paper-bright text-ink-faint hover:text-ink hover:bg-surface'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <p className="text-center text-[9px] text-ink-quiet mt-3 tracking-widest uppercase font-mono">
              {isPlaying ? 'Tap circle to stop' : 'Tap circle to start'}
            </p>
          </div>
        </>
      )}
    </>
  )
}

export default dynamic(() => Promise.resolve(FloatingMetronomeInner), { ssr: false })
