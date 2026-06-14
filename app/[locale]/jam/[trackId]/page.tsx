import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  getBackingTrackById,
  getTipBySlug,
  tips,
  leaves,
} from '@/lib/curriculum/organic'
import { Locale } from '@/lib/curriculum/types'
import BackingTrackPlayer from '@/components/jam/BackingTrackPlayer'
import Recorder from '@/components/jam/Recorder'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'
import { Stat, Hint } from '@/components/ui'
import { asLocale, buildPageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ trackId: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackId, locale: rawLocale } = await params
  const locale = asLocale(rawLocale)
  const track = getBackingTrackById(trackId)

  if (!track) {
    return buildPageMetadata({
      locale,
      path: `/jam/${trackId}`,
      title: '재즈기타 잼 트랙',
      description: '재즈기타 즉흥연주 백킹 트랙 페이지입니다.',
    })
  }

  return buildPageMetadata({
    locale,
    path: `/jam/${track.id}`,
    title: `${track.name[locale]} | 재즈기타 잼 트랙`,
    description:
      `${track.key.toUpperCase()} 키, ${track.bpm} BPM, ${track.bars}마디 ${track.style} 백킹 트랙으로 재즈기타 즉흥과 컴핑을 연습합니다.`,
    keywords: [
      `재즈기타 ${track.name.ko}`,
      `${track.key.toUpperCase()} 재즈기타`,
      '재즈기타 즉흥',
      '재즈기타 백킹트랙',
    ],
  })
}

export default async function JamSessionPage({ params }: Props) {
  const { trackId } = await params
  const locale = (await getLocale()) as Locale

  const track = getBackingTrackById(trackId)
  if (!track) notFound()

  const matchingTip =
    tips.find(t => t.suggestedBackingTrackId === track.id) ??
    getTipBySlug('phrase-on-3')

  const relatedLeaves = leaves.filter(l =>
    l.relatedBackingTrackIds.includes(track.id)
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">

      {/* ── Back ──────────────────────────────────────── */}
      <Link
        href="/jam"
        className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
      >
        <IconArrowLeft size={14} />
        JAM LIBRARY
      </Link>

      {/* ── Title ─────────────────────────────────────── */}
      <header className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="section-no">00</span>
          <span className="eyebrow">Jam Session</span>
        </div>
        <h1 className="display text-3xl md:text-4xl text-ink leading-tight">
          {track.name[locale]}
        </h1>
        <div className="grid grid-cols-3 gap-px bg-rule border border-rule mt-6">
          <div className="bg-paper-bright p-4"><Stat label="Key"  value={track.key.toUpperCase()} /></div>
          <div className="bg-paper-bright p-4"><Stat label="BPM"  value={track.bpm} /></div>
          <div className="bg-paper-bright p-4"><Stat label="Bars" value={track.bars} /></div>
        </div>
      </header>

      {/* ── Mission ───────────────────────────────────── */}
      {matchingTip && (
        <section className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="section-no">M</span>
            <span className="eyebrow">Session Mission</span>
          </div>
          <Link
            href={`/tip/${matchingTip.slug}`}
            className="group block border-y border-rule py-4 hover:bg-surface/50 -mx-4 px-4 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="space-y-1">
                <div className="text-[15px] font-medium text-ink">
                  {matchingTip.title[locale]}
                </div>
                <div className="text-sm text-ink-soft leading-relaxed">
                  {matchingTip.summary[locale]}
                </div>
              </div>
              <IconArrowRight size={14} className="text-ink-faint group-hover:text-ink shrink-0 mt-1.5 transition-colors" />
            </div>
          </Link>
        </section>
      )}

      {/* ── Player ────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="section-no">P</span>
          <span className="eyebrow">Backing Track</span>
        </div>
        <BackingTrackPlayer track={track} />
      </section>

      {/* ── Recorder ──────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="section-no">R</span>
          <span className="eyebrow">Record Your Solo</span>
        </div>
        <Recorder />
      </section>

      <Hint label="Tip">
        백킹 트랙을 먼저 재생한 뒤 녹음을 시작하면, 백킹 사운드와 마이크가 함께 한 파일로 저장됩니다.
        다운로드한 파일을 선생님께 제출하거나 자신의 어제 솔로와 비교해보세요.
      </Hint>

      {/* ── Used in these leaves ──────────────────────── */}
      {relatedLeaves.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="section-no">L</span>
              <span className="eyebrow">Used in these leaves</span>
            </div>
            <span className="text-[10px] font-mono tabular text-ink-faint tracking-widest">
              {relatedLeaves.length} {relatedLeaves.length === 1 ? 'LEAF' : 'LEAVES'}
            </span>
          </div>
          <ul className="border-t border-rule">
            {relatedLeaves.map(l => (
              <li key={l.id} className="border-b border-rule">
                <Link
                  href={`/leaf/${l.slug}`}
                  className="group flex items-baseline gap-5 py-4 hover:bg-surface/50 -mx-4 px-4 transition-colors"
                >
                  <span className="section-no shrink-0">
                    {String(l.order).padStart(2, '0')}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="text-[15px] font-medium text-ink">
                      {l.title[locale]}
                    </div>
                    <div className="text-xs text-ink-soft">
                      {l.description[locale]}
                    </div>
                  </div>
                  <IconArrowRight size={14} className="text-ink-faint group-hover:text-ink shrink-0 mt-1.5 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
