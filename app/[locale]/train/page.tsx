import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import DrillLibraryStats from '@/components/drills/DrillLibraryStats'
import { GAMES } from '@/lib/train/games'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  const t = await getTranslations({ locale, namespace: 'train' })
  const tSite = await getTranslations({ locale, namespace: 'site' })

  return buildPageMetadata({
    locale,
    path: '/train',
    title: t('seoTitle'),
    description: t('seoDescription'),
    siteName: tSite('name'),
    imageAlt: tSite('ogAlt'),
  })
}

export default function TrainPage() {
  const t = useTranslations('train')
  const tGames = useTranslations('games')
  const tLanding = useTranslations('landing')

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink bg-blue">
        <div aria-hidden className="pointer-events-none absolute -right-[8%] -top-[40%] h-[170%] w-[55%] text-cloud">
          <div className="dither-coarse mask-blob-wide absolute inset-0" />
          <div className="dither-dense mask-blob absolute inset-[14%]" />
        </div>
        <div className="relative flex justify-between px-4 pt-5 sm:px-6">
          <p className="label">{t('metaLeft')}</p>
          <p className="label">{t('metaRight', { count: String(GAMES.length).padStart(2, '0') })}</p>
        </div>
        <div className="relative grid items-end gap-6 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-12">
          <h1 className="mega md:col-span-9">Train</h1>
          <p className="break-keep border border-ink bg-paper-bright p-3 text-[15px] leading-[1.7] md:col-span-3">
            {t('intro')}
          </p>
        </div>
      </header>

      <ol>
        {GAMES.map((g) => (
          <li key={g.type} className="border-b border-ink">
            <Link
              href={`/train/${g.type}`}
              className="arrow-shift grid gap-x-6 gap-y-4 px-4 py-6 transition-colors duration-100 hover:bg-pink sm:px-6 md:grid-cols-12 md:items-start md:py-10"
            >
              <span className="section-no text-ink md:col-span-1">{g.index}</span>
              <div className="md:col-span-6">
                <span className="display block text-4xl leading-[1.02] text-ink sm:text-6xl">
                  {tGames(`${g.type}.title`)}
                </span>
                <span className="mt-3 block max-w-xl break-keep text-[15px] leading-[1.7] text-ink-soft">
                  {tGames(`${g.type}.description`)}
                </span>
                <span className="mt-5 inline-flex flex-wrap items-baseline gap-x-3 border border-ink bg-paper-bright px-3 py-1.5 font-mono text-xs">
                  <span className="font-bold">{g.example[0]}</span>
                  <span aria-hidden>=</span>
                  <span>{g.example[1]}</span>
                </span>
              </div>
              <div className="md:col-span-4">
                <DrillLibraryStats drillType={g.type} />
              </div>
              <span className="label text-right md:col-span-1">
                {tLanding('play')} <span className="arrow">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
