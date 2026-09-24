'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { useSound } from '@/lib/audio/tones'
import { LEADERBOARD_ENABLED, LEADERBOARD_EVENT, getMe, openAccount, pendingCount } from '@/lib/leaderboard/client'

interface FooterStat {
  label: string
  value: string | number
  /** 실시간으로 바뀌는 주 지표(시간·SPC) — 계기판에서 더 넓은 칸을 차지한다 */
  live?: boolean
  unit?: string
}

interface DrillFrameProps {
  number: number
  eyebrow?: string
  title: string
  description?: string
  footerStats?: FooterStat[]
  wide?: boolean
  /** 공개 게임이면 창 위에 리더보드 링크를 단다 */
  drillType?: string
  /** 계기판 아래에 둘 보조 창 (예: 출제 범위 설정) */
  below?: React.ReactNode
  children: React.ReactNode
}

// 화면의 주인공은 게임 창 하나. 제목은 창 위 한 줄, 라운드 수치는 창 바로 아래 계기판.
// 기록·등급·리더보드는 여기 두지 않는다 — 리더보드와 가입은 /rank 에 있다.
export default function DrillFrame({
  number,
  eyebrow,
  title,
  description,
  footerStats,
  wide = false,
  drillType,
  below,
  children,
}: DrillFrameProps) {
  const t = useTranslations('game')

  return (
    <div className="bg-gray px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
      <div className={`mx-auto ${wide ? 'max-w-6xl' : 'max-w-3xl'}`}>
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h1 className="flex items-baseline gap-3">
            <span className="label">{`${eyebrow ?? t('eyebrow')} / ${String(number).padStart(2, '0')}`}</span>
            <span className="text-[15px] font-semibold tracking-[-0.03em] text-ink">{title}</span>
          </h1>
          {drillType && (
            <div className="flex shrink-0 items-baseline gap-4">
              <SoundToggle />
              <RankLink />
            </div>
          )}
        </div>

        <div className="space-y-8">{children}</div>

        {/* 계기판 — 창 바로 아래. 실시간 지표(시간·SPC)가 앞에 크게, 나머지는 그 뒤에 */}
        {footerStats && footerStats.length > 0 && (
          <dl className="mt-7 grid grid-cols-6 gap-px border-y border-ink bg-ink sm:flex">
            {footerStats.map((s) => (
              <div
                key={s.label}
                className={`flex flex-col gap-2 bg-gray px-2 py-3 sm:flex-row sm:items-end sm:justify-between sm:px-3 ${
                  s.live ? 'col-span-3 sm:flex-[1.35]' : 'col-span-2 sm:flex-1'
                }`}
              >
                <dt className="label text-ink-soft sm:pb-1">{s.label}</dt>
                <dd
                  className={`display tabular whitespace-nowrap leading-[0.9] text-ink ${
                    s.live ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-4xl'
                  }`}
                >
                  {s.value}
                  {s.unit && <span className="ml-1 font-mono text-[11px] font-normal tracking-normal text-ink-faint">{s.unit}</span>}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {description && (
          <p className="mt-4 break-keep text-[13px] leading-[1.7] text-ink-soft">{description}</p>
        )}

        {below && <div className="mt-10">{below}</div>}
      </div>
    </div>
  )
}

// 문제의 음을 들려줄지 — 켜 두면 청음 연습을 겸한다. 선택은 브라우저에 기억된다.
function SoundToggle() {
  const t = useTranslations('game')
  const { on, toggle } = useSound()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title={t('soundToggle')}
      // 토글은 호버에서 색을 뒤집지 않는다 — 누른 직후에도 켜짐/꺼짐이 그대로 보여야 한다
      className={`label flex items-center gap-1.5 border border-ink px-2 py-0.5 hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-x-px active:translate-y-px active:shadow-none ${
        on ? 'bg-pink text-ink' : 'bg-paper-bright text-ink-faint line-through decoration-1'
      }`}
    >
      <span aria-hidden>{on ? '♪' : '×'}</span>
      {on ? t('soundOn') : t('soundOff')}
    </button>
  )
}

// 창 위의 작은 리더보드 링크. 가입 전에 쌓인 기록이 있으면 "올리기"로 바뀌어 헤더의 계정 패널을 연다.
function RankLink() {
  const t = useTranslations('game')
  const [waiting, setWaiting] = useState(0)

  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    const sync = async () => setWaiting((await getMe()) ? 0 : pendingCount())
    void sync()
    window.addEventListener(LEADERBOARD_EVENT, sync)
    return () => window.removeEventListener(LEADERBOARD_EVENT, sync)
  }, [])

  if (waiting > 0) {
    return (
      <button type="button" onClick={() => openAccount('join')} className="label arrow-shift shrink-0 bg-pink px-2 py-0.5 text-ink">
        {t('pendingNudge', { n: waiting })} <span className="arrow">→</span>
      </button>
    )
  }

  return (
    <Link href="/rank" className="label arrow-shift shrink-0 hover:underline">
      {t('rank')} <span className="arrow">→</span>
    </Link>
  )
}
