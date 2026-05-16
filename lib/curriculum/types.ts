export type Locale = 'ko' | 'en' | 'ja'
export type LocaleRecord = Record<Locale, string>

export type ToolType = 'metronome' | 'sheet-music' | 'chord-diagram' | 'audio-player'

export interface Exercise {
  title: LocaleRecord
  description: LocaleRecord
  bpm?: number
  abcNotation?: string
}

export interface Topic {
  id: string
  slug: string
  stage: number
  order: number
  title: LocaleRecord
  description: LocaleRecord
  theory: {
    content: LocaleRecord
    abcNotation?: string
    chords?: string[]
  }
  practice: {
    exercises: Exercise[]
  }
  checkpoints: LocaleRecord[]
  tools: ToolType[]
}

export interface Stage {
  number: number
  nameKey: string
  topics: Topic[]
}

// === Organic learning model ===

export type I18n = LocaleRecord

export type TrunkSlug =
  | 'foundation'
  | 'blues'
  | 'harmony-comping'
  | 'soloing'
  | 'ear-training'
  | 'standards'
  | 'artists'

export interface Trunk {
  id: string
  slug: TrunkSlug
  order: number
  emoji: string
  color: string
  title: I18n
  description: I18n
  leafIds: string[]
}

// ─── Leveled checkpoints ──────────────────────────────────────────────────
// 한 잎의 학습 진도를 4단계로 나눠 0~100점으로 측정합니다.
//   Bronze  — 입문: 일단 가능. weight 30
//   Silver  — 기본: 안정적. weight 30
//   Gold    — 중급: 음악적. weight 25
//   Master  — 마스터: 자유로움. weight 15

export type CheckpointLevel = 'Bronze' | 'Silver' | 'Gold' | 'Master'

export interface CheckpointGroup {
  level: CheckpointLevel
  weight: number          // 합 = 100
  items: I18n[]           // 3-5개 체크 항목
}

// ─── Lick (2-4 마디 음악 단위) ──────────────────────────────────────────
// 외워서 솔로에 인용할 짧은 어휘. 한 잎에 1-3개 권장.
export interface LickSnippet {
  id: string
  leafSlug: string
  bars: number              // 보통 2-4
  context: I18n             // 어떤 진행에 쓰나 (예: "Dm7-G7-Cmaj7")
  abcNotation: string       // 재생 가능한 ABC
  source?: I18n             // 출처/스타일 (예: "Kenny Burrell · Chitlins Con Carne")
}

// ─── Quick Drill (잎 내장 미니 드릴) ────────────────────────────────────
// 잎이 미션이 됐을 때 보여줄 5문제 짜리 워밍업 명세.
// 기존 드릴 타입을 잎의 컨텍스트에 맞게 파라미터화한 것.
export interface QuickDrill {
  kind:
    | 'chord-notes'         // 코드 구성음 맞히기 (예: Bb Mixo 음)
    | 'scale-notes'         // 스케일 구성음 맞히기
    | 'interval'            // 인터벌 청음
    | 'chord-quality'       // 코드 퀄리티 청음
  // 자유 파라미터: 컴포넌트가 해석
  params: Record<string, string | number | string[]>
  questionCount: number     // 보통 5
  passingScore?: number     // 0-100, 기본 80
}

export interface Leaf {
  id: string
  slug: string
  trunkSlug: TrunkSlug
  order: number
  title: I18n
  description: I18n

  // ─ 새 통합 구조 ─
  theory?: {
    content: I18n          // markdown 본문 (블로그 톤)
    abcNotation?: string   // 핵심 악보 예시
  }
  practice?: {
    exercises: Exercise[]
    backingTrackIds: string[]
  }
  checkpoints?: CheckpointGroup[]   // Bronze/Silver/Gold/Master 4 레벨

  // ─ Mission Runner용 ─
  mission?: I18n                  // 오늘의 한 문장 ("IV7에서 Bb Mixolydian 색깔 내기")
  licks?: LickSnippet[]           // 외울 짧은 어휘 (1-3개)
  quickDrill?: QuickDrill         // 잎과 연결된 5문제 미니 드릴

  // ─ 레거시 (점진적으로 폐기) ─
  selfCheck: I18n[]
  relatedTipSlugs: string[]
  relatedBackingTrackIds: string[]
  relatedPrincipleSlugs: string[]
}

// ─── 세션 종료 시 universal 4 체크 ───────────────────────────────────────
export type RecordCheckKey = 'form' | 'silence' | 'lick' | 'landing'

// 레벨 → 가중치 (기본값)
export const LEVEL_WEIGHTS: Record<CheckpointLevel, number> = {
  Bronze: 30,
  Silver: 30,
  Gold:   25,
  Master: 15,
}

export interface Tip {
  slug: string
  title: I18n
  summary: I18n
  content: I18n
  trunkSlugs: TrunkSlug[]
  suggestedBackingTrackId?: string
}

export interface BackingTrackChord {
  chord: string
  beats: number
}

export interface BackingTrack {
  id: string
  name: I18n
  key: string
  bpm: number
  style: 'blues' | 'standard' | 'modal' | 'bossa'
  bars: number
  chords: BackingTrackChord[]
  loopCount?: number
}

export interface Principle {
  slug: string
  title: I18n
  content: I18n
  abcNotation?: string
  trunkSlugs: TrunkSlug[]
}

// ─── Practice Engine ──────────────────────────────────────────────────────

export type PracticeStepKind =
  | 'listen'        // 시스템이 예시 재생
  | 'echo'          // 백킹 트랙 위에서 따라하기
  | 'apply'         // 곡/맥락에 적용
  | 'compose'       // 짧은 즉흥 만들기
  | 'reflect'       // 자가평가 단계

export interface PracticeStep {
  kind: PracticeStepKind
  title: I18n
  prompt: I18n               // 한 문장 지시
  durationSec: number        // 권장 시간 (사용자 자유롭게 넘어갈 수 있음)
  abcNotation?: string       // 음악 예시 (listen 단계)
  backingTrackId?: string    // 백킹 (echo/apply)
  hint?: I18n
}

export interface PracticeProtocol {
  id: string
  leafSlug: string           // 어느 잎에 속하는지
  name: I18n                 // "Hear → Echo → Apply"
  description: I18n
  estimatedMin: number
  steps: PracticeStep[]
}

// Leitner box rating
export type Rating = 1 | 2 | 3 | 4 | 5
export type LeitnerBox = 1 | 2 | 3 | 4 | 5

export interface PracticeRecord {
  leafSlug: string
  protocolId: string
  ratedAt: string            // ISO timestamp
  rating: Rating
  box: LeitnerBox
  nextReviewAt: string       // ISO timestamp
}
