import type { Metadata } from 'next'
import { routing } from '@/lib/i18n/routing'
import type { Locale } from '@/lib/curriculum/types'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://jazzguitartree.com'

export const SITE_NAME = 'Jazz Guitar Tree'

const NAVER_SITE_VERIFICATION =
  'e8b4db747ec8a1b49b2bdce3e470c86c6167fc13'

export const HOME_TITLE =
  '재즈기타 독학·레슨 복습 시스템'

export const HOME_DESCRIPTION =
  '재즈기타 입문, 코드 보이싱, 스케일, 릭, 컴핑, 즉흥 연습을 Tree와 Train으로 정리한 한국어 재즈 기타 학습 시스템입니다.'

export const SEO_KEYWORDS = [
  '재즈기타',
  '재즈 기타',
  '재즈기타 독학',
  '재즈기타 레슨',
  '재즈 기타 입문',
  '재즈기타 코드',
  '재즈기타 스케일',
  '재즈기타 즉흥',
  '재즈기타 컴핑',
  '재즈 블루스 기타',
  '드롭2 코드',
  '드롭3 코드',
  '기타 코드 보이싱',
  '기타 스케일 연습',
  '기타 릭',
  'Jazz Guitar Tree',
  '재즈기타 트리',
]

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
}: {
  locale: Locale
  path?: string
  title: string
  description: string
  keywords?: string[]
  image?: string
}): Metadata {
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => LOCALE_OG[item as Locale])

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: SITE_NAME,
    keywords: [...SEO_KEYWORDS, ...keywords],
    alternates: {
      canonical: localePath(locale, path),
      languages: alternateLanguages(path),
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
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
          alt: `${SITE_NAME} 재즈기타 학습 시스템`,
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
