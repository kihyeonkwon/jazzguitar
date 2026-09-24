import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  verificationMetadata,
} from '@/lib/seo'
import RegisterServiceWorker from '@/components/pwa/RegisterServiceWorker'

// Helvetica Neue가 없는 기기용 그로테스크 + 작은 라벨용 모노스페이스 (globals.css의 --font-* 가 참조)
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  category: 'education',
  keywords: SEO_KEYWORDS,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  verification: verificationMetadata(),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    // iOS 홈 화면용 — 직접 적은 icons 가 파일 규칙(app/apple-icon.png)의 자동 링크를 덮어쓰므로 여기 명시
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  // 홈 화면에 설치했을 때 (iOS는 매니페스트 대신 이 메타 태그를 본다)
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    locale: 'ko_KR',
    images: [
      {
        url: '/assets/landing/tree-workspace.png',
        width: 1672,
        height: 941,
        alt: '재즈 구구단 — 악기 없이 하는 재즈 암산 훈련',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/assets/landing/tree-workspace.png'],
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

// 메뉴바와 같은 잉크색 — 설치한 앱의 상단 표시줄 색
export const viewport: Viewport = {
  themeColor: '#1e1e1e',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  )
}
