import { Note } from 'tonal'
import type { BackingTrack } from '@/lib/curriculum/types'

/**
 * 코드 심볼의 루트를 N 반음 이동.
 * 예: transposeChordSymbol('Cmaj7', 2) → 'Dmaj7'
 *     transposeChordSymbol('Bb7', -3) → 'G7'
 */
export function transposeChordSymbol(symbol: string, semitones: number): string {
  if (semitones === 0) return symbol
  const m = symbol.match(/^([A-G][b#]?)(.*)$/)
  if (!m) return symbol
  const [, root, quality] = m
  // tonal Note.transpose는 인터벌 문자열 필요 (예: '2m', '3M')
  // pitchClassFromMidi 트릭으로 단순화: midi 변환 → 이동 → 다시 음 이름
  const midi = Note.midi(root + '4')
  if (midi == null) return symbol
  const newMidi = midi + semitones
  // Note.fromMidi는 #를 선호. 플랫이 필요한 키도 있어서 enharmonic 선택:
  // 양수 transpose면 sharp, 음수면 flat이 더 자연스러움
  const useFlat = semitones < 0 || /b/.test(root)
  let name = Note.fromMidi(newMidi)
  if (useFlat) {
    // enharmonic flat 변환
    const flat = Note.enharmonic(name)
    if (flat && /b/.test(flat.replace(/\d+$/, ''))) {
      name = flat
    }
  }
  const newRoot = name.replace(/\d+$/, '') // 옥타브 제거
  return newRoot + quality
}

/**
 * 트랙 전체를 N 반음 이동한 새 트랙을 반환합니다.
 * id와 name은 transpose 표기를 붙입니다.
 */
export function transposeTrack(track: BackingTrack, semitones: number): BackingTrack {
  if (semitones === 0) return track
  const newKey = transposeChordSymbol(track.key, semitones)
  return {
    ...track,
    id: `${track.id}__t${semitones}`,
    key: newKey,
    chords: track.chords.map(c => ({
      chord: transposeChordSymbol(c.chord, semitones),
      beats: c.beats,
    })),
    // referenceYoutubeId는 원래 키에만 해당되므로 transpose 시 제거
    referenceYoutubeId: semitones === 0 ? track.referenceYoutubeId : undefined,
  }
}

/**
 * 사용자에게 보여줄 키 옵션 12개 (모든 반음).
 * fromKey 기준으로 -6 ~ +5 범위.
 */
export function getKeyOptions(fromKey: string): Array<{ label: string; semitones: number }> {
  const opts: Array<{ label: string; semitones: number }> = []
  for (let s = -6; s <= 5; s++) {
    const k = transposeChordSymbol(fromKey, s)
    opts.push({ label: k, semitones: s })
  }
  return opts
}
