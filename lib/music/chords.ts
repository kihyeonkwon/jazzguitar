import { Chord } from 'tonal'

// 코드 풀 — 12키 전부. 루트 표기는 구성음에 겹임시표(Bbb, F## 등)가 생기지 않는 쪽으로 골랐다
// (예: Dbm7 대신 C#m7, Bbdim7 대신 A#dim7). 어느 표기로도 깔끔하지 않은 루트는 뺐다:
// aug는 B, dim7은 C와 F — 대칭 코드라 같은 음 묶음이 다른 루트로 이미 나온다.

// ─── Triad 코드 목록 ──────────────────────────────────────────────────────
export const triadChords = [
  // Major
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
  // Minor
  'Cm', 'C#m', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'Bbm', 'Bm',
  // Diminished
  'Cdim', 'C#dim', 'Ddim', 'D#dim', 'Edim', 'Fdim', 'F#dim', 'Gdim', 'G#dim', 'Adim', 'A#dim', 'Bdim',
  // Augmented
  'Caug', 'Dbaug', 'Daug', 'Ebaug', 'Eaug', 'Faug', 'Gbaug', 'Gaug', 'Abaug', 'Aaug', 'Bbaug',
]

// ─── 7th 코드 목록 ───────────────────────────────────────────────────────
export const seventhChords = [
  // Major 7
  'Cmaj7', 'Dbmaj7', 'Dmaj7', 'Ebmaj7', 'Emaj7', 'Fmaj7', 'Gbmaj7', 'Gmaj7', 'Abmaj7', 'Amaj7', 'Bbmaj7', 'Bmaj7',
  // Minor 7
  'Cm7', 'C#m7', 'Dm7', 'Ebm7', 'Em7', 'Fm7', 'F#m7', 'Gm7', 'G#m7', 'Am7', 'Bbm7', 'Bm7',
  // Dominant 7
  'C7', 'Db7', 'D7', 'Eb7', 'E7', 'F7', 'F#7', 'G7', 'Ab7', 'A7', 'Bb7', 'B7',
  // Half-diminished
  'Cm7b5', 'C#m7b5', 'Dm7b5', 'D#m7b5', 'Em7b5', 'Fm7b5', 'F#m7b5', 'Gm7b5', 'G#m7b5', 'Am7b5', 'A#m7b5', 'Bm7b5',
  // Diminished 7
  'C#dim7', 'Ddim7', 'D#dim7', 'Edim7', 'F#dim7', 'Gdim7', 'G#dim7', 'Adim7', 'A#dim7', 'Bdim7',
]

// ─── 이명동음 → 샵 기준으로 정규화 ────────────────────────────────────────
const FLAT_TO_SHARP: Record<string, string> = {
  'Db': 'C#', 'Eb': 'D#', 'Fb': 'E',
  'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B',
  'E#': 'F', 'B#': 'C',
}

export function toSharp(note: string): string {
  return FLAT_TO_SHARP[note] ?? note
}

export function getChordNotes(chordName: string): string[] {
  const chord = Chord.get(chordName)
  return chord.notes
}

export function getChordType(chordName: string): string {
  const chord = Chord.get(chordName)
  return chord.type
}

// 선택한 음들이 정답인지 확인 (순서 무관, 이명동음 허용)
export function checkNoteSelection(selected: string[], correctNotes: string[]): boolean {
  if (selected.length !== correctNotes.length) return false
  const normSelected  = selected.map(toSharp).sort()
  const normCorrect   = correctNotes.map(toSharp).sort()
  return normSelected.every((n, i) => n === normCorrect[i])
}
