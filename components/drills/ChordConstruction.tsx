'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import ChordQuiz from '@/components/music/ChordQuiz'
import DrillFrame from './shared/DrillFrame'
import StartOverlay from './shared/StartOverlay'
import { formatSpc, formatSec, useLiveStats } from './shared/useLiveStats'
import { saveDrillRound } from '@/lib/progress/drills'
import RoundResult, { type RoundSummary } from '@/components/leaderboard/RoundResult'

const ROUND_SIZE = 10  // 10 chord attempts = 1 round

export default function ChordConstruction() {
  const t = useTranslations('game')
  const tGames = useTranslations('games')
  const tResult = useTranslations('result')
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const roundStartRef = useRef<number>(0)
  const lastSavedCorrectRef = useRef<number>(0)
  const lastSavedTotalRef = useRef<number>(0)
  // 리더보드는 7th 모드로만 끝낸 라운드를 받는다 (Triad가 섞이면 제외)
  const rankedRef = useRef<boolean>(true)
  const modeRef = useRef<'triad' | 'seventh'>('seventh')
  // 10번째 답을 채점하면 여기에 담아 두고, Next를 누를 때 결과 화면으로 넘긴다
  const finishedRef = useRef<{ summary: RoundSummary; ranked: boolean } | null>(null)
  const [summary, setSummary] = useState<{ summary: RoundSummary; ranked: boolean } | null>(null)
  // 이번 라운드의 문제별 정답 여부 — 진행 막대를 초록/빨강으로 채운다
  const [results, setResults] = useState<boolean[]>([])
  const prevScoreRef = useRef({ correct: 0, total: 0 })
  // 채점 결과를 보는 동안에는 시계를 세운다 — Next/Retry를 누르면 그만큼 시작 시각을 민다
  const pausedAtRef = useRef<number>(0)
  // 라운드가 끝난 순간의 계기판 값 (다음 라운드가 시작될 때까지 그대로 보여 준다)
  const frozenRef = useRef<{ elapsedMs: number; correct: number } | null>(null)
  // 시작 버튼을 누르기 전에는 장막 뒤에 예시만 보인다
  const [started, setStarted] = useState(false)

  // 시작: 그 순간부터 시간을 잰다. 퀴즈는 key가 바뀌며 새로 마운트되어 첫 코드를 무작위로 뽑는다.
  const start = useCallback(() => {
    roundStartRef.current = Date.now()
    pausedAtRef.current = 0
    frozenRef.current = null
    setStarted(true)
  }, [])

  const resumeClock = useCallback(() => {
    if (pausedAtRef.current && roundStartRef.current) roundStartRef.current += Date.now() - pausedAtRef.current
    pausedAtRef.current = 0
  }, [])

  // 라운드 완료 시 점수 저장
  useEffect(() => {
    if (score.total > prevScoreRef.current.total) {
      const wasCorrect = score.correct > prevScoreRef.current.correct
      // 채점 결과를 진행 막대에 반영한다
      setResults((prev) => (prev.length >= ROUND_SIZE ? [wasCorrect] : [...prev, wasCorrect]))
      pausedAtRef.current = Date.now()
    }
    prevScoreRef.current = score
    if (score.total > 0 && score.total % ROUND_SIZE === 0) {
      const startedAt = roundStartRef.current || Date.now()
      const elapsedMs = Date.now() - startedAt
      const elapsedSec = Math.max(1, Math.round(elapsedMs / 100) / 10)
      const roundCorrect = score.correct - lastSavedCorrectRef.current
      const roundTotal = score.total - lastSavedTotalRef.current
      const round = { correct: roundCorrect, total: roundTotal, durationSec: elapsedSec }
      frozenRef.current = { elapsedMs, correct: roundCorrect }
      saveDrillRound('chord-construction', round)
      // 리더보드 제출과 가입 권유는 결과 화면(RoundResult)이 맡는다
      finishedRef.current = { summary: { id: Date.now(), ...round }, ranked: rankedRef.current }
      rankedRef.current = modeRef.current === 'seventh'
      lastSavedCorrectRef.current = score.correct
      lastSavedTotalRef.current = score.total
      // 다음 라운드의 시계는 첫 입력에서 다시 시작한다
      roundStartRef.current = 0
      pausedAtRef.current = 0
    }
  }, [score])

  // 타자 연습처럼 실시간으로 바뀌는 경과 시간과 SPC (결과 화면에서는 마지막 값에서 멈춘다)
  const live = useLiveStats(started && !summary, () =>
    frozenRef.current ?? {
      elapsedMs: roundStartRef.current ? (pausedAtRef.current || Date.now()) - roundStartRef.current : 0,
      correct: prevScoreRef.current.correct - lastSavedCorrectRef.current,
    }
  )

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  const currentRound = Math.floor(score.total / ROUND_SIZE) + 1
  const inRoundProgress = score.total % ROUND_SIZE

  return (
    <DrillFrame
      number={2}
      drillType="chord-construction"
      title={tGames('chord-construction.title')}
      description={tGames('chord-construction.rules')}
      footerStats={[
        { label: t('statTime'), value: formatSec(live.sec), unit: 's', live: true },
        { label: t('statSpc'), value: formatSpc(live.spc), unit: live.spc === null ? undefined : 's', live: true },
        { label: t('statRound'),    value: `${currentRound}` },
        { label: t('statProgress'), value: `${inRoundProgress}/${ROUND_SIZE}` },
        { label: t('statAccuracy'), value: `${accuracy}%` },
      ]}
    >
      <ChordQuiz
        key={started ? 'run' : 'idle'}
        randomFirst={started}
        veil={started ? undefined : <StartOverlay onStart={start} questions={ROUND_SIZE} />}
        onScoreChange={setScore}
        roundResults={results}
        roundSize={ROUND_SIZE}
        onInput={() => {
          // 라운드 시계는 첫 입력에서 시작 — 첫 문제도 시간에 포함된다
          if (roundStartRef.current === 0) roundStartRef.current = Date.now()
        }}
        onRetry={resumeClock}
        onNext={() => {
          resumeClock()
          if (finishedRef.current) {
            setSummary(finishedRef.current)
            finishedRef.current = null
          }
        }}
        overlay={
          summary ? (
            <RoundResult
              game="chord-construction"
              round={summary.summary}
              ranked={summary.ranked}
              unrankedNote={tResult('unrankedChord')}
              onAgain={() => {
                setSummary(null)
                setResults([])
                frozenRef.current = null
                roundStartRef.current = Date.now()
              }}
            />
          ) : undefined
        }
        onModeChange={(m) => {
          // 채점 화면에서 모드를 바꾸면 새 문제가 나오므로 시계도 다시 간다
          resumeClock()
          modeRef.current = m
          if (m !== 'seventh') rankedRef.current = false
        }}
      />
    </DrillFrame>
  )
}
