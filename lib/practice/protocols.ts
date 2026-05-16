import { PracticeProtocol } from '@/lib/curriculum/types'

/**
 * Practice Protocols — 잎별 가이드 연습 시퀀스.
 *
 * 각 프로토콜은 4단계 정도의 짧은 흐름:
 *   listen → echo → apply → reflect
 *
 * 사용자는 이걸 wizard로 단계별로 따라가고, 마지막에 1-5점 평가합니다.
 * 평가는 Leitner 박스에 들어가서 자동으로 다음 복습 일정이 잡힙니다.
 */

export const practiceProtocols: PracticeProtocol[] = [
  // ─── Blues Leaf 1: 펜타토닉 1코러스 ────────────────────────────────
  {
    id: 'p-blues-1-pent',
    leafSlug: 'blues-1-chorus-pentatonic',
    name: {
      ko: 'Hear → Echo → Apply',
      en:  'Hear → Echo → Apply',
      ja: 'Hear → Echo → Apply',
    },
    description: {
      ko: '듣고, 따라하고, 실제 코러스로 적용합니다. 12분.',
      en:  'Listen, echo, apply to a real chorus. 12 minutes.',
      ja: '聴いて、なぞって、コーラスへ。12分。',
    },
    estimatedMin: 12,
    steps: [
      {
        kind: 'listen',
        title: { ko: '듣기', en: 'Listen', ja: '聴く' },
        prompt: {
          ko: 'F 마이너 펜타토닉 1포지션을 위로 한 번, 아래로 한 번 듣습니다. 음의 간격을 귀로 익혀보세요.',
          en: 'Listen to F minor pentatonic 1st position up & down. Internalize the intervals.',
          ja: 'F マイナー・ペンタトニック第1ポジションを上下に。音程感を覚える。',
        },
        durationSec: 60,
        abcNotation: `X:1\nT:F minor pentatonic\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: F A B c e f e c | f e c B A F F2 :|`,
      },
      {
        kind: 'echo',
        title: { ko: '따라하기', en: 'Echo', ja: 'なぞる' },
        prompt: {
          ko: '백킹 트랙 위에서 펜타토닉만으로 1코러스 연주. 박자에서 벗어나지 않는 것이 목표.',
          en: 'Play 1 chorus using only the pentatonic over the backing. Stay on the beat.',
          ja: 'バッキング上でペンタトニックのみで1コーラス。拍からズレない。',
        },
        durationSec: 180,
        backingTrackId: 'bt-f-blues-80',
        hint: {
          ko: '음을 적게, 박자에 정확히. 잘 모르면 한 음만 골라서 리듬으로 칩니다.',
          en: 'Few notes, on the beat. If unsure, pick one note and play rhythmically.',
          ja: '少ない音、拍に正確に。迷ったら1音だけリズムで。',
        },
      },
      {
        kind: 'apply',
        title: { ko: '적용', en: 'Apply', ja: '応用' },
        prompt: {
          ko: '이번에는 코드 변화(F7 → B♭7 → F7 → C7)를 의식하면서 1코러스. 각 코드 첫 박에 코드톤(R/3/5/♭7)을 떨어뜨려보세요.',
          en: 'Now play with chord changes in mind. Land on a chord tone (R/3/5/♭7) on beat 1 of each chord.',
          ja: 'コード(F7→Bb7→F7→C7)を意識して。各コード頭でコードトーン(R/3/5/b7)に着地。',
        },
        durationSec: 240,
        backingTrackId: 'bt-f-blues-80',
        hint: {
          ko: '한 코드에 한 음만 의식해도 충분합니다.',
          en: 'Focusing on one note per chord is enough.',
          ja: 'コード1つにつき1音意識すれば十分。',
        },
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: {
          ko: '오늘 연주가 어땠나요? 솔직히 평가해주세요. 다음 복습 일정에 반영됩니다.',
          en: 'How did it feel? Rate honestly. Used to schedule your next review.',
          ja: '今日の演奏はどうでしたか?正直に評価してください。次回の復習日程に使います。',
        },
        durationSec: 30,
      },
    ],
  },

  // ─── Blues Leaf 2: 펜타토닉 + Mixolydian ────────────────────────────
  {
    id: 'p-blues-2-mixo',
    leafSlug: 'blues-2-mixo-mix',
    name: {
      ko: 'Hear → Echo → Apply',
      en:  'Hear → Echo → Apply',
      ja: 'Hear → Echo → Apply',
    },
    description: {
      ko: '각 코드의 Mixolydian으로 색채를 더합니다. 10분.',
      en:  'Add Mixolydian color over each chord. 10 minutes.',
      ja: '各コードのミクソリディアンで色を加える。10分。',
    },
    estimatedMin: 10,
    steps: [
      {
        kind: 'listen',
        title: { ko: '듣기', en: 'Listen', ja: '聴く' },
        prompt: {
          ko: 'F7에 F Mixolydian, B♭7에 B♭ Mixolydian. 차이를 들어보세요.',
          en: 'F Mixolydian over F7, B♭ Mixolydian over B♭7. Listen to the shift.',
          ja: 'F7にFミクソ、Bb7にBbミクソ。色の違いを聴く。',
        },
        durationSec: 60,
        abcNotation: `X:1\nT:Mixolydian shift\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: F G A B c d e f | _e d c B A G F2 :| _B c d _e f g a _b | _a g f _e d c _B2 :|`,
      },
      {
        kind: 'echo',
        title: { ko: '따라하기', en: 'Echo', ja: 'なぞる' },
        prompt: {
          ko: '백킹 위에서 F7 마디는 F Mixolydian, B♭7 마디는 B♭ Mixolydian만 사용해 연주.',
          en: 'Play F Mixolydian over F7 bars and B♭ Mixolydian over B♭7 bars only.',
          ja: 'バッキング上で、F7はFミクソ、Bb7はBbミクソだけで。',
        },
        durationSec: 180,
        backingTrackId: 'bt-f-blues-80',
      },
      {
        kind: 'apply',
        title: { ko: '적용', en: 'Apply', ja: '応用' },
        prompt: {
          ko: '펜타토닉 + Mixolydian을 자유롭게 섞어 1코러스. 특히 IV 코드(B♭7) 진입 직전 1박에서 ♭7 (A♭)을 의식해보세요.',
          en: 'Mix pentatonic + Mixolydian. Especially target ♭7 (A♭) on the beat before the IV chord.',
          ja: 'ペンタとミクソを自由に混ぜて。特にIV(Bb7)に入る直前のb7(Ab)を狙う。',
        },
        durationSec: 240,
        backingTrackId: 'bt-f-blues-80',
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: {
          ko: '코드 변화가 들렸나요? 솔직히 평가해주세요.',
          en: 'Could you hear the chord change?',
          ja: 'コードチェンジが聴こえましたか?',
        },
        durationSec: 30,
      },
    ],
  },

  // ─── Blues Leaf 3: Kenny Burrell 프레이즈 인용 ──────────────────────
  {
    id: 'p-blues-3-kenny',
    leafSlug: 'blues-3-kenny-quote',
    name: {
      ko: '인용 마스터',
      en:  'Quote Master',
      ja: '引用マスター',
    },
    description: {
      ko: '한 프레이즈를 12키로, 그리고 솔로 안에서 자연스럽게. 15분.',
      en:  'One phrase, 12 keys, then natural in solo. 15 minutes.',
      ja: '1フレーズを12キーで、ソロに自然に。15分。',
    },
    estimatedMin: 15,
    steps: [
      {
        kind: 'listen',
        title: { ko: '듣기', en: 'Listen', ja: '聴く' },
        prompt: {
          ko: 'Kenny Burrell의 시그니처 블루스 라인. F 키 기준.',
          en: 'Kenny Burrell signature blues line. In F.',
          ja: 'ケニー・バレルのシグネチャー・ブルースライン。Fキー。',
        },
        durationSec: 60,
        abcNotation: `X:1\nT:Kenny-style blues lick\nM:4/4\nL:1/8\nQ:1/4=80\nK:F\n|: c2 _A G F _E F2 z | F _A c _e d c _A F :|`,
      },
      {
        kind: 'echo',
        title: { ko: '암기', en: 'Memorize', ja: '暗記' },
        prompt: {
          ko: '메트로놈 80에서 5번 반복. 외울 때까지.',
          en: 'Play 5 times at MM 80 until memorized.',
          ja: 'MM80で5回繰り返し。覚えるまで。',
        },
        durationSec: 180,
      },
      {
        kind: 'apply',
        title: { ko: '솔로에 끼워넣기', en: 'Insert into solo', ja: 'ソロに挿入' },
        prompt: {
          ko: '백킹 위에서 1코러스. 이 프레이즈를 최소 2번 자연스럽게 끼워넣기.',
          en: 'Play 1 chorus, naturally insert this phrase at least 2x.',
          ja: 'バッキング上で1コーラス。このフレーズを最低2回自然に。',
        },
        durationSec: 240,
        backingTrackId: 'bt-f-blues-80',
        hint: {
          ko: '프레이즈를 코러스 시작에 한 번, 마무리에 한 번 — 처음에는 그렇게 시작합니다.',
          en: 'First time: place it at chorus start, and again at the end.',
          ja: '最初はコーラス頭と終わりに。',
        },
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: {
          ko: '프레이즈가 자기 것처럼 자연스럽게 들렸나요?',
          en: 'Did the phrase feel natural / your own?',
          ja: 'フレーズが自分のものに感じられましたか?',
        },
        durationSec: 30,
      },
    ],
  },
]

export function getProtocolsForLeaf(leafSlug: string): PracticeProtocol[] {
  return practiceProtocols.filter(p => p.leafSlug === leafSlug)
}

export function getProtocolById(id: string): PracticeProtocol | undefined {
  return practiceProtocols.find(p => p.id === id)
}
