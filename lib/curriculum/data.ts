import { Topic } from './types'

export const topics: Topic[] = [
  // ─── STAGE 1: Foundations ───────────────────────────────────────────────
  {
    id: 'jazz-setup',
    slug: 'jazz-setup',
    stage: 1,
    order: 1,
    title: {
      ko: '재즈 기타 셋업 & 톤',
      en: 'Jazz Guitar Setup & Tone',
      ja: 'ジャズギターセットアップ & トーン',
    },
    description: {
      ko: '재즈 기타리스트의 음색과 세팅 기초를 잡는다.',
      en: 'Build the foundational tone and setup for jazz guitar.',
      ja: 'ジャズギタリストの音色とセッティングの基礎を学ぶ。',
    },
    theory: {
      content: {
        ko: `## 재즈 기타 톤의 철학

재즈 기타 톤은 단순히 장비 세팅의 문제가 아닙니다. 재즈가 추구하는 음악적 표현 — 따뜻함, 깊이, 뉘앙스 — 을 담을 수 있는 그릇을 만드는 것입니다. 올바른 톤 세팅 없이는 아무리 좋은 이론과 기술도 재즈답게 들리지 않습니다.

### 재즈 톤의 핵심 3요소

**1. 클린 사운드**
- 오버드라이브나 디스토션 없이 앰프 클린 채널 사용
- 기타 볼륨 노브: 7~8 수준 (풀 볼륨은 너무 날카로움)
- 기타 톤 노브: 5~7 (고음역 약간 컷)

**2. 픽업 선택**
- 넥(Neck) 픽업이 재즈 톤의 기본
- 넥 픽업은 브리지보다 따뜻하고 두꺼운 소리를 냄
- 세미 할로우 바디 기타(ES-335 계열)가 특히 재즈에 적합

**3. 피킹 어택**
- 픽을 45도 각도로 잡고 가벼운 터치
- 강한 피킹보다 부드럽고 균일한 어택이 핵심
- 각 음이 균일한 볼륨으로 나와야 함

### 앰프 세팅 가이드

| 앰프 노브 | 권장 수준 | 이유 |
|--------|---------|------|
| Treble | 4~5 | 고음 날카로움 완화 |
| Middle | 6~7 | 존재감 유지 |
| Bass | 5~6 | 따뜻한 저음 |
| Reverb | 2~3 | 자연스러운 공간감 |

### 솔리드 바디 기타로 재즈 톤 내기
세미 할로우 바디가 없을 때 솔리드 바디 기타로도 충분히 재즈 톤을 낼 수 있습니다.
- 넥 픽업 선택
- 톤 노브를 4~6으로 내림
- 피킹 어택을 더 부드럽게
- 고음역 컷이 핵심

### 피킹 자세와 어택
재즈에서 오른손(피킹 손)의 터치는 매우 중요합니다.
- 픽 끝이 현에 너무 깊이 들어가지 않도록
- 손목의 회전력보다 팔꿈치 아래 전완의 움직임으로
- 다운피킹 위주로 시작하되 얼터네이트 피킹도 연습`,
        en: `## The Philosophy of Jazz Guitar Tone

Jazz guitar tone is not just about equipment settings. It's about creating a vessel that can carry what jazz seeks to express — warmth, depth, and nuance. Without the right tone, even the best theory and technique won't sound like jazz.

### 3 Core Elements of Jazz Tone

**1. Clean Sound**
- Use amplifier clean channel without overdrive or distortion
- Guitar volume knob: 7–8 (full volume sounds too bright)
- Guitar tone knob: 5–7 (slight high frequency cut)

**2. Pickup Selection**
- Neck pickup is the foundation of jazz tone
- Neck pickup produces warmer, thicker sound than bridge
- Semi-hollow body guitars (ES-335 style) are especially suited to jazz

**3. Picking Attack**
- Hold pick at 45-degree angle with light touch
- Soft and even attack more important than strong picking
- Each note should come out at a consistent volume

### Amp Setting Guide

| Amp Knob | Recommended | Reason |
|----------|-------------|--------|
| Treble | 4–5 | Reduce brightness |
| Middle | 6–7 | Maintain presence |
| Bass | 5–6 | Warm low end |
| Reverb | 2–3 | Natural room sound |`,
        ja: `## ジャズギタートーンの哲学

ジャズギタートーンは単に機材設定の問題ではありません。ジャズが目指す音楽的表現—温かみ、深さ、ニュアンス—を担う器を作ることです。

### ジャズトーンの3つの核心要素

**1. クリーンサウンド**
- オーバードライブなしでアンプのクリーンチャンネルを使用
- ギターのボリュームノブ: 7~8（フルボリュームは明るすぎる）
- ギターのトーンノブ: 5~7（高音域をわずかにカット）

**2. ピックアップ選択**
- ネックピックアップがジャズトーンの基本
- ネックピックアップはブリッジより温かく太いサウンドを出す

**3. ピッキングアタック**
- ピックを45度の角度で持ち、軽いタッチ
- 強いピッキングより柔らかく均一なアタックが核心`,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: '넥 픽업 톤 탐색', en: 'Neck Pickup Tone Exploration', ja: 'ネックピックアップトーン探索' },
          description: {
            ko: '넥 픽업으로 개방 A현을 연주하면서 볼륨 노브와 톤 노브를 천천히 조절해 보십시오. 7~8 볼륨, 5~7 톤이 재즈 기본 세팅입니다. 클린하고 따뜻한 소리를 귀로 확인하는 것이 목표입니다.',
            en: 'Play open A string with neck pickup while slowly adjusting volume and tone knobs. Volume 7-8, Tone 5-7 is the basic jazz setting. The goal is to confirm a clean, warm sound by ear.',
            ja: 'ネックピックアップで開放A弦を弾きながらボリュームとトーンノブをゆっくり調整してください。ボリューム7-8、トーン5-7がジャズの基本設定です。',
          },
        },
        {
          title: { ko: '균일한 피킹 어택 훈련', en: 'Even Picking Attack Training', ja: '均一なピッキングアタック訓練' },
          description: {
            ko: '6번 줄 개방현부터 1번 줄까지 다운스트로크로 단음을 연주하십시오. 각 음의 볼륨과 톤이 일정하게 나오도록 집중하십시오. BPM 60, 각 줄에서 4박 유지 후 이동합니다.',
            en: 'Play single notes from 6th string open to 1st string with downstrokes. Focus on each note producing consistent volume and tone. BPM 60, hold 4 beats per string before moving.',
            ja: '6弦開放から1弦までダウンストロークで単音を演奏してください。各音のボリュームとトーンが均一になるよう集中してください。BPM60。',
          },
          bpm: 60,
        },
      ],
    },
    checkpoints: [
      { ko: '넥 픽업 + 적정 톤 세팅으로 재즈 톤을 낼 수 있다', en: 'Can produce jazz tone with neck pickup and proper tone settings', ja: 'ネックピックアップ＋適切なトーン設定でジャズトーンを出せる' },
      { ko: '픽을 45도 각도로 일관되게 잡을 수 있다', en: 'Can consistently hold pick at 45-degree angle', ja: 'ピックを45度の角度で一貫して持てる' },
      { ko: '6줄 모두 균일한 볼륨과 어택으로 단음 연주 가능 (BPM 60)', en: 'Can play single notes on all 6 strings with even attack (BPM 60)', ja: '6弦すべて均一なアタックで単音演奏できる（BPM60）' },
      { ko: '클린 앰프 세팅으로 재즈 특유의 따뜻한 사운드를 귀로 인식 가능', en: 'Can recognize jazz warm sound from clean amp settings by ear', ja: 'クリーンアンプ設定でジャズ特有の温かいサウンドを耳で認識できる' },
    ],
    tools: ['metronome'],
  },

  {
    id: 'seventh-chords',
    slug: 'seventh-chords',
    stage: 1,
    order: 2,
    title: {
      ko: '7th 코드 보이싱',
      en: '7th Chord Voicings',
      ja: 'セブンスコードボイシング',
    },
    description: {
      ko: 'Maj7, m7, 7, m7b5, dim7 - 재즈의 기본 코드 5종을 완전히 익힌다.',
      en: 'Master the 5 essential jazz chords: Maj7, m7, 7, m7b5, dim7.',
      ja: 'Maj7、m7、7、m7b5、dim7 - ジャズの基本5コードを完全にマスターする。',
    },
    theory: {
      content: {
        ko: `## 재즈 7th 코드 — 왜 4성부인가

클래식이나 팝은 3화음(트라이어드)이 기본이지만, 재즈는 처음부터 4성부 코드(7th 코드)를 기본 어휘로 사용합니다. 7도음이 추가되면서 코드는 단순한 색채를 넘어 '움직이고 싶은 방향'을 갖게 됩니다. 이것이 재즈 화성의 풍부한 긴장과 해결감의 원천입니다.

### 5가지 필수 코드 타입

| 코드 타입 | 구성음 | 음악적 기능 |
|---------|------|----------|
| Major 7 (Δ7) | 1-3-5-7 | 토닉. 안정적이고 밝은 도착점 |
| Minor 7 (m7 / -7) | 1-♭3-5-♭7 | 서브도미넌트. 부드럽고 흐르는 느낌 |
| Dominant 7 (7) | 1-3-5-♭7 | 도미넌트. 강한 긴장감, 해결을 원함 |
| Minor 7♭5 (m7♭5 / ø) | 1-♭3-♭5-♭7 | 마이너 ii. 불안하고 어두운 색채 |
| Diminished 7 (dim7 / °7) | 1-♭3-♭5-♭♭7 | 경과화음. 강한 불안정감 |

### Δ7 vs 7 — 헷갈리기 쉬운 구분

| 구분 | Cmaj7 (CΔ7) | C7 |
|-----|------------|-----|
| 3도 | E (장3도) | E (장3도) |
| 7도 | **B (장7도)** | **B♭ (단7도)** |
| 성격 | 안정, 해결감 | 긴장, 해결 욕구 |
| 사용 위치 | I 코드 (토닉) | V 코드 (도미넌트) |

7도음 하나의 차이가 완전히 다른 기능과 느낌을 만들어 냅니다.

### 재즈 표기 규칙

재즈 리드 시트에서 자주 보는 표기:
- **Cmaj7 = CΔ7 = CM7**: C 메이저 7th
- **Cm7 = C-7**: C 마이너 7th
- **C7**: C 도미넌트 7th
- **Cm7♭5 = Cø**: C 하프 디미니시드
- **Cdim7 = C°7**: C 디미니시드 7th

### Drop 2 보이싱 — 재즈 기타의 표준
재즈에서 가장 많이 쓰는 보이싱은 '두 번째로 높은 음을 한 옥타브 아래로 내린' Drop 2 방식입니다. 이 방식이 기타 지판에서 연주하기에 가장 자연스러운 간격을 만들어냅니다. Drop 2에 대한 자세한 내용은 해당 챕터에서 다룹니다.`,
        en: `## Jazz 7th Chords — Why 4 Voices?

While classical and pop use triads as the foundation, jazz uses 7th chords as its basic vocabulary from the start. Adding the 7th gives each chord a 'direction it wants to move.' This is the source of jazz harmony's rich tension and resolution.

### 5 Essential Chord Types

| Chord Type | Tones | Musical Function |
|-----------|-------|----------------|
| Major 7 (Δ7) | 1-3-5-7 | Tonic. Stable, bright arrival point |
| Minor 7 (m7 / -7) | 1-♭3-5-♭7 | Subdominant. Soft, flowing feel |
| Dominant 7 (7) | 1-3-5-♭7 | Dominant. Strong tension, wants resolution |
| Minor 7♭5 (m7♭5 / ø) | 1-♭3-♭5-♭7 | Minor ii. Unstable, dark color |
| Diminished 7 (dim7 / °7) | 1-♭3-♭5-♭♭7 | Passing chord. Strong instability |

### Δ7 vs 7 — Easy to Confuse

| | Cmaj7 (CΔ7) | C7 |
|--|------------|-----|
| 3rd | E (major 3rd) | E (major 3rd) |
| 7th | **B (major 7th)** | **B♭ (minor 7th)** |
| Character | Stable, resolved | Tense, wants to resolve |
| Used as | I chord (tonic) | V chord (dominant) |`,
        ja: `## ジャズ7thコード — なぜ4声部か？

クラシックやポップスでは三和音が基本ですが、ジャズは最初から4声部コード（7thコード）を基本語彙として使います。7度音が加わることで、コードは単なる色彩を超えて「動きたい方向」を持ちます。

### 5つの必須コードタイプ

| コードタイプ | 構成音 | 音楽的機能 |
|---------|------|---------|
| Major 7 (Δ7) | 1-3-5-7 | トニック。安定した明るい到達点 |
| Minor 7 (m7) | 1-♭3-5-♭7 | サブドミナント。柔らかく流れる感じ |
| Dominant 7 (7) | 1-3-5-♭7 | ドミナント。強い緊張感、解決を求める |
| Minor 7♭5 (ø) | 1-♭3-♭5-♭7 | マイナーii。不安定で暗い色彩 |
| Diminished 7 (°7) | 1-♭3-♭5-♭♭7 | 経過和音。強い不安定感 |`,
      },
      chords: ['Cmaj7', 'Cm7', 'C7', 'Cm7b5', 'Cdim7'],
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Cmaj7 → C7 → Cm7 → Cm7♭5 순서 귀 훈련', en: 'Cmaj7 → C7 → Cm7 → Cm7b5 Ear Training', ja: 'Cmaj7 → C7 → Cm7 → Cm7b5聴音訓練' },
          description: {
            ko: '4가지 코드를 C 루트로 연결해 음색 차이를 귀로 느끼십시오. 각 코드를 4박자씩 유지하고 BPM 60에서 진행합니다. 7도음이 바뀔 때 긴장감의 차이에 집중하십시오.',
            en: 'Connect 4 chord types on C root and hear the tonal difference. Hold each chord for 4 beats at BPM 60. Focus on tension differences when the 7th changes.',
            ja: '4つのコードをCルートで繋いで音色の違いを耳で感じてください。各コード4拍、BPM60。7度音が変わる時の緊張感の違いに集中してください。',
          },
          bpm: 60,
        },
        {
          title: { ko: '5번줄 루트 Maj7 폼 크로매틱 이동', en: '5th String Root Maj7 Form Chromatic Movement', ja: '5弦ルートMaj7フォームクロマチック移動' },
          description: {
            ko: '5번줄 루트 Maj7 폼을 C → D♭ → D → E♭ 순으로 반음씩 이동하십시오. 각 코드에서 4박자를 유지합니다. 이 폼 하나로 12개 키의 Maj7 코드를 모두 연주할 수 있음을 체감하는 것이 목표입니다.',
            en: 'Move 5th string root Maj7 form chromatically: C → Db → D → Eb. Hold 4 beats per chord. Experience how this one form covers all 12 keys of Maj7.',
            ja: '5弦ルートMaj7フォームをC → Db → D → Ebと半音ずつ移動。各コード4拍。このフォーム1つで12キーのMaj7コードを全て演奏できることを体感するのが目標。',
          },
          bpm: 60,
        },
      ],
    },
    checkpoints: [
      { ko: '5가지 7th 코드 타입(Δ7, m7, 7, m7♭5, dim7)을 C키에서 연주 가능', en: 'Can play all 5 chord types (Δ7, m7, 7, m7b5, dim7) in C key', ja: 'CキーでΔ7、m7、7、m7b5、dim7の5種を演奏できる' },
      { ko: 'Maj7과 Dominant7의 음색 차이를 귀로 구분 가능', en: 'Can distinguish Maj7 vs Dominant7 by ear', ja: 'Maj7とDominant7の音色の違いを耳で区別できる' },
      { ko: '5번줄 루트 Maj7 폼을 크로매틱하게 이동 가능', en: 'Can move 5th string root Maj7 form chromatically', ja: '5弦ルートMaj7フォームをクロマチックに移動できる' },
      { ko: '6번줄 루트 m7 폼을 G, A, B♭키에서 연주 가능', en: 'Can play 6th string root m7 form in G, A, Bb keys', ja: '6弦ルートm7フォームをG、A、Bbキーで演奏できる' },
      { ko: '코드 표기(Δ7, -7, ø, °7)를 보고 코드 타입을 즉시 인식 가능', en: 'Can immediately recognize chord type from notation (Δ7, -7, ø, °7)', ja: 'コード表記（Δ7、-7、ø、°7）を見てすぐにコードタイプを認識できる' },
    ],
    tools: ['chord-diagram', 'metronome'],
  },

  {
    id: 'guide-tones',
    slug: 'guide-tones',
    stage: 1,
    order: 3,
    title: {
      ko: '가이드 톤',
      en: 'Guide Tones',
      ja: 'ガイドトーン',
    },
    description: {
      ko: '코드의 3도와 7도 — 재즈 화성의 핵심을 귀로 듣고 손으로 찾는다.',
      en: '3rd and 7th of chords — hear and find the core of jazz harmony.',
      ja: 'コードの3度と7度 — ジャズハーモニーの核心を耳で聞いて手で見つける。',
    },
    theory: {
      content: {
        ko: `## 가이드 톤이란 무엇인가?

재즈 코드에는 여러 구성음이 있지만, 그중 **3도와 7도** 단 두 음이 코드의 성격 전체를 결정합니다. 이 두 음을 가이드 톤(Guide Tones)이라고 부릅니다. 가이드 톤만으로도 코드의 기능과 진행을 충분히 표현할 수 있기 때문에, 재즈 피아니스트나 기타리스트들은 자주 루트와 5도를 생략하고 이 두 음만으로 보이싱을 구성합니다.

### 왜 3도와 7도인가?

| 구성음 | 역할 | 중요도 |
|------|-----|------|
| 루트 (1도) | 코드의 이름만 결정 | 중간 |
| 3도 | 메이저/마이너 결정 | **매우 높음** |
| 5도 | 거의 색채 없음 | 낮음 |
| 7도 | 도미넌트/메이저7 결정 | **매우 높음** |

루트와 5도는 생략해도 코드의 성격이 유지됩니다. 반면 3도와 7도를 생략하면 코드가 무엇인지 알 수 없어집니다.

### C 장조 ii-V-I의 가이드 톤 구성

**Dm7 (ii)**
- 3도: F
- 7도: C

**G7 (V)**
- 3도: B
- 7도: F

**Cmaj7 (I)**
- 3도: E
- 7도: B

### 목소리 진행 (Voice Leading) — 재즈 화성의 핵심


         Dm7    →   G7    →   Cmaj7
3도:      F     →   B     →   E      (반음 아래로)
7도:      C     →   F     →   B      (반음 아래로)


이 부드러운 반음 이동이 재즈 화성에서 자연스러운 흐름을 만들어냅니다. 3도와 7도가 서로 교환되면서(Dm7의 3도 F는 G7의 7도로, G7의 3도 B는 Cmaj7의 7도로) 연결되는 구조입니다.

### 가이드 톤 보이싱 — 실전 적용

가이드 톤 두 음만으로 보이싱을 구성할 때:
- **Dm7**: 3도(F) + 7도(C) — 단순하지만 코드를 완벽히 표현
- **G7**: 3도(B) + 7도(F) — 이 두 음 사이에 트라이톤(증4도)이 있어 강한 긴장감
- **Cmaj7**: 3도(E) + 7도(B) — 안정적이고 맑은 해결감

G7에서 트라이톤(B와 F 사이 = 증4도) 해결이 재즈 화성에서 가장 강력한 긴장-해결 움직임을 만들어냅니다.

### 솔로에서의 가이드 톤 활용
즉흥연주를 할 때 스케일 전체를 쓰는 것보다 가이드 톤을 목표음으로 삼아 접근하면 코드에 맞는 솔로가 자연스럽게 완성됩니다. 코드톤 → 스케일 → 릭의 순서로 발전시킬 때, 가이드 톤 인식이 가장 먼저 갖춰야 할 귀의 능력입니다.`,
        en: `## What are Guide Tones?

Jazz chords have multiple voices, but just **the 3rd and 7th** determine the entire character of the chord. These two notes are called Guide Tones. When a teacher says "you can play everything with just 5 strings," they're referring to guide tone voicings.

### Why 3rd and 7th?

| Voice | Role | Importance |
|-------|------|------------|
| Root (1st) | Only determines chord name | Medium |
| 3rd | Determines major/minor | **Very high** |
| 5th | Almost no color | Low |
| 7th | Determines dominant/major7 | **Very high** |

You can omit root and 5th and the chord character remains. Omit the 3rd and 7th, and you can't tell what the chord is anymore.

### Guide Tones in C Major ii-V-I

**Dm7 (ii)**: 3rd = F, 7th = C
**G7 (V)**: 3rd = B, 7th = F
**Cmaj7 (I)**: 3rd = E, 7th = B

### Voice Leading — Core of Jazz Harmony


         Dm7    →   G7    →   Cmaj7
3rd:      F     →   B     →   E      (half step down)
7th:      C     →   F     →   B      (half step down)


This smooth half-step movement creates natural flow in jazz harmony. The 3rd and 7th swap roles — Dm7's 3rd (F) becomes G7's 7th, and G7's 3rd (B) becomes Cmaj7's 7th.`,
        ja: `## ガイドトーンとは？

ジャズコードには複数の構成音がありますが、**3度と7度**の2音だけでコードの性格全体が決まります。この2音をガイドトーンと呼びます。

### なぜ3度と7度か？

| 構成音 | 役割 | 重要度 |
|------|-----|------|
| ルート（1度） | コードの名前のみ決定 | 中 |
| 3度 | メジャー/マイナーを決定 | **非常に高い** |
| 5度 | ほぼ色彩なし | 低い |
| 7度 | ドミナント/メジャー7を決定 | **非常に高い** |

### Cメジャーii-V-Iのガイドトーン声部進行


         Dm7    →   G7    →   Cmaj7
3度:      F     →   B     →   E      (半音下行)
7度:      C     →   F     →   B      (半音下行)


この滑らかな半音の動きがジャズハーモニーで自然な流れを生み出します。`,
      },
      abcNotation: `X:1
T:Guide Tones - ii-V-I Voice Leading in C
M:4/4
L:1/4
Q:1/4=70
K:C
"Dm7"[FC][FC][FC][FC] | "G7"[BF][BF][BF][BF] | "Cmaj7"[EB][EB][EB][EB] |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'ii-V-I 가이드 톤 2음 보이싱', en: 'ii-V-I Guide Tone 2-Note Voicing', ja: 'ii-V-Iガイドトーン2音ボイシング' },
          description: {
            ko: 'Dm7 → G7 → Cmaj7를 가이드 톤(3도+7도) 두 음만으로 연주하십시오. 각 코드 4박자, BPM 60. 두 음이 반음씩 미끄러지듯 이동하는 것을 귀로 확인하는 것이 목표입니다.',
            en: 'Play Dm7 → G7 → Cmaj7 using only guide tones (3rd + 7th). 4 beats each, BPM 60. The goal is to confirm by ear that the two voices slide by half steps.',
            ja: 'Dm7 → G7 → Cmaj7をガイドトーン（3度+7度）の2音だけで演奏してください。各コード4拍、BPM60。2音が半音ずつ滑らかに移動するのを耳で確認するのが目標です。',
          },
          bpm: 60,
          abcNotation: `X:1
T:ii-V-I Guide Tones in C
M:4/4
L:1/4
Q:1/4=60
K:C
"Dm7"[CF]4 | "G7"[FB]4 | "Cmaj7"[BE]4 |]`,
        },
        {
          title: { ko: 'G7의 트라이톤 해결 집중 연습', en: 'G7 Tritone Resolution Focus', ja: 'G7のトライトーン解決集中練習' },
          description: {
            ko: 'G7의 가이드 톤 B(3도)와 F(7도)를 동시에 연주한 뒤 Cmaj7의 E와 B로 해결하십시오. B→E(반음 하행), F→B(온음 하행) 두 음의 해결 방향을 반복해서 체득합니다. BPM 60에서 10회 반복.',
            en: 'Play G7 guide tones B (3rd) and F (7th) simultaneously, then resolve to Cmaj7\'s E and B. Internalize the resolution: B→E (half step down), F→B (whole step down). Repeat 10 times at BPM 60.',
            ja: 'G7のガイドトーンB（3度）とF（7度）を同時に演奏し、Cmaj7のEとBへ解決してください。B→E（半音下行）、F→B（全音下行）の解決方向を繰り返し習得します。BPM60で10回繰り返し。',
          },
          bpm: 60,
        },
        {
          title: { ko: '다른 조에서 가이드 톤 찾기', en: 'Finding Guide Tones in Other Keys', ja: '他のキーでガイドトーンを見つける' },
          description: {
            ko: 'F 장조 ii-V-I (Gm7 → C7 → Fmaj7)에서 각 코드의 가이드 톤을 찾아 연주하십시오. C 장조에서 익힌 원리를 새로운 조에 적용하는 것이 목표입니다. BPM 60.',
            en: 'Find and play guide tones for each chord in F major ii-V-I (Gm7 → C7 → Fmaj7). Apply the principle learned in C major to a new key. BPM 60.',
            ja: 'Fメジャーii-V-I（Gm7 → C7 → Fmaj7）で各コードのガイドトーンを見つけて演奏してください。CメジャーでつかんだをFメジャーに適用するのが目標。BPM60。',
          },
          bpm: 60,
        },
      ],
    },
    checkpoints: [
      { ko: 'Dm7, G7, Cmaj7의 3도와 7도를 즉시 말할 수 있다', en: 'Can immediately state the 3rd and 7th of Dm7, G7, Cmaj7', ja: 'Dm7、G7、Cmaj7の3度と7度を即座に言える' },
      { ko: 'ii-V-I를 가이드 톤(2음)만으로 연결 연주 가능 (BPM 60)', en: 'Can play ii-V-I with guide tones only at BPM 60', ja: 'ii-V-IをガイドトーンだけでBPM60で連結演奏できる' },
      { ko: '가이드 톤이 반음씩 이동하는 것을 귀로 들을 수 있다', en: 'Can hear guide tones moving by half steps', ja: 'ガイドトーンが半音ずつ動くのを耳で聞ける' },
      { ko: 'F 장조 ii-V-I에서도 가이드 톤 찾기 가능', en: 'Can find guide tones in F major ii-V-I', ja: 'FメジャーのiiV-Iでもガイドトーンを見つけられる' },
      { ko: '실제 블루스나 스탠다드 위에서 가이드 톤으로 컴핑 시도', en: 'Can attempt guide tone comping over blues or standards', ja: 'ブルースやスタンダードの上でガイドトーンでカンプを試みられる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'major-scale-review',
    slug: 'major-scale-review',
    stage: 1,
    order: 4,
    title: {
      ko: '메이저 스케일 전 포지션 리뷰',
      en: 'Major Scale All Positions Review',
      ja: 'メジャースケール全ポジションレビュー',
    },
    description: {
      ko: 'CAGED 5개 포지션을 재즈 컨텍스트로 재정비한다.',
      en: 'Reorganize all 5 CAGED positions in a jazz context.',
      ja: 'CAGED 5つのポジションをジャズコンテキストで再整備する。',
    },
    theory: {
      content: {
        ko: `## 메이저 스케일 5포지션

기존에 알고 있는 메이저 스케일을 재즈 관점에서 재정비합니다.

### 핵심: 코드와 스케일의 연결
재즈에서는 스케일을 코드와 분리하지 않습니다. **"Cmaj7 위에서 C 메이저 스케일"** 처럼 코드 → 스케일로 생각합니다.

### 5개 포지션 개요
각 포지션은 기타 넥의 다른 위치에서 같은 스케일을 연주합니다.

- **포지션 1**: 5번줄 루트 (예: C = 3프렛)
- **포지션 2**: 3번줄 루트 (예: C = 5프렛)
- **포지션 3**: 4번줄 루트 (예: C = 10프렛)
- **포지션 4**: 2번줄 루트 (예: C = 1프렛)
- **포지션 5**: 6번줄 루트 (예: C = 8프렛)

### 재즈 기타리스트의 관점
단순히 스케일을 오르내리는 것이 아니라:
1. **코드 톤 위치 파악** - 스케일 내 어디에 루트, 3도, 5도, 7도가 있는지
2. **연결하기** - 한 포지션에서 다음으로 부드럽게 이동`,
        en: `## Major Scale 5 Positions

Reorganize the major scale you already know from a jazz perspective.

### Key: Connecting Chords and Scales
In jazz, scales are not separated from chords. Think chord → scale: "C major scale over Cmaj7."

### 5 Positions Overview
Each position plays the same scale from different positions on the neck.

- **Position 1**: 5th string root (e.g., C = 3rd fret)
- **Position 2**: 3rd string root (e.g., C = 5th fret)
- **Position 3**: 4th string root (e.g., C = 10th fret)
- **Position 4**: 2nd string root (e.g., C = 1st fret)
- **Position 5**: 6th string root (e.g., C = 8th fret)

### Jazz Guitarist's Perspective
Not just running up and down:
1. **Find chord tones** - where are root, 3rd, 5th, 7th in the scale?
2. **Connect positions** - move smoothly from one position to the next`,
        ja: `## メジャースケール5ポジション

既に知っているメジャースケールをジャズの観点から再整備します。

### 核心：コードとスケールの連結
ジャズではスケールをコードと分離しません。**「Cmaj7の上でCメジャースケール」**のようにコード→スケールと考えます。

### 5ポジション概要
各ポジションはギターネックの異なる位置で同じスケールを演奏します。`,
      },
      abcNotation: `X:1
T:C Major Scale - Position 1
M:4/4
L:1/8
Q:1/4=80
K:C
CDEF GABC | c8 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: '포지션 1 코드 톤 마킹', en: 'Position 1 Chord Tone Marking', ja: 'ポジション1コードトーンマーキング' },
          description: {
            ko: 'C 메이저 스케일 포지션 1을 천천히 연주하면서 C(루트), E(3도), G(5도), B(7도) 위치에서 잠시 멈추세요. 각 음의 위치를 시각적으로 기억하는 것이 목표.',
            en: 'Play C major scale position 1 slowly, pausing at C (root), E (3rd), G (5th), B (7th). Goal is to visually memorize chord tone positions.',
            ja: 'Cメジャースケールポジション1をゆっくり弾きながら、C（ルート）、E（3度）、G（5度）、B（7度）で一時停止。視覚的に記憶するのが目標。',
          },
          bpm: 60,
        },
        {
          title: { ko: '포지션 간 연결 연습', en: 'Position Shifting Practice', ja: 'ポジション間連結練習' },
          description: {
            ko: '포지션 1에서 시작해 넥을 오르며 포지션 2로 자연스럽게 넘어가기. 포지션 경계에서 끊김 없이 연결하세요.',
            en: 'Start at position 1, smoothly transition to position 2 as you move up the neck. No breaks at position boundaries.',
            ja: 'ポジション1から始めてネックを上りながらポジション2へ自然に移行。ポジションの境目で途切れないように。',
          },
          bpm: 70,
        },
      ],
    },
    checkpoints: [
      { ko: 'C 메이저 스케일 5개 포지션 모두 연주 가능 (BPM 60)', en: 'Can play all 5 positions of C major scale (BPM 60)', ja: 'Cメジャースケール5ポジションすべて演奏できる（BPM60）' },
      { ko: '각 포지션에서 코드 톤 위치(R, 3, 5, 7)를 말할 수 있다', en: 'Can identify chord tone positions (R, 3, 5, 7) in each position', ja: '各ポジションでコードトーン位置（R、3、5、7）を言える' },
      { ko: '인접 포지션 간 끊김 없이 이동 가능', en: 'Can move between adjacent positions without breaks', ja: '隣接ポジション間で途切れなく移動できる' },
      { ko: 'G 키에서도 같은 방식으로 적용 가능', en: 'Can apply same approach in G key', ja: 'Gキーでも同じ方法で適用できる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'drop2-voicing',
    slug: 'drop2-voicing',
    stage: 1,
    order: 5,
    title: {
      ko: 'Drop 2 보이싱',
      en: 'Drop 2 Voicing',
      ja: 'ドロップ2ボイシング',
    },
    description: {
      ko: 'Closed / Open / Drop 2 / Drop 3 — 재즈 기타의 핵심 보이싱 방식을 익힌다.',
      en: 'Learn Closed / Open / Drop 2 / Drop 3 — the core voicing methods of jazz guitar.',
      ja: 'Closed / Open / Drop 2 / Drop 3 — ジャズギターの核心ボイシング方式を学ぶ。',
    },
    theory: {
      content: {
        ko: `## Closed → Drop 2 → Drop 3: 재즈 기타 보이싱의 진화

피아노는 양손으로 보이싱을 자유롭게 배치할 수 있지만, 기타는 6줄이라는 물리적 제약이 있습니다. 이 제약 안에서 최적의 사운드를 내기 위해 개발된 것이 Drop 2 보이싱입니다. 재즈 기타의 표준 보이싱이며, 현용선 선생님 레슨의 첫 챕터에서 핵심으로 다루는 개념입니다.

### Step 1: Closed Voicing (밀집 보이싱)

4개 구성음을 좁은 음역 안에 모두 쌓는 방식입니다.

**Cmaj7 Closed (피아노 스타일, 오른손)**

위에서부터: B(7도) / G(5도) / E(3도) / C(루트)


기타에서는 이 배치가 손가락 간격에 무리를 줄 수 있고, 소리가 좁고 뭉개지는 단점이 있습니다.

### Step 2: Drop 2 — 두 번째 음을 아래로

Closed 보이싱에서 **두 번째로 높은 음(G)**을 한 옥타브 아래로 내립니다.


Closed:  B  G  E  C   (위→아래)
Drop 2:  B  E  C  G   (G가 맨 아래로)


기타에서는 이 배치가 인접한 4줄에서 자연스럽게 연주됩니다.
- **5번줄 루트 그룹** (5-4-3-2번줄): 재즈 컴핑 기본 위치
- **6번줄 루트 그룹** (6-4-3-2번줄): 더 낮은 음역 컴핑

### Step 3: Drop 3 — 세 번째 음을 아래로

세 번째로 높은 음을 한 옥타브 아래로 내립니다.


Closed:  B  G  E  C
Drop 3:  B  G  C  E   (E가 맨 아래로)


소리가 더 열리고 넓어집니다. 솔로 기타나 코드 멜로디에서 활용됩니다.

### 왜 Drop 2가 표준인가?

| 보이싱 | 특징 | 재즈 활용도 |
|------|-----|-----------|
| Closed | 좁음, 뭉침 | 피아노 전용 |
| **Drop 2** | **열림, 자연스러운 기타 간격** | **★★★ 핵심** |
| Drop 3 | 더 열림, 간격 넓음 | 코드 멜로디 |

### 12키 이동 방법

Drop 2 폼은 가로(크로매틱) 이동으로 모든 키에 적용됩니다.
- 5번줄 루트를 반음 올리면 → 반음 위 키
- 12키 전체를 같은 폼으로 커버 가능

### 각 코드 타입별 Drop 2

| 코드 타입 | 5번줄 루트 | 6번줄 루트 |
|---------|---------|---------|
| Maj7 (Δ7) | ○ 가능 | ○ 가능 |
| m7 (-7) | ○ 가능 | ○ 가능 |
| Dom7 (7) | ○ 가능 | ○ 가능 |

각 타입마다 4가지 전위형(Root Position, 1st Inversion, 2nd Inversion, 3rd Inversion)이 있습니다.`,
        en: `## Closed → Drop 2 → Drop 3: The Evolution of Jazz Guitar Voicings

Piano can freely distribute voicings across both hands, but guitar has the physical constraint of 6 strings. Drop 2 voicing was developed to produce the best sound within this constraint. It's the standard voicing for jazz guitar.

### Step 1: Closed Voicing

All 4 chord tones stacked in a narrow range.

**Cmaj7 Closed:**

Top to bottom: B(7th) / G(5th) / E(3rd) / C(root)


On guitar, this spacing can strain the fingers and produce a cluttered sound.

### Step 2: Drop 2 — Drop the Second Voice

Take the **second-highest note (G)** and drop it one octave lower.


Closed:  B  G  E  C   (top→bottom)
Drop 2:  B  E  C  G   (G moves to bottom)


On guitar, this spacing fits naturally across 4 adjacent strings.

### Step 3: Drop 3

Drop the third-highest note one octave lower. Creates an even wider, more open sound.

### Why Drop 2 is the Standard

| Voicing | Character | Jazz Usage |
|---------|-----------|------------|
| Closed | Narrow, cluttered | Piano only |
| **Drop 2** | **Open, natural guitar spacing** | **★★★ Essential** |
| Drop 3 | Very open, wide spacing | Chord melody |`,
        ja: `## Closed → Drop 2 → Drop 3: ジャズギターボイシングの進化

ピアノは両手で自由にボイシングを配置できますが、ギターには6弦という物理的制約があります。この制約の中で最良のサウンドを出すために開発されたのがDrop 2ボイシングです。

### Step 1: クローズドボイシング
4つの構成音を狭い音域内にすべて積み上げる方式です。

### Step 2: Drop 2 — 2番目の音を下げる
**2番目に高い音（G）**を1オクターブ下に下げます。


Closed:  B  G  E  C
Drop 2:  B  E  C  G


### Step 3: Drop 3
3番目に高い音を1オクターブ下に下げます。より広いボイシングになります。

### なぜDrop 2が標準なのか

| ボイシング | 特徴 | ジャズ活用度 |
|---------|-----|-----------|
| Closed | 狭い、密集 | ピアノ専用 |
| **Drop 2** | **開かれた自然なギター間隔** | **★★★ 核心** |
| Drop 3 | さらに開かれた | コードメロディー |`,
      },
      chords: ['Cmaj7', 'Cm7', 'C7'],
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Closed vs Drop 2 비교 청음', en: 'Closed vs Drop 2 Ear Comparison', ja: 'Closed vs Drop 2聴き比べ' },
          description: {
            ko: 'Cmaj7를 먼저 Closed 보이싱으로 연주하고, 이어서 Drop 2로 연주하십시오. 두 보이싱의 음색 차이 — 특히 열린 느낌 vs 밀집된 느낌 — 를 귀로 파악하는 것이 목표입니다. BPM 없이 천천히.',
            en: 'Play Cmaj7 first in Closed voicing, then in Drop 2. The goal is to identify the tonal difference by ear — especially the open vs. clustered feel. No BPM, slow pace.',
            ja: 'Cmaj7をまずClosed ボイシングで演奏し、次にDrop 2で演奏してください。2つのボイシングの音色の違い—特に開かれた感覚 vs 密集した感覚—を耳で把握するのが目標です。',
          },
        },
        {
          title: { ko: 'Cmaj7 Drop 2 — 5번줄 루트 포지션', en: 'Cmaj7 Drop 2 — 5th String Root Position', ja: 'Cmaj7ドロップ2 — 5弦ルートポジション' },
          description: {
            ko: '5번줄 루트 Cmaj7 Drop 2 보이싱(루트 포지션)을 4박자씩 연주하십시오. BPM 60. 이어서 같은 폼을 D♭, D, E♭, E로 반음씩 올려 12키 이동이 가능함을 체감합니다.',
            en: 'Play 5th string root Cmaj7 Drop 2 (root position) for 4 beats. BPM 60. Then move the same form up chromatically to Db, D, Eb, E to experience 12-key transposability.',
            ja: '5弦ルートCmaj7 Drop 2（ルートポジション）を4拍演奏してください。BPM60。次に同じフォームをDb、D、Eb、Eへ半音ずつ上げて12キー移動を体感します。',
          },
          bpm: 60,
        },
        {
          title: { ko: 'ii-V-I Drop 2 보이싱 연결', en: 'ii-V-I Drop 2 Voicing Connection', ja: 'ii-V-IドロップツーボイシングのConnection' },
          description: {
            ko: 'Dm7 → G7 → Cmaj7를 Drop 2 보이싱으로 연결하십시오. 각 코드 2박자, BPM 70. 보이싱 간 이동이 최소한의 손 움직임으로 이루어지도록 — 목소리 진행(voice leading)을 의식하면서 연주합니다.',
            en: 'Connect Dm7 → G7 → Cmaj7 with Drop 2 voicings. 2 beats per chord, BPM 70. Focus on minimizing hand movement between voicings — be conscious of voice leading.',
            ja: 'Dm7 → G7 → Cmaj7をDrop 2ボイシングで繋いでください。各コード2拍、BPM70。ボイシング間の移動が最小限の手の動きで行われるよう—声部進行を意識しながら演奏します。',
          },
          bpm: 70,
        },
      ],
    },
    checkpoints: [
      { ko: 'Closed와 Drop 2의 차이를 원리로 설명할 수 있다', en: 'Can explain the difference between Closed and Drop 2 by principle', ja: 'ClosedとDrop 2の違いを原理として説明できる' },
      { ko: 'Cmaj7, Cm7, C7 Drop 2 보이싱(5번줄 루트) 각각 연주 가능', en: 'Can play Cmaj7, Cm7, C7 Drop 2 voicings (5th string root)', ja: 'Cmaj7、Cm7、C7のDrop 2ボイシング（5弦ルート）をそれぞれ演奏できる' },
      { ko: '같은 Drop 2 폼으로 크로매틱 이동 가능 (12키 적용)', en: 'Can move same Drop 2 form chromatically (12 keys)', ja: '同じDrop 2フォームでクロマチック移動できる（12キー）' },
      { ko: 'Drop 2 보이싱으로 ii-V-I 연결 연주 가능 (BPM 70)', en: 'Can play ii-V-I with Drop 2 voicings (BPM 70)', ja: 'Drop 2ボイシングでii-V-Iを繋いで演奏できる（BPM70）' },
    ],
    tools: ['chord-diagram', 'metronome'],
  },

  // ─── STAGE 2: Jazz Blues ─────────────────────────────────────────────────
  {
    id: 'blues-form',
    slug: 'blues-form',
    stage: 2,
    order: 6,
    title: {
      ko: '12마디 블루스 폼',
      en: '12-Bar Blues Form',
      ja: '12小節ブルースフォーム',
    },
    description: {
      ko: '재즈 블루스의 기본 12마디 구조와 코드 진행을 완전히 이해한다.',
      en: 'Fully understand the basic 12-bar structure and chord progression of jazz blues.',
      ja: 'ジャズブルースの基本12小節構造とコード進行を完全に理解する。',
    },
    theory: {
      content: {
        ko: `## 12마디 블루스 — 재즈의 출발점

블루스는 재즈의 뿌리입니다. 재즈 블루스 폼을 완전히 이해하지 않고는 즉흥연주를 시작할 수 없습니다. 12마디라는 단순한 구조 안에 재즈 화성의 모든 핵심 개념이 녹아 있습니다.

### 기본 12마디 블루스 구조

가장 단순한 형태부터 시작합니다:


마디  1  | I7  ||  2  | I7  ||  3  | I7  ||  4  | I7  |
마디  5  | IV7 ||  6  | IV7 ||  7  | I7  ||  8  | I7  |
마디  9  | V7  || 10  | IV7 || 11  | I7  || 12  | V7  |


### 재즈 블루스 (F키) — 실전 버전


마디  1: F7       |  2: Bb7      |  3: F7       |  4: F7       |
마디  5: Bb7      |  6: Bdim7    |  7: F7       |  8: Am7b5 D7 |
마디  9: Gm7      | 10: C7       | 11: F7   D7  | 12: Gm7  C7  |


### 각 코드의 기능 분석

**I7 코드 (F7)** — 블루스의 핵심 색채
- 일반 조성 음악이라면 해결되어야 할 도미넌트 7
- 블루스에서는 I7이 "집(home)"이 됨 — 해결하지 않고 머무름
- 이것이 블루스 특유의 긴장감 유지 비결

**IV7 코드 (B♭7)** — 서브도미넌트
- 5마디에 처음 등장 (Quick Change 버전은 2마디에도 등장)
- I7 → IV7 이동이 블루스의 가장 전형적인 움직임

**경과화음 (6마디: Bdim7)**
- 재즈 블루스에서 Bb7 → F7 사이에 삽입
- Bdim7는 반음계적 경과화음으로 B♭7에서 F7로의 이동을 부드럽게 연결

**8마디의 ii-V 대리 (Am7♭5 → D7)**
- 9마디 Gm7으로 해결하는 ii-V 진행
- Am7♭5 = 마이너 ii (반감7도 코드)
- 재즈 블루스의 가장 중요한 화성 세련화

**턴어라운드 (11-12마디)**
- 12마디의 마지막 두 마디
- 다시 처음 I7으로 돌아가게 하는 ii-V 진행
- 11마디: I7 (+ 때로 secondary dominant D7)
- 12마디: Gm7 → C7 (C7이 V7, 다시 F7로 해결)

### 재즈 블루스 vs 기본 블루스

| 요소 | 기본 블루스 | 재즈 블루스 |
|-----|---------|---------|
| 사용 코드 | I7, IV7, V7 | 7th 코드 + ii-V 대리 |
| 6마디 | IV7 | Bdim7 경과화음 |
| 8마디 | I7 | Am7♭5 → D7 ii-V |
| 11-12마디 | I7 → V7 | F7 D7 → Gm7 C7 턴어라운드 |

### Quick Change vs Slow Change
- **Slow Change**: 2마디에도 F7 유지 (기본)
- **Quick Change**: 2마디에 B♭7 등장 (재즈에서 더 자주 사용)`,
        en: `## 12-Bar Blues — The Starting Point of Jazz

Blues is the root of jazz. Without fully understanding the jazz blues form, improvisation cannot begin. This simple 12-bar structure contains all the core concepts of jazz harmony.

### Basic 12-Bar Blues Structure


Bar  1: I7   |  2: I7   |  3: I7   |  4: I7   |
Bar  5: IV7  |  6: IV7  |  7: I7   |  8: I7   |
Bar  9: V7   | 10: IV7  | 11: I7   | 12: V7   |


### Jazz Blues in F — Real Version


Bar  1: F7       |  2: Bb7      |  3: F7       |  4: F7       |
Bar  5: Bb7      |  6: Bdim7    |  7: F7       |  8: Am7b5 D7 |
Bar  9: Gm7      | 10: C7       | 11: F7   D7  | 12: Gm7  C7  |


### Functional Analysis of Each Chord

**I7 (F7)** — The Blues Core
- In normal tonal music, this dominant 7 should resolve
- In blues, I7 becomes "home" — it stays without resolving
- This is the secret to blues' constant tension

**IV7 (Bb7)** — Subdominant
- First appears at bar 5
- The I7 → IV7 movement is the most archetypal blues motion

**Passing Chord (Bar 6: Bdim7)**
- Inserted between Bb7 and F7 in jazz blues
- Chromatic passing chord smoothly connecting Bb7 to F7

**Bar 8 ii-V Substitution (Am7♭5 → D7)**
- ii-V resolving to Gm7 at bar 9
- The most important harmonic refinement in jazz blues

**Turnaround (Bars 11-12)**
- Returns to beginning I7
- Bar 12: Gm7 → C7 (C7 is V7, resolves to F7)`,
        ja: `## 12小節ブルース — ジャズの出発点

ブルースはジャズのルーツです。ジャズブルースフォームを完全に理解しなければ、即興演奏を始めることができません。

### 基本12小節ブルース構造


小節  1: I7   |  2: I7   |  3: I7   |  4: I7   |
小節  5: IV7  |  6: IV7  |  7: I7   |  8: I7   |
小節  9: V7   | 10: IV7  | 11: I7   | 12: V7   |


### ジャズブルース（Fキー）実戦版


小節  1: F7       |  2: Bb7      |  3: F7       |  4: F7       |
小節  5: Bb7      |  6: Bdim7    |  7: F7       |  8: Am7b5 D7 |
小節  9: Gm7      | 10: C7       | 11: F7   D7  | 12: Gm7  C7  |


### 各コードの機能分析

**I7（F7）** — ブルースの核心的色彩
- 通常の調性音楽では解決されるべきドミナント7
- ブルースではI7が「家（home）」になる — 解決せずに留まる

**ターンアラウンド（11-12小節）**
- 最初のI7に戻るためのii-V進行
- 12小節目: Gm7 → C7（C7がV7、F7へ解決）`,
      },
      abcNotation: `X:1
T:F Jazz Blues - Chord Roots
M:4/4
L:1/4
Q:1/4=120
K:F
F,4 | B,,4 | F,4 | F,4 |
B,,4 | B,4 | F,4 | A,2 D2 |
G,4 | C4 | F,2 D2 | G,2 C2 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'F 블루스 루트 음 암기', en: 'F Blues Root Note Memorization', ja: 'Fブルースルート音暗記' },
          description: {
            ko: 'F 블루스 12마디의 각 코드 루트 음을 4박자씩 연주하며 진행을 암기하십시오. 메트로놈 BPM 80. 마디 번호와 코드 이름을 입으로 말하면서 연주하면 더 빠르게 암기됩니다.',
            en: 'Play root notes of each chord in F blues for 4 beats each, memorizing the progression. BPM 80. Saying the bar numbers and chord names aloud while playing accelerates memorization.',
            ja: 'Fブルース12小節の各コードルート音を4拍ずつ演奏して進行を暗記してください。BPM80。演奏しながら小節番号とコード名を口に出すとより早く暗記できます。',
          },
          bpm: 80,
        },
        {
          title: { ko: 'Drop 2 보이싱으로 블루스 컴핑', en: 'Blues Comping with Drop 2 Voicings', ja: 'Drop 2ボイシングでブルースカンプ' },
          description: {
            ko: 'Drop 2 보이싱을 사용해 F 블루스 전체를 컴핑하십시오. 각 코드 4박자, BPM 80. 턴어라운드(11-12마디)에서 Gm7 → C7 진행에 집중합니다.',
            en: 'Comp the full F blues using Drop 2 voicings. 4 beats per chord, BPM 80. Focus on the Gm7 → C7 turnaround at bars 11-12.',
            ja: 'Drop 2ボイシングを使ってFブルース全体をカンプしてください。各コード4拍、BPM80。11-12小節のGm7 → C7ターンアラウンドに集中します。',
          },
          bpm: 80,
        },
        {
          title: { ko: '재즈 블루스 폼 분석 퀴즈', en: 'Jazz Blues Form Analysis Quiz', ja: 'ジャズブルースフォーム分析クイズ' },
          description: {
            ko: '악보 없이 머릿속으로 F 블루스 12마디를 상상하면서 각 마디의 코드 기능(I7, IV7, ii-V, 턴어라운드)을 설명해 보십시오. 메트로놈과 함께 8마디 마다 코드 변경 시점을 소리 내어 말할 수 있으면 완성입니다.',
            en: 'Without sheet music, mentally run through F blues 12 bars and explain the chord function of each bar (I7, IV7, ii-V, turnaround). You\'re done when you can verbally announce each chord change on cue with the metronome.',
            ja: '楽譜なしで頭の中でFブルース12小節を想像しながら、各小節のコード機能（I7、IV7、ii-V、ターンアラウンド）を説明してください。メトロノームに合わせて各コードチェンジのタイミングを声に出して言えれば完成です。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'F 블루스 12마디 코드 진행을 악보 없이 암기', en: 'Memorized F blues 12-bar progression without sheet music', ja: 'Fブルース12小節コード進行を楽譜なしで暗記' },
      { ko: '루트 음으로 12마디 연주 가능 (BPM 100)', en: 'Can play 12 bars with root notes (BPM 100)', ja: 'ルート音で12小節演奏できる（BPM100）' },
      { ko: 'Drop 2 보이싱으로 전체 폼 컴핑 가능 (BPM 80)', en: 'Can comp full form with Drop 2 voicings (BPM 80)', ja: 'Drop 2ボイシングで全フォームカンプできる（BPM80）' },
      { ko: '8마디 Am7♭5 → D7 진행의 기능을 설명할 수 있다', en: 'Can explain the function of Am7b5 → D7 at bar 8', ja: '8小節目のAm7b5 → D7進行の機能を説明できる' },
      { ko: 'B♭ 블루스로도 전조 가능', en: 'Can transpose to Bb blues', ja: 'Bbブルースにも転調できる' },
    ],
    tools: ['metronome', 'sheet-music'],
  },

  {
    id: 'blues-scale',
    slug: 'blues-scale',
    stage: 2,
    order: 7,
    title: {
      ko: '블루스 스케일 + 펜타토닉',
      en: 'Blues Scale + Pentatonic',
      ja: 'ブルーススケール + ペンタトニック',
    },
    description: {
      ko: '블루스 핵심 스케일과 펜타토닉의 관계, 블루 노트의 활용법을 익힌다.',
      en: 'Learn the blues scale, its relation to pentatonic, and how to use blue notes.',
      ja: 'ブルース核心スケールとペンタトニックの関係、ブルーノートの活用法を学ぶ。',
    },
    theory: {
      content: {
        ko: `## 블루스 스케일 — 감정을 담는 6음

마이너 펜타토닉에 단 하나의 음을 추가하면 블루스 스케일이 완성됩니다. 그 추가음이 바로 블루 노트(♭5)입니다. 이 음 하나가 스케일 전체의 긴장감과 표현력을 바꿔놓습니다.

### 마이너 펜타토닉 → 블루스 스케일


마이너 펜타토닉 (5음): 1 - ♭3 - 4 - 5 - ♭7
블루스 스케일   (6음): 1 - ♭3 - 4 - ♭5 - 5 - ♭7
                                   ↑
                              블루 노트 추가


### 블루스 스케일 구성음 (F 키)

| 음도 | 음이름 | 특징 |
|-----|------|-----|
| 1도 | F | 루트 |
| ♭3도 | A♭ | 마이너 색채 |
| 4도 | B♭ | 안정음 |
| **♭5도** | **B** | **블루 노트 — 핵심** |
| 5도 | C | 안정음 |
| ♭7도 | E♭ | 블루지한 색채 |

### 두 가지 포지션 (레슨 노트 기준)

**포지션 A (6번줄 루트 기준)**
- 6번줄에 루트(F)가 위치
- 블루 노트(♭5)가 6번줄과 5번줄에 각각 등장

**포지션 B (5번줄 루트 기준)**
- 5번줄에 루트(F)가 위치
- 다른 프렛 영역에서 같은 스케일 커버

두 포지션을 모두 익히면 넥의 더 넓은 범위에서 블루스 솔로가 가능합니다.

### 블루 노트 활용의 원칙

블루 노트(♭5)는 **경과음**입니다. 오래 머물면 어색해집니다.

올바른 사용법:
- **♭5 → 5**: 블루 노트에서 반음 올라 5도로 해결 (가장 자연스러운 방향)
- **♭5 → 4**: 블루 노트에서 반음 내려 4도로 해결
- **벤딩 포인트**: 4도를 ♭5까지 벤드해서 5도로 해결하면 최고의 블루스 표현

### 표현 테크닉과의 조합

블루스 스케일이 가장 살아나는 테크닉:
- **벤드(Bend)**: 4도 → ♭5 → 5도로 슬라이딩 업
- **비브라토(Vibrato)**: 특히 ♭3도와 ♭7도에서
- **슬라이드**: ♭5에서 5도로 올라가거나 4도로 내려오기

### 재즈 블루스에서의 활용

블루스 스케일 하나만으로는 재즈 블루스의 전 범위를 커버할 수 없습니다. 믹솔리디안 스케일과 혼합하면 더 재즈스러운 솔로가 가능합니다(다음 챕터 참고).`,
        en: `## Blues Scale — 6 Notes That Carry Emotion

Add just one note to the minor pentatonic and you have the blues scale. That added note is the blue note (♭5). This single note transforms the tension and expressiveness of the entire scale.

### Minor Pentatonic → Blues Scale


Minor Pentatonic (5 notes): 1 - ♭3 - 4 - 5 - ♭7
Blues Scale       (6 notes): 1 - ♭3 - 4 - ♭5 - 5 - ♭7
                                        ↑
                                  Blue note added


### Blues Scale in F Key

| Degree | Note | Character |
|--------|------|-----------|
| 1st | F | Root |
| ♭3rd | A♭ | Minor color |
| 4th | B♭ | Stable tone |
| **♭5th** | **B** | **Blue note — key** |
| 5th | C | Stable tone |
| ♭7th | E♭ | Bluesy color |

### Two Positions (from lesson notes)

**Position A** (6th string root) and **Position B** (5th string root) cover the same scale in different areas of the neck.

### Blue Note Usage Principles

The blue note (♭5) is a **passing tone**. Dwelling on it sounds awkward.

Correct usage:
- **♭5 → 5**: Half step up to 5th (most natural direction)
- **♭5 → 4**: Half step down to 4th
- **Bend point**: Bend 4th to ♭5, then resolve to 5th for peak blues expression`,
        ja: `## ブルーススケール — 感情を込める6音

マイナーペンタトニックにたった1つの音を追加するとブルーススケールの完成です。その追加音がブルーノート（♭5）です。

### マイナーペンタトニック → ブルーススケール


マイナーペンタトニック（5音）: 1 - ♭3 - 4 - 5 - ♭7
ブルーススケール      （6音）: 1 - ♭3 - 4 - ♭5 - 5 - ♭7
                                         ↑
                                   ブルーノート追加


### ブルーノート活用の原則

ブルーノート（♭5）は**経過音**です。長く留まると不自然になります。

正しい使い方:
- **♭5 → 5**: 半音上行して5度へ解決（最も自然な方向）
- **♭5 → 4**: 半音下行して4度へ解決
- **ベンドポイント**: 4度を♭5までベンドして5度へ解決すると最高のブルース表現`,
      },
      abcNotation: `X:1
T:F Blues Scale
M:4/4
L:1/8
Q:1/4=80
K:F
F A_B B c _e f2 | f _e c B _B A F4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: '블루 노트 경과음 집중 연습', en: 'Blue Note Passing Tone Focus', ja: 'ブルーノート経過音集中練習' },
          description: {
            ko: 'B♭(4도) → B(♭5, 블루 노트) → C(5도) 패턴을 F 키에서 반복하십시오. 벤드 또는 슬라이드로 표현합니다. 블루 노트(B)에서 절대로 멈추지 말고 바로 C(5도)로 이동하십시오. BPM 60, 10회 반복.',
            en: 'Repeat the Bb(4th) → B(♭5, blue note) → C(5th) pattern in F key. Express with bend or slide. Never pause on the blue note B — move immediately to C (5th). BPM 60, 10 repetitions.',
            ja: 'F キーでB♭（4度）→ B（♭5、ブルーノート）→ C（5度）パターンを繰り返してください。ベンドまたはスライドで表現します。ブルーノート（B）では絶対に止まらず、すぐにC（5度）に移動してください。BPM60、10回繰り返し。',
          },
          bpm: 60,
          abcNotation: `X:1
T:Blue Note Passing Tone - F Blues
M:4/4
L:1/4
Q:1/4=60
K:F
_B =B c2 | _B =B c2 | _B =B c2 | _B =B c2 |]`,
        },
        {
          title: { ko: 'F 블루스 스케일 포지션 A 오르내리기', en: 'F Blues Scale Position A Up and Down', ja: 'FブルーススケールポジションAの上下' },
          description: {
            ko: 'F 블루스 스케일 포지션 A(6번줄 루트)를 BPM 70에서 오르내리십시오. 블루 노트(B) 위치를 시각적으로 확인하면서 연주합니다. 다음 단계로 포지션 B(5번줄 루트)도 익힙니다.',
            en: 'Play F blues scale Position A (6th string root) up and down at BPM 70. Visually confirm the blue note (B) position while playing. Then learn Position B (5th string root).',
            ja: 'FブルーススケールポジションA（6弦ルート）をBPM70で上下してください。ブルーノート（B）の位置を視覚的に確認しながら演奏します。次のステップとしてポジションB（5弦ルート）も習得します。',
          },
          bpm: 70,
          abcNotation: `X:1
T:F Blues Scale
M:4/4
L:1/8
Q:1/4=70
K:F
F A _B =B c _e f2 | f _e c =B _B A F4 |]`,
        },
        {
          title: { ko: 'F 블루스 위에서 블루스 스케일 즉흥', en: 'Blues Scale Improvisation Over F Blues', ja: 'Fブルースの上でブルーススケール即興' },
          description: {
            ko: 'F 블루스 12마디 위에서 F 블루스 스케일만으로 즉흥 연주를 하십시오. BPM 80. 블루 노트는 경과음으로 사용하고, 쉬는 공간(rest)도 연주의 일부로 활용합니다. 2코러스 이상 연속 연주.',
            en: 'Improvise over F blues 12 bars using only F blues scale. BPM 80. Use blue note as a passing tone, and treat rests as part of the music. Play 2 or more choruses continuously.',
            ja: 'Fブルース12小節の上でFブルーススケールだけで即興演奏してください。BPM80。ブルーノートは経過音として使い、休止（rest）も音楽の一部として活用します。2コーラス以上連続演奏。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'F 블루스 스케일 포지션 A를 BPM 80에서 연주 가능', en: 'Can play F blues scale Position A at BPM 80', ja: 'FブルーススケールポジションAをBPM80で演奏できる' },
      { ko: '블루 노트(♭5)를 경과음으로 자연스럽게 사용', en: 'Can use blue note (♭5) naturally as passing tone', ja: 'ブルーノート（♭5）を経過音として自然に使える' },
      { ko: 'F 블루스 위에서 블루스 스케일로 2코러스 즉흥 가능', en: 'Can improvise 2 choruses over F blues with blues scale', ja: 'Fブルースの上でブルーススケールで2コーラス即興できる' },
      { ko: '포지션 A와 B 모두 위치 파악 완료', en: 'Know the positions of both Position A and B', ja: 'ポジションAとBの両方の位置を把握完了' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'mixolydian',
    slug: 'mixolydian',
    stage: 2,
    order: 8,
    title: {
      ko: '믹솔리디안 스케일',
      en: 'Mixolydian Scale',
      ja: 'ミクソリディアンスケール',
    },
    description: {
      ko: '도미넌트 7 코드 위에서 사용하는 믹솔리디안 모드를 재즈 블루스에 적용한다.',
      en: 'Apply the Mixolydian mode used over dominant 7 chords to jazz blues.',
      ja: 'ドミナント7コードの上で使うミクソリディアンモードをジャズブルースに適用する。',
    },
    theory: {
      content: {
        ko: `## 믹솔리디안 — 도미넌트 7의 스케일

도미넌트 7 코드(G7, F7, C7 등) 위에서 솔로를 할 때 가장 자연스럽게 매칭되는 스케일이 믹솔리디안(Mixolydian)입니다. 블루스 스케일이 "더 날카롭고 블루지"한 느낌이라면, 믹솔리디안은 "더 재지하고 부드러운" 느낌을 만들어냅니다.

### 믹솔리디안의 원리

메이저 스케일에서 **7도(7번째 음)를 반음 낮춘 것**이 믹솔리디안입니다.


C 메이저:     C D E F G A B  C
C 믹솔리디안: C D E F G A Bb C
                              ↑
                           B → Bb (반음 아래)


### 왜 도미넌트 7 코드에 맞는가?

G7 코드의 구성음: G - B - D - **F**
G 믹솔리디안:     G A B C D E **F** G

→ ♭7음(F)이 G 믹솔리디안에 포함됩니다. 코드와 스케일이 완벽히 일치!

반면 G 메이저 스케일(G7에 메이저7 = F♯)은 G7 코드와 충돌합니다.

### F 블루스에서의 활용

블루스 12마디의 각 도미넌트 7 코드마다 해당 키의 믹솔리디안을 사용합니다:

| 코드 | 사용 스케일 | 구성음 |
|-----|---------|------|
| F7 | F 믹솔리디안 | F G A B♭ C D **E♭** |
| B♭7 | B♭ 믹솔리디안 | B♭ C D E♭ F G **A♭** |
| C7 | C 믹솔리디안 | C D E F G A **B♭** |

### 블루스 스케일 vs 믹솔리디안

| 비교 항목 | 블루스 스케일 | 믹솔리디안 |
|--------|---------|---------|
| 음 수 | 6음 | 7음 |
| 사운드 | 날카롭고 블루지 | 부드럽고 재즈적 |
| 장점 | 강렬한 표현 | 풍부한 색채 |

### 혼합 사용 — 재즈 블루스의 비결

블루스 스케일 + 믹솔리디안을 상황에 따라 혼합하면 가장 재즈 블루스다운 사운드가 만들어집니다.

예시: F7 위에서
- 강조 구간: F 블루스 스케일 (블루 노트 강조)
- 흐르는 구간: F 믹솔리디안 (매끄러운 선율)

### 모드로서의 믹솔리디안

믹솔리디안은 메이저 스케일의 5번째 모드이기도 합니다.
- F 믹솔리디안 = B♭ 메이저 스케일의 5번째 모드
- C 믹솔리디안 = F 메이저 스케일의 5번째 모드
이 관계를 이해하면 전조가 쉬워집니다.`,
        en: `## Mixolydian — The Scale for Dominant 7

When soloing over dominant 7 chords (G7, F7, C7, etc.), the most naturally matching scale is Mixolydian. Blues scale feels "sharper and bluesier" while Mixolydian creates a "jazzier and smoother" feel.

### The Principle of Mixolydian

Mixolydian is a major scale with the **7th degree lowered by a half step**.


C Major:      C D E F G A B  C
C Mixolydian: C D E F G A Bb C
                              ↑
                           B → Bb (half step lower)


### Why Does It Work Over Dominant 7?

G7 chord tones: G - B - D - **F**
G Mixolydian:   G A B C D E **F** G

→ The ♭7 (F) is in G Mixolydian — perfect match!

### Usage in F Blues

| Chord | Scale | Notes |
|-------|-------|-------|
| F7 | F Mixolydian | F G A Bb C D **Eb** |
| Bb7 | Bb Mixolydian | Bb C D Eb F G **Ab** |
| C7 | C Mixolydian | C D E F G A **Bb** |

### Blues Scale vs Mixolydian

| | Blues Scale | Mixolydian |
|--|------------|------------|
| Notes | 6 | 7 |
| Sound | Sharp, bluesy | Smooth, jazzy |
| Best for | Intense expression | Rich melody |`,
        ja: `## ミクソリディアン — ドミナント7のスケール

ドミナント7コード（G7、F7、C7など）の上でソロする時、最も自然にマッチするスケールがミクソリディアンです。

### ミクソリディアンの原理

メジャースケールの**7度（7番目の音）を半音下げた**ものがミクソリディアンです。


Cメジャー:      C D E F G A B  C
Cミクソリディアン: C D E F G A Bb C


### Fブルースでの活用

| コード | 使用スケール | 構成音 |
|------|---------|------|
| F7 | Fミクソリディアン | F G A Bb C D **Eb** |
| Bb7 | Bbミクソリディアン | Bb C D Eb F G **Ab** |
| C7 | Cミクソリディアン | C D E F G A **Bb** |`,
      },
      abcNotation: `X:1
T:F Mixolydian Scale
M:4/4
L:1/8
Q:1/4=80
K:F
F G A _B c d _e f | f _e d c _B A G F |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'F 믹솔리디안 오르내리기', en: 'F Mixolydian Up and Down', ja: 'Fミクソリディアン上下' },
          description: {
            ko: 'F 믹솔리디안 스케일을 BPM 70에서 연주. Eb음(b7)에 특히 주목하세요 — 이게 믹솔리디안의 특징음.',
            en: 'Play F Mixolydian scale at BPM 70. Pay attention to Eb (b7) — it\'s the characteristic note of Mixolydian.',
            ja: 'FミクソリディアンスケールをBPM70で演奏。Eb音（b7）に特に注目 — これがミクソリディアンの特徴音。',
          },
          bpm: 70,
          abcNotation: `X:1
T:F Mixolydian Exercise
M:4/4
L:1/8
Q:1/4=70
K:Bb
F G A _B c d _e f | f _e d c _B A G F |]`,
        },
        {
          title: { ko: '블루스 스케일 + 믹솔리디안 혼합', en: 'Blues Scale + Mixolydian Mix', ja: 'ブルーススケール + ミクソリディアン混合' },
          description: {
            ko: 'F7 위에서 블루스 스케일로 시작해 믹솔리디안으로 전환하는 4마디 프레이즈를 만들어보세요.',
            en: 'Create a 4-bar phrase starting with blues scale over F7, then transitioning to Mixolydian.',
            ja: 'F7の上でブルーススケールから始めてミクソリディアンに転換する4小節フレーズを作ってください。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'F 믹솔리디안 스케일 연주 가능 (BPM 80)', en: 'Can play F Mixolydian scale (BPM 80)', ja: 'FミクソリディアンスケールをBPM80で演奏できる' },
      { ko: '믹솔리디안과 블루스 스케일의 차이를 귀로 구분', en: 'Can distinguish Mixolydian from blues scale by ear', ja: 'ミクソリディアンとブルーススケールの違いを耳で区別' },
      { ko: 'F 블루스 위에서 믹솔리디안으로 즉흥 연주 시도', en: 'Can attempt Mixolydian improvisation over F blues', ja: 'Fブルースの上でミクソリディアンで即興演奏の試み' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'first-licks',
    slug: 'first-licks',
    stage: 2,
    order: 9,
    title: {
      ko: '첫 번째 블루스 릭',
      en: 'First Blues Licks',
      ja: '最初のブルースリック',
    },
    description: {
      ko: '재즈 블루스의 핵심 릭 3개를 암기하고 다양한 키에 적용한다.',
      en: 'Memorize 3 essential jazz blues licks and apply them in different keys.',
      ja: 'ジャズブルースの核心リック3つを暗記して様々なキーに適用する。',
    },
    theory: {
      content: {
        ko: `## 릭(Lick)이란?

릭은 재즈 즉흥연주의 **어휘(vocabulary)**입니다.
대화할 때 문법을 즉흥으로 만들지 않듯, 재즈도 사전에 익혀둔 릭들을 상황에 맞게 조합합니다.

### 릭 학습의 3단계
1. **암기**: 원래 키에서 완벽하게 외우기
2. **전조**: 여러 키에서 연주하기
3. **맥락**: 실제 블루스 폼 위에 올리기

### Lick 1: 기본 F 블루스 릭 (턴어라운드용)
F7 코드 위에서 사용. 블루스 스케일 기반.

### Lick 2: 콜-앤-리스폰스 릭
블루스의 "질문-대답" 구조를 구현한 릭.

### Lick 3: 믹솔리디안 릭
F 믹솔리디안 기반, 재지한 느낌의 릭.`,
        en: `## What is a Lick?

A lick is the **vocabulary** of jazz improvisation.
Just as you don't improvise grammar when speaking, jazz uses pre-learned licks combined situationally.

### 3 Stages of Lick Learning
1. **Memorize**: Learn perfectly in original key
2. **Transpose**: Play in multiple keys
3. **Context**: Apply over actual blues form

### Lick 1: Basic F Blues Lick (for turnaround)
Used over F7 chord. Based on blues scale.

### Lick 2: Call-and-Response Lick
A lick that implements the "question-answer" structure of blues.

### Lick 3: Mixolydian Lick
Based on F Mixolydian, a jazzy-feeling lick.`,
        ja: `## リック（Lick）とは？

リックはジャズ即興演奏の**語彙（vocabulary）**です。
会話で文法を即興で作らないように、ジャズも事前に学んだリックを状況に合わせて組み合わせます。

### リック学習の3段階
1. **暗記**: 元のキーで完璧に覚える
2. **転調**: 様々なキーで演奏する
3. **コンテキスト**: 実際のブルースフォームの上に乗せる`,
      },
      abcNotation: `X:1
T:Lick 1 - Basic F Blues Lick
M:4/4
L:1/8
Q:1/4=80
K:F
_e c _B =B c4 | _e c _B A F4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Lick 1 암기', en: 'Memorize Lick 1', ja: 'リック1暗記' },
          description: {
            ko: 'BPM 60에서 Lick 1을 10번 반복. 악보 없이 연주할 수 있을 때까지.',
            en: 'Repeat Lick 1 10 times at BPM 60. Until you can play without sheet music.',
            ja: 'BPM60でリック1を10回繰り返す。楽譜なしで演奏できるまで。',
          },
          bpm: 60,
          abcNotation: `X:1
T:Lick 1 Practice
M:4/4
L:1/8
Q:1/4=60
K:F
_e c _B =B c4 | _e c _B A F4 |]`,
        },
        {
          title: { ko: 'Lick 1 Bb키 전조', en: 'Lick 1 Transposed to Bb', ja: 'リック1をBbキーに転調' },
          description: {
            ko: 'Lick 1을 Bb키로 전조해서 연주. F 블루스의 IV7(Bb7) 위에서 사용하는 연습.',
            en: 'Transpose Lick 1 to Bb key. Practice using it over the IV7 (Bb7) of F blues.',
            ja: 'リック1をBbキーに転調して演奏。FブルースのIV7（Bb7）の上で使う練習。',
          },
          bpm: 70,
        },
        {
          title: { ko: '12마디 블루스 위에 릭 올리기', en: 'Apply Licks Over 12-Bar Blues', ja: '12小節ブルースの上にリックを乗せる' },
          description: {
            ko: 'F 블루스를 천천히 연주하면서 적절한 위치에 학습한 릭들을 삽입하세요. 나머지 마디는 펜타토닉으로 채우기.',
            en: 'Play F blues slowly while inserting learned licks at appropriate places. Fill remaining bars with pentatonic.',
            ja: 'Fブルースをゆっくり演奏しながら適切な位置に学んだリックを挿入。残りの小節はペンタトニックで埋める。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'Lick 1을 F키에서 악보 없이 연주 가능 (BPM 80)', en: 'Can play Lick 1 in F key without sheet music (BPM 80)', ja: 'リック1をFキーで楽譜なしで演奏できる（BPM80）' },
      { ko: 'Lick 1을 Bb키로 전조 가능', en: 'Can transpose Lick 1 to Bb key', ja: 'リック1をBbキーに転調できる' },
      { ko: 'F 블루스 연주 중 자연스럽게 릭 삽입 가능', en: 'Can naturally insert lick during F blues', ja: 'Fブルース演奏中に自然にリックを挿入できる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'blues-turnaround',
    slug: 'blues-turnaround',
    stage: 2,
    order: 10,
    title: {
      ko: '블루스 턴어라운드',
      en: 'Blues Turnaround',
      ja: 'ブルースターンアラウンド',
    },
    description: {
      ko: '블루스 마지막 2마디의 핵심 — I7→V7(#9) 턴어라운드 라인을 두 가지 버전으로 암기한다.',
      en: 'The core of the last 2 bars of blues — memorize the I7→V7(#9) turnaround line in two versions.',
      ja: 'ブルース最後の2小節の核心 — I7→V7(#9)ターンアラウンドラインを2つのバージョンで暗記する。',
    },
    theory: {
      content: {
        ko: `## 블루스 턴어라운드 — 12마디를 완성하는 두 라인

턴어라운드(Turnaround)는 블루스 12마디의 **11-12번째 마디**에서 사이클을 완성하고 다시 처음 I7으로 돌아가게 하는 핵심 구간입니다. 레슨 노트에 두 가지 버전이 명시되어 있습니다.

### 턴어라운드의 구조


마디 11: I7    (F7)
마디 12: V7♯9  (C7♯9) → 다시 마디 1 F7으로


V7(♯9)는 "Jimi Hendrix chord"로도 불리는 강렬한 긴장감의 코드입니다.

### 라인 A — 크로매틱 상행 (1, 3, 4, ♯4 → 5)

레슨 노트: **음 선택 A: 1 3 4 ♯4 | 5**

F 블루스에서의 구체 음:

마디 11 (F7): F - A - B♭ - B
마디 12 (C7): C (V7 루트로 도착)


- 루트(F)에서 출발
- 장3도(A) → 완전4도(B♭) → 증4도(♯4=B)로 반음씩 상행
- 마지막에 5도(C=V7의 루트)로 도약 해결
- **크로매틱 긴장 상행 + 도약 해결**의 패턴

### 라인 B — 코드톤 기반 (1, ♭7, 6, ♭7 → 5)

레슨 노트: **음 선택 B: 1 ♭7 6 ♭7 | 5**

F 블루스에서의 구체 음:

마디 11 (F7): F - E♭ - D - E♭
마디 12 (C7): C (V7 루트로 도착)


- 루트(F)에서 출발
- ♭7도(E♭) → 6도(D) → 다시 ♭7도(E♭)로 진자 운동
- 마지막에 5도(C)로 해결
- **블루스 색채 진하고** 코드 안의 음들만 사용

### 두 라인 비교

| 특성 | 라인 A | 라인 B |
|-----|------|------|
| 움직임 | 반음 상행 | 진자 운동 |
| 색채 | 크로매틱, 날카로움 | 블루지, 부드러움 |
| 어려움 | 중간 | 쉬움 |
| 효과 | 강한 긴장 | 따뜻한 블루스 |

두 라인을 번갈아 사용하거나 혼합하면 다양성이 생깁니다.

### B♭ 블루스 전조 (B♭7 → F7)

| 라인 | B♭ 블루스 음 |
|-----|-----------|
| A | B♭ - D - E♭ - E → F |
| B | B♭ - A♭ - G - A♭ → F |`,
        en: `## Blues Turnaround

The turnaround is the **11th-12th bar** of blues that drives back to the beginning.

### Basic Structure
- **I7** (bar 11) → **V7(#9)** (bar 12) → back to bar 1 I7

### Turnaround Line A (Chromatic Ascending)
\`\`\`
I7 chord: 1  3  4  #4  |  5 (V7)
\`\`\`

### Turnaround Line B (Chord Tone Based)
\`\`\`
I7 chord: 1  b7  6  b7  |  5 (V7)
\`\`\`

### In F Blues (F7 → C7)
- Line A: F A Bb B | C
- Line B: F Eb D Eb | C`,
        ja: `## ブルースターンアラウンド

ターンアラウンドはブルース12小節の**11-12小節目**で最初に戻るための進行です。

### 基本構造
- **I7**（11小節）→ **V7(#9)**（12小節）→ 1小節目I7に戻る

### ターンアラウンドラインA
- ルートから3度、4度、#4度を経て5度へ解決

### ターンアラウンドラインB
- ルート → b7 → 6 → b7 → 5度へ解決`,
      },
      abcNotation: `X:1
T:F Blues Turnaround - Line A
M:4/4
L:1/4
Q:1/4=80
K:F
F A _B =B | c4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: '턴어라운드 라인 A 암기', en: 'Memorize Turnaround Line A', ja: 'ターンアラウンドラインA暗記' },
          description: {
            ko: 'F 블루스 턴어라운드 라인 A (F A Bb B | C)를 BPM 70에서 10회 반복. 악보 없이 연주할 수 있을 때까지.',
            en: 'Repeat F blues turnaround Line A (F A Bb B | C) 10 times at BPM 70. Until you can play without sheet music.',
            ja: 'FブルースターンアラウンドラインA（F A Bb B | C）をBPM70で10回繰り返す。楽譜なしで演奏できるまで。',
          },
          bpm: 70,
          abcNotation: `X:1
T:Turnaround Line A - F Blues
M:4/4
L:1/4
Q:1/4=70
K:F
F A _B =B | c4 |]`,
        },
        {
          title: { ko: '턴어라운드 라인 B 암기', en: 'Memorize Turnaround Line B', ja: 'ターンアラウンドラインB暗記' },
          description: {
            ko: 'F 블루스 턴어라운드 라인 B (F Eb D Eb | C)를 BPM 70에서 10회 반복.',
            en: 'Repeat F blues turnaround Line B (F Eb D Eb | C) 10 times at BPM 70.',
            ja: 'FブルースターンアラウンドラインB（F Eb D Eb | C）をBPM70で10回繰り返す。',
          },
          bpm: 70,
          abcNotation: `X:1
T:Turnaround Line B - F Blues
M:4/4
L:1/4
Q:1/4=70
K:F
F _E D _E | c4 |]`,
        },
        {
          title: { ko: '12마디 블루스 + 턴어라운드 전체 연주', en: 'Full 12-Bar Blues with Turnaround', ja: '12小節ブルース + ターンアラウンド全体演奏' },
          description: {
            ko: 'F 블루스 12마디를 펜타토닉으로 즉흥 연주하다가 11-12마디에서 턴어라운드 라인 삽입. BPM 80.',
            en: 'Improvise F blues 12 bars with pentatonic, then insert turnaround line at bars 11-12. BPM 80.',
            ja: 'Fブルース12小節をペンタトニックで即興演奏し、11-12小節でターンアラウンドラインを挿入。BPM80。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: '턴어라운드 라인 A를 F키에서 악보 없이 연주 가능 (BPM 80)', en: 'Can play Turnaround Line A in F key without sheet music (BPM 80)', ja: 'ターンアラウンドラインAをFキーで楽譜なしで演奏できる（BPM80）' },
      { ko: '턴어라운드 라인 B를 F키에서 악보 없이 연주 가능 (BPM 80)', en: 'Can play Turnaround Line B in F key without sheet music (BPM 80)', ja: 'ターンアラウンドラインBをFキーで楽譜なしで演奏できる（BPM80）' },
      { ko: '12마디 블루스에서 11-12마디에 자연스럽게 턴어라운드 삽입', en: 'Can naturally insert turnaround at bars 11-12 of 12-bar blues', ja: '12小節ブルースの11-12小節に自然にターンアラウンドを挿入できる' },
      { ko: 'Bb키로 전조 가능', en: 'Can transpose to Bb key', ja: 'Bbキーに転調できる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'dorian-tetrachord',
    slug: 'dorian-tetrachord',
    stage: 2,
    order: 11,
    title: {
      ko: 'Dorian Tetrachord',
      en: 'Dorian Tetrachord',
      ja: 'ドリアンテトラコード',
    },
    description: {
      ko: 'Dorian 스케일을 4음 셀로 나눠 두 가지 핑거링 패턴으로 완전히 익힌다 — 재즈 즉흥연주의 핵심 운지법.',
      en: 'Master the Dorian scale split into 4-note cells with two fingering patterns — the core jazz improvisation fingering.',
      ja: 'ドリアンスケールを4音セルに分けて2つのフィンガリングパターンでマスターする — ジャズ即興演奏の核心運指法。',
    },
    theory: {
      content: {
        ko: `## Dorian Tetrachord — 재즈 운지의 핵심

레슨에서 가장 중요하게 다룬 개념 중 하나입니다. 단순히 스케일을 오르내리는 것이 아니라, 4음 셀(Tetrachord) 단위로 손을 조직화하여 기타 지판 전체에서 효율적으로 연주하는 방법입니다.

### Tetrachord란?

Tetrachord = **4개의 음으로 이루어진 셀(Cell)**

Dorian 스케일을 두 개의 테트라코드로 나눕니다:

**D Dorian: D E F G | A B C D**
- 앞 테트라코드: **D E F G** (온-반-온, W-H-W)
- 뒤 테트라코드: **A B C D** (온-반-온, W-H-W)

두 테트라코드 모두 **온-반-온(W-H-W)** 패턴을 가집니다. 이것이 Dorian의 특징입니다.

### Dorian Tetrachord의 음정 구조


D - E - F - G   |   A - B - C - D
  온   반   온       온   반   온


이 온-반-온 패턴은 기억하기 쉽고, 어느 키에서도 같은 손 모양으로 적용됩니다.

### 두 가지 핑거링 패턴 — 레슨 핵심

**[A] 검지(1번 손가락) 시작**

레 도 시 라 ← 하행 방향 (검지 시작)

- 검지(1번)로 첫 음을 잡고 중지/약지 방향으로 진행
- 선생님 표기: "강지 방향"

**[B] 약지(4번 손가락) 시작**

(미) 레 도 시 라 솔 파 ← 하행 방향 (약지 시작)

- 약지(4번)로 첫 음을 잡고 중지/검지 방향으로 진행

### 주의: 틀린 방향
X **"도-시-라-솔" 방향**은 Dorian tetrachord가 아닙니다!
Dorian의 방향은 레→도→시→라 (하행), 또는 라→시→도→레 (상행)입니다.

### 두 가지 연주 방향

**대각선 방향**: "라-솔-파" 세 음을 한 줄에서 모두 처리
**수직 방향**: "라-솔"에서 다음 "파"로 갈 때 윗줄(낮은 줄)로 이동

두 방향 모두 익히면 넥의 수평·수직 방향을 자유롭게 이동할 수 있습니다.

### 4가지 시작 포지션

Dorian tetrachord는 4가지 시작점에서 시작할 수 있습니다:
- **솔(G)**에서 시작
- **미(E)**에서 시작
- **레(D)**에서 시작
- **시(B)**에서 시작

라(A)/도(C)/파(F)에서 시작할 때는 셀이 끊기는 위치이므로 다시 새 셀로 시작합니다.

### 모드 조합 공식

모든 모드를 두 개의 테트라코드 조합으로 이해할 수 있습니다:

| 모드 | 앞 셀 | 뒤 셀 |
|-----|------|------|
| Ionian | 도레미파 | 솔라시도 |
| Dorian | 레미파솔 | 라시도레 |
| Phrygian | 미파솔라 | 시도레미 |

이 공식으로 각 모드의 음 구조를 빠르게 파악할 수 있습니다.`,
        en: `## Dorian Tetrachord — The Core of Jazz Fingering

One of the most important concepts covered in lessons. Not just running scales, but organizing the hand in 4-note cell (Tetrachord) units to play efficiently across the entire fretboard.

### What is a Tetrachord?

Tetrachord = **A cell of 4 notes**

Split the Dorian scale into two tetrachords:

**D Dorian: D E F G | A B C D**
- Front tetrachord: **D E F G** (W-H-W)
- Back tetrachord: **A B C D** (W-H-W)

Both tetrachords have the same **Whole-Half-Whole (W-H-W)** pattern. This is the signature of Dorian.

### Two Fingering Patterns — Lesson Core

**[A] Index finger (1st) start**
- Start with index finger, move toward ring/pinky direction

**[B] Ring finger (4th) start**
- Start with ring finger, move toward middle/index direction

### CAUTION: Wrong Direction
X **"Do-Si-La-Sol" direction** is NOT Dorian tetrachord!
Dorian direction is Re→Do→Si→La (descending), or La→Si→Do→Re (ascending).

### Two Playing Directions

**Diagonal**: Handle all 3 notes "La-Sol-Fa" on one string
**Vertical**: Move to adjacent string when transitioning from "La-Sol" to "Fa"

### 4 Starting Positions

- Starting from Sol (G)
- Starting from Mi (E)
- Starting from Re (D)
- Starting from Si (B)

### Mode Combination Formula

| Mode | Front Cell | Back Cell |
|------|-----------|-----------|
| Ionian | Do-Re-Mi-Fa | Sol-La-Si-Do |
| Dorian | Re-Mi-Fa-Sol | La-Si-Do-Re |
| Phrygian | Mi-Fa-Sol-La | Si-Do-Re-Mi |`,
        ja: `## ドリアンテトラコード — ジャズ運指の核心

レッスンで最も重要なコンセプトの一つです。スケールを単純に上下するのではなく、4音セル（テトラコード）単位で手を組織化してフレットボード全体を効率的に演奏する方法です。

### テトラコードとは？

テトラコード = **4音から成るセル**

ドリアンスケールを2つのテトラコードに分割します：

**Dドリアン: D E F G | A B C D**
- 前テトラコード: **D E F G**（全-半-全）
- 後テトラコード: **A B C D**（全-半-全）

### 2つのフィンガリングパターン

**[A] 人差し指（1番）スタート**
- 人差し指から始め、薬指/小指方向へ進む

**[B] 薬指（4番）スタート**
- 薬指から始め、中指/人差し指方向へ進む

### 注意: 間違った方向
X **「ド-シ-ラ-ソル」方向**はドリアンテトラコードではありません！

### モード組み合わせ公式

| モード | 前セル | 後セル |
|------|------|------|
| Ionian | ドレミファ | ソラシド |
| Dorian | レミファソル | ラシドレ |
| Phrygian | ミファソルラ | シドレミ |`,
      },
      abcNotation: `X:1
T:D Dorian Tetrachord - Two Cells
M:4/4
L:1/8
Q:1/4=60
K:Dmin
"Cell 1"D E F G | "Cell 2"A B c d | d c B A | G F E D |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: '[A] 검지 패턴 기초', en: '[A] Index Finger Pattern Basics', ja: '[A] 人差し指パターン基礎' },
          description: {
            ko: 'D Dorian을 검지 시작 패턴으로 BPM 50에서 시작. 온-반-온 패턴을 느끼면서 천천히 반복. 끊김 없이 연주하는 것이 목표.',
            en: 'Start D Dorian index finger pattern at BPM 50. Feel the W-H-W pattern while repeating slowly. Goal: no interruptions.',
            ja: 'Dドリアンを人差し指スタートパターンでBPM50から開始。全-半-全パターンを感じながらゆっくり繰り返す。',
          },
          bpm: 50,
          abcNotation: `X:1
T:Dorian Tetrachord [A] - BPM 50
M:4/4
L:1/8
Q:1/4=50
K:Dmin
D E F G A B c d | d c B A G F E D |]`,
        },
        {
          title: { ko: '[B] 약지 패턴 기초', en: '[B] Ring Finger Pattern Basics', ja: '[B] 薬指パターン基礎' },
          description: {
            ko: 'D Dorian을 약지 시작 패턴으로 BPM 50에서 연습. [A]와 [B] 두 패턴의 차이를 인식하세요.',
            en: 'Practice D Dorian ring finger pattern at BPM 50. Recognize the difference between [A] and [B] patterns.',
            ja: 'Dドリアンを薬指スタートパターンでBPM50で練習。[A]と[B]の違いを認識してください。',
          },
          bpm: 50,
        },
        {
          title: { ko: '4가지 시작 포지션 전환', en: '4 Starting Position Transitions', ja: '4つのスタートポジション切り替え' },
          description: {
            ko: '솔→미→레→시 4가지 시작점에서 [A] 패턴 연주. 각 시작점에서 8음 전체 완주. BPM 60.',
            en: 'Play [A] pattern from 4 starting points: Sol→Mi→Re→Si. Complete all 8 notes from each start. BPM 60.',
            ja: '솔→미→레→시の4つのスタート地点から[A]パターンを演奏。各スタートで8音全て演奏。BPM60。',
          },
          bpm: 60,
        },
      ],
    },
    checkpoints: [
      { ko: '[A] 검지 패턴 BPM 60에서 끊김 없이 연주', en: 'Can play [A] index pattern at BPM 60 without interruption', ja: '[A]人差し指パターンをBPM60で途切れなく演奏できる' },
      { ko: '[B] 약지 패턴 BPM 60에서 끊김 없이 연주', en: 'Can play [B] ring finger pattern at BPM 60 without interruption', ja: '[B]薬指パターンをBPM60で途切れなく演奏できる' },
      { ko: '대각선 방향과 수직 방향 두 가지 모두 연주 가능', en: 'Can play both diagonal and vertical directions', ja: '対角線方向と垂直方向の両方で演奏できる' },
      { ko: '4가지 시작 포지션(솔/미/레/시) 모두에서 전환 가능', en: 'Can transition from all 4 starting positions (Sol/Mi/Re/Si)', ja: '4つのスタートポジション（솔/미/레/시）すべてで切り替えできる' },
      { ko: 'BPM 80으로 상승', en: 'Reach BPM 80', ja: 'BPM80に上達' },
    ],
    tools: ['metronome', 'sheet-music'],
  },

  // ─── STAGE 3: ii-V-I ────────────────────────────────────────────────────
  {
    id: 'iivi-theory',
    slug: 'iivi-theory',
    stage: 3,
    order: 12,
    title: {
      ko: 'ii-V-I 진행 이해',
      en: 'Understanding ii-V-I Progressions',
      ja: 'ii-V-I進行の理解',
    },
    description: {
      ko: '재즈 화성의 가장 중요한 진행 ii-V-I를 이론적으로 완전히 이해한다.',
      en: 'Fully understand the most important jazz harmonic progression: ii-V-I.',
      ja: 'ジャズハーモニーで最も重要な進行ii-V-Iを理論的に完全に理解する。',
    },
    theory: {
      content: {
        ko: `## ii-V-I 진행 — 재즈 화성의 핵심

재즈 스탠다드의 90% 이상에 등장하는 진행이 ii-V-I입니다. Autumn Leaves, All the Things You Are, There Will Never Be Another You 등 어떤 재즈 스탠다드를 분석해도 ii-V-I가 반복적으로 나타납니다. 이 진행을 이해하지 않고 재즈를 연주하는 것은 불가능합니다.

### 기능화성에서의 역할

각 코드는 조성 안에서 명확한 기능을 담당합니다:

| 코드 | 기능 | 음악적 느낌 |
|-----|-----|---------|
| **ii (Dm7)** | 서브도미넌트 | 출발, 긴장의 시작 |
| **V (G7)** | 도미넌트 | 강한 긴장, 해결 욕구 |
| **I (Cmaj7)** | 토닉 | 해결, 도착, 안정 |

### C 메이저 ii-V-I 상세 분석

**Dm7 (ii)**
- 구성음: D - F - A - C
- 기능: C 장조에서 서브도미넌트. "이제 어디론가 움직인다"는 신호

**G7 (V)**
- 구성음: G - B - D - F
- 기능: 가장 강한 긴장감. G7의 트라이톤(B와 F 사이)이 Cmaj7으로 해결을 강하게 원함
- 이 트라이톤 관계가 재즈 화성 긴장-해결의 핵심

**Cmaj7 (I)**
- 구성음: C - E - G - B
- 기능: 해결. "집에 도착했다"는 느낌

### 트라이톤 — G7이 강한 이유

G7에서 3도(B)와 7도(F) 사이의 음정은 **증4도(트라이톤)**입니다. 이 음정이 가장 불안정한 음정으로, Cmaj7으로 해결하면 B→E(반음 하행)와 F→E(반음 하행)로 자연스럽게 수렴합니다.


G7:    B (3도)  →  Cmaj7: E (3도)   [반음 하행]
G7:    F (7도)  →  Cmaj7: E (3도)   [반음 하행]


### 단조의 ii-V-i

마이너 키에서는 ii 코드가 반감7도(Half-Diminished)로 바뀝니다:

| 구분 | 코드 | 예시 (A 단조) |
|-----|-----|-----------|
| ii | m7♭5 (ø) | Bm7♭5 |
| V | 7 (with ♭9) | E7(♭9) |
| i | mMaj7 또는 m7 | Am7 |

### 트라이톤 대리 (Tritone Substitution)

G7의 트라이톤 대리 코드는 **D♭7**입니다.
- G와 D♭는 정확히 6반음 떨어진 관계
- D♭7 역시 Cmaj7로 강하게 해결됩니다(D♭→C 반음 하행)
- 현대 재즈에서 V7 → V7alt → TritSub 순으로 세련됩니다

### 재즈 스탠다드에서 ii-V-I 찾기

Autumn Leaves를 분석하면:

Cm7   - F7    - Bbmaj7   : ii-V-I in Bb 장조
Am7b5 - D7    - Gm7      : ii-V-i in G 단조

이처럼 조성이 바뀌어도 ii-V-I 구조는 동일합니다.`,
        en: `## ii-V-I Progression — The Core of Jazz Harmony

ii-V-I appears in over 90% of jazz standards. Whether you analyze Autumn Leaves, All the Things You Are, or There Will Never Be Another You, you'll find ii-V-I repeating throughout. Understanding this progression is essential for jazz.

### Functional Roles

| Chord | Function | Musical Feel |
|-------|----------|-------------|
| **ii (Dm7)** | Subdominant | Departure, tension beginning |
| **V (G7)** | Dominant | Strong tension, demands resolution |
| **I (Cmaj7)** | Tonic | Resolution, arrival, stability |

### C Major ii-V-I Detail

**Dm7 (ii)**: D - F - A - C — Subdominant; signals motion is coming
**G7 (V)**: G - B - D - F — Strongest tension; the tritone (B to F) powerfully demands resolution to Cmaj7
**Cmaj7 (I)**: C - E - G - B — Resolution; "arrived home"

### The Tritone — Why G7 is So Powerful

Between G7's 3rd (B) and 7th (F) lies an **augmented 4th (tritone)** — the most unstable interval. When resolved to Cmaj7, both B→E and F→E move by half step, converging naturally.

### Minor ii-V-i

In minor keys, the ii chord becomes half-diminished (ø):

| Role | Chord | Example (A minor) |
|------|-------|------------------|
| ii | m7♭5 (ø) | Bm7♭5 |
| V | 7 (with ♭9) | E7(♭9) |
| i | mMaj7 or m7 | Am7 |

### Tritone Substitution

G7's tritone sub is **D♭7** — 6 half steps away. Db7 also resolves strongly to Cmaj7 (Db→C half step).`,
        ja: `## ii-V-I進行 — ジャズハーモニーの核心

ii-V-IはジャズスタンダードのHD90%以上に登場します。この進行を理解せずにジャズを演奏することは不可能です。

### 機能的役割

| コード | 機能 | 音楽的感覚 |
|------|-----|---------|
| **ii（Dm7）** | サブドミナント | 出発、緊張の始まり |
| **V（G7）** | ドミナント | 強い緊張、解決への欲求 |
| **I（Cmaj7）** | トニック | 解決、到着、安定 |

### トライトーン — G7が強力な理由

G7の3度（B）と7度（F）の間は**増4度（トライトーン）**です。Cmaj7へ解決するとB→EとF→Eがともに半音で収束します。

### マイナーのii-V-i

| 役割 | コード | 例（Aマイナー） |
|-----|------|-------------|
| ii | m7♭5（ø） | Bm7♭5 |
| V | 7（with ♭9） | E7（♭9） |
| i | mMaj7またはm7 | Am7 |`,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: 'C 메이저 ii-V-I 가이드 톤 연결', en: 'C Major ii-V-I Guide Tone Connection', ja: 'CメジャーiiV-Iガイドトーン連結' },
          description: {
            ko: 'Dm7 → G7 → Cmaj7를 가이드 톤(3도+7도)만으로 연주하십시오. 각 코드 2마디, BPM 70. G7에서 트라이톤(B와 F)을 의식하면서 연주합니다.',
            en: 'Play Dm7 → G7 → Cmaj7 with guide tones (3rd+7th) only. 2 bars each chord, BPM 70. Be conscious of the tritone (B and F) in G7.',
            ja: 'Dm7 → G7 → Cmaj7をガイドトーン（3度+7度）だけで演奏してください。各コード2小節、BPM70。G7のトライトーン（BとF）を意識しながら演奏します。',
          },
          bpm: 70,
        },
        {
          title: { ko: '4개 조에서 ii-V-I 이름 즉시 말하기', en: 'Instant ii-V-I Naming in 4 Keys', ja: '4つのキーでii-V-I名即答' },
          description: {
            ko: '메트로놈을 BPM 100에 맞추고 박자에 맞춰 C, F, B♭, G 키의 ii-V-I 코드 이름을 구두로 말하십시오. 각 키에서 4박 안에 세 코드 이름을 순서대로 말하면 성공입니다.',
            en: 'Set metronome to BPM 100 and verbally state ii-V-I chord names in C, F, Bb, G keys in time. Success means naming all 3 chords in each key within 4 beats.',
            ja: 'メトロノームをBPM100に合わせ、C、F、Bb、GキーのiiV-Iコード名をリズムに合わせて口頭で言ってください。各キーで4拍以内に3つのコード名を順番に言えれば成功です。',
          },
          bpm: 100,
        },
      ],
    },
    checkpoints: [
      { ko: 'C, F, B♭, G 키에서 ii-V-I 코드 이름을 즉시 말할 수 있다', en: 'Can immediately state ii-V-I chord names in C, F, Bb, G keys', ja: 'C、F、Bb、GキーでiiV-Iコード名を即座に言える' },
      { ko: 'G7의 트라이톤(B와 F)이 Cmaj7로 해결되는 원리를 설명 가능', en: 'Can explain how G7 tritone (B and F) resolves to Cmaj7', ja: 'G7のトライトーン（BとF）がCmaj7へ解決する原理を説明できる' },
      { ko: 'ii-V-I 진행을 3가지 다른 키에서 Drop 2 보이싱으로 연주 가능', en: 'Can play ii-V-I with Drop 2 voicings in 3 different keys', ja: 'ii-V-IをDrop 2ボイシングで3つの異なるキーで演奏できる' },
      { ko: '마이너 ii-V-i의 코드 구성을 설명할 수 있다', en: 'Can explain the chord structure of minor ii-V-i', ja: 'マイナーii-V-iのコード構成を説明できる' },
    ],
    tools: ['metronome', 'chord-diagram'],
  },

  {
    id: 'chord-tones',
    slug: 'chord-tones',
    stage: 3,
    order: 13,
    title: {
      ko: '코드톤 아르페지오',
      en: 'Chord Tone Arpeggios',
      ja: 'コードトーンアルペジオ',
    },
    description: {
      ko: '각 코드의 구성음을 아르페지오로 연주하며 코드톤 기반 즉흥연주의 기초를 닦는다.',
      en: 'Build the foundation of chord-tone based improvisation by playing arpeggios.',
      ja: '各コードの構成音をアルペジオで演奏し、コードトーンベース即興演奏の基礎を築く。',
    },
    theory: {
      content: {
        ko: `## 코드톤 아르페지오 — 솔로의 뼈대

재즈 즉흥연주에서 가장 기초적이고 확실한 방법은 **코드의 구성음(코드톤)으로 솔로를 구성**하는 것입니다. 어떤 코드 위에서든 코드톤을 사용하면 "틀린 음"이 없습니다. 릭, 인클로저, 스케일은 모두 코드톤을 뼈대로 살을 붙이는 작업입니다.

### 왜 코드톤이 솔로의 뼈대인가?

즉흥연주의 계층 구조:
1. **코드톤** (루트, 3도, 5도, 7도) → 기초, 항상 안전
2. **스케일 음** (2도, 4도, 6도) → 연결음, 경과음
3. **텐션** (9도, 11도, 13도) → 색채, 긴장감
4. **크로매틱** (반음계) → 인클로저, 접근음

코드톤에서 시작해 스케일로 연결하고, 거기에 인클로저를 더하면 재즈 솔로가 완성됩니다.

### ii-V-I 아르페지오 구성

**Dm7 아르페지오**: D - F - A - C (1 - ♭3 - 5 - ♭7)
**G7 아르페지오**: G - B - D - F (1 - 3 - 5 - ♭7)
**Cmaj7 아르페지오**: C - E - G - B (1 - 3 - 5 - 7)

### 코드톤 연결의 핵심

코드가 바뀌는 박자에 **코드톤으로 도착**하는 것이 핵심입니다.


|  Dm7 아르페지오  |  G7 아르페지오  |  Cmaj7  |
D - F - A - C   B - D - F - G   E(도착) ...


G7 아르페지오의 마지막 음(G)에서 Cmaj7의 E로 이동 → 부드러운 연결

### 솔로 라인 구성 원칙

1. **코드 변환 박자에 코드톤 배치** — 1박 또는 강박에 코드톤
2. **약박은 경과음** — 스케일 음이나 반음계로 채우기
3. **방향성** — 상행/하행 방향을 유지하면 선율이 자연스러워짐

### 아르페지오 → 릭의 발전

아르페지오를 기계적으로 오르내리는 것이 아니라, 방향을 바꾸거나 일부 음을 생략하거나 인클로저를 추가하면 릭이 됩니다.


기계적: D F A C B D F G E G B ...
라인화: D F A C  →  (B)G D F  →  E G B
                      ↑ 방향 전환  ↑ 목표음 도착`,
        en: `## Chord Tone Arpeggios — The Skeleton of the Solo

The most basic and reliable method in jazz improvisation is **constructing solos from chord tones**. Using chord tones over any chord means no "wrong notes." Licks, enclosures, and scales are all ways of adding flesh to the chord tone skeleton.

### Why Chord Tones Are the Skeleton

Improvisation hierarchy:
1. **Chord tones** (root, 3rd, 5th, 7th) → Foundation, always safe
2. **Scale tones** (2nd, 4th, 6th) → Connecting, passing tones
3. **Tensions** (9th, 11th, 13th) → Color, tension
4. **Chromatic** → Enclosures, approach notes

Start with chord tones, connect with scales, add enclosures — jazz solo complete.

### ii-V-I Arpeggio Structures

**Dm7**: D - F - A - C (1 - ♭3 - 5 - ♭7)
**G7**: G - B - D - F (1 - 3 - 5 - ♭7)
**Cmaj7**: C - E - G - B (1 - 3 - 5 - 7)

### Key to Connecting Chord Tones

The key is **arriving on a chord tone** at the moment the chord changes.

### Arpeggio → Lick Development

Rather than mechanically running arpeggios up and down, changing direction, omitting notes, or adding enclosures turns them into licks.`,
        ja: `## コードトーンアルペジオ — ソロの骨格

ジャズ即興演奏で最も基礎的で確実な方法は**コードの構成音（コードトーン）でソロを構成する**ことです。どのコードの上でもコードトーンを使えば「間違った音」はありません。

### なぜコードトーンがソロの骨格なのか

即興演奏の階層構造:
1. **コードトーン**（ルート、3度、5度、7度）→ 基礎、常に安全
2. **スケール音**（2度、4度、6度）→ 連結音、経過音
3. **テンション**（9度、11度、13度）→ 色彩、緊張感

### ii-V-Iアルペジオ構成

**Dm7**: D - F - A - C
**G7**: G - B - D - F
**Cmaj7**: C - E - G - B`,
      },
      abcNotation: `X:1
T:ii-V-I Chord Tone Arpeggios in C
M:4/4
L:1/8
Q:1/4=70
K:C
"Dm7"D F A c | "G7"B, D F G | "Cmaj7"E G B c | c4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'ii-V-I 코드톤 아르페지오 연결', en: 'ii-V-I Chord Tone Arpeggio Connection', ja: 'ii-V-Iコードトーンアルペジオ連結' },
          description: {
            ko: 'Dm7 → G7 → Cmaj7 아르페지오를 끊김 없이 연결하십시오. 각 코드 1마디(4박), BPM 60. 코드가 바뀌는 순간 새 코드의 코드톤으로 도착하도록 의식하면서 연주합니다.',
            en: 'Connect Dm7 → G7 → Cmaj7 arpeggios without breaks. 1 bar per chord (4 beats), BPM 60. Be conscious of arriving on the new chord\'s tone when the chord changes.',
            ja: 'Dm7 → G7 → Cmaj7アルペジオを途切れなく連結してください。各コード1小節（4拍）、BPM60。コードが変わる瞬間に新しいコードのコードトーンに到着するよう意識して演奏します。',
          },
          bpm: 60,
          abcNotation: `X:1
T:ii-V-I Arpeggios - Practice
M:4/4
L:1/8
Q:1/4=60
K:C
"Dm7"D F A c | "G7"B, D F G | "Cmaj7"E G B c | c4 |]`,
        },
        {
          title: { ko: '아르페지오 방향 전환 연습', en: 'Arpeggio Direction Change Practice', ja: 'アルペジオ方向転換練習' },
          description: {
            ko: 'Dm7 아르페지오를 상행으로 4음 연주 후 방향을 바꿔 하행하십시오. 같은 방법으로 G7, Cmaj7도 연습합니다. 방향 전환이 자연스러울 때 솔로 라인이 완성됩니다. BPM 60.',
            en: 'Play Dm7 arpeggio 4 notes ascending, then change direction and descend. Practice the same with G7 and Cmaj7. Natural direction changes complete solo lines. BPM 60.',
            ja: 'Dm7アルペジオを上行で4音演奏してから方向を変えて下行してください。G7、Cmaj7でも同様に練習します。方向転換が自然になった時にソロラインが完成します。BPM60。',
          },
          bpm: 60,
        },
        {
          title: { ko: 'F 블루스 위에서 코드톤으로만 솔로', en: 'Solo Over F Blues with Chord Tones Only', ja: 'Fブルースの上でコードトーンだけでソロ' },
          description: {
            ko: 'F 블루스 12마디 위에서 각 코드의 코드톤만으로 솔로를 연주하십시오. 스케일이나 릭 없이 순수하게 코드톤만 사용합니다. BPM 80, 2코러스 연속.',
            en: 'Play a solo over F blues 12 bars using only chord tones for each chord. No scales or licks — pure chord tones only. BPM 80, 2 choruses.',
            ja: 'Fブルース12小節の上で各コードのコードトーンだけでソロを演奏してください。スケールやリックなし — 純粋にコードトーンだけ。BPM80、2コーラス連続。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'Dm7, G7, Cmaj7 아르페지오 각각 상행/하행 연주 가능 (BPM 70)', en: 'Can play Dm7, G7, Cmaj7 arpeggios up and down (BPM 70)', ja: 'Dm7、G7、Cmaj7アルペジオをそれぞれ上下演奏できる（BPM70）' },
      { ko: 'ii-V-I 아르페지오를 연속으로 연결 가능 (BPM 70)', en: 'Can connect ii-V-I arpeggios continuously (BPM 70)', ja: 'ii-V-Iアルペジオを連続で連結できる（BPM70）' },
      { ko: 'F 블루스 위에서 코드톤만으로 2코러스 솔로 가능', en: 'Can solo 2 choruses over F blues with chord tones only', ja: 'Fブルースの上でコードトーンだけで2コーラスソロできる' },
      { ko: '실제 스탠다드 위에서 코드톤 아르페지오 적용 시도', en: 'Can attempt chord tone arpeggios over a real standard', ja: '実際のスタンダードの上でコードトーンアルペジオを試みられる' },
    ],
    tools: ['metronome', 'sheet-music'],
  },

  {
    id: 'enclosure',
    slug: 'enclosure',
    stage: 3,
    order: 14,
    title: {
      ko: '인클로저 테크닉',
      en: 'Enclosure Technique',
      ja: 'エンクロージャーテクニック',
    },
    description: {
      ko: '목표음을 위아래에서 감싸는 인클로저로 재즈 어휘를 풍부하게 만든다.',
      en: 'Enrich jazz vocabulary with enclosures that surround target notes from above and below.',
      ja: '目標音を上下から囲むエンクロージャーでジャズ語彙を豊かにする。',
    },
    theory: {
      content: {
        ko: `## 인클로저 — 목표음을 감싸는 재즈 접근법

인클로저(Enclosure)는 목표음(target note)을 **위아래 반음으로 감싸서** 접근하는 기법입니다. 코드톤으로 직선적으로 도착하는 것보다 인클로저를 통해 도착하면 재즈 특유의 "서프라이즈" 효과와 강렬한 도착감이 생깁니다.

### 인클로저의 원리

목표음 C에 인클로저를 적용:
- 위 반음: D♭ (C보다 반음 위)
- 아래 반음: B (C보다 반음 아래)
- 인클로저 패턴: **D♭ → B → C** (위-아래-목표)

목표음에 "예고 없이" 도착하는 느낌이 만들어집니다.

### 4가지 인클로저 변형

**타입 1 (위-아래)**: D♭ - B - **C** — 가장 전형적
**타입 2 (아래-위)**: B - D♭ - **C** — 반대 방향
**타입 3 (온음+반음 위)**: D - D♭ - **C** — 위에서 크로매틱
**타입 4 (스케일+반음 아래)**: D - B - **C** — 혼합형

### 코드톤에 인클로저 적용

**G7의 3도(B)에 인클로저 적용:**

목표음: B (G7의 3도)
인클로저: C - B♭ - B (위-아래-목표)


**G7의 7도(F)에 인클로저 적용:**

목표음: F (G7의 7도)
인클로저: G♭ - E - F (위-아래-목표)


**Cmaj7의 3도(E)에 인클로저 적용:**

목표음: E (Cmaj7의 3도, 해결음)
인클로저: F - E♭ - E (위-아래-목표)


### G7 → Cmaj7에서 인클로저 실전


G7 구간:     C - B♭ - B    (B = G7의 3도)
해결 → Cmaj7: F - E♭ - E   (E = Cmaj7의 3도)


G7에서 B(3도)를 인클로저로 강조하고, Cmaj7으로 해결되면서 E(3도)도 인클로저로 강조하면 재즈 특유의 긴장-해결 라인이 완성됩니다.

### 인클로저 사용의 시점

인클로저는 항상 강박 직전에 사용합니다:
- 강박에 목표 코드톤이 도착
- 직전 약박들에서 인클로저 음들을 배치
- 이 타이밍이 재즈 특유의 스윙 느낌을 만듦

### 인클로저 vs 단순 크로매틱 접근

크로매틱 접근(한 방향에서만): D♭ - C
인클로저(위아래 양방향): D♭ - B - C

인클로저가 더 풍부하고 재즈스러운 색채를 만듭니다.`,
        en: `## Enclosure — The Jazz Approach to Target Notes

An enclosure surrounds a target note with chromatic notes from **both above and below**. Arriving at chord tones via enclosure rather than directly creates jazz's characteristic "surprise" effect and a stronger sense of arrival.

### The Principle of Enclosure

Applying enclosure to target note C:
- Above: D♭ (half step above C)
- Below: B (half step below C)
- Enclosure pattern: **D♭ → B → C** (above-below-target)

### 4 Enclosure Variations

**Type 1 (above-below)**: D♭ - B - **C** — most typical
**Type 2 (below-above)**: B - D♭ - **C** — reverse direction
**Type 3 (whole+half from above)**: D - D♭ - **C** — chromatic from above
**Type 4 (scale+half from below)**: D - B - **C** — mixed

### Applying Enclosure to Chord Tones

**Enclosure to G7's 3rd (B):**

Target: B (3rd of G7)
Enclosure: C - B♭ - B


**Enclosure to Cmaj7's 3rd (E) at resolution:**

Target: E (3rd of Cmaj7)
Enclosure: F - E♭ - E


### Enclosure in G7 → Cmaj7

In G7: C - B♭ - **B** (emphasizing B, G7's 3rd)
Resolving to Cmaj7: F - E♭ - **E** (emphasizing E, Cmaj7's 3rd)

### Timing of Enclosure

Enclosure always arrives on strong beats:
- Target chord tone arrives on the beat
- Enclosure notes placed on weak beats just before
- This timing creates jazz's characteristic swing feel`,
        ja: `## エンクロージャー — 目標音へのジャズアプローチ

エンクロージャーは目標音（ターゲットノート）を**上下からの半音で囲む**技法です。コードトーンに直線的に到達するのではなく、エンクロージャーで到着するとジャズ特有の「サプライズ」効果と強い到着感が生まれます。

### 4つのエンクロージャー変形

**タイプ1（上-下）**: D♭ - B - **C** — 最も典型的
**タイプ2（下-上）**: B - D♭ - **C** — 逆方向
**タイプ3（全音+半音上）**: D - D♭ - **C** — 上からクロマチック
**タイプ4（スケール+半音下）**: D - B - **C** — 混合型

### コードトーンへのエンクロージャー適用

**G7の3度（B）へのエンクロージャー:**
目標音: B → エンクロージャー: C - B♭ - B

**Cmaj7の3度（E）へのエンクロージャー:**
目標音: E → エンクロージャー: F - E♭ - E`,
      },
      abcNotation: `X:1
T:Enclosure on G7 3rd (B) - Resolving to Cmaj7
M:4/4
L:1/8
Q:1/4=70
K:C
"G7"c _B B2 "→Cmaj7"F _E E2 | E8 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: '인클로저 타입 1 (위-아래-목표) 기초', en: 'Enclosure Type 1 (Above-Below-Target) Basics', ja: 'エンクロージャータイプ1（上-下-目標）基礎' },
          description: {
            ko: 'C 메이저 스케일의 각 코드톤(C, E, G, B)에 인클로저 타입 1을 적용하십시오. 목표음이 C라면 D♭-B-C, E라면 F-E♭-E 패턴입니다. 각 패턴을 5회 반복, BPM 60.',
            en: 'Apply enclosure Type 1 to each chord tone of C major (C, E, G, B). For target C: Db-B-C, for E: F-Eb-E. 5 repetitions per pattern, BPM 60.',
            ja: 'Cメジャースケールの各コードトーン（C、E、G、B）にエンクロージャータイプ1を適用してください。目標音CならDb-B-C、EならF-Eb-E。各パターン5回繰り返し、BPM60。',
          },
          bpm: 60,
          abcNotation: `X:1
T:Enclosure Basics - C major chord tones
M:4/4
L:1/8
Q:1/4=60
K:C
_D B, C4 z2 | F _E E4 z2 | _A F G4 z2 | ^c B B4 z2 |]`,
        },
        {
          title: { ko: 'G7 코드톤에 인클로저 적용', en: 'Enclosure on G7 Chord Tones', ja: 'G7コードトーンへのエンクロージャー適用' },
          description: {
            ko: 'G7의 3도(B)와 7도(F)에 각각 인클로저를 적용하십시오. B에는 C-B♭-B, F에는 G♭-E-F 패턴을 사용합니다. 이어서 Cmaj7의 E로 해결합니다. BPM 70.',
            en: 'Apply enclosures to G7\'s 3rd (B) and 7th (F). Use C-Bb-B for B, and Gb-E-F for F. Then resolve to Cmaj7\'s E. BPM 70.',
            ja: 'G7の3度（B）と7度（F）それぞれにエンクロージャーを適用してください。BにはC-Bb-B、FにはGb-E-Fパターンを使います。その後Cmaj7のEへ解決します。BPM70。',
          },
          bpm: 70,
        },
        {
          title: { ko: 'ii-V-I 인클로저 라인 구성', en: 'ii-V-I Enclosure Line Construction', ja: 'ii-V-Iエンクロージャーライン構成' },
          description: {
            ko: 'Dm7 → G7 → Cmaj7 진행 위에서 인클로저를 포함한 4마디 라인을 구성하십시오. 각 코드 변환 박자에 코드톤이 도착하도록, 도착 직전에 인클로저를 배치합니다. BPM 70.',
            en: 'Construct a 4-bar line over Dm7 → G7 → Cmaj7 that includes enclosures. Place enclosures just before chord tone arrivals, with chord tones landing on the beat. BPM 70.',
            ja: 'Dm7 → G7 → Cmaj7の上でエンクロージャーを含む4小節ラインを構成してください。コードトーンが拍に到着するよう、直前にエンクロージャーを配置します。BPM70。',
          },
          bpm: 70,
        },
      ],
    },
    checkpoints: [
      { ko: '인클로저 타입 1 패턴(위-아래-목표)을 C 메이저 코드톤에 적용 가능', en: 'Can apply enclosure Type 1 (above-below-target) to C major chord tones', ja: 'エンクロージャータイプ1（上-下-目標）をCメジャーコードトーンに適用できる' },
      { ko: 'G7의 3도(B)에 인클로저 자연스럽게 사용', en: 'Can naturally use enclosure on G7\'s 3rd (B)', ja: 'G7の3度（B）にエンクロージャーを自然に使える' },
      { ko: 'G7 → Cmaj7 해결에서 인클로저가 포함된 라인 연주 가능', en: 'Can play a line with enclosure at G7 → Cmaj7 resolution', ja: 'G7 → Cmaj7解決でエンクロージャーを含むラインを演奏できる' },
      { ko: 'ii-V-I 위에서 자연스러운 인클로저 라인 구성 가능 (BPM 70)', en: 'Can construct natural enclosure lines over ii-V-I (BPM 70)', ja: 'ii-V-Iの上で自然なエンクロージャーラインを構成できる（BPM70）' },
      { ko: '실제 블루스나 스탠다드 위에서 인클로저 즉흥 적용', en: 'Can apply enclosure improvisation over blues or standard', ja: '実際のブルースやスタンダードの上でエンクロージャーを即興的に適用できる' },
    ],
    tools: ['metronome', 'sheet-music'],
  },

  {
    id: 'iivi-licks',
    slug: 'iivi-licks',
    stage: 3,
    order: 15,
    title: {
      ko: 'ii-V-I 릭 패턴',
      en: 'ii-V-I Lick Patterns',
      ja: 'ii-V-Iリックパターン',
    },
    description: {
      ko: 'ii-V-I 진행 위에서 사용하는 핵심 릭들을 익히고 조합한다.',
      en: 'Learn and combine essential licks used over ii-V-I progressions.',
      ja: 'ii-V-I進行の上で使う核心リックを学び組み合わせる。',
    },
    theory: {
      content: {
        ko: `## ii-V-I 릭 — 재즈 어휘의 실전 조각

ii-V-I 릭은 Dm7 → G7 → Cmaj7 진행 전체를 하나의 유창한 프레이즈로 연결하는 패턴입니다. 코드톤, 스케일, 인클로저를 모두 종합한 형태로, 재즈 어휘의 가장 실전적인 단위입니다.

### 효과적인 ii-V-I 릭의 3가지 특징

1. **Cmaj7 코드톤으로 도착**: 릭의 마지막 음이 Cmaj7의 코드톤(C, E, G, B)이면 강한 해결감
2. **G7에서 텐션 사용**: ♭9(A♭), ♯9(B♭), ♭13(E♭) 중 하나를 포함하면 재즈스러운 긴장감
3. **인클로저 포함**: 목표음 직전에 위아래 반음 접근

### 릭 암기 4단계 (모든 릭에 적용)

1. **느린 암기** (BPM 50): 악보 보면서 10회 반복
2. **속도 올리기** (BPM 70, 80): 악보 없이 5회
3. **내면화** (BPM 60, 눈 감고): 5회 — 손에 완전히 익을 때까지
4. **전조**: 다른 키(G, F, B♭)에서 연주

### 릭을 변주하는 법

암기한 릭을 그대로 사용하는 것은 시작점일 뿐입니다. 변주 방법:
- **리듬 변형**: 같은 음을 다른 리듬 패턴으로
- **방향 역전**: 상행 라인을 하행으로
- **앞뒤 교체**: 앞 2음과 뒤 2음 위치 바꾸기
- **인클로저 추가**: 목표음 앞에 인클로저 삽입

### ii-V-I 릭 패턴 예시

**패턴 1 — 코드톤 기반 라인:**
Dm7: D F A C | G7: B D F (인클로저) G | Cmaj7: E 도착

**패턴 2 — G7 텐션 포함 라인:**
Dm7: A C F A | G7: ♭9(A♭) G F E | Cmaj7: E 도착

**패턴 3 — 인클로저 + 해결:**
Dm7: D E F A | G7: C B♭ B | Cmaj7: (F E♭) E 도착`,
        en: `## ii-V-I Licks — Real Jazz Vocabulary

ii-V-I licks connect the entire Dm7 → G7 → Cmaj7 progression as one fluent phrase. They synthesize chord tones, scales, and enclosures — the most practical unit of jazz vocabulary.

### 3 Characteristics of Effective ii-V-I Licks

1. **Land on Cmaj7 chord tone**: Strong resolution when the lick ends on C, E, G, or B
2. **Use tension on G7**: Including ♭9 (Ab), ♯9 (Bb), or ♭13 (Eb) creates jazz tension
3. **Include enclosure**: Approach from both above and below just before target note

### 4-Step Lick Memorization (for all licks)

1. **Slow memorization** (BPM 50): 10 reps with sheet music
2. **Speed up** (BPM 70, 80): 5 reps without sheet music
3. **Internalization** (BPM 60, eyes closed): 5 reps until it's in the hands
4. **Transposition**: Play in G, F, Bb keys

### Lick Variation Techniques

- **Rhythm variation**: Same notes, different rhythm pattern
- **Direction reversal**: Ascending line becomes descending
- **Enclosure addition**: Insert enclosure before target note`,
        ja: `## ii-V-Iリック — ジャズ語彙の実践片

ii-V-IリックはDm7 → G7 → Cmaj7の進行全体を一つの流暢なフレーズで繋ぐパターンです。コードトーン、スケール、エンクロージャーを総合した形で、ジャズ語彙の最も実践的な単位です。

### 効果的なii-V-Iリックの3つの特徴

1. **Cmaj7コードトーンに到着**: リックの最後の音がC、E、G、Bなら強い解決感
2. **G7でテンション使用**: ♭9（Ab）、♯9（Bb）、♭13（Eb）のどれかを含むとジャズらしい緊張感
3. **エンクロージャー含む**: 目標音の直前に上下半音アプローチ

### リック暗記4ステップ

1. **スロー暗記**（BPM50）: 楽譜を見ながら10回
2. **テンポアップ**（BPM70、80）: 楽譜なしで5回
3. **内面化**（BPM60、目を閉じて）: 5回
4. **転調**: 他のキーで演奏`,
      },
      abcNotation: `X:1
T:ii-V-I Lick in C - Pattern 1
M:4/4
L:1/8
Q:1/4=70
K:C
"Dm7"D F A c | "G7"B _A G F | "Cmaj7"F _E E4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'ii-V-I 릭 패턴 1 암기', en: 'ii-V-I Lick Pattern 1 Memorization', ja: 'ii-V-Iリックパターン1暗記' },
          description: {
            ko: 'C 키 ii-V-I 릭 패턴 1을 BPM 50에서 10회 반복해 암기하십시오. 이후 BPM 70, 80으로 속도를 높입니다. 눈을 감고 5회 연주할 수 있으면 암기 완성입니다.',
            en: 'Memorize C key ii-V-I lick Pattern 1 with 10 reps at BPM 50. Then increase to BPM 70 and 80. Memorization complete when you can play 5 times with eyes closed.',
            ja: 'CキーのiiV-IリックパターンをBPM50で10回繰り返して暗記してください。その後BPM70、80へテンポを上げます。目を閉じて5回演奏できれば暗記完成です。',
          },
          bpm: 50,
          abcNotation: `X:1
T:ii-V-I Lick Pattern 1 - Practice
M:4/4
L:1/8
Q:1/4=50
K:C
"Dm7"D F A c | "G7"B _A G F | "Cmaj7"F _E E4 |]`,
        },
        {
          title: { ko: 'G 키로 전조', en: 'Transpose to G Key', ja: 'Gキーへ転調' },
          description: {
            ko: '암기한 ii-V-I 릭을 G 장조로 전조하십시오. G 장조의 ii-V-I는 Am7 → D7 → Gmaj7입니다. C 키 릭에서 모든 음을 완전5도 위로 올리면 됩니다. BPM 60.',
            en: 'Transpose the memorized ii-V-I lick to G major. G major ii-V-I: Am7 → D7 → Gmaj7. Raise all notes from the C key lick by a perfect 5th. BPM 60.',
            ja: '暗記したii-V-IリックをGメジャーに転調してください。GメジャーのiiV-I: Am7 → D7 → Gmaj7。CキーのリックのすべてのNoteを完全5度上げればOKです。BPM60。',
          },
          bpm: 60,
        },
        {
          title: { ko: '블루스 위에서 릭 삽입 연습', en: 'Lick Insertion Over Blues', ja: 'ブルースの上でリック挿入練習' },
          description: {
            ko: 'F 블루스 12마디를 펜타토닉으로 즉흥 연주하다가 ii-V-I 구간(9-10마디: Gm7-C7)에서 학습한 릭을 삽입하십시오. 나머지 마디는 자유롭게 블루스 스케일로 채웁니다. BPM 80.',
            en: 'Improvise F blues 12 bars with pentatonic, then insert the learned lick at the ii-V-I section (bars 9-10: Gm7-C7). Fill remaining bars freely with blues scale. BPM 80.',
            ja: 'Fブルース12小節をペンタトニックで即興しながら、ii-V-Iセクション（9-10小節: Gm7-C7）で学んだリックを挿入してください。残りの小節はブルーススケールで自由に埋めます。BPM80。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'ii-V-I 릭 패턴 1을 C 키에서 악보 없이 연주 가능 (BPM 80)', en: 'Can play ii-V-I lick Pattern 1 in C key without sheet music (BPM 80)', ja: 'ii-V-IリックパターンをCキーで楽譜なしで演奏できる（BPM80）' },
      { ko: 'G 키로 전조해서 연주 가능', en: 'Can transpose and play in G key', ja: 'Gキーに転調して演奏できる' },
      { ko: 'F 블루스 ii-V-I 구간에서 릭 자연스럽게 삽입', en: 'Can naturally insert lick at ii-V-I section of F blues', ja: 'FブルースのiiV-Iセクションでリックを自然に挿入できる' },
      { ko: '릭의 리듬이나 앞뒤 음을 변형해서 연주 가능', en: 'Can vary the lick by modifying rhythm or notes', ja: 'リズムや音を変形してリックを変奏できる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'tension-resolution',
    slug: 'tension-resolution',
    stage: 3,
    order: 16,
    title: {
      ko: 'II-V-I 텐션 해결',
      en: 'ii-V-I Tension Resolution',
      ja: 'ii-V-Iテンション解決',
    },
    description: {
      ko: 'V7 코드의 텐션(♭9, ♯9, ♭13, ♯11)이 I코드로 해결되는 방법 — Easy/Advanced 보이스리딩.',
      en: 'How V7 chord tensions (♭9, ♯9, ♭13, ♯11) resolve to the I chord — Easy/Advanced voice leading.',
      ja: 'V7コードのテンション（♭9、♯9、♭13、♯11）がIコードへ解決する方法 — Easy/Advancedボイスリーディング。',
    },
    theory: {
      content: {
        ko: `## V7 텐션 해결 — Easy & Advanced 보이스리딩

레슨에서 가장 심화된 내용 중 하나입니다. II-V-I 진행에서 V7 코드는 단순한 G7이 아니라 텐션음을 포함한 G7♭9, G7♯9, G7♯11, G7♭13으로 확장할 수 있습니다. 이 텐션들이 I 코드로 어떻게 해결되는지를 이해하면 보이싱과 솔로 모두 크게 발전합니다.

### V7 코드의 텐션 4가지

G7(V7) 위에서 사용 가능한 텐션 (C 장조 ii-V-I 기준):
- **♭9** (A♭): 루트에서 반음 올린 9도 — 매우 긴장됨
- **♯9** (B♭): 루트에서 단2도+반음 올린 9도 — 매우 긴장됨
- **♯11** (C♯): 증4도 — 마법 같은 색채
- **♭13** (E♭): 단6도 — 어둡고 강렬한 긴장

이 텐션들이 V7 코드에서 모두 함께 들어가면 "Altered Chord"가 됩니다(다음 챕터 참고).

### Easy 보이스리딩 — 순방향 해결

"예측 가능한 해결 방향"으로, 자연스럽고 귀에 익숙합니다.

| G7 텐션 | 해결 방향 | Cmaj7 도착음 | 이유 |
|--------|---------|------------|-----|
| **♭9** (A♭) | ↓ 반음 | **G** (5도) | A♭→G 반음 하행 |
| **♭13** (E♭) | ↓ 반음 | **D** (9도) | E♭→D 반음 하행 |
| **♯11** (C♯) | ↑ 반음 | **D** (9도) | C♯→D 반음 상행 |
| **♯9** (B♭) | ↓↓ (♭9 경유) | **G** (5도) | B♭→A♭→G 연속 하행 |

### Advanced 보이스리딩 — 역방향 해결

"예측을 뒤엎는 해결 방향"으로, 더 세련되고 현대적인 재즈 사운드입니다.

| G7 텐션 | 해결 방향 | Cmaj7 도착음 | 이유 |
|--------|---------|------------|-----|
| **♭9** (A♭) | ↑ (반음 반대) | **A** (6도) | A♭→A 반음 상행 |
| **♭13** (E♭) | ↑ | **E** (3도) | E♭→E 반음 상행 |
| **♯11** (C♯) | ↑ | **C** (루트) | C♯→C#→... 전체 해결 |
| **♯9** (B♭) | ↑ | **B** (7도) | B♭→B 반음 상행 |

### "촌스러운 순서" 경고

텐션 해결에는 아마추어처럼 들리는 "촌스러운 순서"가 있습니다:
- ♭9 → 5도 → ♭3도 → ♭2도 → 나머지 순으로 사용하면 뻔하게 들림
- 특히 모든 텐션을 Easy 방향으로만 해결하면 단조로움

Advanced 보이스리딩을 익혀 역방향 해결을 섞어야 세련됩니다.

### 실전 팁 — Easy와 Advanced 혼합


Easy:    G7(♭9) → Cmaj7  |  A♭ ↓ G (5도)
Advanced: G7(♭9) → Cmaj7  |  A♭ ↑ A (6도)

Easy:    G7(♭13) → Cmaj7 |  E♭ ↓ D (9도)
Advanced: G7(♭13) → Cmaj7 |  E♭ ↑ E (3도)


곡에서 Easy와 Advanced를 교대로 사용하면 가장 이상적인 다양성이 생깁니다.`,
        en: `## V7 Tension Resolution — Easy & Advanced Voice Leading

One of the most advanced topics from lessons. V7 can expand from simple G7 to G7♭9, G7♯9, G7♯11, G7♭13. Understanding how these tensions resolve to I chord greatly develops both voicing and soloing.

### 4 Tensions of V7

Available tensions on G7 (in C major ii-V-I context):
- **♭9** (A♭): Half step above root 9th — very tense
- **♯9** (B♭): Raised 9th — very tense
- **♯11** (C♯): Augmented 4th — magical color
- **♭13** (E♭): Minor 6th — dark intense tension

### Easy Voice Leading — Forward Resolution

"Predictable resolution direction" — natural and familiar to the ear.

| G7 Tension | Direction | Cmaj7 Landing | Reason |
|-----------|-----------|---------------|--------|
| **♭9** (A♭) | ↓ half step | **G** (5th) | A♭→G half step down |
| **♭13** (E♭) | ↓ half step | **D** (9th) | E♭→D half step down |
| **♯11** (C♯) | ↑ half step | **D** (9th) | C♯→D half step up |
| **♯9** (B♭) | ↓↓ (via ♭9) | **G** (5th) | B♭→A♭→G consecutive descent |

### Advanced Voice Leading — Contrary Resolution

"Resolution that defies expectations" — more sophisticated, modern jazz sound.

| G7 Tension | Direction | Cmaj7 Landing | Reason |
|-----------|-----------|---------------|--------|
| **♭9** (A♭) | ↑ (opposite) | **A** (6th) | A♭→A half step up |
| **♭13** (E♭) | ↑ | **E** (3rd) | E♭→E half step up |
| **♯11** (C♯) | ↑ | **C** (root) | Full resolution |
| **♯9** (B♭) | ↑ | **B** (7th) | B♭→B half step up |

### "Amateur Order" Warning

There's an order that sounds amateurish — using all tensions in Easy direction only is predictable. Mix Advanced resolutions for sophistication.`,
        ja: `## V7テンション解決 — Easy & Advancedボイスリーディング

レッスンで最も高度なトピックの一つです。V7をG7♭9、G7♯9、G7♯11、G7♭13に拡張できます。これらのテンションがIコードへどう解決するかを理解すると、ボイシングとソロの両方が大きく発展します。

### V7の4つのテンション（CメジャーのG7基準）

- **♭9**（Ab）: ルートから半音上の9度 — 非常に緊張感
- **♯9**（Bb）: 上げた9度 — 非常に緊張感
- **♯11**（C♯）: 増4度 — 魔法のような色彩
- **♭13**（Eb）: 短6度 — 暗く強烈な緊張

### Easy ボイスリーディング — 順方向解決

| G7テンション | 方向 | Cmaj7到達音 |
|-----------|-----|-----------|
| ♭9 (Ab) | ↓ 半音 | G (5度) |
| ♭13 (Eb) | ↓ 半音 | D (9度) |
| ♯11 (C♯) | ↑ 半音 | D (9度) |
| ♯9 (Bb) | ↓↓ | G (5度) |

### Advanced ボイスリーディング — 逆方向解決

| G7テンション | 方向 | Cmaj7到達音 |
|-----------|-----|-----------|
| ♭9 (Ab) | ↑ | A (6度) |
| ♭13 (Eb) | ↑ | E (3度) |
| ♯11 (C♯) | ↑ | C (ルート) |
| ♯9 (Bb) | ↑ | B (7度) |`,
      },
      abcNotation: `X:1
T:ii-V-I Tension Resolution in C
M:4/4
L:1/4
Q:1/4=70
K:C
[DF][DF]2 | [B_e][B_e]2 | [EB][EB]4 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'G7♭9 → Cmaj7 Easy 해결', en: 'G7♭9 → Cmaj7 Easy Resolution', ja: 'G7♭9 → Cmaj7 Easy解決' },
          description: {
            ko: 'G7♭9 보이싱에서 ♭9(Ab)음이 5도(G)로 하강 해결하는 것을 반복. 보이스리딩을 귀로 확인하면서 연주. BPM 60.',
            en: 'Repeat the ♭9 (Ab) in G7♭9 resolving down to 5th (G) in Cmaj7. Confirm voice leading by ear while playing. BPM 60.',
            ja: 'G7♭9のボイシングで♭9（Ab）が5度（G）へ下行解決するのを繰り返す。BPM60。',
          },
          bpm: 60,
        },
        {
          title: { ko: '4가지 텐션 Easy 해결 순환', en: '4 Tensions Easy Resolution Cycle', ja: '4つのテンションEasy解決循環' },
          description: {
            ko: 'G7 위에서 ♭9, ♭13, ♯11, ♯9를 각각 연주하고 Cmaj7로 Easy 해결. 각 텐션마다 2마디. BPM 70.',
            en: 'Play ♭9, ♭13, ♯11, ♯9 on G7 and resolve each to Cmaj7 Easy style. 2 bars per tension. BPM 70.',
            ja: 'G7の上で♭9、♭13、♯11、♯9をそれぞれ演奏してCmaj7へEasy解決。各テンション2小節。BPM70。',
          },
          bpm: 70,
        },
      ],
    },
    checkpoints: [
      { ko: 'G7♭9 보이싱 연주 가능', en: 'Can play G7♭9 voicing', ja: 'G7♭9ボイシングを演奏できる' },
      { ko: 'Easy 보이스리딩 4가지 (♭9, ♭13, ♯11, ♯9) 암기', en: 'Memorized 4 Easy voice leadings (♭9, ♭13, ♯11, ♯9)', ja: '4つのEasyボイスリーディング（♭9、♭13、♯11、♯9）を暗記' },
      { ko: 'Advanced 보이스리딩 4가지 암기', en: 'Memorized 4 Advanced voice leadings', ja: '4つのAdvancedボイスリーディングを暗記' },
      { ko: 'ii-V-I 컴핑에서 텐션 → 해결 자연스럽게 사용', en: 'Can use tension → resolution naturally in ii-V-I comping', ja: 'ii-V-Iカンプでテンション→解決を自然に使用できる' },
    ],
    tools: ['chord-diagram', 'metronome'],
  },

  {
    id: 'hw-dim-whole-tone',
    slug: 'hw-dim-whole-tone',
    stage: 3,
    order: 17,
    title: {
      ko: 'h/w Dim & Whole Tone Scale',
      en: 'Half-Whole Dim & Whole Tone Scale',
      ja: 'ハーフ-ホールDim & ホールトーンスケール',
    },
    description: {
      ko: '8음 대칭 스케일(h/w dim)과 6음 대칭 스케일(whole tone) — 도미넌트 코드 위의 특수 스케일 두 가지.',
      en: '8-note symmetric scale (h/w dim) and 6-note symmetric scale (whole tone) — two special scales over dominant chords.',
      ja: '8音対称スケール（h/w dim）と6音対称スケール（ホールトーン）— ドミナントコード上の2つの特殊スケール。',
    },
    theory: {
      content: {
        ko: `## 대칭 스케일 — h/w Dim과 Whole Tone

일반 스케일은 비대칭적이지만, 반음계 음들로 구성된 **대칭 스케일**은 같은 음정 패턴이 반복됩니다. 이 특성 때문에 "하나만 알면 여러 키를 동시에 익힌다"는 효율성이 생깁니다.

### Half-Whole Diminished Scale (h/w dim) — 8음 스케일

**음정 패턴**: 반음(H) + 온음(W) 교대 반복


G h/w dim: G - Ab - Bb - B - C# - D - E - F
             H    W    H    W    H   W   H   W


**포함 텐션**: ♭9, ♯9, ♮3(=♭11), ♯11, 13

레슨 노트의 핵심 규칙: **"1도와 ♭도(반음 위)만 알면 두 배씩 배운다"**
→ G와 A♭만 알면 B♭, B, C♯, D 등이 자동으로 파생됩니다.

**사용 가능한 코드:**

| 코드 | 기능 |
|-----|-----|
| G7 (I7) | 도미넌트 7 |
| G-7 (I-7) | 마이너 도미넌트 |
| G♭7 (♭I7) | 반음 아래 도미넌트 |
| Go7 (Io7) | 디미니시드 7 |
| A♭♭7 (♭II♭7) | 반음 위 도미넌트 |
| A♭o7 (♭IIo7) | 반음 위 디미니시드 |

**대칭성의 효율**: h/w dim 스케일은 단3도마다 같은 패턴이 반복됩니다. G dim = B♭ dim = D♭ dim = E dim — 모두 같은 스케일이므로 사실 4개 스케일을 한 번에 익히는 셈입니다.

### Whole Tone Scale — 6음 스케일

**음정 패턴**: 온음(W)만 반복


G whole tone: G - A - B - C# - D# - F
                W   W   W    W    W    W


**포함 텐션**: 9, ♯11, ♭13 — 블루스 색채와 다른 "공중부양" 느낌

**사용 가능한 코드:**
- G7(♭5) / I7(♭5) — 증5도를 포함한 도미넌트

**대칭성의 효율**: whole tone 스케일은 온음마다 반복됩니다. G whole tone = A whole tone = B whole tone — 단 2개 스케일로 모든 12키를 커버합니다.

### 두 스케일 비교

| 특성 | h/w dim | whole tone |
|-----|---------|-----------|
| 음 수 | 8음 | 6음 |
| 패턴 | 반음+온음 교대 | 온음만 |
| 포함 텐션 | ♭9, ♯9, ♯11, ♭13 모두 | 9, ♯11, ♭13 |
| 대표 코드 | G7, G7♭9, o7 | G7♭5 |
| 사운드 | 복잡하고 긴장됨 | 몽환적, 부유하는 느낌 |
| 대칭 단위 | 단3도 | 온음 |

### 재즈에서의 활용

- **h/w dim**: ii-V-I에서 V7♭9이나 V7♯9 위에서 탁월
- **whole tone**: 코드가 G7♭5이거나 "공중부양" 느낌을 원할 때
- 두 스케일의 음정 패턴을 이해하면 즉흥연주 팔레트가 크게 넓어집니다.`,
        en: `## Symmetric Scales — h/w Dim and Whole Tone

While regular scales are asymmetric, **symmetric scales** have repeating interval patterns. This quality means "learn one, get many keys at once."

### Half-Whole Diminished Scale (h/w dim) — 8 Notes

**Interval pattern**: Half (H) + Whole (W) alternating


G h/w dim: G - Ab - Bb - B - C# - D - E - F
             H    W    H    W    H   W   H   W


**Included tensions**: ♭9, ♯9, ♮3 (=♭11), ♯11, 13

**Key lesson rule**: "Learn the root and ♭2nd, then the rest doubles"
→ Know G and Ab, and Bb, B, C#, D derive automatically.

**Usable Chords**: G7, G-7, G♭7, Go7, Ab♭7, Abo7

**Symmetry efficiency**: h/w dim repeats every minor 3rd. G dim = Bb dim = Db dim = E dim — all the same scale, so you learn 4 keys at once.

### Whole Tone Scale — 6 Notes

**Interval pattern**: Whole steps only


G whole tone: G - A - B - C# - D# - F
                W   W   W    W    W    W


**Included tensions**: 9, ♯11, ♭13 — "floating" feel different from blues

**Usable chords**: G7(♭5) — dominant with augmented 5th

**Symmetry efficiency**: whole tone repeats at every whole step — just 2 scales cover all 12 keys.

### Comparison

| Feature | h/w dim | whole tone |
|---------|---------|-----------|
| Notes | 8 | 6 |
| Pattern | H+W alternating | W only |
| Tensions | ♭9, ♯9, ♯11, ♭13 all | 9, ♯11, ♭13 |
| Target chord | G7, G7♭9, o7 | G7♭5 |
| Sound | Complex, tense | Dreamy, floating |`,
        ja: `## 対称スケール — h/w DimとWhole Tone

通常のスケールは非対称ですが、**対称スケール**は同じ音程パターンが繰り返されます。この特性から「一つ覚えれば複数のキーを同時に習得できる」という効率性が生まれます。

### Half-Whole Diminished Scale（h/w dim）— 8音スケール

**音程パターン**: 半音（H）+ 全音（W）交互繰り返し


G h/w dim: G - Ab - Bb - B - C# - D - E - F


**含まれるテンション**: ♭9、♯9、♮3（=♭11）、♯11、13

**レッスンノートの核心ルール**: 「1度と♭度（半音上）だけ覚えれば2倍習得」
→ GとAbだけ知れば、Bb、B、C♯、Dが自動的に派生します。

### Whole Tone Scale — 6音スケール

**音程パターン**: 全音のみ


G whole tone: G - A - B - C# - D# - F


**含まれるテンション**: 9、♯11、♭13

**対象コード**: G7（♭5）

### 2つのスケール比較

| 特性 | h/w dim | whole tone |
|-----|---------|-----------|
| 音数 | 8音 | 6音 |
| パターン | 半+全交互 | 全音のみ |
| テンション | ♭9♯9♯11♭13全部 | 9♯11♭13 |
| 対象コード | G7♭9系列 | G7♭5系列 |`,
      },
      abcNotation: `X:1
T:G Half-Whole Diminished Scale
M:4/4
L:1/8
Q:1/4=70
K:G
G _A _B =B ^c D E F | G8 |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'G h/w dim 스케일 기초 연주', en: 'G h/w dim Scale Basic Play', ja: 'G h/w dimスケール基礎演奏' },
          description: {
            ko: 'G h/w dim (G Ab Bb B C# D E F)를 BPM 60에서 오르내리기. 반음+온음 패턴에 집중하세요.',
            en: 'Play G h/w dim (G Ab Bb B C# D E F) up and down at BPM 60. Focus on the half+whole step pattern.',
            ja: 'G h/w dim（G Ab Bb B C# D E F）をBPM60で上下。半音+全音パターンに集中。',
          },
          bpm: 60,
          abcNotation: `X:1
T:G h/w dim
M:4/4
L:1/8
Q:1/4=60
K:G
G _A _B =B ^c D E F | F E D ^c =B _B _A G |]`,
        },
        {
          title: { ko: 'G whole tone 스케일 연주', en: 'G Whole Tone Scale Play', ja: 'Gホールトーンスケール演奏' },
          description: {
            ko: 'G whole tone (G A B C# D# F)를 BPM 60에서 오르내리기. 모든 음 간격이 온음임을 느끼세요.',
            en: 'Play G whole tone (G A B C# D# F) up and down at BPM 60. Feel that every interval is a whole step.',
            ja: 'Gホールトーン（G A B C# D# F）をBPM60で上下。全ての音の間隔が全音であることを感じてください。',
          },
          bpm: 60,
          abcNotation: `X:1
T:G Whole Tone Scale
M:4/4
L:1/8
Q:1/4=60
K:G
G A B ^c ^d F G4 |]`,
        },
        {
          title: { ko: 'G7 위에서 dim scale 적용', en: 'Apply dim scale over G7', ja: 'G7の上でdimスケール適用' },
          description: {
            ko: 'G7 backing 위에서 G h/w dim으로 4마디 프레이즈 만들기. ♭9(Ab), ♯9(Bb)를 의식적으로 사용. BPM 80.',
            en: 'Create a 4-bar phrase over G7 backing using G h/w dim. Consciously use ♭9 (Ab) and ♯9 (Bb). BPM 80.',
            ja: 'G7バッキングの上でG h/w dimを使って4小節フレーズを作る。♭9（Ab）と♯9（Bb）を意識的に使用。BPM80。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'G h/w dim 스케일 오르내리기 가능 (BPM 70)', en: 'Can play G h/w dim scale up and down (BPM 70)', ja: 'G h/w dimスケールの上下演奏ができる（BPM70）' },
      { ko: 'G whole tone 스케일 오르내리기 가능 (BPM 70)', en: 'Can play G whole tone scale up and down (BPM 70)', ja: 'Gホールトーンスケールの上下演奏ができる（BPM70）' },
      { ko: 'G7 위에서 h/w dim 프레이즈 연주 가능', en: 'Can play h/w dim phrase over G7', ja: 'G7の上でh/w dimフレーズを演奏できる' },
      { ko: '두 스케일의 차이를 귀로 구분 가능', en: 'Can distinguish two scales by ear', ja: '2つのスケールの違いを耳で区別できる' },
    ],
    tools: ['sheet-music', 'metronome'],
  },

  {
    id: 'altered-chord',
    slug: 'altered-chord',
    stage: 3,
    order: 18,
    title: {
      ko: 'Altered Chord & Jazz Minor',
      en: 'Altered Chord & Jazz Minor',
      ja: 'オルタードコード & ジャズマイナー',
    },
    description: {
      ko: 'Altered 도미넌트 코드(♭9, ♯9, ♭13, ♯11)와 Jazz minor scale의 관계 — "반음 위 Jazz minor" 공식.',
      en: 'Altered dominant chord (♭9, ♯9, ♭13, ♯11) and its relationship with Jazz minor scale — the "half step up Jazz minor" formula.',
      ja: 'オルタードドミナントコード（♭9、♯9、♭13、♯11）とジャズマイナースケールの関係 — 「半音上ジャズマイナー」公式。',
    },
    theory: {
      content: {
        ko: `## Altered Chord — 가장 재즈스러운 도미넌트

Altered Chord는 도미넌트 7th 코드에서 가능한 모든 텐션을 변형시킨 것입니다. V7alt는 V7의 가장 발전된 형태로, 현대 재즈에서 가장 자주 쓰이는 색채입니다.

### Altered = #9 + ♭9 + ♭13 + ♯11

G7alt의 구성:
- 기본: G(1), B(3), D(5), F(♭7)
- 텐션: A♭(♭9), B♭(♯9), E♭(♭13), C♯(♯11)

5도(D)는 생략, 텐션이 모두 변형됩니다.

### 핵심 공식 — 레슨의 핵심 공식

> **Altered chord (V7alt) → 반음 위의 Jazz minor scale**

이 공식 하나만 기억하면 모든 Altered chord를 처리할 수 있습니다.

| Altered 코드 | 반음 위 | 사용 스케일 |
|------------|--------|---------|
| G7alt | A♭ | **A♭ Jazz minor** (= G♯ Melodic minor) |
| E♭7alt | E | **E Jazz minor** (= F Dorian 방식) |
| C7alt | D♭ | **D♭ Jazz minor** |
| B♭7alt | B | **B Jazz minor** |

### 왜 이 공식이 작동하는가?

Jazz minor scale(멜로딕 마이너)의 **7번째 모드**가 바로 Altered scale입니다.


A♭ Jazz minor: A♭ - B♭ - C♭ - D♭ - E♭ - F - G
7번째 모드 (G부터 시작): G - A♭ - B♭ - C♭ - D♭ - E♭ - F
                        = G Altered scale


G Altered scale = A♭ Jazz minor의 7번째 모드 → 동일한 음집합!

### Sunny에서의 실전 적용

레슨 노트에서 분석한 Sunny의 핵심 구간:

**② B♭m7 → E♭7:**
- E♭7 = Altered chord (E♭7alt)
- 공식 적용: E♭alt = **반음 위 E Jazz minor**
- E Jazz minor = F Dorian과 같은 음집합
- 솔로 선택: **F Dorian (Jazz minor) 사용**


E♭7alt  →  반음 위 Jazz minor  →  E Jazz minor  =  F Dorian


### Altered 보이싱의 특징

E♭7alt 보이싱에는 세 가지 유형이 있습니다:
1. **♭9 포함 보이싱**: 3도 + ♭7도 + ♭9도
2. **dim 느낌 보이싱**: Altered chord는 dim7 어퍼 스트럭처와 유사
3. **확장 텐션 보이싱**: ♯9 + ♭13 추가

### ii-V-I에서 V7alt 활용

일반 V7과 V7alt를 번갈아 사용하면 다양한 색채가 생깁니다:

기본:    Dm7 → G7    → Cmaj7  (전통적)
향상:    Dm7 → G7alt → Cmaj7  (현대 재즈)`,
        en: `## Altered Chord — The Most Jazz-Like Dominant

Altered Chord modifies all possible tensions of a dominant 7th chord. V7alt is the most developed form of V7, the most frequently used color in modern jazz.

### Altered = ♯9 + ♭9 + ♭13 + ♯11

G7alt components:
- Basic: G(1), B(3), F(♭7)
- Tensions: A♭(♭9), B♭(♯9), E♭(♭13), C♯(♯11)

### Core Formula — The Key Lesson Formula

> **Altered chord (V7alt) → Jazz minor scale a half step up**

| Altered Chord | Half Step Up | Scale to Use |
|-------------|------------|------------|
| G7alt | A♭ | **A♭ Jazz minor** |
| E♭7alt | E | **E Jazz minor** (= F Dorian approach) |
| C7alt | D♭ | **D♭ Jazz minor** |
| B♭7alt | B | **B Jazz minor** |

### Why This Formula Works

The **7th mode of Jazz minor scale** is exactly the Altered scale.


A♭ Jazz minor: A♭ - B♭ - C♭ - D♭ - E♭ - F - G
Mode 7 (from G): G - A♭ - B♭ - C♭ - D♭ - E♭ - F
              = G Altered scale


G Altered = 7th mode of A♭ Jazz minor → same pitch collection!

### Application in Sunny

**② B♭m7 → E♭7:**
- E♭7 = Altered chord
- Formula: E♭alt = **half step up = E Jazz minor**
- E Jazz minor = same pitch set as F Dorian
- Solo choice: **Use F Dorian (Jazz minor)**`,
        ja: `## オルタードコード — 最もジャズらしいドミナント

オルタードコードはドミナント7thコードで可能な全テンションを変形させたものです。V7altはV7の最も発展した形で、現代ジャズで最も頻繁に使われる色彩です。

### 核心公式 — レッスンの核心公式

> **オルタードコード（V7alt）→ 半音上のジャズマイナースケール**

| オルタードコード | 半音上 | 使用スケール |
|-------------|------|----------|
| G7alt | Ab | **Abジャズマイナー** |
| E♭7alt | E | **Eジャズマイナー**（= Fドリアン方式） |
| C7alt | Db | **Dbジャズマイナー** |

### なぜこの公式が機能するのか

ジャズマイナースケールの**7番目のモード**が正確にオルタードスケールです。


Abジャズマイナー: Ab - Bb - Cb - Db - Eb - F - G
第7モード（Gから）: G - Ab - Bb - Cb - Db - Eb - F = Gオルタードスケール


### Sunnyでの実践適用

**② B♭m7 → E♭7:**
- E♭7 = オルタードコード
- 公式: E♭alt = **半音上 = Eジャズマイナー**
- Eジャズマイナー = Fドリアンと同じ音集合`,
      },
      abcNotation: `X:1
T:G Altered Scale (Ab Jazz Minor mode 7)
M:4/4
L:1/8
Q:1/4=70
K:G
G _A _B _c _e _f _g G |]`,
    },
    practice: {
      exercises: [
        {
          title: { ko: 'G7alt → Cmaj7 해결', en: 'G7alt → Cmaj7 Resolution', ja: 'G7alt → Cmaj7解決' },
          description: {
            ko: 'G7alt 보이싱에서 Cmaj7으로 해결. Ab Jazz minor 스케일로 G7 위에서 짧은 프레이즈 연주. BPM 70.',
            en: 'Resolve from G7alt voicing to Cmaj7. Play short phrase using Ab Jazz minor scale over G7. BPM 70.',
            ja: 'G7altボイシングからCmaj7へ解決。G7の上でAbジャズマイナースケールを使って短いフレーズを演奏。BPM70。',
          },
          bpm: 70,
        },
        {
          title: { ko: 'Sunny E♭7alt 구간 연주', en: 'Sunny E♭7alt Section Play', ja: 'Sunny E♭7altセクション演奏' },
          description: {
            ko: 'Sunny의 B♭m7 → E♭7 코드 위에서 E♭alt = F Dorian을 적용. 반음 위 Jazz minor 공식 실전 연습. BPM 100.',
            en: 'Apply E♭alt = F Dorian over B♭m7 → E♭7 in Sunny. Practice the half-step up Jazz minor formula in real context. BPM 100.',
            ja: 'SunnyのB♭m7 → E♭7の上でE♭alt = Fドリアンを適用。半音上ジャズマイナー公式の実践練習。BPM100。',
          },
          bpm: 100,
        },
      ],
    },
    checkpoints: [
      { ko: '"반음 위 Jazz minor" 공식 암기', en: 'Memorized "half step up Jazz minor" formula', ja: '「半音上ジャズマイナー」公式を暗記' },
      { ko: 'G7alt 보이싱 최소 2가지 연주 가능', en: 'Can play at least 2 G7alt voicings', ja: 'G7altボイシングを少なくとも2種類演奏できる' },
      { ko: 'G7alt 위에서 Ab Jazz minor 스케일로 프레이즈 연주 가능', en: 'Can play phrase using Ab Jazz minor over G7alt', ja: 'G7altの上でAbジャズマイナースケールでフレーズ演奏できる' },
      { ko: 'ii-V-I에서 V7alt를 자연스럽게 사용', en: 'Can naturally use V7alt in ii-V-I', ja: 'ii-V-IでV7altを自然に使用できる' },
    ],
    tools: ['chord-diagram', 'metronome'],
  },

  // ─── STAGE 4: Standards ─────────────────────────────────────────────────
  {
    id: 'autumn-leaves',
    slug: 'autumn-leaves',
    stage: 4,
    order: 19,
    title: {
      ko: 'Autumn Leaves 분석',
      en: 'Autumn Leaves Analysis',
      ja: 'Autumn Leaves分析',
    },
    description: {
      ko: '재즈의 가장 유명한 스탠다드를 분석하고 코드 진행을 이해한다.',
      en: 'Analyze the most famous jazz standard and understand its chord progression.',
      ja: 'ジャズで最も有名なスタンダードを分析してコード進行を理解する。',
    },
    theory: {
      content: {
        ko: `## Autumn Leaves (고엽)

### 곡 정보
- 원제: Les Feuilles mortes
- 작곡: Joseph Kosma (1945)
- 재즈 스탠다드로 가장 많이 연주되는 곡 중 하나

### 코드 진행 분석 (G 단조)
\`\`\`
| Cm7   | F7    | Bbmaj7 | Ebmaj7 |
| Am7b5 | D7    | Gm7   | Gm7    |
\`\`\`

### ii-V-I의 연속
이 곡은 ii-V-I 진행의 연속입니다:
- **Cm7 - F7 - Bbmaj7**: ii-V-I in Bb Major
- **Am7b5 - D7 - Gm7**: ii-V-i in G minor

### 학습 전략
1. 코드 보이싱 먼저 익히기
2. 코드 진행 박자에 맞춰 루트 음 연주
3. 가이드 톤으로 진행 연결
4. 스케일/릭으로 즉흥 시도`,
        en: `## Autumn Leaves

### Song Info
- Original: Les Feuilles mortes
- Composed: Joseph Kosma (1945)
- One of the most performed jazz standards

### Chord Progression Analysis (G minor)
\`\`\`
| Cm7   | F7    | Bbmaj7 | Ebmaj7 |
| Am7b5 | D7    | Gm7   | Gm7    |
\`\`\`

### Series of ii-V-I
This song is a continuous series of ii-V-I progressions:
- **Cm7 - F7 - Bbmaj7**: ii-V-I in Bb Major
- **Am7b5 - D7 - Gm7**: ii-V-i in G minor

### Learning Strategy
1. Learn chord voicings first
2. Play root notes in tempo
3. Connect with guide tones
4. Attempt improvisation with scales/licks`,
        ja: `## Autumn Leaves（枯葉）

### 曲情報
- 原題: Les Feuilles mortes
- 作曲: Joseph Kosma（1945年）
- 最も多く演奏されるジャズスタンダードの一つ

### コード進行分析（Gマイナー）
\`\`\`
| Cm7   | F7    | Bbmaj7 | Ebmaj7 |
| Am7b5 | D7    | Gm7   | Gm7    |
\`\`\`

### ii-V-Iの連続
この曲はii-V-I進行の連続です。`,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Autumn Leaves 코드 진행 컴핑', en: 'Autumn Leaves Chord Progression Comping', ja: 'Autumn Leavesコード進行カンプ' },
          description: {
            ko: 'Autumn Leaves 코드 진행을 7th 코드 보이싱으로 컴핑. BPM 80, 4박자 리듬.',
            en: 'Comp Autumn Leaves chord progression with 7th chord voicings. BPM 80, 4/4 rhythm.',
            ja: 'Autumn Leavesのコード進行を7thコードボイシングでカンプ。BPM80、4/4リズム。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'Autumn Leaves 코드 진행을 외울 수 있다', en: 'Can memorize Autumn Leaves chord progression', ja: 'Autumn Leavesのコード進行を暗記できる' },
      { ko: '전체 진행을 코드 보이싱으로 연주 가능 (BPM 80)', en: 'Can play full progression with chord voicings (BPM 80)', ja: '全進行をコードボイシングで演奏できる（BPM80）' },
      { ko: '진행 위에서 가이드 톤 멜로디 연주 가능', en: 'Can play guide tone melody over progression', ja: '進行の上でガイドトーンメロディを演奏できる' },
    ],
    tools: ['metronome', 'chord-diagram'],
  },

  {
    id: 'chord-melody',
    slug: 'chord-melody',
    stage: 4,
    order: 21,
    title: {
      ko: '코드 멜로디 기초',
      en: 'Chord Melody Basics',
      ja: 'コードメロディー基礎',
    },
    description: {
      ko: '멜로디와 코드를 동시에 연주하는 코드 멜로디의 기초 기법을 익힌다.',
      en: 'Learn the basic techniques of chord melody, playing melody and chords simultaneously.',
      ja: 'メロディーとコードを同時に演奏するコードメロディーの基礎技法を学ぶ。',
    },
    theory: {
      content: {
        ko: `## 코드 멜로디

코드 멜로디는 솔로 기타로 멜로디와 반주를 동시에 연주하는 기법입니다.

### 기본 원칙
1. **멜로디는 항상 최고음** — 멜로디가 들려야 함
2. **코드는 멜로디 아래** — 보이싱 선택에 제약
3. **리듬은 단순하게** — 너무 복잡하면 멜로디 묻힘

### 기초 접근법
- 멜로디 음이 코드 1도, 3도, 5도, 7도일 때 가장 쉬움
- 멜로디 음이 코드 톤이 아닐 때: 텐션 코드 사용 또는 생략

### Joe Pass 스타일
Joe Pass는 멜로디를 자유롭게 흐르게 하면서 코드를 드문드문 삽입합니다.
→ 초보자에게 더 접근하기 쉬운 방식

### 학습 순서
1. 멜로디만 먼저
2. 베이스 + 멜로디
3. 코드 + 멜로디 (단순 버전)
4. 완전한 코드 멜로디`,
        en: `## Chord Melody

Chord melody is the technique of playing melody and accompaniment simultaneously on solo guitar.

### Basic Principles
1. **Melody always on top** — melody must be heard
2. **Chords below melody** — constrains voicing choices
3. **Simple rhythm** — too complex buries the melody

### Basic Approach
- Easiest when melody note is chord tone (1, 3, 5, 7)
- When melody is non-chord-tone: use tension chord or omit

### Joe Pass Style
Joe Pass lets melody flow freely while sparingly inserting chords.
→ More accessible approach for beginners`,
        ja: `## コードメロディー

コードメロディーはソロギターでメロディーと伴奏を同時に演奏する技法です。

### 基本原則
1. **メロディーは常に最高音** — メロディーが聞こえること
2. **コードはメロディーの下** — ボイシング選択に制約
3. **リズムはシンプルに** — 複雑すぎるとメロディーが埋まる`,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Autumn Leaves 첫 4마디 코드 멜로디', en: 'Autumn Leaves First 4 Bars Chord Melody', ja: 'Autumn Leaves最初の4小節コードメロディー' },
          description: {
            ko: 'Autumn Leaves의 첫 4마디를 간단한 코드 멜로디로 편곡하세요. 멜로디 음에 가장 가까운 코드 보이싱 찾기.',
            en: 'Arrange the first 4 bars of Autumn Leaves as simple chord melody. Find chord voicings closest to melody notes.',
            ja: 'Autumn Leavesの最初の4小節を簡単なコードメロディーにアレンジ。メロディー音に最も近いコードボイシングを探す。',
          },
          bpm: 60,
        },
      ],
    },
    checkpoints: [
      { ko: 'Autumn Leaves 첫 4마디를 코드 멜로디로 연주 가능', en: 'Can play first 4 bars of Autumn Leaves as chord melody', ja: 'Autumn Leavesの最初の4小節をコードメロディーで演奏できる' },
      { ko: '멜로디가 또렷하게 들리도록 코드와 균형 유지 가능', en: 'Can maintain balance between melody and chords so melody is clear', ja: 'メロディーがはっきり聞こえるようコードとのバランスを保てる' },
    ],
    tools: ['metronome', 'sheet-music'],
  },

  {
    id: 'sunny-solo',
    slug: 'sunny-solo',
    stage: 4,
    order: 20,
    title: {
      ko: '"Sunny" 솔로 분석',
      en: '"Sunny" Solo Analysis',
      ja: '「Sunny」ソロ分析',
    },
    description: {
      ko: 'Sunny의 각 코드 위에서 최적 스케일을 선택하는 법 — Altered → Jazz minor 공식을 실제 곡에 적용.',
      en: 'Learn the optimal scale choice for each chord in Sunny — apply the Altered → Jazz minor formula to a real song.',
      ja: 'Sunnyの各コードで最適スケールを選ぶ方法 — オルタード→ジャズマイナー公式を実際の曲に適用。',
    },
    theory: {
      content: {
        ko: `## Sunny — 실전 스케일 선택 분석

Sunny는 Bobby Hebb이 1966년 작곡한 곡으로, 재즈 편곡에서 다양한 Altered chord가 등장하는 "살아있는 교과서"입니다. 레슨에서 각 코드 위에 최적 스케일을 선택하는 법을 이 곡을 통해 배웠습니다.

### Sunny 코드 진행 분석

**① Am7 (또는 A♭m7) → Gm7 → C♯**
- 기본 마이너 진행
- Am7: A Dorian (minor pentatonic 포함)
- Gm7: G Dorian
- 이 구간은 Dorian 중심으로 흐르게 처리

**② B♭m7 → E♭7**
- **E♭7 = Altered chord**가 핵심
- 공식 적용: E♭alt = **반음 위 = E Jazz minor**
- E Jazz minor와 F Dorian은 같은 음집합
- 솔로 선택: **F Dorian (Jazz minor) scale 사용**
- 또는 E♭♯11 어프로치 = E♭alt와 동일

**③ G♭m7 → C♭7 → F♭7**
- **C♭7 처리**: C♭ Mixolydian = Gm7(♭5) 어프로치
- C♭ alt = D♭ Dorian (Jazz minor)으로 접근 가능
- C♭7(♭9)의 경우: D♭ Jazz minor 적용

**④ F♯m7 → B♭m7**
- **B♭7 처리**: B♭ Mixolydian = Fm7(♭5) 어프로치 (기본)
- B♭♭9의 경우: E♭alt = F Jazz minor 연결
- 두 어프로치 모두 가능 — 상황에 따라 선택

**⑤ F7 → E♭7**
- F7는 ♭VII7 기능 (B♭ 장조 관점)
- 이 구간에서 **블루노트 E♭를 강조** — 기타 특유의 진음(vibrato)으로
- Blues scale 연결로 감성적 표현 가능
- E♭7에서는 다시 E♭alt = F Jazz minor로 전환

### 핵심 공식 반복 확인


Altered chord (V7alt) → 반음 위 Jazz minor

E♭7alt → E Jazz minor (= F Dorian)
C♭7alt → D♭ Jazz minor
B♭7alt → B Jazz minor


이 하나의 공식으로 Sunny의 모든 Altered chord를 처리할 수 있습니다.

### 스케일 선택 정리표

| 코드 | 스케일 선택 | 이유 |
|-----|---------|-----|
| Am7 | A Dorian | 기본 마이너 |
| B♭m7 | B♭ Dorian | 기본 마이너 |
| E♭7 | F Dorian (E Jazz minor) | Altered → 반음 위 Jazz minor |
| G♭m7 | G♭ Dorian | 기본 마이너 |
| C♭7 | D♭ Jazz minor 또는 C♭ Mixo | Altered 또는 Mixolydian |
| F7 | Blues scale | 블루노트 강조 |

### 연주 팁

- 코드가 복잡하게 보여도 "이 코드는 Altered인가?"만 물으면 됩니다
- Altered라면 → 반음 위 Jazz minor
- 아니라면 → Dorian 또는 Mixolydian
- 마지막 F7 → E♭7 구간은 blues scale로 감성적으로 표현`,
        en: `## Sunny — Scale Choices Per Chord

### Song Info
- Original: Bobby Hebb (1966)
- Jazz version: Frequently performed as jazz standard

### Chord Analysis

**① Am7 (A♭m7) → Gm7 → C♯**
- Basic minor progression
- Use minor pentatonic or Dorian

**② B♭m7 → E♭7**
- E♭7 = Altered chord
- Formula: E♭alt = **F Dorian (Jazz minor)**

**③ G♭m7 → C♭7 → F♭7**
- C♭ Mixo approach = Gm7(♭5)
- C♭ alt = D♭ Dorian approach

**④ F♯m7 → B♭m7**
- B♭7 Mixo = Fm7(♭5) approach
- B♭♭9 → E♭alt (F Jazz minor)

**⑤ F7 → E♭7**
- ♭VII7 section: Use blue note E♭
- Blues scale connection

### Core Formula
\`\`\`
Altered chord (V7alt) → Jazz minor a half step up
E♭7alt ⟹ F Jazz minor scale
\`\`\``,
        ja: `## Sunny — コードごとのスケール選択

### 曲情報
- オリジナル: Bobby Hebb（1966年）

### コード進行分析

**② B♭m7 → E♭7**
- E♭7 = オルタードコード
- 公式: E♭alt = **Fドリアン（ジャズマイナー）**

### 核心公式
\`\`\`
オルタードコード → 半音上のジャズマイナー
E♭7alt ⟹ Fジャズマイナースケール
\`\`\``,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: 'Sunny 코드 진행 암기', en: 'Memorize Sunny Chord Progression', ja: 'Sunnyコード進行暗記' },
          description: {
            ko: 'Sunny의 전체 코드 진행을 루트 음으로 연주하면서 암기. 각 코드 기능(I, IV, V 등)을 머릿속으로 확인하면서 진행.',
            en: 'Memorize the full Sunny chord progression by playing root notes. Confirm each chord function (I, IV, V, etc.) in your head.',
            ja: 'Sunnyの全コード進行をルート音で演奏しながら暗記。各コード機能（I、IV、Vなど）を頭の中で確認しながら進める。',
          },
          bpm: 80,
        },
        {
          title: { ko: 'E♭7alt 구간 스케일 연습', en: 'E♭7alt Section Scale Practice', ja: 'E♭7altセクションスケール練習' },
          description: {
            ko: 'E♭7 위에서 F Dorian (F Jazz minor)을 연주. 반음 위 Jazz minor 공식 체화. BPM 80.',
            en: 'Play F Dorian (F Jazz minor) over E♭7. Internalize the half-step up Jazz minor formula. BPM 80.',
            ja: 'E♭7の上でFドリアン（Fジャズマイナー）を演奏。半音上ジャズマイナー公式を体化。BPM80。',
          },
          bpm: 80,
        },
        {
          title: { ko: 'Sunny 반주 트랙 위 솔로', en: 'Solo Over Sunny Backing Track', ja: 'Sunnyバッキングトラックの上でソロ' },
          description: {
            ko: 'Sunny 반주 트랙을 찾아 전체 코드 진행 위에서 즉흥 솔로. 각 Altered 코드에서 Jazz minor 공식 적용. BPM 120 전후.',
            en: 'Find a Sunny backing track and improvise over the full progression. Apply Jazz minor formula at each Altered chord. Around BPM 120.',
            ja: 'Sunnyのバッキングトラックを探して全コード進行の上で即興ソロ。各オルタードコードでジャズマイナー公式を適用。BPM120前後。',
          },
          bpm: 120,
        },
      ],
    },
    checkpoints: [
      { ko: 'Sunny 전체 코드 진행 암기', en: 'Memorized full Sunny chord progression', ja: 'Sunnyの全コード進行を暗記' },
      { ko: 'E♭7alt 위에서 F Dorian 스케일 연주 가능', en: 'Can play F Dorian scale over E♭7alt', ja: 'E♭7altの上でFドリアンスケール演奏できる' },
      { ko: 'Altered chord → Jazz minor 공식 각 코드에 적용 가능', en: 'Can apply Altered → Jazz minor formula to each chord', ja: 'オルタード→ジャズマイナー公式を各コードに適用できる' },
      { ko: 'Sunny 반주 위에서 2코러스 이상 즉흥 연주', en: 'Can improvise 2+ choruses over Sunny backing', ja: 'Sunnyのバッキングの上で2コーラス以上即興演奏できる' },
    ],
    tools: ['metronome'],
  },

  {
    id: 'improvisation',
    slug: 'improvisation',
    stage: 4,
    order: 22,
    title: {
      ko: '즉흥연주 가이드',
      en: 'Improvisation Guide',
      ja: '即興演奏ガイド',
    },
    description: {
      ko: '지금까지 학습한 모든 것을 통합해 재즈바에서 자연스러운 즉흥연주를 할 수 있는 상태에 도달한다.',
      en: 'Integrate everything learned so far to reach the point of natural improvisation in a jazz setting.',
      ja: 'これまで学んだすべてを統合してジャズバーで自然な即興演奏ができる状態に到達する。',
    },
    theory: {
      content: {
        ko: `## 즉흥연주 — 모든 것의 통합

지금까지 학습한 개념들을 실제 즉흥연주에서 어떻게 연결하는지 정리합니다. 이 챕터는 새로운 이론을 배우는 것이 아니라, 이미 배운 것들을 하나의 흐름으로 엮는 것입니다.

### 즉흥연주의 계층 구조

재즈 즉흥연주는 4가지 재료의 조합입니다:


레벨 1: 코드톤 (R, 3, 5, 7)
  → 가장 기초, 항상 안전한 뼈대

레벨 2: 스케일 (Dorian, Mixolydian, Blues scale)
  → 연결음, 색채 추가

레벨 3: 인클로저 (위아래 반음 접근)
  → 재즈 특유의 서프라이즈, 강박 도착감

레벨 4: 릭 (암기된 패턴들)
  → 완성된 어휘, 즉흥 솔로의 하이라이트


### 블루스 위에서의 즉흥 접근 3단계

**단계 1 — 코드톤만으로 (처음 2분)**
각 코드 변환에 맞춰 코드톤(1, 3, 5, 7)만 사용합니다. 스케일 없이 코드톤만으로도 충분히 음악이 됩니다.

**단계 2 — 스케일 추가 (다음 2분)**
블루스 스케일, 믹솔리디안을 코드톤 사이 연결음으로 추가합니다. 코드톤이 강박에 오고 스케일 음이 약박을 채웁니다.

**단계 3 — 릭과 인클로저 (마지막 2분)**
암기한 ii-V-I 릭, 블루스 턴어라운드 라인, 인클로저 패턴을 적절한 위치에 삽입합니다.

### "Less is More" — 재즈 즉흥의 철학

재즈에서 쉬는 것도 연주입니다. 말과 말 사이의 침묵처럼, 음표와 음표 사이의 쉼이 음악에 공간과 긴장감을 만듭니다.

- 2-4음의 짧은 프레이즈 → 긴 선율보다 더 강렬할 수 있음
- 프레이즈 후 쉬기 → 다음 프레이즈의 임팩트를 높임
- 리듬과 그루브를 스케일보다 먼저 — 리드미컬한 단 2음이 빠른 16음 런보다 재즈스러울 수 있음

### 재즈 즉흥의 4가지 원칙

1. **코드 변환에 코드톤으로 도착**: 강박 = 코드톤, 약박 = 연결음
2. **방향성 유지**: 상행 또는 하행을 일관되게 — 랜덤한 오르내림은 방향성 없음
3. **공간 활용**: 매 마디를 음표로 채우려 하지 말 것 — 쉼이 음악
4. **녹음하고 들을 것**: 자신의 연주를 객관적으로 들어야 발전 가능

### 실전 연습 루틴 (1시간 기준)

| 시간 | 내용 |
|-----|-----|
| 0-10분 | 워밍업 — 코드톤 아르페지오 천천히 |
| 10-30분 | 블루스 백킹 트랙으로 즉흥 (3단계 접근법) |
| 30-50분 | 스탠다드(Autumn Leaves 등)으로 즉흥 시도 |
| 50-60분 | 자유 잼 — 녹음 후 들어보기 |

### 다음 목표: 어느 재즈바에서나 자연스럽게

지금까지 익힌 도구:
- **블루스 폼** + 블루스 스케일 + 믹솔리디안 → 블루스 즉흥 완성
- **ii-V-I** + 가이드 톤 + 코드톤 + 인클로저 + 릭 → 스탠다드 즉흥 완성
- **Altered chord** + Jazz minor 공식 → 모던 재즈 색채 추가

"완벽한 솔로"가 목표가 아니라 "코드 변화를 느끼면서 자연스럽게 흐르는 솔로"가 목표입니다.`,
        en: `## Improvisation Integration

### Vocabulary Learned So Far
- 7th chord voicings
- Guide tones
- Blues scale & Mixolydian
- Chord tone arpeggios
- Enclosures
- Licks

### Hierarchy of Improvisation
1. **Basic**: Chord tones only
2. **Intermediate**: Chord tones + scale connections
3. **Advanced**: Licks + enclosures + tensions

### Practical Approach
**"Less is More"** — rests are also music in jazz improvisation.

### Starting with Kenny Burrell Style
- Simple, bluesy phrases
- Expressive few notes over many notes
- Rhythm and groove first

### Practice Routine
1. Find blues backing track
2. First 2 minutes: chord tones only
3. Next 2 minutes: add scales
4. Last 2 minutes: insert licks
5. Record and listen back`,
        ja: `## 即興演奏の統合

### これまで学んだ語彙
- 7thコードボイシング
- ガイドトーン
- ブルーススケール & ミクソリディアン
- コードトーンアルペジオ
- エンクロージャー
- リック

### 即興演奏の階層構造
1. **基礎**: コードトーンアルペジオのみ
2. **中級**: コードトーン + スケール連結
3. **上級**: リック + エンクロージャー + テンション

### 実践アプローチ
**「Less is More」** — ジャズ即興演奏では休むことも演奏です。`,
      },
    },
    practice: {
      exercises: [
        {
          title: { ko: '3단계 블루스 즉흥 세션', en: '3-Stage Blues Improvisation Session', ja: '3ステージブルース即興セッション' },
          description: {
            ko: 'F 블루스 백킹 트랙 위에서 10분 즉흥연주를 하십시오. 처음 3분: 코드톤만. 중간 4분: 코드톤 + 스케일. 마지막 3분: 릭과 인클로저 삽입. 반드시 녹음하고 들어봅니다.',
            en: 'Improvise over F blues backing track for 10 minutes. First 3 min: chord tones only. Middle 4 min: chord tones + scales. Last 3 min: insert licks and enclosures. Must record and listen back.',
            ja: 'Fブルースバッキングトラックの上で10分即興演奏してください。最初3分: コードトーンのみ。中間4分: コードトーン+スケール。最後3分: リックとエンクロージャー挿入。必ず録音して聴き返します。',
          },
          bpm: 90,
        },
        {
          title: { ko: '단 2음으로 한 코러스 즉흥', en: 'One Chorus Improvisation with Only 2 Notes', ja: '2音だけで1コーラス即興' },
          description: {
            ko: 'F 블루스 한 코러스 전체를 3도와 7도(가이드 톤) 두 음만으로 즉흥 연주하십시오. 리듬 변화와 쉼의 활용에만 집중합니다. BPM 80. "Less is More"의 실전 훈련입니다.',
            en: 'Play one full chorus of F blues improvisation using only the 3rd and 7th (guide tones) — just 2 notes. Focus entirely on rhythm variation and rests. BPM 80. This is the practical training for "Less is More."',
            ja: 'Fブルースの1コーラス全体を3度と7度（ガイドトーン）の2音だけで即興演奏してください。リズム変化と休止の活用だけに集中します。BPM80。「Less is More」の実践訓練です。',
          },
          bpm: 80,
        },
        {
          title: { ko: 'Autumn Leaves 즉흥 시도', en: 'Improvisation Attempt on Autumn Leaves', ja: 'Autumn Leaves即興演奏の試み' },
          description: {
            ko: 'Autumn Leaves 코드 진행 위에서 가이드 톤 + 코드톤 아르페지오만으로 즉흥 연주를 시도하십시오. 스케일보다 코드 변화에 맞는 음을 찾는 것이 우선입니다. BPM 80.',
            en: 'Attempt improvisation over Autumn Leaves chord changes using guide tones and chord tone arpeggios only. Finding notes that fit chord changes takes priority over scales. BPM 80.',
            ja: 'Autumn Leavesのコード進行の上でガイドトーン+コードトーンアルペジオだけで即興演奏を試みてください。スケールよりコードチェンジに合った音を見つけることが優先です。BPM80。',
          },
          bpm: 80,
        },
      ],
    },
    checkpoints: [
      { ko: 'F 블루스 위에서 3단계 방법(코드톤→스케일→릭)으로 10분 즉흥 가능', en: 'Can improvise 10 min over F blues using 3-stage method', ja: 'Fブルースの上で3ステージ法（コードトーン→スケール→リック）で10分即興できる' },
      { ko: '코드 변환 시 코드톤으로 자연스럽게 도착하는 솔로 라인 구성', en: 'Can construct solo lines that naturally land on chord tones at changes', ja: 'コードチェンジ時にコードトーンに自然に到着するソロラインを構成できる' },
      { ko: '쉼(rest)을 음악적으로 활용하는 즉흥 가능', en: 'Can use rests musically in improvisation', ja: '休止（rest）を音楽的に活用した即興ができる' },
      { ko: 'Autumn Leaves 위에서 1코러스 즉흥 시도 가능', en: 'Can attempt 1 chorus improvisation over Autumn Leaves', ja: 'Autumn Leavesの上で1コーラス即興を試みられる' },
      { ko: '자신의 연주를 녹음해서 코드톤 도착 여부를 스스로 점검', en: 'Can record own playing and self-check chord tone arrivals', ja: '自分の演奏を録音してコードトーン到着を自己点検できる' },
    ],
    tools: ['metronome'],
  },
]

export const stages = [
  { number: 1, topics: topics.filter(t => t.stage === 1) },
  { number: 2, topics: topics.filter(t => t.stage === 2) },
  { number: 3, topics: topics.filter(t => t.stage === 3) },
  { number: 4, topics: topics.filter(t => t.stage === 4) },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find(t => t.slug === slug)
}

export function getTopicByOrder(order: number): Topic | undefined {
  return topics.find(t => t.order === order)
}

export function getNextTopic(currentOrder: number): Topic | undefined {
  return topics.find(t => t.order === currentOrder + 1)
}

export function getPrevTopic(currentOrder: number): Topic | undefined {
  return topics.find(t => t.order === currentOrder - 1)
}
