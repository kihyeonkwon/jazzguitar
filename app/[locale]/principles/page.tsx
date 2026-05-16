import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { principles, trunks } from '@/lib/curriculum/organic'
import { Locale, TrunkSlug } from '@/lib/curriculum/types'
import { TrunkIconMap, IconArrowRight } from '@/components/icons'
import { SectionHeader } from '@/components/ui'

export default async function PrinciplesIndex() {
  const locale = (await getLocale()) as Locale

  const byTrunk = new Map<TrunkSlug, typeof principles>()
  for (const p of principles) {
    for (const ts of p.trunkSlugs) {
      const arr = byTrunk.get(ts) ?? []
      arr.push(p)
      byTrunk.set(ts, arr)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
      <SectionHeader
        number={0}
        eyebrow="Principles"
        title="이론 사전"
        description="필요할 때 찾아보는 참고용 원리 모음입니다. 학습의 중심은 잼과 잎 — 여기는 보조 사전입니다."
      />

      <div className="space-y-14">
        {trunks.map((trunk, ti) => {
          const ps = byTrunk.get(trunk.slug as TrunkSlug)
          if (!ps || ps.length === 0) return null
          const Icon = TrunkIconMap[trunk.slug as TrunkSlug]
          return (
            <section key={trunk.id} className="space-y-5">
              <div className="flex items-center gap-4 pb-3 border-b border-rule">
                <Icon size={24} className="text-ink shrink-0" />
                <div className="flex items-baseline gap-3 flex-1">
                  <span className="section-no">
                    {String(ti + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-base font-semibold text-ink">
                    {trunk.title[locale]}
                  </h2>
                </div>
                <span className="text-[10px] font-mono tabular text-ink-faint tracking-widest">
                  {ps.length} ENTRIES
                </span>
              </div>
              <ul>
                {ps.map(p => (
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
          )
        })}
      </div>
    </div>
  )
}
