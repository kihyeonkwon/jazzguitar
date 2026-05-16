'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/lib/i18n/navigation'
import { useState, useRef, useEffect } from 'react'

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
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (newLocale: Locale) => {
    router.push(pathname, { locale: newLocale })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-500 transition-colors"
      >
        <span>{locale.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg z-50 min-w-[140px]">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${
                locale === loc
                  ? 'text-gray-900 bg-gray-100 font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span>{t(loc)}</span>
              {loc !== 'ko' && (
                <span className="text-xs px-1.5 py-0.5 rounded text-gray-400 border border-gray-200">
                  {t('comingSoon')}
                </span>
              )}
              {locale === loc && (
                <span className="text-gray-900">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
