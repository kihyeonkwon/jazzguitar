'use client'

import { Link } from '@/lib/i18n/navigation'
import { usePathname } from '@/lib/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

const NAV_ITEMS = [
  { href: '/',           label: 'Home' },
  { href: '/curriculum', label: 'Tree' },
  { href: '/jam',        label: 'Jam' },
  { href: '/drill',      label: 'Drills' },
  { href: '/principles', label: 'Principles' },
]

export default function Header() {
  const pathname = usePathname()

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

        <LanguageSwitcher />
      </div>
    </header>
  )
}
