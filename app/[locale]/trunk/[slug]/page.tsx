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
import { TrunkIconMap, IconArrowRight, IconArrowLeft } from '@/components/icons'
import { Divider } from '@/components/ui'
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
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

      {/* ── Back link ──────────────────────────────────────── */}
      <Link
        href="/curriculum"
        className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
      >
        <IconArrowLeft size={14} />
        TREE OF JAZZ
      </Link>

      {/* ── Cover ──────────────────────────────────────────── */}
      <header className="space-y-6">
        <div className="flex items-baseline gap-3">
          <span className="section-no">
            {String(trunk.order).padStart(2, '0')}
          </span>
          <span className="eyebrow">Trunk</span>
        </div>

        <div className="flex items-start gap-6">
          <Icon size={56} className="text-ink shrink-0 mt-1" />
          <div className="space-y-3">
            <h1 className="display text-4xl md:text-5xl text-ink leading-[0.95]">
              {trunk.title[locale]}
            </h1>
            <p className="text-ink-soft text-[15px] leading-relaxed max-w-prose">
              {trunk.description[locale]}
            </p>
          </div>
        </div>
      </header>

      <Divider />

      {/* ── Leaves ─────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="section-no">L</span>
            <span className="eyebrow">I can play</span>
          </div>
          <span className="text-xs font-mono tabular text-ink-faint">
            {leaves.length} LEAVES
          </span>
        </div>

        <ul className="border-t border-rule">
          {leaves.map((l) => (
            <li key={l.id} className="border-b border-rule">
              <Link
                href={`/leaf/${l.slug}`}
                className="group flex items-baseline gap-6 py-6 hover:bg-surface/50 -mx-4 px-4 transition-colors"
              >
                <span className="section-no shrink-0 mt-1">
                  {String(l.order).padStart(2, '0')}
                </span>
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold text-ink leading-snug">
                    {l.title[locale]}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {l.description[locale]}
                  </p>
                </div>
                <IconArrowRight
                  size={18}
                  className="text-ink-faint group-hover:text-ink shrink-0 mt-1.5 transition-colors"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Adjacent trunks ────────────────────────────────── */}
      <nav className="flex items-stretch justify-between gap-px bg-rule border border-rule">
        {prev ? (
          <Link
            href={`/trunk/${prev.slug}`}
            className="flex-1 bg-paper-bright p-5 hover:bg-surface transition-colors flex items-center gap-3"
          >
            <IconArrowLeft size={16} className="text-ink-faint shrink-0" />
            <div className="text-left">
              <div className="eyebrow">Prev</div>
              <div className="text-sm text-ink mt-0.5">{prev.title[locale]}</div>
            </div>
          </Link>
        ) : (
          <span className="flex-1 bg-paper-bright p-5" />
        )}
        {next ? (
          <Link
            href={`/trunk/${next.slug}`}
            className="flex-1 bg-paper-bright p-5 hover:bg-surface transition-colors flex items-center gap-3 justify-end"
          >
            <div className="text-right">
              <div className="eyebrow">Next</div>
              <div className="text-sm text-ink mt-0.5">{next.title[locale]}</div>
            </div>
            <IconArrowRight size={16} className="text-ink-faint shrink-0" />
          </Link>
        ) : (
          <span className="flex-1 bg-paper-bright p-5" />
        )}
      </nav>
    </div>
  )
}
