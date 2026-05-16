import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-gray-900 hover:opacity-70 transition-opacity"
        >
          Jazz Guitar
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: '/', label: t('home') },
            { href: '/curriculum', label: t('curriculum') },
            { href: '/licks', label: t('licks') },
            { href: '/practice', label: t('practice') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
