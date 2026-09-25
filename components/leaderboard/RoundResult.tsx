'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import AccountForm from './AccountForm'
import type { GameType } from '@/lib/train/games'
import { getDrillScore } from '@/lib/progress/drills'
import { ACCURACY_GATE } from '@/lib/progress/thresholds'
import {
  LEADERBOARD_ENABLED,
  LEADERBOARD_EVENT,
  fetchMyBest,
  fetchRankFor,
  getMe,
  submitRound,
  type Me,
  type Standing,
} from '@/lib/leaderboard/client'

export interface RoundSummary {
  /** 라운드마다 고유한 값 — 같은 라운드를 두 번 올리지 않기 위해 쓴다 */
  id: number
  correct: number
  total: number
  durationSec: number
}

interface Props {
  game: GameType
  round: RoundSummary
  /** 순위 인정 조건을 지킨 라운드인지 (코드: 7th만, 스케일: 전체 출제 범위) */
  ranked?: boolean
  /** ranked가 false일 때 보여줄 이유 */
  unrankedNote?: string
  onAgain: () => void
}

// 개발 모드의 effect 이중 실행에서도 한 번만 올리도록 모듈 단위로 기억한다
const submitted = new Set<number>()
// 결과 화면에 그리는 최근 라운드 수
const TRAIL = 12

