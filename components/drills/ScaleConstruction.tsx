'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import DrillFrame from './shared/DrillFrame'
import { fitSize } from './shared/fitText'
import StartOverlay from './shared/StartOverlay'
import { formatSpc, formatSec, useLiveStats } from './shared/useLiveStats'
import { playKey, playNotes } from '@/lib/audio/tones'
import { spellFormula } from '@/lib/music/spell'
import { saveDrillRound } from '@/lib/progress/drills'
import RoundResult, { type RoundSummary } from '@/components/leaderboard/RoundResult'

// 12키 전부 — 5도권 순서
const ROOTS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'] as const
const NOTES_12 = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const BLACK_KEYS = new Set(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])
const ROUND_SIZE = 10

type Result = 'correct' | 'wrong' | null

interface ScaleDef {
  id: string
  name: string
  label: string
  formula: string
  intervals: number[]
}

const SCALES: ScaleDef[] = [
  {
    id: 'major',
    name: 'Major',
    label: '메이저',
    formula: '1 2 3 4 5 6 7',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: 'natural-minor',
    name: 'Natural Minor',
    label: '내츄럴 마이너',
    formula: '1 2 b3 4 5 b6 b7',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 'jazz-minor',
    name: 'Jazz Minor',
    label: '재즈 마이너',
    formula: '1 2 b3 4 5 6 7',
    intervals: [0, 2, 3, 5, 7, 9, 11],
  },
  {
    id: 'harmonic-minor',
    name: 'Harmonic Minor',
    label: '하모닉 마이너',
    formula: '1 2 b3 4 5 b6 7',
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: 'minor-pentatonic',
    name: 'Minor Pentatonic',
    label: '마이너 펜타토닉',
    formula: '1 b3 4 5 b7',
    intervals: [0, 3, 5, 7, 10],
  },
  {
    id: 'blues',
    name: 'Blues Scale',
    label: '블루스 스케일',
    formula: '1 b3 4 b5 5 b7',
    intervals: [0, 3, 5, 6, 7, 10],
  },
  {
    id: 'dorian',
    name: 'Dorian',
    label: '도리안',
    formula: '1 2 b3 4 5 6 b7',
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    label: '믹솔리디안',
    formula: '1 2 3 4 5 6 b7',
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    id: 'lydian',
    name: 'Lydian',
    label: '리디안',
    formula: '1 2 3 #4 5 6 7',
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
]

const ROOT_TO_PC: Record<string, number> = Object.fromEntries(
  NOTES_12.map((note, index) => [note, index])
)

interface Problem {
  root: string
  scale: ScaleDef
}

function pickRandom<T>(arr: readonly T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr
  return pool[Math.floor(Math.random() * pool.length)] ?? arr[0]
}

function notesFor(root: string, scale: ScaleDef): string[] {
  const rootPc = ROOT_TO_PC[root] ?? 0
  return scale.intervals.map((interval) => NOTES_12[(rootPc + interval) % NOTES_12.length])
}

function sameNoteSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const setA = new Set(a)
  return b.every((note) => setA.has(note))
}

