import type { Metadata } from 'next'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  return buildPageMetadata({
    locale,
    path: '/train',
    title: '재즈기타 Train | 스케일·코드·지판 기본기 훈련',
    description:
      '재즈기타 스케일 구성음, 코드톤, 지판 음, 드롭 보이싱을 짧은 라운드로 확인하는 기본기 훈련 도구입니다.',
    keywords: ['재즈기타 연습', '재즈기타 스케일 연습', '재즈기타 코드 연습', '지판 음 외우기'],
  })
}

export { default } from '../drill/page'
