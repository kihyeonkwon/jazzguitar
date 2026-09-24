'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { useCompletedTopicIds, useStartedTopicIds } from '@/lib/progress/hooks'
import { topics } from '@/lib/curriculum/data'
import { Locale } from '@/lib/curriculum/types'

interface Stage {
  number: number
  topics: typeof topics
}

interface Props {
  locale: string
  totalTopics: number
  stages: Stage[]
}

export default function DashboardClient({ locale, totalTopics, stages }: Props) {
  const t = useTranslations('home')
  const stagesT = useTranslations('stages')
  const completedIds = useCompletedTopicIds()
  const startedIds = useStartedTopicIds()

  const currentTopicId = startedIds[startedIds.length - 1] ?? (completedIds.length < totalTopics ? topics[completedIds.length]?.id : null)
  const currentTopic = currentTopicId ? topics.find(t => t.id === currentTopicId) : topics[0]

  const completionPct = Math.round((completedIds.length / totalTopics) * 100)

  const loc = locale as Locale

  return (
    <div className="space-y-8">
      {/* Current Topic */}
      {currentTopic && (
        <div className=" p-6 border border-rule bg-surface-soft space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-ink-faint">
              {t('currentTopic')}
            </span>
            <span className="text-xs px-2 py-1 bg-surface-soft text-ink-soft border border-rule">
              Stage {currentTopic.stage}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">
              {currentTopic.title[loc]}
            </h2>
            <p className="text-ink-soft mt-1 text-sm">{currentTopic.description[loc]}</p>
          </div>
          <Link
            href={`/topic/${currentTopic.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-ink text-ink-inv hover:bg-pink hover:text-ink transition-colors"
          >
            {completedIds.includes(currentTopic.id) ? t('continueLearning') : t('startLearning')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}

      {/* Overall Progress */}
      <div className=" p-5 border border-rule bg-paper-bright space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-ink-soft text-sm">{t('overallProgress')}</span>
          <span className="text-ink text-sm font-medium">
            {completedIds.length}/{totalTopics} {t('topicsCompleted')}
          </span>
        </div>
        <div className="h-2 bg-surface-soft overflow-hidden">
          <div
            className="h-full bg-ink transition-all duration-700"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="text-right text-xs text-ink-faint">{completionPct}%</div>
      </div>

      {/* Stage Cards */}
      <div>
        <h3 className="text-sm font-medium text-ink-faint uppercase tracking-widest mb-4">
          {t('stageProgress')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stages.map((stage) => {
            const stageCompleted = stage.topics.filter(t => completedIds.includes(t.id)).length
            const pct = Math.round((stageCompleted / stage.topics.length) * 100)
            return (
              <div
                key={stage.number}
                className=" p-4 border border-rule bg-paper-bright space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink">
                    S{stage.number}
                  </span>
                  <span className="text-ink-faint text-xs">{stageCompleted}/{stage.topics.length}</span>
                </div>
                <div className="text-xs text-ink font-medium leading-tight">
                  {stagesT(`${stage.number}.name` as `1.name`)}
                </div>
                <div className="h-1 bg-surface-soft overflow-hidden">
                  <div
                    className="h-full bg-ink"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recently Completed */}
      {completedIds.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-ink-faint uppercase tracking-widest mb-4">
            {t('recentlyCompleted')}
          </h3>
          <div className="space-y-2">
            {completedIds
              .slice(-3)
              .reverse()
              .map((id) => {
                const topic = topics.find(t => t.id === id)
                if (!topic) return null
                return (
                  <Link
                    key={id}
                    href={`/topic/${topic.slug}`}
                    className="flex items-center gap-3 p-3 border border-rule hover:bg-surface transition-colors"
                  >
                    <div className="w-6 h-6 bg-ink flex items-center justify-center text-xs text-ink-inv">
                      ✓
                    </div>
                    <span className="text-sm text-ink">{topic.title[loc]}</span>
                  </Link>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
