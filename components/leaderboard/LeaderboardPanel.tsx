'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { GameType } from '@/lib/train/games'
import {
  LEADERBOARD_ENABLED,
  LEADERBOARD_EVENT,
  fetchMyBest,
  fetchTop,
  getMe,
  type LeaderboardRow,
  type Me,
} from '@/lib/leaderboard/client'

interface Props {
  game: GameType
  limit?: number
}

// 순위표만. 가입·로그인은 헤더의 계정 자리와 라운드 결과 화면에 있다.
export default function LeaderboardPanel({ game, limit = 20 }: Props) {
  const t = useTranslations('rank')
  const tGames = useTranslations('games')
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null)
  const [me, setMe] = useState<Me | null>(null)
  const [mine, setMine] = useState<{ spc: number; rank: number } | null>(null)

  const refresh = useCallback(async () => {
    if (!LEADERBOARD_ENABLED) return
    const [top, who] = await Promise.all([fetchTop(game, limit), getMe()])
    setRows(top)
    setMe(who)
    setMine(who ? await fetchMyBest(game, who.profileId) : null)
  }, [game, limit])

  useEffect(() => {
    // 서버 기록을 불러와 화면 상태에 맞춘다 (외부 시스템과의 동기화)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh()
    window.addEventListener(LEADERBOARD_EVENT, refresh)
    return () => window.removeEventListener(LEADERBOARD_EVENT, refresh)
  }, [refresh])

  const inList = Boolean(me && rows?.some((r) => r.profile_id === me.profileId))

  return (
    <section className="border-t border-ink" aria-label={t('boardAria', { game: tGames(`${game}.title`) })}>
      <div className="flex items-center justify-between bg-ink px-4 py-2 font-mono text-[11px] uppercase text-ink-inv sm:px-6">
        <span>{t('top', { n: limit })}</span>
        <span className="text-ink-inv/60">{t('unit')}</span>
      </div>

      {!LEADERBOARD_ENABLED ? (
        <p className="label px-4 py-6 normal-case text-ink-faint sm:px-6">
          {t('offline')}
        </p>
      ) : (
        <ol className="font-mono text-xs">
          {rows === null && <li className="px-4 py-4 text-ink-faint sm:px-6">{t('loading')}</li>}
          {rows?.length === 0 && (
            <li className="px-4 py-6 text-ink-faint sm:px-6">{t('empty')}</li>
          )}
          {rows?.map((r, i) => (
            <Row key={r.profile_id} rank={i + 1} nickname={r.nickname} spc={r.spc} me={me?.profileId === r.profile_id} first={i === 0} />
          ))}
          {/* 내 기록이 목록 밖이면 맨 아래에 따로 보여준다 */}
          {me && mine && !inList && (
            <>
              <li aria-hidden className="px-4 py-1 text-center text-ink-quiet sm:px-6">⋮</li>
              <Row rank={mine.rank} nickname={me.nickname} spc={mine.spc} me />
            </>
          )}
        </ol>
      )}
    </section>
  )
}

function Row({
  rank,
  nickname,
  spc,
  me = false,
  first = false,
}: {
  rank: number
  nickname: string
  spc: number
  me?: boolean
  first?: boolean
}) {
  return (
    <li
      className={`grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-b border-ink/25 px-4 py-2 sm:px-6 ${
        me ? 'bg-pink' : first ? 'bg-blue' : ''
      }`}
    >
      <span className="tabular text-ink-faint">{String(rank).padStart(2, '0')}</span>
      <span className="truncate font-sans text-sm font-bold">{nickname}</span>
      <span className="font-sans text-lg font-semibold tabular tracking-[-0.04em]">{Number(spc).toFixed(2)}<span className="ml-0.5 font-mono text-[11px] font-normal tracking-normal text-ink-faint">s</span></span>
    </li>
  )
}
