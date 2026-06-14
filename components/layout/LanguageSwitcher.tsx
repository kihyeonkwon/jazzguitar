'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/lib/i18n/navigation'
import { useState, useRef, useEffect } from 'react'
import { IconCheck } from '@/components/icons'

type Locale = 'ko' | 'en' | 'ja'
const LOCALES: Locale[] = ['ko', 'en', 'ja']

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('language')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const select = (l: Locale) => {
    router.push(pathname, { locale: l })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex h-8 items-center gap-1.5 bg-surface-soft/80 px-3 text-xs font-mono text-ink-soft transition-colors hover:bg-surface hover:text-ink"
      >
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden bg-paper-bright shadow-[var(--shadow-tight)] animate-fade-in">
          {LOCALES.map(loc => (
            <button
              key={loc}
              onClick={() => select(loc)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                locale === loc
                  ? 'text-ink bg-surface'
                  : 'text-ink-soft hover:bg-surface hover:text-ink'
              }`}
            >
              <span>{t(loc)}</span>
              {loc !== 'ko' && (
                <span className="eyebrow">{t('comingSoon')}</span>
              )}
              {locale === loc && <IconCheck size={14} className="text-ink" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
