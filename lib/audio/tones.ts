'use client'

import { useCallback, useSyncExternalStore } from 'react'

// 문제의 음을 사인파로 들려준다 — 청음 연습을 겸하기 위한 것.
// 브라우저 정책상 첫 사용자 입력(클릭·키) 이후에만 소리가 난다.

const STORAGE_KEY = 'gugudan:sound'
const SOUND_EVENT = 'gugudan:sound'

const PITCH_CLASS: Record<string, number> = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, Fb: 4, 'E#': 5, F: 5, 'F#': 6, Gb: 6,
  G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11, Cb: 11, 'B#': 0,
}

let ctx: AudioContext | null = null
let master: GainNode | null = null
let live: Array<{ osc: OscillatorNode; gain: GainNode }> = []

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
    master = ctx.createGain()
    master.gain.value = 0.9
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** 음 이름들을 아래에서 위로 쌓은 MIDI 번호로 바꾼다 (첫 음은 C3~B3 근처에서 시작). */
function ascendingMidi(notes: string[], closeOctave = false): number[] {
  const out: number[] = []
  let prev = -Infinity
  for (const name of notes) {
    const pc = PITCH_CLASS[name.replace(/\d/g, '')]
    if (pc === undefined) continue
    let midi = 48 + pc // C3 = 48
    // 너무 낮은 루트는 한 옥타브 올려 사인파가 잘 들리게 한다
    if (out.length === 0 && midi < 53) midi += 12
    while (midi <= prev) midi += 12
    out.push(midi)
    prev = midi
  }
  if (closeOctave && out.length > 0) out.push(out[0] + 12)
  return out
}

function stopAll(): void {
  const now = ctx?.currentTime ?? 0
  for (const { osc, gain } of live) {
    try {
      gain.gain.cancelScheduledValues(now)
      gain.gain.setTargetAtTime(0, now, 0.015)
      osc.stop(now + 0.1)
    } catch {
      // 이미 끝난 음
    }
  }
  live = []
}

function tone(midi: number, start: number, duration: number, level: number): void {
  if (!ctx || !master) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = 440 * Math.pow(2, (midi - 69) / 12)
  // 짧은 어택 + 지수 감쇠 — 클릭 노이즈 없이 또렷하게
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(level, start + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0008, start + duration)
  osc.connect(gain)
  gain.connect(master)
  osc.start(start)
  osc.stop(start + duration + 0.05)
  const entry = { osc, gain }
  live.push(entry)
  osc.onended = () => {
    live = live.filter((e) => e !== entry)
  }
}

export type Voicing = 'sequence' | 'chord' | 'scale'

/**
 * sequence: 한 음씩 차례로 (도수 — 루트, 그다음 음)
 * chord:    빠른 아르페지오로 쌓아 올려 함께 울린다
 * scale:    아래에서 위로, 옥타브 위 루트까지
 */
export function playNotes(notes: string[], voicing: Voicing): void {
  if (!isSoundOn()) return
  const audio = getContext()
  if (!audio) return
  stopAll()

  const midi = ascendingMidi(notes, voicing === 'scale')
  const t0 = audio.currentTime + 0.03

  if (voicing === 'chord') {
    midi.forEach((m, i) => tone(m, t0 + i * 0.07, 1.6, 0.16))
  } else if (voicing === 'scale') {
    midi.forEach((m, i) => tone(m, t0 + i * 0.17, 0.5, 0.2))
  } else {
    midi.forEach((m, i) => tone(m, t0 + i * 0.42, 0.9, 0.22))
  }
}

/**
 * 키를 누를 때의 한 음. 문제의 루트를 주면 그 루트 위 한 옥타브 안에서 울려서
 * 문제로 들려준 소리와 같은 음역에 놓인다. 재생 중인 문제 소리는 끊지 않는다.
 */
export function playKey(note: string, root?: string): void {
  if (!isSoundOn()) return
  const audio = getContext()
  if (!audio) return
  const midi = root ? ascendingMidi([root, note])[1] ?? ascendingMidi([note])[0] : ascendingMidi([note])[0]
  // 루트와 같은 음을 누르면 ascendingMidi가 옥타브 위로 올리므로 제자리로 돌린다
  const base = root && PITCH_CLASS[root] === PITCH_CLASS[note.replace(/\d/g, '')] ? ascendingMidi([root])[0] : midi
  if (base === undefined) return
  tone(base, audio.currentTime + 0.01, 0.55, 0.2)
}

// ── 켜기/끄기 (브라우저에 기억) ──

export function isSoundOn(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSoundOn(on: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    // 저장이 안 되면 이번 방문에서만 적용된다
  }
  if (!on) stopAll()
  else getContext() // 토글 클릭은 사용자 입력이므로 여기서 오디오를 깨워 둔다
  window.dispatchEvent(new Event(SOUND_EVENT))
}

function subscribe(cb: () => void): () => void {
  window.addEventListener(SOUND_EVENT, cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener(SOUND_EVENT, cb)
    window.removeEventListener('storage', cb)
  }
}

export function useSound(): { on: boolean; toggle: () => void } {
  // 서버 렌더에서는 꺼진 상태로 그려 두고, 브라우저에서 저장값으로 맞춘다
  const on = useSyncExternalStore(subscribe, isSoundOn, () => false)
  const toggle = useCallback(() => setSoundOn(!isSoundOn()), [])
  return { on, toggle }
}
