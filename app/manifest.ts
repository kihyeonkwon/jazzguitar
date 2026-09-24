import type { MetadataRoute } from 'next'
import { HOME_DESCRIPTION, SITE_NAME } from '@/lib/seo'

// 홈 화면에 설치할 때 쓰는 웹 앱 매니페스트. 시작 주소는 언어 분기(proxy)가 알아서 고른다.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: HOME_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#fefefe',
    theme_color: '#1e1e1e',
    lang: 'ko',
    categories: ['education', 'music'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
    shortcuts: [
      { name: '도수 구구단', url: '/train/degree-id', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: '코드 구구단', url: '/train/chord-construction', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
      { name: '스케일 구구단', url: '/train/scale-construction', icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }] },
    ],
  }
}
