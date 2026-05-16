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
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gray-200 bg-gray-50 text-gray-700">
              {stage.number}
            </div>
            <div>
              <div className="text-gray-900 font-semibold text-sm">
                {stagesT(`${stage.number}.name` as `1.name`)}
              </div>
              <div className="text-gray-400 text-xs">
                {stagesT(`${stage.number}.subtitle` as `1.subtitle`)}
              </div>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-gray-200 pl-6 space-y-2">
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
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-gray-50 ${
                      isCompleted
                        ? 'border-gray-300 bg-gray-50'
                        : isInProgress
                        ? 'border-gray-300 bg-white'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                        isCompleted
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isCompleted ? '✓' : topic.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm truncate ${
                          isCompleted
                            ? 'text-gray-900 font-medium'
                            : isInProgress
                            ? 'text-gray-900 font-medium underline'
                            : 'text-gray-700'
                        }`}
                      >
                        {topic.title[locale]}
                      </div>
                      <div className="text-gray-400 text-xs truncate">
                        {topic.description[locale]}
                      </div>
                    </div>
                    {isInProgress && !isCompleted && (
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0 border border-gray-300 text-gray-500">
                        {t('inProgress')}
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0 border border-gray-200 text-gray-400">
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
