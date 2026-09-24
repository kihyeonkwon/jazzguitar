// 음 이름을 이론에 맞게 적는다 — B의 3도는 Eb가 아니라 D#.
// 도수(1, b3, #4 …)에서 글자(C D E F G A B)를 먼저 정하고, 반음 수에 맞춰 임시표를 붙인다.
// 겹임시표(Bbb, F## 등)가 필요한 경우만 읽기 쉽게 플랫 이름으로 바꿔 적는다.

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const LETTER_PC = [0, 2, 4, 5, 7, 9, 11]
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
// 장음계 도수(1~7)의 반음 수
const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11]

export function pitchClass(note: string): number {
  const letter = LETTERS.indexOf(note[0])
  if (letter < 0) return 0
  let pc = LETTER_PC[letter]
  for (const ch of note.slice(1)) {
    if (ch === '#') pc += 1
    else if (ch === 'b') pc -= 1
  }
  return ((pc % 12) + 12) % 12
}

/** "b3", "#4", "7" 같은 도수 표기 → 루트에서의 반음 수 */
export function degreeSemitones(degree: string): number {
  const m = degree.match(/^([b#]*)(\d+)$/)
  if (!m) return 0
  const n = (Number(m[2]) - 1) % 7
  let semis = MAJOR_STEPS[n]
  for (const ch of m[1]) semis += ch === '#' ? 1 : -1
  return ((semis % 12) + 12) % 12
}

/** 루트와 도수로 음 이름을 적는다. 예: ('B', '3') → 'D#', ('F', 'b7') → 'Eb' */
export function spellDegree(root: string, degree: string): string {
  const m = degree.match(/^([b#]*)(\d+)$/)
  const rootLetter = LETTERS.indexOf(root[0])
  if (!m || rootLetter < 0) return root

  const letter = (rootLetter + Number(m[2]) - 1) % 7
  const targetPc = (pitchClass(root) + degreeSemitones(degree)) % 12
  // 글자의 제자리음에서 목표 음까지의 차이를 -6..5 범위로
  let diff = (targetPc - LETTER_PC[letter] + 12) % 12
  if (diff > 6) diff -= 12

  if (Math.abs(diff) > 1) return FLAT_NAMES[targetPc]
  return LETTERS[letter] + (diff === 1 ? '#' : diff === -1 ? 'b' : '')
}

/** 스케일·코드의 도수 공식("1 2 b3 4 5 6 b7")으로 구성음을 적는다 */
export function spellFormula(root: string, formula: string): string[] {
  return formula.trim().split(/\s+/).map((d) => spellDegree(root, d))
}
