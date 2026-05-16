import { notFound } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { getTopicBySlug, getNextTopic, getPrevTopic } from '@/lib/curriculum/data'
import { Locale } from '@/lib/curriculum/types'
import TopicTabs from './TopicTabs'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const t = await getTranslations('topic')
  const locale = await getLocale() as Locale

  const topic = getTopicBySlug(slug)
  if (!topic) notFound()

  const prevTopic = getPrevTopic(topic.order)
  const nextTopic = getNextTopic(topic.order)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevTopic ? (
          <Link
            href={`/topic/${prevTopic.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('prevTopic')}
          </Link>
        ) : (
          <div />
        )}
        {nextTopic ? (
          <Link
            href={`/topic/${nextTopic.slug}`}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            {t('nextTopic')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="text-xs font-medium uppercase tracking-widest text-gray-400">
          Stage {topic.stage} · #{topic.order}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{topic.title[locale]}</h1>
        <p className="text-gray-500">{topic.description[locale]}</p>
      </div>

      <TopicTabs topic={topic} locale={locale} />
    </div>
  )
}
