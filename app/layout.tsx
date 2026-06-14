import type { Metadata } from 'next'
import './globals.css'
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  verificationMetadata,
} from '@/lib/seo'

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
    apple: '/icon.svg',
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
        alt: 'Jazz Guitar Tree 재즈기타 학습 시스템',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(45,58,49,0.48) 1px, transparent 0)',
            backgroundSize: '6px 6px',
          }}
        />
        {children}
      </body>
    </html>
  )
}
