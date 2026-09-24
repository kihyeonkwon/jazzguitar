'use client'

import type React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { fitSize } from '@/components/drills/shared/fitText'
import { playKey, playNotes } from '@/lib/audio/tones'
import { triadChords, seventhChords, getChordNotes, checkNoteSelection, toSharp } from '@/lib/music/chords'

// 12음 — 플랫 기준 표기 (재즈에서 더 일반적)
const NOTES_12 = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
// 검은 건반 (플랫 이름)
const BLACK_KEYS = new Set(['Db', 'Eb', 'Gb', 'Ab', 'Bb'])

type Mode = 'triad' | 'seventh'
type Result = 'correct' | 'wrong' | null

function pickRandom(arr: string[], exclude?: string): string {
  const pool = exclude ? arr.filter(c => c !== exclude) : arr
  return pool[Math.floor(Math.random() * pool.length)]
}

function getChordLabel(chordName: string): { root: string; quality: string } {
  // 루트음과 퀄리티 분리 (예: Cmaj7 → C / maj7, Fm → F / m)
  const match = chordName.match(/^([A-G][b#]?)(.*)$/)
  return {
    root:    match?.[1] ?? chordName,
    quality: match?.[2] ?? '',
  }
}

function qualityLabel(quality: string): string {
  const map: Record<string, string> = {
    '':      'Major',
    'm':     'Minor',
    'dim':   'Diminished',
    'aug':   'Augmented',
    'maj7':  'Major 7th',
    'm7':    'Minor 7th',
    '7':     'Dominant 7th',
    'm7b5':  'Half-diminished',
    'dim7':  'Diminished 7th',
  }
  return map[quality] ?? quality
}

interface ChordQuizProps {
  onScoreChange?: (s: { correct: number; total: number }) => void
  onModeChange?: (mode: 'triad' | 'seventh') => void
  /** 음을 누를 때마다 호출 — 라운드 시계 시작용 */
  onInput?: () => void
  /** Next를 누를 때 호출 */
  onNext?: () => void
  /** 오답 뒤 같은 문제를 다시 풀 때 */
  onRetry?: () => void
  /** 주면 문제 대신 이 내용을 창 안에 보여준다 (라운드 결과 화면) */
  overlay?: React.ReactNode
  /** 이번 라운드의 문제별 정답 여부 — 주면 제목줄 아래에 진행 막대를 그린다 */
  roundResults?: boolean[]
  roundSize?: number
  /** 시작 전 장막 — 주면 본문 위에 덮고, 키 입력과 소리를 막는다 */
  veil?: React.ReactNode
  /** 첫 코드를 무작위로 뽑는다 (시작 버튼을 누른 뒤 새로 마운트할 때) */
  randomFirst?: boolean
}

export default function ChordQuiz({
  onScoreChange,
  onModeChange,
  onInput,
  onNext,
  onRetry,
  overlay,
  roundResults,
  roundSize = 10,
  veil,
  randomFirst = false,
}: ChordQuizProps = {}) {
  const t = useTranslations('game')
  const [mode,    setMode]    = useState<Mode>('seventh')
  // 서버 렌더와 어긋나지 않도록 기본은 고정 코드, 시작 후 새로 마운트될 때만 무작위
  const [chord,   setChord]   = useState<string>(() =>
    randomFirst ? pickRandom(seventhChords) : seventhChords[0] ?? 'Cmaj7'
  )
  const [selected, setSelected] = useState<string[]>([])
  const [result,  setResult]  = useState<Result>(null)
  const [score,   setScore]   = useState({ correct: 0, total: 0 })
  const [shake,   setShake]   = useState(false)

  const targetCount = mode === 'triad' ? 3 : 4
  const correctNotes = getChordNotes(chord)
  const { root, quality } = getChordLabel(chord)

  // 새 코드가 뜰 때마다 구성음을 쌓아 들려준다 (소리가 켜져 있을 때)
  useEffect(() => {
    if (!veil) playNotes(getChordNotes(chord), 'chord')
  }, [chord, veil])

  const changeMode = useCallback((nextMode: Mode) => {
    const pool = nextMode === 'triad' ? triadChords : seventhChords
    setMode(nextMode)
    setChord(pickRandom(pool))
    setSelected([])
    setResult(null)
    onModeChange?.(nextMode)
  }, [onModeChange])

  // 노트 토글
  const toggleNote = useCallback((note: string) => {
    if (veil || result !== null) return
    onInput?.()
    // 누른 음을 코드의 루트 위 음역에서 들려준다 (선택을 풀 때는 소리 없이)
    if (!selected.includes(note)) playKey(note, getChordLabel(chord).root)
    const nextSelected = selected.includes(note)
      ? selected.filter(n => n !== note)
      : selected.length >= targetCount
      ? selected
      : [...selected, note]

    setSelected(nextSelected)
    if (nextSelected.length !== targetCount) return

    const isCorrect = checkNoteSelection(nextSelected, correctNotes)
    const nextScore = {
      correct: score.correct + (isCorrect ? 1 : 0),
      total: score.total + 1,
    }
    setResult(isCorrect ? 'correct' : 'wrong')
    setScore(nextScore)
    onScoreChange?.(nextScore)
    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }, [chord, correctNotes, onInput, onScoreChange, result, score, selected, targetCount, veil])

  // 다음 코드
  const next = useCallback(() => {
    const pool = mode === 'triad' ? triadChords : seventhChords
    setChord(pickRandom(pool, chord))
    setSelected([])
    setResult(null)
    onNext?.()
  }, [mode, chord, onNext])

  // 다시 시도
  const retry = useCallback(() => {
    setSelected([])
    setResult(null)
    onRetry?.()
  }, [onRetry])

  // 정답 버튼 하이라이트: 샵→플랫 변환 후 버튼 이름과 비교
  const SHARP_TO_FLAT: Record<string, string> = {
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb',
    'E#': 'F',  'B#': 'C',  'Cb': 'B',  'Fb': 'E',
  }
  const toFlat = (n: string) => SHARP_TO_FLAT[n] ?? n
  const correctFlats = correctNotes.map(toFlat)
  // 비교용 샵 정규화는 내부 checkNoteSelection에서 처리
  const correctSharps = correctNotes.map(toSharp)

  return (
    <section className="os-window" aria-label={t('windowAria')}>
      <div className="os-titlebar">
        <span className="os-ctl" aria-hidden />
        <span className="flex-1 truncate">{`question.${String(score.total + (result === null ? 1 : 0)).padStart(3, '0')}`}</span>
        <span className="tabular">
          {score.total > 0
            ? `${score.correct}/${score.total} · ${Math.round((score.correct / score.total) * 100)}%`
            : '0/0'}
        </span>
      </div>

      {roundResults && (
        <>
          {/* 진행 막대 — 맞힌 칸은 초록, 틀린 칸은 빨강, 지금 푸는 칸은 핑크 */}
          <div className="flex h-2.5 gap-px border-b border-ink bg-ink" aria-hidden>
            {Array.from({ length: roundSize }).map((_, i) => (
              <span
                key={i}
                className={`flex-1 ${
                  i < roundResults.length
                    ? roundResults[i] ? 'bg-ok' : 'bg-no'
                    : i === roundResults.length
                    ? 'bg-pink'
                    : 'bg-paper-bright'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {overlay ? (
        <div className="os-body">{overlay}</div>
      ) : (
        <>
          {/* 모드 탭 */}
          <div className="flex border-b border-ink bg-gray">
            {(['triad', 'seventh'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => changeMode(m)}
                aria-pressed={mode === m}
                className={`border-r border-ink px-5 py-2 text-[11px] uppercase transition-colors duration-100 ${
                  mode === m
                    ? 'bg-paper-bright font-bold text-ink'
                    : 'text-ink-soft hover:bg-ink hover:text-ink-inv'
                }`}
              >
                {m === 'triad' ? 'Triad' : '7th'}
              </button>
            ))}
            <span className="ml-auto flex items-center px-3 text-[10px] uppercase text-ink-faint">{t('mode')}</span>
          </div>

          <div className="os-body relative">
            {veil}
            {/* 코드명 */}
            <div
              className={`@container px-5 py-10 font-sans transition-colors duration-100 sm:px-8 sm:py-14 ${
                result === 'correct' ? 'bg-ok' : result === 'wrong' ? 'bg-no' : ''
              } ${shake ? 'animate-shake' : ''}`}
              aria-live="polite"
            >
              <div className={`label ${result === null ? 'text-ink-faint' : 'text-ink'}`}>
                {result === null
                  ? qualityLabel(quality)
                  : result === 'correct'
                  ? <>{t('chordCorrect')} <span className="normal-case">{correctNotes.join(' ')}</span></>
                  : <>{t('chordWrong')} <span className="normal-case">{correctNotes.join(' ')}</span></>}
              </div>
              <div
                className="display mt-3 cursor-pointer whitespace-nowrap leading-[0.88] text-ink"
                style={{ fontSize: fitSize(`${root}${quality}`, 9, 0.8) }}
                title={t('replay')}
                onClick={() => playNotes(correctNotes, 'chord')}
              >
                {root}
                <span className={result === null ? 'text-ink-faint' : 'opacity-60'} style={{ fontSize: '0.55em' }}>{quality}</span>
              </div>
            </div>

            {/* 12음 키 */}
            <div className="grid grid-cols-6 gap-px border-y border-ink bg-ink">
              {NOTES_12.map(note => {
                const isSelected = selected.includes(note)
                const isCorrectNote = correctFlats.includes(note) || correctSharps.includes(toSharp(note))
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
                    disabled={result !== null && !(result === 'wrong')}
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

            {/* 선택 현황 */}
            <div className="flex h-3 gap-px bg-ink" aria-hidden>
              {Array.from({ length: targetCount }).map((_, i) => (
                <span key={i} className={`flex-1 ${selected[i] ? 'bg-pink' : 'bg-paper-bright'}`} />
              ))}
            </div>
          </div>

          {/* 상태줄 + 컨트롤 */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 border-t border-ink px-3 py-3 ${
              result === 'correct' ? 'bg-ok' : result === 'wrong' ? 'bg-no' : 'bg-gray'
            }`}
          >
            <span className="text-[11px] uppercase">
              {result === null
                ? t('statusSelectN', { selected: selected.length, target: targetCount })
                : result === 'correct'
                ? <>{t('statusCorrectNotes')} <span className="normal-case">{correctNotes.join(' ')}</span></>
                : <>{t('statusWrong')} <span className="normal-case">{correctNotes.join(' ')}</span></>}
            </span>
            <span className="flex gap-2">
              {result === null ? (
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  disabled={selected.length === 0}
                  className="os-btn disabled:pointer-events-none disabled:opacity-40"
                >
                  {t('reset')}
                </button>
              ) : (
                <>
                  {result === 'wrong' && (
                    <button type="button" onClick={retry} className="os-btn">{t('retry')}</button>
                  )}
                  <button type="button" onClick={next} className="os-btn">{t('next')}</button>
                </>
              )}
            </span>
          </div>
        </>
      )}
    </section>
  )
}
