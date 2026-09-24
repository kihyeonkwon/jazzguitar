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
import { TrunkIconMap, IconArrowLeft } from '@/components/icons'
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
    <article>
      {/* Cover */}
      <header className="border-b border-ink bg-pink">
        <div className="flex items-center justify-between gap-4 px-4 pt-5 sm:px-6">
          {trunk ? (
            <Link
              href={`/trunk/${trunk.slug}`}
              className="label arrow-shift inline-flex items-center gap-2 hover:underline"
            >
              <IconArrowLeft size={12} />
              {TrunkIcon && <TrunkIcon size={14} />}
              {trunk.title[locale]}
            </Link>
          ) : <span />}
          <p className="label">{`Leaf / ${String(leaf.order).padStart(2, '0')} — I can play`}</p>
        </div>
        <div className="grid items-end gap-8 px-4 pb-8 pt-14 sm:px-6 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-8">
            <h1
              className="display text-ink"
              style={{ fontSize: 'clamp(2.75rem, 8vw, 8.5rem)', lineHeight: 0.98, letterSpacing: '-0.05em' }}
            >
              {leaf.title[locale]}
            </h1>
            {leaf.subtitle && (
              <p className="mt-5 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
                {leaf.subtitle[locale]}
              </p>
            )}
          </div>
          <p className="break-keep border-t border-ink pt-4 text-[15px] leading-[1.7] text-ink md:col-span-4 lg:col-span-3 lg:col-start-10">
            {leaf.description[locale]}
          </p>
        </div>
      </header>

      {/* Theory */}
      {theoryContent && (
        <LeafSection index="T" label="Theory">
          <TheoryProse content={theoryContent} />
        </LeafSection>
      )}

      {/* Practice — Exercises (Jam 위로 이동) */}
      {exercises.length > 0 && (
        <LeafSection index="P" label="Exercises">
          <div className="space-y-6 -mx-4 sm:mx-0">
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
        </LeafSection>
      )}

      {/* Practice — Jam (트랙·키 자유 선택 + 녹음 + reference) */}
      {tracks.length > 0 && (
        <LeafSection index="J" label="Jam">
          <p className="mb-5 text-[13px] text-ink-soft">
            이 주제가 추천하는 트랙은 <strong className="text-ink">★</strong> 표시됩니다. 키는 자유롭게 바꿔서 다른 조에서도 같은 주제를 연습할 수 있습니다.
          </p>
          <div className="-mx-4 sm:mx-0">
            <JamPicker
              recommendedTrackIds={tracks.map(t => t!.id)}
              locale={locale}
            />
          </div>
        </LeafSection>
      )}

      {/* Checkpoints — new leveled or legacy */}
      <LeafSection index="C" label="Checklist">
        <div className="-mx-4 sm:mx-0">
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
      </LeafSection>

      {/* Sibling navigation */}
      {(prevLeaf || nextLeaf) && (
        <nav className="grid border-b border-ink md:grid-cols-2" aria-label="주제 이동">
          {prevLeaf ? (
            <Link
              href={`/leaf/${prevLeaf.slug}`}
              className="block border-b border-ink px-4 py-6 transition-colors duration-100 hover:bg-ink hover:text-ink-inv sm:px-6 md:border-b-0 md:border-r"
            >
              <span className="label">← 이전 주제</span>
              <span className="display mt-6 block text-3xl leading-[1.02] sm:text-5xl">{prevLeaf.title[locale]}</span>
            </Link>
          ) : <span className="hidden border-r border-ink md:block" />}
          {nextLeaf ? (
            <Link
              href={`/leaf/${nextLeaf.slug}`}
              className="block px-4 py-6 text-right transition-colors duration-100 hover:bg-ink hover:text-ink-inv sm:px-6"
            >
              <span className="label">다음 주제 →</span>
              <span className="display mt-6 block text-3xl leading-[1.02] sm:text-5xl">{nextLeaf.title[locale]}</span>
            </Link>
          ) : <span />}
        </nav>
      )}
    </article>
  )
}

function LeafSection({
  index,
  label,
  children,
}: {
  index: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="grid border-b border-ink md:grid-cols-12">
      <div className="border-b border-ink px-4 py-5 sm:px-6 md:col-span-2 md:border-b-0 md:border-r">
        <div className="flex items-baseline gap-4 md:sticky md:top-20 md:block">
          <span aria-hidden className="display block text-5xl leading-none md:text-8xl">{index}</span>
          <span className="label md:mt-3 md:block">{label}</span>
        </div>
      </div>
      <div className="min-w-0 px-4 py-10 sm:px-6 md:col-span-10 md:py-14">
        <div className="max-w-4xl">{children}</div>
      </div>
    </section>
  )
}