// 라운드가 끝난 직후의 화면. 가입을 권하는 유일한 자리 —
// 방금 낸 기록과 예상 순위를 보여 주고, 그 자리에서 닉네임·비밀번호만 받는다.
export default function RoundResult({ game, round, ranked = true, unrankedNote, onAgain }: Props) {
  const t = useTranslations('result')
  // 정답 하나에 걸린 초 — 낮을수록 빠르다 (순위표의 spc와 같은 식)
  const spc = round.correct > 0 ? Math.round((round.durationSec / round.correct) * 100) / 100 : null
  const accuracy = round.total > 0 ? round.correct / round.total : 0
  const passed = accuracy >= ACCURACY_GATE && spc !== null
  const eligible = ranked && passed

  const [me, setMe] = useState<Me | null>(null)
  const [ready, setReady] = useState(false)
  const [before, setBefore] = useState<number | null>(null)
  const [after, setAfter] = useState<Standing | null>(null)
  const [wouldBe, setWouldBe] = useState<Standing | null>(null)

  // 내 개인 기록(이 브라우저 기준) — 정확도와 상관없이 모든 라운드. 정답 하나에 걸린 초는
  // 오답이 많을수록 저절로 길어지므로 따로 거르지 않는다. 마지막 항목이 방금 라운드다.
  const [trail] = useState<number[]>(() =>
    (getDrillScore(game)?.history ?? [])
      .filter((r) => r.correct > 0)
      .slice(-TRAIL)
      .map((r) => Math.round((r.durationSec / r.correct) * 100) / 100)
  )
  const earlier = trail.slice(0, -1)
  const prevBest = earlier.length ? Math.min(...earlier) : null

  const settle = useCallback(async () => {
    const who = await getMe()
    setMe(who)
    if (who) setAfter(await fetchMyBest(game, who.profileId))
    else if (eligible && spc !== null) setWouldBe(await fetchRankFor(game, spc))
    setReady(true)
  }, [spc, eligible, game])

  useEffect(() => {
    if (!LEADERBOARD_ENABLED) return
    const run = async () => {
      if (!submitted.has(round.id)) {
        submitted.add(round.id)
        const who = await getMe()
        if (who) setBefore((await fetchMyBest(game, who.profileId))?.rank ?? null)
        // 로그인 전에는 순위에 들 수 있는 기록만 보관한다 (보관함은 5개뿐)
        if (ranked && (who || passed)) {
          await submitRound(game, { correct: round.correct, total: round.total, durationSec: round.durationSec })
        }
      }
      await settle()
    }
    void run()
    // 가입·로그인 직후: 보관해 둔 기록이 올라가므로 순위를 다시 읽는다
    window.addEventListener(LEADERBOARD_EVENT, settle)
    return () => window.removeEventListener(LEADERBOARD_EVENT, settle)
  }, [game, passed, ranked, round, settle])

  // 양수면 이전 최고 기록보다 그만큼 빨라진 것
  const diff = prevBest === null || spc === null ? null : Math.round((prevBest - spc) * 100) / 100

  return (
    <div className="font-sans" aria-live="polite">
      <div className={`px-5 py-8 sm:px-8 sm:py-10 ${eligible ? 'bg-ok' : ''}`}>
        <div className="flex items-baseline justify-between gap-4">
          <span className="label">{t('title')}</span>
          <span className="label tabular normal-case">
            {`${round.correct}/${round.total} · ${Math.round(accuracy * 100)}% · ${round.durationSec.toFixed(1)}s`}
          </span>
        </div>
        {/* 숫자는 절대 줄바꿈하지 않는다 — 좁은 화면에서는 글자를 줄이고 설명은 아래 줄로 */}
        <div className="mt-3 flex items-end gap-2 whitespace-nowrap sm:gap-3">
          <span className="display tabular leading-[0.85]" style={{ fontSize: 'clamp(3.5rem, 19vw, 8.5rem)' }}>
            {spc === null ? '—' : spc.toFixed(2)}
          </span>
          <span className="display pb-1 text-2xl sm:pb-2 sm:text-4xl">{t('unit')}</span>
        </div>
        <p className="label mt-2 normal-case text-ink-soft">{t('speedNote')}</p>

        {trail.length > 1 && spc !== null && <Trail values={trail} />}

        <p className="label mt-4 normal-case">
          {spc === null
            ? t('noCorrect')
            : diff === null
            ? t('first')
            : diff > 0
            ? t('newBest', { diff: diff.toFixed(2) })
            : diff === 0
            ? t('sameBest')
            : t('toBest', { diff: Math.abs(diff).toFixed(2) })}
        </p>
      </div>

      <div className="border-t border-ink px-5 py-6 sm:px-8">
        {!LEADERBOARD_ENABLED ? null : !eligible ? (
          <p className="break-keep text-[15px] leading-[1.6]">
            {!passed
              ? t('lowAccuracy', { gate: Math.round(ACCURACY_GATE * 100) })
              : unrankedNote ?? t('unranked')}
          </p>
        ) : !ready ? (
          <p className="label text-ink-faint">{t('checking')}</p>
        ) : me ? (
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="label text-ink-faint">{t('boardOf', { name: me.nickname })}</p>
              <p className="display tabular mt-2 text-5xl leading-none sm:text-6xl">
                {after === null ? '—' : before !== null && before !== after.rank ? `#${before} → #${after.rank}` : `#${after.rank}`}
              </p>
            </div>
            <p className="label pb-1 text-right normal-case text-ink-soft">
              {after !== null && (
                <span className="mb-1 block text-ink">
                  {t('topPercent', { pct: after.topPercent })} · {t('ofPlayers', { total: after.total, rank: after.rank })}
                </span>
              )}
              {before !== null && after !== null && after.rank < before
                ? t('rankUp')
                : before === null && after !== null
                ? t('firstRank')
                : t('bestRank')}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-[1fr_17rem] sm:items-start">
            <div>
              <p className="label text-ink-faint">{t('leaderboard')}</p>
              <p className="display mt-2 break-keep text-3xl leading-[1.05] sm:text-4xl">
                {t('wouldBePrefix')}{' '}
                <span className="bg-pink px-[0.12em] tabular">
                  {wouldBe === null ? '—' : t('topPercent', { pct: wouldBe.topPercent })}
                </span>
              </p>
              {wouldBe !== null && (
                <p className="label mt-3 normal-case tabular text-ink-soft">
                  {t('ofPlayers', { total: wouldBe.total, rank: wouldBe.rank })}
                </p>
              )}
              <p className="mt-3 break-keep text-[13px] leading-[1.6] text-ink-soft">
                {t('joinPitch')}
              </p>
            </div>
            <AccountForm id={`result-${game}`} joinLabel={t('upload')} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-ink bg-gray px-3 py-3 font-mono">
        <span className="text-[11px] uppercase">{t('saved')}</span>
        <button type="button" onClick={onAgain} className="os-btn">
          {me || !eligible ? t('again') : t('againSkip')}
        </button>
      </div>
    </div>
  )
}

// 최근 라운드의 반응속도 막대 — 낮을수록 좋다. 최고 기록은 핑크, 방금 라운드는 잉크색.
// 제일 중요한 건 이 막대가 점점 낮아지는 것이다.
function Trail({ values }: { values: number[] }) {
  const t = useTranslations('result')
  const max = Math.max(...values)
  const best = Math.min(...values)
  const bestIdx = values.indexOf(best)
  const last = values.length - 1

  return (
    <div className="mt-5">
      <div className="flex h-14 items-end gap-1" role="img" aria-label={t('trailAria', { n: values.length, best: best.toFixed(2) })}>
        {values.map((v, i) => (
          <div key={i} className="relative flex-1">
            <div
              className={`w-full ${i === last ? 'bg-ink' : i === bestIdx ? 'bg-pink' : 'bg-ink/20'}`}
              style={{ height: `${Math.max(6, (v / max) * 56)}px` }}
            />
            {i === bestIdx && i !== last && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px] tabular text-ink-soft">
                {v.toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex items-baseline justify-between font-mono text-[11px] text-ink-soft">
        <span>{t('trail', { n: values.length })}</span>
        <span className="tabular">{t('best', { best: best.toFixed(2) })}</span>
      </div>
    </div>
  )
}
