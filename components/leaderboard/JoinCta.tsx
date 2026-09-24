'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LEADERBOARD_ENABLED, LEADERBOARD_EVENT, getMe, openAccount } from '@/lib/leaderboard/client'

// /rank 머리말의 참가 버튼 — 헤더의 계정 패널을 연다. 로그인돼 있으면 닉네임만 보여준다.
export default function JoinCta() {
  const t = useTranslations('rank')
  const [nickname, setNickname] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    const sync = async () => setNickname((await getMe())?.nickname ?? null)
    void sync()
    window.addEventListener(LEADERBOARD_EVENT, sync)
    return () => window.removeEventListener(LEADERBOARD_EVENT, sync)
  }, [])

  if (!LEADERBOARD_ENABLED || nickname === undefined) return null

  return nickname ? (
    <p className="label text-ink-soft">
      {t('playingAs')} <span className="font-sans text-[13px] font-bold normal-case text-ink">{nickname}</span>
    </p>
  ) : (
    <button type="button" onClick={() => openAccount('join')} className="btn-rect w-full sm:w-auto">
      <span>{t('joinLogin')}</span>
      <span aria-hidden>→</span>
    </button>
  )
}
