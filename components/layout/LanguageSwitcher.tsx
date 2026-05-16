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
        className="flex items-center gap-1.5 px-3 h-8 text-xs font-mono tracking-widest text-ink-soft hover:text-ink border border-rule hover:border-ink-soft transition-colors"
      >
        {locale.toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-paper-bright border border-rule overflow-hidden z-50 min-w-[160px] animate-fade-in">
          {LOCALES.map(loc => (
            <button
              key={loc}
              onClick={() => select(loc)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left border-b border-rule last:border-b-0 ${
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
