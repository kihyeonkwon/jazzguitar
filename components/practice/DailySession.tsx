'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { leaves } from '@/lib/curriculum/organic'
import { pickTodaysDrill, pickTodaysLeaf, DRILL_LABELS } from '@/lib/practice/daily'
import { DRILL_SCORES_EVENT, getDrillScore } from '@/lib/progress/drills'
import { getLeafScore, PROGRESS_STORE_EVENT } from '@/lib/progress/store'
import { Locale, Leaf } from '@/lib/curriculum/types'
import { IconArrowRight, IconPlay } from '@/components/icons'
import { Card, Stat } from '@/components/ui'

interface DailyModel {
  mounted: boolean
  drillType: string
  drillScore: number | null
  leaf: Leaf | null
  leafScore: number
}

const EMPTY_DAILY_MODEL: DailyModel = {
  mounted: false,
  drillType: '',
  drillScore: null,
  leaf: null,
  leafScore: 0,
}

function subscribeDailySession(onChange: () => void) {
  window.addEventListener(DRILL_SCORES_EVENT, onChange)
  window.addEventListener(PROGRESS_STORE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(DRILL_SCORES_EVENT, onChange)
    window.removeEventListener(PROGRESS_STORE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function makeDailySnapshot() {
  let lastKey = ''
  let lastValue = EMPTY_DAILY_MODEL
  return () => {
    const drillType = pickTodaysDrill()
    const leaf = pickTodaysLeaf(leaves)
    const nextValue: DailyModel = {
      mounted: true,
      drillType,
      drillScore: getDrillScore(drillType)?.bestScore ?? null,
      leaf,
      leafScore: leaf
        ? getLeafScore(leaf.slug, leaf.checkpoints, leaf.selfCheck.length)
        : 0,
    }
    const nextKey = JSON.stringify({
      drillType: nextValue.drillType,
      drillScore: nextValue.drillScore,
      leafSlug: nextValue.leaf?.slug ?? null,
      leafScore: nextValue.leafScore,
    })
    if (nextKey !== lastKey) {
      lastKey = nextKey
      lastValue = nextValue
    }
    return lastValue
  }
}

export default function DailySession() {
  const locale = useLocale() as Locale
  const getSnapshot = useMemo(() => makeDailySnapshot(), [])
  const { mounted, drillType, drillScore, leaf, leafScore } = useSyncExternalStore(
    subscribeDailySession,
    getSnapshot,
    () => EMPTY_DAILY_MODEL
  )

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

  const leafStatus = leafScore === 0 ? 'START' : leafScore < 30 ? 'BRONZE'
    : leafScore < 60 ? 'SILVER'
    : leafScore < 85 ? 'GOLD'
    : 'MASTER'
  const remainingScore = Math.max(0, 100 - leafScore)

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-14">

      {/* Header */}
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
        <div className="space-y-7">
          <div className="flex items-baseline gap-3">
            <span className="section-no">00</span>
            <span className="eyebrow">Today&rsquo;s Session</span>
          </div>
          <div className="space-y-5">
            <h1 className="display text-[4.5rem] sm:text-8xl lg:text-[7.5rem] text-ink leading-[1.08]">
              오늘,<br />한 잎.
            </h1>
            <p className="text-ink-soft text-base sm:text-lg max-w-2xl leading-8">
              짧은 워밍업 하나, 오늘의 잎 하나. 선택은 시스템이 하고 연습은 손이 합니다.
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-baseline justify-between border-b border-rule px-5 py-4">
            <span className="eyebrow">Practice Sheet</span>
            <span className="section-no">60 MIN</span>
          </div>
          <div className="divide-y divide-rule">
            <div className="grid grid-cols-[72px_1fr] gap-5 px-5 py-5">
              <Stat label="Warm" value="05" />
              <div className="space-y-1.5">
                <div className="display text-xl text-ink leading-tight">
                  {DRILL_LABELS[drillType] ?? drillType}
                </div>
                <p className="text-sm leading-6 text-ink-soft">
                  가장 낮은 점수의 드릴 한 라운드
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-5 px-5 py-5">
              <Stat label="Leaf" value="40" />
              <div className="space-y-1.5">
                <div className="display text-xl text-ink leading-tight">
                  오늘의 잎 적용
                </div>
                <p className="text-sm leading-6 text-ink-soft">
                  새 재료보다 한 가지를 실제 연주에 붙입니다
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-5 px-5 py-5">
              <Stat label="Jam" value="10" />
              <div className="space-y-1.5">
                <div className="display text-xl text-ink leading-tight">
                  한 코러스 녹음
                </div>
                <p className="text-sm leading-6 text-ink-soft">
                  남은 숙련도 {remainingScore}점. 오늘의 기준을 소리로 남깁니다
                </p>
              </div>
            </div>
          </div>
        </Card>
      </header>

      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
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

          <Card className="p-6 sm:p-7 space-y-6 min-h-[300px] flex flex-col">
            <div className="space-y-3">
              <div className="w-11 h-11 bg-surface border border-rule flex items-center justify-center text-ink">
                <IconPlay size={16} />
              </div>
              <div>
                <div className="display text-[1.75rem] text-ink leading-tight">
                  {DRILL_LABELS[drillType] ?? drillType}
                </div>
                <div className="text-sm text-ink-soft mt-3 leading-6">
                  가장 약한 드릴부터 한 라운드. 손가락과 머리를 같이 깨웁니다.
                </div>
              </div>
            </div>
            <Link
              href={`/drill/${drillType}`}
              className="mt-auto inline-flex items-center justify-center gap-2 h-11 px-5 bg-ink text-ink-inv hover:bg-ink-soft transition-colors text-sm font-medium"
            >
              <IconPlay size={14} />
              시작
            </Link>
          </Card>
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
            className="group block border border-rule bg-paper-bright min-h-[300px] hover:bg-surface transition-colors"
          >
            <div className="grid min-h-[300px] lg:grid-cols-[112px_minmax(0,1fr)]">
              <div className="border-b border-rule p-5 lg:border-b-0 lg:border-r">
                <div className="sticky top-20 space-y-8">
                  <Stat label="Score" value={leafScore} hint="/ 100" />
                  <div>
                    <div className="eyebrow">Status</div>
                    <div className="mt-2 text-xs font-mono tracking-widest text-ink">
                      {leafStatus}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex min-h-[300px] flex-col p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="eyebrow">Assigned Leaf</span>
                    <span className="section-no">AUTO PICK</span>
                  </div>
                  <div>
                    <div className="display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.18] max-w-3xl">
                      {leaf.title[locale]}
                    </div>
                    <div className="text-[15px] sm:text-base text-ink-soft mt-5 leading-7 max-w-2xl">
                      {leaf.description[locale]}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-10 space-y-5">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div className="h-px bg-rule overflow-hidden">
                      <div
                        className="h-full bg-ink transition-all duration-700"
                        style={{ width: `${leafScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono tabular tracking-widest text-ink-faint">
                      {leafScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-rule pt-4">
                    <span className="text-[11px] font-mono tabular tracking-widest text-ink-faint">
                      START PRACTICE
                    </span>
                    <IconArrowRight size={18} className="text-ink-faint group-hover:translate-x-1 group-hover:text-ink transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </div>

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
