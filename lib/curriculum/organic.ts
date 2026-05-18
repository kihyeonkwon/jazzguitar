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
    leafIds: ['lf-fd-1', 'lf-fd-2', 'lf-fd-3', 'lf-fd-4'],
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
    leafIds: ['lf-hc-1', 'lf-hc-2', 'lf-hc-8', 'lf-hc-3', 'lf-hc-4', 'lf-hc-7', 'lf-hc-5', 'lf-hc-6'],
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
    leafIds: ['lf-so-1', 'lf-so-2', 'lf-so-3', 'lf-so-4', 'lf-so-5', 'lf-so-6', 'lf-so-7', 'lf-so-8', 'lf-so-9'],
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
    leafIds: ['lf-er-1', 'lf-er-2', 'lf-er-3', 'lf-er-4'],
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
    leafIds: ['lf-st-1', 'lf-st-2', 'lf-st-3', 'lf-st-4', 'lf-st-5'],
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
    leafIds: ['lf-ar-1', 'lf-ar-2', 'lf-ar-3', 'lf-ar-4'],
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
    slug: 'foundation-fretboard-30s',
    trunkSlug: 'foundation',
    order: 1,
    title: i18('지판 위 모든 12음을 30초 안에 찾는다'),
    description: i18('어떤 음이든 6줄 위에서 즉시 위치를 떠올리는 능력.'),
    theory: {
      content: i18(`## 지판 파악이 무엇인가

지판 파악은 6줄 위 모든 12음의 위치를 머리가 아닌 손이 기억하는 능력입니다. 재즈는 코드 변화에 즉시 반응해야 하는 음악입니다. "다음 마디는 E♭7이니까 E♭, G, B♭, D♭를 골라야지"라는 판단이 0.1초 안에 일어나야 하고, 그러려면 그 음들이 지판 어디에 있는지가 즉시 떠올라야 합니다.

기타는 같은 음이 지판 여러 곳에 존재한다는 특성이 있습니다. C 음만 해도 5번줄 3프렛, 4번줄 10프렛, 3번줄 5프렛 등 위치가 여러 개입니다. 이 모든 위치를 옥타브 관계로 외워두면, 솔로 중에 한 위치에서 막혀도 다른 위치로 즉시 이동할 수 있습니다.

\`\`\`fretboard
title: 6번줄 자연음 위치
root: E
notes: E, F, G, A, B, C, D
frets: 0-12
show-degrees: false
\`\`\`

## 어떻게 외우는가

가장 빠른 방법은 한 줄씩 12음을 순서대로 외운 다음, 무작위로 짚어 보는 것입니다. 6번줄과 5번줄이 먼저 단단해져야 합니다. 베이스 라인과 코드 루트가 모두 이 두 줄에 자리잡기 때문입니다.

옥타브 모양 두 가지를 손에 익히면 한 줄을 알 때 다른 줄도 자동으로 따라옵니다. 6번줄 음에서 두 줄 위(4번줄), 두 프렛 위로 가면 같은 음의 옥타브가 됩니다. 5번줄에서는 두 줄 위(3번줄), 두 프렛 위로 가면 됩니다.

\`\`\`fretboard
title: 5번줄 자연음 위치
root: A
notes: A, B, C, D, E, F, G
frets: 0-12
show-degrees: false
\`\`\`

## 핵심 포인트

- 6·5번줄을 가장 먼저 단단히 — 베이스/루트 자리입니다
- 옥타브 모양 두 가지(6→4, 5→3)를 손에 익힙니다
- 한 음을 무작위로 골라 30초 안에 짚어 봅니다
- 한 줄씩 정복합니다 — 한 번에 모두 외우려 하지 않습니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('6번줄 12음 순서대로'),
          description: i18('6번줄을 0~12프렛까지 음 이름을 소리내며 짚어 올라갑니다. 한 음에 1초.'),
          bpm: 60,
        },
        {
          title: i18('무작위 음 찾기 드릴'),
          description: i18('한 음(예: E♭)을 정하고 6줄 위에서 가능한 모든 위치를 30초 안에 짚습니다.'),
        },
        {
          title: i18('옥타브 짝 짚기'),
          description: i18('6번줄에서 한 음을 짚고, 같은 음을 4번줄에서 즉시 짚습니다. 12음 모두 반복.'),
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('6번줄에서 12음을 한 번씩 짚어 올라갑니다'),
          i18('5번줄에서 12음을 한 번씩 짚어 올라갑니다'),
          i18('옥타브 모양 두 가지(6→4, 5→3)를 손에 익혔습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('6번줄에서 임의의 음을 30초 내 정확히 찾습니다'),
          i18('5번줄에서 임의의 음을 30초 내 정확히 찾습니다'),
          i18('한 음의 6줄 위 모든 위치를 1분 내 짚습니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('샵/플랫 키 음(F♯, B♭ 등)도 즉시 떠올립니다'),
          i18('옥타브 패턴을 의식하지 않고 동시 사용합니다'),
          i18('한 코드의 3·7 위치를 모든 줄에서 안전하게 찾습니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('지판 어떤 음이든 0.5초 내 위치를 떠올립니다'),
          i18('새 코드를 들으면 그 코드톤 4개의 가장 가까운 위치를 즉시 짚습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('6번줄에서 12음을 30초 내 정확히 찾는다'),
      i18('5번줄에서 12음을 30초 내 정확히 찾는다'),
      i18('모든 줄에서 한 음(예: C)의 모든 위치를 1분 내'),
      i18('옥타브 패턴(같은 음의 다른 위치)을 즉시 떠올린다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['jazz-setup'],
  },
  {
    id: 'lf-fd-2',
    slug: 'foundation-7th-chord-gugudan',
    trunkSlug: 'foundation',
    order: 2,
    title: i18('주요 7th 코드의 구성음을 즉시 떠올린다'),
    description: i18('5가지 7th 퀄리티 × 12 루트 = 60개 코드를 머릿속에서 즉시.'),
    theory: {
      content: i18(`## 7th 코드 구구단이 무엇인가

재즈에서 가장 흔히 쓰이는 7th 코드는 다섯 가지입니다. **Maj7**(메이저 7도), **m7**(마이너 7도), **7**(도미넌트 7도), **m7♭5**(하프 디미니쉬드), **dim7**(풀 디미니쉬드)입니다. 이 5가지 퀄리티에 12 루트를 곱하면 60개 코드가 됩니다. "Cmaj7은 C-E-G-B" 처럼 코드 심볼을 보면 즉시 4개 구성음이 떠오르도록 만드는 것을 "7th 구구단"이라고 부릅니다.

이 구구단이 단단해야 컴핑·보이싱·솔로가 모두 가능해집니다. 코드 심볼을 보고 0.5초 안에 4음이 떠오르면 다음 단계로 갈 수 있습니다. 그 전에는 어떤 보이싱을 외워도 결국 모양만 익히게 됩니다.

## 5가지 퀄리티의 구조

각 퀄리티는 루트 위에 쌓는 3도/5도/7도 간격이 다릅니다.

- **Maj7**: 1 · 3 · 5 · 7 (예: C-E-G-B)
- **m7**: 1 · ♭3 · 5 · ♭7 (예: C-E♭-G-B♭)
- **7**: 1 · 3 · 5 · ♭7 (예: C-E-G-B♭)
- **m7♭5**: 1 · ♭3 · ♭5 · ♭7 (예: C-E♭-G♭-B♭)
- **dim7**: 1 · ♭3 · ♭5 · 𝄫7 (예: C-E♭-G♭-A)

\`\`\`chord
chord: Cmaj7
caption: 1-3-5-7 = C E G B
\`\`\`

\`\`\`chord
chord: Cm7
caption: 1-♭3-5-♭7 = C E♭ G B♭
\`\`\`

## 어떻게 외우는가

먼저 트라이어드(3음)부터 시작합니다. C 메이저 트라이어드는 C-E-G, A 마이너 트라이어드는 A-C-E. 12 루트를 메이저/마이너로 한 바퀴 돌리면 트라이어드 구구단이 됩니다. 그 다음에 각 트라이어드에 7도(메이저 7도 또는 ♭7도)를 추가하면 7th 코드가 됩니다.

처음에는 입으로 소리내어 부르고, 익숙해지면 머릿속으로만 부르면서 시간을 잽니다. 트라이어드 90초, 7th 2분이 합격선입니다.

## 핵심 포인트

- 5가지 퀄리티: Maj7 / m7 / 7 / m7♭5 / dim7
- 트라이어드 → 7th 순으로 단계적으로 확장합니다
- 입으로 소리내어 부르며 시간을 잽니다
- 0.5초 내 4음이 떠오르기가 다음 단계의 전제 조건입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Triad 구구단 (메이저/마이너)'),
          description: i18('C부터 4도 사이클로 12 루트를 돌면서 메이저 트라이어드 → 마이너 트라이어드 순으로 구성음을 부릅니다.'),
        },
        {
          title: i18('7th 구구단 (5 퀄리티)'),
          description: i18('한 루트에서 5가지 7th 코드를 차례로 부릅니다. 예: C, Cmaj7, Cm7, C7, Cm7♭5, Cdim7. 12 루트 반복.'),
        },
        {
          title: i18('무작위 코드 호명 드릴'),
          description: i18('상대(또는 메모지)가 무작위로 코드명을 부르면 1초 안에 구성음을 답합니다.'),
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('5가지 7th 퀄리티의 인터벌 구조를 정확히 압니다'),
          i18('C 루트로 5 퀄리티 모두 구성음을 부릅니다'),
          i18('메이저/마이너 트라이어드 구구단을 5분 내 완주합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('트라이어드 구구단 12 루트 90초 내'),
          i18('한 퀄리티(예: 7)로 12 루트 90초 내'),
          i18('5 퀄리티 × 12 루트 모두 2분 내 완주'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('무작위 호명에 1초 내 구성음을 답합니다'),
          i18('각 코드의 3·7만 따로 추출해 부릅니다(가이드톤)'),
          i18('m7♭5와 dim7을 헷갈리지 않습니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('스탠다드 한 곡의 모든 코드를 보면서 즉시 코드톤을 떠올립니다'),
          i18('9·11·13 텐션까지 머릿속에서 즉시 더해 부를 수 있습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('Maj7 / m7 / 7 / m7b5 / dim7 각 5종의 구성음을 안다'),
      i18('12 루트 × 5 퀄리티 60 코드를 2분 내에 부른다'),
      i18('Triad 구구단 90초 내 통과'),
      i18('7th 구구단 2분 내 통과'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['seventh-chords'],
  },
  {
    id: 'lf-fd-3',
    slug: 'foundation-metronome-eighths',
    trunkSlug: 'foundation',
    order: 3,
    title: i18('메트로놈 80에서 8분음표를 깔끔하게 친다'),
    description: i18('박자에 정확히 맞춰 연주하는 기본 감각.'),
    theory: {
      content: i18(`## 박자가 모든 것이다

재즈에서 박자는 멜로디보다 먼저 옵니다. 아무리 좋은 라인이라도 박자가 흔들리면 듣기 어렵고, 평범한 라인도 박자가 단단하면 음악적으로 들립니다. 그래서 모든 연습의 출발점은 메트로놈입니다.

재즈만의 특이한 점은 **메트로놈을 2박·4박에 놓는다**는 것입니다. 일반 팝/록에서는 1·3박이 강박이지만 재즈는 반대로 2·4박을 강조합니다. 메트로놈 한 박을 2박으로 듣고, 그 사이를 4박으로 채우는 식으로 연습하면 재즈 그루브 감각이 자연스럽게 몸에 들어옵니다.

## 스윙 8분음표는 어떻게 들리는가

8분음표는 단순한 균등 8분이 아니라 살짝 롱-숏 비율의 **스윙 8분**으로 연주합니다. 셋잇단의 1번과 3번을 친다고 생각하면 됩니다.

\`\`\`abc
X:1
T:Swing eighths on one note
M:4/4
L:1/8
Q:1/4=80
K:C
|: G2 G2 G2 G2 | G2 G2 G2 G2 :|
\`\`\`

위 보표는 균등 8분으로 적혀 있지만, 재즈에서는 자동으로 스윙으로 해석합니다. ABC 노테이션의 한계라 표기는 균등이지만 연주는 롱-숏입니다.

## 어떻게 연습하는가

처음에는 BPM 60에서 4분음표만으로 끊김 없이 연주합니다. 한 음만 반복해도 좋습니다. 익숙해지면 8분음표로 올리고, BPM 80을 목표로 합니다. 빠른 템포(BPM 200 이상)에서는 롱-숏이 거의 균등해집니다. 처음에는 과장되게 롱-숏으로 시작하고, 빠른 템포에서 자연스럽게 균등에 가까워지게 두면 됩니다.

## 핵심 포인트

- 메트로놈은 2·4박에 둡니다 (재즈 표준)
- 4분음표 → 8분음표 → 스윙 8분음표 순으로 단계적
- BPM 60 안정 → 80 → 100 → 120 으로 올립니다
- 박자가 흔들리면 BPM을 낮춰 다시 시작합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('BPM 60 4분음표'),
          description: i18('메트로놈 BPM 60에 한 음만으로 4분음표를 1분 끊김 없이 연주합니다. 매 박이 클릭과 동시.'),
          bpm: 60,
        },
        {
          title: i18('BPM 80 스윙 8분음표'),
          description: i18('메트로놈을 2·4박에 놓고 8분음표를 롱-숏으로 1분 끊김 없이.'),
          bpm: 80,
        },
        {
          title: i18('백킹 위 박자 잡기'),
          description: i18('F 블루스 백킹 위에서 한 음만으로 12바를 박자에 정확히 떨어뜨립니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('BPM 60에서 4분음표를 1분 끊김 없이 연주합니다'),
          i18('BPM 80에서 8분음표를 1분 끊김 없이 연주합니다'),
          i18('메트로놈 클릭과 음이 정확히 동기됩니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('메트로놈을 2·4박에 놓고 연주합니다'),
          i18('스윙 8분음표를 롱-숏 비율로 연주합니다'),
          i18('백킹 트랙 위에서 박자를 놓치지 않습니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('BPM 100~120에서도 같은 정확도를 유지합니다'),
          i18('한 박 안에서 의도적으로 비트 앞/뒤에 음을 두는 컨트롤이 가능합니다'),
          i18('녹음에서 박자가 단단하게 들립니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('BPM 200에서도 스윙 8분이 자연스럽게 균등에 가까워집니다'),
          i18('메트로놈 없이 연주해도 박자가 흔들리지 않습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('BPM 60에서 4분음표를 1분 끊김 없이'),
      i18('BPM 80에서 8분음표를 1분 끊김 없이'),
      i18('메트로놈을 2·4박에 놓고 연주(재즈 표준)'),
      i18('백킹 트랙 위에서 박자를 놓치지 않는다'),
    ],
    relatedTipSlugs: ['swing-rhythm-feel'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['jazz-setup'],
  },
  {
    id: 'lf-fd-4',
    slug: 'foundation-major-scale-5-positions',
    trunkSlug: 'foundation',
    order: 4,
    title: i18('C 메이저 스케일을 지판 5개 포지션에서 친다'),
    description: i18('CAGED 5포지션을 위·아래로, 박자 안에서.'),
    theory: {
      content: i18(`## CAGED 5포지션이 무엇인가

CAGED는 메이저 코드의 5가지 모양(C, A, G, E, D)에서 따온 이름으로, 지판 전체를 5개 박스로 나눠 외우는 방식입니다. 한 키의 메이저 스케일을 이 5포지션으로 외우면 지판 어디에서든 그 키의 음을 즉시 찾을 수 있습니다.

각 포지션은 4프렛 정도의 범위 안에 7개 다이아토닉 음을 모두 포함합니다. 한 포지션을 위·아래로 자유롭게 연주하면 한 박스를 마스터한 것입니다. 5포지션이 서로 한두 프렛씩 겹치면서 지판 전체를 덮습니다.

\`\`\`fretboard
title: C Major Scale · E-shape 포지션
root: C
notes: C, D, E, F, G, A, B
frets: 7-11
\`\`\`

위는 8프렛 근처의 E-shape 박스입니다. 6번줄 8프렛(C)을 루트로 잡고, 그 주변 4프렛 범위 안의 모든 C 메이저 음이 표시됩니다.

## 어떻게 들리는가

한 포지션 안에서 스케일을 위로 한 번, 아래로 한 번 연주해보면 아래와 같이 흐릅니다.

\`\`\`abc
X:1
T:C Major scale · one octave
M:4/4
L:1/8
Q:1/4=80
K:C
|: C D E F G A B c | c B A G F E D C :|
\`\`\`

## 어떻게 연습하는가

처음에는 한 포지션에 집중합니다. 5번줄 3프렛 C부터 시작하는 박스를 BPM 80에서 위·아래로 끊김 없이 연주합니다. 그 다음 6번줄 8프렛 C에서 시작하는 박스로 이동합니다. 5포지션을 모두 익힌 다음 키를 바꿔(G·F) 같은 모양을 다른 프렛에서 적용합니다.

솔로 중에 한 박스에서 막히면 다른 박스로 즉시 이동할 수 있게 만드는 것이 목표입니다. 박스 사이의 연결점(같은 음이 두 박스에 동시에 존재하는 자리)을 의식하면 자연스럽게 이동할 수 있습니다.

## 핵심 포인트

- CAGED = 메이저 코드 5 모양에서 따온 5 포지션
- 한 포지션 마스터 → 5 포지션 → 키 이동 순서로 확장합니다
- 포지션 사이 연결점을 의식하면 자유롭게 이동합니다
- 솔로 중에 한 박스에서 막혀도 다른 박스로 즉시 갈 수 있어야 합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('1포지션 오르내림'),
          description: i18('C 메이저 1포지션을 위로 한 번, 아래로 한 번 연주합니다. 박자 안에서 균일하게.'),
          bpm: 80,
        },
        {
          title: i18('5포지션 연결'),
          description: i18('C 메이저 5포지션을 차례로 옮겨가며 같은 운지로 한 옥타브 단위로 연결합니다.'),
          bpm: 80,
        },
        {
          title: i18('키 이동 (G, F)'),
          description: i18('같은 5포지션을 G장조와 F장조로 옮겨 연주합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('1포지션(open)을 위로/아래로 끊김 없이 연주합니다'),
          i18('5포지션 중 2개를 외웠습니다'),
          i18('박자 안에서 음 길이가 균일합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('5포지션 모두 위로/아래로 BPM 80에서 끊김 없이'),
          i18('C 외 다른 키(G, F)로 이동 가능'),
          i18('메트로놈 100에서 1분간 끊김 없이'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('포지션 사이 연결점을 의식하며 자연스럽게 이동'),
          i18('한 포지션 안에서 3음·4음 단위 시퀀스를 연주'),
          i18('12 키 중 5 키 이상에서 자유롭게 연주'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('12 키 모두에서 5포지션을 즉시 사용합니다'),
          i18('솔로 중에 한 박스에서 다른 박스로 의식하지 않고 이동합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('1포지션(open)을 위로/아래로 친다'),
      i18('5포지션 모두 위로/아래로 BPM 80'),
      i18('C 외 다른 키(G, F)로 이동'),
      i18('메트로놈 100에서 1분간 끊김 없이'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['major-scale-review'],
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
    theory: {
      content: i18(`## 마이너 펜타토닉이 무엇인가

마이너 펜타토닉 스케일은 다섯 개의 음으로 이루어진 가장 보편적인 솔로 도구입니다. F 키 기준 음은 **F, A♭, B♭, C, E♭** 다섯 개로, 일반적인 7음 스케일에서 코드 변화와 충돌하기 쉬운 두 음(2도와 6도)을 빼낸 형태입니다.

이 스케일이 블루스에 특별히 잘 맞는 이유는 빠진 두 음 덕분에 어떤 코드 위에서도 어색해지지 않기 때문입니다. F 블루스에서 사용되는 세 코드 — F7, B♭7, C7 — 위에서 큰 충돌 없이 자유롭게 사용할 수 있습니다.

## 지판 위 5개 포지션

같은 다섯 음이 지판 전체에 걸쳐 다섯 개의 박스 모양으로 반복됩니다. 처음에는 1포지션 하나만 외워도 충분하지만, 결국 다섯 포지션 모두를 자유롭게 오갈 수 있게 됩니다.

\`\`\`fretboard
title: F Minor Pentatonic
root: F
notes: F, Ab, Bb, C, Eb
positions: 1-5, 3-7, 5-9, 8-12, 10-14
position-labels: 1포지션, 2포지션, 3포지션, 4포지션, 5포지션
\`\`\`

좌우 화살표나 점을 눌러 5개 포지션을 차례로 볼 수 있습니다. 검은 점이 루트 F이고, 흰 점들이 나머지 음입니다. 도수로 표시되어 있어서 음정 관계가 한눈에 보입니다.

\`\`\`callout
type: tip
title: 외우는 순서

먼저 1포지션 하나를 박자 안에서 자유롭게 칠 수 있을 때까지 연습합니다.
그 다음에 다른 포지션으로 넘어가는 편이 진도가 빠릅니다.
\`\`\`

## 스케일이 어떻게 들리는가

스케일을 위로 한 번, 아래로 한 번 연주해보면 다음과 같은 소리가 됩니다.

\`\`\`abc
X:1
T:F Minor Pentatonic
M:4/4
L:1/8
Q:1/4=80
K:F
|: F _A _B c _e f _e c | f _e c _B _A F F2 :|
\`\`\`

이 흐름이 익숙해지면, 박자 안에서 음을 자유롭게 배치하는 단계로 넘어가게 됩니다. 처음에는 음의 *개수*보다 음의 *타이밍*에 집중하는 편이 좋습니다. 음을 적게 쓸수록 솔로가 더 음악적으로 들립니다.

## 블루스 진행 안에서 사용하기

F 블루스의 첫 코드는 F7입니다. F7 위에서 펜타토닉을 칠 때 가장 안전한 음은 **루트(F)**, **3도(A♮)**, **5도(C)**, **♭7도(E♭)** 입니다. 펜타토닉 5음 중 4음이 이미 F7의 코드톤이라서 거의 모든 음이 자연스럽게 들립니다.

\`\`\`chord
chord: F7
caption: 1코러스의 출발 코드
\`\`\`

\`\`\`quiz
question: F 마이너 펜타토닉(F, A♭, B♭, C, E♭) 중 F7의 코드톤이 *아닌* 음은?
choices: F, A♭, B♭, C
correct: A♭
hint: F7의 3도는 A♮(자연 라)입니다. A♭은 마이너 펜타토닉의 ♭3로, 블루스 색채를 더해주는 텐션음입니다.
\`\`\`

코드가 바뀌는 마디 1박마다 코드톤 중 하나로 떨어뜨리려고 의식하면, 같은 펜타토닉 음형이 갑자기 훨씬 음악적으로 들립니다.

## 도착 음을 선택하는 두 가지 접근

\`\`\`two-column
--- left
header: 안전한 도착
- 루트(F)에 떨어뜨리기 — 가장 명확
- 5도(C)에 떨어뜨리기 — 안정적
- 음악적으로 항상 작동합니다
--- right
header: 흥미로운 도착
- ♭3도(A♭)로 블루 노트 색
- ♭7도(E♭) — 도미넌트 색채
- B♭7로 갈 때 미리 떨어뜨리면 부드럽게 이어집니다
\`\`\`

처음에는 왼쪽부터, 익숙해지면 오른쪽 음들도 시도해보면 됩니다.

## 핵심 포인트

- F 마이너 펜타토닉의 다섯 음: **F · A♭ · B♭ · C · E♭**
- 지판 전체에 5개 박스 포지션이 반복됨
- 박자에서 벗어나지 않는 것이 첫 번째 목표
- 음을 적게 쓸수록 더 음악적으로 들립니다
- 코드 변화 1박에 코드톤으로 떨어뜨리면 같은 음형이 다르게 들립니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('1포지션 펜타토닉 오르내림'),
          description: i18('1프렛부터 시작하는 박스를 위로 한 번, 아래로 한 번. 박자 안에서 균일하게 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('백킹 위 1코러스 솔로'),
          description: i18('F 블루스 백킹 위에서 12바를 끝까지 연주합니다. 코드 변화는 의식하지 않아도 됩니다. 박자 우선.'),
          bpm: 80,
        },
        {
          title: i18('코드 변화에 음을 떨어뜨리기'),
          description: i18('각 코드 첫 박에 펜타토닉 음 중 그 코드의 코드톤이 되는 음으로 자연스럽게 도착하도록 연습합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('1포지션 펜타토닉을 한 번 위로/아래로 끊김 없이 연주합니다'),
          i18('백킹 트랙 위에서 12바를 끝까지 연주합니다'),
          i18('음 선택이 코드와 명백히 충돌하는 순간이 없습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('박자를 놓치지 않고 12바 끝에서 마디 1로 돌아옵니다'),
          i18('자신의 솔로를 한 번 녹음해서 들어봤습니다'),
          i18('각 코드 첫 박에 음을 의식적으로 떨어뜨립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('블루 노트(♭5)를 한 코러스 안에서 의도적으로 사용합니다'),
          i18('한 모티프를 두 번 이상 반복·변주합니다'),
          i18('다른 키(B♭ 또는 C)에서도 같은 포지션으로 연주합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('12키 모두에서 1포지션 위치를 즉시 떠올립니다'),
          i18('Kenny Burrell이나 다른 마스터의 짧은 인용을 자기 솔로에 자연스럽게 끼워넣습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('백킹 트랙 위에서 12바 끝까지 연주했다'),
      i18('박자를 놓치지 않고 마디 1로 돌아왔다'),
      i18('솔로 녹음을 들어봤다'),
      i18('음 선택이 코드와 충돌하는 순간이 없다'),
    ],
    relatedTipSlugs: ['minor-pentatonic-position', 'phrase-on-3'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['blues-scale', 'blues-form'],

    // ── Mission Runner ──
    mission: i18('F 블루스에서 마이너 펜타토닉만으로 한 코러스 완주하기'),
    licks: [
      {
        id: 'lk-bl-1-pentatonic-down',
        leafSlug: 'blues-1-chorus-pentatonic',
        bars: 2,
        context: i18('F 블루스 어디서나 (F7/Bb7/C7)'),
        abcNotation: 'X:1\nT:F minor pentatonic descending\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: f _e c _B A F2 z | F _A c _e f4 :|',
        source: i18('교본 스타일 · 하행 + 상행 페어'),
      },
      {
        id: 'lk-bl-1-blue-note',
        leafSlug: 'blues-1-chorus-pentatonic',
        bars: 2,
        context: i18('F7 마디에서 강조용 (블루 노트 B 사용)'),
        abcNotation: 'X:1\nT:Blue note bend phrase\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: c2 _B =B c2 _A F | F _E F z F4 :|',
        source: i18('교본 스타일 · 블루 노트 ♭5 강조'),
      },
      {
        id: 'lk-bl-1-turnaround',
        leafSlug: 'blues-1-chorus-pentatonic',
        bars: 2,
        context: i18('블루스 마지막 2마디 (마디 11-12) 턴어라운드'),
        abcNotation: 'X:1\nT:Pentatonic turnaround\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: F _A c _e f _e c _A | F _E F C F4 :|',
        source: i18('교본 스타일 · I7 → V7 해결'),
      },
    ],
    quickDrill: {
      kind: 'scale-notes',
      params: { scale: 'minor pentatonic', root: 'F' },
      questionCount: 5,
      passingScore: 80,
    },
  },
  {
    id: 'lf-bl-2',
    slug: 'blues-mixolydian-mix',
    trunkSlug: 'blues',
    order: 2,
    title: i18('블루스에서 펜타토닉 + Mixolydian을 섞는다'),
    description: i18('각 코드(I7, IV7, V7)에 맞는 Mixolydian으로 채색.'),
    theory: {
      content: i18(`## Mixolydian이 무엇인가

Mixolydian 스케일은 메이저 스케일에서 7도를 반음 내린 형태로, 7번째 음이 ♭7이 되는 7음 스케일입니다. F Mixolydian이라면 **F, G, A, B♭, C, D, E♭** 이 됩니다. 이름이 어렵게 들리지만, 결국 도미넌트 7th 코드(F7)와 가장 잘 맞는 스케일이라고 이해하면 됩니다.

블루스의 세 코드 F7, B♭7, C7은 모두 도미넌트 7th입니다. 그래서 각 마디마다 그 코드에 해당하는 Mixolydian으로 음을 골라주면, 코드 변화가 솔로에서 자연스럽게 들립니다.

\`\`\`fretboard
title: F Mixolydian · 1포지션
root: F
notes: F, G, A, Bb, C, D, Eb
frets: 1-5
\`\`\`

## 어떻게 들리는가

스케일을 한 옥타브 위로 한 번, 아래로 한 번 연주해보면 다음과 같이 흐릅니다.

\`\`\`abc
X:1
T:F Mixolydian one octave
M:4/4
L:1/8
Q:1/4=80
K:F
|: F G A _B c d _e f | f _e d c _B A G F :|
\`\`\`

## 블루스에서 어떻게 쓰이는가

펜타토닉 한 박스로만 솔로하면 모든 코드에 무난하지만 표정이 단조롭습니다. 여기에 Mixolydian의 메이저 3도와 다이아토닉 음을 섞으면 색깔이 살아납니다.

특히 IV7(B♭7)으로 넘어갈 때 B♭ Mixolydian의 A♭(♭7)을 의식적으로 짚으면, F 펜타토닉에는 없는 음이 들어가서 코드 변화가 분명히 드러납니다.

\`\`\`chord
chord: Bb7
caption: IV7 마디 · A♭이 ♭7 음
\`\`\`

처음에는 두 스케일을 동시에 외우기 어렵습니다. 펜타토닉 박스를 기준으로 두고, "F7 마디에서는 펜타토닉에 A를 더한다", "B♭7 마디에서는 A를 A♭로 바꾼다" 식으로 한 음씩 추가하는 것이 안전합니다.

## 핵심 포인트

- Mixolydian = 메이저 스케일의 ♭7 버전 (도미넌트 7th와 짝)
- F7 마디 → F Mixolydian / B♭7 마디 → B♭ Mixolydian
- 핵심은 메이저 3도와 ♭7의 조합입니다
- 코드 변화에서 한 음만 바꿔도 음악적 표정이 살아납니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('F Mixolydian 한 옥타브 오르내림'),
          description: i18('6번줄 1프렛 F부터 시작해 F-G-A-B♭-C-D-E♭-F까지 한 옥타브를 위·아래로 부드럽게 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('IV7 마디에 A♭ 떨어뜨리기'),
          description: i18('F 블루스 백킹 위에서 B♭7 마디에 진입할 때 A를 A♭로 바꿔 짚습니다. 그 한 음이 코드 변화를 분명히 들려줍니다.'),
          bpm: 80,
        },
        {
          title: i18('펜타토닉 + 3도 추가'),
          description: i18('F 펜타토닉을 기본으로 두고 메이저 3도(A)를 의도적으로 1-2번 끼워넣어 메이저/마이너 사이의 블루스 톤을 만들어 봅니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('F Mixolydian과 B♭ Mixolydian을 각각 한 옥타브 연주합니다'),
          i18('IV7 마디에서 A♭(♭7) 음을 한 번이라도 사용합니다'),
          i18('펜타토닉만 쓸 때와 비교해 솔로의 색깔이 변하는 것을 들립니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('I7과 IV7 마디에서 음 선택이 명확히 달라집니다'),
          i18('녹음을 들어봤을 때 어색한 음이 없습니다'),
          i18('V7(C7) 마디에서 C Mixolydian으로 짧은 프레이즈를 만듭니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('코드 변화 한 박 앞에서 다음 Mixolydian의 음으로 옮겨갑니다'),
          i18('Mixolydian의 메이저 3도와 펜타토닉의 ♭3을 의도적으로 부딪쳐 블루지한 표정을 만듭니다'),
          i18('B♭ 블루스에서도 같은 접근으로 1코러스 연주합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('12 키 어디서든 그 키 Mixolydian 위치를 즉시 떠올립니다'),
          i18('솔로 안에서 펜타토닉과 Mixolydian을 의식하지 않고 자연스럽게 오갑니다'),
        ],
      },
    ],
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
    theory: {
      content: i18(`## 프레이즈 인용이 무엇인가

재즈 솔로의 어휘는 결국 외운 프레이즈에서 시작됩니다. 한 시대를 정의한 연주자 스타일의 짧은 라인을 하나 외워두면, 자신의 솔로 안에서 "이 사람이 어떻게 음을 골랐는지"를 직접 체화할 수 있습니다. 이 잎에서는 Kenny Burrell 스타일의 블루스 어휘 — 마이너 펜타토닉에 블루 노트(♭5)를 살짝 섞고, 더블스톱을 가미하는 — 를 따라 짧은 프레이즈를 한 개 외워서 자신의 솔로에 자연스럽게 끼워넣는 것이 목표입니다.

중요한 건 프레이즈를 100% 복제하는 것이 아니라, 그 라인의 **리듬과 음 선택을 박자 안에 정확히 얹는 것**입니다. 같은 프레이즈를 1박, 3박 등 다른 자리에서 시작해 보면 같은 라인이 전혀 다른 느낌으로 들리는 것을 알 수 있습니다.

\`\`\`abc
X:1
T:Blues phrase with ♭5 blue note
M:4/4
L:1/8
Q:1/4=80
K:F
|: c2 _B =B c2 _A F | F _E F C F4 :|
\`\`\`

위는 F7 위에서 쓸 수 있는 전형적인 블루지 라인입니다. 핵심은 ♭7(E♭)에서 ♭5(B)를 거쳐 5도(C)로 미끄러져 내려오는 흐름입니다.

## 어떻게 연습하는가

먼저 프레이즈 자체를 메트로놈 80에서 10번 반복해 손에 각인시킵니다. 메트로놈은 2·4박에 둡니다. 그 다음 F 블루스 백킹 12바 안에 그 프레이즈를 정확히 한 번만 등장시켜 봅니다. 익숙해지면 다른 마디·다른 박자에서 같은 라인을 다시 사용해 봅니다.

너무 자주 쓰면 진부해집니다. 한 코러스에 한두 번이 적당합니다.

## 핵심 포인트

- 음과 리듬을 함께 외웁니다 — 리듬이 더 중요합니다
- 같은 라인을 다른 마디·다른 박자에서 시작해 봅니다
- 한 코러스에 한두 번 정도가 적당합니다
- 앞뒤를 다듬어 자신의 솔로 흐름과 자연스럽게 연결되도록 합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('프레이즈 단독 반복'),
          description: i18('한 시그니처 라인을 박자 안에서 10번 반복해 손에 각인시킵니다. 메트로놈은 2·4박에 둡니다.'),
          bpm: 80,
        },
        {
          title: i18('블루스 위에 한 번 끼워넣기'),
          description: i18('F 블루스 백킹 12바 안에 그 프레이즈를 정확히 한 번만 자연스럽게 등장시킵니다.'),
          bpm: 80,
        },
        {
          title: i18('시작 박자 바꾸기'),
          description: i18('같은 프레이즈를 1박·2박·4박에서 각각 시작해 보고 어느 자리에서 가장 자연스러운지 들어봅니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('프레이즈 한 개를 음과 리듬 모두 정확히 외웠습니다'),
          i18('박자에 맞춰 끊김 없이 연주합니다'),
          i18('F 블루스 위에서 한 번 끼워넣었습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('같은 프레이즈를 12바 안 3개의 다른 위치에서 사용합니다'),
          i18('녹음에서 프레이즈와 자신의 라인 사이가 부드럽게 이어집니다'),
          i18('마디 변화에 박자가 흐트러지지 않습니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('프레이즈의 일부 음만 빌려서 자신만의 변형을 만듭니다'),
          i18('다른 키(B♭ 또는 C)에서도 같은 라인을 연주합니다'),
          i18('인용이 진부하지 않게 한 코러스에 한두 번으로 절제합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('프레이즈를 자기 어휘처럼 의식하지 않고 사용합니다'),
          i18('다른 곡(스탠다드)에서도 자연스럽게 변형해 인용합니다'),
        ],
      },
    ],
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
    theory: {
      content: i18(`## 턴어라운드가 무엇인가

턴어라운드는 12바 블루스의 마지막 2마디 — 마디 11과 12 — 에서 다음 코러스의 마디 1로 자연스럽게 끌어주는 짧은 코드/멜로디 진행을 말합니다. 가장 단순한 형태는 \`F7 - D7 | Gm7 - C7\` 입니다. D7은 Gm7(ii)으로 끌어주는 세컨더리 도미넌트 역할을 합니다.

\`\`\`chord
chord: F7
caption: 마디 11 1박
\`\`\`

\`\`\`chord
chord: D7
caption: 마디 11 3박 (V/ii)
\`\`\`

\`\`\`chord
chord: Gm7
caption: 마디 12 1박 (ii)
\`\`\`

\`\`\`chord
chord: C7
caption: 마디 12 3박 (V) → 다음 코러스 I7로
\`\`\`

## 멜로디 라인은 어떻게 흐르는가

멜로디로 보면 두 가지 단골 패턴이 있습니다. 첫 번째는 \`1 - 3 - 4 - ♯4 | 5\` 반음씩 올라가서 V에 도착하는 라인, 두 번째는 \`1 - ♭7 - 6 - ♭7 | 5\` 위에서 내려오는 라인입니다. 두 라인 모두 마디 12 끝에서 자연스럽게 다음 코러스 마디 1의 I7으로 떨어집니다.

\`\`\`abc
X:1
T:Ascending turnaround line in F
M:4/4
L:1/8
Q:1/4=80
K:F
|: F2 A2 _B2 =B2 | c4 z4 :|
\`\`\`

\`\`\`abc
X:1
T:Descending turnaround line in F
M:4/4
L:1/8
Q:1/4=80
K:F
|: f2 _e2 d2 _e2 | c4 z4 :|
\`\`\`

## 어떻게 연습하는가

턴어라운드는 어떤 블루스 솔로에서도 반드시 거치는 자리입니다. 11-12마디에 닿으면 손이 자동으로 이 패턴을 알고 있어야 솔로의 흐름이 끊기지 않습니다. 한 패턴을 깊게 외운 다음, 키만 바꿔서 12 키 어디서든 같은 모양으로 사용할 수 있도록 만드는 것이 목표입니다.

## 핵심 포인트

- 마디 11-12 = 턴어라운드 자리입니다
- 단순 진행: F7 - D7 | Gm7 - C7
- 멜로디 단골 라인: \`1 3 4 ♯4 | 5\` 또는 \`1 ♭7 6 ♭7 | 5\`
- 마디 12 마지막 박자에서 다음 코러스 마디 1로 떨어집니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('상행 턴어라운드 라인'),
          description: i18('F 블루스에서 \`1 3 4 ♯4 | 5\` 라인(F-A-B♭-B | C)을 박자 안에 정확히 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('하행 턴어라운드 라인'),
          description: i18('두 번째 라인 \`1 ♭7 6 ♭7 | 5\`(F-E♭-D-E♭ | C)도 같은 방식으로 익혀 둡니다.'),
          bpm: 80,
        },
        {
          title: i18('12바 끝에 자연스럽게 연결'),
          description: i18('백킹 위에서 10마디까지 자유롭게 연주하다가 11마디 1박부터 외운 라인을 정확히 떨어뜨립니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('턴어라운드 라인 한 개를 음과 박자 모두 정확히 외웠습니다'),
          i18('11마디 1박에 라인을 시작할 수 있습니다'),
          i18('마디 12 끝이 다음 코러스 마디 1로 자연스럽게 떨어집니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('두 가지 라인(상행·하행) 모두 외웠습니다'),
          i18('자신의 솔로 흐름에서 갑작스러운 단절 없이 진입합니다'),
          i18('B♭ 블루스에서도 같은 라인을 연주합니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('턴어라운드를 자기 변형으로 살짝 꾸며 사용합니다'),
          i18('마디 12 마지막 박자에서 다음 코러스를 미리 끌고 들어가는 시도를 합니다'),
          i18('컴핑에서도 D7(VI7) 세컨더리 도미넌트를 자연스럽게 짚습니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('12 키 모두에서 턴어라운드 라인 위치를 즉시 떠올립니다'),
          i18('서너 가지 다른 턴어라운드 패턴을 상황에 맞게 골라 씁니다'),
        ],
      },
    ],
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
    theory: {
      content: i18(`## 키 이동이 무엇인가

한 키에서만 익숙해진 라인은 그 키의 운지를 기억할 뿐, 음악적 관계를 외운 것이 아닙니다. 같은 라인을 F, B♭, C 세 키로 옮겨 보면 비로소 "이 라인이 1도-♭3-4-♭5-5도로 움직이는구나" 같은 **음정 관계**로 머리에 들어옵니다.

세션이나 잼 상황에서는 호른 연주자가 자신에게 편한 키로 블루스를 잡습니다. 호른의 단골 키가 B♭과 F입니다. 기타리스트가 자기 키(E, A)에서만 익숙하면 어울려 연주하기 어렵습니다.

## 세 키의 1포지션 비교

같은 마이너 펜타토닉 박스를 키만 바꿔서 비교하면, 운지 모양이 동일하고 위치만 옮겨가는 것을 볼 수 있습니다.

\`\`\`fretboard
title: F Minor Pentatonic · 1포지션
root: F
notes: F, Ab, Bb, C, Eb
frets: 1-5
\`\`\`

\`\`\`fretboard
title: Bb Minor Pentatonic · 1포지션
root: Bb
notes: Bb, Db, Eb, F, Ab
frets: 6-10
\`\`\`

\`\`\`fretboard
title: C Minor Pentatonic · 1포지션
root: C
notes: C, Eb, F, G, Bb
frets: 8-12
\`\`\`

## 어떻게 연습하는가

먼저 F에서 익힌 12바 솔로의 윤곽을 그대로 B♭에 옮깁니다. 같은 운지 모양을 5프렛 위로 옮기면 됩니다. C는 다시 두 프렛 위로 옮긴 형태입니다. 라인을 외우려 하지 말고 "코드 변화에 대한 같은 반응"을 다른 위치에서 재현한다고 생각하면 좋습니다.

## 핵심 포인트

- 같은 라인을 다른 키로 옮기면 음악적 관계로 외워집니다
- F·B♭·C는 잼·세션에서 가장 빈도 높은 블루스 키입니다
- 운지 모양을 그대로 옮기는 것에서 시작해 차츰 자유롭게 위치를 바꿉니다
- 박자가 흐트러지면 익숙하지 않다는 신호입니다 — 그 키만 따로 더 연습합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('F → B♭ 이동'),
          description: i18('F에서 연주하던 짧은 프레이즈 하나를 B♭ 백킹 위에서 그대로 옮겨 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('세 키 연속 1코러스'),
          description: i18('F → B♭ → C 순서로 각 키 1코러스씩 끊김 없이 연주합니다. 라인은 단순해도 됩니다.'),
          bpm: 80,
        },
        {
          title: i18('턴어라운드만 12키 한 바퀴'),
          description: i18('턴어라운드 라인 한 개를 4도 사이클로 12 키 모두 연주합니다. 박자 안에서 끊김 없이.'),
          bpm: 70,
        },
      ],
      backingTrackIds: ['bt-f-blues-80', 'bt-bb-blues-100', 'bt-c-blues-120'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('F 블루스 1코러스를 끊김 없이 연주합니다'),
          i18('B♭ 블루스 1코러스를 박자 안에서 연주합니다'),
          i18('C 블루스 1코러스를 박자 안에서 연주합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('세 키를 연속으로 박자 손실 없이 이어 연주합니다'),
          i18('같은 라인을 세 키 모두에서 동일한 리듬으로 연주합니다'),
          i18('녹음에서 어떤 키든 같은 음악적 의도가 들립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('G, D, E♭ 등 잘 안 쓰는 키도 1코러스 연주합니다'),
          i18('각 키마다 운지 모양이 자연스럽게 떠오릅니다'),
          i18('턴어라운드 라인을 12 키 모두에서 연주할 수 있습니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 키를 요청받아도 즉시 솔로를 시작합니다'),
          i18('자기 어휘를 키 의식 없이 자유롭게 옮깁니다'),
        ],
      },
    ],
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
    theory: {
      content: i18(`## 솔로 기타가 무엇인가

솔로 기타는 한 대의 기타만으로 **베이스·코드·멜로디** 세 층을 동시에 표현하는 연주 방식입니다. 반주자가 없는 상황에서도 곡 한 곡을 온전히 들려줄 수 있다는 점이 큰 매력입니다.

기본 발상은 단순합니다. 베이스 음을 6번줄·5번줄에 두고, 그 위 줄들에 코드의 3·7과 멜로디를 얹습니다. 모든 음을 동시에 칠 필요는 없습니다. 베이스 → 코드 → 멜로디 순서로 약간씩 어긋나게 표현해도 충분히 풍성하게 들립니다.

## 세 층은 어떻게 분배하는가

- **베이스 (6·5번줄)**: 1박과 3박에 코드의 루트나 5도를 둡니다
- **코드 (3·4번줄)**: 2박·4박에 3도+7도(가이드 톤)를 짧게 끊어 짚습니다
- **멜로디 (1·2번줄)**: 박자 사이의 빈 곳에 짧은 펜타토닉 라인을 끼웁니다

\`\`\`chord
chord: F7
caption: 셸 보이싱: 루트 + 3 + ♭7
\`\`\`

## 어떻게 들리는가

가장 단순한 베이스 + 코드 패턴을 한 마디로 표현하면 다음과 같이 흐릅니다.

\`\`\`abc
X:1
T:Bass + chord stab pattern
M:4/4
L:1/8
Q:1/4=80
K:F
|: F,4 [Ac]2 z2 | C,4 [Ac]2 z2 :|
\`\`\`

1박에 베이스 루트, 3박에 5도 베이스, 사이에 셸 코드를 짧게 짚는 식입니다.

## 어떻게 연습하는가

블루스는 솔로 기타의 좋은 입문 곡입니다. 진행이 단순하고, 베이스 라인을 단순한 1박-루트 / 3박-5도 패턴으로만 잡아도 자연스럽게 흐릅니다. 처음에는 멜로디를 생략하고 베이스+코드만으로 12바를 완주합니다. 거기에 마디 끝마다 짧은 펜타토닉 한 라인을 보태는 식으로 멜로디를 점차 채워 갑니다.

## 핵심 포인트

- 베이스(6·5번줄) + 코드(3·4번줄) + 멜로디(1·2번줄) 세 층으로 분배
- 모두 동시에 칠 필요는 없습니다 — 약간 어긋나게 표현해도 좋습니다
- 단순한 1박-루트 베이스만으로도 시작할 수 있습니다
- 마디 끝에 짧은 멜로디 한 라인을 보태는 것으로 시작합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('베이스 + 코드만으로 12바'),
          description: i18('각 마디 1박에 루트 베이스를 두고 2·4박에 셸 코드(3·7)를 얹어 12바를 완주합니다. 멜로디는 아직 없어도 됩니다.'),
          bpm: 70,
        },
        {
          title: i18('마디 끝에 짧은 멜로디 추가'),
          description: i18('각 4마디 그룹의 마지막 마디에 펜타토닉 한 라인을 짧게 얹어 베이스/코드와 함께 들리도록 합니다.'),
          bpm: 70,
        },
        {
          title: i18('Joe Pass 식 어긋남 연습'),
          description: i18('베이스 → 코드 → 멜로디 순서로 약간씩 시간차를 두어 한 마디를 채웁니다. 손은 늘 다음 마디 베이스를 준비합니다.'),
          bpm: 60,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('각 마디 1박에 루트 베이스를 정확히 떨어뜨립니다'),
          i18('셸 코드(3·7) 두 음을 안정적으로 잡습니다'),
          i18('12바를 박자 손실 없이 완주합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('베이스와 코드가 같은 박에서도 동시에 깨끗하게 울립니다'),
          i18('마디 끝마다 짧은 멜로디 한 라인을 보탭니다'),
          i18('녹음에서 베이스/코드/멜로디 세 층이 구분되어 들립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('한 코러스 안에서 베이스 워킹 라인을 시도합니다'),
          i18('멜로디에 블루 노트와 비브라토를 자연스럽게 넣습니다'),
          i18('B♭ 블루스에서도 같은 형식을 적용합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('Joe Pass처럼 베이스/코드/멜로디를 자유롭게 오가며 1코러스를 완주합니다'),
          i18('다른 스탠다드(Autumn Leaves 등)에서도 솔로 기타 1코러스가 가능합니다'),
        ],
      },
    ],
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
    slug: 'harmony-guide-tone-voicings',
    trunkSlug: 'harmony-comping',
    order: 1,
    title: i18('ii-V-I을 가이드 톤(3-7)만으로 연결한다'),
    description: i18('두 음(3도·7도)만으로 코드 진행의 색깔을 표현.'),
    theory: {
      content: i18(`## 가이드 톤이 무엇인가

가이드 톤은 코드의 **3도와 7도**, 두 음만을 가리킵니다. 이 두 음이 코드의 색깔(메이저/마이너/도미넌트)을 결정합니다. 1도와 5도는 베이스나 다른 악기가 채워주는 경우가 많아, 기타가 두 음만으로도 진행을 분명히 들려줄 수 있습니다.

ii-V-I 진행 \`Dm7 - G7 - Cmaj7\`의 가이드 톤을 정리하면 다음과 같습니다.

- Dm7 → 3도 F · 7도 C
- G7 → 3도 B · 7도 F
- Cmaj7 → 3도 E · 7도 B

\`\`\`chord
chord: Dm7
caption: ii 가이드 톤 = F + C
\`\`\`

\`\`\`chord
chord: G7
caption: V 가이드 톤 = B + F
\`\`\`

\`\`\`chord
chord: Cmaj7
caption: I 가이드 톤 = E + B
\`\`\`

## 보이스 리딩이 왜 매력인가

위 세 코드의 가이드 톤을 이어 보면, F는 그대로 유지되다가 E로 반음 내려가고, C는 B로 반음 내려갔다가 그대로 유지됩니다. 한 음씩만 반음 움직여서 진행 전체가 연결되는 것이 좋은 보이스 리딩의 본질입니다.

\`\`\`abc
X:1
T:Guide tone voice leading
M:4/4
L:1/4
Q:1/4=80
K:C
|: [Fc]2 [FB]2 | [EB]2 [EB]2 :|
\`\`\`

## 어떻게 연습하는가

처음에는 두 음만 4·3번줄에 잡고 ii-V-I 진행을 연주합니다. 베이스 음 없이, 가이드 톤만으로도 청자가 코드 진행을 충분히 알아듣습니다. 익숙해지면 베이스 음을 6번줄에 더해서 셸 보이싱(1-3-7 또는 1-7-3)으로 발전시킵니다.

## 핵심 포인트

- 가이드 톤 = 코드의 3도 + 7도
- 보이스 리딩의 본질: 반음씩만 움직이기
- ii-V-I에서 한 음은 유지, 한 음은 반음 이동
- 12 키 모두에서 같은 방식으로 적용 가능합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('C장조 ii-V-I 가이드 톤'),
          description: i18('Dm7(F-C) → G7(F-B) → Cmaj7(E-B)을 4·3번줄에 잡고 박자 안에서 부드럽게 전환합니다.'),
          bpm: 80,
        },
        {
          title: i18('보이스 리딩 의식하기'),
          description: i18('한 음은 그대로 두고 다른 한 음만 반음 이동시키는 감각으로 진행을 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('12 키 사이클'),
          description: i18('C → F → B♭ … 4도 사이클로 12 키 ii-V-I 가이드 톤을 한 바퀴 돕니다.'),
          bpm: 70,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Dm7, G7, Cmaj7의 3·7 음을 즉시 떠올립니다'),
          i18('C장조 ii-V-I 가이드 톤을 박자 안에서 연주합니다'),
          i18('한 음씩만 움직이는 감각을 압니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('보이스 리딩으로 부드럽게 연결합니다'),
          i18('5 키 이상에서 ii-V-I 가이드 톤을 연주합니다'),
          i18('베이스 음을 더해 셸 보이싱(1-3-7)으로 확장합니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('12 키 모두에서 ii-V-I 가이드 톤 연주'),
          i18('마이너 ii-V-i (m7♭5 - 7alt - m)에도 같은 접근 적용'),
          i18('스탠다드 한 곡(Autumn Leaves)을 가이드 톤만으로 컴핑'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 진행이든 즉시 가이드 톤 라인을 떠올립니다'),
          i18('가이드 톤 사이에 텐션·접근음을 자유롭게 끼워넣습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('Dm7, G7, Cmaj7의 3-7 음을 즉시 안다'),
      i18('보이스 리딩으로 부드럽게 연결(한 음씩 움직임)'),
      i18('C장조 ii-V-I을 가이드 톤만으로 친다'),
      i18('12키로 이동해서 연주'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['guide-tones', 'iivi-theory'],
  },
  {
    id: 'lf-hc-2',
    slug: 'harmony-drop2-voicings',
    trunkSlug: 'harmony-comping',
    order: 2,
    title: i18('Cmaj7 / Dm7 / G7을 Drop 2 보이싱으로 친다'),
    description: i18('5번줄/6번줄 루트 두 폼으로 부드럽게 전환.'),
    theory: {
      content: i18(`## Drop 2 보이싱이 무엇인가

Closed voicing(닫힌 보이싱)은 코드의 4음을 한 옥타브 안에 차곡차곡 쌓은 형태입니다. 피아노에서는 자연스럽지만 기타에서는 손으로 잡기가 어렵습니다. **Drop 2**는 closed voicing의 **위에서 두 번째 음**을 한 옥타브 아래로 떨어뜨린 형태입니다. 기타 4줄에 자연스럽게 펼쳐져서 잡기 좋아집니다.

Cmaj7을 예로 들면 closed는 C-E-G-B인데, Drop 2는 G를 한 옥타브 내려서 **G-C-E-B**가 됩니다. 이 4음을 5·4·3·2번줄(또는 6·4·3·2번줄)에 한 음씩 잡습니다.

\`\`\`chord
chord: Cmaj7
caption: 5번줄 루트 Drop 2
\`\`\`

같은 코드를 5번줄 루트와 6번줄 루트 두 자리에서 모두 익히면 지판을 좌우로 자유롭게 오갈 수 있습니다.

## 두 폼을 혼합하면 어떻게 들리는가

ii-V-I 진행에서 한 자리에 머물지 않고 두 폼을 섞으면, 손 이동이 줄고 보이스 리딩이 부드러워집니다.

\`\`\`chord
chord: Dm7
caption: 5번줄 루트
\`\`\`

\`\`\`chord
chord: G7
caption: 6번줄 루트 자리에서 가까운 폼
\`\`\`

\`\`\`chord
chord: Cmaj7
caption: 5번줄 루트로 다시 복귀
\`\`\`

Cmaj7을 잡은 자리 근처에서 가장 가까운 Dm7, G7을 골라야 손도 편하고 음악적 흐름도 자연스럽습니다.

## 어떻게 연습하는가

먼저 Cmaj7, Dm7, G7 세 코드의 두 자리 Drop 2를 외웁니다. ii-V-I 진행에서 이 세 코드를 짚으면서 보이스 리딩이 부드럽게 흐르도록 자리를 고르는 것이 핵심입니다. Drop 2 외에 Drop 3(closed에서 위에서 세 번째 음을 떨어뜨림)도 있지만, 가장 먼저 Drop 2 두 폼을 단단히 익히는 것이 우선입니다.

## 핵심 포인트

- Closed → Drop 2 = 위에서 두 번째 음을 한 옥타브 아래로
- 같은 코드 두 폼: 5번줄 루트 / 6번줄 루트
- 진행에서는 가장 가까운 자리의 보이싱을 고릅니다
- 두 폼을 혼합하면 손이 편하고 보이스 리딩도 자연스럽습니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Cmaj7 두 폼 비교'),
          description: i18('5번줄 루트 Cmaj7(3프렛)과 6번줄 루트 Cmaj7(8프렛)을 번갈아 짚고 음색·잡기 편함을 비교합니다.'),
        },
        {
          title: i18('ii-V-I 한 자리로 연주'),
          description: i18('C장조 ii-V-I을 한 자리(예: 5번줄 루트 영역)에서 보이스 리딩이 가장 부드러운 자리만 골라 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('두 폼 혼합'),
          description: i18('Cmaj7은 5번줄, Dm7은 6번줄, G7은 5번줄 식으로 폼을 섞어 손 이동이 가장 적은 연결을 찾습니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('5번줄 루트 Drop 2 Cmaj7을 잡습니다'),
          i18('6번줄 루트 Drop 2 Cmaj7을 잡습니다'),
          i18('Dm7, G7도 두 자리 모두 외웠습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('Cmaj7 → Dm7 → G7 → Cmaj7을 부드럽게 전환합니다'),
          i18('5번줄 ↔ 6번줄 보이싱을 혼합해 손 이동을 줄입니다'),
          i18('보이스 리딩이 자연스럽게 들립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('Drop 2의 4개 인버전(루트·1전위·2전위·3전위)을 모두 사용합니다'),
          i18('스탠다드 한 곡을 Drop 2로 컴핑합니다'),
          i18('Drop 3 보이싱도 한두 자리 추가로 익혔습니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('12 키 모두에서 Drop 2 ii-V-I을 즉시 연주합니다'),
          i18('인버전·자리·텐션을 의식 없이 자유롭게 선택합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('5번줄 루트 Drop 2 (Cmaj7)를 잡는다'),
      i18('6번줄 루트 Drop 2 (Cmaj7)를 잡는다'),
      i18('Cmaj7 → Dm7 → G7 → Cmaj7 부드럽게 전환'),
      i18('5번줄 ↔ 6번줄 보이싱을 혼합한다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['drop2-voicing'],
  },
  {
    id: 'lf-hc-3',
    slug: 'harmony-iivi-comping-12-keys',
    trunkSlug: 'harmony-comping',
    order: 3,
    title: i18('ii-V-I 컴핑을 12키 BPM 80에서 친다'),
    description: i18('익숙한 보이싱을 모든 키로 이동.'),
    theory: {
      content: i18(`## 12 키 사이클이 왜 필요한가

재즈의 모든 스탠다드는 결국 ii-V-I 진행의 변형입니다. Autumn Leaves는 G장조 ii-V-I과 Em 마이너 ii-V-i의 반복이고, All The Things You Are는 4개의 키 센터를 ii-V-I으로 옮겨다니는 곡입니다. 그래서 **12 키 ii-V-I이 손에 들어와 있으면** 어떤 스탠다드를 만나도 곧장 컴핑할 수 있습니다.

12 키를 한 번에 외울 필요는 없습니다. 4도 사이클(C → F → B♭ → E♭ … )로 한 키씩 옮기면, 각 키의 ii-V-I가 같은 운지 모양 그대로 한 위치씩 이동합니다.

## 4도 사이클의 순서

키 사이클은 보통 아래 순서로 돕니다.

C → F → B♭ → E♭ → A♭ → D♭ → G♭ → B → E → A → D → G → (C)

각 키의 ii-V-I은 다음과 같습니다.

- C장조: Dm7 - G7 - Cmaj7
- F장조: Gm7 - C7 - Fmaj7
- B♭장조: Cm7 - F7 - B♭maj7
- ... (이하 동일 패턴)

\`\`\`chord
chord: Dm7
caption: C장조 ii
\`\`\`

\`\`\`chord
chord: G7
caption: C장조 V
\`\`\`

\`\`\`chord
chord: Cmaj7
caption: C장조 I
\`\`\`

## 어떻게 연습하는가

처음에는 C장조에서 ii-V-I 두 자리 보이싱을 안정시킵니다. 그 다음 4도 사이클로 한 키씩 추가합니다. 한 키를 4마디(ii 1마디, V 1마디, I 2마디)씩 두고 백킹 없이 메트로놈만으로 12 키를 한 바퀴 돕니다. 한 바퀴가 BPM 80에서 끊김 없이 가능해지면 다음 단계로 넘어갑니다.

## 핵심 포인트

- 12 키는 4도 사이클로 외우면 같은 운지 모양이 이동합니다
- 한 키 4마디 (ii 1마디, V 1마디, I 2마디)
- 두 자리 보이싱(5줄/6줄 루트)을 골라 손 이동을 최소화합니다
- BPM 80 한 바퀴 끊김 없이가 합격선입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('C 한 키 컴핑 1분'),
          description: i18('C장조 ii-V-I을 4마디씩 끊김 없이 1분간 반복합니다. 리듬은 단순한 4박 컴핑.'),
          bpm: 80,
        },
        {
          title: i18('4도 사이클 12 키 한 바퀴'),
          description: i18('C → F → B♭ → E♭ … 4도 사이클로 12 키 ii-V-I을 한 키 4마디씩 끊김 없이 한 바퀴.'),
          bpm: 80,
        },
        {
          title: i18('샤플리 리듬 추가'),
          description: i18('단순 컴핑이 안정되면 Charleston 리듬(1박 + 2박반)이나 앤티시페이션을 더해 자연스러운 흐름을 만듭니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('C장조 ii-V-I 컴핑을 1분 끊김 없이 연주합니다'),
          i18('한 키 안에서 손 이동이 최소화된 두 자리 보이싱을 골랐습니다'),
          i18('리듬이 박자에 단단히 떨어집니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('5개 키(C, F, B♭, E♭, G)로 이동 가능'),
          i18('한 키에서 다음 키로 끊김 없이 넘어갑니다'),
          i18('백킹 위에서 자연스러운 리듬으로 컴핑'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('12 키 모두 가능 (각 키 4마디씩 BPM 80 한 바퀴)'),
          i18('Charleston·앤티시페이션 등 두세 가지 컴핑 리듬을 사용'),
          i18('보이스 리딩이 한 음씩만 움직이는 자리를 자연스럽게 선택'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('BPM 120에서도 12 키 한 바퀴 끊김 없이'),
          i18('잼 세션에서 어떤 키 ii-V-I이 들려도 즉시 합류합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('C장조 ii-V-I 컴핑을 1분 끊김 없이'),
      i18('5개 키(C, F, Bb, Eb, G)로 이동'),
      i18('12키 모두 가능(각 키마다 4마디씩)'),
      i18('백킹 트랙 위에서 자연스러운 리듬'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-theory', 'drop2-voicing'],
  },
  {
    id: 'lf-hc-4',
    slug: 'harmony-v7-tension-comping',
    trunkSlug: 'harmony-comping',
    order: 4,
    title: i18('V7에 텐션(b9, b13)을 더해 컴핑한다'),
    description: i18('V7만 텐션으로 색칠해서 해결감을 깊게.'),
    theory: {
      content: i18(`## V7 텐션이 무엇인가

ii-V-I 진행에서 가장 긴장이 높은 자리가 V7입니다. V7이 I로 해결할 때 청자는 "다음이 곧 풀린다"는 기대감을 가집니다. 이 자리에 텐션(♭9, ♭13, ♯9, ♯11)을 추가하면 긴장이 더 커지고, 결과적으로 I로 풀리는 감각이 더 깊어집니다.

V7에 자주 쓰는 텐션은 ♭9, ♭13입니다.

- **G7(♭9)**: G - B - F - A♭ (♭9 = A♭)
- **G7(♭13)**: G - B - F - E♭ (♭13 = E♭)

이 음들이 들어가면 코드가 "어두워지면서 강하게 끌리는" 느낌이 됩니다.

\`\`\`chord
chord: G7
caption: 자연 V7 (텐션 없음) — 비교용
\`\`\`

## 해결 방향은 어떻게 정해지는가

V7 텐션은 I로 갈 때 단골 해결 경로가 있습니다.

- ♭9 → 5도로 반음 내려갑니다 (G7 A♭ → C E)
- ♭13 → 9도로 반음 내려갑니다 (G7 E♭ → C D)
- ♯11 → 9도로 반음 올라갑니다 (G7 C♯ → C D)

이걸 의식하면 보이스 리딩이 자연스러워집니다.

\`\`\`abc
X:1
T:b9 resolves down a half step to the 5th
M:4/4
L:1/4
Q:1/4=80
K:C
|: [B_A]2 [Bd]2 | [ce]2 [ce]2 :|
\`\`\`

## 어떻게 연습하는가

처음에는 G7에 ♭9 한 음만 추가한 보이싱을 잡습니다. ii-V-I 진행에서 Dm7 → G7(♭9) → Cmaj7로 가면 V7 자리만 색깔이 달라집니다. 익숙해지면 ♭13 보이싱을 추가하고, 두 텐션을 같이 쓰는 G7(♭9, ♭13)도 시도합니다. 마이너 ii-V-i (Dm7♭5 - G7 - Cm)에서는 거의 항상 V7에 텐션을 추가합니다.

## 핵심 포인트

- 텐션은 V7 자리에 — I와 ii는 자연 음으로
- 자주 쓰는 V7 텐션: ♭9, ♭13, ♯9, ♯11
- 해결 방향: ♭9↓→5 / ♭13↓→9 / ♯11↑→9
- 마이너 ii-V-i에서는 거의 필수입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('G7(♭9) 보이싱'),
          description: i18('G7(♭9)을 5번줄 루트 자리에서 잡습니다(G-B-F-A♭). 손가락이 익숙해질 때까지 반복.'),
        },
        {
          title: i18('ii-V-I 안에서 텐션 추가'),
          description: i18('Dm7 → G7(♭9) → Cmaj7. V7 자리에만 텐션을 추가하고 해결의 느낌을 들어봅니다.'),
          bpm: 80,
        },
        {
          title: i18('두 텐션 비교'),
          description: i18('G7(♭9)과 G7(♭13)을 같은 진행에서 번갈아 써보고 어느 쪽이 더 어둡게 들리는지 비교합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('G7(♭9) 보이싱을 잡습니다'),
          i18('G7(♭13) 보이싱을 잡습니다'),
          i18('ii-V-I에서 V7 자리에만 텐션을 추가합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('텐션 ↔ 자연 음의 차이를 귀로 분명히 구분합니다'),
          i18('해결 방향(♭9↓→5)을 의식하며 보이스 리딩'),
          i18('마이너 ii-V-i에 V7 텐션을 자연스럽게 사용합니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('♯9·♯11 텐션도 보이싱으로 사용합니다'),
          i18('한 진행에서 두 가지 다른 텐션을 의도적으로 비교 사용'),
          i18('스탠다드의 V7 자리에 텐션을 자유롭게 추가합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('V7alt 보이싱을 자유롭게 골라 사용합니다'),
          i18('텐션을 사용하는 자리와 자연 음으로 두는 자리를 음악적으로 판단합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('G7(b9) 보이싱을 잡는다'),
      i18('G7(b13) 보이싱을 잡는다'),
      i18('ii-V-I에서 V7 자리에만 텐션 추가'),
      i18('텐션 ↔ 자연 음의 차이를 귀로 안다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['tension-resolution'],
  },
  {
    id: 'lf-hc-5',
    slug: 'harmony-walking-bass',
    trunkSlug: 'harmony-comping',
    order: 5,
    title: i18('Walking Bass를 ii-V-I에서 1코러스 친다'),
    description: i18('4박마다 한 음씩, 코드 변화를 부드럽게 연결.'),
    theory: {
      content: i18(`## Walking Bass가 무엇인가

Walking Bass는 한 마디 안에 4박 모두 한 음씩 떨어뜨리는 베이스 라인입니다. 매 박이 4분음표 하나로, "걷는 듯한" 일정한 흐름을 만듭니다. 베이시스트가 없는 상황에서 기타가 베이스 역할을 대신할 때 가장 흔하게 사용합니다.

가장 단순한 공식은 다음과 같습니다.

- 1박 — **루트**
- 2박 — 코드톤 (3도 또는 5도)
- 3박 — 임의의 코드톤/스케일 음
- 4박 — **다음 코드 루트로 가는 접근음** (반음 위/아래)

4박을 다음 코드 루트의 반음 위/아래에 두면 자연스럽게 다음 마디로 흘러갑니다. 이를 chromatic approach라고 부릅니다.

## 어떻게 들리는가

C장조 ii-V-I에서 가장 단순한 워킹 라인을 만들면 다음과 같이 흐릅니다.

\`\`\`abc
X:1
T:Walking bass on ii-V-I
M:4/4
L:1/4
Q:1/4=80
K:C
|: D, F, A, ^F, | G, B, D ^G, | C, E, G, C, | C,4 :|
\`\`\`

각 마디 1박이 루트(D, G, C), 4박이 다음 코드 루트의 반음 아래(F♯ → G, A♭ → 무시되고 다시 C로 향함) 식으로 연결됩니다.

## 어떻게 연습하는가

처음에는 한 코드 안에서 4박 라인을 만드는 것부터 시작합니다. Dm7만으로 1박 D, 2박 F, 3박 A, 4박 다시 D 식으로 한 마디를 채웁니다. 안정되면 두 코드 사이의 4박 접근음을 의식적으로 골라 봅니다.

베이스 라인이 안정되면 그 위에 짧은 셸 보이싱(3·7만)을 2·4박에 살짝 끼워넣어 컴핑 효과를 만듭니다.

## 핵심 포인트

- 매 박 한 음 — 일정한 4분음표 흐름
- 1박 = 루트, 4박 = 다음 루트로 가는 접근음
- 반음 접근(chromatic)이 가장 자연스럽습니다
- 베이스 위에 셸 코드를 살짝 더하면 "워킹 + 컴핑" 완성
`),
    },
    practice: {
      exercises: [
        {
          title: i18('한 코드 4박 워킹'),
          description: i18('Dm7만으로 4박 워킹 라인 한 마디를 만듭니다. 1박 D, 2박 F, 3박 A, 4박 다시 D 식.'),
          bpm: 70,
        },
        {
          title: i18('ii-V-I 워킹 1코러스'),
          description: i18('Dm7 → G7 → Cmaj7. 각 마디 4박에 다음 코드 루트의 반음 위/아래를 두어 자연스럽게 연결합니다.'),
          bpm: 80,
        },
        {
          title: i18('워킹 + 셸 보이싱'),
          description: i18('워킹 베이스 위에 2·4박 짧은 셸 코드(3·7)를 끼워넣습니다. 베이스는 끊김 없이 유지.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('각 코드의 루트를 박자 1에 정확히 떨어뜨립니다'),
          i18('한 마디 안에 4박 워킹 라인을 만듭니다'),
          i18('8마디를 끊김 없이 워킹합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('코드 변화 시 4박 접근음으로 부드럽게 연결'),
          i18('Triad 접근과 Diatonic 접근을 구분해서 사용'),
          i18('자연스러운 4박 흐름이 끊기지 않습니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('워킹 베이스 위에 2·4박 셸 코드를 동시 연주합니다'),
          i18('한 코러스 안에서 라인이 자기 모티프를 발전시킵니다'),
          i18('다른 진행(Autumn Leaves)에서도 워킹 1코러스 가능'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('베이스 워킹·코드·짧은 멜로디를 한 대 기타로 동시에 표현합니다'),
          i18('12 키 모두에서 ii-V-I 워킹을 즉시 연주합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('각 코드의 루트를 박자 1에 떨어뜨린다'),
      i18('4박마다 한 음씩(걷는 느낌)'),
      i18('코드 변화 시 부드럽게 연결'),
      i18('8마디 끊김 없이'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-theory'],
  },
  {
    id: 'lf-hc-6',
    slug: 'harmony-altered-comping',
    trunkSlug: 'harmony-comping',
    order: 6,
    title: i18('V7alt 보이싱으로 컴핑한다'),
    description: i18('얼터드 텐션(#9, b13)으로 해결감을 강하게.'),
    theory: {
      content: i18(`## V7alt가 무엇인가

V7alt는 V7의 9도와 13도 텐션이 모두 ♭ 또는 ♯로 변경된 코드입니다. 즉 **♭9, ♯9, ♭13(=♯5), ♯11** 텐션이 동시에 가능한 V7입니다. G7alt의 후보 음은 G - B - F - A♭(♭9) - D♯(♯9) - C♯(♯11) - E♭(♭13) 중에서 4-5음을 골라 잡습니다.

이론적으로 **G7alt = A♭ Jazz Minor scale**입니다. 즉 V7 음 위에서 반음 위 jazz minor 스케일을 솔로 도구로 쓰면 그게 곧 altered 사운드입니다. 보이싱에서는 G-F-B-E♭ 같은 4음 조합(루트, ♭7, 3, ♭13)이 자주 쓰입니다.

V7alt → I 해결은 일반 V7보다 훨씬 강합니다. 청자에게 "이제 풀려야 한다"는 압박을 주고 풀어주는 카타르시스가 있습니다. 마이너 ii-V-i 진행에서는 거의 필수입니다.

## 해결은 어떻게 흘러가는가

G7alt → Cmaj7로 갈 때 가장 자연스러운 보이스 리딩은 다음과 같습니다.

- ♭13 (E♭) → 5도 (E) — 반음 위
- ♭7 (F) → 3도 (E) — 반음 아래
- 3도 (B) → 루트 (C) — 반음 위

\`\`\`abc
X:1
T:V7alt → I voice leading
M:4/4
L:1/4
Q:1/4=70
K:C
|: [G_e=Bf]4 | [CEGc]4 :|
\`\`\`

## 어떻게 연습하는가

처음에는 G7alt 보이싱 하나를 외웁니다. 5번줄 또는 6번줄 루트 자리에서 ♯9·♭13을 포함하는 4음 조합. ii-V-I 진행에서 V7 자리를 V7alt로 바꿔서 연주하고, 그 다음 I로 해결합니다. 같은 자리에서 일반 V7과 V7alt를 번갈아 짚어보고, 해결의 강도가 어떻게 달라지는지 귀로 비교합니다.

## 핵심 포인트

- V7alt = ♭9, ♯9, ♭13, ♯11 텐션 가능
- 솔로 도구: 반음 위 jazz minor 스케일 (G7alt = A♭ jazz minor)
- 보이싱은 4음으로 — 루트, ♭7, 3, 텐션 한 개
- 마이너 ii-V-i, Sunny 같은 곡에서 거의 필수
`),
    },
    practice: {
      exercises: [
        {
          title: i18('G7alt 보이싱 외우기'),
          description: i18('G7(♯9, ♭13) 보이싱을 5번줄 루트 자리에서 외웁니다. 손가락이 굳을 때까지 반복.'),
        },
        {
          title: i18('V7 → V7alt 교체'),
          description: i18('C장조 ii-V-I을 일반 G7로 한 번, V7alt로 한 번 연주해 보고 해결의 강도를 비교합니다.'),
          bpm: 80,
        },
        {
          title: i18('Sunny 위에 적용'),
          description: i18('Sunny의 E♭7 같은 자리를 E♭7alt로 바꿔 연주합니다. F dorian/jazz minor 음으로 해결 라인을 만듭니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('G7alt 보이싱 한 개를 잡습니다 (♯9 또는 ♭13 포함)'),
          i18('ii-V-I에서 V7 자리에 alt를 사용합니다'),
          i18('V7 → V7alt의 해결 강도 차이를 듣습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('두 자리(5줄/6줄 루트) alt 보이싱을 외웠습니다'),
          i18('해결음(예: ♭13 → 3)을 의식하며 보이스 리딩'),
          i18('마이너 ii-V-i에서 자연스럽게 사용합니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('G7alt = A♭ jazz minor 관계를 이해하고 솔로에도 적용'),
          i18('Sunny, ATTYA 같은 곡의 alt 자리에 자연스럽게 사용'),
          i18('alt 텐션을 ♯9 → ♭9 식으로 한 마디 안에서도 옮깁니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 V7 자리든 즉시 alt 보이싱으로 대체할 수 있습니다'),
          i18('Sub V7(트라이톤 대리)과 alt를 자유롭게 오갑니다'),
        ],
      },
    ],
    selfCheck: [
      i18('G7alt 보이싱 1개를 잡는다(#9, b13)'),
      i18('ii-V-I에서 V7 자리에 alt 사용'),
      i18('해결감을 안다(B → C 등)'),
      i18('Sunny 위에서 적용 시도'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['altered-chord'],
  },

  // Soloing
  {
    id: 'lf-so-1',
    slug: 'soloing-chord-tones',
    trunkSlug: 'soloing',
    order: 1,
    title: i18('ii-V-I 위에서 코드톤만으로 1코러스 솔로한다'),
    description: i18('각 코드의 1-3-5-7로 진행을 표현.'),
    theory: {
      content: i18(`## 코드톤 솔로가 무엇인가

코드톤만으로 솔로하는 것은 재즈 솔로의 가장 기본적이고 가장 강력한 도구입니다. 각 마디에 그 코드의 **1-3-5-7** 네 음만 사용해서 라인을 만듭니다. 음이 적어 보이지만, 코드 변화가 솔로에서 분명히 들려서 청자가 곡의 흐름을 따라가기 좋습니다.

C장조 ii-V-I의 코드톤은 다음과 같습니다.

- **Dm7**: D - F - A - C
- **G7**: G - B - D - F
- **Cmaj7**: C - E - G - B

\`\`\`abc
X:1
T:ii-V-I arpeggios up and down
M:4/4
L:1/8
Q:1/4=80
K:C
|: D F A c | G B d f | C E G B | C4 z4 :|
\`\`\`

## 어느 음이 가장 중요한가

가장 중요한 음은 **3도와 7도**입니다. 1도와 5도는 코드 색깔을 잘 드러내지 않지만, 3도와 7도는 메이저/마이너/도미넌트를 즉시 알려 줍니다. Dm7의 F(♭3), G7의 B(3)·F(♭7), Cmaj7의 E(3)·B(7) — 이 음들에 무게가 실리면 같은 코드톤 라인도 훨씬 음악적으로 들립니다.

## 타깃 코드톤은 어떻게 만드는가

코드 변화 자리에서 다음 코드의 3도나 7도로 자연스럽게 떨어뜨리는 것을 **타깃 코드톤**이라고 부릅니다. Dm7에서 마지막 음을 G7의 3도(B)로, G7의 마지막 음을 Cmaj7의 3도(E)로 옮기는 식입니다.

\`\`\`abc
X:1
T:Targeting the 3rd on chord changes
M:4/4
L:1/8
Q:1/4=80
K:C
|: A F D F | B G D F | E2 z2 z4 :|
\`\`\`

## 핵심 포인트

- 각 코드 1-3-5-7 네 음만 사용합니다
- 3도와 7도가 가장 중요 — 코드 색깔을 결정합니다
- 코드 변화 자리에서 다음 코드 3·7로 타깃팅합니다
- 음이 적어도 박자가 단단하면 음악적으로 들립니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Dm7-G7-Cmaj7 아르페지오'),
          description: i18('각 코드 1-3-5-7을 위로 짚어 올라갔다 내려옵니다. 박자 안에서 균일하게.'),
          bpm: 80,
        },
        {
          title: i18('타깃 코드톤'),
          description: i18('각 마디 마지막 음을 다음 코드의 3도 또는 7도로 떨어뜨립니다.'),
          bpm: 80,
        },
        {
          title: i18('한 음만 비코드톤'),
          description: i18('코드톤 솔로 안에 한 마디에 한 음만 비코드톤(접근음)을 끼워넣어 라인을 부드럽게 만듭니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Dm7, G7, Cmaj7의 1-3-5-7을 각각 즉시 짚습니다'),
          i18('아르페지오를 위·아래로 박자 안에서 연주'),
          i18('8마디를 끊김 없이 연주'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('코드 변화에서 다음 코드 3·7로 음을 떨어뜨립니다'),
          i18('백킹 위에서 1코러스를 끝까지'),
          i18('녹음에서 코드 변화가 솔로에 들립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('접근음·인클로저를 한 마디에 한 번씩 끼워넣습니다'),
          i18('5 키 이상에서 코드톤 솔로 가능'),
          i18('한 모티프를 코드 변화에 맞게 변형하며 발전'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 스탠다드에서도 즉시 코드톤 솔로가 가능합니다'),
          i18('코드톤·스케일·접근음을 의식 없이 자유롭게 오갑니다'),
        ],
      },
    ],
    selfCheck: [
      i18('각 코드의 1-3-5-7 아르페지오를 안다'),
      i18('코드 변화에 음을 떨어뜨린다'),
      i18('8마디를 끊김 없이'),
      i18('백킹 위에서 1코러스'),
    ],
    relatedTipSlugs: ['target-chord-tones'],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['chord-tones'],
  },
  {
    id: 'lf-so-2',
    slug: 'soloing-mode-mapping',
    trunkSlug: 'soloing',
    order: 2,
    title: i18('ii는 Dorian, V는 Mixolydian으로 친다'),
    description: i18('코드에 따라 스케일을 자동 전환.'),
    theory: {
      content: i18(`## 모드 매핑이 무엇인가

코드마다 어울리는 스케일이 있습니다.

- **ii(m7) → Dorian**
- **V(7) → Mixolydian**
- **I(maj7) → Ionian** (메이저 스케일)

이 짝을 외워두면 어떤 코드가 와도 즉시 사용할 스케일을 정할 수 있습니다.

핵심은 **세 모드가 모두 같은 모음에서 나온다**는 점입니다. C장조 ii-V-I (Dm7-G7-Cmaj7)에서 D Dorian, G Mixolydian, C Ionian은 모두 C 메이저 스케일의 음과 동일합니다. 한 키 안에서는 사용할 음 자체는 같고, 어느 음을 강조하느냐가 달라질 뿐입니다.

## 어떻게 들리는가

각 모드를 한 옥타브씩 연주해 보면 출발 음만 다를 뿐, 사용된 음은 모두 C 메이저 스케일입니다.

\`\`\`abc
X:1
T:D Dorian one octave
M:4/4
L:1/8
Q:1/4=80
K:C
|: D E F G A B c d | d c B A G F E D :|
\`\`\`

\`\`\`abc
X:1
T:G Mixolydian one octave
M:4/4
L:1/8
Q:1/4=80
K:C
|: G A B c d e f g | g f e d c B A G :|
\`\`\`

## 특징음은 무엇인가

같은 음 집합 안에서도 모드의 색깔을 살리려면 **특징음(characteristic note)** 을 의식해야 합니다.

- **Dorian**: 메이저 6도 (D Dorian의 B 음)
- **Mixolydian**: ♭7 (G Mixolydian의 F 음)

마이너 ii-V-i이나 키 센터가 바뀌는 진행에서는 모드 매핑이 달라집니다. 그래서 각 코드 → 모드 짝을 따로 외워두는 것이 중요합니다.

## 핵심 포인트

- ii(m7) → Dorian / V(7) → Mixolydian / I(maj7) → Ionian
- 같은 키 안에서는 음이 같고 강조점만 다릅니다
- 특징음: Dorian의 메이저 6도 / Mixolydian의 ♭7
- 키 센터가 바뀌면 새 키의 모드를 적용합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('각 모드 한 옥타브'),
          description: i18('D Dorian / G Mixolydian / C Ionian을 각각 한 옥타브씩 위·아래로 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('ii-V-I 모드 솔로'),
          description: i18('각 마디 시작 음을 코드의 루트에 두고 한 옥타브 라인을 만듭니다.'),
          bpm: 80,
        },
        {
          title: i18('특징음 강조'),
          description: i18('Dorian의 메이저 6도(B)와 Mixolydian의 ♭7(F)을 의도적으로 강조하며 솔로합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Dm7 위에서 D Dorian을 사용합니다'),
          i18('G7 위에서 G Mixolydian을 사용합니다'),
          i18('Cmaj7 위에서 C Ionian을 사용합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('코드 변화에 맞춰 스케일 시작 음을 자동 전환합니다'),
          i18('1코러스를 깔끔하게 끝까지'),
          i18('각 모드의 특징음을 의식적으로 강조'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('마이너 ii-V-i에서 적절한 모드 매핑(Locrian/HM5/Aeolian 등)'),
          i18('키 센터가 바뀌는 진행에서 모드를 즉시 옮깁니다'),
          i18('한 모드 안에서 짧은 시퀀스 패턴을 사용합니다'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 진행이든 즉시 적절한 모드를 떠올립니다'),
          i18('모드의 특징음만으로 짧은 모티프를 자유롭게 만듭니다'),
        ],
      },
    ],
    selfCheck: [
      i18('Dm7 위에서 D Dorian을 안다'),
      i18('G7 위에서 G Mixolydian을 안다'),
      i18('코드에 따라 스케일을 자동 전환'),
      i18('1코러스를 깔끔하게'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['mixolydian', 'dorian-tetrachord'],
  },
  {
    id: 'lf-so-3',
    slug: 'soloing-enclosure-12-keys',
    trunkSlug: 'soloing',
    order: 3,
    title: i18('타겟 음을 위아래에서 감싼다(인클로저)'),
    description: i18('타깃 위·아래로 둘러싸서 도착감을 강하게.'),
    theory: {
      content: i18(`## 인클로저가 무엇인가

인클로저(enclosure)는 **타겟 음을 위·아래의 인접한 음으로 감싸서** 그 자리에 더 강하게 도착시키는 기법입니다. 가장 단순한 형태는 B-D-C 또는 D-B-C 식으로 C를 둘러싼 다음 C에 떨어뜨리는 것입니다. 비밥 연주자들이 거의 모든 라인에서 사용합니다.

위·아래 음은 다이아토닉이어도 되고 반음(크로마틱)이어도 됩니다. 반음 인클로저가 더 긴장이 강하고, 다이아토닉 인클로저가 더 부드럽습니다. 둘을 섞어 쓰는 것이 일반적입니다.

## 네 가지 기본 패턴

C 음을 타겟으로 둘 때 자주 쓰는 네 가지 패턴은 다음과 같습니다.

\`\`\`abc
X:1
T:Four enclosure patterns landing on C
M:4/4
L:1/8
Q:1/4=80
K:C
|: B D C2 z4 | D B C2 z4 | ^C B C2 z4 | B ^C C2 z4 :|
\`\`\`

- 다이아토닉 아래 → 위: B D C
- 다이아토닉 위 → 아래: D B C
- 반음 위 → 다이아토닉 아래: C♯ B C
- 다이아토닉 아래 → 반음 위: B C♯ C

## 박자가 가장 중요하다

인클로저의 진짜 가치는 박자에 있습니다. **타겟 음이 강박(1박 또는 3박)에 떨어지도록** 인클로저의 시작 박자를 계산합니다. 일반적으로 인클로저는 8분음표 두 음으로 약박에서 시작해서 타겟이 1박에 닿게 만듭니다.

## 어디에 쓰는가

ii-V-I 진행에서 가장 효과적인 자리는 **코드 변화 직전**입니다. G7 마디의 마지막 박에서 Cmaj7의 3도(E)를 인클로저로 감싸면, Cmaj7 마디 1박에 E가 강하게 떨어집니다. 솔로의 흐름이 단번에 음악적으로 바뀝니다.

## 핵심 포인트

- 타겟 음을 위·아래 음으로 감싸 도착감을 강화합니다
- 반음(크로마틱)과 다이아토닉을 섞어 사용합니다
- 타겟이 강박에 떨어지도록 박자를 설계합니다
- 가장 강력한 자리는 코드 변화 직전입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('C 한 음 인클로저 패턴 4가지'),
          description: i18('B-D-C / D-B-C / C♯-B-C / B-C♯-C — 네 가지 인클로저를 박자 안에 정확히 연주합니다.'),
          bpm: 80,
        },
        {
          title: i18('타깃 = Cmaj7 3도'),
          description: i18('G7 마디 마지막 박에서 E를 인클로저로 감싸 Cmaj7 1박에 떨어뜨립니다.'),
          bpm: 80,
        },
        {
          title: i18('솔로에 자연스럽게 끼워넣기'),
          description: i18('1코러스 솔로 중에 인클로저를 두 번 사용해서 코드 변화를 분명히 들려줍니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('C를 위·아래 음으로 감싸 도착시킵니다'),
          i18('네 가지 인클로저 패턴을 박자 안에 연주합니다'),
          i18('타겟 음이 강박에 떨어집니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('G7→Cmaj7에서 3도(E)를 인클로저로 도착시킵니다'),
          i18('1코러스 안에 인클로저를 두 번 자연스럽게 사용'),
          i18('반음·다이아토닉 인클로저를 섞어 사용'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('12 키로 이동해도 인클로저 패턴을 즉시 적용'),
          i18('Bebop 8분음표 라인 안에 인클로저가 박자에 정확히 맞습니다'),
          i18('스탠다드 솔로에서 인클로저로 코드 변화를 표현'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 타겟 음이든 의식 없이 즉시 인클로저를 만듭니다'),
          i18('Charlie Parker 라인의 인클로저를 자기 어휘처럼 사용'),
        ],
      },
    ],
    selfCheck: [
      i18('C를 B-D-C 또는 D-B-C로 감싼다'),
      i18('G7→Cmaj7의 B(3도)를 인클로저로'),
      i18('12키로 이동'),
      i18('솔로 안에 자연스럽게 끼워넣는다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['enclosure'],
  },
  {
    id: 'lf-so-4',
    slug: 'soloing-bebop-line',
    trunkSlug: 'soloing',
    order: 4,
    title: i18('Bebop 스케일을 한 옥타브 친다'),
    description: i18('패싱톤이 박자에 맞아 떨어지는 8음 스케일.'),
    theory: {
      content: i18(`## Bebop 스케일이 무엇인가

Bebop 스케일은 일반 7음 스케일에 **한 개의 크로마틱 패싱톤**을 더한 8음 스케일입니다. 8분음표로 한 옥타브를 연주하면 모든 코드톤이 강박에 자동으로 떨어지도록 설계되어 있습니다.

대표 세 가지는 다음과 같습니다.

- **Bebop Dominant**: Mixolydian + ♮7 (G7 위) — G A B C D E F F♯ G
- **Bebop Major**: Ionian + ♭6 (Cmaj7 위) — C D E F G G♯ A B C
- **Bebop Minor**: Dorian + ♮3 (Dm7 위) — D E F F♯ G A B C D

## 왜 강박과 정렬되는가

8분음표 두 음이 한 박이므로, 8음 스케일을 위·아래로 연주하면 1·3·5·7번째 음이 정확히 강박에 위치합니다. 7음 스케일로는 강박·약박 사이에 어긋남이 생기지만, bebop 스케일은 이걸 보정해 줍니다.

\`\`\`abc
X:1
T:G Bebop Dominant — descending
M:4/4
L:1/8
Q:1/4=80
K:C
|: g f e d c B A ^F | G4 z4 :|
\`\`\`

내려갈 때 강박 위치에 G(루트), E(13), C(11), A(9)가 떨어지고, F♯ 패싱톤이 약박 자리에 자연스럽게 들어갑니다.

## ii-V-I에 어떻게 적용하는가

각 코드 마디마다 그 코드에 맞는 Bebop 스케일을 한 옥타브씩 깔아도 박자 정렬이 자동으로 됩니다.

\`\`\`abc
X:1
T:ii-V-I bebop scale phrase
M:4/4
L:1/8
Q:1/4=100
K:C
|: d e f ^f g a B c | g f e d c B A ^F | E4 z4 z4 :|
\`\`\`

## 핵심 포인트

- 7음 스케일 + 1 패싱톤 = 8음
- 8분음표 연주 시 코드톤이 강박에 자동 정렬됩니다
- 세 가지: Bebop Dominant / Major / Minor
- 라인을 만들 때도 "강박 = 코드톤" 원칙을 유지합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('G Bebop Dominant 한 옥타브'),
          description: i18('G에서 한 옥타브 위까지 8음 모두를 8분음표로 연주합니다. 강박에 코드톤이 떨어지는 것을 확인.'),
          bpm: 80,
        },
        {
          title: i18('Bebop Major / Minor 비교'),
          description: i18('C Bebop Major와 D Bebop Minor를 같은 BPM으로 연주하고 패싱톤 위치 차이를 들어봅니다.'),
          bpm: 80,
        },
        {
          title: i18('ii-V-I에 적용'),
          description: i18('Dm7 = D Bebop Minor, G7 = G Bebop Dominant, Cmaj7 = C Bebop Major. 8분음표 라인으로 연결.'),
          bpm: 100,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('세 가지 Bebop 스케일의 구성 차이를 압니다'),
          i18('G Bebop Dominant를 한 옥타브 연주'),
          i18('강박에 코드톤이 떨어지는 것을 확인'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('8분음표로 BPM 100에서 한 옥타브'),
          i18('ii-V-I 위에 세 Bebop을 차례로 적용'),
          i18('패싱톤이 약박에 자연스럽게 들어갑니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('BPM 140에서도 안정적으로 연주'),
          i18('라인 안에 인클로저·시퀀스를 섞으면서 강박 정렬 유지'),
          i18('5 키 이상에서 Bebop 라인 사용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('BPM 200에서도 8분음표 Bebop 라인을 정확히 연주'),
          i18('Charlie Parker, Pat Martino 라인의 Bebop 구조를 즉시 인식'),
        ],
      },
    ],
    selfCheck: [
      i18('Bebop Major / Mixolydian / Minor 차이를 안다'),
      i18('G Bebop Dominant 한 옥타브'),
      i18('8분음표로 BPM 100'),
      i18('ii-V-I 위에 적용 시도'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-licks'],
  },
  {
    id: 'lf-so-5',
    slug: 'soloing-altered-scale',
    trunkSlug: 'soloing',
    order: 5,
    title: i18('V7alt 위에 Altered Scale을 친다'),
    description: i18('G Altered = Ab Jazz Minor — 해결감 만드는 도구.'),
    theory: {
      content: i18(`## Altered Scale이 무엇인가

Altered scale은 V7alt 코드 위에서 사용하는 스케일로, 모든 가능한 텐션(♭9, ♯9, ♯11, ♭13)을 포함합니다. 7음 스케일이지만 **1, 3, ♭7만 코드톤**이고 나머지는 모두 텐션입니다.

G Altered scale의 음은 다음과 같습니다.

G - A♭(♭9) - B♭(♯9) - B(3) - D♭(♯11) - E♭(♭13) - F(♭7) - G

## 가장 쉬운 외우는 방법

가장 쉬운 방법은 **반음 위 Jazz Minor**로 외우는 것입니다. G Altered는 A♭ Jazz Minor(A♭ 멜로딕 마이너의 상행 형태)와 완전히 같은 음 집합입니다.

A♭ - B♭ - B - C♯ - E♭ - F - G

즉 V7alt 위에서는 반음 위 자리의 jazz minor 운지를 그대로 짚으면 됩니다.

\`\`\`abc
X:1
T:G Altered = Ab Jazz Minor
M:4/4
L:1/8
Q:1/4=80
K:C
|: _A _B =B ^c _e f g _a | _a g f _e ^c =B _B _A :|
\`\`\`

## 왜 해결감이 강한가

♯9·♭13 같은 음이 모두 **I 코드톤으로 반음 해결**되기 때문입니다.

- A♭(♭9) → G(I의 5도)
- B♭(♯9) → B(I의 7도)
- E♭(♭13) → E(I의 3도)

청자에게 "이제 풀려야 한다"는 압박을 강하게 주고, 짧은 한 마디로도 강력한 카타르시스를 만들어 냅니다.

## 어떻게 연습하는가

C장조 ii-V-I에서 V7 자리를 V7alt로 바꾸고 G Altered를 솔로에 사용합니다. 위·아래로 연주하면서 마지막 음을 Cmaj7의 코드톤(특히 3도 E)으로 떨어뜨립니다. 처음에는 1마디만 사용합니다. 솔로 전체를 Altered로 채우면 어지러워집니다.

## 핵심 포인트

- G Altered = A♭ Jazz Minor (반음 위 자리)
- 모든 텐션 포함: ♭9, ♯9, ♯11, ♭13
- I 코드톤으로 반음 해결되는 구조입니다
- 처음에는 1마디만, 점차 자유롭게 사용합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('A♭ Jazz Minor 한 옥타브'),
          description: i18('A♭부터 한 옥타브를 위·아래로 부드럽게 연주합니다. 이게 G7alt 위에서 사용할 음들입니다.'),
          bpm: 80,
        },
        {
          title: i18('G7alt 1마디 → Cmaj7'),
          description: i18('G7alt 마디에서 A♭ Jazz minor 라인을 연주하다가 Cmaj7 마디 1박에 E(3도)로 떨어뜨립니다.'),
          bpm: 80,
        },
        {
          title: i18('해결 음 의식'),
          description: i18('A♭(♭9)→G, B♭(♯9)→B 식의 반음 해결을 의식하며 라인 끝을 만듭니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('G Altered = A♭ Jazz Minor 관계를 압니다'),
          i18('한 포지션을 위·아래로 연주'),
          i18('I 코드톤으로 자연스럽게 해결'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('ii-V-I 안에서 V7alt 1마디를 Altered로 연주'),
          i18('해결 자리(♭9→5 등)를 의식하며 마무리'),
          i18('녹음에서 해결의 카타르시스가 들립니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('5 키 이상에서 Altered 라인 사용'),
          i18('Sunny 같은 마이너 ii-V에서 Altered 적용'),
          i18('Altered와 Half-Whole dim을 의도적으로 구분 사용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 V7 자리든 즉시 Altered로 대체할 수 있습니다'),
          i18('Altered 라인을 자기 어휘처럼 자유롭게 변형'),
        ],
      },
    ],
    selfCheck: [
      i18('G Altered = Ab Jazz Minor를 안다'),
      i18('한 포지션을 위/아래로'),
      i18('G7alt → Cmaj7 해결'),
      i18('솔로 안에 1마디 끼워넣는다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['altered-chord'],
  },
  {
    id: 'lf-so-6',
    slug: 'soloing-signature-lick-quote',
    trunkSlug: 'soloing',
    order: 6,
    title: i18('ii-V-I 릭 3개를 자기 솔로에 자연스럽게 인용'),
    description: i18('외운 라인을 자신의 흐름 안에 녹여넣기.'),
    theory: {
      content: i18(`## 릭이 무엇인가

릭(lick)은 한 마디에서 두세 마디 분량의 짧은 멜로디 라인으로, **한 진행(주로 ii-V-I)에 정확히 어울리는 어휘**입니다. 솔로 중에 자기 라인 안에 자연스럽게 끼워넣어 사용합니다.

릭을 외우는 것은 모방이 아니라 "어휘 학습"입니다. 외국어를 배울 때 단어와 문장을 외우는 것과 같습니다. 외운 릭이 일정 수에 이르면, 같은 패턴들이 코드 변화에 어떻게 반응하는지가 머리에 들어옵니다. 거기서부터 자신만의 변형이 가능해집니다.

좋은 릭의 조건은 다음과 같습니다.

1. 박자가 단단합니다
2. 코드 변화에 정확히 떨어집니다
3. 자기 솔로 흐름과 자연스럽게 이어집니다

## 표준 ii-V-I 릭 예시

가장 일반적인 비밥 ii-V-I 릭의 형태입니다. Dm7 마디에서 코드톤을 거쳐 G7 마디에서 ♭9 텐션을 짚고, Cmaj7의 3도(E)에 해결합니다.

\`\`\`abc
X:1
T:Common bebop ii-V-I lick template
M:4/4
L:1/8
Q:1/4=80
K:C
|: A F D F A c d c | B G F _A G F E D | E4 z4 :|
\`\`\`

이건 어떤 특정 곡의 라인이 아니라, 코드톤 + 인클로저 + ♭9 텐션이라는 비밥의 일반 어휘를 조합한 교본 라인입니다.

## 어떻게 학습하는가

먼저 릭 하나를 음과 박자 모두 정확히 외웁니다. 그 다음 5 키로 옮겨 연주해 같은 라인이 다른 위치에서 어떻게 다르게 들리는지 들어 봅니다. 익숙해지면 솔로 1코러스에 그 릭을 한 번만 등장시킵니다. 너무 자주 쓰면 솔로가 인용으로만 들립니다.

릭 3개가 안정되면 자기 어휘로 변형하는 단계로 넘어갑니다. 릭의 시작 음이나 끝 음을 다른 코드톤으로 바꾸는 식입니다.

## 핵심 포인트

- 릭 = 어휘 학습 — 외울수록 자유로워집니다
- 한 릭 → 12 키 → 솔로에 한 번 등장
- 한 코러스에 인용은 1-2번이 적당합니다
- 익숙해지면 변형으로 자기 라인을 만듭니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('릭 1개 정확히 외우기'),
          description: i18('한 ii-V-I 릭을 음과 박자 모두 정확히 외워서 10번 반복합니다.'),
          bpm: 80,
        },
        {
          title: i18('5 키로 이동'),
          description: i18('같은 릭을 C, F, B♭, E♭, G로 옮겨 연주합니다. 같은 운지 모양이 위치만 옮겨집니다.'),
          bpm: 80,
        },
        {
          title: i18('솔로에 한 번 삽입'),
          description: i18('1코러스 솔로 안에 그 릭을 한 번만 자연스럽게 등장시킵니다. 앞뒤가 부드럽게 이어지도록 다듬습니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('릭 1개를 음과 박자 모두 정확히 외웠습니다'),
          i18('박자 안에서 끊김 없이 연주'),
          i18('5 키로 옮겨 연주합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('릭 2개를 외웠습니다'),
          i18('솔로 1코러스 안에 릭을 한 번 자연스럽게 사용'),
          i18('앞뒤 라인이 부드럽게 이어집니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('릭 3개를 외웠습니다'),
          i18('릭의 시작/끝을 자기 변형으로 살짝 바꿔 사용'),
          i18('다른 스탠다드의 ii-V-I 자리에도 자연스럽게 적용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('수십 개 릭을 자기 어휘처럼 자유롭게 사용'),
          i18('릭을 의식하지 않고 자기 라인 안에 녹여넣습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('릭 1개를 외워서 5키로 연주'),
      i18('릭 2개를 외운다'),
      i18('릭 3개를 외운다'),
      i18('솔로 안에서 자연스럽게 삽입'),
    ],
    relatedTipSlugs: ['repeat-and-vary'],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-licks'],
  },

  // Ear training
  {
    id: 'lf-er-1',
    slug: 'ear-interval-recognition',
    trunkSlug: 'ear-training',
    order: 1,
    title: i18('12 인터벌을 80% 정답률로 듣는다'),
    description: i18('두 음을 듣고 인터벌을 즉시 식별.'),
    theory: {
      content: i18(`## 인터벌 청음이 무엇인가

인터벌(interval)은 두 음 사이의 거리입니다. 모든 멜로디·코드·스케일은 결국 인터벌의 조합입니다. 그래서 두 음을 듣고 인터벌을 즉시 식별하는 능력이 **청음의 모든 기초**가 됩니다.

12 인터벌은 m2(반음)부터 P8(옥타브)까지입니다.

\`\`\`abc
X:1
T:Twelve ascending intervals from C
M:4/4
L:1/4
Q:1/4=70
K:C
|: C ^C2 z | C D2 z | C _E2 z | C E2 z |
 C F2 z | C ^F2 z | C G2 z |
 C _A2 z | C A2 z | C _B2 z | C B2 z | C c2 z :|
\`\`\`

## 멜로디 단서로 외우기

각 인터벌에 단순한 멜로디 단서를 짝지어 두면 외우기 쉽습니다. P4는 "결혼 행진곡 시작", P5는 "스타워즈 테마", m3은 "Greensleeves" 식입니다.

## 헷갈리는 짝

처음에 가장 헷갈리는 조합은 다음과 같습니다.

- M3 ↔ P4
- P5 ↔ m6
- TT(트라이톤) ↔ 다른 모든 것

이 헷갈리는 짝만 따로 드릴하면 정답률이 빠르게 올라갑니다.

## 어떻게 연습하는가

매일 5분 인터벌 드릴을 합니다. 앱(EarMaster, Functional Ear Trainer 등)에서 12 인터벌을 무작위로 듣고 즉시 답합니다. 처음에는 답하기 전에 익숙한 멜로디 단서를 떠올려도 됩니다. 익숙해지면 단서 없이 즉시 답합니다.

## 핵심 포인트

- 12 인터벌 = 모든 멜로디·코드의 기초입니다
- 각 인터벌에 멜로디 단서를 짝지어 외웁니다
- 헷갈리는 짝(M3↔P4, P5↔m6)만 따로 드릴합니다
- 매일 5분, 80% 정답률을 목표로 합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('상행 인터벌 5분 드릴'),
          description: i18('m2부터 P8까지 12 인터벌을 상행으로 무작위 5분 드릴. 즉시 답하기.'),
        },
        {
          title: i18('하행 인터벌 드릴'),
          description: i18('같은 인터벌을 하행으로 들으며 답합니다. 하행은 상행보다 어렵습니다.'),
        },
        {
          title: i18('헷갈리는 짝 집중'),
          description: i18('M3 vs P4, P5 vs m6, TT vs 다른 인터벌만 집중 드릴.'),
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('m2, M2, m3, M3을 80% 정답률로 식별'),
          i18('P4, TT, P5를 80% 정답률로 식별'),
          i18('각 인터벌에 멜로디 단서를 짝지을 수 있습니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('m6, M6, m7, M7, P8을 80% 정답률로 식별'),
          i18('헷갈리는 짝(M3↔P4 등)을 90% 이상 구분'),
          i18('상행·하행 모두 동일한 정답률'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('12 인터벌 전체 90% 정답률'),
          i18('단서 없이 즉시 답합니다 (1초 내)'),
          i18('두 음을 동시 들을 때(화성 인터벌)도 식별'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('짧은 멜로디를 들으며 인터벌 시퀀스를 즉시 받아쓰기'),
          i18('절대음감 없이도 곡 카피를 빠르게 시작합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('m2, M2, m3, M3을 듣는 즉시 안다'),
      i18('P4, TT, P5를 안다'),
      i18('m6, M6, m7, M7, P8을 안다'),
      i18('인터벌 청음 드릴 80% 이상'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: [],
  },
  {
    id: 'lf-er-2',
    slug: 'ear-chord-quality',
    trunkSlug: 'ear-training',
    order: 2,
    title: i18('5가지 코드 퀄리티를 듣고 식별한다'),
    description: i18('Maj7 / m7 / 7 / m7b5 / dim7을 구별.'),
    theory: {
      content: i18(`## 코드 퀄리티 청음이 무엇인가

곡 카피의 두 번째 단계는 코드 퀄리티를 듣고 식별하는 것입니다. 멜로디만으로는 한 곡을 완성할 수 없고, 코드 진행을 읽어야 비로소 곡 구조가 보입니다.

다섯 가지 7th 코드의 색깔은 다음과 같이 묘사할 수 있습니다.

- **Maj7**: 밝고 살짝 떠 있는 느낌 (메이저 3도 + 메이저 7도)
- **m7**: 어둡지만 안정적 (마이너 3도 + ♭7)
- **7 (Dominant)**: 긴장이 있고 어딘가로 가고 싶어 합니다 (메이저 3도 + ♭7)
- **m7♭5**: 무거우면서 불안정 (마이너 3도 + ♭5 + ♭7)
- **dim7**: 긴장이 가장 높고 어디로든 풀릴 수 있음 (모두 단3도 적층)

## 같은 루트로 비교하기

가장 효과적인 학습법은 한 루트에서 5가지 코드를 차례로 들어 보는 것입니다. C 루트로 다섯 코드를 비교합니다.

\`\`\`chord
chord: Cmaj7
caption: 밝고 살짝 떠 있는
\`\`\`

\`\`\`chord
chord: Cm7
caption: 어둡지만 안정적
\`\`\`

\`\`\`chord
chord: C7
caption: 긴장 — 어디론가 가고 싶은
\`\`\`

\`\`\`chord
chord: Cm7b5
caption: 무겁고 불안정
\`\`\`

\`\`\`chord
chord: Cdim7
caption: 긴장 최대 — 어디로든 풀릴 수 있는
\`\`\`

## 어떻게 연습하는가

처음에 가장 쉬운 구분은 Maj7 vs m7입니다. 메이저 3도와 마이너 3도의 색깔 차이만 듣습니다. 그 다음 m7 vs 7 — 둘 다 ♭7이지만 3도가 다릅니다. 익숙해지면 다른 루트에서 무작위로 듣고 답합니다.

## 핵심 포인트

- Maj7 = 밝음 / m7 = 어두움 / 7 = 긴장
- m7♭5 = 무거움 / dim7 = 가장 긴장
- 같은 루트에서 5 퀄리티 비교 → 무작위 드릴 순서
- 80% 정답률이 합격선입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('같은 루트 5 퀄리티 비교'),
          description: i18('C 루트로 Cmaj7 → Cm7 → C7 → Cm7♭5 → Cdim7을 차례로 들어 색깔 차이를 익힙니다.'),
        },
        {
          title: i18('무작위 호명 드릴'),
          description: i18('앱(EarMaster 등)에서 5 퀄리티를 무작위로 들으며 즉시 답합니다.'),
        },
        {
          title: i18('곡에서 코드 찾기'),
          description: i18('좋아하는 재즈 곡의 첫 4마디를 듣고 각 코드 퀄리티를 받아쓰기.'),
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Maj7과 m7을 안정적으로 구분'),
          i18('7과 m7을 구분'),
          i18('같은 루트에서 5 퀄리티 색깔 차이를 압니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('m7♭5와 m7을 구분'),
          i18('dim7을 식별'),
          i18('무작위 드릴 80% 정답률'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('5 퀄리티 90% 정답률'),
          i18('실제 곡에서 코드 퀄리티를 받아쓰기'),
          i18('9·11·13 확장 코드도 식별 시도'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('스탠다드 1코러스 전체 코드를 한 번 듣고 받아쓰기'),
          i18('인버전·텐션까지 식별합니다'),
        ],
      },
    ],
    selfCheck: [
      i18('Maj7과 m7을 구분'),
      i18('7과 m7을 구분'),
      i18('m7b5와 m7을 구분'),
      i18('dim7을 식별'),
      i18('코드 퀄리티 청음 드릴 80% 이상'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: [],
  },
  {
    id: 'lf-er-3',
    slug: 'ear-iivi-progression',
    trunkSlug: 'ear-training',
    order: 3,
    title: i18('ii-V-I 진행을 듣고 키를 맞춘다'),
    description: i18('진행을 듣고 핵심 톤과 키를 찾는다.'),
    theory: {
      content: i18(`## ii-V-I 진행 청음이 무엇인가

곡을 카피할 때 가장 먼저 찾아야 할 것은 키입니다. ii-V-I 진행은 재즈에서 가장 흔한 형태이고, 이 진행이 들리면 곡의 키 센터가 즉시 보입니다.

ii-V-I의 청각적 특징은 세 단계의 "어둠 → 긴장 → 안정" 흐름입니다.

- **ii (m7)**: 어두운 출발
- **V (7)**: 어딘가로 끌리는 긴장
- **I (maj7)**: 풀림, 안정

한 번 듣고 마지막 코드(I)의 루트를 찾으면 그게 키입니다.

\`\`\`abc
X:1
T:ii-V-I in C — guide tone outline
M:4/4
L:1/4
Q:1/4=70
K:C
|: [Fc]2 [Fc]2 | [FB]2 [FB]2 | [EB]4 :|
\`\`\`

## 메이저와 마이너의 차이

같은 ii-V-I이라도 메이저(I로 해결)와 마이너(i로 해결)는 분위기가 다릅니다. 메이저 진행은 Dm7 - G7 - Cmaj7, 마이너 진행은 Dm7♭5 - G7 - Cm. ii가 m7인지 m7♭5인지가 가장 먼저 들리는 단서입니다.

스탠다드는 한 곡 안에 여러 개의 ii-V-I이 등장합니다. Autumn Leaves는 메이저 ii-V-I과 마이너 ii-V-i가 교차하고, All The Things You Are는 네 개의 키 센터가 ii-V-I으로 바뀝니다.

## 어떻게 연습하는가

먼저 C장조 ii-V-I 백킹 트랙을 듣고 마지막 코드의 루트(C)를 찾는 연습. 그 다음 다른 키의 ii-V-I 트랙을 듣고 키만 답합니다. 실제 곡으로 넘어가면 첫 8마디에서 ii-V-I 구간을 찾아내는 것이 목표입니다.

## 핵심 포인트

- ii-V-I = "어둠 → 긴장 → 안정"
- 마지막 I 코드 루트가 곡의 키입니다
- 한 곡에 여러 ii-V-I이 들어있는 경우가 많습니다
- 첫 8마디 분석이 곡 카피의 시작입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('백킹 트랙 키 맞추기'),
          description: i18('C장조 ii-V-I 백킹을 듣고 I의 루트를 흥얼거리며 찾습니다.'),
        },
        {
          title: i18('다른 키 ii-V-I 식별'),
          description: i18('F, B♭, E♭ 장조 ii-V-I을 무작위로 듣고 키를 답합니다.'),
        },
        {
          title: i18('실제 곡 분석'),
          description: i18('Autumn Leaves 처음 8마디를 듣고 ii-V-I과 ii-V-i 구간을 표시합니다.'),
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('ii-V-I을 듣고 마지막 코드 루트를 찾습니다'),
          i18('어둠→긴장→안정 흐름을 인지'),
          i18('C장조 ii-V-I을 즉시 식별'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('다른 키 ii-V-I 키 식별'),
          i18('두 번 들어서 모든 코드 받아쓰기'),
          i18('마이너 ii-V-i 진행도 식별'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('실제 곡에서 ii-V 구간을 찾아냅니다'),
          i18('Autumn Leaves의 키 센터 변화를 추적'),
          i18('스탠다드 한 곡의 코드 진행 80% 받아쓰기'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('처음 듣는 스탠다드의 진행을 1코러스 안에 파악'),
          i18('전조·세컨더리 도미넌트도 즉시 들립니다'),
        ],
      },
    ],
    selfCheck: [
      i18('ii-V-I을 듣고 핵심 톤(1)을 찾는다'),
      i18('키를 안다'),
      i18('두 번 들어서 받아쓴다'),
      i18('실제 곡에서 ii-V 구간을 찾아낸다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['iivi-theory'],
  },
  {
    id: 'lf-er-4',
    slug: 'ear-melody-dictation',
    trunkSlug: 'ear-training',
    order: 4,
    title: i18('4마디 멜로디를 받아쓴다'),
    description: i18('짧은 멜로디 → 4마디 프레이즈 → 솔로 카피로 확장.'),
    theory: {
      content: i18(`## 멜로디 받아쓰기가 무엇인가

멜로디 받아쓰기는 청음의 최종 단계입니다. 인터벌과 코드 청음이 단단해진 다음, 한 멜로디를 들으며 음을 종이에 (또는 기타 위에) 적어 내려가는 능력입니다. 이게 가능해지면 어떤 곡이든 들으면서 익힐 수 있습니다.

## 짧게 끊어서 듣기

가장 좋은 방법은 짧은 단위부터 시작하는 것입니다.

- 4음 (2박)
- 8음 (한 마디)
- 4마디 (한 프레이즈)
- 8마디 (반 코러스)

한 번에 길게 듣지 말고 짧게 끊어서 반복해 듣습니다. 한 번 들으면 머릿속에서 흥얼거릴 수 있을 때까지 멈추지 않습니다.

## 도수로 듣기

음을 받아쓸 때는 절대 음정이 아니라 **키 안에서의 도수**로 듣는 것이 더 빠릅니다. 예를 들어 C장조의 멜로디 \`C - E - G - C\`를 도수로 들으면 \`1 - 3 - 5 - 1\` 입니다.

\`\`\`abc
X:1
T:Simple melody — degrees 1-3-5-1
M:4/4
L:1/4
Q:1/4=80
K:C
|: C E G c | c G E C :|
\`\`\`

익숙해지면 키만 알면 멜로디 전체가 도수로 자연스럽게 들립니다.

## 어떻게 연습하는가

매일 5분 멜로디 받아쓰기를 합니다. 시작은 동요 같은 단순한 멜로디. 익숙해지면 재즈 스탠다드의 멜로디로 옮깁니다. 마지막 단계는 좋아하는 솔로를 4마디씩 카피하는 것입니다. 솔로 카피는 어휘 습득의 가장 강력한 도구입니다.

## 핵심 포인트

- 짧게 끊어서 반복해 듣기 (4음 → 8음 → 4마디)
- 절대 음정이 아니라 키 안에서의 도수로 듣습니다
- 흥얼거릴 수 있을 때까지 멈추지 않습니다
- 솔로 카피가 어휘 습득의 최종 도구입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('4음 멜로디 받아쓰기'),
          description: i18('익숙한 동요의 첫 4음을 듣고 기타로 따라 칩니다.'),
        },
        {
          title: i18('스탠다드 멜로디'),
          description: i18('Autumn Leaves 멜로디 첫 4마디를 듣고 받아씁니다. 도수로 분석.'),
        },
        {
          title: i18('솔로 카피'),
          description: i18('Kenny Burrell 블루스 솔로의 4마디를 카피합니다. 음과 박자 모두.'),
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('4음 멜로디를 받아쓰기'),
          i18('동요 한 곡 멜로디 카피'),
          i18('키 안에서 도수로 듣기 시작'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('8음 멜로디 받아쓰기'),
          i18('스탠다드 4마디 멜로디 카피'),
          i18('한 번 들어서 흥얼거릴 수 있습니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('4마디(한 프레이즈) 받아쓰기'),
          i18('Kenny Burrell 솔로 4마디 카피'),
          i18('마이너 키 멜로디도 자연스럽게 받아쓰기'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('한 솔로 1코러스를 통째로 카피'),
          i18('실시간으로 들으며 멜로디를 따라 칠 수 있습니다'),
        ],
      },
    ],
    selfCheck: [
      i18('4음 멜로디 받아쓰기'),
      i18('8음 멜로디 받아쓰기'),
      i18('4마디(한 프레이즈) 받아쓰기'),
      i18('Kenny Burrell 솔로 4마디 받아쓰기'),
    ],
    relatedTipSlugs: ['kenny-burrell-quote-1'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: [],
  },

  // Standards
  {
    id: 'lf-st-1',
    slug: 'standard-autumn-leaves-comp',
    trunkSlug: 'standards',
    order: 1,
    title: i18('Autumn Leaves 코드 진행을 외워서 컴핑한다'),
    description: i18('32마디 코드 진행을 악보 없이.'),
    theory: {
      content: i18(`## Autumn Leaves가 입문곡인 이유

Autumn Leaves는 재즈 스탠다드의 입문곡으로 가장 자주 추천됩니다. 두 가지 이유 때문입니다.

1. 진행이 **장조 ii-V-I과 단조 ii-V-i 두 가지의 반복**으로만 구성되어 있어 단순합니다
2. 32마디 AABC 형태로 곡의 구조가 분명히 들립니다

## A 섹션 진행 (Gm 키 기준)

\`\`\`
| Cm7 | F7 | B♭maj7 | E♭maj7 |
| Am7♭5 | D7 | Gm7 | Gm7 |
\`\`\`

전반 4마디가 B♭장조 ii-V-I, 후반 4마디가 G단조 ii-V-i입니다. 이 두 진행이 곡 전체에서 반복됩니다.

\`\`\`chord
chord: Cm7
caption: ii (B♭ 장조)
\`\`\`

\`\`\`chord
chord: Am7b5
caption: ii (G 단조)
\`\`\`

\`\`\`chord
chord: D7
caption: V (G 단조 — 보통 V7alt로 처리)
\`\`\`

## 도수로 외우기

곡을 외우는 비결은 진행을 **도수**로 외우는 것입니다. "ii-V-I in B♭ / ii-V-i in Gm" 식으로 기능으로 외우면 키를 바꿔서 연주할 때도 즉시 적용할 수 있습니다.

## 어떻게 연습하는가

처음에는 A 섹션 8마디만 BPM 80에서 끊김 없이 컴핑합니다. 보이싱은 셸 코드(1-3-7) 또는 두 자리 Drop 2 중 선택. 익숙해지면 B 섹션과 C 섹션을 추가하고, 32마디 전체를 외워서 컴핑합니다.

## 핵심 포인트

- 두 가지 ii-V-I(장조 + 단조)의 반복입니다
- 32마디 AABC 형태
- 도수로 외우면 키 이동이 자유롭습니다
- 셸 코드 또는 Drop 2로 시작합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('A 섹션 8마디 컴핑'),
          description: i18('A 섹션을 셸 코드 또는 Drop 2로 BPM 80에서 1분 끊김 없이 반복합니다.'),
          bpm: 80,
        },
        {
          title: i18('B+C 섹션 추가'),
          description: i18('B 섹션(또 다른 A) → C 섹션(브릿지)를 차례로 추가해 전체 32마디를 완성합니다.'),
          bpm: 80,
        },
        {
          title: i18('다른 키로 이동'),
          description: i18('익숙한 키에서 반음 위/아래로 이동해 같은 진행을 도수로 연주합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-autumn-leaves-bm'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('A 섹션 코드 진행을 외웠습니다'),
          i18('한 마디씩 정확한 보이싱으로 잡습니다'),
          i18('A 섹션 8마디를 끊김 없이 컴핑'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('전체 32마디 코드 진행을 외웠습니다'),
          i18('BPM 80에서 끊김 없이 컴핑'),
          i18('두 가지 ii-V-I 구조를 도수로 인지'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('다른 키(원곡 키 외)로 컴핑'),
          i18('자연스러운 컴핑 리듬(Charleston 등) 사용'),
          i18('V7 자리에 텐션·alt 추가'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 키든 즉시 컴핑'),
          i18('잼 세션에서 솔로이스트를 리드하는 컴핑'),
        ],
      },
    ],
    selfCheck: [
      i18('A 섹션 코드 진행 외움(Cm7-F7-Bbmaj7-Ebmaj7-Am7b5-D7-Gm7)'),
      i18('전체 32마디 외움'),
      i18('BPM 80에서 끊김 없이 컴핑'),
      i18('다른 키로 시도'),
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
    title: i18('Autumn Leaves 위에서 1코러스 솔로한다'),
    description: i18('코드 진행을 의식하면서 한 모티프를 발전시킨다.'),
    theory: {
      content: i18(`## Autumn Leaves 솔로의 출발점

Autumn Leaves 솔로는 첫 스탠다드 솔로로 가장 적합합니다. **두 가지 ii-V만** 있기 때문에 솔로 어휘를 적용하기 쉽습니다.

- 장조 ii-V-I → Dorian / Mixolydian / Ionian (또는 Bebop Major)
- 단조 ii-V-i → Locrian → HM5(Harmonic Minor 5도 모드) → 멜로딕 마이너

## 3단계 학습 순서

**1단계: 코드톤만으로 1코러스 완주.** 각 마디에 그 코드의 1-3-5-7만 사용해서 박자 안에 떨어뜨립니다. 음이 적어 보이지만 코드 변화가 솔로에서 분명히 들려서 자연스럽습니다.

**2단계: ii-V 변화 자리 타깃 코드톤.** 예를 들어 Am7♭5 마디의 마지막 음을 D7의 3도(F♯)로 떨어뜨립니다. 그러면 단조 ii → V 변화가 솔로에서 명확하게 들립니다.

\`\`\`abc
X:1
T:Minor ii-V — target the 3rd of V
M:4/4
L:1/8
Q:1/4=80
K:C
|: A c _e g _e c A G | ^F D A2 z4 :|
\`\`\`

**3단계: 모티프 발전.** 첫 4마디에 짧은 모티프 하나를 만들고, 그 모티프를 다음 4마디에서 한 음만 바꿔 변형합니다. C 섹션에서 다시 변형. 같은 모티프를 발전시키면 32마디 전체에 일관된 흐름이 생깁니다.

## 핵심 포인트

- 1단계: 코드톤만으로 1코러스
- 2단계: ii-V 변화 자리에서 다음 V의 3도로 타깃팅
- 3단계: 첫 4마디 모티프를 곡 전체에 발전시키기
- 음이 적어도 박자가 단단하면 음악적입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('코드톤 1코러스'),
          description: i18('각 마디에 그 코드의 1-3-5-7만 사용해 32마디를 끊김 없이 솔로.'),
          bpm: 80,
        },
        {
          title: i18('타깃 코드톤'),
          description: i18('각 ii-V 자리에서 다음 코드의 3·7로 타깃팅하며 솔로.'),
          bpm: 80,
        },
        {
          title: i18('모티프 발전'),
          description: i18('첫 4마디 모티프를 만들고 그 모티프를 변형해 32마디 전체에 일관된 흐름을 만듭니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-autumn-leaves-bm'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('코드톤만으로 1코러스 완주'),
          i18('박자가 흐트러지지 않습니다'),
          i18('각 마디 코드톤이 즉시 떠오릅니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('ii-V 변화를 솔로에서 분명히 표현'),
          i18('타깃 코드톤이 강박에 떨어집니다'),
          i18('32마디 일관된 흐름'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('한 모티프를 32마디에서 두세 번 발전'),
          i18('Bebop·Altered 등 다양한 어휘 사용'),
          i18('마이너 ii-V에 HM5/멜로딕 마이너 적용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 키에서도 즉시 1코러스 솔로'),
          i18('잼 세션에서 자기 솔로를 자신있게 연주'),
        ],
      },
    ],
    selfCheck: [
      i18('코드톤만으로 1코러스'),
      i18('ii-V 변화를 표현'),
      i18('한 모티프를 발전'),
      i18('32마디 일관된 흐름'),
    ],
    relatedTipSlugs: ['target-chord-tones'],
    relatedBackingTrackIds: ['bt-autumn-leaves-bm'],
    relatedPrincipleSlugs: ['autumn-leaves', 'iivi-licks'],
  },
  {
    id: 'lf-st-3',
    slug: 'standard-blue-bossa',
    trunkSlug: 'standards',
    order: 3,
    title: i18('Blue Bossa 코드 진행을 외운다'),
    description: i18('16마디, 모달 변화(C단조 → Db장조).'),
    theory: {
      content: i18(`## Blue Bossa가 어떻게 구성되어 있는가

Blue Bossa는 16마디 보사노바 스탠다드입니다. 진행이 단순해서 입문자도 접근하기 좋습니다. **두 키 센터가 교대로 등장하는 것**이 특징입니다.

## 16마디 진행 구조

\`\`\`
| Cm7 | Cm7 | Fm7 | Fm7 |
| Cm7 | Cm7 | Dm7♭5 | G7 |
| Cm7 | Cm7 | E♭m7 | A♭7 |
| D♭maj7 | D♭maj7 | Dm7♭5 | G7 |
\`\`\`

크게 두 부분으로 나뉩니다.

- **1-8마디**: C 마이너 (i - iv - i - ii⁰ - V)
- **9-12마디**: D♭ 메이저로 ♭II 전조 (E♭m7 - A♭7 - D♭maj7 = D♭ 장조 ii-V-I)
- **13-16마디**: 다시 C 마이너 ii-V로 복귀

\`\`\`chord
chord: Cm7
caption: C 단조 i
\`\`\`

\`\`\`chord
chord: Dm7b5
caption: C 단조 ii⁰
\`\`\`

\`\`\`chord
chord: G7
caption: C 단조 V (V7alt로 자주 처리)
\`\`\`

## ♭II 전조의 매력

9-12마디의 D♭장조 부분이 곡의 색깔을 결정합니다. C 단조에서 반음 위 D♭ 장조로 옮겨갔다가 다시 돌아오는 흐름이 청자에게 "잠시 다른 세상에 다녀온 듯한" 느낌을 줍니다. 솔로에서도 이 부분만 D♭ Ionian(또는 D♭ Lydian)으로 잠시 전환하면 색깔 변화가 자연스럽게 표현됩니다.

## 어떻게 연습하는가

먼저 컴핑부터 외웁니다. 보사노바 리듬(브라질리언 부드러운 8분)에 맞춰 16마디 진행을 BPM 100에서 한 바퀴 돕니다. 솔로는 C 마이너 펜타토닉(또는 C Dorian)을 기본으로 하고, D♭maj7 부분에서만 D♭ 메이저로 잠시 전환합니다.

## 핵심 포인트

- 16마디, 두 키 센터 (C단조 + D♭장조)
- ♭II 전조 부분이 곡의 핵심 색깔입니다
- 보사노바 리듬이 컴핑의 절반을 차지합니다
- C Dorian과 D♭ Ionian이 교차합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('A 섹션 컴핑 (1-8마디)'),
          description: i18('Cm7과 Fm7만으로 8마디를 보사노바 리듬으로 컴핑합니다.'),
          bpm: 100,
        },
        {
          title: i18('전체 16마디 컴핑'),
          description: i18('D♭maj7로 가는 11마디 전환을 자연스럽게 연결합니다.'),
          bpm: 100,
        },
        {
          title: i18('두 모드 솔로'),
          description: i18('1-10, 13-16마디는 C Dorian, 11-12마디는 D♭ Ionian으로 솔로.'),
          bpm: 100,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('16마디 코드 진행을 외웠습니다'),
          i18('보사노바 리듬으로 컴핑 시도'),
          i18('두 키 센터(C단조 + D♭장조)를 인지'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('BPM 100에서 16마디를 끊김 없이 컴핑'),
          i18('모달 변화에서 자연스러운 전환'),
          i18('솔로 시도(코드톤 위주)'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('두 모드(C Dorian / D♭ Ionian)로 솔로 구분'),
          i18('보사노바 리듬을 자연스럽게'),
          i18('D♭maj7에서 모티프 변화를 의식적으로'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('다른 키로 즉시 이동'),
          i18('잼 세션에서 자신감 있게 컴핑·솔로'),
        ],
      },
    ],
    selfCheck: [
      i18('16마디 코드 진행 외움'),
      i18('컴핑 BPM 100'),
      i18('모달 변화(C단조 → Db장조)를 안다'),
      i18('솔로 시도'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-blue-bossa-100'],
    relatedPrincipleSlugs: ['iivi-theory'],
  },
  {
    id: 'lf-st-4',
    slug: 'standard-sunny',
    trunkSlug: 'standards',
    order: 4,
    title: i18('Sunny를 마이너 톤성으로 솔로한다'),
    description: i18('Altered chord 처리와 Kenny Burrell 인용.'),
    theory: {
      content: i18(`## Sunny의 솔로 도전 과제

Sunny는 재즈에서 마이너 톤성과 altered chord 처리를 배우는 좋은 입문 곡입니다. 진행은 마이너 ii-V와 도미넌트 체인이 연속되어 색깔이 풍부합니다.

핵심은 **altered chord 자리에서 무엇을 칠 것인가**입니다. 도미넌트 7이 등장할 때마다 그 자리를 V7alt로 해석하면, 솔로 음 선택이 훨씬 풍부해집니다.

## 반음 위 Jazz Minor 공식

V7alt 위에서 가장 안전한 솔로 도구는 **반음 위 Jazz Minor 스케일**입니다.

- B♭m7 → E♭7 위에서 E♭7을 E♭alt로 처리 → F Jazz Minor
- G7 위에서 G7alt로 처리 → A♭ Jazz Minor

\`\`\`abc
X:1
T:F Jazz Minor over Eb7alt
M:4/4
L:1/8
Q:1/4=80
K:C
|: F G _A _B c d e f | f e d c _B _A G F :|
\`\`\`

이 스케일을 한 마디 깔아두고 마지막 음을 다음 코드의 코드톤으로 떨어뜨리면, 강한 해결감이 만들어집니다.

## 블루노트 비브라토

F7 → E♭7 자리는 다른 접근입니다. E♭ 음을 길게 끌면서 **비브라토를 걸어** 마이너 톤성의 깊이를 표현합니다. altered가 긴장을 만든다면, 블루노트는 정서적 색깔을 만듭니다. 한 곡 안에서 두 도구를 자리에 맞춰 골라 쓰는 것이 Sunny 솔로의 묘미입니다.

## 어떻게 연습하는가

처음에는 코드 진행만 외워 컴핑합니다. 그 다음 한 자리에서 altered 어프로치를 시도합니다. 마지막에 자기 어휘로 한 줄을 만들어 넣습니다.

## 핵심 포인트

- V7alt → 반음 위 Jazz Minor가 표준 공식입니다
- 마이너 키 도미넌트는 거의 모두 alt로 해석합니다
- 블루노트 비브라토로 정서적 색깔을 더합니다
- altered와 블루노트를 자리에 맞춰 골라 씁니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Altered 자리 한 곳 집중'),
          description: i18('B♭m7 → E♭7 자리에서 F Jazz minor 라인을 만들고 다음 코드 코드톤으로 해결.'),
          bpm: 80,
        },
        {
          title: i18('블루노트 비브라토'),
          description: i18('F7 → E♭7에서 E♭ 음을 길게 끌면서 비브라토를 걸어 강조합니다.'),
          bpm: 80,
        },
        {
          title: i18('1코러스 솔로 + Kenny 인용'),
          description: i18('전체 솔로 중에 Kenny Burrell 시그니처 한 줄을 자연스럽게 인용.'),
          bpm: 80,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Sunny 코드 진행을 외웠습니다'),
          i18('한 altered 자리에서 F Jazz minor 적용'),
          i18('F7 → E♭7에서 블루노트 강조'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('Altered → 반음 위 Jazz minor 공식 체화'),
          i18('1코러스 솔로 완주'),
          i18('Kenny Burrell 인용 시도'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('두 가지 altered 자리에서 자유로운 솔로'),
          i18('마이너 모드 어휘를 다양하게 사용'),
          i18('블루노트와 altered를 한 코러스 안에서 모두'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('Sunny를 자신의 곡처럼 연주합니다'),
          i18('컴핑·솔로·코드 멜로디 모두 가능'),
        ],
      },
    ],
    selfCheck: [
      i18('코드 진행 외움'),
      i18('Altered chord 처리(Eb7 → F Dorian)'),
      i18('1코러스 솔로'),
      i18('Kenny Burrell 인용 시도'),
    ],
    relatedTipSlugs: ['kenny-burrell-quote-1'],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['sunny-solo'],
  },
  {
    id: 'lf-st-5',
    slug: 'standard-attya',
    trunkSlug: 'standards',
    order: 5,
    title: i18('All The Things You Are 키 센터 변화를 안다'),
    description: i18('4번 키 센터 변화의 명곡.'),
    theory: {
      content: i18(`## ATTYA의 키 센터 구조

All The Things You Are(ATTYA)는 36마디 AABA' 곡으로, **키 센터가 네 번 변하는 것**으로 유명합니다. 재즈 스탠다드 중 ii-V-I 어휘를 가장 다양하게 적용해 볼 수 있는 곡입니다.

## 키 센터 흐름

- **A 섹션 (1-8)**: F 단조 → A♭ 장조 도착
- **A2 섹션 (9-16)**: C 단조 → E♭ 장조 도착
- **B 섹션 (17-24, 브릿지)**: G 장조 → E 장조
- **A' 섹션 (25-36)**: A♭ 장조 마무리 + 코다

각 키 센터 안에 ii-V-I이 들어있어, 곡 전체가 결국 **다섯 개의 ii-V-I 진행**으로 분해됩니다.

## A 섹션의 패턴

A 섹션의 핵심은 다음 흐름입니다.

\`\`\`
| Fm7 | B♭m7 | E♭7 | A♭maj7 |
| D♭maj7 | Dm7♭5 | G7 | Cmaj7 |
\`\`\`

전반 4마디가 F 단조 i-iv → A♭ 장조 V-I, 후반 4마디가 D♭ 장조로 잠시 거쳤다가 다시 C 장조 ii-V-I로 도착합니다. 즉 한 섹션 안에 두 개의 키 센터가 들어가 있습니다.

\`\`\`chord
chord: Dm7b5
caption: C 단조로 가는 ii⁰
\`\`\`

\`\`\`chord
chord: G7
caption: V (Cmaj7으로 해결)
\`\`\`

\`\`\`chord
chord: Cmaj7
caption: A 섹션 도착점
\`\`\`

## 어떻게 연습하는가

처음에는 A 섹션 8마디만 컴핑합니다. 키 센터가 어디서 바뀌는지 의식하며 연주. 익숙해지면 전체 36마디를 키 센터 단위로 나눠서 외웁니다. 솔로는 각 키 센터마다 그 키의 메이저 스케일(또는 jazz minor)을 가져다 쓰면 됩니다.

## 핵심 포인트

- 36마디 AABA', 키 센터가 4번 변합니다
- 곡 전체 = 다섯 개의 ii-V-I 진행
- 키 센터 단위로 외우면 외우기 쉽습니다
- ii-V-I 어휘 적용의 최고 연습 곡입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('A 섹션 키 센터 분석'),
          description: i18('A 섹션 8마디에서 F단조 → A♭장조 전환 자리를 표시하고 컴핑.'),
          bpm: 80,
        },
        {
          title: i18('전체 36마디 컴핑'),
          description: i18('네 키 센터를 의식하며 36마디 전체를 BPM 80에서 컴핑.'),
          bpm: 80,
        },
        {
          title: i18('각 ii-V-I 자리 솔로'),
          description: i18('곡 안의 5개 ii-V-I 자리에서 각각 짧은 라인을 연주합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('A 섹션 키(A♭ 장조 도착)를 인지'),
          i18('A 섹션 8마디 컴핑 시도'),
          i18('첫 ii-V-I 자리에서 코드톤 솔로'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('4번 키 센터 변화(A♭ → C → E♭ → G → E)를 압니다'),
          i18('36마디 컴핑 시도'),
          i18('각 ii-V-I 패턴을 찾아냅니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('36마디 끊김 없이 컴핑'),
          i18('키 센터 변화 자리에서 솔로 어휘를 옮깁니다'),
          i18('1코러스 솔로 완주'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 키에서도 즉시 ATTYA 컴핑·솔로'),
          i18('잼 세션에서 자신감 있게 연주'),
        ],
      },
    ],
    selfCheck: [
      i18('A섹션 키(Ab major)를 안다'),
      i18('4번 키 센터 변화(Ab → C → Eb → G → E)'),
      i18('16마디 컴핑 시도'),
      i18('ii-V-I 패턴 찾기'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['iivi-theory'],
  },

  // Artists
  {
    id: 'lf-ar-1',
    slug: 'artist-kenny-burrell-quotes',
    trunkSlug: 'artists',
    order: 1,
    title: i18('Kenny Burrell의 시그니처 라인 3개를 인용한다'),
    description: i18('F블루스 위에서 자연스럽게 흐르게.'),
    theory: {
      content: i18(`## Kenny Burrell 스타일이 무엇인가

Kenny Burrell은 디트로이트 출신의 재즈 기타리스트로, 블루스 감각이 가장 깊은 연주자 중 하나입니다. 그의 시그니처 사운드는 **블루스 스케일 + 더블스톱 + 따뜻한 비브라토**의 조합입니다.

세 가지 어휘 패밀리가 있습니다.

1. **더블스톱 슬라이드** — 두 줄을 동시에 짚어 한두 프렛 슬라이드
2. **블루노트 비브라토** — ♭5(블루 노트)에 길게 비브라토 (한 박 이상)
3. **반복 모티프** — 한 짧은 라인을 두세 번 반복해 그루브를 만듦

Kenny 스타일의 어휘는 화려한 비밥보다 블루스 톤성에 가깝습니다. 펜타토닉과 블루스 스케일이 주된 도구이고, 거기에 메이저 3도와 ♭7을 살짝 더하는 식입니다.

## 어떻게 들리는가

블루스 스케일과 메이저 3도를 섞은 전형적인 Kenny 스타일 라인입니다.

\`\`\`abc
X:1
T:Blues lick with major 3rd color
M:4/4
L:1/8
Q:1/4=80
K:F
|: c2 _A G F _A G F | _E F G F A2 z2 :|
\`\`\`

♭3(A♭)과 메이저 3도(A)가 같은 라인 안에 등장해서 마이너/메이저가 섞인 블루지한 색깔이 만들어집니다.

## 어떻게 연습하는가

위 스타일 라인을 한 개 정확히 외워서 F 블루스 12바 안에 한 번만 등장시킵니다. 익숙해지면 자기 변형을 더해 라인 2-3개로 확장합니다. 한 코러스에 한두 번이 적당합니다.

## 핵심 포인트

- 블루스 스케일 + 더블스톱 + 비브라토
- 화려함보다 블루스 감각이 우선입니다
- 한 코러스에 한두 번이 적당합니다
- 펜타토닉에 메이저 3도와 ♭7을 살짝 더해 색칠합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('더블스톱 슬라이드'),
          description: i18('3번줄과 2번줄을 동시에 짚고 슬라이드하는 Kenny 시그니처 모션을 익힙니다.'),
          bpm: 80,
        },
        {
          title: i18('시그니처 라인 1 외우기'),
          description: i18('한 시그니처 라인을 정확히 외워서 F 블루스 위에 한 번 등장시킵니다.'),
          bpm: 80,
        },
        {
          title: i18('3개 라인 골라 사용'),
          description: i18('3개 라인을 외운 후 1코러스에 1-2개를 자연스럽게 골라 인용.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('시그니처 라인 1을 정확히 외웠습니다'),
          i18('더블스톱 슬라이드를 손에 익혔습니다'),
          i18('F 블루스 위에서 한 번 인용'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('라인 2를 외웠습니다'),
          i18('블루노트 비브라토가 자연스럽습니다'),
          i18('자기 솔로 흐름과 부드럽게 이어집니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('라인 3을 외웠습니다'),
          i18('한 코러스에 1-2번으로 절제'),
          i18('B♭ 블루스에서도 같은 라인을 인용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('Kenny의 어휘를 의식 없이 자기 솔로에 녹여넣기'),
          i18('Kenny의 그루브 감각을 자기 라인에 흡수'),
        ],
      },
    ],
    selfCheck: [
      i18('시그니처 라인 1을 외워서 F블루스 위'),
      i18('시그니처 라인 2를 외운다'),
      i18('시그니처 라인 3을 외운다'),
      i18('자기 솔로에 자연스럽게 인용'),
    ],
    relatedTipSlugs: ['kenny-burrell-quote-1'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['first-licks'],
  },
  {
    id: 'lf-ar-2',
    slug: 'artist-grant-green-motif',
    trunkSlug: 'artists',
    order: 2,
    title: i18('Grant Green의 모티프 반복을 흉내낸다'),
    description: i18('단순한 음으로 그루브를 만든다.'),
    theory: {
      content: i18(`## Grant Green 스타일의 단순함

Grant Green은 단순한 단음 라인과 한 모티프의 집요한 반복으로 그루브를 만드는 연주자입니다. 화려한 비밥과는 정반대 방향이고, 그래서 더 강력합니다.

대표적인 세 가지 도구가 있습니다.

1. **한 음 반복** — 같은 음을 다양한 리듬으로 반복해 그루브를 만듭니다
2. **한 마디 모티프 반복** — 같은 라인을 코드 변화에 맞춰 옮기며 반복합니다
3. **점진적 발전** — 한 음만 바꾸며 모티프를 변형합니다

## 한 음 솔로는 어떻게 들리는가

F 한 음만으로도 리듬 변화를 통해 충분히 음악적인 라인을 만들 수 있습니다.

\`\`\`abc
X:1
T:One-note rhythmic motif
M:4/4
L:1/8
Q:1/4=80
K:F
|: F2 z F F2 F2 | z F F2 F z F2 :|
\`\`\`

같은 음 F가 박자 자리만 바뀌면서 강박/약박 사이에서 리듬 모티프를 만듭니다.

## 한 마디 모티프 반복

한 마디 짧은 라인을 만들고 12바 동안 코드 변화에 맞춰 같은 모양을 옮겨가며 반복합니다.

\`\`\`abc
X:1
T:Repeating one-bar motif
M:4/4
L:1/8
Q:1/4=80
K:F
|: F A c A F A c A | _B d f d _B d f d :|
\`\`\`

위 두 마디에서 첫 마디는 F7 위, 둘째 마디는 B♭7 위에 같은 모티프(1-3-5-3)를 그대로 옮긴 것입니다.

## 어떻게 연습하는가

한 음 솔로부터 시작합니다. 익숙해지면 한 마디 모티프로 확장하고, 그 모티프를 코드 변화에 맞춰 옮기며 반복합니다. 마지막에 한 음씩 바꾸며 점진적으로 발전시킵니다.

## 핵심 포인트

- 단순함이 그루브의 비결입니다
- 한 음 → 한 마디 라인 → 점진적 발전
- 리듬 변화가 음 변화보다 중요합니다
- 청자가 따라부를 수 있을 만큼 단순하게 시작합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('한 음 솔로'),
          description: i18('F 한 음만으로 12바 블루스를 솔로합니다. 음은 하나, 리듬만 바꾸며.'),
          bpm: 80,
        },
        {
          title: i18('한 마디 모티프 반복'),
          description: i18('한 마디 짧은 라인을 만들어 12바 동안 반복합니다. 코드 변화에 맞춰 음만 살짝 조정.'),
          bpm: 80,
        },
        {
          title: i18('점진적 발전'),
          description: i18('같은 모티프를 한 음씩 바꿔가며 12바 동안 점진적으로 발전시킵니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('한 음만으로 솔로 가능 (리듬 변화로 살림)'),
          i18('단순함의 음악적 효과를 압니다'),
          i18('박자가 단단합니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('한 마디 라인을 12바 반복'),
          i18('코드 변화에 라인을 자연스럽게 옮깁니다'),
          i18('녹음에서 그루브가 느껴집니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('한 라인을 변주하며 점진적으로 발전'),
          i18('자기 솔로에 모티프 반복 적용'),
          i18('펑크 그루브 위에서도 자연스럽게'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('Grant Green의 그루브 감각을 자기 라인에 흡수'),
          i18('단순함과 화려함을 의도에 따라 선택'),
        ],
      },
    ],
    selfCheck: [
      i18('한 음 반복 패턴(리듬 변화로 살리기)'),
      i18('펑크 그루브 위에서 한 마디 라인 반복'),
      i18('한 라인을 변주하면서 발전'),
      i18('자기 솔로에 적용'),
    ],
    relatedTipSlugs: ['repeat-and-vary'],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: ['first-licks'],
  },
  {
    id: 'lf-ar-3',
    slug: 'artist-wes-octaves',
    trunkSlug: 'artists',
    order: 3,
    title: i18('Wes Montgomery의 옥타브 라인 4마디를 친다'),
    description: i18('단음 → 옥타브 → 블록 코드 3단계 흐름.'),
    theory: {
      content: i18(`## Wes Montgomery 스타일의 3단계

Wes Montgomery는 솔로 구조의 **3단계 진행**으로 유명합니다.

1. **단음 라인** — 코러스 초반의 가벼운 라인
2. **옥타브** — 같은 라인을 옥타브로 두꺼워지는 중반
3. **블록 코드** — 4음 보이싱으로 클라이맥스를 만드는 후반

솔로가 진행될수록 텍스처가 두꺼워지면서 자연스럽게 클라이맥스로 향하는 구성입니다.

## 옥타브 잡는 두 가지 운지

옥타브를 잡는 표준 운지는 두 가지입니다.

- **6번 ↔ 4번줄**: 검지+약지 (한 줄 건너뛰기)
- **5번 ↔ 3번줄**: 같은 운지로 두 프렛 위

피크 대신 엄지를 사용하면 따뜻하고 둥근 톤이 나옵니다. 옥타브 사이의 줄들은 손가락 살로 살짝 뮤트해 두 음만 깨끗하게 울리게 합니다.

## 옥타브 라인은 어떻게 들리는가

F 메이저 펜타토닉을 옥타브로 한 옥타브 위로 올리는 단순한 예입니다.

\`\`\`abc
X:1
T:F major pentatonic in octaves
M:4/4
L:1/4
Q:1/4=80
K:F
|: [Ff] [Gg] [Aa] [cc'] | [dd'] [cc'] [Aa] [Ff] :|
\`\`\`

각 음을 옥타브 두 개로 동시에 연주하면 같은 라인도 훨씬 두껍게 들립니다.

## 어떻게 연습하는가

옥타브로 단순 멜로디 4마디를 먼저 익힙니다. F 블루스 위에서 단음 → 옥타브로 자연스럽게 전환하는 1코러스를 시도합니다. 블록 코드는 후기 단계로 두고, 옥타브가 안정된 다음에 추가합니다.

## 핵심 포인트

- 3단계: 단음 → 옥타브 → 블록 코드
- 엄지 사용으로 따뜻한 톤을 만듭니다
- 가운데 줄 뮤트가 깨끗한 옥타브의 비결입니다
- 솔로 후반에 옥타브로 클라이맥스를 만듭니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('옥타브 그립 익히기'),
          description: i18('6번-4번 옥타브 그립을 익히고 단순 멜로디(메이저 스케일)로 한 옥타브 연주.'),
          bpm: 80,
        },
        {
          title: i18('옥타브로 펜타토닉'),
          description: i18('F 펜타토닉을 옥타브로 연주합니다. 가운데 줄 뮤트를 확인.'),
          bpm: 80,
        },
        {
          title: i18('단음 → 옥타브 전환'),
          description: i18('F 블루스 위에서 6마디 단음 → 6마디 옥타브로 전환하는 1코러스 솔로.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-f-blues-80'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('옥타브 잡는 법을 압니다(엄지/픽)'),
          i18('옥타브로 단순 멜로디 4마디'),
          i18('가운데 줄을 깨끗하게 뮤트'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('F 블루스 위에서 옥타브로 4마디 솔로'),
          i18('단음과 옥타브 사이 전환이 자연스러움'),
          i18('따뜻한 톤이 나옵니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('F 블루스 위에서 옥타브로 1코러스 시도'),
          i18('단음 ↔ 옥타브 ↔ 블록 코드 3단계 흐름'),
          i18('Wes의 페이즈(Phrasing) 감각을 흡수'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('옥타브 솔로를 자신의 어휘처럼 사용'),
          i18('한 솔로 안에서 3단계를 의도적으로 구성'),
        ],
      },
    ],
    selfCheck: [
      i18('옥타브 잡는 법을 안다(엄지/픽)'),
      i18('옥타브로 단순 멜로디 4마디'),
      i18('F블루스 위에서 옥타브로 1코러스 시도'),
      i18('단음 ↔ 옥타브 ↔ 블록 코드 3단계'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-f-blues-80'],
    relatedPrincipleSlugs: [],
  },
  {
    id: 'lf-ar-4',
    slug: 'artist-joe-pass-chord-melody',
    trunkSlug: 'artists',
    order: 4,
    title: i18('Joe Pass의 코드 멜로디를 4마디 친다'),
    description: i18('베이스 + 코드 + 멜로디 동시 — 솔로 기타의 핵심.'),
    theory: {
      content: i18(`## 코드 멜로디가 무엇인가

코드 멜로디는 **한 대의 기타로 베이스·코드·멜로디 세 층을 동시에 표현**하는 연주 방식입니다. Joe Pass 스타일의 솔로 기타 연주가 대표적입니다.

원리는 단순합니다.

- **베이스 (6번줄)** — 코드의 루트
- **코드 (4·3번줄)** — 3·7 핵심음
- **멜로디 (2·1번줄)** — 곡의 멜로디 음

모든 층을 동시에 칠 필요는 없습니다. 비결은 베이스 → 코드 → 멜로디를 **약간씩 어긋나게 연주해서** 한 대로 세 악기처럼 들리게 만드는 것입니다.

## 시간차로 어떻게 흐르는가

같은 한 마디 안에서 베이스를 먼저, 코드를 그 다음, 멜로디를 마지막으로 떨어뜨리는 식입니다.

\`\`\`abc
X:1
T:Bass — chord — melody offset
M:4/4
L:1/4
Q:1/4=70
K:C
|: C, [EG]/2 z/2 c2 z | A, [EG]/2 z/2 e2 z :|
\`\`\`

저음의 베이스가 1박에, 셸 코드가 2박 앞부분에, 상단의 멜로디 음이 3박에 떨어지는 흐름입니다. 청자는 한 대의 기타에서 베이스·반주·멜로디를 각각 다른 악기로 듣는 듯한 느낌을 받습니다.

## 어떻게 연습하는가

먼저 한 코드 위에 멜로디 음 한 개를 얹는 것부터 시작합니다. Cmaj7 보이싱 위에 가장 위 줄에 E(3도)나 G(5도) 멜로디를 잡습니다. 익숙해지면 4마디 짧은 곡(예: Autumn Leaves A 섹션 첫 4마디)으로 옮깁니다.

한 마디 안에 모든 것을 동시에 잡으려 하지 말고 약간씩 시간차로 표현하는 것이 핵심입니다.

## 핵심 포인트

- 세 층: 베이스 / 코드 / 멜로디
- 동시 연주보다 시간차 어긋남이 자연스럽습니다
- 멜로디를 가장 위 줄에 분명히 둡니다
- 한 대로 세 악기처럼 들리게 하는 것이 목표입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('한 코드에 멜로디 한 음'),
          description: i18('Cmaj7 보이싱 위에 C 또는 E 멜로디 음을 가장 위 줄에 두고 동시 연주.'),
        },
        {
          title: i18('Autumn Leaves 첫 4마디'),
          description: i18('Cm7-F7-B♭maj7-E♭maj7 진행에 곡의 멜로디를 가장 위 줄로 얹어 코드 멜로디로 연주.'),
          bpm: 60,
        },
        {
          title: i18('Joe Pass 식 어긋남'),
          description: i18('베이스 → 코드 → 멜로디 순서로 약간씩 시간차를 두어 한 마디를 풍성하게 채웁니다.'),
          bpm: 60,
        },
      ],
      backingTrackIds: ['bt-autumn-leaves-bm'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('멜로디와 코드를 동시에 잡습니다'),
          i18('가장 위 줄에 멜로디가 분명히 들립니다'),
          i18('첫 1-2마디 코드 멜로디를 시도'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('Autumn Leaves A섹션 첫 4마디 코드 멜로디'),
          i18('베이스 음을 의식하며 연주'),
          i18('박자 손실 없이 흐름 유지'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('8마디 이상 코드 멜로디로 연주'),
          i18('Joe Pass 식 시간차 어긋남 사용'),
          i18('짧은 솔로 라인을 코드 멜로디 사이에 삽입'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('한 스탠다드를 코드 멜로디로 완주'),
          i18('베이스/코드/멜로디 세 층을 자유롭게 오감'),
        ],
      },
    ],
    selfCheck: [
      i18('멜로디 + 코드 동시 잡기'),
      i18('Autumn Leaves A섹션 첫 4마디 코드 멜로디'),
      i18('솔로 기타로 흐름 유지'),
      i18('베이스 음을 의식'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-autumn-leaves-bm'],
    relatedPrincipleSlugs: ['chord-melody'],
  },

  // ─── New leaves: concepts from lesson notes ─────────────────────────────
  // Dorian Tetrachord (Soloing)
  {
    id: 'lf-so-7',
    slug: 'soloing-dorian-tetrachord',
    trunkSlug: 'soloing',
    order: 7,
    title: i18('Dorian Tetrachord — 4음 셀로 분리해서 친다'),
    description: i18('Dorian 스케일을 두 개의 4음 셀로 나눠 패턴화.'),
    theory: {
      content: i18(`## Tetrachord가 무엇인가

Tetrachord(테트라코드)는 **4음으로 이루어진 음의 단위**입니다. 7음 스케일을 4음 셀 두 개로 나눠 보면 운지가 단순해지고 외우기 쉬워집니다. 재즈에서 가장 자주 사용되는 것이 Dorian tetrachord입니다.

Dorian 스케일은 \`온음-반음-온음-온음-온음-반음-온음\` 구조입니다. 이걸 4음씩 둘로 나누면 **두 셀 모두 \`온음-반음-온음\`** 패턴이 됩니다.

D Dorian의 두 셀:

- 첫 셀: D - E - F - G (온-반-온)
- 둘째 셀: A - B - C - D (온-반-온)

\`\`\`abc
X:1
T:Dorian as two tetrachords
M:4/4
L:1/8
Q:1/4=80
K:C
|: D E F G A B c d | d c B A G F E D :|
\`\`\`

두 셀이 같은 인터벌 모양이라서 한 셀의 핑거링만 외우면 다른 셀도 같은 방식으로 짚을 수 있습니다.

## 두 가지 핑거링

같은 셀을 두 가지 핑거링으로 짚을 수 있습니다.

- **[A] 검지 시작 패턴**: 셀의 첫 음을 검지로
- **[B] 약지 시작 패턴**: 셀의 첫 음을 약지로

두 패턴을 다 익히면 지판 어디서든 셀이 즉시 나옵니다.

## 두 가지 방향

- **대각선 방향**: 한 줄에서 다음 줄로 이동하며 연결합니다 (3노트 퍼 스트링 운지에 가깝습니다)
- **수직 방향**: 같은 프렛 영역에서 다른 줄로 이동합니다 (포지션 안에 머무릅니다)

## 어떻게 연습하는가

먼저 한 셀(예: D-E-F-G)을 [A] 핑거링으로 BPM 60에서 끊김 없이 연주합니다. 그 다음 [B] 핑거링. 두 핑거링이 익숙해지면 두 셀을 연결해 한 옥타브를 완성합니다.

## 핵심 포인트

- 7음 스케일 = 4음 셀 두 개 (Dorian = 온반온 + 온반온)
- 핑거링 2가지: [A] 검지 / [B] 약지
- 방향 2가지: 대각선 / 수직
- 두 셀이 같은 모양이라 한 셀을 외우면 다른 셀도 따라옵니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('[A] 검지 패턴 한 셀'),
          description: i18('D Dorian의 첫 셀(D-E-F-G)을 검지 시작으로 BPM 60에서 끊김 없이.'),
          bpm: 60,
        },
        {
          title: i18('[B] 약지 패턴 한 셀'),
          description: i18('같은 셀을 약지 시작으로 연주. 손가락 감각의 차이를 익힙니다.'),
          bpm: 60,
        },
        {
          title: i18('두 셀 연결 한 옥타브'),
          description: i18('두 셀을 대각선 방향으로 연결해 D Dorian 한 옥타브를 끊김 없이.'),
          bpm: 80,
        },
        {
          title: i18('네 시작 포지션 순환'),
          description: i18('솔 / 미 / 레 / 시 네 시작 포지션에서 같은 셀을 연주합니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('[A] 검지 패턴 한 셀을 BPM 60에서 끊김 없이'),
          i18('[B] 약지 패턴 한 셀을 BPM 60에서 끊김 없이'),
          i18('Dorian의 두 셀 구조를 압니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('대각선·수직 두 방향 모두 가능'),
          i18('4가지 시작 포지션 전환 가능'),
          i18('BPM 80으로 상승'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('두 셀을 자유롭게 조합해 한 옥타브 연주'),
          i18('이오니안·프리지안 등 다른 모드의 tetrachord도 인지'),
          i18('솔로 라인에 셀 패턴을 자연스럽게 적용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('지판 어디에서든 Dorian 셀이 즉시 나옵니다'),
          i18('각 모드의 tetrachord 조합을 자유롭게 사용'),
        ],
      },
    ],
    selfCheck: [
      i18('[A] 검지 패턴 BPM 60에서 끊김 없이'),
      i18('[B] 약지 패턴 BPM 60에서 끊김 없이'),
      i18('대각선/수직 두 방향 모두 가능'),
      i18('4가지 시작 포지션(솔/미/레/시) 전환 가능'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['dorian-tetrachord'],
  },

  // h/w Diminished & Whole Tone (Soloing)
  {
    id: 'lf-so-8',
    slug: 'soloing-hw-dim-whole-tone',
    trunkSlug: 'soloing',
    order: 8,
    title: i18('Half-Whole Dim과 Whole Tone 스케일'),
    description: i18('도미넌트 코드에 색깔을 더하는 두 가지 대칭 스케일.'),
    theory: {
      content: i18(`## 두 대칭 스케일이 무엇인가

Half-Whole Diminished와 Whole Tone은 **대칭 구조의 스케일**입니다. 대칭이란 인터벌 패턴이 일정하게 반복된다는 뜻이고, 그래서 어디서 시작해도 같은 음 집합이 나옵니다. 도미넌트 코드 위에서 강한 색깔을 더하는 도구입니다.

## Half-Whole Diminished (8음)

패턴: **반음-온음-반음-온음-반음-온음-반음-온음**

G에서 시작하면 G - A♭ - B♭ - B - C♯ - D - E - F - G.

\`\`\`abc
X:1
T:G Half-Whole Diminished
M:4/4
L:1/8
Q:1/4=80
K:C
|: G _A _B =B ^c d e f | g f e d ^c =B _B _A G2 z2 :|
\`\`\`

V7 위에서 사용하면 ♭9, ♯9, ♯11(♮5), 13 텐션이 모두 들어가 화려하고 어두운 색깔이 됩니다. 8음이라서 한 옥타브 안에 코드톤(1·3·5·♭7)이 두 번 나타나는 것이 특징입니다.

## Whole Tone (6음)

패턴: **모두 온음** (온음-온음-온음-온음-온음-온음)

G에서 시작하면 G - A - B - C♯ - D♯ - F - G.

\`\`\`abc
X:1
T:G Whole Tone
M:4/4
L:1/8
Q:1/4=80
K:C
|: G A =B ^c ^d f g2 | g f ^d ^c =B A G2 :|
\`\`\`

V7(♭5) 위에 잘 어울리며, "떠 있는 듯한" 모호한 색깔을 만듭니다. 6음 모두 온음이라 멜로디에 방향성이 약해지는 것이 특징입니다.

## 어떻게 연습하는가

V7 마디에 한 마디만 h/w dim을 적용해 보고, 다른 코러스에서 같은 자리에 whole tone을 적용해 보면 차이가 분명히 들립니다. 두 스케일 모두 반음/온음 패턴이 일정하므로 한 자리만 외우면 다른 자리로 옮기기 쉽습니다.

## 핵심 포인트

- 둘 다 대칭 스케일 — 어디서든 같은 음 집합이 나옵니다
- h/w dim = 8음, V7에 화려한 텐션을 추가합니다
- Whole Tone = 6음, V7(♭5)에 떠 있는 색깔을 만듭니다
- 한 마디만 적용해도 충분히 강력합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('G h/w Dim 한 옥타브'),
          description: i18('G에서 시작해 반-온 패턴으로 8음을 한 옥타브 연주. G-A♭-B♭-B-C♯-D-E-F-G.'),
          bpm: 80,
        },
        {
          title: i18('G Whole Tone 한 옥타브'),
          description: i18('G에서 모두 온음으로 6음. G-A-B-C♯-D♯-F-G.'),
          bpm: 80,
        },
        {
          title: i18('V7 마디에 적용'),
          description: i18('ii-V-I에서 V7 자리에 h/w dim 한 번, whole tone 한 번 적용해 색깔 차이를 들어봅니다.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('G h/w Dim 한 옥타브 연주'),
          i18('G Whole Tone 한 옥타브 연주'),
          i18('두 스케일의 인터벌 구조를 압니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('V7 자리에 각 스케일을 한 마디씩 적용'),
          i18('두 스케일의 색깔 차이를 귀로 구분'),
          i18('각 스케일에 맞는 코드 매칭을 압니다'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('Altered와 h/w Dim의 차이를 의식적으로 구분 사용'),
          i18('5 키 이상에서 자유롭게'),
          i18('대칭 구조를 활용해 같은 라인을 단3도/장3도 이동'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 V7 자리든 즉시 두 스케일 중 선택'),
          i18('두 스케일을 한 솔로 안에서 의도적으로 대조'),
        ],
      },
    ],
    selfCheck: [
      i18('G h/w dim 스케일 전 포지션 연주'),
      i18('G whole tone 스케일 전 포지션 연주'),
      i18('각 스케일에 맞는 코드 매칭 암기'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['hw-dim-whole-tone'],
  },

  // II-V-I Tension Resolution (Harmony·Comping)
  {
    id: 'lf-hc-7',
    slug: 'harmony-tension-resolution',
    trunkSlug: 'harmony-comping',
    order: 7,
    title: i18('II-V-I 텐션 해결 — Easy/Advanced 보이스리딩'),
    description: i18('V7 텐션이 I로 가는 정해진 해결 경로.'),
    theory: {
      content: i18(`## 텐션 해결이 무엇인가

V7 → I 해결에서 **각 텐션이 어디로 가야 자연스러운지는 거의 정해져 있습니다**. 이 경로를 외워두면 텐션을 사용하는 보이싱·솔로 모두에서 음악적으로 들립니다.

## Easy 보이스리딩 (안전한 해결)

가장 무난한 해결 방향은 반음 이동입니다.

- **♭9** → 5도로 반음 아래
- **♭13** → 9도로 반음 아래
- **♯11** → 5도로 반음 아래 (또는 9도로 반음 위)
- **♯9** → 9도로 반음 아래

G7 → Cmaj7 기준으로 풀어 쓰면, ♭9(A♭) → 5도(G)는 한 음 아래, ♭13(E♭) → 9도(D)는 한 음 아래로 해결되는 식입니다.

\`\`\`abc
X:1
T:G7 b9 — Cmaj7 (Easy resolution)
M:4/4
L:1/4
Q:1/4=70
K:C
|: [_A=B]2 [_A=B]2 | [GA]2 [GA]2 :|
\`\`\`

## Advanced 보이스리딩 (확장된 해결)

같은 텐션을 한 음 이상의 점프로 풀어도 됩니다.

- **♭9** → 6도로 위쪽 점프
- **♭13** → 메이저 9도로 두 반음 위
- **♯11** → 1도(루트)로 점프
- **♯9** → 7도(I의 메이저 7도)로 위쪽 점프

핵심 원칙은 다음과 같습니다.

- ♭ 텐션은 보통 **아래로** 풀립니다
- ♯ 텐션은 보통 **위로** 풀립니다
- 점프(advanced)로 풀면 멜로디적 매력이 더해집니다

## 어떻게 연습하는가

V7에 한 텐션만 추가한 보이싱을 잡고, 다음 I 코드의 해결음을 한 음만 의식해 떨어뜨립니다. 솔로에서도 마찬가지입니다. V7 마디 마지막 음으로 텐션을 두고, I 마디 1박에 해결음으로 떨어뜨립니다.

## 핵심 포인트

- 각 텐션마다 정해진 해결 경로가 있습니다
- Easy = 반음 이동 / Advanced = 점프
- ♭는 보통 아래로 / ♯는 보통 위로
- V7 → I에서 한 음만 의식해도 큰 차이가 만들어집니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Easy 보이스리딩 4가지'),
          description: i18('각 V 텐션(♭9, ♭13, ♯11, ♯9)에서 Easy 해결음으로 떨어뜨리는 라인을 만듭니다.'),
          bpm: 80,
        },
        {
          title: i18('Advanced 보이스리딩 비교'),
          description: i18('같은 V 텐션에서 Easy와 Advanced 해결을 비교해 색깔 차이를 들어봅니다.'),
          bpm: 80,
        },
        {
          title: i18('컴핑에 적용'),
          description: i18('ii-V-I 컴핑에서 V7 보이싱에 텐션을 두고 I로 갈 때 보이스 리딩을 의식.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Easy 보이스리딩 V→I 4가지 암기'),
          i18('각 텐션이 어느 음으로 가는지 즉시 떠올림'),
          i18('한 자리에서 보이스 리딩 시도'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('Advanced 보이스리딩 V→I 4가지 암기'),
          i18('Easy와 Advanced를 의식적으로 구분 사용'),
          i18('ii-V-I 진행에서 텐션 해결 연주'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('솔로에도 텐션 해결 라인을 자연스럽게 적용'),
          i18('한 코러스 안에서 두세 가지 텐션 모두 해결'),
          i18('마이너 ii-V-i에도 적용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 V7 자리든 즉시 텐션·해결 라인을 떠올림'),
          i18('보이스 리딩을 의식 없이 자연스럽게'),
        ],
      },
    ],
    selfCheck: [
      i18('Easy 보이스리딩 V→I 4가지 암기'),
      i18('Advanced 보이스리딩 V→I 4가지 암기'),
      i18('II-V-I 진행 위에서 텐션 해결 연주'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['tension-resolution'],
  },

  // I-6 vs I-7 modal source (Soloing)
  {
    id: 'lf-so-9',
    slug: 'soloing-im6-vs-im7',
    trunkSlug: 'soloing',
    order: 9,
    title: i18('Im6 vs Im7 — 어느 모드에서 가져오나'),
    description: i18('같은 마이너 코드라도 출처 스케일이 다르면 솔로 음이 달라집니다.'),
    theory: {
      content: i18(`## Im6와 Im7의 차이가 무엇인가

마이너 토닉 코드에는 두 가지 형태가 있습니다.

- **Im6** (예: Cm6 = C - E♭ - G - **A**) — 메이저 6도가 들어감
- **Im7** (예: Cm7 = C - E♭ - G - **B♭**) — ♭7도가 들어감

이 6도/7도의 차이로 **출처 스케일**(어느 모드에서 가져왔는가)이 달라집니다.

## 출처 스케일 정리

- **Im7** → Aeolian, Harmonic Minor, Jazz Minor 등 (대부분 ♭6 포함)
- **Im6** → Dorian, Melodic Minor 4번째 모드 등 (메이저 6도 포함)

\`\`\`chord
chord: Cm7
caption: ♭7 — Aeolian/HM/JM 어휘
\`\`\`

같은 마이너 i 코드라도 곡 안에서 어느 형태로 쓰이는지에 따라 **솔로 음이 달라집니다**. Cm6 자리라면 C Dorian의 A(메이저 6도)를 자유롭게 쓸 수 있고, Cm7 자리라면 보통 A♭(♭6)을 골라야 자연스럽습니다.

## 6도 한 음의 차이

C Dorian과 C Aeolian은 단 한 음(6도)만 다릅니다. 둘을 위·아래로 비교해 보면 색깔 차이가 분명히 들립니다.

\`\`\`abc
X:1
T:C Dorian (with major 6th)
M:4/4
L:1/8
Q:1/4=80
K:C
|: C D _E F G A _B c | c _B A G F _E D C :|
\`\`\`

\`\`\`abc
X:1
T:C Aeolian (with b6)
M:4/4
L:1/8
Q:1/4=80
K:C
|: C D _E F G _A _B c | c _B _A G F _E D C :|
\`\`\`

## 어떻게 연습하는가

곡 분석 단계에서 마이너 i 코드를 보면 그 자리가 Im6인지 Im7인지를 확인합니다. Im6이면 Dorian, Im7이면 Aeolian 또는 멜로딕 마이너 어휘를 사용합니다.

## 핵심 포인트

- Im6 → Dorian 계열 (메이저 6도)
- Im7 → Aeolian / Harmonic Minor / Jazz Minor 계열
- 차이의 핵심은 6도(와 함께 7도)입니다
- 이 구분이 모달 솔로의 정확성을 결정합니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Cm6 vs Cm7 비교'),
          description: i18('Cm6 위에서 C Dorian, Cm7 위에서 C Aeolian으로 4마디씩 솔로해 색깔 차이를 들어봅니다.'),
          bpm: 80,
        },
        {
          title: i18('6도 강조'),
          description: i18('Cm6 자리에서 A(메이저 6도)를 의도적으로 강조하는 라인을 만듭니다.'),
          bpm: 80,
        },
        {
          title: i18('곡에서 i 코드 분석'),
          description: i18('Autumn Leaves의 Gm7과 Sunny의 Cm6 자리를 비교 분석.'),
        },
      ],
      backingTrackIds: [],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('Im6와 Im7의 구성 차이를 압니다'),
          i18('Dorian과 Aeolian의 6도 차이를 인지'),
          i18('한 자리에서 두 모드를 비교 연주'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('Im6 자리에서 Dorian 사용'),
          i18('Im7 자리에서 적절한 출처 스케일 선택'),
          i18('6도가 음악적으로 어떻게 들리는지 의식'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('곡 분석에서 자동으로 모드를 판단'),
          i18('Jazz minor(상행)와 Aeolian의 차이까지 구분'),
          i18('Harmonic minor의 ♮7을 의식적으로 사용'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('어떤 마이너 코드에서도 즉시 적절한 모드 선택'),
          i18('의도적으로 ♭6과 ♮6을 한 솔로 안에 대조'),
        ],
      },
    ],
    selfCheck: [
      i18('Im6는 Dorian 계열임을 안다'),
      i18('Im7은 Aeolian/HM/JM 계열임을 안다'),
      i18('한 자리에서 두 모드 차이를 귀로 듣는다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['dorian-tetrachord'],
  },

  // Shell voicing (Harmony·Comping)
  {
    id: 'lf-hc-8',
    slug: 'harmony-shell-voicings',
    trunkSlug: 'harmony-comping',
    order: 8,
    title: i18('Shell Voicing — 루트 + 3 + 7 세 음으로 컴핑'),
    description: i18('가장 단순하면서 강력한 보이싱. 1-3-7 또는 1-7-3.'),
    theory: {
      content: i18(`## Shell Voicing이 무엇인가

Shell voicing(셸 보이싱)은 코드의 **핵심 세 음 — 루트, 3도, 7도** 만으로 만든 보이싱입니다. 5도는 생략합니다. 5도는 코드 색깔에 영향을 거의 주지 않기 때문입니다. 세 음만이라서 손가락 부담이 적고, 한 곡 전체를 매끄럽게 컴핑할 수 있게 합니다.

두 가지 폼이 있습니다.

- **1-3-7**: 베이스 1도(6번줄), 3도(4번줄), 7도(3번줄)
- **1-7-3**: 베이스 1도(6번줄), 7도(4번줄), 3도(3번줄)

\`\`\`chord
chord: Cmaj7
caption: 1-3-7 폼 (C 베이스 · E · B)
\`\`\`

## ii-V-I에서 두 폼을 교대하면 어떻게 흐르는가

두 폼을 번갈아 사용하면 4번줄·3번줄이 거의 움직이지 않고 보이스 리딩이 자연스럽게 됩니다.

- **Dm7 (1-3-7)**: D · F · C
- **G7 (1-7-3)**: G · F · B
- **Cmaj7 (1-3-7)**: C · E · B

4번줄의 음이 F → F → E로 반음씩만 움직이고, 3번줄은 C → B → B로 반음 한 번만 움직입니다.

\`\`\`chord
chord: Dm7
caption: 1-3-7 (D · F · C)
\`\`\`

\`\`\`chord
chord: G7
caption: 1-7-3 (G · F · B)
\`\`\`

\`\`\`chord
chord: Cmaj7
caption: 1-3-7 (C · E · B)
\`\`\`

## 어떻게 연습하는가

처음에는 한 코드의 두 폼을 정확히 잡습니다. 그 다음 ii-V-I 진행을 두 폼 교대로 연주합니다. 4번줄과 3번줄이 거의 움직이지 않고 6번줄 베이스만 이동하는 것이 핵심입니다. 안정되면 4도 사이클로 12 키를 한 바퀴 돕니다.

## 핵심 포인트

- 셸 = 1도 + 3도 + 7도 (5도 생략)
- 두 폼: 1-3-7 / 1-7-3
- ii-V-I에서 두 폼을 교대해 보이스 리딩을 만듭니다
- 컴핑의 출발점이자 모든 스타일의 토대입니다
`),
    },
    practice: {
      exercises: [
        {
          title: i18('Cmaj7 두 폼 비교'),
          description: i18('Cmaj7을 1-3-7과 1-7-3 두 폼으로 잡고 음색 차이를 비교.'),
        },
        {
          title: i18('ii-V-I 두 폼 교대'),
          description: i18('Dm7(1-3-7) → G7(1-7-3) → Cmaj7(1-3-7)으로 보이스 리딩이 부드럽게 흐르도록.'),
          bpm: 80,
        },
        {
          title: i18('12 키 한 바퀴'),
          description: i18('4도 사이클로 12 키 ii-V-I 셸 보이싱 한 바퀴.'),
          bpm: 80,
        },
      ],
      backingTrackIds: ['bt-iivi-c'],
    },
    checkpoints: [
      {
        level: 'Bronze', weight: 30,
        items: [
          i18('1-3-7과 1-7-3 두 폼을 잡습니다'),
          i18('Cmaj7 / Dm7 / G7을 세 음으로 정확히'),
          i18('한 손에서 손가락 부담 없이 잡힙니다'),
        ],
      },
      {
        level: 'Silver', weight: 30,
        items: [
          i18('ii-V-I에서 두 폼을 교대로 사용'),
          i18('4·3번줄이 거의 안 움직이는 보이스 리딩'),
          i18('5 키 이상에서 셸 컴핑'),
        ],
      },
      {
        level: 'Gold', weight: 25,
        items: [
          i18('12 키 모두에서 셸 컴핑 가능'),
          i18('V7에 텐션(♭9, ♭13) 한 음 추가'),
          i18('스탠다드 한 곡을 셸로 완주'),
        ],
      },
      {
        level: 'Master', weight: 15,
        items: [
          i18('잼 세션에서 셸 보이싱으로 자연스럽게 컴핑'),
          i18('셸 → Drop 2 → Drop 3을 의도에 따라 선택'),
        ],
      },
    ],
    selfCheck: [
      i18('1-3-7 / 1-7-3 두 폼 모두 잡는다'),
      i18('ii-V-I에서 두 폼 교대 사용'),
      i18('보이스 리딩이 반음 단위로 움직인다'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: ['bt-iivi-c'],
    relatedPrincipleSlugs: ['drop2-voicing', 'guide-tones'],
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
    id: 'bt-blue-bossa-100',
    name: i18('Blue Bossa (Cm) BPM 100'),
    key: 'Cm',
    bpm: 100,
    style: 'bossa',
    bars: 16,
    loopCount: 4,
    chords: [
      { chord: 'Cm7', beats: 8 },
      { chord: 'Fm7', beats: 8 },
      { chord: 'Dm7b5', beats: 4 },
      { chord: 'G7', beats: 4 },
      { chord: 'Cm7', beats: 8 },
      { chord: 'Ebm7', beats: 4 },
      { chord: 'Ab7', beats: 4 },
      { chord: 'Dbmaj7', beats: 8 },
      { chord: 'Dm7b5', beats: 4 },
      { chord: 'G7', beats: 4 },
      { chord: 'Cm7', beats: 8 },
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

  // ─── 신규 6개 ─────────────────────────────────────────────────────

  {
    id: 'bt-bird-blues-f-120',
    name: i18('F Bird-Style Blues BPM 120'),
    key: 'F',
    bpm: 120,
    style: 'blues',
    bars: 12,
    loopCount: 8,
    // 12바 블루스에 패싱 ii-V를 추가한 교본 패턴
    chords: [
      { chord: 'F7',    beats: 8 },                        // 1
      { chord: 'Em7',   beats: 4 }, { chord: 'A7',  beats: 4 }, // 2  ii-V of D
      { chord: 'Dm7',   beats: 4 }, { chord: 'G7',  beats: 4 }, // 3  ii-V of C
      { chord: 'Cm7',   beats: 4 }, { chord: 'F7',  beats: 4 }, // 4  ii-V of Bb
      { chord: 'Bb7',   beats: 8 },                        // 5
      { chord: 'Bbm7',  beats: 4 }, { chord: 'Eb7', beats: 4 }, // 6  ii-V of Ab
      { chord: 'F7',    beats: 4 }, { chord: 'D7',  beats: 4 }, // 7
      { chord: 'Gm7',   beats: 4 }, { chord: 'C7',  beats: 4 }, // 8
      { chord: 'Am7',   beats: 4 }, { chord: 'D7',  beats: 4 }, // 9
      { chord: 'Gm7',   beats: 4 }, { chord: 'C7',  beats: 4 }, // 10
      { chord: 'F7',    beats: 4 }, { chord: 'D7',  beats: 4 }, // 11
      { chord: 'Gm7',   beats: 4 }, { chord: 'C7',  beats: 4 }, // 12
    ],
  },

  {
    id: 'bt-key-cycle-ab-120',
    name: i18('장3도 키 센터 사이클 BPM 120'),
    key: 'Ab',
    bpm: 120,
    style: 'standard',
    bars: 16,
    loopCount: 4,
    // 키 센터가 장3도로 이동하는 교본 패턴 (Ab → C → Eb 등)
    chords: [
      { chord: 'Fm7',    beats: 8 },                                  // 1
      { chord: 'Bbm7',   beats: 8 },                                  // 2
      { chord: 'Eb7',    beats: 8 },                                  // 3
      { chord: 'Abmaj7', beats: 8 },                                  // 4
      { chord: 'Dbmaj7', beats: 8 },                                  // 5
      { chord: 'Dm7b5',  beats: 4 }, { chord: 'G7',  beats: 4 },      // 6
      { chord: 'Cmaj7',  beats: 8 },                                  // 7
      { chord: 'Cmaj7',  beats: 8 },                                  // 8
      { chord: 'Cm7',    beats: 8 },                                  // 9
      { chord: 'Fm7',    beats: 8 },                                  // 10
      { chord: 'Bb7',    beats: 8 },                                  // 11
      { chord: 'Ebmaj7', beats: 8 },                                  // 12
      { chord: 'Abmaj7', beats: 8 },                                  // 13
      { chord: 'Am7b5',  beats: 4 }, { chord: 'D7',  beats: 4 },      // 14
      { chord: 'Gmaj7',  beats: 8 },                                  // 15
      { chord: 'Gmaj7',  beats: 8 },                                  // 16
    ],
  },

  {
    id: 'bt-dorian-d-100',
    name: i18('D Dorian 모달 뱀프 BPM 100'),
    key: 'D',
    bpm: 100,
    style: 'modal',
    bars: 8,
    loopCount: 8,
    // 한 코드 뱀프 — 모드 솔로 연습용
    chords: [
      { chord: 'Dm7', beats: 64 },
    ],
  },

  {
    id: 'bt-lydian-f-90',
    name: i18('F Lydian 모달 뱀프 BPM 90'),
    key: 'F',
    bpm: 90,
    style: 'modal',
    bars: 8,
    loopCount: 8,
    // F Lydian 색채 — Fmaj7로 통일, 솔로이스트가 #11 띄움
    chords: [
      { chord: 'Fmaj7', beats: 64 },
    ],
  },

  {
    id: 'bt-rhythm-changes-bb-140',
    name: i18('B♭ Rhythm Changes (AABA) BPM 140'),
    key: 'Bb',
    bpm: 140,
    style: 'standard',
    bars: 32,
    loopCount: 3,
    // 표준 AABA I-VI-ii-V 비밥 형식 — 교본 표준
    chords: [
      // A1 (8 bars)
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 1
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 2
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 3
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 4
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'Bb7',  beats: 4 },  // 5
      { chord: 'Ebmaj7', beats: 4 }, { chord: 'Edim7',beats: 4 },  // 6
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'F7',   beats: 4 },  // 7
      { chord: 'Bbmaj7', beats: 8 },                               // 8
      // A2 (8 bars) — A1 반복
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 9
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 10
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 11
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 12
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'Bb7',  beats: 4 },  // 13
      { chord: 'Ebmaj7', beats: 4 }, { chord: 'Edim7',beats: 4 },  // 14
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'F7',   beats: 4 },  // 15
      { chord: 'Bbmaj7', beats: 8 },                               // 16
      // B (Bridge, 8 bars) — III VI II V 사이클
      { chord: 'D7',     beats: 8 },                               // 17
      { chord: 'D7',     beats: 8 },                               // 18
      { chord: 'G7',     beats: 8 },                               // 19
      { chord: 'G7',     beats: 8 },                               // 20
      { chord: 'C7',     beats: 8 },                               // 21
      { chord: 'C7',     beats: 8 },                               // 22
      { chord: 'F7',     beats: 8 },                               // 23
      { chord: 'F7',     beats: 8 },                               // 24
      // A3 (8 bars)
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 25
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 26
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'G7',   beats: 4 },  // 27
      { chord: 'Cm7',    beats: 4 }, { chord: 'F7',   beats: 4 },  // 28
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'Bb7',  beats: 4 },  // 29
      { chord: 'Ebmaj7', beats: 4 }, { chord: 'Edim7',beats: 4 },  // 30
      { chord: 'Bbmaj7', beats: 4 }, { chord: 'F7',   beats: 4 },  // 31
      { chord: 'Bbmaj7', beats: 8 },                               // 32
    ],
  },

  {
    id: 'bt-ballad-eb-70',
    name: i18('E♭ 발라드 ii-V-I BPM 70'),
    key: 'Eb',
    bpm: 70,
    style: 'standard',
    bars: 16,
    loopCount: 4,
    // 발라드 톤의 전형적 ii-V-I 사이클 — 교본 표준
    chords: [
      { chord: 'Cm7',    beats: 8 },                                // 1
      { chord: 'F7',     beats: 8 },                                // 2
      { chord: 'Bbmaj7', beats: 8 },                                // 3
      { chord: 'Bbmaj7', beats: 8 },                                // 4
      { chord: 'Fm7',    beats: 8 },                                // 5
      { chord: 'Bb7',    beats: 8 },                                // 6
      { chord: 'Ebmaj7', beats: 8 },                                // 7
      { chord: 'Ebmaj7', beats: 8 },                                // 8
      { chord: 'Abmaj7', beats: 8 },                                // 9
      { chord: 'Adim7',  beats: 8 },                                // 10
      { chord: 'Ebmaj7', beats: 4 }, { chord: 'Cm7',    beats: 4 }, // 11
      { chord: 'Fm7',    beats: 4 }, { chord: 'Bb7',    beats: 4 }, // 12
      { chord: 'Ebmaj7', beats: 8 },                                // 13
      { chord: 'Adim7',  beats: 8 },                                // 14
      { chord: 'Ebmaj7', beats: 4 }, { chord: 'Cm7',    beats: 4 }, // 15
      { chord: 'Fm7',    beats: 4 }, { chord: 'Bb7',    beats: 4 }, // 16
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
