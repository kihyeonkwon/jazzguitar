'use client'

import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Chord, Note } from 'tonal'
import { BackingTrack } from '@/lib/curriculum/types'
import { trackToLeadSheetAbc } from '@/lib/music/leadsheet'

const SheetMusic = dynamic(() => import('@/components/music/SheetMusic'), { ssr: false })
const Recorder = dynamic(() => import('@/components/jam/Recorder'), { ssr: false })

interface Props {
  track: BackingTrack
}

// ─── 음악 헬퍼 ─────────────────────────────────────────────────────────

/** 코드 심볼에서 피아노 보이싱(4음) 만들기 — 가능하면 3·5·7·9 (rootless) */
function voicingFor(chordSymbol: string): string[] {
  const c = Chord.get(chordSymbol)
  if (!c.notes || c.notes.length === 0) {
    const root = chordSymbol.replace(/[^A-G#b]/g, '') || 'C'
    return [`${root}4`]
  }
  // rootless: 3 · 5 · 7 · 9 (있다면)
  // c.intervals 예: ['1P', '3M', '5P', '7M', '9M']
  const ints = c.intervals
  const upper = c.notes.slice(1) // 1(root) 제외
  if (ints.length >= 4) {
    // 4음이 있으면 3·5·7 + 9 시도
    const ninth = Note.transpose(c.notes[0], '9M')
    const isMinor = ints.includes('3m')
    const ninthCorrected = isMinor ? Note.transpose(c.notes[0], '9M') : ninth
    const top = [...upper, ninthCorrected].slice(0, 4)
    // 중간 옥타브에 배치 (E4~A4 정도)
    return top.map((n, i) => `${n}${i < 2 ? 4 : i < 3 ? 4 : 5}`)
  }
  return upper.map((n, i) => `${n}${i === 0 ? 4 : 4}`)
}

/** 코드 루트를 베이스 옥타브 (E2~A2)에 배치 */
function bassRootMidi(chordSymbol: string): number {
  const c = Chord.get(chordSymbol)
  const root = c.tonic ?? chordSymbol.replace(/[^A-G#b]/g, '')[0] ?? 'C'
  const m = Note.midi(root + '2') ?? 36
  let result = m
  while (result < 40) result += 12 // E2 = 40
  while (result > 52) result -= 12 // E3 = 52
  return result
}

/** Walking bass: 4박자 패턴 — 1·3·5·approach */
function walkingMidi(curRoot: number, nextRoot: number, intervals: string[], beat: number): number {
  if (beat === 0) return curRoot
  if (beat === 1) {
    // 3rd (minor면 ♭3)
    const isMinor = intervals.includes('3m')
    return curRoot + (isMinor ? 3 : 4)
  }
  if (beat === 2) return curRoot + 7 // 5
  // beat === 3: 다음 코드 루트로 반음 접근
  const diff = nextRoot - curRoot
  return diff >= 0 ? nextRoot - 1 : nextRoot + 1
}

/** MIDI 번호를 Tone이 받는 음 이름으로 변환 */
function midiToName(midi: number): string {
  return Note.fromMidi(midi) ?? 'C2'
}

interface BarSlot {
  chord: string
  voicing: string[]
  rootMidi: number
  intervals: string[]
}

/** 트랙 chord 배열을 quarter-note 단위로 펼침 (각 chord beats는 8분음표 단위) */
function buildQuarterSlots(track: BackingTrack): BarSlot[] {
  // beats/2 = quarter notes
  const slots: BarSlot[] = []
  for (const c of track.chords) {
    const quarters = Math.max(1, Math.round(c.beats / 2))
    const ch = Chord.get(c.chord)
    const slot: BarSlot = {
      chord: c.chord,
      voicing: voicingFor(c.chord),
      rootMidi: bassRootMidi(c.chord),
      intervals: ch.intervals ?? ['1P', '3M', '5P'],
    }
    for (let i = 0; i < quarters; i++) slots.push(slot)
  }
  return slots
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────

export default function BackingTrackPlayer({ track }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [currentBar, setCurrentBar] = useState(0)
  const [currentChord, setCurrentChord] = useState<string>('')
  const [currentChorus, setCurrentChorus] = useState(1)
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toneRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sequencesRef = useRef<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instrumentsRef = useRef<any[]>([])
  const quarterIdxRef = useRef(0)

  // 4분음표 슬롯 배열
  const quarterSlots = useMemo(() => buildQuarterSlots(track), [track])
  const totalQuarters = quarterSlots.length
  const beatsPerBar = totalQuarters / track.bars // 보통 4

  const stop = useCallback(() => {
    sequencesRef.current.forEach((s) => {
      try { s.stop(); s.dispose() } catch { /* */ }
    })
    sequencesRef.current = []
    instrumentsRef.current.forEach((s) => {
      try { s.dispose() } catch { /* */ }
    })
    instrumentsRef.current = []
    if (toneRef.current) {
      try {
        toneRef.current.getTransport().stop()
        toneRef.current.getTransport().cancel(0)
      } catch { /* */ }
    }
    setIsPlaying(false)
    setCurrentBeat(0)
    setCurrentBar(0)
    setCurrentChord('')
    setCurrentChorus(1)
    quarterIdxRef.current = 0
  }, [])

  useEffect(() => () => stop(), [stop])

  const start = useCallback(async () => {
    setLoading(true)
    const Tone = await import('tone')
    toneRef.current = Tone
    await Tone.start()

    // 이전 인스턴스 정리
    sequencesRef.current.forEach((s) => { try { s.stop(); s.dispose() } catch { /* */ } })
    sequencesRef.current = []
    instrumentsRef.current.forEach((s) => { try { s.dispose() } catch { /* */ } })
    instrumentsRef.current = []
    Tone.getTransport().cancel(0)

    // BPM + 스윙
    Tone.getTransport().bpm.value = track.bpm
    Tone.getTransport().swing = track.style === 'blues' || track.style === 'standard' ? 0.55 : 0
    Tone.getTransport().swingSubdivision = '8n'

    // ─── 마스터 체인: 단순화 — Compressor → 짧은 리버브 → 출력 ────
    const masterReverb = new Tone.Reverb({ decay: 1.1, wet: 0.1 }).toDestination()
    await masterReverb.generate()
    const masterComp = new Tone.Compressor({ threshold: -16, ratio: 2.5, attack: 0.005, release: 0.1 }).connect(masterReverb)

    // ─── 1) 피아노 (Salamander 샘플) ────────────────────────────────
    const piano = new Tone.Sampler({
      urls: {
        A2: 'A2.mp3', C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3',
        A3: 'A3.mp3', C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3',
        A4: 'A4.mp3', C5: 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3',
        A5: 'A5.mp3',
      },
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    })
    const pianoVol = new Tone.Volume(-8).connect(masterComp)
    piano.connect(pianoVol)

    // ─── 2) 어쿠스틱 베이스 (신디로 흉내) ───────────────────────────
    const bass = new Tone.MonoSynth({
      oscillator: { type: 'sawtooth' },
      filter: { Q: 1.5, type: 'lowpass', rolloff: -24 },
      envelope: { attack: 0.005, decay: 0.4, sustain: 0.6, release: 0.4 },
      filterEnvelope: { attack: 0.005, decay: 0.15, sustain: 0.2, release: 0.4, baseFrequency: 180, octaves: 2.2 },
      volume: -6,
    }).connect(masterComp)

    // ─── 3) 드럼 — 직접 마스터에 연결 (체인 단순화) ─────────────────

    // ── 킥: MembraneSynth로 한 방. 충분히 큰 볼륨
    const kick = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 5,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.45, sustain: 0, release: 0.4 },
      volume: -4,
    }).connect(masterComp)

    // ── 하이햇 (closed)
    const hat = new Tone.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
      volume: -14,
    })
    const hatHP = new Tone.Filter(8000, 'highpass').connect(masterComp)
    hat.connect(hatHP)

    // ── 라이드: NoiseSynth pink로 wash, decay/release 길게
    //    EQ로 고역 강조 + 저역 컷
    const ride = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.001, decay: 0.08, sustain: 0.04, release: 0.7 },
      volume: -14,
    })
    const rideEQ = new Tone.EQ3({ low: -24, mid: -8, high: 2, lowFrequency: 800, highFrequency: 4000 }).connect(masterComp)
    ride.connect(rideEQ)

    // ── 라이드 벨 (강조용): 사인 + 옥타브 위 + 5도 위. 진짜 "띵"
    //    벨은 부드럽게 — 너무 튀지 않게
    const bellOsc1 = new Tone.Oscillator({ frequency: 880, type: 'sine' }).start()
    const bellOsc2 = new Tone.Oscillator({ frequency: 1760, type: 'sine' }).start()
    const bellOsc3 = new Tone.Oscillator({ frequency: 2637, type: 'sine' }).start()
    const bellEnv = new Tone.AmplitudeEnvelope({
      attack: 0.001, decay: 0.18, sustain: 0, release: 0.15,
    })
    const bellMix = new Tone.Gain(0.4)
    const bellVol = new Tone.Volume(-26).connect(masterComp)
    bellOsc1.connect(bellMix)
    bellOsc2.connect(bellMix)
    bellOsc3.connect(bellMix)
    bellMix.connect(bellEnv)
    bellEnv.connect(bellVol)

    const triggerBell = (time: number) => {
      bellEnv.triggerAttackRelease(0.2, time)
    }

    instrumentsRef.current = [
      piano, pianoVol, bass,
      kick, hat, hatHP, ride, rideEQ,
      bellOsc1, bellOsc2, bellOsc3, bellMix, bellEnv, bellVol,
      masterReverb, masterComp,
    ]

    // 샘플 로딩 대기
    await Tone.loaded()

    // ─── Sequences ──────────────────────────────────────────────────

    const loopCount = track.loopCount ?? 8

    // 슬롯 인덱스(quarter 단위) — Transport 시간 기준으로 계산
    const advanceSlot = (time: number) => {
      const idx = quarterIdxRef.current
      const slot = quarterSlots[idx % totalQuarters]
      const nextSlot = quarterSlots[(idx + 1) % totalQuarters]
      const beat = idx % beatsPerBar
      const bar = Math.floor(idx / beatsPerBar) % track.bars
      const chorus = Math.floor(idx / totalQuarters) + 1

      // ── Walking bass: 매 4분음표
      const bassMidi = walkingMidi(slot.rootMidi, nextSlot.rootMidi, slot.intervals, beat)
      bass.triggerAttackRelease(midiToName(bassMidi), '4n', time, 0.85)

      // ── Kick: 1·3박 (재즈는 feathered = 약하게)
      if (beat === 0 || beat === 2) {
        kick.triggerAttackRelease('C1', '8n', time, 0.65)
      }

      // ── Hi-hat chick: 2·4박
      if (beat === 1 || beat === 3) {
        hat.triggerAttackRelease('16n', time, 0.7)
      }

      // ── 라이드 벨: 1박만 (1박마다 띵 — 4박당 1번이라 카우벨 효과 사라짐)
      if (beat === 0) {
        triggerBell(time)
      }

      // ── 코드 컴핑: Charleston 패턴 (beat 0과 beat 1.5)
      //    Tone의 swing 적용 8n이 필요한데 4n 시퀀스 안이라 직접 schedule
      if (beat === 0) {
        piano.triggerAttackRelease(slot.voicing, '4n', time, 0.55)
      }

      // ── 비주얼 동기화
      Tone.getDraw().schedule(() => {
        setCurrentBar(bar)
        setCurrentBeat(beat)
        setCurrentChord(slot.chord)
        if (chorus <= loopCount) setCurrentChorus(chorus)
      }, time)

      quarterIdxRef.current++
    }

    // 4분음표 마스터 시퀀스 — Tone.Sequence는 falsy(0) 값을 스킵하므로 1 사용
    const mainSeq = new Tone.Sequence((time) => {
      advanceSlot(time)
    }, [1], '4n')
    mainSeq.loop = true
    mainSeq.start(0)
    sequencesRef.current.push(mainSeq)

    // Ride 패턴 (재즈 ding-da-ding-da):
    //   ride = 4분음표마다 한 번 + 2·4박 직후 8th에 한 번 더 ("and")
    //   1·2·2&·3·4·4& 같은 자리에 ride가 떨어짐
    // ridePattern: 강도 (0=쉼, 1=약, 2=강)
    const ridePattern = [2, 0, 1, 1, 2, 0, 1, 1] // 1(강)·2·(2&)·3(강)·4·(4&)
    const rideSeq = new Tone.Sequence((time, hit: number) => {
      if (hit === 0) return
      const velocity = hit === 2 ? 0.7 : 0.5
      ride.triggerAttackRelease('8n', time, velocity)
    }, ridePattern, '8n')
    rideSeq.loop = true
    rideSeq.start(0)
    sequencesRef.current.push(rideSeq)

    // 코드 Charleston "and of 2" — 8n 슬롯 3 (= 1.5박 다음 = and of 2)
    const chordCharlestonSeq = new Tone.Sequence((time, hit: number) => {
      if (hit) {
        const idx = quarterIdxRef.current - 1 // mainSeq가 방금 advance 했으므로
        const beat = ((idx % beatsPerBar) + beatsPerBar) % beatsPerBar
        if (beat === 1 || beat === 2) {
          // beat 1.5 또는 2.5 자리 (Charleston "and of 2" / "and of 3")
          // 첫 번째 마디는 beat 1.5만 — 슬롯 인덱스 3 (1 박 = 2 슬롯)
          const slot = quarterSlots[idx % totalQuarters]
          piano.triggerAttackRelease(slot.voicing, '8n', time, 0.4)
        }
      }
    }, [0, 0, 0, 1, 0, 0, 0, 0], '8n')
    chordCharlestonSeq.loop = true
    chordCharlestonSeq.start(0)
    sequencesRef.current.push(chordCharlestonSeq)

    // 끝나면 정지
    Tone.getTransport().scheduleOnce((time) => {
      Tone.getDraw().schedule(() => stop(), time)
    }, `+${(60 / track.bpm) * 4 * track.bars * loopCount}`)

    Tone.getTransport().start()
    setIsPlaying(true)
    setLoading(false)
  }, [track, quarterSlots, totalQuarters, beatsPerBar, stop])

  const toggle = useCallback(() => {
    if (isPlaying) stop()
    else start()
  }, [isPlaying, start, stop])

  return (
    <div className="border border-rule bg-paper-bright">

      {/* 상단: 현재 코드 + BPM */}
      <div className="flex items-stretch border-b border-rule">
        <div className="flex-1 p-6 border-r border-rule">
          <div className="eyebrow mb-2">Now Playing</div>
          <div className="display text-4xl text-ink leading-none tabular font-mono">
            {currentChord || track.chords[0]?.chord || '—'}
          </div>
          <div className="text-[11px] font-mono tabular text-ink-faint tracking-widest mt-3">
            BAR {String(currentBar + 1).padStart(2, '0')}/{String(track.bars).padStart(2, '0')}
            <span className="mx-2 text-ink-quiet">·</span>
            BEAT {currentBeat + 1}
            <span className="mx-2 text-ink-quiet">·</span>
            CHORUS {currentChorus}/{track.loopCount ?? 8}
          </div>
        </div>
        <div className="w-32 p-6 flex flex-col items-center justify-center">
          <div className="text-3xl font-mono font-medium text-ink tabular leading-none">
            {track.bpm}
          </div>
          <div className="eyebrow mt-2">BPM</div>
        </div>
      </div>

      {/* 박자 인디케이터 — 4 thin bars */}
      <div className="flex gap-px bg-rule">
        {Array.from({ length: beatsPerBar }, (_, i) => (
          <div
            key={i}
            className="flex-1 h-0.5 transition-colors"
            style={{
              backgroundColor: isPlaying && currentBeat === i
                ? '#0a0a0a'
                : '#fafafa',
            }}
          />
        ))}
      </div>

      {/* 리드시트 (5선지 + 코드 + 가이드 톤) — 모바일에선 좌우 패딩 최소화 */}
      <div className="pt-5 pb-3 border-b border-rule">
        <div className="eyebrow mb-3 px-5">Lead Sheet · Guide Tones</div>
        <div className="px-1 sm:px-5">
          <LeadSheet track={track} />
        </div>
      </div>

      {/* 재생 컨트롤 */}
      <button
        onClick={toggle}
        disabled={loading}
        className={`w-full h-14 text-sm font-medium transition-colors disabled:opacity-30 border-b border-rule ${
          isPlaying
            ? 'bg-ink text-ink-inv hover:bg-ink-soft'
            : 'bg-paper-bright text-ink hover:bg-surface'
        }`}
      >
        {loading ? 'LOADING…' : isPlaying ? '■  STOP' : '▶  START'}
      </button>

      {/* 녹음 — 재생 중일 때만 활성 */}
      <Recorder isParentPlaying={isPlaying} embedded />
    </div>
  )
}

// ── 리드시트 (코드 + 가이드톤 5선지) ──
function LeadSheet({ track }: { track: BackingTrack }) {
  const abc = useMemo(() => trackToLeadSheetAbc(track), [track])
  return <SheetMusic notation={abc} bpm={track.bpm} minimal compact />
}
