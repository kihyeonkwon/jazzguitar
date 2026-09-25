'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import DrillFrame from './shared/DrillFrame'
import { fitSize } from './shared/fitText'
import { saveDrillRound } from '@/lib/progress/drills'
import RoundResult, { type RoundSummary } from '@/components/leaderboard/RoundResult'
import StartOverlay from './shared/StartOverlay'
import { formatSpc, formatSec, useLiveStats } from './shared/useLiveStats'
import { playKey, playNotes } from '@/lib/audio/tones'
import { spellDegree } from '@/lib/music/spell'

const NOTES_12 = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// 반음 수(0~11) → 도수. 음 그리드와 같은 12칸 배치.
const DEGREES = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']
const ALTERED = new Set(['b2', 'b3', 'b5', 'b6', 'b7'])

const ROUND_LENGTH = 20
// 채점 결과를 보여 주는 시간 — 라운드 기록(SPC)에서는 제외한다
const NEXT_DELAY_CORRECT = 650
const NEXT_DELAY_WRONG = 1800

interface Problem {
  root: string
  note: string
  degree: string
}

function generate(prev?: Problem | null): Problem {
  for (;;) {
    const rootPc = Math.floor(Math.random() * 12)
    const semitones = Math.floor(Math.random() * 12)
    const root = NOTES_12[rootPc]
    const degree = DEGREES[semitones]
    // 둘째 음은 도수에 맞는 이름으로 적는다 — B의 3도는 Eb가 아니라 D#
    const problem = { root, note: spellDegree(root, degree), degree }
    if (!prev || prev.root !== problem.root || prev.degree !== problem.degree) return problem
  }
}

type State = 'idle' | 'correct' | 'wrong'

