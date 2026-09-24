'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { usePathname } from '@/lib/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'
import AccountMenu from '@/components/leaderboard/AccountMenu'
import InstallButton from '@/components/pwa/InstallButton'
import { IconClose, IconMenu } from '@/components/icons'
import { GAMES } from '@/lib/train/games'

// 데스크톱 OS의 메뉴바 한 줄. 게임 창과 같은 언어 — 얇고, 모노스페이스, 선택하면 반전.
export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const tMenu = useTranslations('menu')
  const tGames = useTranslations('games')
  const tSite = useTranslations('site')

  const NAV_ITEMS = [
    ...GAMES.map((g) => ({
      href: `/train/${g.type}`,
      label: tMenu(g.menuKey),
      title: tGames(`${g.type}.title`),
    })),
    { href: '/rank', label: tMenu('rank'), title: tMenu('leaderboard') },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper-bright font-mono text-[12px] text-ink">
      <div className="flex h-9 items-stretch">
        <Link
          href="/"
          className="flex items-center gap-2 pr-4 transition-colors duration-100 hover:bg-ink hover:text-ink-inv"
        >
          <span aria-hidden className="flex h-full items-center bg-ink px-3 text-ink-inv">9×9</span>
          <span className="font-sans text-[14px] font-semibold tracking-[-0.04em]">{tSite('name')}</span>
        </Link>

        <nav className="hidden items-stretch md:flex" aria-label="Primary">
          {NAV_ITEMS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center px-3 transition-colors duration-100 ${
                  isActive ? 'bg-ink text-ink-inv' : 'hover:bg-ink hover:text-ink-inv'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-stretch uppercase">
          <div className="hidden items-stretch border-l border-ink sm:flex">
            <LanguageSwitcher />
          </div>
          <InstallButton />
          <AccountMenu />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex w-10 items-center justify-center border-l border-ink transition-colors duration-100 hover:bg-ink hover:text-ink-inv md:hidden"
            aria-label={tMenu('open')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconClose size={14} /> : <IconMenu size={14} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-ink bg-paper-bright md:hidden" aria-label="Primary mobile">
          {NAV_ITEMS.map(({ href, title }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-11 items-center justify-between border-b border-ink px-4 ${
                  isActive ? 'bg-ink text-ink-inv' : ''
                }`}
              >
                <span className="font-sans text-[15px] font-bold">{title}</span>
                <span aria-hidden>{isActive ? '●' : '→'}</span>
              </Link>
            )
          })}
          {/* 좁은 화면에서는 언어 선택을 메뉴 안으로 옮긴다 (메뉴바 자리는 계정에 양보) */}
          <div className="flex h-11 items-stretch justify-between pl-4 uppercase sm:hidden">
            <span className="flex items-center">{tMenu('language')}</span>
            <div className="flex items-stretch border-l border-ink">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
