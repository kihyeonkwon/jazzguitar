'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { Topic, Locale } from '@/lib/curriculum/types'
import { toggleCheckpoint } from '@/lib/progress/store'
import { useTopicProgress } from '@/lib/progress/hooks'
import { getNextTopic } from '@/lib/curriculum/data'

interface ChecklistProps {
  topic: Topic
}

export default function Checklist({ topic }: ChecklistProps) {
  const t = useTranslations('topic')
  const locale = useLocale() as Locale
  const progress = useTopicProgress(topic.id)
  const [justCompleted, setJustCompleted] = useState(false)

  const nextTopic = getNextTopic(topic.order)
  const checkedItems = progress.completedCheckpoints

  const handleToggle = (index: number) => {
    const next = checkedItems.includes(index)
      ? checkedItems.filter((i) => i !== index)
      : [...checkedItems, index]
    toggleCheckpoint(topic.id, index, topic.checkpoints.length)
    if (next.length === topic.checkpoints.length && checkedItems.length < topic.checkpoints.length) {
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 3000)
    }
  }

  const allDone = checkedItems.length === topic.checkpoints.length

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {topic.checkpoints.map((checkpoint, idx) => {
          const checked = checkedItems.includes(idx)
          return (
            <button
              key={idx}
              onClick={() => handleToggle(idx)}
              className={`w-full flex items-start gap-3 p-3 border text-left transition-all group ${
                checked
                  ? 'border-rule bg-surface-soft'
                  : 'border-rule bg-paper-bright hover:bg-surface'
              }`}
            >
              <div
                className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checked
                    ? 'bg-ink border-rule'
                    : 'bg-paper-bright border-rule'
                }`}
              >
                {checked && (
                  <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  checked ? 'text-ink-faint line-through' : 'text-ink'
                }`}
              >
                {checkpoint[locale]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1.5 flex-1 bg-surface-soft overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-500"
              style={{ width: `${(checkedItems.length / topic.checkpoints.length) * 100}%` }}
            />
          </div>
          <span className="text-ink-faint text-xs">
            {checkedItems.length}/{topic.checkpoints.length}
          </span>
        </div>
      </div>

      {allDone && (
        <div className=" p-4 text-center space-y-3 border border-rule bg-surface-soft">
          <div className="text-lg font-semibold text-ink">
            {justCompleted ? '🎸 ' : ''}{t('allCheckpointsDone')}
          </div>
          {nextTopic && (
            <Link
              href={`/topic/${nextTopic.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-ink text-ink-inv hover:bg-pink hover:text-ink transition-colors"
            >
              {t('proceedNext')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
