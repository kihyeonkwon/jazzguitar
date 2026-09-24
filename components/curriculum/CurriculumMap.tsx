'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { stages } from '@/lib/curriculum/data'
import { useCompletedTopicIds, useStartedTopicIds } from '@/lib/progress/hooks'
import { Locale } from '@/lib/curriculum/types'

export default function CurriculumMap() {
  const t = useTranslations('curriculum')
  const stagesT = useTranslations('stages')
  const locale = useLocale() as Locale
  const completedIds = useCompletedTopicIds()
  const startedIds = useStartedTopicIds()

  return (
    <div className="space-y-8">
      {stages.map((stage) => (
        <div key={stage.number} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-sm font-bold border border-rule bg-surface-soft text-ink">
              {stage.number}
            </div>
            <div>
              <div className="text-ink font-semibold text-sm">
                {stagesT(`${stage.number}.name` as `1.name`)}
              </div>
              <div className="text-ink-faint text-xs">
                {stagesT(`${stage.number}.subtitle` as `1.subtitle`)}
              </div>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-rule pl-6 space-y-2">
            {stage.topics.map((topic) => {
              const isCompleted = completedIds.includes(topic.id)
              const isInProgress = startedIds.includes(topic.id)

              return (
                <Link
                  key={topic.id}
                  href={`/topic/${topic.slug}`}
                  className="block group"
                >
                  <div
                    className={`flex items-center gap-3 p-3 border transition-all hover:bg-surface ${
                      isCompleted
                        ? 'border-rule bg-surface-soft'
                        : isInProgress
                        ? 'border-rule bg-paper-bright'
                        : 'border-rule bg-paper-bright'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-xs font-mono shrink-0 ${
                        isCompleted
                          ? 'bg-ink text-ink-inv'
                          : 'bg-surface-soft text-ink-faint'
                      }`}
                    >
                      {isCompleted ? '✓' : topic.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm truncate ${
                          isCompleted
                            ? 'text-ink font-medium'
                            : isInProgress
                            ? 'text-ink font-medium underline'
                            : 'text-ink'
                        }`}
                      >
                        {topic.title[locale]}
                      </div>
                      <div className="text-ink-faint text-xs truncate">
                        {topic.description[locale]}
                      </div>
                    </div>
                    {isInProgress && !isCompleted && (
                      <span className="text-xs px-2 py-0.5 shrink-0 border border-rule text-ink-soft">
                        {t('inProgress')}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs px-2 py-0.5 shrink-0 border border-rule text-ink-faint">
                        {t('completed')}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
