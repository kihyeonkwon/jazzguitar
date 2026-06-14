import type { Metadata } from 'next'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string; type: string }>
}

const TYPE_LABELS: Record<string, string> = {
  'fretboard-find': '지판 음 찾기',
  'interval-ear': '인터벌 청음',
  'chord-quality-ear': '코드 퀄리티 청음',
  'voicing-find': '보이싱 찾기',
  'chord-tone-id': '코드톤 식별',
  'chord-construction': '코드 구성음',
  'scale-construction': '스케일 구성음',
  'drop-voicing-misty': '드롭2 드롭3 보이싱',
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, type } = await params
  const locale = asLocale(rawLocale)
  const label = TYPE_LABELS[type] ?? '기본기'

  return buildPageMetadata({
    locale,
    path: `/train/${type}`,
    title: `재즈기타 ${label} Train | 빠른 기본기 확인`,
    description:
      `${label} 항목을 짧은 문제와 즉각적인 피드백으로 확인하는 재즈기타 기본기 훈련입니다.`,
    keywords: [`재즈기타 ${label}`, '재즈기타 훈련', '재즈기타 연습 도구'],
  })
}

export { default } from '../../drill/[type]/page'
