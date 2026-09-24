'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import AccountForm from './AccountForm'
import {
  LEADERBOARD_ENABLED,
  LEADERBOARD_EVENT,
  OPEN_ACCOUNT_EVENT,
  getMe,
  logout,
  pendingCount,
  type Me,
} from '@/lib/leaderboard/client'

// 헤더의 계정 자리 — 사이트에서 로그인·로그아웃하는 유일한 곳.
// (가입은 라운드 결과 화면에서도 받는다.)
export default function AccountMenu() {
  const t = useTranslations('account')
  const [me, setMe] = useState<Me | null>(null)
  const [pending, setPending] = useState(0)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'join' | 'login'>('login')
  const ref = useRef<HTMLDivElement>(null)

  const sync = useCallback(async () => {
    setMe(await getMe())
    setPending(pendingCount())
  }, [])

  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    // 서버의 로그인 상태를 읽어 화면에 맞춘다 (외부 시스템과의 동기화)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void sync()
    const onOpen = (e: Event) => {
      setMode((e as CustomEvent<'join' | 'login'>).detail ?? 'join')
      setOpen(true)
      window.scrollTo({ top: 0 })
    }
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener(LEADERBOARD_EVENT, sync)
    window.addEventListener(OPEN_ACCOUNT_EVENT, onOpen)
    document.addEventListener('mousedown', onOutside)
    return () => {
      window.removeEventListener(LEADERBOARD_EVENT, sync)
      window.removeEventListener(OPEN_ACCOUNT_EVENT, onOpen)
      document.removeEventListener('mousedown', onOutside)
    }
  }, [sync])

  if (!LEADERBOARD_ENABLED) return null

  return (
    <div ref={ref} className="relative flex items-stretch border-l border-ink">
      <button
        type="button"
        onClick={() => {
          setMode(pending > 0 ? 'join' : 'login')
          setOpen((v) => !v)
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 transition-colors duration-100 hover:bg-ink hover:text-ink-inv ${
          me ? 'bg-pink' : ''
        }`}
      >
        {me ? (
          <span className="max-w-[7rem] truncate font-sans text-[13px] font-bold normal-case">{me.nickname}</span>
        ) : (
          <span>{t('login')}</span>
        )}
        <span aria-hidden>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('title')}
          className="absolute right-0 top-full z-50 w-[min(20rem,calc(100vw-1rem))] border border-ink bg-paper p-3 shadow-[4px_4px_0_var(--color-ink)] animate-fade-in"
        >
          {me ? (
            <div className="space-y-3">
              <div>
                <p className="label text-ink-faint">{t('player')}</p>
                <p className="mt-1 font-sans text-xl font-semibold normal-case tracking-[-0.03em]">{me.nickname}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  void logout()
                  setOpen(false)
                }}
                className="btn-rect w-full"
              >
                <span>{t('logout')}</span>
                <span aria-hidden>→</span>
              </button>
              <p className="font-mono text-[11px] normal-case leading-snug text-ink-faint">
                {t('logoutNote')}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {pending > 0 && (
                <p className="border border-ink bg-pink px-3 py-2 font-sans text-xs normal-case">
                  {t('pendingNote', { n: pending })}
                </p>
              )}
              {/* key: 모드가 바뀌어 열릴 때 폼을 그 모드로 새로 시작한다 */}
              <AccountForm key={mode} id="header" defaultMode={mode} onDone={() => setOpen(false)} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
