import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  getLeafBySlug,
  getTrunkBySlug,
  getTipBySlug,
  getBackingTrackById,
  getPrincipleBySlug,
  getLeavesByTrunk,
} from '@/lib/curriculum/organic'
import { Locale, TrunkSlug } from '@/lib/curriculum/types'
import SelfCheck from '@/components/leaf/SelfCheck'
import { TrunkIconMap, IconArrowRight, IconArrowLeft, IconPlay } from '@/components/icons'
import { Divider } from '@/components/ui'
import { getProtocolsForLeaf } from '@/lib/practice/protocols'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export default async function LeafPage({ params }: Props) {
  const { slug } = await params
  const locale = (await getLocale()) as Locale

  const leaf = getLeafBySlug(slug)
  if (!leaf) notFound()

  const trunk  = getTrunkBySlug(leaf.trunkSlug)
  const tips   = leaf.relatedTipSlugs.map(getTipBySlug).filter(Boolean)
  const tracks = leaf.relatedBackingTrackIds.map(getBackingTrackById).filter(Boolean)
  const refs   = leaf.relatedPrincipleSlugs.map(getPrincipleBySlug).filter(Boolean)
  const protocols = getProtocolsForLeaf(leaf.slug)
  const TrunkIcon = trunk ? TrunkIconMap[trunk.slug as TrunkSlug] : null

  const siblingLeaves = trunk ? getLeavesByTrunk(trunk.slug as TrunkSlug) : []
  const myIdx = siblingLeaves.findIndex(l => l.slug === leaf.slug)
  const prevLeaf = myIdx > 0 ? siblingLeaves[myIdx - 1] : null
  const nextLeaf = myIdx >= 0 && myIdx < siblingLeaves.length - 1 ? siblingLeaves[myIdx + 1] : null

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-14">

      {/* ── Back link ─────────────────────────────────────── */}
      {trunk && (
        <Link
          href={`/trunk/${trunk.slug}`}
          className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
        >
          <IconArrowLeft size={14} />
          {trunk.title[locale].toUpperCase()}
        </Link>
      )}

      {/* ── Cover ─────────────────────────────────────────── */}
      <header className="space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="section-no">
            {String(leaf.order).padStart(2, '0')}
          </span>
          <span className="eyebrow">I Can Play</span>
        </div>
        <div className="flex items-start gap-5">
          {TrunkIcon && <TrunkIcon size={36} className="text-ink shrink-0 mt-2" />}
          <h1 className="display text-3xl md:text-4xl text-ink leading-[1.05] flex-1">
            {leaf.title[locale]}
          </h1>
        </div>
        <p className="text-ink-soft text-[15px] leading-relaxed">
          {leaf.description[locale]}
        </p>
      </header>

      {/* ── Guided Practice CTA ──────────────────────────── */}
      {protocols.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">G</span>
            <span className="eyebrow">Guided Practice</span>
          </div>
          <div className="border border-rule bg-paper-bright">
            {protocols.map((p) => (
              <Link
                key={p.id}
                href={`/session/${leaf.slug}?p=${p.id}`}
                className="group flex items-center justify-between p-5 hover:bg-surface transition-colors border-b border-rule last:border-b-0"
              >
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-ink">
                    {p.name[locale]}
                  </div>
                  <div className="text-sm text-ink-soft mt-1">
                    {p.description[locale]}
                  </div>
                  <div className="text-[10px] font-mono tabular text-ink-faint tracking-widest mt-2">
                    {p.steps.length} STEPS · ~{p.estimatedMin} MIN
                  </div>
                </div>
                <div className="shrink-0 inline-flex items-center gap-2 text-xs font-mono tracking-widest text-ink-faint group-hover:text-ink ml-4">
                  <IconPlay size={14} /> START
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Self check ────────────────────────────────────── */}
      <SelfCheck
        leafSlug={leaf.slug}
        items={leaf.selfCheck.map(c => c[locale])}
      />

      {/* ── Related backing tracks ────────────────────────── */}
      {tracks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">P</span>
            <span className="eyebrow">Practice Tracks</span>
          </div>
          <ul className="border-t border-rule">
            {tracks.map(t => t && (
              <li key={t.id} className="border-b border-rule">
                <Link
                  href={`/jam/${t.id}`}
                  className="group flex items-center justify-between py-4 hover:bg-surface/50 -mx-3 px-3 transition-colors"
                >
                  <div>
                    <div className="text-[15px] font-medium text-ink">{t.name[locale]}</div>
                    <div className="text-[11px] font-mono tabular text-ink-faint tracking-widest mt-1">
                      {t.key.toUpperCase()} · {t.bpm} BPM · {t.bars} BARS
                    </div>
                  </div>
                  <IconArrowRight size={16} className="text-ink-faint group-hover:text-ink transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Related tips ─────────────────────────────────── */}
      {tips.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">T</span>
            <span className="eyebrow">Tips</span>
          </div>
          <ul className="border-t border-rule">
            {tips.map(t => t && (
              <li key={t.slug} className="border-b border-rule">
                <Link
                  href={`/tip/${t.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4 hover:bg-surface/50 -mx-3 px-3 transition-colors"
                >
                  <div>
                    <div className="text-[15px] font-medium text-ink">{t.title[locale]}</div>
                    <div className="text-sm text-ink-soft mt-1">{t.summary[locale]}</div>
                  </div>
                  <IconArrowRight size={16} className="text-ink-faint group-hover:text-ink shrink-0 mt-1 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Related principles ───────────────────────────── */}
      {refs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">R</span>
            <span className="eyebrow">Reference</span>
          </div>
          <ul className="border-t border-rule">
            {refs.map(p => p && (
              <li key={p.slug} className="border-b border-rule">
                <Link
                  href={`/principles/${p.slug}`}
                  className="group flex items-center justify-between py-3.5 hover:bg-surface/50 -mx-3 px-3 transition-colors"
                >
                  <div className="text-[14px] text-ink">{p.title[locale]}</div>
                  <IconArrowRight size={14} className="text-ink-faint group-hover:text-ink transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sibling navigation */}
      {(prevLeaf || nextLeaf) && (
        <nav className="flex items-stretch gap-px bg-rule border border-rule">
          {prevLeaf ? (
            <Link
              href={`/leaf/${prevLeaf.slug}`}
              className="flex-1 bg-paper-bright p-5 hover:bg-surface transition-colors flex items-center gap-3"
            >
              <IconArrowLeft size={14} className="text-ink-faint shrink-0" />
              <div className="text-left min-w-0">
                <div className="eyebrow">Prev Leaf</div>
                <div className="text-sm text-ink mt-0.5 truncate">{prevLeaf.title[locale]}</div>
              </div>
            </Link>
          ) : <span className="flex-1 bg-paper-bright p-5" />}
          {nextLeaf ? (
            <Link
              href={`/leaf/${nextLeaf.slug}`}
              className="flex-1 bg-paper-bright p-5 hover:bg-surface transition-colors flex items-center gap-3 justify-end"
            >
              <div className="text-right min-w-0">
                <div className="eyebrow">Next Leaf</div>
                <div className="text-sm text-ink mt-0.5 truncate">{nextLeaf.title[locale]}</div>
              </div>
              <IconArrowRight size={14} className="text-ink-faint shrink-0" />
            </Link>
          ) : <span className="flex-1 bg-paper-bright p-5" />}
        </nav>
      )}

      <Divider />
    </div>
  )
}
