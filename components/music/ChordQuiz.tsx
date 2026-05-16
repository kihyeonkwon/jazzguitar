'use client'

import { useState, useCallback } from 'react'
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
}

export default function ChordQuiz({ onScoreChange }: ChordQuizProps = {}) {
  const [mode,    setMode]    = useState<Mode>('seventh')
  const [chord,   setChord]   = useState<string>(seventhChords[0] ?? 'Cmaj7')
  const [selected, setSelected] = useState<string[]>([])
  const [result,  setResult]  = useState<Result>(null)
  const [score,   setScore]   = useState({ correct: 0, total: 0 })
  const [shake,   setShake]   = useState(false)

  const targetCount = mode === 'triad' ? 3 : 4
  const correctNotes = getChordNotes(chord)
  const { root, quality } = getChordLabel(chord)

  const changeMode = useCallback((nextMode: Mode) => {
    const pool = nextMode === 'triad' ? triadChords : seventhChords
    setMode(nextMode)
    setChord(pickRandom(pool))
    setSelected([])
    setResult(null)
  }, [])

  // 노트 토글
  const toggleNote = useCallback((note: string) => {
    if (result !== null) return
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
  }, [correctNotes, onScoreChange, result, score, selected, targetCount])

  // 다음 코드
  const next = useCallback(() => {
    const pool = mode === 'triad' ? triadChords : seventhChords
    setChord(pickRandom(pool, chord))
    setSelected([])
    setResult(null)
  }, [mode, chord])

  // 다시 시도
  const retry = useCallback(() => {
    setSelected([])
    setResult(null)
  }, [])

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
    <div className="border border-rule bg-paper-bright">
      {/* 헤더 — 모드 + 점수 */}
      <div className="flex items-center justify-between p-4 border-b border-rule">
        <div className="flex border border-rule overflow-hidden">
          {(['triad', 'seventh'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 h-7 text-[11px] font-mono tracking-widest transition-colors ${
                mode === m
                  ? 'bg-ink text-ink-inv'
                  : 'bg-paper-bright text-ink-faint hover:text-ink hover:bg-surface'
              }`}
            >
              {m === 'triad' ? 'TRIAD' : '7TH'}
            </button>
          ))}
        </div>
        <div className="text-[11px] font-mono tabular text-ink-faint tracking-widest">
          {score.total > 0
            ? <><span className="text-ink">{score.correct}/{score.total}</span>
                <span className="ml-2 text-ink-quiet">{Math.round(score.correct / score.total * 100)}%</span></>
            : <span>0 / 0</span>}
        </div>
      </div>

      {/* 코드명 */}
      <div className={`text-center py-8 border-b border-rule ${shake ? 'animate-shake' : ''}`}>
        <div className="flex items-baseline justify-center gap-1 font-mono tabular">
          <span className="text-6xl font-bold tracking-tight text-ink leading-none">
            {root}
          </span>
          <span className="text-3xl text-ink-faint font-medium leading-none">
            {quality}
          </span>
        </div>
        <div className="mt-3 eyebrow">
          {qualityLabel(quality)} · {targetCount} NOTES
        </div>
      </div>

      {/* 12음 버튼 그리드 */}
      <div className="grid grid-cols-6 gap-px bg-rule">
        {NOTES_12.map(note => {
          const isSelected = selected.includes(note)
          const isCorrectNote = correctFlats.includes(note) || correctSharps.includes(toSharp(note))
          const isBlack = BLACK_KEYS.has(note)

          let bg = isBlack ? 'bg-surface' : 'bg-paper-bright'
          let text = isBlack ? 'text-ink-soft' : 'text-ink'
          let ring = ''

          if (isSelected) {
            if (result === 'correct') {
              bg = 'bg-ink'; text = 'text-ink-inv'
            } else if (result === 'wrong') {
              if (isCorrectNote) {
                bg = 'bg-ink'; text = 'text-ink-inv'
              } else {
                bg = 'bg-red-50'; text = 'text-red-500'; ring = 'border-red-300'
              }
            } else {
              bg = 'bg-ink'; text = 'text-ink-inv'
            }
          } else if (result !== null && isCorrectNote) {
            bg = 'bg-surface'; text = 'text-ink'; ring = 'border border-ink-soft'
          }

          return (
            <button
              key={note}
              onClick={() => toggleNote(note)}
              disabled={result !== null && !(result === 'wrong')}
              className={`relative h-14 font-mono text-sm font-medium transition-colors ${bg} ${text} ${ring}
                ${result === null && !isSelected ? 'hover:bg-surface active:bg-ink-quiet/30' : ''}
                ${result !== null ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {note}
              {isSelected && result === null && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-paper text-ink text-[9px] font-mono tabular flex items-center justify-center">
                  {selected.indexOf(note) + 1}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 선택 현황 (점 dot) */}
      <div className="flex items-center justify-center gap-1.5 h-8 border-t border-rule">
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 transition-all ${
              selected[i] ? 'bg-ink' : 'bg-rule'
            }`}
          />
        ))}
      </div>

      {/* 결과 */}
      {result !== null && (
        <div className={`px-4 py-3 text-center border-t ${
          result === 'correct'
            ? 'bg-surface border-rule'
            : 'bg-red-50 border-red-100'
        }`}>
          {result === 'correct' ? (
            <>
              <div className="eyebrow mb-1">Correct</div>
              <div className="font-mono tabular text-ink text-sm tracking-widest">
                {correctNotes.join('  ·  ')}
              </div>
            </>
          ) : (
            <>
              <div className="eyebrow !text-red-500 mb-1">Wrong</div>
              <div className="text-ink-soft text-sm">
                정답 <span className="font-mono tabular text-ink ml-2">{correctNotes.join('  ·  ')}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* 버튼 */}
      <div className="grid grid-cols-2 gap-px bg-rule border-t border-rule">
        {result === null ? (
          <button
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="h-12 bg-paper-bright text-ink-soft hover:bg-surface text-xs font-mono tracking-widest disabled:opacity-30 transition-colors"
          >
            RESET
          </button>
        ) : result === 'wrong' ? (
          <button
            onClick={retry}
            className="h-12 bg-paper-bright text-ink-soft hover:bg-surface text-xs font-mono tracking-widest transition-colors"
          >
            RETRY
          </button>
        ) : <span className="h-12 bg-paper-bright" />}

        {result !== null ? (
          <button
            onClick={next}
            className="h-12 bg-ink text-ink-inv hover:bg-ink-soft text-xs font-mono tracking-widest transition-colors"
          >
            NEXT
          </button>
        ) : <span className="h-12 bg-paper-bright" />}
      </div>

      <p className="text-center text-[9px] text-ink-quiet py-3 tracking-widest font-mono">
        SELECT {targetCount} NOTES TO AUTO-GRADE
      </p>
    </div>
  )
}