export default function DegreeId() {
  const t = useTranslations('game')
  const tGames = useTranslations('games')
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState<Problem | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<State>('idle')
  const [finished, setFinished] = useState(false)
  // 문제별 정답 여부 — 진행 막대를 초록/빨강으로 채운다
  const [results, setResults] = useState<boolean[]>([])
  const [summary, setSummary] = useState<RoundSummary | null>(null)
  const roundStartRef = useRef<number>(0)
  const feedbackMsRef = useRef<number>(0)
  // 채점 결과를 보여 주는 동안은 시계가 멈춘다 — 그 구간의 시작 시각 (0이면 진행 중)
  const pausedAtRef = useRef<number>(0)
  const correctRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const start = useCallback(() => {
    setRound(1)
    setScore(0)
    setResults([])
    setFinished(false)
    setSummary(null)
    setProblem(generate())
    setSelected(null)
    setState('idle')
    roundStartRef.current = Date.now()
    feedbackMsRef.current = 0
    pausedAtRef.current = 0
    correctRef.current = 0
  }, [])

  const advance = useCallback(
    (nextScore: number, current: Problem) => {
      // 멈춰 있던 시간을 기록에서 빼고 시계를 다시 돌린다
      if (pausedAtRef.current) {
        feedbackMsRef.current += Date.now() - pausedAtRef.current
        pausedAtRef.current = 0
      }
      if (round >= ROUND_LENGTH) {
        const playedMs = Date.now() - roundStartRef.current - feedbackMsRef.current
        const durationSec = Math.max(1, Math.round(playedMs / 100) / 10)
        const result = { correct: nextScore, total: ROUND_LENGTH, durationSec }
        const saved = saveDrillRound('degree-id', result)
        // 리더보드 제출과 가입 권유는 결과 화면(RoundResult)이 맡는다
        setSummary({ id: Date.now(), ...result, at: saved.at })
        setFinished(true)
        setProblem(null)
      } else {
        setRound((r) => r + 1)
        setProblem(generate(current))
      }
      setSelected(null)
      setState('idle')
    },
    [round]
  )

  const onSelect = useCallback((degree: string) => {
    if (state !== 'idle' || !problem) return
    // 누른 도수가 실제로 어떤 음인지 루트 위에서 들려준다 — 틀렸으면 틀린 소리가 난다
    const pickedNote = NOTES_12[(NOTES_12.indexOf(problem.root) + DEGREES.indexOf(degree)) % 12]
    playKey(pickedNote, problem.root)
    const correct = degree === problem.degree
    const nextScore = score + (correct ? 1 : 0)
    setSelected(degree)
    setState(correct ? 'correct' : 'wrong')
    setScore(nextScore)
    setResults((prev) => [...prev, correct])
    // 자동으로 다음 문제 — 결과를 볼 시간을 주고, 그 시간은 기록에서 뺀다
    const delay = correct ? NEXT_DELAY_CORRECT : NEXT_DELAY_WRONG
    pausedAtRef.current = Date.now()
    correctRef.current = nextScore
    timerRef.current = setTimeout(() => advance(nextScore, problem), delay)
  }, [advance, problem, score, state])

  // 새 문제가 뜰 때마다 루트 → 둘째 음을 들려준다 (소리가 켜져 있을 때)
  useEffect(() => {
    if (problem) playNotes([problem.root, problem.note], 'sequence')
  }, [problem])

  const idle = round === 0 || finished

  // 타자 연습처럼 실시간으로 바뀌는 경과 시간과 SPC (채점 화면 동안은 멈춘다)
  const live = useLiveStats(!idle, () => ({
    elapsedMs: (pausedAtRef.current || Date.now()) - roundStartRef.current - feedbackMsRef.current,
    correct: correctRef.current,
  }))
  const waiting = round === 0 && !finished
  // 문제·정답 공개 모두 같은 크기로 보이도록 가장 긴 형태(Bb → Ab = b7)에 맞춘다
  const sizing = 'Bb → Ab = b7'
  const answered = state !== 'idle'

  return (
    <DrillFrame
      number={1}
      drillType="degree-id"
      title={tGames('degree-id.title')}
      description={tGames('degree-id.rules')}
      footerStats={[
        { label: t('statTime'), value: formatSec(live.sec), unit: 's', live: true },
        { label: t('statSpc'), value: formatSpc(live.spc), unit: live.spc === null ? undefined : 's', live: true },
        { label: t('statQuestion'), value: `${round}/${ROUND_LENGTH}` },
        { label: t('statScore'), value: score },
        { label: t('statRate'), value: round === 0 ? '0%' : `${Math.round((score / Math.max(round, 1)) * 100)}%` },
      ]}
    >
      <section className="os-window" aria-label={t('windowAria')}>
        <div className="os-titlebar">
          <span className="os-ctl" aria-hidden />
          <span className="flex-1 truncate">
            {finished ? 'degree — result' : idle ? 'degree — ready' : `question.${String(round).padStart(3, '0')}`}
          </span>
          <span className="tabular">{`${round}/${ROUND_LENGTH}`}</span>
        </div>

        {/* 진행 막대 — 맞힌 칸은 초록, 틀린 칸은 빨강, 지금 푸는 칸은 핑크 */}
        <div className="flex h-2.5 gap-px border-b border-ink bg-ink" aria-hidden>
          {Array.from({ length: ROUND_LENGTH }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 ${
                i < results.length
                  ? results[i] ? 'bg-ok' : 'bg-no'
                  : i === round - 1 && !finished
                  ? 'bg-pink'
                  : 'bg-paper-bright'
              }`}
            />
          ))}
        </div>

        {finished && summary ? (
          <div className="os-body">
            <RoundResult game="degree-id" round={summary} onAgain={start} />
          </div>
        ) : (
          <>
            <div className="os-body relative">
              {waiting && <StartOverlay onStart={start} questions={ROUND_LENGTH} />}
              <div
                className={`@container px-5 py-10 font-sans transition-colors duration-100 sm:px-8 sm:py-14 ${
                  state === 'correct' ? 'bg-ok' : state === 'wrong' ? 'bg-no' : ''
                }`}
                aria-live="polite"
              >
                <div className={`label ${answered ? 'text-ink' : 'text-ink-faint'}`}>
                  {!problem ? (
                    t('example')
                  ) : state === 'correct' ? (
                    t('correct')
                  ) : state === 'wrong' ? (
                    <>
                      {t('wrongPicked')} <span className="normal-case">{selected}</span> {t('wrongAnswerIs')}
                    </>
                  ) : (
                    t('rootNote')
                  )}
                </div>
                <div
                  className={`display mt-3 whitespace-nowrap leading-[0.9] ${problem ? 'cursor-pointer text-ink' : 'text-ink-quiet'}`}
                  style={{ fontSize: fitSize(sizing, 8) }}
                  title={problem ? t('replay') : undefined}
                  onClick={() => problem && playNotes([problem.root, problem.note], 'sequence')}
                >
                  {problem ? (
                    <>
                      {problem.root} <span className={answered ? 'opacity-50' : 'text-ink-quiet'}>→</span>{' '}
                      <span className={answered ? '' : 'bg-pink px-[0.08em]'}>{problem.note}</span>{' '}
                      <span className={answered ? 'opacity-50' : 'text-ink-quiet'}>=</span>{' '}
                      {answered ? (
                        <span className="bg-ink px-[0.1em] text-ink-inv">{problem.degree}</span>
                      ) : (
                        <span className="text-ink-quiet">?</span>
                      )}
                    </>
                  ) : (
                    'C → Eb = b3'
                  )}
                </div>
              </div>

              {/* 12개 도수 키 — 음 그리드와 같은 6×2 배치 */}
              <div className="grid grid-cols-6 gap-px border-t border-ink bg-ink">
                {DEGREES.map((degree) => {
                  const isSelected = selected === degree
                  const isAnswer = state !== 'idle' && problem?.degree === degree

                  let tone = ALTERED.has(degree) ? 'bg-surface text-ink' : 'bg-paper-bright text-ink'
                  if (idle) tone = ALTERED.has(degree) ? 'bg-surface text-ink-quiet' : 'bg-paper-bright text-ink-quiet'
                  else if (isAnswer) tone = isSelected ? 'bg-ink text-ink-inv' : 'bg-ok text-ink'
                  else if (isSelected) tone = 'bg-no text-ink'

                  return (
                    <button
                      key={degree}
                      type="button"
                      onClick={() => onSelect(degree)}
                      disabled={idle || state !== 'idle'}
                      className={`h-16 font-sans text-xl font-semibold tracking-[-0.03em] transition-colors duration-100 sm:h-20 sm:text-2xl ${tone} ${
                        !idle && state === 'idle' ? 'cursor-pointer hover:bg-ink hover:text-ink-inv' : 'cursor-default'
                      }`}
                    >
                      {degree}
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              className={`flex min-h-[3.25rem] items-center justify-between gap-3 border-t border-ink px-3 py-2 ${
                state === 'correct' ? 'bg-ok' : state === 'wrong' ? 'bg-no' : 'bg-gray'
              }`}
            >
              <span className="text-[11px] uppercase">
                {idle
                  ? t('statusReady')
                  : state === 'correct'
                  ? t('statusCorrect')
                  : state === 'wrong'
                  ? <>{t('statusWrong')} <span className="normal-case">{`${problem?.root} → ${problem?.note} = ${problem?.degree}`}</span></>
                  : t('statusSelectDegree')}
              </span>
            </div>
          </>
        )}
      </section>
    </DrillFrame>
  )
}
