import { getTranslations } from 'next-intl/server'
import { getLocale } from 'next-intl/server'
import { topics, stages } from '@/lib/curriculum/data'
import DashboardClient from './DashboardClient'

export default async function HomePage() {
  const t = await getTranslations('home')
  const locale = await getLocale()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Hero */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {t('title')}
        </h1>
        <p className="text-gray-500">{t('subtitle')}</p>
      </div>

      <DashboardClient locale={locale} totalTopics={topics.length} stages={stages} />
    </div>
  )
}
