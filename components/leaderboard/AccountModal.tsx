'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import AccountForm from './AccountForm'

interface Props {
  open: boolean
  onClose: () => void
  defaultMode?: 'join' | 'login'
}

// 닉네임 + 비밀번호로 가입·로그인하는 모달. OS 대화상자 모양.
export default function AccountModal({ open, onClose, defaultMode = 'login' }: Props) {
  const t = useTranslations('account')
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={t('title')} className="os-window w-full max-w-sm animate-fade-in">
        <div className="os-titlebar">
          <span className="os-ctl" aria-hidden />
          <span className="flex-1 truncate">account</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="grid h-4 w-4 place-items-center border border-current text-[10px] leading-none hover:bg-ink-inv hover:text-ink"
          >
            ×
          </button>
        </div>
        <div className="os-body p-4">
          <AccountForm id="modal" defaultMode={defaultMode} onDone={onClose} />
        </div>
      </div>
    </div>
  )
}
