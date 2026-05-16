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

export interface Leaf {
  id: string
  slug: string
  trunkSlug: TrunkSlug
  order: number
  title: I18n
  description: I18n
  selfCheck: I18n[]
  relatedTipSlugs: string[]
  relatedBackingTrackIds: string[]
  relatedPrincipleSlugs: string[]
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
