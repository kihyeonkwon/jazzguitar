'use client'

import { useEffect } from 'react'
import { LEADERBOARD_ENABLED, LEADERBOARD_EVENT, flushPending, syncHistory } from '@/lib/leaderboard/client'

// 계정과 이 브라우저의 기록을 맞춘다.
//  · 앱을 열 때와 네트워크가 돌아올 때: 오프라인에서 끝낸 라운드를 올리고, 계정의 최근 기록을 내려받는다
//  · 로그인·로그아웃·업로드 뒤(LEADERBOARD_EVENT): 계정의 기록을 다시 내려받는다
export default function PendingSync() {
  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    let busy = false
    const run = async (upload: boolean) => {
      if (busy) return
      busy = true
      try {
        if (upload) await flushPending()
        await syncHistory()
      } finally {
        busy = false
      }
    }
    const onOnline = () => void run(true)
    const onBoard = () => void run(false)
    void run(true)
    window.addEventListener('online', onOnline)
    window.addEventListener(LEADERBOARD_EVENT, onBoard)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener(LEADERBOARD_EVENT, onBoard)
    }
  }, [])
  return null
}
