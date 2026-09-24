'use client'

import { useMemo, useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { Stat } from '@/components/ui'
import { cpmToSpc } from '@/lib/progress/thresholds'
import {
  getCurrentLevel,
  getDrillScore,
  CurrentLevelInfo,
  DrillLevel,
  LevelAchievement,
  DRILL_SCORES_EVENT,
} from '@/lib/progress/drills'

const EMPTY: Snapshot = {
  level: null,
  avgCpm: null,
  avgAccuracy: null,
  trend: null,
  roundsAnalyzed: 0,
  accuracyGated: false,
  achievements: [],
}

interface Snapshot extends CurrentLevelInfo {
  achievements: LevelAchievement[]
}

const LEVEL_TIERS: DrillLevel[] = ['proficient', 'fluent', 'master']

function subscribe(cb: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', cb)
  window.addEventListener(DRILL_SCORES_EVENT, cb)
  return () => {
    window.removeEventListener('storage', cb)
    window.removeEventListener(DRILL_SCORES_EVENT, cb)
  }
}

function makeSnapshot(drillType: string) {
  let lastKey = ''
  let lastValue: Snapshot = EMPTY
  return () => {
    const level = getCurrentLevel(drillType)
    const stored = getDrillScore(drillType)
    const achievements = stored?.achievements ?? []
    const achievementKey = achievements
      .map((a) => `${a.level}:${a.at}`)
      .join(',')
    const key = `${level.level}|${level.avgCpm}|${level.avgAccuracy}|${level.trend}|${level.roundsAnalyzed}|${level.accuracyGated}|${achievementKey}`
    if (key !== lastKey) {
      lastKey = key
      lastValue = { ...level, achievements }
    }
    return lastValue
  }
}

// 숫자(SPC)가 움직인 방향 — 빨라지면 초가 줄어드니 ↓
function trendIcon(t: CurrentLevelInfo['trend']): string {
  if (t === 'up') return ' ↓'
  if (t === 'down') return ' ↑'
  if (t === 'flat') return ' →'
  return ''
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toISOString().slice(0, 10)
  } catch {
    return ''
  }
}

export default function DrillLibraryStats({ drillType }: { drillType: string }) {
  const t = useTranslations('stats')
  const tLevel = useTranslations('levels')
  const getSnapshot = useMemo(() => makeSnapshot(drillType), [drillType])
  const info = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)

  const achievementsByLevel = new Map<DrillLevel, LevelAchievement>()
  for (const a of info.achievements) achievementsByLevel.set(a.level, a)

  if (info.roundsAnalyzed === 0) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Stat label={t('level')} value="—" hint={t('none')} />
          <Stat label={t('spc')} value="—" />
        </div>
        <AchievementRow achievementsByLevel={achievementsByLevel} />
      </div>
    )
  }

  const levelText = info.level
    ? tLevel(info.level) + (info.accuracyGated ? '*' : '')
    : t('measuring')
  const spcText = info.avgCpm ? `${cpmToSpc(info.avgCpm).toFixed(2)}s${trendIcon(info.trend)}` : '—'
  const accHint =
    info.avgAccuracy != null
      ? t('accuracy', { pct: Math.round(info.avgAccuracy * 100) })
      : undefined

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Stat
          label={t('level')}
          value={levelText}
          hint={
            info.roundsAnalyzed < 3
              ? t('measuringCount', { n: info.roundsAnalyzed })
              : info.accuracyGated
              ? t('gated')
              : t('recentAvg', { n: info.roundsAnalyzed })
          }
        />
        <Stat label={t('spc')} value={spcText} hint={accHint} />
      </div>
      <AchievementRow achievementsByLevel={achievementsByLevel} />
    </div>
  )
}

function AchievementRow({
  achievementsByLevel,
}: {
  achievementsByLevel: Map<DrillLevel, LevelAchievement>
}) {
  const t = useTranslations('stats')
  const tLevel = useTranslations('levels')

  return (
    <div className="flex items-center gap-2 pt-2 border-t border-rule">
      <span className="eyebrow text-[10px]">{t('achieved')}</span>
      <div className="flex gap-1.5 flex-wrap">
        {LEVEL_TIERS.map((lvl) => {
          const a = achievementsByLevel.get(lvl)
          const reached = !!a
          return (
            <span
              key={lvl}
              title={a && a.cpm > 0 ? `${formatDate(a.at)} · ${cpmToSpc(a.cpm).toFixed(2)}s` : t('notYet')}
              className={`text-[10px] font-mono tracking-widest px-1.5 py-0.5 border ${
                reached
                  ? 'border-ink bg-ink text-ink-inv'
                  : 'border-rule text-ink-faint'
              }`}
            >
              {tLevel(lvl)}
            </span>
          )
        })}
      </div>
    </div>
  )
}
