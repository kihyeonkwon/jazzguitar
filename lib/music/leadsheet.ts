import { Chord, Note } from 'tonal'
import { BackingTrack } from '@/lib/curriculum/types'

/**
 * 백킹 트랙의 코드 진행을 ABC notation 리드시트로 변환합니다.
 * 각 마디에 가이드 톤(3도, 7도)을 반음표 둘로 표시하고
 * 코드 심볼을 위에 붙입니다.
 */

// 음 이름 → ABC notation (옥타브 4 = middle 옥타브)
// 예: 'Eb' → '_E', 'F#' → '^F', 'C' → 'C'
function noteNameToAbc(noteName: string, preferOctaveDown = false): string {
  const cleaned = Note.simplify(noteName) || noteName
  const m = cleaned.match(/^([A-G])([#b]*)$/)
  if (!m) return 'z'
  const [, letter, acc] = m
  let prefix = ''
  if (acc === 'b' || acc === 'bb') prefix = '_'
  else if (acc === '#' || acc === '##') prefix = '^'
  // 옥타브 4 = ABC 대문자 (middle range)
  return preferOctaveDown ? prefix + letter + ',' : prefix + letter
}

// 코드의 가이드 톤(3, 7)을 ABC notation으로 반환
function guideTonesAbc(chordSym: string): { third: string; seventh: string } {
  const c = Chord.get(chordSym)
  // tonal: c.intervals 예) ['1P', '3M', '5P', '7M']
  // c.notes 예) ['C', 'E', 'G', 'B']
  if (!c.notes || c.notes.length < 4) {
    // 3음 코드(트라이어드)일 경우 5도를 대신 사용
    if (c.notes.length === 3) {
      return {
        third:   noteNameToAbc(c.notes[1]),
        seventh: noteNameToAbc(c.notes[2]),
      }
    }
    return { third: 'z', seventh: 'z' }
  }
  return {
    third:   noteNameToAbc(c.notes[1]),
    seventh: noteNameToAbc(c.notes[3]),
  }
}

// 키 결정 (ABC의 K: 헤더에 들어감)
function abcKey(key: string): string {
  // 'F' → 'F', 'Bb' → 'Bb', 'C' → 'C' 그대로 사용
  return key
}

interface Bar {
  chords: Array<{ sym: string; beats: number }>
}

/**
 * beats 배열(8분음표 단위)을 bar 배열로 변환
 * @param chords backing track의 chord 배열 (beats는 8분음표 단위)
 * @param eighthsPerBar 한 마디당 8분음표 수 (4/4 → 8)
 */
function groupIntoBars(
  chords: Array<{ chord: string; beats: number }>,
  eighthsPerBar: number,
): Bar[] {
  const bars: Bar[] = []
  let currentBar: Bar = { chords: [] }
  let usedInBar = 0

  for (const c of chords) {
    let remaining = c.beats
    while (remaining > 0) {
      const room = eighthsPerBar - usedInBar
      const take = Math.min(remaining, room)
      currentBar.chords.push({ sym: c.chord, beats: take })
      usedInBar += take
      remaining -= take
      if (usedInBar >= eighthsPerBar) {
        bars.push(currentBar)
        currentBar = { chords: [] }
        usedInBar = 0
      }
    }
  }
  if (currentBar.chords.length > 0) bars.push(currentBar)
  return bars
}

/**
 * 백킹 트랙을 리드시트 ABC notation으로 변환
 */
export function trackToLeadSheetAbc(track: BackingTrack): string {
  // 한 마디당 8분음표 수 계산
  const totalEighths = track.chords.reduce((sum, c) => sum + c.beats, 0)
  const eighthsPerBar = Math.round(totalEighths / track.bars)

  const bars = groupIntoBars(track.chords, eighthsPerBar)

  // ABC 헤더
  // L:1/4 — 기본 길이는 4분음표
  const lines: string[] = [
    `X:1`,
    `T:${track.name.en || track.name.ko}`,
    `M:4/4`,
    `L:1/4`,
    `Q:1/4=${track.bpm}`,
    `K:${abcKey(track.key)}`,
  ]

  // 각 마디를 ABC로 — 마디 안의 코드들을 비례 분할
  const barStrings = bars.map((bar) => {
    // 4박자 마디 안의 분할
    // bar.chords의 beats 총합 = eighthsPerBar (= 8분음표 8개 = 4박자)
    // 4분음표 단위로 변환 = beats / 2
    const parts: string[] = []
    for (const c of bar.chords) {
      const quarterBeats = c.beats / 2 // 8분 → 4분 변환
      const { third, seventh } = guideTonesAbc(c.sym)
      // 코드 심볼 표기 + 가이드 톤 2개 (반반)
      // quarterBeats=4 (한 마디 한 코드): 각 음 2박자씩
      // quarterBeats=2 (반 마디): 각 음 1박자씩
      // quarterBeats=1 (1박자): 짧게
      const halfDur = Math.max(1, Math.floor(quarterBeats / 2))
      // ABC 길이 표기: 음 뒤에 숫자 (1 = 기본, 2 = 두 배)
      const lenStr = halfDur === 1 ? '' : String(halfDur)
      parts.push(`"${c.sym}"${third}${lenStr}${seventh}${lenStr}`)
    }
    return parts.join(' ')
  })

  // 4마디씩 줄바꿈
  const groupedLines: string[] = []
  for (let i = 0; i < barStrings.length; i += 4) {
    groupedLines.push(barStrings.slice(i, i + 4).join(' | ') + ' |')
  }
  lines.push(...groupedLines)
  return lines.join('\n')
}
