import type { Metadata } from 'next'
import CurriculumPageClient from './CurriculumPageClient'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  return buildPageMetadata({
    locale,
    path: '/curriculum',
    title: '재즈기타 커리큘럼 | 코드·스케일·릭·컴핑 학습 지도',
    description:
      '재즈기타 입문자가 코드, 스케일, 릭, 컴핑, 레퍼토리를 어떤 순서로 배워야 하는지 Tree 구조로 정리한 커리큘럼입니다.',
    keywords: ['재즈기타 커리큘럼', '재즈기타 배우는 순서', '재즈기타 입문 과정'],
  })
}

export default function CurriculumPage() {
  return <CurriculumPageClient />
}
