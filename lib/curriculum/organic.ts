import {
  BackingTrack,
  Leaf,
  Principle,
  Tip,
  Trunk,
  TrunkSlug,
} from './types'
import { topics } from './data'

// ─── Trunks ─────────────────────────────────────────────────────────────────
export const trunks: Trunk[] = [
  {
    id: 'tk1',
    slug: 'foundation',
    order: 1,
    emoji: '🎯',
    color: '#f59e0b',
    title: {
      ko: '기초 다지기',
      en: 'Foundation',
      ja: '基礎固め',
    },
    description: {
      ko: '7th 코드, 메이저 스케일, 지판 파악. 모든 재즈 연주의 출발점.',
      en: '7th chords, major scales, fretboard mapping — the starting point.',
      ja: '7thコード、メジャースケール、指板の把握。すべての出発点。',
    },
    leafIds: ['lf-fd-1', 'lf-fd-2', 'lf-fd-3'],
  },
  {
    id: 'tk2',
    slug: 'blues',
    order: 2,
    emoji: '🎵',
    color: '#3b82f6',
    title: { ko: '재즈 블루스', en: 'Jazz Blues', ja: 'ジャズ・ブルース' },
    description: {
      ko: '12바 블루스 위에서 자유롭게 솔로. 모든 재즈 즉흥의 토대.',
      en: 'Solo freely over the 12-bar blues — the foundation of jazz improvisation.',
      ja: '12小節ブルースの上で自由にソロ。ジャズ即興の土台。',
    },
    leafIds: [
      'lf-bl-1',
      'lf-bl-2',
      'lf-bl-3',
      'lf-bl-4',
      'lf-bl-5',
      'lf-bl-6',
    ],
  },
  {
    id: 'tk3',
    slug: 'harmony-comping',
    order: 3,
    emoji: '🎼',
    color: '#8b5cf6',
    title: { ko: '하모니 · 컴핑', en: 'Harmony & Comping', ja: 'ハーモニー・コンピング' },
    description: {
      ko: '가이드톤, drop2 보이싱, ii-V-I로 누군가의 솔로를 받쳐주기.',
      en: 'Guide tones, drop-2 voicings, ii-V-I — support someone else’s solo.',
      ja: 'ガイドトーン、drop2、ii-V-Iで誰かのソロを支える。',
    },
    leafIds: ['lf-hc-1', 'lf-hc-2'],
  },
  {
    id: 'tk4',
    slug: 'soloing',
    order: 4,
    emoji: '🎶',
    color: '#10b981',
    title: { ko: '솔로 어법', en: 'Soloing Vocabulary', ja: 'ソロのボキャブラリー' },
    description: {
      ko: '코드톤, 인클로저, ii-V-I 릭. 박자에 맞춰 말하기.',
      en: 'Chord tones, enclosures, ii-V-I licks — speaking in time.',
      ja: 'コードトーン、エンクロージャー、ii-V-Iリック。',
    },
    leafIds: ['lf-so-1', 'lf-so-2', 'lf-so-3'],
  },
  {
    id: 'tk5',
    slug: 'ear-training',
    order: 5,
    emoji: '🎻',
    color: '#ec4899',
    title: { ko: '청음', en: 'Ear Training', ja: '耳トレ' },
    description: {
      ko: '듣고 따라하기. 곡을 머리가 아닌 귀로 외운다.',
      en: 'Hear it, copy it — learn songs with your ears, not your head.',
      ja: '聴いて真似る。曲を頭でなく耳で覚える。',
    },
    leafIds: ['lf-et-1', 'lf-et-2'],
  },
  {
    id: 'tk6',
    slug: 'standards',
    order: 6,
    emoji: '🎺',
    color: '#14b8a6',
    title: { ko: '스탠다드', en: 'Standards', ja: 'スタンダード' },
    description: {
      ko: 'Autumn Leaves부터. 곡 한 곡씩 내 것으로.',
      en: 'Starting with Autumn Leaves — make each tune your own.',
      ja: 'Autumn Leavesから。一曲ずつ自分のものに。',
    },
    leafIds: ['lf-st-1', 'lf-st-2'],
  },
  {
    id: 'tk7',
    slug: 'artists',
    order: 7,
    emoji: '🎷',
    color: '#f43f5e',
    title: { ko: '아티스트', en: 'Artists', ja: 'アーティスト' },
    description: {
      ko: 'Kenny Burrell, Joe Pass, Pat Martino, John Scofield — 한 명씩 깊이.',
      en: 'Burrell, Pass, Martino, Scofield — go deep, one at a time.',
      ja: 'Burrell、Pass、Martino、Scofield ― 一人ずつ深く。',
    },
    leafIds: ['lf-ar-1', 'lf-ar-2'],
  },
]

