'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// 메뉴바의 설치 버튼. Chrome·Edge·Android는 브라우저의 설치 대화상자를 바로 띄우고,
// iOS Safari는 설치 프롬프트가 없어서 "홈 화면에 추가" 순서를 안내한다.
// 이미 설치해서 앱으로 열었으면 버튼을 숨긴다.
export default function InstallButton() {
  const t = useTranslations('install')
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [ios, setIos] = useState(false)
  const [guide, setGuide] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    if (standalone) return
    const ua = navigator.userAgent
    const isIos = /iPhone|iPad|iPod/.test(ua) || (ua.includes('Mac') && navigator.maxTouchPoints > 1)
    // 브라우저 판별은 외부 값 읽기 — 마운트 후 한 번만
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIos(isIos && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua))

    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setPrompt(null)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  useEffect(() => {
    if (!guide) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setGuide(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [guide])

  if (!prompt && !ios) return null

  const install = async () => {
    if (prompt) {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice
      if (outcome === 'accepted') setPrompt(null)
    } else {
      setGuide(true)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void install()}
        className="flex items-center gap-1.5 border-l border-ink px-3 transition-colors duration-100 hover:bg-ink hover:text-ink-inv"
      >
        <span aria-hidden>⤓</span>
        <span>{t('button')}</span>
      </button>

      {guide && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 normal-case"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setGuide(false)
          }}
        >
          <div role="dialog" aria-modal="true" aria-label={t('iosTitle')} className="os-window w-full max-w-sm animate-fade-in">
            <div className="os-titlebar">
              <span className="os-ctl" aria-hidden />
              <span className="flex-1 truncate">install</span>
              <button
                type="button"
                onClick={() => setGuide(false)}
                aria-label={t('close')}
                className="grid h-4 w-4 place-items-center border border-current text-[10px] leading-none hover:bg-ink-inv hover:text-ink"
              >
                ×
              </button>
            </div>
            <div className="os-body p-4 font-sans">
              <p className="text-lg font-semibold tracking-[-0.03em]">{t('iosTitle')}</p>
              <ol className="mt-3 space-y-2 text-[14px] leading-[1.6]">
                <li className="flex gap-3">
                  <span className="label mt-1 shrink-0">01</span>
                  <span>{t('iosStep1')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="label mt-1 shrink-0">02</span>
                  <span>{t('iosStep2')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="label mt-1 shrink-0">03</span>
                  <span>{t('iosStep3')}</span>
                </li>
              </ol>
              <p className="mt-4 font-mono text-[11px] leading-snug text-ink-faint">{t('iosNote')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
