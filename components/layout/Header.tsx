'use client'

import { useState } from 'react'
import { Link } from '@/lib/i18n/navigation'
import { usePathname } from '@/lib/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { IconClose, IconMenu } from '@/components/icons'

const NAV_ITEMS = [
  { href: '/',           label: 'Today' },
  { href: '/jam',        label: 'Jam' },
  { href: '/curriculum', label: 'Tree' },
  { href: '/drill',      label: 'Drills' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="display text-base font-bold text-ink tracking-tight">
            Jazz Guitar
          </span>
          <span className="text-[10px] font-mono text-ink-faint tabular hidden md:inline">
            v0.1
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = href === '/'
              ? pathname === '/'
              : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`text-[13px] tracking-wide transition-colors ${
                  isActive
                    ? 'text-ink font-medium'
                    : 'text-ink-faint hover:text-ink'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden w-8 h-8 border border-rule text-ink-soft hover:text-ink hover:border-ink-soft transition-colors inline-flex items-center justify-center"
            aria-label="Navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconClose size={15} /> : <IconMenu size={15} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden border-t border-rule bg-paper-bright">
          <div className="px-6 py-2 grid grid-cols-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = href === '/'
                ? pathname === '/'
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`h-11 flex items-center justify-between border-b border-rule last:border-b-0 text-sm transition-colors ${
                    isActive
                      ? 'text-ink font-medium'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <span>{label}</span>
                  {isActive && <span className="section-no">NOW</span>}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
