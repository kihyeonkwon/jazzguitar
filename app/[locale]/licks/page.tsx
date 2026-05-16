import { getTranslations } from 'next-intl/server'
import LicksClient from './LicksClient'

export default async function LicksPage() {
  const t = await getTranslations('licks')
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="space-y-2 mb-10">
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-500">{t('subtitle')}</p>
      </div>
      <LicksClient />
    </div>
  )
}
