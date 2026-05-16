import { getTranslations } from 'next-intl/server'
import CurriculumPageClient from './CurriculumPageClient'

export default async function CurriculumPage() {
  const t = await getTranslations('curriculum')

  return (
    <div className="relative">
      {/* Overlay header */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{t('subtitle')}</p>
      </div>
      <CurriculumPageClient />
    </div>
  )
}