export default function ScaleConstruction() {
  const t = useTranslations('game')
  const tGames = useTranslations('games')
  const tScales = useTranslations('scales')
  const tResult = useTranslations('result')
  const [activeRoots, setActiveRoots] = useState<string[]>([...ROOTS])
  const [activeScaleIds, setActiveScaleIds] = useState<string[]>(SCALES.map((s) => s.id))
  const [problem, setProblem] = useState<Problem>({ root: 'C', scale: SCALES[0] })
  const [selected, setSelected] = useState<string[]>([])
  const [result, setResult] = useState<Result>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [shake, setShake] = useState(false)
  // 시작 버튼을 누르기 전에는 장막 뒤에 예시만 보인다
  const [started, setStarted] = useState(false)
  // 이번 라운드의 문제별 정답 여부 — 진행 막대를 초록/빨강으로 채운다
  const [results, setResults] = useState<boolean[]>([])
  const roundStartRef = useRef<number>(0)
  // 채점 결과를 보는 동안에는 시계를 세운다 — Next/Retry를 누르면 그만큼 시작 시각을 민다
  const pausedAtRef = useRef<number>(0)
  // 라운드가 끝난 순간의 계기판 값 (다음 라운드가 시작될 때까지 그대로 보여 준다)
  const frozenRef = useRef<{ elapsedMs: number; correct: number } | null>(null)
  const lastSavedCorrectRef = useRef<number>(0)
  const lastSavedTotalRef = useRef<number>(0)
  const scoreRef = useRef({ correct: 0, total: 0 })
  // 리더보드는 출제 범위를 줄이지 않은 라운드만 받는다
  const rankedRef = useRef<boolean>(true)
  // 10번째 답을 채점하면 여기에 담아 두고, Next를 누를 때 결과 화면으로 넘긴다
  const finishedRef = useRef<{ summary: RoundSummary; ranked: boolean } | null>(null)
  const [summary, setSummary] = useState<{ summary: RoundSummary; ranked: boolean } | null>(null)

  const activeScales = useMemo(
    () => SCALES.filter((scale) => activeScaleIds.includes(scale.id)),
    [activeScaleIds]
  )

  const correctNotes = useMemo(
    () => notesFor(problem.root, problem.scale),
    [problem]
  )

  // 화면에 적는 정답은 이론에 맞는 이름으로 (E 믹솔리디안 = E F# G# A B C# D).
  // 채점과 키 입력은 12개 플랫 이름 그대로 쓴다.
  const spelledNotes = useMemo(
    () => spellFormula(problem.root, problem.scale.formula),
    [problem]
  )

  // 새 문제가 뜰 때마다 스케일을 아래에서 위로 들려준다 (소리가 켜져 있을 때)
  useEffect(() => {
    if (started) playNotes(correctNotes, 'scale')
  }, [correctNotes, started])

  // 타자 연습처럼 실시간으로 바뀌는 경과 시간과 SPC (결과 화면에서는 마지막 값에서 멈춘다)
  const live = useLiveStats(started && !summary, () =>
    frozenRef.current ?? {
      elapsedMs: roundStartRef.current ? (pausedAtRef.current || Date.now()) - roundStartRef.current : 0,
      correct: scoreRef.current.correct - lastSavedCorrectRef.current,
    }
  )

  const resumeClock = useCallback(() => {
    if (pausedAtRef.current && roundStartRef.current) roundStartRef.current += Date.now() - pausedAtRef.current
    pausedAtRef.current = 0
  }, [])

  const targetCount = correctNotes.length
  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  const inRoundProgress = score.total % ROUND_SIZE
  const currentRound = Math.floor(score.total / ROUND_SIZE) + 1

  const nextProblem = useCallback(() => {
    if (finishedRef.current) {
      setSummary(finishedRef.current)
      finishedRef.current = null
    }
    resumeClock()
    const nextRoot = pickRandom(activeRoots, problem.root)
    const nextScale = pickRandom(activeScales, problem.scale)
    setProblem({ root: nextRoot, scale: nextScale })
    setSelected([])
    setResult(null)
  }, [activeRoots, activeScales, problem.root, problem.scale, resumeClock])

  // 시작: 첫 문제를 새로 뽑고 그 순간부터 시간을 잰다 (장막 뒤의 예시는 문제가 아니다)
  const start = useCallback(() => {
    setProblem({ root: pickRandom(activeRoots), scale: pickRandom(activeScales) })
    setSelected([])
    setResult(null)
    roundStartRef.current = Date.now()
    pausedAtRef.current = 0
    frozenRef.current = null
    setStarted(true)
  }, [activeRoots, activeScales])

  const toggleRoot = useCallback((root: string) => {
    setActiveRoots((prev) => {
      if (prev.includes(root)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== root)
      }
      return [...prev, root]
    })
  }, [])

  const toggleScale = useCallback((scaleId: string) => {
    setActiveScaleIds((prev) => {
      if (prev.includes(scaleId)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== scaleId)
      }
      return [...prev, scaleId]
    })
  }, [])

  const grade = useCallback(
    (nextSelected: string[]) => {
      const isCorrect = sameNoteSet(nextSelected, correctNotes)
      const nextScore = {
        correct: score.correct + (isCorrect ? 1 : 0),
        total: score.total + 1,
      }

      if (roundStartRef.current === 0) {
        roundStartRef.current = Date.now()
      }
      pausedAtRef.current = Date.now()
      const fullRange = activeRoots.length === ROOTS.length && activeScaleIds.length === SCALES.length
      if (!fullRange) rankedRef.current = false
      if (nextScore.total > 0 && nextScore.total % ROUND_SIZE === 0) {
        const elapsedMs = Date.now() - roundStartRef.current
        const elapsedSec = Math.max(1, Math.round(elapsedMs / 100) / 10)
        const roundCorrect = nextScore.correct - lastSavedCorrectRef.current
        const roundTotal = nextScore.total - lastSavedTotalRef.current
        const round = { correct: roundCorrect, total: roundTotal, durationSec: elapsedSec }
        frozenRef.current = { elapsedMs, correct: roundCorrect }
        saveDrillRound('scale-construction', round)
        // 리더보드 제출과 가입 권유는 결과 화면(RoundResult)이 맡는다
        finishedRef.current = { summary: { id: Date.now(), ...round }, ranked: rankedRef.current }
        rankedRef.current = true
        lastSavedCorrectRef.current = nextScore.correct
        lastSavedTotalRef.current = nextScore.total
        // 다음 라운드의 시계는 첫 입력에서 다시 시작한다
        roundStartRef.current = 0
        pausedAtRef.current = 0
      }

      setResult(isCorrect ? 'correct' : 'wrong')
      setScore(nextScore)
      scoreRef.current = nextScore
      setResults((prev) => (prev.length >= ROUND_SIZE ? [isCorrect] : [...prev, isCorrect]))
      if (!isCorrect) {
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    },
    [correctNotes, score, activeRoots, activeScaleIds]
  )

  const toggleNote = useCallback(
    (note: string) => {
      if (!started || result !== null) return
      // 라운드 시계는 첫 입력에서 시작 — 첫 문제도 시간에 포함된다
      if (roundStartRef.current === 0) roundStartRef.current = Date.now()
      // 누른 음을 스케일의 루트 위 음역에서 들려준다 (선택을 풀 때는 소리 없이)
      if (!selected.includes(note)) playKey(note, problem.root)
      const nextSelected = selected.includes(note)
        ? selected.filter((item) => item !== note)
        : selected.length >= targetCount
        ? selected
        : [...selected, note]

      setSelected(nextSelected)
      if (nextSelected.length === targetCount) {
        grade(nextSelected)
      }
    },
    [grade, problem.root, result, selected, started, targetCount]
  )

  const resetAnswer = useCallback(() => {
    resumeClock()
    setSelected([])
    setResult(null)
  }, [resumeClock])

  return (
    <DrillFrame
      number={3}
      drillType="scale-construction"
      title={tGames('scale-construction.title')}
      description={tGames('scale-construction.rules')}
      footerStats={[
        { label: t('statTime'), value: formatSec(live.sec), unit: 's', live: true },
        { label: t('statSpc'), value: formatSpc(live.spc), unit: live.spc === null ? undefined : 's', live: true },
        { label: t('statRound'), value: currentRound },
        { label: t('statProgress'), value: `${inRoundProgress}/${ROUND_SIZE}` },
        { label: t('statAccuracy'), value: `${accuracy}%` },
      ]}
      below={
        // 출제 범위 설정
        <section className="os-window" aria-label={t('settingsAria')}>
          <div className="os-titlebar is-light">
            <span className="os-ctl" aria-hidden />
            <span>{t('settingsTitle')}</span>
          </div>
          <div className="os-body border-t border-ink">
            <div className="flex items-baseline justify-between px-3 pb-2 pt-3">
              <span className="text-[11px] uppercase">{t('roots')}</span>
              <span className="text-[10px] uppercase text-ink-faint tabular">{t('on', { n: activeRoots.length, total: ROOTS.length })}</span>
            </div>
            <div className="grid grid-cols-6 gap-px border-y border-ink bg-ink sm:grid-cols-12">
              {ROOTS.map((root) => {
                const enabled = activeRoots.includes(root)
                return (
                  <button
                    key={root}
                    onClick={() => toggleRoot(root)}
                    aria-pressed={enabled}
                    className={`h-10 text-xs transition-colors duration-100 ${
                      enabled
                        ? 'bg-ink text-ink-inv'
                        : 'bg-paper-bright text-ink-quiet hover:bg-gray hover:text-ink'
                    }`}
                  >
                    {root}
                  </button>
                )
              })}
            </div>

            <div className="flex items-baseline justify-between px-3 pb-2 pt-4">
              <span className="text-[11px] uppercase">{t('scalesLabel')}</span>
              <span className="text-[10px] uppercase text-ink-faint tabular">{t('on', { n: activeScaleIds.length, total: SCALES.length })}</span>
            </div>
            <div className="grid grid-cols-1 gap-px border-t border-ink bg-ink sm:grid-cols-3">
              {SCALES.map((scale) => {
                const enabled = activeScaleIds.includes(scale.id)
                return (
                  <button
                    key={scale.id}
                    onClick={() => toggleScale(scale.id)}
                    aria-pressed={enabled}
                    className={`grid grid-cols-[1rem_1fr] items-start gap-x-2 px-3 py-2.5 text-left transition-colors duration-100 ${
                      enabled
                        ? 'bg-paper-bright text-ink hover:bg-gray'
                        : 'bg-paper-bright text-ink-quiet hover:bg-gray hover:text-ink'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mt-0.5 grid h-3.5 w-3.5 place-items-center border border-current text-[10px] leading-none ${
                        enabled ? 'bg-ink text-ink-inv' : ''
                      }`}
                    >
                      {enabled ? '×' : ''}
                    </span>
                    <span>
                      <span className="block font-sans text-sm font-bold">{tScales(scale.id)}</span>
                      <span className="mt-0.5 block text-[10px] tracking-wide opacity-70">{scale.formula}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      }
    >
      <section className="os-window" aria-label={t('windowAria')}>
        <div className="os-titlebar">
          <span className="os-ctl" aria-hidden />
          <span className="flex-1 truncate">{`question.${String(score.total + (result === null ? 1 : 0)).padStart(3, '0')}`}</span>
          <span className="tabular">{`${inRoundProgress}/${ROUND_SIZE}`}</span>
        </div>

        {/* 라운드 진행 막대 */}
{/* 진행 막대 — 맞힌 칸은 초록, 틀린 칸은 빨강, 지금 푸는 칸은 핑크 */}
        <div className="flex h-2.5 gap-px border-b border-ink bg-ink" aria-hidden>
          {Array.from({ length: ROUND_SIZE }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 ${
                i < results.length
                  ? results[i] ? 'bg-ok' : 'bg-no'
                  : i === results.length
                  ? 'bg-pink'
                  : 'bg-paper-bright'
              }`}
            />
          ))}
        </div>

        {summary ? (
          <div className="os-body">
            <RoundResult
              game="scale-construction"
              round={summary.summary}
              ranked={summary.ranked}
              unrankedNote={tResult('unrankedScale')}
              onAgain={() => {
                setSummary(null)
                setResults([])
                frozenRef.current = null
                roundStartRef.current = Date.now()
              }}
            />
          </div>
        ) : (
          <>
            <div className="os-body relative">
              {!started && <StartOverlay onStart={start} questions={ROUND_SIZE} />}
              <div
                className={`@container px-5 py-10 font-sans transition-colors duration-100 sm:px-8 sm:py-14 ${
                  result === 'correct' ? 'bg-ok' : result === 'wrong' ? 'bg-no' : ''
                }`}
                aria-live="polite"
              >
                <div className={`label ${result === null ? 'text-ink-faint' : 'text-ink'}`}>
                  {result === null
                    ? `${tScales(problem.scale.id)} — ${problem.scale.formula}`
                    : result === 'correct'
                    ? <>{t('chordCorrect')} <span className="normal-case">{spelledNotes.join(' ')}</span></>
                    : <>{t('chordWrong')} <span className="normal-case">{spelledNotes.join(' ')}</span></>}
                </div>
                <div
                  className={`display mt-3 cursor-pointer whitespace-nowrap leading-[0.92] text-ink ${shake ? 'animate-shake' : ''}`}
                  style={{ fontSize: fitSize(`${problem.root} ${problem.scale.name}`, 7) }}
                  title={t('replay')}
                  onClick={() => playNotes(correctNotes, 'scale')}
                >
                  {problem.root} {problem.scale.name}
                </div>
              </div>

              <div className="grid grid-cols-6 gap-px border-y border-ink bg-ink">
                {NOTES_12.map((note) => {
                  const isSelected = selected.includes(note)
                  const isCorrectNote = correctNotes.includes(note)
                  const isBlack = BLACK_KEYS.has(note)

                  let tone = isBlack ? 'bg-surface text-ink' : 'bg-paper-bright text-ink'

                  if (isSelected) {
                    tone = result === 'wrong' && !isCorrectNote ? 'bg-no text-ink' : 'bg-ink text-ink-inv'
                  } else if (result !== null && isCorrectNote) {
                    tone = 'bg-ok text-ink'
                  }

                  return (
                    <button
                      key={note}
                      onClick={() => toggleNote(note)}
                      disabled={result !== null}
                      className={`relative h-16 font-sans text-xl font-semibold tracking-[-0.03em] transition-colors duration-100 sm:h-20 sm:text-2xl ${tone} ${
                        result === null && !isSelected ? 'hover:bg-ink hover:text-ink-inv' : ''
                      } ${result !== null ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      {note}
                      {isSelected && result === null && (
                        <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center bg-pink font-mono text-[9px] font-normal tabular text-ink">
                          {selected.indexOf(note) + 1}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="flex h-3 gap-px bg-ink" aria-hidden>
                {Array.from({ length: targetCount }).map((_, i) => (
                  <span key={i} className={`flex-1 ${selected[i] ? 'bg-pink' : 'bg-paper-bright'}`} />
                ))}
              </div>
            </div>

            <div
              className={`flex flex-wrap items-center justify-between gap-3 border-t border-ink px-3 py-3 ${
                result === 'correct' ? 'bg-ok' : result === 'wrong' ? 'bg-no' : 'bg-gray'
              }`}
            >
              <span className="text-[11px] uppercase">
                {result === null
                  ? t('statusSelectN', { selected: selected.length, target: targetCount })
                  : result === 'correct'
                  ? <>{t('statusCorrectNotes')} <span className="normal-case">{spelledNotes.join(' ')}</span></>
                  : <>{t('statusWrong')} <span className="normal-case">{spelledNotes.join(' ')}</span></>}
              </span>
              <span className="flex gap-2">
                {result === null ? (
                  <button
                    type="button"
                    onClick={resetAnswer}
                    disabled={selected.length === 0}
                    className="os-btn disabled:pointer-events-none disabled:opacity-40"
                  >
                    {t('reset')}
                  </button>
                ) : (
                  <>
                    {result === 'wrong' && (
                      <button type="button" onClick={resetAnswer} className="os-btn">{t('retry')}</button>
                    )}
                    <button type="button" onClick={nextProblem} className="os-btn">{t('next')}</button>
                  </>
                )}
              </span>
            </div>
          </>
        )}
      </section>

    </DrillFrame>
  )
}
