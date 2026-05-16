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
      content: i18(`## 왜 지판 파악이 먼저인가

재즈는 코드 변화에 즉시 반응하는 음악입니다. "다음 마디는 E♭7이니까 E♭, G, B♭, D♭를 골라야지"라는 판단이 0.1초 안에 일어나야 합니다. 그러려면 그 음들이 지판 어디에 있는지를 머리가 아닌 손가락이 알고 있어야 합니다.

기타는 같은 음이 지판 여러 곳에 존재한다는 특성이 있습니다. 예를 들어 C 음만 해도 5번줄 3프렛, 4번줄 10프렛, 3번줄 5프렛 등 위치가 여러 개입니다. 이 모든 위치를 옥타브 관계로 외워두면, 솔로 중에 한 위치에서 막혀도 다른 위치로 즉시 이동할 수 있게 됩니다.

## 어떻게 쓰이는가

가장 빠른 방법은 한 줄씩 12음을 처음부터 끝까지 순서대로 외운 다음, 다시 무작위로 짚어 보는 것입니다. 6번줄과 5번줄이 가장 먼저 단단해져야 합니다. 베이스 라인과 코드 루트가 모두 이 두 줄에 자리잡기 때문입니다. 옥타브 모양 두 가지(6번→4번, 5번→3번)를 손에 익히면, 한 줄에서 알면 다른 줄도 자동으로 따라옵니다.

## 핵심 포인트

- 6·5번줄을 가장 먼저 단단히 — 베이스/루트 자리
- 같은 음의 옥타브 위치 모양 두 가지를 손에 익힙니다
- 처음에는 한 음씩 무작위로 30초 안에 짚어 봅니다
- 모든 음을 한 번에 외우려 하지 말고 한 줄씩 정복합니다
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
      content: i18(`## 7th 코드 구구단이란

재즈에서 가장 흔히 쓰이는 7th 코드는 다섯 가지입니다. Maj7(메이저 7도), m7(마이너 7도), 7(도미넌트 7도), m7♭5(하프 디미니쉬드), dim7(풀 디미니쉬드)입니다. 이 5가지 퀄리티에 12 루트를 곱하면 60 코드가 됩니다. "Cmaj7은 C-E-G-B" 처럼 즉시 구성음이 떠오르도록 만드는 것을 "7th 구구단"이라고 부릅니다.

이 구구단이 단단해야 컴핑, 보이싱, 솔로 모두 가능해집니다. 코드 심볼을 보고 0.5초 안에 4음이 떠오르면 다음 단계로 갈 수 있습니다. 그 전에는 어떤 보이싱을 외워도 결국 모양만 익히게 됩니다.

## 어떻게 쓰이는가

먼저 트라이어드(3음)부터 시작합니다. C 메이저 트라이어드는 C-E-G, A 마이너 트라이어드는 A-C-E. 12 루트를 메이저/마이너로 한 바퀴 돌리면 트라이어드 구구단이 됩니다. 그 다음에 각 트라이어드에 7도(메이저 7도 또는 ♭7도)를 추가하면 7th 코드가 됩니다.

처음에는 입으로 소리내어 부르고, 익숙해지면 머릿속으로만 부르면서 시간을 잽니다. 트라이어드 90초, 7th 2분이 합격선입니다.

## 핵심 포인트

- 5가지 퀄리티: Maj7 / m7 / 7 / m7♭5 / dim7
- 트라이어드 → 7th 순으로 단계적으로
- 입으로 소리내어 부르며 시간을 잽니다
- 0.5초 내 4음 떠오르기가 다음 단계의 전제 조건
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

재즈만의 특이한 점은 메트로놈을 2박·4박에 놓는다는 것입니다. 보통 음악에서 강박은 1·3박이지만 재즈는 반대로 2·4박을 강조합니다. 메트로놈 한 박을 2박으로 듣고, 그 사이를 4박으로 채우는 식으로 연습하면 재즈 그루브 감각이 자연스럽게 몸에 들어옵니다.

## 어떻게 쓰이는가

처음에는 BPM 60에서 4분음표만으로 끊김 없이 연주합니다. 한 음만 반복해도 좋습니다. 익숙해지면 8분음표로 올리고, BPM 80을 목표로 합니다. 8분음표는 단순한 균등 8분이 아니라 살짝 롱-숏 비율의 스윙 8분으로 연주합니다. 셋잇단의 1번과 3번을 친다고 생각하시면 됩니다.

빠른 템포(BPM 200 이상)에서는 롱-숏이 거의 균등해집니다. 처음에는 과장되게 롱-숏으로 시작하고, 빠른 템포에서 자연스럽게 균등에 가까워지게 두면 됩니다.

## 핵심 포인트

- 메트로놈은 2·4박에 둡니다 (재즈 표준)
- 4분음표 → 8분음표 → 스윙 8분음표 순으로 단계적
- BPM 60 안정 → 80 → 100 → 120
- 박자가 흔들리면 BPM을 낮춰서 다시
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
      content: i18(`## CAGED 5포지션은 무엇인가

CAGED는 메이저 코드의 5가지 모양(C, A, G, E, D)에서 따온 이름으로, 지판 전체를 5개 박스로 나눠 외우는 방식입니다. 한 키의 메이저 스케일을 이 5 포지션으로 외우면, 지판 어디에서든 그 키의 음을 즉시 찾을 수 있습니다.

각 포지션은 4 프렛 정도의 범위 안에 모든 다이아토닉 음을 포함합니다. 한 포지션을 위·아래로 자유롭게 연주하면 한 박스를 마스터한 것입니다. 5 포지션이 서로 한두 프렛씩 겹치면서 지판 전체를 덮습니다.

## 어떻게 쓰이는가

처음에는 한 포지션에 집중합니다. 5번줄 3프렛 C부터 시작하는 박스(C 메이저 5포지션 중 하나)를 위·아래로 BPM 80에서 끊김 없이. 그 다음 6번줄 8프렛 C에서 시작하는 박스로 이동합니다. 5포지션을 모두 익힌 다음 키를 바꿔서(G·F) 같은 모양들을 다른 프렛에서 적용합니다.

솔로 중에 한 박스에서 막히면 다른 박스로 즉시 이동할 수 있게 만드는 것이 목표입니다. 박스 사이의 연결점(같은 음이 두 박스에 동시에 존재하는 자리)을 의식하면 자연스럽게 이동할 수 있습니다.

## 핵심 포인트

- CAGED = 메이저 코드 5 모양에서 따온 5 포지션
- 한 포지션 마스터 → 5 포지션 → 키 이동
- 포지션 사이 연결점을 의식하면 자유롭게 이동
- 솔로 중에 한 박스에서 막혀도 다른 박스로 즉시
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
      content: i18(`## 마이너 펜타토닉은 무엇인가

마이너 펜타토닉 스케일은 5음으로 이루어진 가장 보편적인 솔로 도구입니다. F 키 기준 음은 F, A♭, B♭, C, E♭ 다섯 개로, 다이아토닉 7음에서 충돌하기 쉬운 두 음을 빼낸 형태입니다.

이 스케일이 블루스에 잘 맞는 이유는 빠진 두 음이 코드 변화에서 어색해지기 쉬운 음이기 때문입니다. 그래서 블루스 진행의 모든 코드 — F7, B♭7, C7 — 위에서 큰 충돌 없이 사용할 수 있습니다.

## 어떻게 쓰이는가

펜타토닉 1포지션은 1프렛부터 시작하는 박스 모양으로 외워두면 됩니다. 처음에는 박자에 맞춰 위로 한 번, 아래로 한 번 부드럽게 흐르듯 연주하는 것에 집중하시면 좋습니다.

곡 전체에서 한 포지션만 사용해도 충분히 음악적인 솔로가 됩니다. 익숙해진 다음에 5개 포지션 전체를 자유롭게 오가도록 확장하면 됩니다.

## 핵심 포인트

- F 마이너 펜타토닉: F, A♭, B♭, C, E♭
- 1포지션은 1프렛부터 시작 (6번줄 1프렛 F)
- 박자에서 벗어나지 않는 것이 첫 번째 목표
- 음을 적게 쓸수록 더 음악적으로 들립니다
`),
      abcNotation: 'X:1\nT:F minor pentatonic\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: F A B c e f e c | f e c B A F F2 :|',
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
      content: i18(`## Mixolydian은 무엇인가

Mixolydian 스케일은 메이저 스케일에서 7도를 반음 내린 형태로, 7번째 음이 ♭7이 되는 7음 스케일입니다. F Mixolydian이라면 F, G, A, B♭, C, D, E♭ 이 됩니다. 이름이 어렵게 들리지만, 결국 도미넌트 7th 코드(F7)와 가장 잘 맞는 스케일이라고 이해하시면 됩니다.

블루스의 세 코드 F7, B♭7, C7은 모두 도미넌트 7th 입니다. 그래서 각 마디마다 그 코드에 해당하는 Mixolydian으로 음을 골라주면 코드 변화가 솔로에서 자연스럽게 들리게 됩니다.

## 어떻게 쓰이는가

펜타토닉 한 박스로만 솔로하면 모든 코드에 무난하지만 표정이 단조롭습니다. 여기에 Mixolydian의 3도(메이저 3도)와 다이아토닉 음을 섞으면 색깔이 살아납니다. 특히 IV7(B♭7)으로 넘어갈 때 B♭ Mixolydian의 A♭(b7)을 의식적으로 짚으면, F장조에는 없는 음이 들어가서 코드 변화가 분명히 드러납니다.

처음에는 두 스케일을 동시에 외우기 어렵습니다. 펜타토닉 박스를 기준으로 두고, "F7 마디에서는 펜타토닉에 A를 더한다", "B♭7 마디에서는 A를 A♭로 바꾼다" 같은 식으로 한 음씩 추가해 가시는 것이 안전합니다.

## 핵심 포인트

- Mixolydian = 메이저 스케일의 ♭7 버전 (도미넌트 7th와 짝)
- F7 마디 → F Mixolydian / B♭7 마디 → B♭ Mixolydian
- 핵심은 메이저 3도와 ♭7의 조합
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
      content: i18(`## 왜 인용하는가

재즈 솔로의 어휘는 결국 외운 프레이즈에서 시작됩니다. Kenny Burrell처럼 한 시대를 정의한 연주자의 짧은 라인을 하나 외워두면, 자신의 솔로 안에서 "이 사람이 어떻게 음을 골랐는지"를 직접 체화할 수 있습니다.

이 단계에서 중요한 건 프레이즈를 100% 복제하는 것이 아니라, 그 라인의 리듬과 음 선택을 박자 안에 정확히 얹는 것입니다. 같은 프레이즈를 1박, 3박 등 다른 자리에서 시작해 보면 같은 라인이 전혀 다른 느낌으로 들리는 것을 알 수 있습니다.

## 어떻게 쓰이는가

Kenny Burrell의 시그니처는 블루스 스케일에 더블스톱을 살짝 섞는 것입니다. 한 프레이즈를 정확히 외우고, F 블루스 12바 안에 한 번만 끼워넣는 것부터 시작합니다. 익숙해진 다음에 다른 마디·다른 박자에서 같은 라인을 다시 사용해 봅니다.

너무 자주 쓰면 진부해집니다. 한 코러스에 한두 번이 적당합니다.

## 핵심 포인트

- 프레이즈를 외울 때는 음과 리듬을 함께 외웁니다
- 같은 라인을 다른 마디·다른 박자에서 시작해 봅니다
- 한 코러스에 한두 번 정도가 적당합니다
- 자신의 솔로 흐름과 자연스럽게 연결되도록 앞뒤를 다듬습니다
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
      content: i18(`## 턴어라운드는 무엇인가

턴어라운드는 12바 블루스의 마지막 2마디 — 마디 11과 12 — 에서 다음 코러스의 마디 1로 자연스럽게 끌어주는 짧은 코드/멜로디 진행을 말합니다. 가장 단순한 형태는 \`F7 - D7 | Gm7 - C7\` 입니다. D7은 Gm7으로 끌어주는 세컨더리 도미넌트 역할을 합니다.

멜로디 라인으로 보면 두 가지 단골 패턴이 있습니다. 첫 번째는 \`1 - 3 - 4 - ♯4 | 5\`로 반음씩 올라가서 V7에 도착하는 라인, 두 번째는 \`1 - ♭7 - 6 - ♭7 | 5\`로 위에서 내려오는 라인입니다. 두 라인 모두 마디 12 끝에서 자연스럽게 다음 코러스 마디 1의 I7으로 떨어집니다.

## 어떻게 쓰이는가

턴어라운드는 어떤 블루스 솔로에서도 반드시 거치는 자리입니다. 11-12마디에 닿으면 손이 자동으로 이 패턴을 알고 있어야 솔로의 흐름이 끊기지 않습니다. 한 패턴을 깊게 외운 다음, 키만 바꿔서 12 키 어디서든 같은 모양으로 사용할 수 있도록 만드는 것이 목표입니다.

## 핵심 포인트

- 마디 11-12 = 턴어라운드 자리
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
      content: i18(`## 왜 여러 키로 연주해야 하는가

한 키에서만 익숙해진 라인은 그 키의 운지를 기억할 뿐, 음악적 관계를 외운 것이 아닙니다. 같은 라인을 F, B♭, C 세 키로 옮겨 보면 비로소 "이 라인이 1도-♭3-4-♭5-5도로 움직이는구나" 같은 관계로 머리에 들어옵니다.

세션이나 잼 상황에서는 호른 연주자가 자신에게 편한 키로 블루스를 잡습니다. 호른의 단골 키가 B♭과 F입니다. 기타리스트가 자기 키(E, A)에서만 익숙하면 어울려 연주하기 어렵습니다.

## 어떻게 쓰이는가

먼저 F에서 익힌 12바 솔로의 윤곽을 그대로 B♭에 옮깁니다. 같은 운지 모양을 5프렛에서 시작하면 됩니다. C는 8프렛 또는 같은 1포지션 박스를 옮긴 형태입니다. 라인을 외우려 하지 말고 "코드 변화에 대한 같은 반응"을 다른 위치에서 재현한다고 생각하시면 좋습니다.

## 핵심 포인트

- 같은 라인을 다른 키로 옮기면 음악적 관계로 외워집니다
- F·B♭·C는 잼/세션에서 가장 빈도 높은 블루스 키입니다
- 운지 모양을 그대로 옮기는 것에서 시작해 차츰 자유롭게 위치를 바꿉니다
- 박자가 흐트러지면 익숙하지 않다는 신호입니다
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
      content: i18(`## 솔로 기타란 무엇인가

솔로 기타는 한 대의 기타만으로 베이스·코드·멜로디 세 층을 동시에 표현하는 연주 방식입니다. Joe Pass의 *Virtuoso* 앨범이 대표적입니다. 반주자가 없는 상황에서도 곡 한 곡을 온전히 들려줄 수 있다는 점이 큰 매력입니다.

기본 발상은 단순합니다. 베이스 음을 6번줄·5번줄에 두고, 그 위 줄들에 코드의 3·7과 멜로디를 얹습니다. 모든 음을 동시에 칠 필요는 없습니다. 베이스 → 코드 → 멜로디 순서로 약간씩 어긋나게 표현해도 충분히 풍성하게 들립니다.

## 어떻게 쓰이는가

블루스는 솔로 기타의 좋은 입문 곡입니다. 진행이 단순하고, 베이스 라인을 단순한 1박-루트 / 3박-5도 패턴으로만 잡아도 자연스럽게 흐릅니다. 처음에는 멜로디를 생략하고 베이스+코드만으로 12바를 완주합니다. 거기에 마디 끝마다 짧은 펜타토닉 한 라인을 보태는 식으로 멜로디를 점차 채워 갑니다.

## 핵심 포인트

- 베이스(6·5번줄) + 코드(3·4번줄) + 멜로디(1·2번줄)
- 모두 동시에 칠 필요는 없습니다 — 약간 어긋나게도 좋습니다
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
      content: i18(`## 가이드 톤이란

가이드 톤은 코드의 3도와 7도, 두 음만을 가리킵니다. 이 두 음이 코드의 색깔(메이저/마이너/도미넌트)을 결정합니다. 1도와 5도는 베이스나 다른 악기가 채워주는 경우가 많아, 기타가 두 음만으로도 진행을 분명히 들려줄 수 있습니다.

가이드 톤의 진짜 매력은 보이스 리딩입니다. ii-V-I 진행 \`Dm7 - G7 - Cmaj7\`에서, Dm7의 3·7(F·C) → G7의 7·3(F·B) → Cmaj7의 3·7(E·B) 로 이어집니다. 보시면 F는 그대로 유지, C는 B로 반음 내려가고, F는 다시 E로 반음 내려갑니다. 한 음씩만 반음 움직여서 진행 전체가 연결됩니다. 이게 좋은 보이스 리딩의 본질입니다.

## 어떻게 쓰이는가

처음에는 두 음만 4·3번줄에 잡고 ii-V-I 진행을 연주합니다. 베이스 음 없이, 가이드 톤만으로도 청자가 코드 진행을 충분히 알아듣습니다. 익숙해지면 베이스 음을 6번줄에 더해서 셸 보이싱(1-3-7 또는 1-7-3)으로 발전시킵니다.

## 핵심 포인트

- 가이드 톤 = 코드의 3도 + 7도
- 보이스 리딩의 본질: 반음씩만 움직이기
- ii-V-I에서 한 음은 유지, 한 음은 반음 이동
- 12 키 모두에서 같은 방식으로 적용 가능
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
      content: i18(`## Drop 2 보이싱이란

Closed voicing(닫힌 보이싱)은 코드의 4음을 한 옥타브 안에 차곡차곡 쌓은 형태입니다. 피아노에서는 자연스럽지만 기타에서는 손으로 잡기가 어렵습니다. Drop 2는 closed voicing의 위에서 두 번째 음을 한 옥타브 아래로 떨어뜨린 형태입니다. 기타 4 줄에 자연스럽게 펼쳐져서 잡기 좋아집니다.

Cmaj7을 예로 들면 closed는 C-E-G-B 인데, Drop 2는 G를 한 옥타브 내려서 G-C-E-B 가 됩니다. 이 4음을 5·4·3·2번줄(또는 6·4·3·2번줄)에 한 음씩 잡습니다. 같은 코드를 5번줄 루트와 6번줄 루트 두 자리에서 모두 익히면 지판을 좌우로 자유롭게 오갈 수 있습니다.

## 어떻게 쓰이는가

가장 먼저 Cmaj7, Dm7, G7 세 코드의 두 자리 Drop 2를 외웁니다. ii-V-I 진행에서 이 세 코드를 짚으면서 보이스 리딩이 부드럽게 흐르도록 자리를 고르는 것이 핵심입니다. Cmaj7을 잡은 자리 근처에서 가장 가까운 Dm7, G7을 골라야 손도 편하고 음악적 흐름도 자연스럽습니다.

Drop 2 외에 Drop 3(closed에서 위에서 세 번째 음을 떨어뜨림)도 있지만, 가장 먼저 Drop 2 두 폼을 단단히 익히는 것이 우선입니다.

## 핵심 포인트

- Closed → Drop 2 = 위에서 두 번째 음을 한 옥타브 아래로
- 같은 코드 두 폼: 5번줄 루트 / 6번줄 루트
- 진행에서는 가장 가까운 자리의 보이싱을 고릅니다
- 두 폼을 혼합하면 손이 편하고 보이스 리딩도 자연스러워집니다
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
      content: i18(`## 왜 12 키인가

재즈의 모든 스탠다드는 결국 ii-V-I 진행의 변형입니다. Autumn Leaves는 G장조 ii-V-I과 Em 마이너 ii-V-i의 반복이고, All The Things You Are는 4개의 키 센터를 ii-V-I으로 옮겨다니는 곡입니다. 그래서 12 키 ii-V-I이 손에 들어와 있으면 어떤 스탠다드를 만나도 곧장 컴핑할 수 있게 됩니다.

12 키를 한 번에 외울 필요는 없습니다. 4도 사이클(C → F → B♭ → E♭ … )로 한 키씩 옮기면, 각 키의 ii-V-I가 한 프렛씩(또는 5프렛) 이동하는 것을 볼 수 있습니다. 같은 운지 모양이 위치만 옮겨지는 것입니다.

## 어떻게 쓰이는가

처음에는 C장조에서 ii-V-I 두 자리 보이싱을 안정시킵니다. 그 다음 4도 사이클로 한 키씩 추가합니다. 한 키를 4마디(ii 2박, V 2박, I 4박)씩 두고 백킹 없이 메트로놈만으로 12 키를 한 바퀴 돕니다. 한 바퀴가 BPM 80에서 끊김 없이 가능해지면 다음 단계로 넘어갑니다.

## 핵심 포인트

- 12 키는 4도 사이클로 외우면 같은 운지 모양이 이동합니다
- 한 키 4마디(ii-V 한 마디씩, I 두 마디)
- 두 자리 보이싱(5줄/6줄 루트)을 골라 손 이동을 최소화
- BPM 80 한 바퀴 끊김 없이가 합격선
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
      content: i18(`## V7과 텐션

ii-V-I 진행에서 가장 긴장이 높은 자리가 V7입니다. V7이 I로 해결할 때 청자는 "다음이 곧 풀린다"는 기대감을 가집니다. 이 자리에 텐션(♭9, ♭13, ♯9, ♯11)을 추가하면 긴장이 더 커지고, 결과적으로 I로 풀리는 감각이 더 깊어집니다.

V7에 자주 쓰는 텐션은 ♭9, ♭13입니다. G7(♭9)이라면 G-B-F-A♭, G7(♭13)이라면 G-B-F-E♭ 식입니다. 이 음들이 들어가면 코드가 "어두워지면서 강하게 끌리는" 느낌이 됩니다. 텐션을 V7 자리에만 두고 I는 자연 음으로 가는 것이 가장 무난한 사용법입니다.

해결 방향에는 단골 패턴이 있습니다. ♭9는 5도로 내려가고, ♭13은 9도로 내려가며, ♯11은 9도로 올라갑니다. 이걸 의식하면 보이스 리딩이 자연스러워집니다.

## 어떻게 쓰이는가

처음에는 G7에 ♭9 한 음만 추가한 보이싱을 잡습니다. ii-V-I 진행에서 Dm7 → G7(♭9) → Cmaj7로 가면 V7 자리만 색깔이 달라집니다. 익숙해지면 ♭13 보이싱을 추가하고, 두 텐션을 같이 쓰는 G7(♭9, ♭13)도 시도합니다. 마이너 ii-V-i (Dm7♭5 - G7 - Cm)에서는 거의 항상 V7에 텐션을 추가합니다.

## 핵심 포인트

- 텐션은 V7 자리에 — I와 ii는 자연 음으로
- 자주 쓰는 V7 텐션: ♭9, ♭13, ♯9, ♯11
- 해결 방향: ♭9↓→5 / ♭13↓→9 / ♯11↑→9
- 마이너 ii-V-i에서는 거의 필수
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
      content: i18(`## Walking Bass란

Walking Bass는 한 마디 안에 4박 모두 한 음씩 떨어뜨리는 베이스 라인입니다. 매 박이 4분음표 하나로, "걷는 듯한" 일정한 흐름을 만듭니다. 베이시스트가 없는 상황에서 기타가 베이스 역할을 대신할 때 가장 흔하게 사용합니다.

가장 단순한 공식은 \`1박 - 루트 / 2박 - 코드톤(3 또는 5) / 3박 - 임의의 음 / 4박 - 다음 코드 루트로 가는 접근음\`입니다. 4박을 다음 코드 루트의 반음 위/아래에 두면 자연스럽게 다음 마디로 흘러갑니다. 이를 chromatic approach라고 부릅니다.

다른 접근 방식으로 Triad 접근(코드 트라이어드 음만 사용)이나 Diatonic 접근(스케일 음으로 채움)도 있습니다. 처음에는 트라이어드 접근으로 단순하게 시작하시면 좋습니다.

## 어떻게 쓰이는가

C장조 ii-V-I 한 마디씩 진행에서 Dm7 → G7 → Cmaj7. 각 마디 1박에 루트(D, G, C)를 둡니다. 다음 마디 진입 박(4박)을 다음 루트의 반음 위/아래에 둡니다. 예: Dm7 → G7로 갈 때 Dm7의 4박을 A♭(G의 반음 위) 또는 F♯(G의 반음 아래)에 두는 식.

베이스 라인이 안정되면 그 위에 짧은 코드 셸 보이싱(3·7만)을 2·4박에 살짝 끼워넣어 컴핑 효과를 만듭니다.

## 핵심 포인트

- 매 박 한 음 — 일정한 4분음표 흐름
- 1박 = 루트, 4박 = 다음 루트로 가는 접근음
- 반음 접근(chromatic)이 가장 자연스럽습니다
- 베이스 위에 코드 셸을 살짝 더하면 "워킹 + 컴핑" 완성
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
      content: i18(`## Altered chord란

V7alt는 V7의 9와 13 텐션이 모두 ♭ 또는 ♯로 변경된 코드입니다. 즉 ♭9, ♯9, ♭13(또는 ♯5), ♯11 텐션이 동시에 가능한 V7입니다. G7alt의 구성은 보통 G - B - F - A♭(♭9) - D♯(♯9) - C♯(♯11) - E♭(♭13) 중에서 4-5음을 골라 잡습니다.

이론적으로 G7alt = A♭ Jazz minor scale입니다. 즉 V7 음 위에서 반음 위 jazz minor 스케일을 솔로 도구로 쓰면 그게 곧 altered 사운드입니다. 보이싱에서는 G-F-B-E♭ 같은 4음 조합이 가장 잘 쓰입니다(루트, ♭7, 3, ♭13).

V7alt → I 해결은 일반 V7보다 훨씬 강합니다. 청자에게 "이제 풀려야 한다"는 압박을 강하게 주고 풀어주는 카타르시스가 있습니다. Sunny 같은 마이너 곡, ii-V-i 진행에서 거의 항상 등장합니다.

## 어떻게 쓰이는가

처음에는 G7alt 보이싱 하나를 외웁니다. 5번줄 루트 또는 6번줄 루트 자리에서 ♯9·♭13을 포함하는 4음 조합. ii-V-I 진행에서 V7 자리를 V7alt로 바꿔서 연주하고, 그 다음 I로 해결합니다. 해결음은 V7alt 안의 ♭13(예: E♭)이 I의 3도(E)로 반음 올라가는 식의 자연스러운 보이스 리딩이 있습니다.

## 핵심 포인트

- V7alt = ♭9, ♯9, ♭13, ♯11 텐션 가능
- 솔로: 반음 위 jazz minor 스케일 (G7alt = A♭ jazz minor)
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
      content: i18(`## 코드톤 솔로란

코드톤만으로 솔로하는 것은 재즈 솔로의 가장 기본적이고 가장 강력한 도구입니다. 각 마디에 그 코드의 1-3-5-7 네 음만 사용해서 라인을 만듭니다. 음이 적어 보이지만, 코드 변화가 솔로에서 분명히 들려서 청자가 곡의 흐름을 따라가기 좋습니다.

Dm7의 코드톤은 D-F-A-C, G7은 G-B-D-F, Cmaj7은 C-E-G-B. 한 마디 안에 이 네 음만 사용해서 박자 안에 떨어뜨리는 것이 출발점입니다. 가장 중요한 음은 3도와 7도입니다. 1도와 5도는 코드 색깔을 잘 안 드러내지만, 3도와 7도는 메이저/마이너/도미넌트를 즉시 알려 줍니다.

## 어떻게 쓰이는가

아르페지오 형태로 1-3-5-7을 위로 한 번, 아래로 한 번 짚어 봅니다. 다음 단계는 코드 변화 자리에서 다음 코드의 3도나 7도로 자연스럽게 떨어뜨리는 것입니다. Dm7에서 마지막 음을 G7의 3도(B)로 옮기는 식입니다. 이렇게 "타깃 코드톤"을 의식하면 라인이 음악적으로 들리기 시작합니다.

## 핵심 포인트

- 각 코드 1-3-5-7 네 음만 사용
- 3도와 7도가 가장 중요(코드 색깔)
- 코드 변화 자리에서 다음 코드 3·7로 타깃팅
- 음이 적어도 박자가 단단하면 음악적입니다
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
      content: i18(`## 모드 매핑이란

코드마다 어울리는 스케일이 있습니다. ii(m7)에는 Dorian, V(7)에는 Mixolydian, I(maj7)에는 Ionian(메이저)이 가장 무난합니다. 이 짝을 외워두면 어떤 코드가 와도 즉시 사용할 스케일을 정할 수 있습니다.

핵심은 세 모드가 모두 같은 모음에서 나온다는 점입니다. C장조 ii-V-I (Dm7-G7-Cmaj7)에서 D Dorian, G Mixolydian, C Ionian은 모두 C 메이저 스케일의 음과 동일합니다. 즉 한 키 안에서는 사용할 음 자체는 같고, 어느 음을 강조하느냐가 달라질 뿐입니다.

그래서 처음에는 ii-V-I을 그냥 "C 메이저 스케일 안에서 코드톤만 의식하기"로 접근해도 됩니다. 익숙해진 다음 각 모드의 특징음을 의식하면 색깔이 살아납니다. Dorian은 6도(B)가 메이저, Mixolydian은 7도(F)가 ♭7인 점이 특징음입니다.

## 어떻게 쓰이는가

C장조 ii-V-I에서 Dm7 마디는 D Dorian으로 시작 음을 D에 두고 라인을 만듭니다. G7 마디는 G에서, Cmaj7 마디는 C에서. 코드가 바뀔 때 음의 출발점만 바꾸는 식입니다. 사용 음은 모두 C 메이저 스케일.

마이너 ii-V-i이나 키 센터가 바뀌는 진행에서는 모드 매핑이 달라집니다. 그래서 각 코드 → 모드 짝을 따로 외워두는 것이 중요합니다.

## 핵심 포인트

- ii(m7) → Dorian / V(7) → Mixolydian / I(maj7) → Ionian
- 같은 키 안에서는 음이 같고 강조점만 다릅니다
- 특징음: Dorian의 메이저 6도 / Mixolydian의 ♭7
- 키 센터가 바뀌는 진행에서는 새 키의 모드를 적용
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
      content: i18(`## 인클로저란

인클로저(enclosure)는 타겟 음을 위·아래의 인접한 음으로 감싸서 그 자리에 더 강하게 도착시키는 기법입니다. 가장 단순한 형태는 B-D-C 또는 D-B-C 식으로 C를 둘러싼 다음 C에 떨어뜨리는 것입니다. 빌 에반스, 찰리 파커 같은 비밥 연주자들이 거의 모든 라인에서 사용합니다.

위·아래 음은 다이아토닉이어도 되고 반음(크로마틱)이어도 됩니다. 반음 인클로저(C♯-B-C)가 더 긴장이 강하고, 다이아토닉 인클로저(D-B-C)가 더 부드럽습니다. 둘을 섞어 쓰는 것이 일반적입니다.

인클로저의 진짜 가치는 박자에 있습니다. 타겟 음이 강박(1박 또는 3박)에 떨어지도록 인클로저의 시작 박자를 계산해야 합니다. 일반적으로 인클로저는 셋잇단/8분음표 두 음으로 시작해서 타겟이 1박에 닿게 만듭니다.

## 어떻게 쓰이는가

ii-V-I 진행에서 가장 효과적인 자리는 코드 변화 직전입니다. G7 마디의 마지막 박에서 Cmaj7의 3도(E)를 인클로저로 감싸면, Cmaj7 마디 1박에 E가 강하게 떨어집니다. 솔로의 흐름이 단번에 음악적으로 바뀝니다.

## 핵심 포인트

- 타겟 음을 위·아래 음으로 감싸 도착감을 강화
- 반음(크로마틱) vs 다이아토닉을 섞어 사용
- 타겟이 강박에 떨어지도록 박자 설계
- 가장 강력한 자리는 코드 변화 직전
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
      content: i18(`## Bebop 스케일이란

Bebop 스케일은 일반 7음 스케일에 한 음의 크로마틱 패싱톤을 더한 8음 스케일입니다. 8분음표로 한 옥타브를 연주하면 모든 코드톤이 강박에 자동으로 떨어지도록 설계된 스케일입니다.

대표 셋:
- **Bebop Dominant**: Mixolydian + ♮7 (G7 위에서 G-A-B-C-D-E-F-F♯-G)
- **Bebop Major**: Ionian + ♭6 (Cmaj7 위에서 C-D-E-F-G-G♯-A-B-C)
- **Bebop Minor**: Dorian + ♮3 (Dm7 위에서 D-E-F-F♯-G-A-B-C-D)

8분음표 두 음이 한 박이므로, 8음 스케일을 위·아래로 연주하면 코드톤(1·3·5·7)이 정확히 1·3박(강박)에 위치합니다. 7음 스케일로는 강박과 약박 사이에 어긋남이 생기지만, bebop 스케일은 이걸 보정해 줍니다.

## 어떻게 쓰이는가

ii-V-I 진행에서 G7 마디에 G Bebop Dominant 한 옥타브를 8분음표로 연주합니다. 코드톤 G·B·D·F가 모두 강박에 떨어지고, 패싱톤 F♯이 약박에 자연스럽게 들어갑니다. 이게 비밥 라인의 표준 형태입니다.

라인을 만들 때는 항상 위/아래로 일직선이지 않고, 짧은 시퀀스나 인클로저를 섞습니다. 그래도 강박에 코드톤이 떨어지는 원칙은 유지됩니다.

## 핵심 포인트

- 7음 스케일 + 1 패싱톤 = 8음
- 8분음표 연주 시 코드톤이 강박에 자동 정렬
- 세 가지: Bebop Dominant / Major / Minor
- 라인 만들 때도 강박 = 코드톤 원칙 유지
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
      content: i18(`## Altered Scale이란

Altered scale은 V7alt 코드 위에서 사용하는 스케일로, 모든 가능한 텐션(♭9, ♯9, ♯11, ♭13)을 포함합니다. 7음 스케일이지만 1, 3, ♭7만 코드톤이고 나머지는 모두 텐션입니다.

가장 쉬운 외우는 방법은 "반음 위 Jazz Minor"입니다. G7alt 위에 G Altered scale을 쓸 때, 이건 A♭ Jazz minor scale(A♭ 멜로딕 마이너의 상행 형태)과 완전히 같은 음입니다. A♭-B♭-B-C♯-E♭-F-G. 즉 V7alt 위에서는 반음 위 자리의 메이저 운지(메이저 스케일의 6도 ♭, 7도 ♮)를 그대로 짚으면 됩니다.

해결감이 강한 이유는 ♯9·♭13 같은 음이 모두 I 코드의 코드톤으로 반음 해결되기 때문입니다. G7alt의 A♭(♭9)이 G(I의 5도)로, B♭(♯9)이 B(I의 7도)로 내려가는 식. 청자에게 "이제 풀려야 한다"는 압박을 강하게 줍니다.

## 어떻게 쓰이는가

C장조 ii-V-I에서 V7 자리를 V7alt로 바꾸고 G Altered를 솔로에 사용합니다. A♭ Jazz minor 한 옥타브를 외우면 됩니다. 위·아래로 연주하면서 마지막 음을 Cmaj7의 코드톤(특히 3도 E)으로 떨어뜨립니다.

처음에는 1마디만 사용합니다. 솔로 전체를 Altered로 채우면 어지러워집니다. V7 1-2박만 Altered를 쓰고 나머지는 다른 어휘로 해결.

## 핵심 포인트

- G Altered = A♭ Jazz Minor (반음 위 자리)
- 모든 텐션 포함: ♭9, ♯9, ♯11, ♭13
- I 코드톤으로 반음 해결되는 구조
- 처음에는 1마디만, 점차 자유롭게
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
      content: i18(`## 릭이란

릭(lick)은 한 마디에서 두세 마디 분량의 짧은 멜로디 라인으로, 한 진행(주로 ii-V-I)에 정확히 어울리는 어휘입니다. 모든 재즈 연주자는 수십에서 수백 개의 릭을 외우고 있고, 솔로 중에 자기 라인 안에 자연스럽게 끼워넣습니다.

릭을 외우는 것은 모방이 아니라 "어휘 학습"입니다. 한국어를 배울 때 단어와 문장을 외우는 것과 같습니다. 외운 릭이 일정 수에 이르면, 같은 패턴들이 코드 변화에 어떻게 반응하는지가 머리에 들어옵니다. 거기서부터 자신만의 변형이 가능해집니다.

좋은 릭의 조건은 (1) 박자가 단단하고 (2) 코드 변화에 정확히 떨어지며 (3) 자기 솔로 흐름과 자연스럽게 이어진다는 것입니다.

## 어떻게 쓰이는가

먼저 한 ii-V-I 릭을 음과 박자 모두 정확히 외웁니다. 그 다음 5 키로 옮겨 연주합니다. 같은 라인이 다른 위치에서 어떻게 다르게 들리는지 들어 봅니다. 익숙해지면 솔로 1코러스에 그 릭을 한 번만 등장시킵니다. 너무 자주 쓰면 솔로가 인용으로만 들립니다.

릭 3개가 안정적으로 사용 가능해지면 자기 어휘로 변형하는 단계로 넘어갑니다. 릭의 시작 음을 다른 음으로 바꾸거나, 끝 음을 다음 코드의 다른 코드톤으로 옮기는 식입니다.

## 핵심 포인트

- 릭 = 어휘 학습 — 외울수록 자유로워집니다
- 한 릭 → 12 키 → 솔로에 한 번 등장
- 한 코러스에 인용은 1-2번이 적당
- 익숙해지면 변형으로 자기 라인 만들기
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
      content: i18(`## 인터벌 청음은 청음의 기초

인터벌(interval)은 두 음 사이의 거리입니다. 모든 멜로디·코드·스케일은 결국 인터벌의 조합입니다. 그래서 두 음을 듣고 인터벌을 즉시 식별하는 능력이 청음의 모든 기초가 됩니다.

12 인터벌은 m2(반음)부터 P8(옥타브)까지입니다. 각 인터벌에 단순한 멜로디 단서를 짝지어 두면 외우기 쉽습니다. P4(완전 4도)는 "결혼 행진곡 시작"(빰빰), P5는 "스타워즈 테마", m3은 "Greensleeves" 같은 식.

가장 헷갈리는 짝은 (1) M3 ↔ P4, (2) P5 ↔ m6, (3) TT(트라이톤) ↔ 그 외 모든 것입니다. 이 헷갈리는 짝만 따로 드릴하면 정답률이 빠르게 올라갑니다.

## 어떻게 쓰이는가

매일 5분 인터벌 드릴을 합니다. 앱(EarMaster, Functional Ear Trainer 등)에서 12 인터벌을 무작위로 듣고 즉시 답합니다. 처음에는 답하기 전에 익숙한 멜로디 단서를 떠올려도 됩니다. 익숙해지면 단서 없이도 즉시 답합니다.

## 핵심 포인트

- 12 인터벌 = 모든 멜로디·코드의 기초
- 각 인터벌에 멜로디 단서 짝지어 외우기
- 헷갈리는 짝(M3↔P4, P5↔m6)만 따로 드릴
- 매일 5분, 80% 정답률 목표
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
      content: i18(`## 코드 퀄리티 청음

곡 카피의 두 번째 단계는 코드 퀄리티를 듣고 식별하는 것입니다. 멜로디만으로는 한 곡을 완성할 수 없고, 코드 진행을 읽어야 비로소 곡 구조가 보입니다.

다섯 가지 7th 코드의 특징:
- **Maj7**: 밝고 살짝 떠 있는 느낌 (메이저 3도 + 메이저 7도)
- **m7**: 어둡지만 안정적 (마이너 3도 + ♭7)
- **7 (Dominant)**: 긴장이 있고 어딘가로 가고 싶어 함 (메이저 3도 + ♭7)
- **m7♭5**: 무거우면서 불안정 (마이너 3도 + ♭5 + ♭7)
- **dim7**: 긴장이 가장 높고 어디로든 풀릴 수 있음 (모두 단3도 적층)

처음에 가장 쉬운 구분은 Maj7 vs m7입니다. 메이저 3도와 마이너 3도의 색깔 차이만 듣습니다. 그 다음 m7 vs 7 — 둘 다 ♭7이지만 3도가 다릅니다.

## 어떻게 쓰이는가

피아노/기타로 한 루트에서 5가지 코드를 차례로 들어 봅니다. 같은 루트에서 들으면 차이가 분명히 들립니다. 익숙해지면 다른 루트에서 무작위로 듣고 답합니다.

## 핵심 포인트

- Maj7 = 밝음 / m7 = 어두움 / 7 = 긴장
- m7♭5 = 무거움 / dim7 = 가장 긴장
- 같은 루트에서 5 퀄리티 비교 → 무작위 드릴
- 80% 정답률이 합격선
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
      content: i18(`## 진행 청음의 출발점

곡을 카피할 때 가장 먼저 찾아야 할 것은 키입니다. ii-V-I 진행은 재즈에서 가장 흔한 형태이고, 이 진행이 들리면 곡의 키 센터가 즉시 보입니다. 그래서 ii-V-I을 듣고 키를 즉시 알아내는 것이 진행 청음의 출발점입니다.

ii-V-I의 청각적 특징:
- ii(m7): 어두운 출발
- V(7): 어딘가로 끌리는 긴장
- I(maj7): 풀림, 안정

이 세 단계의 "어둠 → 긴장 → 안정" 흐름이 ii-V-I의 시그니처 사운드입니다. 한 번 듣고 마지막 코드(I)의 루트를 찾으면 그게 키입니다.

스탠다드는 한 곡 안에 여러 개의 ii-V-I이 등장합니다. Autumn Leaves는 G장조 ii-V-I과 E단조 ii-V-i가 교차하고, ATTYA는 네 개의 키 센터가 ii-V-I으로 바뀝니다. 진행을 듣고 키 센터의 변화를 따라가는 것이 다음 단계입니다.

## 어떻게 쓰이는가

먼저 ii-V-I C장조 백킹 트랙을 듣고 마지막 코드의 루트(C)를 찾는 연습. 그 다음 다른 키의 ii-V-I 트랙을 듣고 키만 답합니다. 실제 곡으로 넘어가면 첫 8마디에서 ii-V-I 구간을 찾아내는 것이 목표입니다.

## 핵심 포인트

- ii-V-I = "어둠 → 긴장 → 안정"
- 마지막 I 코드 루트가 곡의 키
- 한 곡에 여러 ii-V-I이 들어있는 경우가 많음
- 첫 8마디 분석이 곡 카피의 시작
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
      content: i18(`## 멜로디 받아쓰기

멜로디 받아쓰기는 청음의 최종 단계입니다. 인터벌과 코드 청음이 단단해진 다음, 한 멜로디를 들으며 음을 종이에 (또는 기타 위에) 적어 내려가는 능력입니다. 이게 가능해지면 어떤 곡이든 들으면서 익힐 수 있습니다.

가장 좋은 방법은 짧은 단위부터 시작하는 것입니다. 4음(2박) → 8음(한 마디) → 4마디(한 프레이즈) → 8마디(반 코러스). 한 번에 길게 듣지 말고 짧게 끊어서 반복해 듣습니다. 한 번 들으면 머릿속에서 흥얼거릴 수 있을 때까지 멈추지 않습니다.

음을 받아쓸 때는 절대 음정이 아니라 키 안에서의 도수로 듣는 것이 더 빠릅니다. "도 → 미 → 솔 → 도" 식으로. 익숙해지면 키만 알면 멜로디 전체가 도수로 자연스럽게 들립니다.

## 어떻게 쓰이는가

매일 5분 멜로디 받아쓰기를 합니다. 시작은 동요 같은 단순한 멜로디. 익숙해지면 재즈 스탠다드의 멜로디로 옮깁니다. 마지막 단계는 좋아하는 솔로(Kenny Burrell 등)를 4마디씩 카피하는 것입니다. 솔로 카피는 어휘 습득의 가장 강력한 도구입니다.

## 핵심 포인트

- 짧게 끊어서 반복해 듣기 (4음 → 8음 → 4마디)
- 키 안에서의 도수로 듣기 (절대 음정 아님)
- 흥얼거릴 수 있을 때까지 멈추지 않기
- 솔로 카피가 어휘 습득의 최종 도구
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

Autumn Leaves는 재즈 스탠다드의 입문곡으로 가장 자주 추천됩니다. 두 가지 이유 때문입니다. 첫째, 진행이 G장조 ii-V-I과 E단조 ii-V-i 두 가지의 반복으로만 구성되어 있어 단순합니다. 둘째, 32마디 AABC 형태로 곡의 구조가 분명히 들립니다.

A 섹션의 진행은 \`Am7♭5 - D7 - Gm7 - C7 - Fmaj7 - B♭maj7 - Em7♭5 - A7\` (Bm 키 기준은 \`Cm7 - F7 - B♭maj7 - E♭maj7 - Am7♭5 - D7 - Gm7\`). 보시면 B♭장조 ii-V-I과 G단조 ii-V-i이 차례로 등장합니다. 이 두 진행이 곡 전체에서 반복됩니다.

곡을 외우는 비결은 진행을 도수로 외우는 것입니다. "ii-V-I in B♭ / ii-V-i in Gm" 식으로 기능으로 외우면 키를 바꿔서 연주할 때도 즉시 적용할 수 있습니다.

## 어떻게 쓰이는가

처음에는 A 섹션 8마디만 BPM 80에서 끊김 없이 컴핑합니다. 보이싱은 셸 코드(1-3-7) 또는 두 자리 Drop 2 중 선택. 익숙해지면 B 섹션과 C 섹션을 추가하고, 32마디 전체를 외워서 컴핑합니다.

## 핵심 포인트

- 두 가지 ii-V-I(장조 + 단조)의 반복
- 32마디 AABC 형태
- 도수로 외우면 키 이동이 자유
- 셸 코드 또는 Drop 2로 시작
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
      content: i18(`## 스탠다드 솔로의 출발점

Autumn Leaves 솔로는 첫 스탠다드 솔로로 가장 적합합니다. 두 가지 ii-V만 있기 때문에 솔로 어휘를 적용하기 쉽습니다. 장조 ii-V-I에는 Bebop Major 또는 Dorian/Mixolydian/Ionian, 단조 ii-V-i에는 Locrian → HM5 → 멜로딕 마이너를 사용할 수 있습니다.

첫 단계는 코드톤만으로 1코러스를 완주하는 것입니다. 각 마디에 그 코드의 1-3-5-7만 사용해서 박자 안에 떨어뜨립니다. 음이 적어 보이지만 코드 변화가 솔로에서 분명히 들려서 자연스럽게 들립니다.

두 번째 단계는 모티프 발전입니다. 첫 4마디에 짧은 모티프 하나를 만들고, 그 모티프를 다음 4마디에서 한 음만 바꿔 변형합니다. C 섹션에서 다시 변형. 같은 모티프를 발전시키면 32마디 전체에 일관된 흐름이 생깁니다.

## 어떻게 쓰이는가

처음에는 한 코러스를 모두 코드톤 아르페지오만으로 완주합니다. 그 다음 ii-V 변화 자리(예: Am7♭5 → D7)에서 타깃 코드톤을 의식합니다. 마지막에 모티프 발전을 시도합니다.

## 핵심 포인트

- 1단계: 코드톤만으로 1코러스
- 2단계: ii-V 변화 자리 타깃 코드톤
- 3단계: 첫 4마디 모티프를 발전시키기
- 음이 적어도 박자가 단단하면 음악적
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
      content: i18(`## Blue Bossa의 구조

Blue Bossa는 Kenny Dorham이 작곡한 16마디 보사노바 스탠다드입니다. 진행이 단순해서 입문자도 접근하기 좋습니다. 두 키 센터가 교대로 등장하는 것이 특징입니다.

진행:
- 1-4마디: \`Cm7 - Fm7 - Cm7\` (C단조, ii-V 없는 i-iv-i)
- 5-8마디: \`Fm7 - Cm7\` (계속 C단조)
- 9-10마디: \`Dm7♭5 - G7\` (C단조 ii-V)
- 11-12마디: \`D♭maj7\` (갑작스러운 전조)
- 13-14마디: \`Dm7♭5 - G7\` (다시 C단조 ii-V)
- 15-16마디: \`Cm7\`

11-12마디의 D♭maj7이 모달 인터체인지 또는 ♭II 전조입니다. C단조에서 갑자기 D♭장조로 옮겨가서 청자에게 색깔의 변화를 줍니다. 두 마디 후 다시 C단조 ii-V로 돌아옵니다.

## 어떻게 쓰이는가

처음에는 컴핑부터 외웁니다. 보사노바 리듬(브라질리언 부드러운 8분)에 맞춰 16마디 진행을 BPM 100에서 한 바퀴 돕니다. 솔로는 C 마이너 펜타토닉(or Dorian)을 기본으로 하고, D♭maj7 마디에서만 D♭ 메이저로 잠시 전환하는 식으로 시작합니다.

## 핵심 포인트

- 16마디, 두 키 센터 (C단조 + D♭장조)
- 11-12마디의 ♭II 전조가 핵심
- 보사노바 리듬이 컴핑의 절반
- C Dorian과 D♭ Ionian의 교차
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
      content: i18(`## Sunny의 진행

Sunny는 Bobby Hebb가 1966년에 발표한 곡으로, 재즈에서 마이너 톤성과 altered chord 처리를 배우는 입문 곡입니다. 진행은 마이너 ii-V와 도미넌트 체인의 연속으로 색깔이 풍부합니다.

핵심은 altered chord 자리들입니다. 예를 들어 B♭m7 → E♭7에서 E♭7을 E♭alt로 처리하면 F Dorian(또는 F Jazz minor)이 솔로 스케일이 됩니다. 즉 altered chord → 반음 위 Jazz minor가 단골 공식입니다. F7 → E♭7 자리는 블루노트(E♭)를 비브라토로 강조하는 자리입니다.

세 가지 어프로치:
- **B♭m7 → E♭7**: E♭alt = F Dorian/Jazz minor
- **G♭7 → G7 → F♭7**: C♭ Mixolydian + dim7 / C♭alt = D♭ Dorian
- **F7 → E♭7**: 블루노트 E♭ 비브라토 강조

## 어떻게 쓰이는가

처음에는 코드 진행만 외워 컴핑합니다. 그 다음 한 자리(예: B♭m7 → E♭7)에서 altered 어프로치를 시도합니다. 마지막에 Kenny Burrell의 시그니처 인용 한 줄을 끼워넣습니다.

## 핵심 포인트

- Altered → 반음 위 Jazz minor가 표준 공식
- F7 → E♭7에서 블루노트 비브라토
- 마이너 톤성 위에 다양한 색깔 채우기
- Kenny Burrell 어휘가 잘 어울림
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
      content: i18(`## ATTYA의 진행 구조

All The Things You Are(ATTYA)는 Jerome Kern이 1939년 작곡한 36마디 AABA' 곡입니다. 재즈 스탠다드 중 가장 자주 연주되는 곡 중 하나이고, 키 센터가 네 번 변하는 것으로 유명합니다.

키 센터 변화:
- A 섹션 (1-8): F단조 → A♭장조
- A2 섹션 (9-16): C단조 → E♭장조
- B 섹션 (17-24, 브릿지): G장조 → E장조
- A' 섹션 (25-36): A♭장조 마무리 + 코다

각 키 센터 안에 ii-V-I이 들어있어, 곡 전체가 결국 5개의 ii-V-I 진행으로 분해됩니다. 이것이 ATTYA가 ii-V-I 어휘를 적용해 보는 최고의 연습 곡인 이유입니다.

A 섹션의 핵심은 \`Fm7 - B♭m7 - E♭7 - A♭maj7\`. 즉 F단조 i-iv를 거쳐 A♭ ii-V-I로 안착합니다. 같은 패턴이 A2에서 C단조 → E♭장조로 반복됩니다.

## 어떻게 쓰이는가

처음에는 A 섹션 8마디만 컴핑합니다. 키 센터가 어디서 바뀌는지 의식하며 연주. 익숙해지면 전체 36마디를 키 센터 단위로 나눠서 외웁니다.

## 핵심 포인트

- 36마디 AABA', 키 센터 4번 변경
- 곡 전체 = 5개의 ii-V-I 진행
- 키 센터 단위로 외우면 외우기 쉽습니다
- ii-V-I 어휘 적용의 최고 연습 곡
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
      content: i18(`## Kenny Burrell 사운드

Kenny Burrell(1931-)은 디트로이트 출신의 재즈 기타리스트로, 블루스 감각이 가장 깊은 연주자 중 하나입니다. 그의 시그니처 사운드는 블루스 스케일 + 더블스톱 + 따뜻한 비브라토의 조합입니다. *Midnight Blue* 앨범이 가장 유명합니다.

세 가지 시그니처 어휘:
1. **더블스톱 슬라이드**: 3번줄과 2번줄을 동시에 짚어 슬라이드 (예: 5프렛 → 7프렛)
2. **블루노트 비브라토**: ♭5에 길게 비브라토 (한 박 이상)
3. **반복 모티프**: 한 짧은 라인을 두세 번 반복해 그루브를 만듦

Kenny의 어휘는 화려한 비밥보다 블루스 톤성에 가깝습니다. 펜타토닉과 블루스 스케일이 주된 도구이고, 거기에 메이저 3도와 ♭7을 살짝 더하는 식입니다.

## 어떻게 쓰이는가

시그니처 라인 한 개를 음과 박자 정확히 외웁니다. F 블루스 12바 안에 한 번만 등장시킵니다. 익숙해지면 라인 2개, 3개를 추가하고 솔로 안에서 골라 사용. 너무 자주 쓰면 진부해집니다.

## 핵심 포인트

- 블루스 스케일 + 더블스톱 + 비브라토
- 화려함보다 블루스 감각
- 한 코러스에 한두 번이 적당
- 펜타토닉 + 메이저 3도/♭7 색칠
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
      content: i18(`## Grant Green의 단순함

Grant Green(1935-1979)은 단순한 단음 라인과 한 모티프의 집요한 반복으로 그루브를 만들어 내는 연주자입니다. 화려한 비밥과는 정반대 방향이고, 그래서 더 강력합니다. 청자가 한 라인을 알아듣고 따라부를 수 있을 만큼 단순하게 시작하고, 그 라인을 리듬과 음의 작은 변화로 발전시킵니다.

대표적인 어휘는:
1. **한 음 반복**: 같은 음을 다양한 리듬으로 반복해 그루브 (Grant Green의 *Idle Moments* 솔로)
2. **한 마디 모티프 반복**: 같은 라인을 코드 변화에 맞춰 옮기며 반복
3. **점진적 발전**: 한 음만 바꾸며 모티프를 변형

Grant의 그루브 감각은 펑크/소울 컨텍스트에서 특히 빛납니다. *Funky Joe*, *Down Here on the Ground* 같은 곡들이 좋은 참고입니다.

## 어떻게 쓰이는가

한 음 반복부터 시작합니다. F 한 음만으로 12바 블루스 위에서 리듬 변화만으로 솔로를 만들어 봅니다. 익숙해지면 한 마디 라인으로 확장하고, 그 라인을 코드 변화에 맞춰 옮기며 반복합니다.

## 핵심 포인트

- 단순함이 그루브의 비결
- 한 음 → 한 마디 라인 → 점진적 발전
- 리듬 변화가 음 변화보다 중요
- 청자가 따라부를 수 있는 단순함
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
      content: i18(`## Wes Montgomery의 3단계

Wes Montgomery(1923-1968)는 솔로 구조의 3단계 진행으로 유명합니다. 단음 라인 → 옥타브 → 블록 코드. 솔로가 진행될수록 텍스처가 두꺼워지면서 자연스럽게 클라이맥스로 향하는 구성입니다.

옥타브 잡는 법은 두 가지가 있습니다:
- **6번 ↔ 4번줄**: 검지+약지 (한 줄 건너뛰기)
- **5번 ↔ 3번줄**: 같은 운지

피크 대신 엄지를 사용하면 Wes 특유의 따뜻하고 둥근 톤이 나옵니다. 옥타브 사이의 음(2개 줄)은 손가락 살로 살짝 뮤트해 두 음만 깨끗하게 울리게 합니다.

블록 코드 단계는 옥타브에 화음을 추가해 4음 보이싱으로 만든 형태입니다. 한 손으로 옥타브 그립을 잡으면서 가운데 줄들에 코드톤을 추가합니다.

## 어떻게 쓰이는가

옥타브로 단순 멜로디 4마디를 먼저 익힙니다. F 블루스 위에서 단음 → 옥타브로 자연스럽게 전환하는 1코러스를 시도합니다. 블록 코드는 후기 단계로 두고, 옥타브가 안정된 다음에 추가합니다.

## 핵심 포인트

- 3단계: 단음 → 옥타브 → 블록 코드
- 엄지 사용으로 따뜻한 톤
- 가운데 줄 뮤트가 깨끗한 옥타브의 비결
- 솔로 후반에 옥타브로 클라이맥스 만들기
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
      content: i18(`## Joe Pass의 솔로 기타

Joe Pass(1929-1994)는 솔로 기타(unaccompanied jazz guitar)의 정의를 만든 연주자입니다. *Virtuoso*(1973) 앨범에서 한 대의 기타만으로 스탠다드를 완벽하게 연주해 보였습니다. 그의 핵심 도구는 코드 멜로디입니다.

코드 멜로디의 원리는 단순합니다. 멜로디 음을 가장 위(높은) 줄에 두고, 그 아래에 코드의 핵심음(3·7)을 깔아 줍니다. 베이스 음은 6번줄에 두거나, 코드의 루트를 가장 낮은 줄에 두는 식으로 처리합니다.

세 층:
- **베이스 (6번줄)**: 코드의 루트
- **코드 (4·3번줄)**: 3·7 핵심음
- **멜로디 (2·1번줄)**: 곡의 멜로디 음

모든 층을 동시에 칠 필요는 없습니다. Joe Pass의 비결은 베이스 → 코드 → 멜로디를 약간씩 어긋나게 연주해서 한 대로 세 악기처럼 들리게 만드는 것입니다.

## 어떻게 쓰이는가

Autumn Leaves A섹션 첫 4마디부터 시작합니다. 멜로디는 가장 위 줄, 베이스는 6번줄, 코드는 가운데. 한 마디 안에 모든 것을 동시에 잡으려 하지 말고 약간씩 시간차로 표현합니다.

## 핵심 포인트

- 세 층: 베이스 / 코드 / 멜로디
- 동시 연주보다 시간차 어긋남
- 멜로디를 가장 위 줄에 분명히
- Joe Pass = 한 대로 세 악기처럼
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
      content: i18(`## Tetrachord란

Tetrachord(테트라코드)는 4음으로 이루어진 음의 단위입니다. 7음 스케일을 4음 셀 두 개로 나눠서 보면 운지가 단순해지고 외우기 쉬워집니다. 재즈에서 가장 자주 사용되는 것이 Dorian tetrachord입니다.

Dorian 스케일은 \`온음-반음-온음-온음-온음-반음-온음\` 구조입니다. 이걸 4음씩 둘로 나누면 두 셀 모두 \`온음-반음-온음\` 패턴이 됩니다. D Dorian이라면 \`D-E-F-G\` + \`A-B-C-D\` 두 셀.

선생님의 표현으로 "레-도-시-라" 한 셀, "솔-파-미-레" 또 한 셀. 각 셀이 같은 모양(온반온)이라서 두 가지 핑거링만 익히면 됩니다.

두 가지 핑거링:
- **[A] 검지 패턴**: 시작 손가락이 검지 (낮은 음에서)
- **[B] 약지 패턴**: 시작 손가락이 약지 (높은 음에서)

두 가지 방향:
- **대각선 방향**: 한 줄에서 다음 줄로 이동하며 연결
- **수직 방향**: 같은 프렛 영역에서 다른 줄로 이동

시작 포지션은 솔/미/레/시 네 가지가 자주 쓰입니다.

## 어떻게 쓰이는가

먼저 한 셀(예: 레-도-시-라)을 [A] 핑거링으로 BPM 60에서 끊김 없이 연주합니다. 그 다음 [B] 핑거링. 두 핑거링이 익숙해지면 두 셀을 연결해 한 옥타브를 완성합니다. 대각선과 수직 두 방향 모두 익혀두면 지판 어디서든 Dorian이 즉시 나옵니다.

## 핵심 포인트

- 7음 스케일 = 4음 셀 두 개 (Dorian = 온반온 + 온반온)
- 핑거링 2가지: [A] 검지 / [B] 약지
- 방향 2가지: 대각선 / 수직
- 시작 포지션 4가지: 솔/미/레/시
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
      content: i18(`## 두 대칭 스케일

Half-Whole Diminished와 Whole Tone은 대칭 구조의 스케일입니다. 대칭이란 인터벌 패턴이 일정하게 반복된다는 뜻이고, 그래서 어디서 시작해도 같은 음의 집합이 나옵니다. 도미넌트 코드 위에서 강한 색깔을 더하는 도구입니다.

**Half-Whole Diminished (8음)**
- 패턴: 반음-온음-반음-온음-반음-온음-반음-온음
- 텐션: ♭9, ♯9, ♮3, ♯11, 13 포함
- 사용 코드: I7, I-7, ♭I7, Io7, ♭IIo7 등 (선생님 노트 참고)
- 8음이라서 한 옥타브 안에 코드톤이 두 번 나타남

**Whole Tone (6음)**
- 패턴: 온음-온음-온음-온음-온음-온음 (모두 온음)
- 텐션: 9, ♯11, ♭13 포함
- 사용 코드: I7(♭5)
- 6음이라서 옥타브 안에 1, 3, ♯4(♭5), ♯5, ♭7가 들어 있음

두 스케일 모두 V7 자리에서 사용하지만 색깔이 다릅니다. h/w dim은 어두우면서 화려한 텐션, whole tone은 떠 있는 듯한 모호한 색깔입니다.

## 어떻게 쓰이는가

V7 마디에 한 마디만 h/w dim을 적용해 보고, 다른 코러스에서 같은 자리에 whole tone을 적용해 보면 차이가 분명히 들립니다. 두 스케일 모두 반음 패턴이 일정하므로 한 자리만 외우면 다른 자리로 옮기기 쉽습니다.

## 핵심 포인트

- 둘 다 대칭 스케일 — 어디서든 같은 음 집합
- h/w dim = 8음, V7에 화려한 텐션
- Whole Tone = 6음, V7(♭5)에 떠 있는 색깔
- 한 마디만 적용해도 충분히 강력
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
      content: i18(`## 텐션 해결의 원리

V7 → I 해결에서 각 텐션이 어디로 가야 자연스러운지는 거의 정해져 있습니다. 이 경로를 외워두면 텐션을 사용하는 보이싱·솔로 모두에서 음악적으로 들립니다.

**Easy 보이스리딩 (안전한 해결)**:

| V 텐션 | 방향 | 해결음(I) |
|--------|------|-----------|
| ♭9 | ↓ | 5 |
| ♭13 | ↓ | 9 |
| ♯11 | ↑ | 9 |
| ♯9 | ↓↓ → ♭9 → | 5 |

**Advanced 보이스리딩 (확장된 해결)**:

| V 텐션 | 방향 | 해결음(I) |
|--------|------|-----------|
| ♭9 | ↑ | 6 |
| ♭13 | ↑ | 9 (Maj 접근) |
| ♯11 | ↑ | 1 |
| ♯9 | ↑ | 7 |

핵심은 ♭ 텐션은 보통 아래로, ♯ 텐션은 위로 풀리지만, 한 음 이상의 점프(advanced)로도 풀 수 있다는 것입니다. 이걸 의식하면 보이스 리딩이 단순한 반음 이동에서 한 단계 발전합니다.

## 어떻게 쓰이는가

V7에 한 텐션만 추가한 보이싱을 잡고, 다음 I 코드의 해결음을 한 음만 의식해 떨어뜨립니다. 솔로에서도 마찬가지입니다. V7 마디 마지막 음으로 텐션을 두고, I 마디 1박에 해결음으로 떨어뜨립니다.

## 핵심 포인트

- 각 텐션마다 정해진 해결 경로
- Easy = 반음 이동 / Advanced = 점프
- ♭ → 보통 아래 / ♯ → 보통 위
- V7 → I에서 한 음만 의식해도 큰 차이
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
      content: i18(`## Im6와 Im7의 차이

마이너 토닉 코드에는 두 가지 형태가 있습니다. Im6(예: Cm6 = C-E♭-G-A)와 Im7(예: Cm7 = C-E♭-G-B♭). 6도(A)와 ♭7도(B♭)의 차이로 출처 스케일이 달라집니다.

| 코드 | 출처 스케일 | 모드 위치 |
|------|------------|-----------|
| Im7 | Harmonic minor | 멜로딕 모드 |
| Im7 | Jazz minor (= 멜로딕 마이너) | 멜로딕 모드 |
| Im6 | Major scale | 4번째 모드 (Dorian) |
| Im6 | Harmonic minor | 4번째 모드 |
| Im6 | Jazz minor | 4번째 모드 |

**핵심**: Im6 → Dorian 계열 (메이저 6도 포함). Im7 → Aeolian/Harmonic minor/Jazz minor 계열 (♭6도 또는 ♮6 포함).

같은 마이너 i 코드라도 곡 안에서 어느 형태로 쓰이는지에 따라 솔로 음이 달라집니다. Cm6 자리라면 C Dorian의 A(메이저 6도)를 자유롭게 쓸 수 있고, Cm7 자리라면 출처 스케일에 따라 A♭ 또는 A를 골라야 합니다.

이 구분이 모달 솔로의 정확성을 만듭니다. Dorian 자리에 ♭6을 두면 어색하고, Aeolian 자리에 ♮6을 두면 색깔이 부자연스럽게 됩니다.

## 어떻게 쓰이는가

곡 분석 단계에서 마이너 i 코드를 보면 그 자리가 Im6인지 Im7인지를 확인합니다. Im6이면 Dorian, Im7이면 Aeolian 또는 멜로딕 마이너 어휘를 사용합니다. 곡에 따라 모드가 다르므로 한 곡 한 곡 분석해 두는 것이 정확합니다.

## 핵심 포인트

- Im6 → Dorian 계열 (메이저 6도)
- Im7 → Aeolian/HM/Jazz minor 계열
- 차이의 핵심은 6도와 7도
- 모달 솔로의 정확성을 결정
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
      content: i18(`## Shell Voicing이란

Shell voicing(셸 보이싱)은 코드의 핵심 세 음 — 루트, 3도, 7도 — 만으로 만든 보이싱입니다. 5도는 생략합니다(코드 색깔에 영향을 거의 안 주는 음이기 때문). 세 음만이라서 손가락 부담이 적고, 한 곡 전체를 매끄럽게 컴핑할 수 있게 합니다.

두 가지 폼:
- **1-3-7**: 베이스 1도(6번줄), 3도(4번줄), 7도(3번줄)
- **1-7-3**: 베이스 1도(6번줄), 7도(4번줄), 3도(3번줄)

ii-V-I 진행에서 두 폼을 번갈아 사용하면 보이스 리딩이 부드럽게 흐릅니다. 예: Dm7(1-3-7) → G7(1-7-3) → Cmaj7(1-3-7). 4번줄의 음이 F → F → E로 반음씩만 움직입니다.

Shell voicing은 모든 재즈 기타리스트의 출발점입니다. Freddie Green, Jim Hall, 거의 모든 비밥 컴핑 스타일이 셸 보이싱에서 시작합니다.

## 어떻게 쓰이는가

처음에는 한 코드의 두 폼을 정확히 잡습니다. 그 다음 ii-V-I 진행을 두 폼 교대로 연주합니다. 4번줄과 3번줄이 거의 움직이지 않고 6번줄 베이스만 이동하는 것이 핵심입니다.

## 핵심 포인트

- 셸 = 1도 + 3도 + 7도 (5도 생략)
- 두 폼: 1-3-7 / 1-7-3
- ii-V-I에서 두 폼 교대로 보이스 리딩
- 컴핑의 출발점, 모든 스타일의 토대
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
