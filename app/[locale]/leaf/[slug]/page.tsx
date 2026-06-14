import type { Metadata } from 'next'
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
import JamPicker from '@/components/leaf/JamPicker'
import ExerciseCard from '@/components/leaf/ExerciseCard'
import { asLocale, buildPageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale: rawLocale } = await params
  const locale = asLocale(rawLocale)
  const leaf = getLeafBySlug(slug)

  if (!leaf) {
    return buildPageMetadata({
      locale,
      path: `/leaf/${slug}`,
      title: '재즈기타 주제',
      description: '재즈기타 학습 주제 페이지입니다.',
    })
  }

  return buildPageMetadata({
    locale,
    path: `/leaf/${leaf.slug}`,
    title: `${leaf.title[locale]} | 재즈기타 주제`,
    description: leaf.description[locale],
    keywords: [
      `재즈기타 ${leaf.title.ko}`,
      leaf.shortTitle?.ko ?? leaf.title.ko,
      '재즈기타 주제',
      '재즈기타 레슨 복습',
    ],
  })
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

  // 형제 주제
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
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20 space-y-14">

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
      <header className="organic-vine space-y-6">
        <div className="flex items-baseline gap-3">
          <span className="section-no">
            {String(leaf.order).padStart(2, '0')}
          </span>
          <span className="eyebrow">주제 · I can play</span>
        </div>
        <div className="flex items-start gap-5">
          {TrunkIcon && (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-clay bg-paper-bright text-ink shadow-[var(--shadow-tight)]">
              <TrunkIcon size={30} />
            </span>
          )}
          <div className="flex-1">
            <h1 className="display text-4xl md:text-6xl text-ink leading-[1.16]">
              {leaf.title[locale]}
            </h1>
            {leaf.subtitle && (
              <p className="mt-2 text-ink-soft text-[15px] tracking-wide">
                {leaf.subtitle[locale]}
              </p>
            )}
          </div>
        </div>
        <p className="max-w-3xl text-ink-soft text-base leading-8">
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

      {/* Practice — Exercises (Jam 위로 이동) */}
      {exercises.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">P</span>
            <span className="eyebrow">Exercises</span>
          </div>
          <div className="space-y-6 -mx-5 sm:mx-0">
            {exercises.map((ex, i) => (
              <ExerciseCard
                key={i}
                leafSlug={leaf.slug}
                idx={i}
                exercise={ex}
                locale={locale}
              />
            ))}
          </div>
        </section>
      )}

      {/* Practice — Jam (트랙·키 자유 선택 + 녹음 + reference) */}
      {tracks.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-baseline gap-3">
            <span className="section-no">J</span>
            <span className="eyebrow">Jam</span>
          </div>
          <p className="text-[13px] text-ink-soft">
            이 주제가 추천하는 트랙은 <strong className="text-ink">★</strong> 표시됩니다. 키는 자유롭게 바꿔서 다른 조에서도 같은 주제를 연습할 수 있습니다.
          </p>
          <div className="-mx-5 sm:mx-0">
            <JamPicker
              recommendedTrackIds={tracks.map(t => t!.id)}
              locale={locale}
            />
          </div>
        </section>
      )}

      {/* Checkpoints — new leveled or legacy */}
      <div className="-mx-5 sm:mx-0">
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
      </div>

      {/* Sibling navigation */}
      {(prevLeaf || nextLeaf) && (
        <nav className="flex items-stretch gap-3 -mx-5 sm:mx-0">
          {prevLeaf ? (
            <Link
              href={`/leaf/${prevLeaf.slug}`}
              className="flex-1 organic-card p-5 hover:bg-surface-soft transition-colors flex items-center gap-3"
            >
              <IconArrowLeft size={14} className="text-ink-faint shrink-0" />
              <div className="text-left min-w-0">
                <div className="eyebrow">이전 주제</div>
                <div className="text-sm text-ink mt-0.5 truncate">{prevLeaf.title[locale]}</div>
              </div>
            </Link>
          ) : <span className="flex-1 p-5" />}
          {nextLeaf ? (
            <Link
              href={`/leaf/${nextLeaf.slug}`}
              className="flex-1 organic-card p-5 hover:bg-surface-soft transition-colors flex items-center gap-3 justify-end"
            >
              <div className="text-right min-w-0">
                <div className="eyebrow">다음 주제</div>
                <div className="text-sm text-ink mt-0.5 truncate">{nextLeaf.title[locale]}</div>
              </div>
              <IconArrowRight size={14} className="text-ink-faint shrink-0" />
            </Link>
          ) : <span className="flex-1 p-5" />}
        </nav>
      )}

      <Divider />
    </div>
  )
}
