'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { Topic, Locale } from '@/lib/curriculum/types'
import { getTopicProgress, toggleCheckpoint } from '@/lib/progress/store'
import { getNextTopic } from '@/lib/curriculum/data'

interface ChecklistProps {
  topic: Topic
}

export default function Checklist({ topic }: ChecklistProps) {
  const t = useTranslations('topic')
  const locale = useLocale() as Locale
  const [checkedItems, setCheckedItems] = useState<number[]>([])
  const [justCompleted, setJustCompleted] = useState(false)

  const nextTopic = getNextTopic(topic.order)

  useEffect(() => {
    const progress = getTopicProgress(topic.id)
    setCheckedItems(progress.completedCheckpoints)
  }, [topic.id])

  const handleToggle = (index: number) => {
    toggleCheckpoint(topic.id, index, topic.checkpoints.length)
    setCheckedItems((prev) => {
      const next = prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      if (next.length === topic.checkpoints.length && prev.length < topic.checkpoints.length) {
        setJustCompleted(true)
        setTimeout(() => setJustCompleted(false), 3000)
      }
      return next
    })
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
              className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all group ${
                checked
                  ? 'border-gray-300 bg-gray-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checked
                    ? 'bg-gray-900 border-gray-900'
                    : 'bg-white border-gray-300'
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
                  checked ? 'text-gray-400 line-through' : 'text-gray-700'
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
          <div className="h-1.5 flex-1 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gray-900 transition-all duration-500"
              style={{ width: `${(checkedItems.length / topic.checkpoints.length) * 100}%` }}
            />
          </div>
          <span className="text-gray-400 text-xs">
            {checkedItems.length}/{topic.checkpoints.length}
          </span>
        </div>
      </div>

      {allDone && (
        <div className="rounded-lg p-4 text-center space-y-3 border border-gray-200 bg-gray-50">
          <div className="text-lg font-semibold text-gray-900">
            {justCompleted ? '🎸 ' : ''}{t('allCheckpointsDone')}
          </div>
          {nextTopic && (
            <Link
              href={`/topic/${nextTopic.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
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
