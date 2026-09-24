import type { Metadata } from 'next'
import { routing } from '@/lib/i18n/routing'
import type { Locale } from '@/lib/curriculum/types'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://jazzguitartree.com'

export const SITE_NAME = '재즈 구구단'

const NAVER_SITE_VERIFICATION =
  'e8b4db747ec8a1b49b2bdce3e470c86c6167fc13'

export const HOME_TITLE =
  '도수·코드·스케일 암산 훈련'

export const HOME_DESCRIPTION =
  '도수(인터벌), 코드 구성음, 스케일 구성음을 악기 없이 머리로 푸는 재즈 구구단 3종. 정답 하나에 걸린 시간, 반응속도로 실력을 잽니다.'

export const SEO_KEYWORDS = [
  '재즈 구구단',
  '재즈 이론 연습',
  '재즈 즉흥연주 연습',
  '코드 구성음',
  '코드톤 외우기',
  '스케일 구성음',
  '인터벌 도수 연습',
  '악기 없이 재즈 연습',
  '재즈 입문',
  '실용음악 입시 연습',
]

export const LOCALE_BCP47: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en',
  ja: 'ja-JP',
}

const LOCALE_OG: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  ja: 'ja_JP',
}

export function asLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale
}

export function localePath(locale: Locale, path = '') {
  const cleanPath = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

export function absoluteUrl(locale: Locale, path = '') {
  return `${SITE_URL}${localePath(locale, path)}`
}

export function alternateLanguages(path = '') {
  return {
    ko: localePath('ko', path),
    en: localePath('en', path),
    ja: localePath('ja', path),
    'x-default': localePath(routing.defaultLocale, path),
  }
}

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  keywords = [],
  image = '/assets/landing/tree-workspace.png',
  siteName = SITE_NAME,
  imageAlt,
}: {
  locale: Locale
  path?: string
  title: string
  description: string
  keywords?: string[]
  image?: string
  /** 로케일별 사이트 이름 (messages의 site.name) */
  siteName?: string
  imageAlt?: string
}): Metadata {
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => LOCALE_OG[item as Locale])

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: siteName,
    // 한국어 검색어 묶음은 한국어 페이지에만 붙인다
    keywords: locale === 'ko' ? [...SEO_KEYWORDS, ...keywords] : keywords,
    alternates: {
      canonical: localePath(locale, path),
      languages: alternateLanguages(path),
    },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: localePath(locale, path),
      locale: LOCALE_OG[locale],
      alternateLocale,
      images: [
        {
          url: image,
          width: 1672,
          height: 941,
          alt: imageAlt ?? siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export function verificationMetadata(): Metadata['verification'] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const naver =
    process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? NAVER_SITE_VERIFICATION

  if (!google && !naver) return undefined

  return {
    ...(google ? { google } : {}),
    ...(naver
      ? {
          other: {
            'naver-site-verification': naver,
          },
        }
      : {}),
  }
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
