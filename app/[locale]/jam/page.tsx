import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { backingTracks } from '@/lib/curriculum/organic'
import { Locale } from '@/lib/curriculum/types'
import { SectionHeader } from '@/components/ui'
import { IconPlay } from '@/components/icons'

export default async function JamLibraryPage() {
  const locale = (await getLocale()) as Locale

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <SectionHeader
        number={0}
        eyebrow="Jam"
        title="Backing Tracks"
        description="백킹 트랙 위에서 바로 솔로하고, 녹음해서 들어보세요. 백킹과 마이크가 함께 기록됩니다."
      />

      <ul className="border-t border-rule">
        {backingTracks.map((t, i) => (
          <li key={t.id} className="border-b border-rule">
            <Link
              href={`/jam/${t.id}`}
              className="group flex items-baseline gap-6 py-6 hover:bg-surface/50 -mx-4 px-4 transition-colors"
            >
              <span className="section-no shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-ink">
                    {t.name[locale]}
                  </h3>
                  <span className="eyebrow">{t.style}</span>
                </div>
                <div className="flex items-baseline gap-5 text-[11px] font-mono tabular text-ink-faint tracking-widest">
                  <span>KEY · {t.key.toUpperCase()}</span>
                  <span>BPM · {t.bpm}</span>
                  <span>BARS · {t.bars}</span>
                </div>
              </div>
              <IconPlay
                size={18}
                className="text-ink-faint group-hover:text-ink shrink-0 mt-2 transition-colors"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
