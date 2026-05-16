import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  getBackingTrackById,
  getTipBySlug,
  tips,
} from '@/lib/curriculum/organic'
import { Locale } from '@/lib/curriculum/types'
import BackingTrackPlayer from '@/components/jam/BackingTrackPlayer'
import Recorder from '@/components/jam/Recorder'
import { IconArrowLeft, IconArrowRight } from '@/components/icons'
import { Stat, Hint } from '@/components/ui'

interface Props {
  params: Promise<{ trackId: string; locale: string }>
}

export default async function JamSessionPage({ params }: Props) {
  const { trackId } = await params
  const locale = (await getLocale()) as Locale

  const track = getBackingTrackById(trackId)
  if (!track) notFound()

  const matchingTip =
    tips.find(t => t.suggestedBackingTrackId === track.id) ??
    getTipBySlug('phrase-on-3')

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
    </div>
  )
}
