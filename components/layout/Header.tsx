'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'
import { usePathname } from '@/lib/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import { IconClose, IconMenu } from '@/components/icons'

const NAV_ITEMS = [
  { href: '/curriculum', label: 'Tree' },
  { href: '/train',      label: 'Train' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-paper/82 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft transition-colors group-hover:bg-surface">
            <Image
              src="/icon.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>
          <span className="display text-xl font-bold text-ink">
            Jazz Guitar Tree
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden items-center rounded-full bg-surface-soft/80 p-1 md:flex">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = href === '/'
                ? pathname === '/'
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-surface text-ink'
                      : 'text-ink-faint hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-ink-soft transition-colors hover:bg-surface hover:text-ink md:hidden"
            aria-label="Navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconClose size={15} /> : <IconMenu size={15} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="bg-paper-bright/95 md:hidden">
          <div className="px-5 py-3 grid grid-cols-1">
            {NAV_ITEMS.map(({ href, label }) => {
              const isActive = href === '/'
                ? pathname === '/'
                : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`h-12 flex items-center justify-between rounded-full px-4 text-sm transition-colors ${
                    isActive
                      ? 'bg-surface text-ink font-semibold'
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
