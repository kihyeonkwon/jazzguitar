'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { leaves } from '@/lib/curriculum/organic'
import { pickTodaysDrill, pickTodaysLeaf, DRILL_LABELS } from '@/lib/practice/daily'
import { getDrillScore } from '@/lib/progress/drills'
import { getLeafScore } from '@/lib/progress/store'
import { Locale, Leaf } from '@/lib/curriculum/types'
import { IconArrowRight, IconPlay } from '@/components/icons'

export default function DailySession() {
  const locale = useLocale() as Locale
  const [mounted, setMounted] = useState(false)
  const [drillType, setDrillType] = useState<string>('')
  const [drillScore, setDrillScore] = useState<number | null>(null)
  const [leaf, setLeaf] = useState<Leaf | null>(null)
  const [leafScore, setLeafScoreState] = useState(0)

  useEffect(() => {
    const drill = pickTodaysDrill()
    setDrillType(drill)
    setDrillScore(getDrillScore(drill)?.bestScore ?? null)

    const todayLeaf = pickTodaysLeaf(leaves)
    setLeaf(todayLeaf)
    if (todayLeaf) {
      setLeafScoreState(
        getLeafScore(todayLeaf.slug, todayLeaf.checkpoints, todayLeaf.selfCheck.length),
      )
    }
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="h-64 bg-surface animate-pulse" />
      </div>
    )
  }

  // 모든 잎 100점 졸업 상태
  if (!leaf) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-6">
        <div className="eyebrow">Mastered</div>
        <h1 className="display text-4xl text-ink">모든 잎을 졸업했습니다.</h1>
        <p className="text-ink-soft">
          새로운 잎이 추가될 때까지 잠시 쉬어가셔도 됩니다. 또는 Tree에서 더 깊이 파고들 잎을 직접 골라보세요.
        </p>
        <Link
          href="/curriculum"
          className="inline-flex h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft text-sm font-medium items-center transition-colors"
        >
          Tree로 가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-16">

      {/* Header */}
      <header className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="section-no">00</span>
          <span className="eyebrow">Today&rsquo;s Session</span>
        </div>
        <h1 className="display text-5xl text-ink leading-[0.95]">
          오늘,<br />한 잎.
        </h1>
        <p className="text-ink-soft text-[15px] max-w-md leading-relaxed">
          짧은 워밍업 한 가지 → 오늘의 잎 한 가지. 시스템이 가장 약한 곳을 골라드립니다.
        </p>
      </header>

      {/* STEP 1: WARMUP */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="section-no">01</span>
            <span className="eyebrow">Warmup · 5 min</span>
          </div>
          <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
            {drillScore !== null ? `BEST ${drillScore}%` : 'NEW'}
          </span>
        </div>

        <div className="border border-rule bg-paper-bright p-6 space-y-5">
          <div>
            <div className="display text-2xl text-ink leading-snug">
              {DRILL_LABELS[drillType] ?? drillType}
            </div>
            <div className="text-sm text-ink-soft mt-1">
              가장 약한 드릴부터 한 라운드. 점수가 가장 낮은 것을 자동 선택.
            </div>
          </div>
          <Link
            href={`/drill/${drillType}`}
            className="inline-flex items-center gap-2 h-10 px-5 bg-ink text-ink-inv hover:bg-ink-soft transition-colors text-sm font-medium"
          >
            <IconPlay size={14} />
            시작
          </Link>
        </div>
      </section>

      {/* STEP 2: TODAY'S LEAF */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="section-no">02</span>
            <span className="eyebrow">Today&rsquo;s Leaf</span>
          </div>
          <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
            PROGRESS {leafScore}<span className="text-ink-quiet"> / 100</span>
          </span>
        </div>

        <Link
          href={`/leaf/${leaf.slug}`}
          className="group block border border-rule bg-paper-bright p-6 space-y-5 hover:bg-surface transition-colors"
        >
          <div>
            <div className="display text-2xl text-ink leading-snug">
              {leaf.title[locale]}
            </div>
            <div className="text-sm text-ink-soft mt-1 leading-relaxed">
              {leaf.description[locale]}
            </div>
          </div>

          {/* progress bar */}
          <div className="h-px bg-rule overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-700"
              style={{ width: `${leafScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tabular tracking-widest text-ink-faint">
              {leafScore === 0 ? 'START' : leafScore < 30 ? 'BRONZE'
                : leafScore < 60 ? 'SILVER'
                : leafScore < 85 ? 'GOLD'
                : 'MASTER'}
            </span>
            <IconArrowRight size={16} className="text-ink-faint group-hover:text-ink transition-colors" />
          </div>
        </Link>
      </section>

      {/* Quick links */}
      <footer className="flex flex-wrap gap-6 text-xs text-ink-faint pt-8 border-t border-rule">
        <Link href="/jam"        className="hover:text-ink transition-colors">Jam 라이브러리</Link>
        <Link href="/curriculum" className="hover:text-ink transition-colors">Tree of Jazz</Link>
        <Link href="/drill"      className="hover:text-ink transition-colors">전체 드릴</Link>
        <span className="ml-auto font-mono tabular">v0.2</span>
      </footer>
    </div>
  )
}
