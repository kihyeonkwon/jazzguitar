'use client'

import { useEffect, useRef, useState } from 'react'

export interface LiveStats {
  /** 경과 시간(초) */
  sec: number
  /** 지금까지 정답 하나에 걸린 초 — 첫 정답 전에는 null */
  spc: number | null
}

/**
 * 타자 연습처럼 라운드 도중 실시간으로 바뀌는 경과 시간과 SPC.
 * read()는 0.1초마다 불려서 지금의 경과 시간(ms)과 이번 라운드 정답 수를 돌려준다
 * (게임이 ref에 들고 있는 값을 읽는다). active가 꺼지면 마지막 값에서 멈춘다.
 */
export function useLiveStats(active: boolean, read: () => { elapsedMs: number; correct: number }): LiveStats {
  const [live, setLive] = useState<LiveStats>({ sec: 0, spc: null })
  const readRef = useRef(read)

  useEffect(() => {
    readRef.current = read
  })

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      const { elapsedMs, correct } = readRef.current()
      const sec = Math.max(0, elapsedMs / 1000)
      setLive({ sec, spc: correct > 0 ? sec / correct : null })
    }, 100)
    return () => clearInterval(id)
  }, [active])

  return live
}

export function formatSec(sec: number): string {
  return sec.toFixed(1)
}

export function formatSpc(spc: number | null): string {
  return spc === null ? '—' : spc.toFixed(2)
}
