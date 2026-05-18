'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type Mode = 'audio' | 'video'
type State = 'idle' | 'recording' | 'recorded'

interface Props {
  /** 부모(BackingTrackPlayer)가 재생 중인지 — 재생 중일 때만 녹음 시작 가능 */
  isParentPlaying?: boolean
  /** 임베디드 모드 — 자체 border/bg 없이 부모 카드 안에 합쳐짐 */
  embedded?: boolean
}

export default function Recorder({ isParentPlaying = true, embedded = false }: Props = {}) {
  const [mode, setMode]         = useState<Mode>('audio')
  const [state, setState]       = useState<State>('idle')
  const [elapsedMs, setElapsed] = useState(0)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)
  const [mediaMime, setMediaMime] = useState<string>('audio/webm')
  const [error, setError]       = useState<string | null>(null)

  const recRef    = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const userStreamRef = useRef<MediaStream | null>(null)
  const finalStreamRef = useRef<MediaStream | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recDestRef    = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneConnectionRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const micSourceRef = useRef<any>(null)
  const startedAtRef = useRef<number>(0)
  const timerRef     = useRef<number | null>(null)
  const videoRef     = useRef<HTMLVideoElement | null>(null)

  // ── 정리 ──
  const cleanup = useCallback(() => {
    userStreamRef.current?.getTracks().forEach(t => t.stop())
    userStreamRef.current = null
    finalStreamRef.current = null
    try { toneConnectionRef.current?.disconnect() } catch {/* */}
    try { micSourceRef.current?.disconnect() } catch {/* */}
    recDestRef.current = null
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => () => {
    cleanup()
    if (mediaUrl) URL.revokeObjectURL(mediaUrl)
  }, [cleanup, mediaUrl])

  // ── 시작 ──
  const start = useCallback(async () => {
    setError(null)
    try {
      if (mediaUrl) { URL.revokeObjectURL(mediaUrl); setMediaUrl(null) }

      // 1) 사용자 미디어 (마이크 [+ 카메라])
      const userStream = await navigator.mediaDevices.getUserMedia(
        mode === 'video'
          ? { audio: true, video: { width: 640, height: 480 } }
          : { audio: true }
      )
      userStreamRef.current = userStream

      // 2) Tone.js AudioContext에 접근하여 믹스용 destination 생성
      const Tone = await import('tone')
      await Tone.start()
      const ctx = Tone.getContext().rawContext as AudioContext
      const recDest = ctx.createMediaStreamDestination()
      recDestRef.current = recDest

      // 3) Tone 출력을 recDest에 라우팅 (스피커 출력은 유지)
      // Tone.Destination은 ctx.destination(스피커)에 이미 연결되어 있음
      // 우리는 그 위에 추가로 recDest를 연결
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const toneDest = (Tone.getDestination() as any)
      try {
        toneDest.connect(recDest)
        toneConnectionRef.current = { src: toneDest, dst: recDest, disconnect() { try { toneDest.disconnect(recDest) } catch {/* */} } }
      } catch {
        // 일부 환경에서 native connect가 필요
        const out = ctx.createMediaStreamDestination()
        // fallback ignored - 그대로 진행
        recDestRef.current = out
      }

      // 4) 마이크를 같은 recDest에 연결
      const micSource = ctx.createMediaStreamSource(
        new MediaStream(userStream.getAudioTracks())
      )
      micSource.connect(recDest)
      micSourceRef.current = micSource

      // 5) 최종 녹음용 스트림 구성
      let finalStream: MediaStream
      let mime: string
      if (mode === 'video') {
        const videoTrack = userStream.getVideoTracks()[0]
        finalStream = new MediaStream([
          videoTrack,
          ...recDest.stream.getAudioTracks(),
        ])
        mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
          ? 'video/webm;codecs=vp9,opus'
          : 'video/webm'
      } else {
        finalStream = recDest.stream
        mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      }
      finalStreamRef.current = finalStream
      setMediaMime(mime)

      // 6) MediaRecorder
      const rec = new MediaRecorder(finalStream, { mimeType: mime })
      recRef.current = rec
      chunksRef.current = []
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mime })
        setMediaUrl(URL.createObjectURL(blob))
        setState('recorded')
        cleanup()
        if (videoRef.current) videoRef.current.srcObject = null
      }
      rec.start()

      startedAtRef.current = Date.now()
      setElapsed(0)
      setState('recording')
      timerRef.current = window.setInterval(() => {
        setElapsed(Date.now() - startedAtRef.current)
      }, 100)
    } catch (e) {
      setError(
        e instanceof Error
          ? `미디어 접근 실패: ${e.message}`
          : '마이크/카메라 접근 실패'
      )
    }
  }, [mode, mediaUrl, cleanup])

  const stop = useCallback(() => {
    recRef.current?.stop()
  }, [])

  // 부모가 재생을 멈추면 녹음도 자동으로 멈춤
  useEffect(() => {
    if (!isParentPlaying && state === 'recording') {
      recRef.current?.stop()
    }
  }, [isParentPlaying, state])

  // 비디오 미리보기: state가 recording이 되면서 <video> 요소가 마운트된 직후
  // srcObject를 붙인다. start() 안에서 직접 붙이면 그 시점엔 video ref가 null이라 검은 화면이 됨.
  useEffect(() => {
    if (mode === 'video' && state === 'recording' && videoRef.current && finalStreamRef.current) {
      videoRef.current.srcObject = finalStreamRef.current
      videoRef.current.muted = true  // 피드백 방지
      videoRef.current.play().catch(() => { /* autoplay 실패는 무시 */ })
    }
  }, [mode, state])

  const reset = useCallback(() => {
    if (mediaUrl) URL.revokeObjectURL(mediaUrl)
    setMediaUrl(null)
    setState('idle')
    setElapsed(0)
  }, [mediaUrl])

  const download = useCallback(() => {
    if (!mediaUrl) return
    const a = document.createElement('a')
    a.href = mediaUrl
    const ts = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19)
    const ext = mediaMime.startsWith('video') ? 'webm' : 'webm'
    a.download = `jazz-jam_${mode}_${ts}.${ext}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [mediaUrl, mediaMime, mode])

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000)
    const m = Math.floor(s / 60)
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }

  const isVideo = mediaMime.startsWith('video')

  return (
    <div className={embedded ? '' : 'border border-rule bg-paper-bright'}>
      {/* 헤더 */}
      <div className="flex items-center justify-between p-5 border-b border-rule">
        <div className="eyebrow">{mode === 'video' ? 'Video Recording' : 'Audio Recording'}</div>
        <div className="flex border border-rule overflow-hidden">
          {(['audio', 'video'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => state === 'idle' && setMode(m)}
              disabled={state !== 'idle'}
              className={`px-3 h-7 text-[11px] font-mono tracking-widest transition-colors ${
                mode === m
                  ? 'bg-ink text-ink-inv'
                  : 'bg-paper-bright text-ink-faint hover:text-ink hover:bg-surface'
              } ${state !== 'idle' ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 안내 */}
      <p className="px-5 pt-4 text-[11px] text-ink-faint leading-relaxed">
        백킹 트랙과 마이크가 함께 녹음됩니다.
        {mode === 'video' && ' 카메라도 함께 녹화됩니다.'}
      </p>
      <p className="px-5 pt-2 text-[11px] text-ink-faint leading-relaxed">
        ⚠ 녹음·녹화 결과는 서버에 저장되지 않습니다. 다시 들으려면 종료 전에 반드시 다운로드해 두세요.
      </p>

      {/* 영상 미리보기 */}
      {mode === 'video' && state === 'recording' && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full bg-ink aspect-video mt-4"
        />
      )}

      {/* 타이머 */}
      <div className="flex items-center justify-center py-8">
        <div className="text-5xl font-mono font-medium text-ink tabular leading-none">
          {state === 'recording' && (
            <span className="inline-block w-2 h-2 rounded-full bg-ink mr-4 align-middle animate-pulse" />
          )}
          {fmt(elapsedMs)}
        </div>
      </div>

      {error && (
        <div className="mx-5 mb-4 text-xs text-red-500 border border-red-200 px-3 py-2 bg-red-50">
          {error}
        </div>
      )}

      {/* 컨트롤 */}
      {state === 'idle' && (
        <button
          onClick={start}
          disabled={!isParentPlaying}
          title={!isParentPlaying ? '백킹 재생을 먼저 시작하세요' : undefined}
          className="w-full h-14 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium tracking-widest transition-colors disabled:bg-paper-bright disabled:text-ink-faint disabled:border-t disabled:border-rule disabled:cursor-not-allowed"
        >
          ●  {mode === 'video' ? 'START VIDEO' : 'START RECORDING'}
        </button>
      )}

      {state === 'recording' && (
        <button
          onClick={stop}
          className="w-full h-14 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium tracking-widest transition-colors"
        >
          ■  STOP
        </button>
      )}

      {state === 'recorded' && mediaUrl && (
        <div className="space-y-px">
          <div className="p-5 border-t border-rule">
            {isVideo ? (
              <video src={mediaUrl} controls className="w-full bg-ink aspect-video" />
            ) : (
              <audio src={mediaUrl} controls className="w-full" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-px bg-rule">
            <button
              onClick={reset}
              className="h-12 bg-paper-bright text-ink-soft hover:bg-surface text-xs font-mono tracking-widest transition-colors"
            >
              REDO
            </button>
            <button
              onClick={download}
              className="h-12 bg-ink text-ink-inv hover:bg-ink-soft text-xs font-mono tracking-widest transition-colors"
            >
              DOWNLOAD {isVideo ? '.WEBM VIDEO' : '.WEBM AUDIO'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
