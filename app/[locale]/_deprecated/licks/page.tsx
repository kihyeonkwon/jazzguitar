import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import LicksClient from './LicksClient'
import { SectionHeader } from '@/components/ui'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  return buildPageMetadata({
    locale,
    path: '/licks',
    title: '재즈기타 릭 | 블루스·비밥 프레이즈 연습',
    description:
      '재즈기타 솔로에 바로 넣을 수 있는 블루스 릭과 비밥 프레이즈를 외우고 적용하는 연습 공간입니다.',
    keywords: ['재즈기타 릭', '재즈 블루스 릭', '기타 비밥 프레이즈'],
  })
}

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
