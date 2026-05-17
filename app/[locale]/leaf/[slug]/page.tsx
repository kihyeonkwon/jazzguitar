import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  getLeafBySlug,
  getTrunkBySlug,
  getBackingTrackById,
  getLeavesByTrunk,
} from '@/lib/curriculum/organic'
import { Locale, TrunkSlug } from '@/lib/curriculum/types'
import LeveledCheckpoints from '@/components/leaf/LeveledCheckpoints'
import SelfCheck from '@/components/leaf/SelfCheck'
import { TrunkIconMap, IconArrowRight, IconArrowLeft } from '@/components/icons'
import { Divider } from '@/components/ui'
import TheoryProse from '@/components/leaf/TheoryProse'
import InlineJam from '@/components/leaf/InlineJam'
import SheetMusic from '@/components/music/SheetMusic'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export default async function LeafPage({ params }: Props) {
  const { slug } = await params
  const locale = (await getLocale()) as Locale

  const leaf = getLeafBySlug(slug)
  if (!leaf) notFound()

  const trunk = getTrunkBySlug(leaf.trunkSlug)
  const TrunkIcon = trunk ? TrunkIconMap[trunk.slug as TrunkSlug] : null

  // 잼 트랙 (새 shape 우선, 폴백으로 legacy)
  const trackIds = leaf.practice?.backingTrackIds ?? leaf.relatedBackingTrackIds
  const tracks = trackIds.map(getBackingTrackById).filter(Boolean)

  // 형제 잎
  const siblingLeaves = trunk ? getLeavesByTrunk(trunk.slug as TrunkSlug) : []
  const myIdx = siblingLeaves.findIndex(l => l.slug === leaf.slug)
  const prevLeaf = myIdx > 0 ? siblingLeaves[myIdx - 1] : null
  const nextLeaf = myIdx >= 0 && myIdx < siblingLeaves.length - 1 ? siblingLeaves[myIdx + 1] : null

  // 이론 본문 (마크다운 안에 fenced 블록으로 음악 위젯 포함)
  const theoryContent = leaf.theory?.content?.[locale]

  // 실습 항목
  const exercises = leaf.practice?.exercises ?? []

  // 체크포인트 (새 shape: 4레벨, 없으면 legacy selfCheck로 표시)
  const checkpoints = leaf.checkpoints

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-14">

      {/* Back */}
      {trunk && (
        <Link
          href={`/trunk/${trunk.slug}`}
          className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
        >
          <IconArrowLeft size={14} />
          {trunk.title[locale].toUpperCase()}
        </Link>
      )}

      {/* Cover */}
      <header className="space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="section-no">
            {String(leaf.order).padStart(2, '0')}
          </span>
          <span className="eyebrow">Leaf · I can play</span>
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

      {/* Theory */}
      {theoryContent && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">T</span>
            <span className="eyebrow">Theory</span>
          </div>
          <TheoryProse content={theoryContent} />
        </section>
      )}

      {/* Practice — Inline jam (player + recorder + optional YouTube reference) */}
      {tracks.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-baseline gap-3">
            <span className="section-no">J</span>
            <span className="eyebrow">Jam</span>
          </div>
          <div className="space-y-10">
            {tracks.map(t => t && (
              <InlineJam
                key={t.id}
                track={t}
                locale={locale}
                showRecorder={tracks.length === 1}
              />
            ))}
          </div>
        </section>
      )}

      {/* Practice — Exercises */}
      {exercises.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">P</span>
            <span className="eyebrow">Exercises</span>
          </div>
          <div className="space-y-6">
            {exercises.map((ex, i) => (
              <div key={i} className="border border-rule bg-paper-bright p-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-ink">{ex.title[locale]}</h3>
                  {ex.bpm && (
                    <span className="text-[10px] font-mono tabular text-ink-faint tracking-widest">{ex.bpm} BPM</span>
                  )}
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{ex.description[locale]}</p>
                {ex.abcNotation && (
                  <SheetMusic notation={ex.abcNotation} minimal />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Checkpoints — new leveled or legacy */}
      {checkpoints && checkpoints.length > 0 ? (
        <LeveledCheckpoints
          leafSlug={leaf.slug}
          groups={checkpoints}
          locale={locale}
        />
      ) : (
        <SelfCheck
          leafSlug={leaf.slug}
          items={leaf.selfCheck.map(c => c[locale])}
        />
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
