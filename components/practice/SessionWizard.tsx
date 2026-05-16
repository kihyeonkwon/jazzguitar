'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from '@/lib/i18n/navigation'
import { useLocale } from 'next-intl'
import dynamic from 'next/dynamic'
import {
  Locale,
  PracticeProtocol,
  PracticeStep,
  Rating,
} from '@/lib/curriculum/types'
import { getBackingTrackById, getLeafBySlug } from '@/lib/curriculum/organic'
import { logPractice } from '@/lib/practice/leitner'
import { IconArrowRight, IconArrowLeft, IconCheck } from '@/components/icons'
import { Hint } from '@/components/ui'

const BackingTrackPlayer = dynamic(
  () => import('@/components/jam/BackingTrackPlayer'),
  { ssr: false }
)
const SheetMusic = dynamic(
  () => import('@/components/music/SheetMusic'),
  { ssr: false }
)

interface Props {
  protocol: PracticeProtocol
}

const STEP_KIND_LABELS: Record<PracticeStep['kind'], { en: string; ko: string }> = {
  listen:  { en: 'LISTEN',  ko: '듣기' },
  echo:    { en: 'ECHO',    ko: '따라하기' },
  apply:   { en: 'APPLY',   ko: '적용' },
  compose: { en: 'COMPOSE', ko: '작곡' },
  reflect: { en: 'REFLECT', ko: '평가' },
}

const RATING_LABELS: Record<Rating, { ko: string; en: string }> = {
  1: { ko: '많이 막혔다', en: 'Stuck' },
  2: { ko: '아직이다',    en: 'Not yet' },
  3: { ko: '괜찮았다',    en: 'Okay' },
  4: { ko: '잘 됐다',     en: 'Solid' },
  5: { ko: '완벽했다',    en: 'Mastered' },
}

export default function SessionWizard({ protocol }: Props) {
  const router = useRouter()
  const locale = useLocale() as Locale
  const [stepIdx, setStepIdx] = useState(0)
  const [rating, setRating]   = useState<Rating | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const step = protocol.steps[stepIdx]
  const isLast = stepIdx === protocol.steps.length - 1
  const isReflect = step.kind === 'reflect'

  const leaf = useMemo(() => getLeafBySlug(protocol.leafSlug), [protocol.leafSlug])
  const backingTrack = step.backingTrackId ? getBackingTrackById(step.backingTrackId) : null

  // Keyboard nav
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setStepIdx(i => Math.min(protocol.steps.length - 1, i + 1))
      if (e.key === 'ArrowLeft')  setStepIdx(i => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [protocol.steps.length])

  const submit = () => {
    if (!rating) return
    logPractice(protocol.leafSlug, protocol.id, rating)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8 animate-fade-in">
        <div className="eyebrow">Recorded</div>
        <h1 className="display text-4xl text-ink">평가가 저장되었습니다.</h1>
        <p className="text-ink-soft text-[15px]">
          다음 복습이 일정에 추가되었습니다. 잘했어요.
        </p>
        <div className="flex flex-col gap-px bg-rule border border-rule mt-8">
          {leaf && (
            <button
              onClick={() => router.push(`/leaf/${leaf.slug}`)}
              className="h-14 bg-paper-bright text-ink hover:bg-surface text-sm font-medium transition-colors"
            >
              잎으로 돌아가기
            </button>
          )}
          <button
            onClick={() => router.push('/')}
            className="h-14 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium transition-colors"
          >
            홈으로
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pb-32 space-y-10">

      {/* 헤더 — 종료 버튼 + 진행률 */}
      <header className="space-y-4">
        <div className="flex items-baseline justify-between">
          <button
            onClick={() => router.push(leaf ? `/leaf/${leaf.slug}` : '/')}
            className="text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest inline-flex items-center gap-2"
          >
            <IconArrowLeft size={14} /> EXIT SESSION
          </button>
          <span className="text-xs font-mono tabular text-ink-faint tracking-widest">
            {String(stepIdx + 1).padStart(2, '0')}<span className="text-ink-quiet"> / {String(protocol.steps.length).padStart(2, '0')}</span>
          </span>
        </div>

        {/* 진행 바 */}
        <div className="flex gap-px h-0.5 bg-rule">
          {protocol.steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-colors duration-300 ${
                i <= stepIdx ? 'bg-ink' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </header>

      {/* 단계 헤더 */}
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="section-no">
            {String(stepIdx + 1).padStart(2, '0')}
          </span>
          <span className="eyebrow">
            {STEP_KIND_LABELS[step.kind].en} · {Math.round(step.durationSec / 60 * 10) / 10} MIN
          </span>
        </div>
        <h1 className="display text-3xl md:text-4xl text-ink leading-tight">
          {step.title[locale]}
        </h1>
        <p className="text-ink-soft text-[15px] leading-relaxed">
          {step.prompt[locale]}
        </p>
      </div>

      {/* 단계별 컨텐츠 */}
      <div className="space-y-8">
        {step.abcNotation && (
          <div className="border border-rule p-5 bg-paper-bright">
            <div className="eyebrow mb-3">Example</div>
            <SheetMusic notation={step.abcNotation} />
          </div>
        )}

        {backingTrack && (
          <BackingTrackPlayer track={backingTrack} />
        )}

        {step.hint && (
          <Hint label="Hint">{step.hint[locale]}</Hint>
        )}

        {/* Reflect 단계: 평가 슬라이더 */}
        {isReflect && (
          <div className="border border-rule bg-paper-bright p-6 space-y-5">
            <div>
              <div className="eyebrow mb-1">Self Rating</div>
              <h2 className="text-lg font-semibold text-ink">오늘 어땠나요?</h2>
            </div>
            <div className="grid grid-cols-5 gap-px bg-rule">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n as Rating)}
                  className={`h-20 flex flex-col items-center justify-center gap-1.5 transition-colors ${
                    rating === n
                      ? 'bg-ink text-ink-inv'
                      : 'bg-paper-bright text-ink hover:bg-surface'
                  }`}
                >
                  <span className="text-2xl font-mono tabular font-medium">{n}</span>
                  <span className={`text-[10px] tracking-widest ${
                    rating === n ? 'text-ink-inv/60' : 'text-ink-faint'
                  }`}>
                    {RATING_LABELS[n as Rating].ko}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-ink-faint">
              4점 이상 → 다음 박스로 진급 (간격 늘어남). 3점 → 박스 유지. 1-2점 → 박스 1로 리셋.
            </p>
          </div>
        )}
      </div>

      {/* 하단 컨트롤 — sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-paper border-t border-rule z-30">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setStepIdx(i => Math.max(0, i - 1))}
            disabled={stepIdx === 0}
            className="text-xs font-mono tracking-widest text-ink-faint hover:text-ink disabled:opacity-20 inline-flex items-center gap-2"
          >
            <IconArrowLeft size={14} /> BACK
          </button>

          <div className="text-[10px] font-mono tabular text-ink-quiet tracking-widest">
            STEP {stepIdx + 1} / {protocol.steps.length}
          </div>

          {isLast ? (
            <button
              onClick={submit}
              disabled={!rating}
              className="h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono tracking-widest inline-flex items-center gap-2 transition-colors"
            >
              <IconCheck size={14} /> SUBMIT
            </button>
          ) : (
            <button
              onClick={() => setStepIdx(i => Math.min(protocol.steps.length - 1, i + 1))}
              className="h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft text-xs font-mono tracking-widest inline-flex items-center gap-2 transition-colors"
            >
              NEXT <IconArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
