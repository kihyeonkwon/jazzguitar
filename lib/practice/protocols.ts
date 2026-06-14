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
    leafSlug: 'blues-mixolydian-mix',
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
    leafSlug: 'blues-kenny-burrell-quote',
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

  // ─── Foundation: 7th 코드 구구단 ──────────────────────────────────
  {
    id: 'p-fd-gugudan',
    leafSlug: 'foundation-7th-chord-gugudan',
    name: { ko: '코드 구구단 워밍업', en: 'Chord Train Warmup', ja: 'コード九九' },
    description: {
      ko: 'Triad → 7th 두 모드 연습. 짧고 매일. 8분.',
      en:  'Triad → 7th drill. Short and daily. 8 minutes.',
      ja: 'トライアド→7th。短く毎日。8分。',
    },
    estimatedMin: 8,
    steps: [
      {
        kind: 'echo',
        title: { ko: 'Triad 모드', en: 'Triad mode', ja: 'トライアド' },
        prompt: {
          ko: '/practice 페이지에서 코드 구구단 Triad 모드를 90초 이내 통과 시도.',
          en:  'Pass Triad mode in chord quiz under 90s.',
          ja: 'コード九九トライアドモードを90秒以内に。',
        },
        durationSec: 180,
      },
      {
        kind: 'echo',
        title: { ko: '7th 모드', en: '7th mode', ja: '7thモード' },
        prompt: {
          ko: '같은 페이지에서 7th 모드 2분 이내 통과.',
          en:  'Pass 7th mode under 2 minutes.',
          ja: '7thモードを2分以内に。',
        },
        durationSec: 180,
      },
      {
        kind: 'apply',
        title: { ko: '약한 키 강화', en: 'Weak keys', ja: '苦手キー強化' },
        prompt: {
          ko: '오답이 잦은 코드 5개를 골라 그 구성음을 종이에 적고 기타로 잡아보세요.',
          en:  'Pick 5 chords you often miss. Write & play them on guitar.',
          ja: '苦手なコード5つを書き出してギターで押さえる。',
        },
        durationSec: 120,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: {
          ko: '오늘 어땠나요? 솔직히.',
          en:  'How was it?',
          ja: '今日はどうでしたか?',
        },
        durationSec: 30,
      },
    ],
  },

  // ─── Foundation: 지판 음 찾기 ─────────────────────────────────────
  {
    id: 'p-fd-fretboard',
    leafSlug: 'foundation-fretboard-30s',
    name: { ko: '지판 매핑 Train', en: 'Fretboard Mapping', ja: '指板マッピング' },
    description: {
      ko: 'Train으로 30초 이내 한 음 모든 위치 찾기. 6분.',
      en:  'Find all positions of a note in 30s. 6 minutes.',
      ja: '指板上1音の全位置を30秒以内に。6分。',
    },
    estimatedMin: 6,
    steps: [
      {
        kind: 'echo',
        title: { ko: '6번줄·5번줄', en: 'Strings 6 & 5', ja: '6弦・5弦' },
        prompt: {
          ko: '/train/fretboard-find — 6번줄과 5번줄 음을 30초 안에 모두 찾기.',
          en:  '/train/fretboard-find — strings 6 & 5 in 30s.',
          ja: '/train/fretboard-find — 6弦・5弦を30秒以内。',
        },
        durationSec: 120,
      },
      {
        kind: 'echo',
        title: { ko: '6줄 전체', en: 'All 6 strings', ja: '6弦すべて' },
        prompt: {
          ko: '같은 Train, 모든 줄에서 정답률 80% 목표.',
          en:  'Same drill, all strings, aim 80% accuracy.',
          ja: '同じドリル、全弦、正解率80%目標。',
        },
        durationSec: 180,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: { ko: '오늘은 어떤 음이 가장 어려웠나요?', en: 'Which note was hardest today?', ja: '今日一番難しかった音は?' },
        durationSec: 30,
      },
    ],
  },

  // ─── Harmony: Drop 2 보이싱 ───────────────────────────────────────
  {
    id: 'p-hc-drop2',
    leafSlug: 'harmony-drop2-voicings',
    name: { ko: 'Drop 2 5/6번줄', en: 'Drop 2 String 5/6', ja: 'Drop 2 5/6弦' },
    description: {
      ko: 'Cmaj7 → Dm7 → G7 → Cmaj7을 Drop 2로. 10분.',
      en:  'Cmaj7 → Dm7 → G7 → Cmaj7 in Drop 2. 10 minutes.',
      ja: 'Cmaj7→Dm7→G7→Cmaj7をDrop 2で。10分。',
    },
    estimatedMin: 10,
    steps: [
      {
        kind: 'listen',
        title: { ko: '듣기', en: 'Listen', ja: '聴く' },
        prompt: {
          ko: '5번줄 루트 Drop 2의 색을 들어보세요. 텐션이 적고 명료한 사운드.',
          en:  'Listen to the color of 5th-string-root Drop 2. Clear, low-tension.',
          ja: '5弦ルートのDrop 2の色を聴く。クリアでテンション少なめ。',
        },
        durationSec: 60,
      },
      {
        kind: 'echo',
        title: { ko: '한 코드씩', en: 'One at a time', ja: '1つずつ' },
        prompt: {
          ko: 'Cmaj7, Dm7, G7, Cmaj7을 각각 5번줄 루트 Drop 2로 정확히 잡기.',
          en:  'Play Cmaj7, Dm7, G7, Cmaj7 with 5th-string-root Drop 2.',
          ja: 'Cmaj7、Dm7、G7、Cmaj7を5弦ルートDrop 2で。',
        },
        durationSec: 120,
      },
      {
        kind: 'apply',
        title: { ko: '컴핑', en: 'Comp', ja: 'コンピング' },
        prompt: {
          ko: '백킹 위에서 ii-V-I을 8마디 컴핑. 각 코드를 BPM 100에서 정확히.',
          en:  'Comp ii-V-I 8 bars over the backing at BPM 100.',
          ja: 'バッキング上でii-V-Iを8小節、BPM100で。',
        },
        backingTrackId: 'bt-iivi-c',
        durationSec: 240,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: { ko: '전환이 부드러웠나요?', en: 'Were transitions smooth?', ja: '遷移はスムーズでしたか?' },
        durationSec: 30,
      },
    ],
  },

  // ─── Soloing: 코드톤 솔로 ─────────────────────────────────────────
  {
    id: 'p-so-chordtones',
    leafSlug: 'soloing-chord-tones',
    name: { ko: '코드톤만 솔로', en: 'Chord-Tones Solo', ja: 'コードトーンのみ' },
    description: {
      ko: '아르페지오만으로 ii-V-I 1코러스. 12분.',
      en:  'Arpeggios only over ii-V-I. 12 minutes.',
      ja: 'アルペジオのみでii-V-I。12分。',
    },
    estimatedMin: 12,
    steps: [
      {
        kind: 'listen',
        title: { ko: '듣기', en: 'Listen', ja: '聴く' },
        prompt: {
          ko: 'Dm7-G7-Cmaj7 아르페지오 라인. 각 코드 첫 박에 1, 두 번째 박에 3.',
          en:  'Listen to Dm7-G7-Cmaj7 arpeggio line. Root on beat 1, third on beat 2.',
          ja: 'Dm7-G7-Cmaj7のアルペジオ。拍1にルート、拍2に3度。',
        },
        durationSec: 60,
        abcNotation: `X:1\nT:ii-V-I chord tones\nM:4/4\nL:1/8\nQ:1/4=100\nK:C\n| D F A c | _B d g f | e g b e' | c'4 |`,
      },
      {
        kind: 'echo',
        title: { ko: '아르페지오 연습', en: 'Arpeggio practice', ja: 'アルペジオ練習' },
        prompt: {
          ko: 'Dm7, G7, Cmaj7 아르페지오 각각 한 옥타브씩 BPM 100에서.',
          en:  'Practice Dm7, G7, Cmaj7 arpeggios one octave each at BPM 100.',
          ja: 'Dm7、G7、Cmaj7のアルペジオを各1オクターブ、BPM100で。',
        },
        durationSec: 180,
      },
      {
        kind: 'apply',
        title: { ko: '백킹 위 1코러스', en: '1 chorus over backing', ja: 'バッキング上で1コーラス' },
        prompt: {
          ko: '코드톤만으로 1코러스. 코드 변화에 정확히 음 떨어뜨리기.',
          en:  'Chord tones only for 1 chorus. Land cleanly on each change.',
          ja: 'コードトーンのみで1コーラス。コードチェンジで正確に着地。',
        },
        backingTrackId: 'bt-iivi-c',
        durationSec: 240,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: { ko: '음악적으로 들렸나요?', en: 'Did it sound musical?', ja: '音楽的に聴こえましたか?' },
        durationSec: 30,
      },
    ],
  },

  // ─── Standards: Autumn Leaves 컴핑 ────────────────────────────────
  {
    id: 'p-st-autumn-comp',
    leafSlug: 'standard-autumn-leaves-comp',
    name: { ko: 'Autumn Leaves 컴핑', en: 'Autumn Leaves Comping', ja: 'Autumn Leaves カンプ' },
    description: {
      ko: '코드 진행 외움 → 컴핑 → 다른 키. 15분.',
      en:  'Memorize → comp → other keys. 15 minutes.',
      ja: 'コード進行→カンプ→別キー。15分。',
    },
    estimatedMin: 15,
    steps: [
      {
        kind: 'listen',
        title: { ko: '구조 듣기', en: 'Hear the form', ja: '形を聴く' },
        prompt: {
          ko: 'A 섹션: Cm7-F7-Bbmaj7-Ebmaj7-Am7b5-D7-Gm7-Gm7. 16마디 두 번 (AA) + 16마디 (BC).',
          en:  'A: Cm7-F7-Bbmaj7-Ebmaj7-Am7b5-D7-Gm7-Gm7. AABA-like.',
          ja: 'A: Cm7-F7-Bbmaj7-Ebmaj7-Am7b5-D7-Gm7-Gm7。',
        },
        durationSec: 90,
      },
      {
        kind: 'echo',
        title: { ko: 'A섹션 컴핑', en: 'Comp A section', ja: 'Aセクション' },
        prompt: {
          ko: 'A 섹션 8마디만 BPM 80 — 박자에서 벗어나지 않기.',
          en:  '8 bars of A only at BPM 80.',
          ja: 'Aセクション8小節のみ、BPM80で。',
        },
        backingTrackId: 'bt-autumn-leaves-bm',
        durationSec: 180,
      },
      {
        kind: 'apply',
        title: { ko: '전체 32마디', en: 'Full 32 bars', ja: '全32小節' },
        prompt: {
          ko: '전체 폼을 끊김 없이 1코러스. 코드를 빠뜨리지 않기.',
          en:  'Full chorus without dropping any chord.',
          ja: '全コーラス、コードを落とさない。',
        },
        backingTrackId: 'bt-autumn-leaves-bm',
        durationSec: 240,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: { ko: '코드를 모두 기억했나요?', en: 'Did you remember all chords?', ja: 'すべてのコードを覚えていましたか?' },
        durationSec: 30,
      },
    ],
  },

  // ─── Ear training: 인터벌 청음 ────────────────────────────────────
  {
    id: 'p-er-interval',
    leafSlug: 'ear-interval-recognition',
    name: { ko: '인터벌 청음 Train', en: 'Interval Ear Train', ja: 'インターバル耳訓練' },
    description: {
      ko: 'Train 1라운드 + 약한 인터벌 집중 연습. 8분.',
      en:  '1 train round + weak-interval focus. 8 minutes.',
      ja: 'ドリル1ラウンド+苦手インターバル強化。8分。',
    },
    estimatedMin: 8,
    steps: [
      {
        kind: 'echo',
        title: { ko: 'Train 1라운드', en: 'Train round', ja: 'ドリル1ラウンド' },
        prompt: {
          ko: '/train/interval-ear — 10문제 한 라운드 진행. 정답률 기록.',
          en:  '/train/interval-ear — one round of 10. Note your accuracy.',
          ja: '/train/interval-ear — 10問1ラウンド。正解率を記録。',
        },
        durationSec: 240,
      },
      {
        kind: 'apply',
        title: { ko: '약한 인터벌 집중', en: 'Weak interval focus', ja: '苦手強化' },
        prompt: {
          ko: '가장 자주 틀리는 인터벌 3가지를 골라, 노래로 5번씩 부르고 기타로 연주하기.',
          en:  'Pick 3 weakest. Sing each 5x and play on guitar.',
          ja: '苦手3つを選び、各5回歌ってギターで演奏。',
        },
        durationSec: 180,
      },
      {
        kind: 'reflect',
        title: { ko: '자가평가', en: 'Self-rate', ja: '自己評価' },
        prompt: { ko: '청음이 더 빨라졌나요?', en: 'Faster recognition today?', ja: '今日は認識が速くなりましたか?' },
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
