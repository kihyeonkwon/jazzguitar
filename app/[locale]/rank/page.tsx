import type { Metadata } from 'next'
import LeaderboardPanel from '@/components/leaderboard/LeaderboardPanel'
import JoinCta from '@/components/leaderboard/JoinCta'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { GAMES } from '@/lib/train/games'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  const t = await getTranslations({ locale, namespace: 'rank' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return buildPageMetadata({
    locale,
    path: '/rank',
    title: t('seoTitle'),
    description: t('seoDescription'),
    siteName: tSite('name'),
    imageAlt: tSite('ogAlt'),
  })
}

export default function RankPage() {
  const t = useTranslations('rank')
  const tGames = useTranslations('games')

  return (
    <div>
      <header className="border-b border-ink bg-pink text-ink">
        <div className="flex justify-between px-4 pt-5 sm:px-6">
          <p className="label text-ink">{t('metaLeft')}</p>
          <p className="label text-ink">{t('metaRight')}</p>
        </div>
        <div className="grid items-end gap-6 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-12">
          <h1 className="mega md:col-span-9">Rank</h1>
          <div className="space-y-4 md:col-span-3">
            <p className="break-keep text-[15px] leading-[1.7] text-ink">
              {t('body')}
            </p>
            <JoinCta />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3">
        {GAMES.map((g, i) => (
          <section
            key={g.type}
            className={`border-b border-ink ${i < GAMES.length - 1 ? 'lg:border-r' : ''}`}
            aria-label={t('boardAria', { game: tGames(`${g.type}.title`) })}
          >
            <Link
              href={`/train/${g.type}`}
              className="arrow-shift block px-4 pb-5 pt-5 transition-colors duration-100 hover:bg-pink sm:px-6"
            >
              <span className="flex justify-between">
                <span className="label">{g.index}</span>
                <span className="label">
                  {t('play')} <span className="arrow">→</span>
                </span>
              </span>
              <span className="display mt-8 block text-4xl leading-[1] sm:text-5xl">{tGames(`${g.type}.title`)}</span>
            </Link>
            <LeaderboardPanel game={g.type} limit={20} />
          </section>
        ))}
      </div>
    </div>
  )
}
