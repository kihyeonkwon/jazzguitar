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
import PendingSync from '@/components/leaderboard/PendingSync'

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
    // iOS 시작 화면. 직접 주면 iOS가 만드는 '아이콘 + 앱 이름' 화면 대신 이 그림만 보여 준다
    startupImage: [
      { url: '/splash/1320x2868.png', media: 'screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1290x2796.png', media: 'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1206x2622.png', media: 'screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1260x2736.png', media: 'screen and (device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1179x2556.png', media: 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1284x2778.png', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1170x2532.png', media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1125x2436.png', media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/1242x2688.png', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/828x1792.png', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1242x2208.png', media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)' },
      { url: '/splash/750x1334.png', media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/2064x2752.png', media: 'screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/2048x2732.png', media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1668x2420.png', media: 'screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1668x2388.png', media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1640x2360.png', media: 'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1620x2160.png', media: 'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1668x2224.png', media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
      { url: '/splash/1536x2048.png', media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)' },
    ],
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
        <PendingSync />
      </body>
    </html>
  )
}
