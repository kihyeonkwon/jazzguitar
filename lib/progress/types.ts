export interface TopicProgress {
  topicId: string
  completedCheckpoints: number[]
  started: boolean
  completed: boolean
  startedAt?: string
  completedAt?: string
}

export interface Progress {
  topics: Record<string, TopicProgress>
}
