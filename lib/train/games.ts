// 현재 공개 중인 게임 — 머리로만 푸는 구구단 3종. 순서는 학습 순서: 도수 → 코드 → 스케일.
// 이름·설명 같은 문구는 messages/*.json 의 games.<type>.* 와 menu.* 에 있다.
// 나머지 드릴·레슨 라우트는 app/[locale]/_deprecated 에 보관 중.

export type GameType = 'degree-id' | 'chord-construction' | 'scale-construction'

export interface Game {
  type: GameType
  index: string
  /** menu.<menuKey> — 메뉴바에 쓰는 짧은 이름 */
  menuKey: 'degree' | 'chord' | 'scale'
  /** 결과 화면·출구 링크에 쓰는 영문 대형 글자 */
  short: string
  example: [string, string]
}

export const GAMES: Game[] = [
  {
    type: 'degree-id',
    index: '01',
    menuKey: 'degree',
    short: 'Degree',
    example: ['C → Eb', 'b3'],
  },
  {
    type: 'chord-construction',
    index: '02',
    menuKey: 'chord',
    short: 'Chord',
    example: ['Bb7', 'Bb D F Ab'],
  },
  {
    type: 'scale-construction',
    index: '03',
    menuKey: 'scale',
    short: 'Scale',
    example: ['F Dorian', 'F G Ab Bb C D Eb'],
  },
]

export const GAME_TYPES: string[] = GAMES.map((g) => g.type)

export function getGame(type: string): Game | undefined {
  return GAMES.find((g) => g.type === type)
}
