import { getTranslations } from 'next-intl/server'
import LicksClient from './LicksClient'
import { SectionHeader } from '@/components/ui'

export default async function LicksPage() {
  const t = await getTranslations('licks')
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <SectionHeader
        number={0}
        eyebrow="Licks"
        title={t('title')}
        description={t('subtitle')}
      />
      <LicksClient />
    </div>
  )
}
