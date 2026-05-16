import { Chord } from 'tonal'

// ─── Triad 코드 목록 ──────────────────────────────────────────────────────
export const triadChords = [
  // Major
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B',
  // Minor
  'Cm', 'Dbm', 'Dm', 'Ebm', 'Em', 'Fm', 'F#m', 'Gm', 'Abm', 'Am', 'Bbm', 'Bm',
  // Diminished
  'Cdim', 'Ddim', 'Edim', 'Fdim', 'Gdim', 'Adim', 'Bdim',
  // Augmented
  'Caug', 'Daug', 'Eaug', 'Faug', 'Gaug',
]

// ─── 7th 코드 목록 ───────────────────────────────────────────────────────
export const seventhChords = [
  // Major 7
  'Cmaj7', 'Dbmaj7', 'Dmaj7', 'Ebmaj7', 'Fmaj7', 'Gmaj7', 'Abmaj7', 'Amaj7', 'Bbmaj7',
  // Minor 7
  'Cm7', 'Dm7', 'Em7', 'Fm7', 'Gm7', 'Am7', 'Bm7',
  // Dominant 7
  'C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7', 'Bb7', 'Eb7', 'Ab7',
  // Half-diminished
  'Cm7b5', 'Dm7b5', 'Em7b5', 'F#m7b5', 'Gm7b5', 'Bm7b5',
  // Diminished 7
  'Cdim7', 'Ddim7', 'Edim7', 'Gdim7',
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
