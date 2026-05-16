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
