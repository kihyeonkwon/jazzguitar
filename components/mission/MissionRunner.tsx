'use client'

import { useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import dynamic from 'next/dynamic'
import { leaves, getBackingTrackById } from '@/lib/curriculum/organic'
import { pickTodaysLeaf } from '@/lib/practice/daily'
import { Locale, Leaf } from '@/lib/curriculum/types'
import { useLeafScoreMap } from '@/lib/progress/hooks'
import { IconArrowRight, IconArrowLeft, IconCheck, IconPlay } from '@/components/icons'
import LickCard from './LickCard'
import RecordCheck from './RecordCheck'

const BackingTrackPlayer = dynamic(() => import('@/components/jam/BackingTrackPlayer'), { ssr: false })
const Recorder = dynamic(() => import('@/components/jam/Recorder'), { ssr: false })

type Step = 'overview' | 'drill' | 'lick' | 'jam' | 'review'

const STEP_ORDER: Step[] = ['overview', 'drill', 'lick', 'jam', 'review']
const STEP_LABEL: Record<Step, string> = {
  overview: 'Mission',
  drill:    'Warmup',
  lick:     'Lick',
  jam:      'Apply',
  review:   'Record',
}

interface Props {
  leaf?: Leaf | null
}

export default function MissionRunner({ leaf: leafProp }: Props) {
  const locale = useLocale() as Locale
  const scoreMap = useLeafScoreMap(leaves)

  // 주제가 지정 안 됐으면 자동 선택
  const leaf = useMemo(() => leafProp ?? pickTodaysLeaf(leaves), [leafProp])

  const [step, setStep] = useState<Step>('overview')

  if (!leaf) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="eyebrow">Mastered</div>
        <h1 className="display text-4xl text-ink">모든 주제를 졸업했습니다.</h1>
        <Link
          href="/curriculum"
          className="inline-flex h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium items-center transition-colors"
        >
          Tree로 가기
        </Link>
      </div>
    )
  }

  const leafScore = scoreMap[leaf.slug] ?? 0
  const tier =
    leafScore === 0  ? 'START'  :
    leafScore < 30   ? 'BRONZE' :
    leafScore < 60   ? 'SILVER' :
    leafScore < 85   ? 'GOLD'   : 'MASTER'

  const lick = leaf.licks?.[0]
  const trackId = leaf.practice?.backingTrackIds?.[0] ?? leaf.relatedBackingTrackIds?.[0]
  const backingTrack = trackId ? getBackingTrackById(trackId) : null
  const drillSlug = leaf.quickDrill?.kind === 'chord-notes' || leaf.quickDrill?.kind === 'scale-notes'
    ? 'chord-construction'
    : 'fretboard-find'

  const goNext = () => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1])
  }
  const goPrev = () => {
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) setStep(STEP_ORDER[idx - 1])
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

      {/* Step progress */}
      <header className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="section-no">{String(STEP_ORDER.indexOf(step) + 1).padStart(2, '0')}</span>
            <span className="eyebrow">{STEP_LABEL[step]} · Step {STEP_ORDER.indexOf(step) + 1} / {STEP_ORDER.length}</span>
          </div>
          <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
            {tier} · {leafScore} / 100
          </span>
        </div>
        <div className="flex gap-px h-0.5 bg-rule">
          {STEP_ORDER.map((s, i) => (
            <div
              key={s}
              className={`flex-1 transition-colors ${
                i <= STEP_ORDER.indexOf(step) ? 'bg-ink' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Step content */}
      <div className="space-y-8">
        {step === 'overview' && (
          <OverviewStep leaf={leaf} locale={locale} />
        )}

        {step === 'drill' && (
          <DrillStep leaf={leaf} drillSlug={drillSlug} />
        )}

        {step === 'lick' && lick && (
          <LickStep lick={lick} locale={locale} />
        )}
        {step === 'lick' && !lick && (
          <NoContentStep label="이 주제에는 아직 외울 릭이 없습니다." />
        )}

        {step === 'jam' && backingTrack && (
          <div className="space-y-6">
            <SectionHeading no="J" label="Apply">
              백킹 위에서 오늘의 릭을 의식하면서 한 코러스. 다 끝나면 다음으로 진행합니다.
            </SectionHeading>
            <BackingTrackPlayer track={backingTrack} />
            <Recorder />
          </div>
        )}
        {step === 'jam' && !backingTrack && (
          <NoContentStep label="이 주제에는 아직 연결된 백킹 트랙이 없습니다." />
        )}

        {step === 'review' && (
          <div className="space-y-6">
            <SectionHeading no="R" label="Record Check">
              녹음을 한 번 들어보고 아래 4가지를 솔직히 체크합니다.
            </SectionHeading>
            <RecordCheck leafSlug={leaf.slug} />
          </div>
        )}
      </div>

      {/* Sticky bottom controls */}
      <div className="sticky bottom-0 -mx-6 px-6 py-4 bg-paper border-t border-rule flex items-center justify-between gap-4">
        <button
          onClick={goPrev}
          disabled={step === 'overview'}
          className="text-xs font-mono tracking-widest text-ink-faint hover:text-ink disabled:opacity-20 inline-flex items-center gap-2"
        >
          <IconArrowLeft size={14} /> BACK
        </button>
        <div className="text-[10px] font-mono tabular text-ink-quiet tracking-widest">
          {STEP_LABEL[step].toUpperCase()}
        </div>
        {step === 'review' ? (
          <Link
            href="/"
            className="h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft inline-flex items-center gap-2 text-xs font-mono tracking-widest transition-colors"
          >
            <IconCheck size={14} /> DONE
          </Link>
        ) : (
          <button
            onClick={goNext}
            className="h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft inline-flex items-center gap-2 text-xs font-mono tracking-widest transition-colors"
          >
            NEXT <IconArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Sub-steps ─────────────────────────────────────────────────────────

function SectionHeading({ no, label, children }: { no: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-3">
        <span className="section-no">{no}</span>
        <span className="eyebrow">{label}</span>
      </div>
      <p className="text-ink-soft text-[15px] leading-relaxed">{children}</p>
    </div>
  )
}

function NoContentStep({ label }: { label: string }) {
  return (
    <div className="border border-rule bg-paper-bright p-8 text-center">
      <p className="text-sm text-ink-faint">{label}</p>
    </div>
  )
}

function OverviewStep({ leaf, locale }: { leaf: Leaf; locale: Locale }) {
  const mission = leaf.mission?.[locale] ?? leaf.title[locale]
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="section-no">M</span>
          <span className="eyebrow">Today&rsquo;s Mission</span>
        </div>
        <h1 className="display text-4xl md:text-5xl text-ink leading-[1.05]">
          {mission}
        </h1>
        <p className="text-ink-soft text-[15px] leading-relaxed">
          {leaf.description[locale]}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-px bg-rule border border-rule">
        {[
          { label: 'Warmup', time: '05 min' },
          { label: 'Lick',   time: '10 min' },
          { label: 'Apply',  time: '20 min' },
          { label: 'Check',  time: '05 min' },
        ].map((s, i) => (
          <div key={i} className="bg-paper-bright p-4">
            <div className="eyebrow">{s.label}</div>
            <div className="text-base font-mono tabular text-ink mt-1">{s.time}</div>
          </div>
        ))}
      </div>

      <Link
        href={`/leaf/${leaf.slug}`}
        className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink font-mono tracking-widest"
      >
        주제 전체 보기 <IconArrowRight size={12} />
      </Link>
    </div>
  )
}

function DrillStep({ leaf, drillSlug }: { leaf: Leaf; drillSlug: string }) {
  return (
    <div className="space-y-6">
      <SectionHeading no="W" label="Warmup">
        오늘의 미션에 필요한 음을 손과 머리에 깔끔하게 깔아둡니다. 한 라운드만 풀면 됩니다.
      </SectionHeading>
      <div className="border border-rule bg-paper-bright p-6 space-y-4">
        {leaf.quickDrill && (
          <div className="space-y-1">
            <div className="eyebrow">Target</div>
            <div className="text-base text-ink">
              {leaf.quickDrill.kind === 'scale-notes' && (
                <>
                  {String(leaf.quickDrill.params.root ?? '')}{' '}
                  {String(leaf.quickDrill.params.scale ?? '')} 의 구성음
                </>
              )}
              {leaf.quickDrill.kind === 'chord-notes' && (
                <>
                  {String(leaf.quickDrill.params.chord ?? '')} 의 구성음
                </>
              )}
              {leaf.quickDrill.kind === 'interval'      && '핵심 인터벌 청음'}
              {leaf.quickDrill.kind === 'chord-quality' && '코드 퀄리티 듣기'}
            </div>
          </div>
        )}
        <Link
          href={`/train/${drillSlug}`}
          className="inline-flex items-center gap-2 h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium transition-colors"
        >
          <IconPlay size={14} />
          Train 한 라운드 시작
        </Link>
      </div>
    </div>
  )
}

function LickStep({ lick, locale }: { lick: import('@/lib/curriculum/types').LickSnippet; locale: Locale }) {
  return (
    <div className="space-y-6">
      <SectionHeading no="L" label="Lick">
        오늘의 짧은 어휘 한 개. 외워서 잼에 끼워 넣을 준비를 합니다. 천천히 5번 따라 친 다음 메모리 토글을 누르세요.
      </SectionHeading>
      <LickCard lick={lick} locale={locale} />
    </div>
  )
}