// ─── Leaves ─────────────────────────────────────────────────────────────────
const ko = (s: string) => s
const same = (s: string) => ({ ko: s, en: s, ja: s })
const i18 = (k: string, e?: string, j?: string) => ({
  ko: k,
  en: e ?? k,
  ja: j ?? k,
})

export const leaves: Leaf[] = [
  // Foundation
  {
    id: 'lf-fd-1',
    slug: '7th-chords-anywhere',
    trunkSlug: 'foundation',
    order: 1,
    title: i18('12키에서 maj7/7/m7 코드 다이어그램을 친다'),
    description: i18('루트가 5번줄·6번줄 두 폼으로 12키 모두 연주.'),
    selfCheck: [
      i18('5번줄 루트 maj7/7/m7 폼 외움'),
      i18('6번줄 루트 maj7/7/m7 폼 외움'),
      i18('12키를 순환 진행으로 끊김 없이'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['seventh-chords'],
  },
  {
    id: 'lf-fd-2',
    slug: 'major-scale-positions',
    trunkSlug: 'foundation',
    order: 2,
    title: i18('메이저 스케일 5포지션을 12키로 친다'),
    description: i18('CAGED 5포지션을 박자 안에서.'),
    selfCheck: [
      i18('5포지션 모두 외움'),
      i18('BPM 80에서 끊김 없이'),
      i18('12키 중 5키 이상'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['major-scale-review'],
  },
  {
    id: 'lf-fd-3',
    slug: 'fretboard-12-tones',
    trunkSlug: 'foundation',
    order: 3,
    title: i18('지판에서 12음을 3초 안에 찾는다'),
    description: i18('어떤 음이든 6개 줄에서 위치를 즉시.'),
    selfCheck: [
      i18('각 줄에서 12음 위치 파악'),
      i18('랜덤 음 → 3초 안에 6줄 모두'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['jazz-setup'],
  },

  // Blues (6 fully fleshed)
  {
    id: 'lf-bl-1',
    slug: 'blues-1-chorus-pentatonic',
    trunkSlug: 'blues',
    order: 1,
    title: i18('F 블루스에서 펜타토닉으로 1코러스 친다'),
    description: i18(
      '12바를 끊김 없이, 박자 안에서, 마이너 펜타토닉만으로 연주.'
    ),
    selfCheck: [
      i18('백킹 트랙 위에서 12바 끝까지 연주했다'),
      i18('박자를 놓치지 않고 마디 1로 돌아왔다'),
      i18('솔로 녹음을 들어봤다'),
      i18('음 선택이 코드와 충돌하는 순간이 없다'),
    ],
    relatedTipSlugs: ['minor-pentatonic-position', 'phrase-on-3'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['blues-scale', 'blues-form'],
  },
  {
    id: 'lf-bl-2',
    slug: 'blues-mixolydian-mix',
    trunkSlug: 'blues',
    order: 2,
    title: i18('블루스에서 펜타토닉 + Mixolydian을 섞는다'),
    description: i18('각 코드(I7, IV7, V7)에 맞는 Mixolydian으로 채색.'),
    selfCheck: [
      i18('IV7에서 b7 음을 의식적으로 사용했다'),
      i18('I7과 IV7 사이에서 음 선택이 변한다'),
      i18('녹음을 듣고 어색한 음이 없다'),
    ],
    relatedTipSlugs: ['mixolydian-on-IV', 'target-chord-tones'],
    relatedBackingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100'],
    relatedPrincipleSlugs: ['mixolydian', 'blues-scale'],
  },
  {
    id: 'lf-bl-3',
    slug: 'blues-kenny-burrell-quote',
    trunkSlug: 'blues',
    order: 3,
    title: i18('Kenny Burrell의 프레이즈를 자기 솔로에 넣는다'),
    description: i18('한 프레이즈를 외워서, F 블루스 솔로 안에 자연스럽게.'),
    selfCheck: [
      i18('프레이즈를 박자에 정확히 맞춰 연주'),
      i18('같은 프레이즈를 3개 다른 위치에 넣어봤다'),
      i18('한 키 이상에서 연주 가능'),
    ],
    relatedTipSlugs: ['kenny-burrell-quote-1', 'repeat-and-vary'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['first-licks'],
  },
  {
    id: 'lf-bl-4',
    slug: 'blues-turnaround-fluent',
    trunkSlug: 'blues',
    order: 4,
    title: i18('12바의 마지막 2마디(턴어라운드)를 매끄럽게 친다'),
    description: i18('마디 11-12에서 다음 코러스로 자연스럽게 이어주기.'),
    selfCheck: [
      i18('턴어라운드 라인 1개를 외웠다'),
      i18('마디 12 끝이 마디 1로 자연스럽게'),
      i18('B♭ 블루스에서도 가능'),
    ],
    relatedTipSlugs: ['simple-turnaround'],
    relatedBackingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100'],
    relatedPrincipleSlugs: ['blues-turnaround'],
  },
  {
    id: 'lf-bl-5',
    slug: 'blues-3-keys',
    trunkSlug: 'blues',
    order: 5,
    title: i18('블루스를 3개 키(F, B♭, C)로 친다'),
    description: i18('익숙한 프레이즈를 키만 바꿔 다른 위치에서.'),
    selfCheck: [
      i18('F 블루스 1코러스'),
      i18('B♭ 블루스 1코러스'),
      i18('C 블루스 1코러스'),
      i18('세 키를 연속으로 박자 안에서'),
    ],
    relatedTipSlugs: ['start-on-different-beats'],
    relatedBackingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100', 'bt-c-blues-120'],
    relatedPrincipleSlugs: ['blues-form', 'blues-scale'],
  },
  {
    id: 'lf-bl-6',
    slug: 'blues-solo-guitar',
    trunkSlug: 'blues',
    order: 6,
    title: i18('솔로 기타로 블루스 1코러스를 친다(반주 없이)'),
    description: i18('코드 + 멜로디 동시에 — Joe Pass 식 접근의 첫 걸음.'),
    selfCheck: [
      i18('베이스 음 + 코드 + 멜로디 동시'),
      i18('박자 손실 없이 12바 완주'),
      i18('녹음에서 멜로디가 들린다'),
    ],
    relatedTipSlugs: ['blue-note-vibrato', 'swing-rhythm-feel'],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['chord-melody'],
  },

  // Harmony & comping
  {
    id: 'lf-hc-1',
    slug: 'comping-drop2-iivi',
    trunkSlug: 'harmony-comping',
    order: 1,
    title: i18('ii-V-I을 drop2 보이싱으로 12키 친다'),
    description: i18('5번줄/6번줄 루트 두 폼.'),
    selfCheck: [
      i18('5번줄 루트 ii-V-I 외움'),
      i18('6번줄 루트 ii-V-I 외움'),
      i18('12키 순환'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['drop2-voicing', 'iivi-theory'],
  },
  {
    id: 'lf-hc-2',
    slug: 'comping-guide-tones',
    trunkSlug: 'harmony-comping',
    order: 2,
    title: i18('가이드톤(3·7)으로 ii-V-I을 받쳐준다'),
    description: i18('두 음만으로 코드 진행의 색깔을 표현.'),
    selfCheck: [
      i18('각 코드의 3·7 즉시 찾기'),
      i18('스무스 보이스 리딩'),
      i18('곡 한 곡에 적용'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['guide-tones', 'tension-resolution'],
  },

  // Soloing
  {
    id: 'lf-so-1',
    slug: 'soloing-chord-tones',
    trunkSlug: 'soloing',
    order: 1,
    title: i18('각 코드의 코드톤(아르페지오)으로 솔로한다'),
    description: i18('진행 위에서 1-3-5-7로만 솔로.'),
    selfCheck: [
      i18('ii-V-I 위에서 아르페지오 연주'),
      i18('박자 안에서'),
      i18('한 곡에 적용'),
    ],
    relatedTipSlugs: ['target-chord-tones'],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['chord-tones'],
  },
  {
    id: 'lf-so-2',
    slug: 'soloing-enclosure',
    trunkSlug: 'soloing',
    order: 2,
    title: i18('인클로저로 타깃 음에 접근한다'),
    description: i18('타깃 위·아래로 둘러싸기.'),
    selfCheck: [
      i18('한 코드에서 인클로저 3개 패턴'),
      i18('ii-V-I 진행에 적용'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['enclosure'],
  },
  {
    id: 'lf-so-3',
    slug: 'soloing-iivi-lick',
    trunkSlug: 'soloing',
    order: 3,
    title: i18('ii-V-I 릭 1개를 12키로 친다'),
    description: i18('하나의 라인을 모든 키로.'),
    selfCheck: [
      i18('C키 마스터'),
      i18('5개 키'),
      i18('12키 전부'),
    ],
    relatedTipSlugs: ['repeat-and-vary'],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-licks'],
  },

  // Ear training
  {
    id: 'lf-et-1',
    slug: 'ear-bass-line',
    trunkSlug: 'ear-training',
    order: 1,
    title: i18('재즈 곡의 베이스 라인을 따라 부른다'),
    description: i18('곡 한 곡을 듣고 베이스만 카피.'),
    selfCheck: [
      i18('한 곡 베이스 라인 외움'),
      i18('기타로 따라 연주'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: [],
  },
  {
    id: 'lf-et-2',
    slug: 'ear-interval',
    trunkSlug: 'ear-training',
    order: 2,
    title: i18('주요 인터벌(3·5·7)을 듣고 식별한다'),
    description: i18('단음 두 개를 듣고 인터벌 맞히기.'),
    selfCheck: [
      i18('3도/5도/7도 식별'),
      i18('80% 정답률'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: [],
  },

  // Standards
  {
    id: 'lf-st-1',
    slug: 'standard-autumn-leaves-melody',
    trunkSlug: 'standards',
    order: 1,
    title: i18('Autumn Leaves 멜로디를 외워서 친다'),
    description: i18('악보 없이 헤드 1코러스.'),
    selfCheck: [
      i18('A 섹션 멜로디'),
      i18('B 섹션 멜로디'),
      i18('전체 1코러스'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-autumn-leaves-bm'],
    relatedPrincipleSlugs: ['autumn-leaves'],
  },
  {
    id: 'lf-st-2',
    slug: 'standard-autumn-leaves-solo',
    trunkSlug: 'standards',
    order: 2,
    title: i18('Autumn Leaves에서 1코러스 솔로한다'),
    description: i18('코드 진행을 의식하면서.'),
    selfCheck: [
      i18('박자 안에서 1코러스'),
      i18('각 코드의 코드톤 의식'),
      i18('녹음 들어봤다'),
    ],
    relatedTipSlugs: ['target-chord-tones'],
    relatedBackingTrackIds: ['bt-autumn-leaves-bm'],
    relatedPrincipleSlugs: ['autumn-leaves', 'iivi-licks'],
  },

  // Artists
  {
    id: 'lf-ar-1',
    slug: 'artist-kenny-burrell-1solo',
    trunkSlug: 'artists',
    order: 1,
    title: i18('Kenny Burrell 솔로 1코러스를 카피한다'),
    description: i18('Chitlins Con Carne 등에서 한 코러스.'),
    selfCheck: [
      i18('첫 4마디 카피'),
      i18('전체 1코러스 카피'),
      i18('자기 솔로에 인용'),
    ],
    relatedTipSlugs: ['kenny-burrell-quote-1'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: [],
  },
  {
    id: 'lf-ar-2',
    slug: 'artist-joe-pass-comp',
    trunkSlug: 'artists',
    order: 2,
    title: i18('Joe Pass 식 솔로 기타 1코러스'),
    description: i18('베이스 + 코드 + 멜로디 동시.'),
    selfCheck: [
      i18('한 곡 4마디 마스터'),
      i18('전체 1코러스'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['chord-melody'],
  },
]

// ─── Tips ───────────────────────────────────────────────────────────────────
export const tips: Tip[] = [
  {
    slug: 'minor-pentatonic-position',
    title: i18('F 마이너 펜타토닉 1포지션'),
    summary: i18('1프렛에서 시작하는 5음 박스 외우기'),
    content: {
      ko: `## F 마이너 펜타토닉

가장 먼저 외워야 할 5음 박스입니다.

**음**: F, A♭, B♭, C, E♭

**1포지션 (1프렛부터)**
- 6번줄: 1, 4프렛
- 5번줄: 1, 3프렛
- 4번줄: 1, 3프렛
- 3번줄: 1, 3프렛
- 2번줄: 1, 4프렛
- 1번줄: 1, 4프렛

**연습**: 백킹 트랙 위에서 위로 한 번, 아래로 한 번. 박자 안에서.`,
      en: `## F Minor Pentatonic\n\nFirst box to memorize.\n\n**Notes**: F, A♭, B♭, C, E♭`,
      ja: `## F マイナーペンタトニック\n\n最初に覚える5音ボックス。`,
    },
    trunkSlugs: ['blues'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'phrase-on-3',
    title: i18('프레이즈를 3도에서 끝내기'),
    summary: i18('루트가 아닌 3도에 착지하면 솔로가 살아납니다'),
    content: {
      ko: `## 3도에서 끝내기

대부분의 초보는 프레이즈를 루트로 끝냅니다. 끝이 평이해지죠.

**시도**: 다음 코드의 **3도**에 착지해보세요.
- F7 → 3도는 A
- B♭7 → 3도는 D
- C7 → 3도는 E

3도는 코드의 "색깔"을 가장 명확히 들려주는 음입니다.`,
      en: `## Land on the 3rd\n\nMost beginners end phrases on the root. Try landing on the 3rd of the next chord instead.`,
      ja: `## 3度に着地\n\nルートでなく次のコードの3度に着地。`,
    },
    trunkSlugs: ['blues', 'soloing'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'blue-note-vibrato',
    title: i18('블루노트에 비브라토'),
    summary: i18('b5에 비브라토를 걸면 블루스 향이 살아납니다'),
    content: {
      ko: `## 블루노트에 비브라토

블루스 스케일의 b5(F블루스의 경우 B음)는 짧게 스쳐도 좋고, 길게 끌면서 비브라토를 걸면 더 좋습니다.

**팁**: 한 박 이상 끌지 말 것. 너무 길면 어색합니다.`,
      en: `## Vibrato on the blue note\n\nApply vibrato to the b5 for a bluesy feel.`,
      ja: `## ブルーノートにビブラート`,
    },
    trunkSlugs: ['blues'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'mixolydian-on-IV',
    title: i18('IV7에서 Mixolydian'),
    summary: i18('B♭7 마디에서는 B♭ Mixolydian의 b7(A♭)를 의식'),
    content: {
      ko: `## IV7에서 Mixolydian

F 블루스의 IV7은 B♭7입니다. 이 마디에서는 B♭ Mixolydian:

**B♭ - C - D - E♭ - F - G - A♭**

특히 **A♭**(b7)이 중요. 이 음이 F메이저 스케일에는 없습니다. 의식적으로 사용해 보세요.`,
      en: `## Mixolydian on the IV\n\nUse the b7 (A♭ on B♭7) to color the IV chord.`,
      ja: `## IVでMixolydian`,
    },
    trunkSlugs: ['blues', 'soloing'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'kenny-burrell-quote-1',
    title: i18('Kenny Burrell 시그니처 프레이즈'),
    summary: i18('블루스 스케일 + 더블 스톱 — Kenny 사운드의 핵심'),
    content: {
      ko: `## Kenny Burrell 시그니처

Kenny Burrell의 트레이드마크는 **블루스 스케일에 더블스톱을 섞기**입니다.

**연습**: F 블루스에서 3번줄과 2번줄을 동시에 짚어 보세요. 예를 들어 5프렛 3번줄(C) + 6프렛 2번줄(F)을 슬라이드로.

조심: 너무 자주 쓰면 진부해집니다. 한 코러스에 한두 번.`,
      en: `## Kenny Burrell trademark\n\nBlues scale + double stops.`,
      ja: `## Kenny Burrellシグネチャー`,
    },
    trunkSlugs: ['blues', 'artists'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'simple-turnaround',
    title: i18('가장 간단한 턴어라운드'),
    summary: i18('I7 - VI7 - ii7 - V7 — 마디 11-12의 단골'),
    content: {
      ko: `## 간단한 턴어라운드

F 블루스 마디 11-12:
- **F7 - D7 | Gm7 - C7**

각 코드 1박씩. D7은 "세컨더리 도미넌트"로 Gm7으로 끌어주는 역할.

이 진행을 외워두면 12바 어디서든 자연스럽게 다음 코러스로 이어집니다.`,
      en: `## Simple turnaround\n\nI7 - VI7 - ii7 - V7.`,
      ja: `## 簡単なターンアラウンド`,
    },
    trunkSlugs: ['blues'],
    suggestedBackingTrackId: 'bt-f-blues-80',
  },
  {
    slug: 'swing-rhythm-feel',
    title: i18('스윙 8분음표 감각'),
    summary: i18('8분음표를 "롱-숏" 으로 — 셋잇단의 첫·셋'),
    content: {
      ko: `## 스윙 감각

재즈 8분음표는 **롱-숏**입니다. 셋잇단의 1번과 3번을 친다고 생각하세요.

**팁**: 처음에는 과장되게 롱-숏. 익숙해지면 자연스러워집니다.

빠른 템포(BPM 200+)에서는 거의 균등해집니다.`,
      en: `## Swing feel\n\nLong-short eighth notes.`,
      ja: `## スウィング感覚`,
    },
    trunkSlugs: ['blues', 'soloing'],
  },
  {
    slug: 'start-on-different-beats',
    title: i18('다른 박자에서 시작하기'),
    summary: i18('항상 1박에 시작하지 말고 2박·4박에서'),
    content: {
      ko: `## 다른 박자에서 시작

초보는 항상 마디 1, 1박에서 시작합니다. 솔로가 평이해지죠.

**시도**:
- 2박에서 시작
- 4박에서 시작 (앤티시페이션)
- 마디 12 마지막 박자에서 다음 코러스로 미리 들어가기

이게 "프레이즈가 마디를 가로지른다"의 시작입니다.`,
      en: `## Start on different beats`,
      ja: `## 違う拍から始める`,
    },
    trunkSlugs: ['blues', 'soloing'],
  },
  {
    slug: 'target-chord-tones',
    title: i18('타깃 코드톤'),
    summary: i18('다음 코드의 3·7을 미리 정해두기'),
    content: {
      ko: `## 타깃 코드톤

솔로의 핵심은 **다음 코드로의 착지**입니다.

**방법**:
1. 곡의 코드 진행을 보고 각 코드의 3·7 음을 미리 정합니다.
2. 솔로하면서 다음 코드의 3·7으로 향합니다.
3. 거기에 도달했을 때 박이 1박이면 좋고, 늦어도 1·5박에는 맞춥니다.

이것만 신경 써도 솔로의 "이야기 흐름"이 생깁니다.`,
      en: `## Target chord tones\n\nAim for the 3 or 7 of the next chord.`,
      ja: `## ターゲット・コードトーン`,
    },
    trunkSlugs: ['soloing', 'standards'],
    suggestedBackingTrackId: 'bt-iivi-c',
  },
  {
    slug: 'repeat-and-vary',
    title: i18('반복하고 변화시키기'),
    summary: i18('같은 프레이즈를 3번 반복, 4번째에 변화'),
    content: {
      ko: `## 반복 후 변화

청자가 솔로를 이해하려면 **반복**이 필요합니다.

**시도**: 짧은 프레이즈를 3번 반복. 4번째에 한 음만 바꾸기.

이것이 "모티프 디벨로프먼트"의 가장 단순한 형태입니다.`,
      en: `## Repeat and vary`,
      ja: `## 反復と変化`,
    },
    trunkSlugs: ['blues', 'soloing'],
  },
]

// ─── Backing Tracks ─────────────────────────────────────────────────────────
export const backingTracks: BackingTrack[] = [
  {
    id: 'bt-f-blues-80',
    name: i18('F 블루스 BPM 80'),
    key: 'F',
    bpm: 80,
    style: 'blues',
    bars: 12,
    loopCount: 8,
    chords: [
      { chord: 'F7', beats: 16 },
      { chord: 'Bb7', beats: 8 },
      { chord: 'F7', beats: 8 },
      { chord: 'F7', beats: 16 },
      { chord: 'Bb7', beats: 16 },
      { chord: 'F7', beats: 16 },
      { chord: 'C7', beats: 4 },
      { chord: 'Bb7', beats: 4 },
      { chord: 'F7', beats: 4 },
      { chord: 'C7', beats: 4 },
    ],
  },
  {
    id: 'bt-bb-blues-100',
    name: i18('B♭ 블루스 BPM 100'),
    key: 'Bb',
    bpm: 100,
    style: 'blues',
    bars: 12,
    loopCount: 8,
    chords: [
      { chord: 'Bb7', beats: 16 },
      { chord: 'Eb7', beats: 8 },
      { chord: 'Bb7', beats: 8 },
      { chord: 'Bb7', beats: 16 },
      { chord: 'Eb7', beats: 16 },
      { chord: 'Bb7', beats: 16 },
      { chord: 'F7', beats: 4 },
      { chord: 'Eb7', beats: 4 },
      { chord: 'Bb7', beats: 4 },
      { chord: 'F7', beats: 4 },
    ],
  },
  {
    id: 'bt-c-blues-120',
    name: i18('C 블루스 BPM 120'),
    key: 'C',
    bpm: 120,
    style: 'blues',
    bars: 12,
    loopCount: 8,
    chords: [
      { chord: 'C7', beats: 16 },
      { chord: 'F7', beats: 8 },
      { chord: 'C7', beats: 8 },
      { chord: 'C7', beats: 16 },
      { chord: 'F7', beats: 16 },
      { chord: 'C7', beats: 16 },
      { chord: 'G7', beats: 4 },
      { chord: 'F7', beats: 4 },
      { chord: 'C7', beats: 4 },
      { chord: 'G7', beats: 4 },
    ],
  },
  {
    id: 'bt-autumn-leaves-bm',
    name: i18('Autumn Leaves (Bm) BPM 100'),
    key: 'Bm',
    bpm: 100,
    style: 'standard',
    bars: 32,
    loopCount: 4,
    chords: [
      { chord: 'Cm7', beats: 4 },
      { chord: 'F7', beats: 4 },
      { chord: 'Bbmaj7', beats: 4 },
      { chord: 'Ebmaj7', beats: 4 },
      { chord: 'Am7b5', beats: 4 },
      { chord: 'D7', beats: 4 },
      { chord: 'Gm7', beats: 8 },
      { chord: 'Cm7', beats: 4 },
      { chord: 'F7', beats: 4 },
      { chord: 'Bbmaj7', beats: 4 },
      { chord: 'Ebmaj7', beats: 4 },
      { chord: 'Am7b5', beats: 4 },
      { chord: 'D7', beats: 4 },
      { chord: 'Gm7', beats: 8 },
      { chord: 'Am7b5', beats: 4 },
      { chord: 'D7', beats: 4 },
      { chord: 'Gm7', beats: 4 },
      { chord: 'Gm7', beats: 4 },
      { chord: 'Cm7', beats: 4 },
      { chord: 'F7', beats: 4 },
      { chord: 'Bbmaj7', beats: 4 },
      { chord: 'Ebmaj7', beats: 4 },
      { chord: 'Am7b5', beats: 4 },
      { chord: 'D7', beats: 4 },
      { chord: 'Gm7', beats: 8 },
    ],
  },
  {
    id: 'bt-iivi-c',
    name: i18('C장조 ii-V-I 루프 BPM 100'),
    key: 'C',
    bpm: 100,
    style: 'standard',
    bars: 8,
    loopCount: 8,
    chords: [
      { chord: 'Dm7', beats: 4 },
      { chord: 'G7', beats: 4 },
      { chord: 'Cmaj7', beats: 8 },
      { chord: 'Dm7', beats: 4 },
      { chord: 'G7', beats: 4 },
      { chord: 'Cmaj7', beats: 8 },
    ],
  },
]

// ─── Principles (carried from existing topics) ─────────────────────────────
const principleTrunkMap: Record<string, TrunkSlug[]> = {
  'jazz-setup': ['foundation'],
  'seventh-chords': ['foundation'],
  'major-scale-review': ['foundation'],
  'blues-form': ['blues'],
  'blues-scale': ['blues'],
  'mixolydian': ['blues', 'soloing'],
  'first-licks': ['blues'],
  'blues-turnaround': ['blues'],
  'guide-tones': ['harmony-comping'],
  'drop2-voicing': ['harmony-comping'],
  'iivi-theory': ['harmony-comping'],
  'tension-resolution': ['harmony-comping'],
  'altered-chord': ['harmony-comping', 'soloing'],
  'chord-tones': ['soloing'],
  'enclosure': ['soloing'],
  'dorian-tetrachord': ['soloing'],
  'iivi-licks': ['soloing'],
  'hw-dim-whole-tone': ['soloing'],
  'autumn-leaves': ['standards'],
  'chord-melody': ['standards', 'artists'],
  'sunny-solo': ['standards'],
  'improvisation': ['blues', 'soloing', 'standards'],
}

export const principles: Principle[] = topics.map((t) => ({
  slug: t.slug,
  title: t.title,
  content: t.theory.content,
  abcNotation: t.theory.abcNotation,
  trunkSlugs: principleTrunkMap[t.slug] ?? ['foundation'],
}))

// ─── Lookups ────────────────────────────────────────────────────────────────
export function getTrunkBySlug(slug: string): Trunk | undefined {
  return trunks.find((t) => t.slug === slug)
}
export function getLeafBySlug(slug: string): Leaf | undefined {
  return leaves.find((l) => l.slug === slug)
}
export function getLeavesByTrunk(slug: TrunkSlug): Leaf[] {
  return leaves.filter((l) => l.trunkSlug === slug).sort((a, b) => a.order - b.order)
}
export function getTipBySlug(slug: string): Tip | undefined {
  return tips.find((t) => t.slug === slug)
}
export function getBackingTrackById(id: string): BackingTrack | undefined {
  return backingTracks.find((t) => t.id === id)
}
export function getPrincipleBySlug(slug: string): Principle | undefined {
  return principles.find((p) => p.slug === slug)
}

// Silence unused helper warnings (kept for future use)
void ko
void same
