import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  getTrunkBySlug,
  getLeavesByTrunk,
  trunks,
} from '@/lib/curriculum/organic'
import { Locale, TrunkSlug } from '@/lib/curriculum/types'
import { TrunkIconMap, IconArrowLeft } from '@/components/icons'
import { asLocale, buildPageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = asLocale(rawLocale)
  const trunk = getTrunkBySlug(slug)

  if (!trunk) {
    return buildPageMetadata({
      locale,
      path: `/trunk/${slug}`,
      title: '재즈기타 커리큘럼 가닥',
      description: '재즈기타 학습 커리큘럼 가닥 페이지입니다.',
    })
  }

  return buildPageMetadata({
    locale,
    path: `/trunk/${trunk.slug}`,
    title: `${trunk.title[locale]} | 재즈기타 커리큘럼`,
    description: trunk.description[locale],
    keywords: [
      `재즈기타 ${trunk.title.ko}`,
      '재즈기타 커리큘럼',
      '재즈기타 학습 순서',
    ],
  })
}

export default async function TrunkPage({ params }: Props) {
  const { slug } = await params
  const locale = (await getLocale()) as Locale

  const trunk = getTrunkBySlug(slug)
  if (!trunk) notFound()

  const leaves = getLeavesByTrunk(trunk.slug as TrunkSlug)
  const Icon   = TrunkIconMap[trunk.slug as TrunkSlug]
  const orderIdx = trunks.findIndex(t => t.slug === trunk.slug)
  const prev = trunks[orderIdx - 1]
  const next = trunks[orderIdx + 1]

  return (
    <div>
      {/* ── Cover ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-ink bg-blue">
        <div
          aria-hidden
          className="dither-coarse fade-cloud pointer-events-none absolute inset-y-0 right-0 w-2/3 text-ink opacity-40"
        />
        <div className="relative flex items-center justify-between gap-4 px-4 pt-5 sm:px-6">
          <Link href="/curriculum" className="label inline-flex items-center gap-2 hover:underline">
            <IconArrowLeft size={12} />
            Tree of Jazz
          </Link>
          <p className="label">{`Trunk / ${String(trunk.order).padStart(2, '0')}`}</p>
        </div>
        <div className="relative grid items-end gap-8 px-4 pb-8 pt-14 sm:px-6 md:grid-cols-12 md:pt-24">
          <h1
            className="display text-ink md:col-span-8"
            style={{ fontSize: 'clamp(3rem, 9vw, 9.5rem)', lineHeight: 0.96, letterSpacing: '-0.05em' }}
          >
            {trunk.title[locale]}
          </h1>
          <div className="md:col-span-4 lg:col-span-3 lg:col-start-10">
            <Icon size={40} className="text-ink" />
            <p className="mt-4 break-keep border-t border-ink pt-4 text-[15px] leading-[1.7] text-ink">
              {trunk.description[locale]}
            </p>
          </div>
        </div>
      </header>

      {/* ── Leaves ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-baseline justify-between border-b border-ink px-4 py-3 sm:px-6">
          <span className="label">L — I can play</span>
          <span className="label tabular">{String(leaves.length).padStart(2, '0')} leaves</span>
        </div>

        <ul>
          {leaves.map((l) => (
            <li key={l.id} className="border-b border-ink">
              <Link
                href={`/leaf/${l.slug}`}
                className="arrow-shift grid gap-x-6 gap-y-3 px-4 py-6 transition-colors duration-100 hover:bg-pink sm:px-6 md:grid-cols-12 md:items-baseline md:py-8"
              >
                <span className="section-no text-ink md:col-span-1">
                  {String(l.order).padStart(2, '0')}
                </span>
                <h3 className="display text-3xl leading-[1.02] text-ink sm:text-5xl md:col-span-5">
                  {l.title[locale]}
                </h3>
                <p className="break-keep text-[15px] leading-[1.7] text-ink-soft md:col-span-5">
                  {l.description[locale]}
                </p>
                <span className="label text-right md:col-span-1">
                  Open <span className="arrow">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Adjacent trunks ────────────────────────────────── */}
      <nav className="grid border-b border-ink md:grid-cols-2" aria-label="Trunk 이동">
        {prev ? (
          <Link
            href={`/trunk/${prev.slug}`}
            className="block border-b border-ink px-4 py-6 transition-colors duration-100 hover:bg-ink hover:text-ink-inv sm:px-6 md:border-b-0 md:border-r"
          >
            <span className="label">← Prev</span>
            <span className="display mt-6 block text-3xl leading-[1.02] sm:text-5xl">{prev.title[locale]}</span>
          </Link>
        ) : (
          <span className="hidden border-r border-ink md:block" />
        )}
        {next ? (
          <Link
            href={`/trunk/${next.slug}`}
            className="block px-4 py-6 text-right transition-colors duration-100 hover:bg-ink hover:text-ink-inv sm:px-6"
          >
            <span className="label">Next →</span>
            <span className="display mt-6 block text-3xl leading-[1.02] sm:text-5xl">{next.title[locale]}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
