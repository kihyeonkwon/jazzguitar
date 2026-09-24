'use client'

import { useEffect } from 'react'

// 서비스 워커 등록 — 프로덕션에서만. 개발 중에는 캐시가 HMR을 방해한다.
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // 등록 실패는 조용히 넘긴다 — 사이트는 서비스 워커 없이도 그대로 동작한다
    })
  }, [])
  return null
}
