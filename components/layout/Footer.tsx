import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { GAMES } from '@/lib/train/games'

export default function Footer() {
  const t = useTranslations('footer')
  const tGames = useTranslations('games')
  const tSite = useTranslations('site')

  return (
    <footer className="on-dark border-t border-ink bg-ink font-mono text-[11px] uppercase text-ink-inv">
      <div className="grid grid-cols-2 md:grid-cols-12">
        <div className="col-span-2 border-b border-ink-inv/25 px-4 py-8 sm:px-6 md:col-span-6 md:border-b-0 md:border-r">
          <div className="text-ink-inv/60">{t('colophon')}</div>
          <p className="mt-4 max-w-sm font-sans text-2xl font-semibold normal-case leading-[1.02] tracking-[-0.04em]">
            {tSite('name')}
          </p>
          <p className="mt-4 max-w-xs normal-case leading-relaxed text-ink-inv/60">
            {t('blurb')}
          </p>
        </div>
        <div className="border-r border-ink-inv/25 px-4 py-8 sm:px-6 md:col-span-3">
          <div className="text-ink-inv/60">{t('index')}</div>
          <ul className="mt-4 space-y-2">
            {GAMES.map((g) => (
              <li key={g.type}>
                <Link href={`/train/${g.type}`} className="arrow-shift hover:underline">
                  {g.index} {tGames(`${g.type}.title`)} <span className="arrow">→</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/rank" className="arrow-shift hover:underline">
                04 {t('leaderboard')} <span className="arrow">→</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-4 py-8 sm:px-6 md:col-span-3">
          <div className="text-ink-inv/60">{t('credits')}</div>
          <ul className="mt-4 space-y-2">
            <li>{t('builtBy')}</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-ink-inv/25 px-4 py-3 text-ink-inv/60 sm:px-6">
        <span>{tSite('name')}</span>
        <span>{t('version')}</span>
      </div>
    </footer>
  )
}
