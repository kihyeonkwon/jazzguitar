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
    <div ref={ref} className="relative flex items-stretch">
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 font-mono text-[12px] uppercase text-ink transition-colors duration-100 hover:bg-ink hover:text-ink-inv"
      >
        {locale.toUpperCase()} <span aria-hidden>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 min-w-[180px] border border-ink bg-paper shadow-[4px_4px_0_var(--color-ink)] animate-fade-in">
          {LOCALES.map(loc => (
            <button
              key={loc}
              onClick={() => select(loc)}
              className={`flex w-full items-center justify-between border-b border-ink px-4 py-2.5 text-left font-sans text-sm normal-case transition-colors duration-100 last:border-b-0 ${
                locale === loc
                  ? 'bg-ink text-ink-inv'
                  : 'text-ink hover:bg-pink'
              }`}
            >
              <span>{t(loc)}</span>
              {locale === loc && <IconCheck size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
