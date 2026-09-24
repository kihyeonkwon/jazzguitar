// 재즈 구구단 서비스 워커 — 설치 요건을 채우고, 한 번 연 페이지는 지하철에서도 열리게 한다.
//  · 해시가 붙은 정적 파일(/_next/static)은 캐시 우선 (내용이 바뀌면 주소도 바뀐다)
//  · 페이지 이동은 네트워크 우선, 끊겼을 때만 마지막으로 본 사본
//  · Supabase 등 다른 출처 요청은 건드리지 않는다
const VERSION = 'v1'
const STATIC = `static-${VERSION}`
const PAGES = `pages-${VERSION}`

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== STATIC && k !== PAGES).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/') || url.pathname.startsWith('/fonts/')) {
    event.respondWith(
      caches.open(STATIC).then(async (cache) => {
        const hit = await cache.match(request)
        if (hit) return hit
        const res = await fetch(request)
        if (res.ok) cache.put(request, res.clone())
        return res
      })
    )
    return
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.open(PAGES).then(async (cache) => {
        try {
          const res = await fetch(request)
          if (res.ok) cache.put(request, res.clone())
          return res
        } catch {
          const hit = await cache.match(request)
          if (hit) return hit
          // 이 주소는 처음이면 시작 화면이라도 보여 준다
          const home = await cache.match('/ko/train')
          return home ?? Response.error()
        }
      })
    )
  }
})
