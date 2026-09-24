'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import AccountModal from '@/components/leaderboard/AccountModal'
import { IconPlay } from '@/components/icons'
import { LEADERBOARD_ENABLED, LEADERBOARD_EVENT, getMe } from '@/lib/leaderboard/client'

interface Props {
  onStart: () => void
  /** 한 라운드의 문제 수 — 안내 문구에 쓴다 */
  questions: number
}

const BUTTON =
  'display border border-ink px-7 py-3 text-2xl leading-none shadow-[4px_4px_0_var(--color-ink)] transition-colors duration-100 hover:bg-ink hover:text-ink-inv active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--color-ink)]'

// 게임 시작 전: 창의 본문을 흐린 점 장막으로 덮고 시작 · 로그인 두 버튼을 가운데 띄운다.
// 부모의 본문 컨테이너는 `relative` 여야 한다.
export default function StartOverlay({ onStart, questions }: Props) {
  const t = useTranslations('game')
  const [accountOpen, setAccountOpen] = useState(false)
  const [nickname, setNickname] = useState<string | null>(null)

  // 로그인 상태 — 두 번째 버튼이 "로그인"인지 닉네임인지 결정한다
  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    const sync = async () => setNickname((await getMe())?.nickname ?? null)
    void sync()
    window.addEventListener(LEADERBOARD_EVENT, sync)
    return () => window.removeEventListener(LEADERBOARD_EVENT, sync)
  }, [])

  // Enter로도 시작 (모달이 열려 있거나 입력 중일 때는 제외)
  useEffect(() => {
    if (accountOpen) return
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (e.key === 'Enter' && tag !== 'INPUT' && tag !== 'BUTTON' && tag !== 'A') onStart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [accountOpen, onStart])

  return (
    <>
      <div className="dither-dense absolute inset-0 z-10 grid place-items-center text-paper">
        <div className="text-center text-ink">
          <div className="flex flex-wrap items-stretch justify-center gap-3">
            <button type="button" onClick={onStart} className={`${BUTTON} flex items-center gap-2.5 bg-pink`}>
              <IconPlay size={16} />
              {t('start')}
            </button>
            {LEADERBOARD_ENABLED &&
              (nickname ? (
                <span className="flex items-center border border-ink bg-paper-bright px-5 py-3 font-mono text-[11px] uppercase">
                  {t('playingAs')}&nbsp;
                  <span className="font-sans text-[14px] font-semibold normal-case">{nickname}</span>
                </span>
              ) : (
                <button type="button" onClick={() => setAccountOpen(true)} className={`${BUTTON} bg-paper-bright`}>
                  {t('login')}
                </button>
              ))}
          </div>
          <p className="label mt-4 inline-block bg-paper-bright px-2 py-0.5 normal-case">
            {t('startHint', { n: questions })}
            {!nickname && LEADERBOARD_ENABLED ? t('startHintLogin') : ''}
          </p>
        </div>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  )
}
