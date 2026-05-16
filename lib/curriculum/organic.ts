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
    leafIds: ['lf-hc-1', 'lf-hc-2', 'lf-hc-3', 'lf-hc-4', 'lf-hc-5', 'lf-hc-6'],
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
    leafIds: ['lf-so-1', 'lf-so-2', 'lf-so-3', 'lf-so-4', 'lf-so-5', 'lf-so-6'],
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
    slug: 'harmony-guide-tone-voicings',
    trunkSlug: 'harmony-comping',
    order: 1,
    title: i18('ii-V-I을 가이드 톤(3-7)만으로 연결한다'),
    description: i18('두 음(3도·7도)만으로 코드 진행의 색깔을 표현.'),
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
    selfCheck: [
      i18('16마디 코드 진행 외움'),
      i18('컴핑 BPM 100'),
      i18('모달 변화(C단조 → Db장조)를 안다'),
      i18('솔로 시도'),
    ],
    relatedTipSlugs: [],
    relatedBackingTrackIds: [],
    relatedPrincipleSlugs: ['iivi-theory'],
  },
  {
    id: 'lf-st-4',
    slug: 'standard-sunny',
    trunkSlug: 'standards',
    order: 4,
    title: i18('Sunny를 마이너 톤성으로 솔로한다'),
    description: i18('Altered chord 처리와 Kenny Burrell 인용.'),
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
