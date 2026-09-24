'use client'

import { useEffect } from 'react'
import { LEADERBOARD_ENABLED, flushPending } from '@/lib/leaderboard/client'

// 오프라인에서 끝낸 라운드를 네트워크가 돌아오면 자동으로 올린다.
// 앱을 열 때 한 번, 그리고 online 이벤트마다.
export default function PendingSync() {
  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    const run = () => void flushPending()
    run()
    window.addEventListener('online', run)
    return () => window.removeEventListener('online', run)
  }, [])
  return null
}
