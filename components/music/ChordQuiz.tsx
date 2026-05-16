'use client'

import { useState, useCallback, useEffect } from 'react'
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

export default function ChordQuiz() {
  const [mode,    setMode]    = useState<Mode>('seventh')
  const [chord,   setChord]   = useState<string>(() => pickRandom(seventhChords))
  const [selected, setSelected] = useState<string[]>([])
  const [result,  setResult]  = useState<Result>(null)
  const [score,   setScore]   = useState({ correct: 0, total: 0 })
  const [shake,   setShake]   = useState(false)

  const targetCount = mode === 'triad' ? 3 : 4
  const correctNotes = getChordNotes(chord)
  const { root, quality } = getChordLabel(chord)

  // 모드 변경 시 리셋
  useEffect(() => {
    const pool = mode === 'triad' ? triadChords : seventhChords
    setChord(pickRandom(pool))
    setSelected([])
    setResult(null)
  }, [mode])

  // 노트 토글
  const toggleNote = useCallback((note: string) => {
    if (result !== null) return
    setSelected(prev => {
      if (prev.includes(note)) return prev.filter(n => n !== note)
      if (prev.length >= targetCount) return prev  // 최대 개수 초과 방지
      return [...prev, note]
    })
  }, [result, targetCount])

  // selected 개수가 targetCount에 도달하면 자동 채점
  useEffect(() => {
    if (selected.length !== targetCount || result !== null) return

    const isCorrect = checkNoteSelection(selected, correctNotes)
    setResult(isCorrect ? 'correct' : 'wrong')
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total:   prev.total + 1,
    }))
    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }, [selected, targetCount, result, correctNotes])

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
    <div className="border border-gray-200 rounded-xl p-6 space-y-5 bg-white">

      {/* 모드 + 점수 */}
      <div className="flex items-center justify-between">
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
          {(['triad', 'seventh'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 transition-colors ${
                mode === m
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {m === 'triad' ? 'Triad' : '7th'}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          {score.total > 0
            ? <><span className="font-medium text-gray-700">{score.correct}/{score.total}</span>
                <span className="ml-1">({Math.round(score.correct / score.total * 100)}%)</span></>
            : <span>0/0</span>
          }
        </div>
      </div>

      {/* 코드명 */}
      <div className={`text-center py-5 transition-all ${shake ? 'animate-shake' : ''}`}>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-6xl font-mono font-bold tracking-tight text-gray-900">
            {root}
          </span>
          <span className="text-3xl font-mono text-gray-400 font-medium">
            {quality}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-400 tracking-widest uppercase">
          {qualityLabel(quality)} · {targetCount}음 선택
        </div>
      </div>

      {/* 12음 버튼 그리드 */}
      <div className="grid grid-cols-6 gap-2">
        {NOTES_12.map(note => {
          const isSelected = selected.includes(note)
          // 버튼 이름(플랫)과 정답(플랫으로 변환)을 비교
          const isCorrectNote = correctFlats.includes(note) || correctSharps.includes(toSharp(note))
          const isBlack = BLACK_KEYS.has(note)

          // 결과 후 색상
          let bg = isBlack ? 'bg-gray-100' : 'bg-white'
          let border = 'border-gray-200'
          let text = isBlack ? 'text-gray-600' : 'text-gray-800'

          if (isSelected) {
            if (result === 'correct') {
              bg = 'bg-gray-900'; border = 'border-gray-900'; text = 'text-white'
            } else if (result === 'wrong') {
              if (isCorrectNote) {
                bg = 'bg-gray-900'; border = 'border-gray-900'; text = 'text-white'
              } else {
                bg = 'bg-red-50'; border = 'border-red-300'; text = 'text-red-500'
              }
            } else {
              bg = 'bg-gray-900'; border = 'border-gray-900'; text = 'text-white'
            }
          } else if (result !== null && isCorrectNote) {
            // 놓친 정답 표시
            bg = 'bg-gray-100'; border = 'border-gray-400'; text = 'text-gray-700'
          }

          return (
            <button
              key={note}
              onClick={() => toggleNote(note)}
              disabled={result !== null && !(result === 'wrong')}
              className={`
                relative h-12 rounded-lg border font-mono text-sm font-medium
                transition-all duration-100
                ${bg} ${border} ${text}
                ${result === null && !isSelected ? 'hover:border-gray-400 hover:bg-gray-50 active:scale-95' : ''}
                ${result !== null ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {note}
              {/* 선택된 순서 표시 */}
              {isSelected && result === null && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gray-900 text-white text-[9px] rounded-full flex items-center justify-center">
                  {selected.indexOf(note) + 1}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 선택 현황 */}
      <div className="flex items-center justify-center gap-1.5 h-5">
        {Array.from({ length: targetCount }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              selected[i]
                ? 'bg-gray-900 scale-110'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* 결과 */}
      {result !== null && (
        <div className={`rounded-lg px-4 py-3 text-center border ${
          result === 'correct'
            ? 'bg-gray-50 border-gray-200'
            : 'bg-red-50 border-red-100'
        }`}>
          {result === 'correct' ? (
            <div className="space-y-1">
              <div className="font-semibold text-gray-900 text-sm">정답</div>
              <div className="font-mono text-gray-600 text-sm tracking-widest">
                {correctNotes.join('  ·  ')}
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="font-semibold text-red-500 text-sm">오답</div>
              <div className="text-gray-600 text-sm">
                정답: <span className="font-mono tracking-widest">{correctNotes.join('  ·  ')}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-2">
        {result === null ? (
          <button
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="flex-1 py-2.5 rounded-lg text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            초기화
          </button>
        ) : result === 'wrong' ? (
          <button
            onClick={retry}
            className="flex-1 py-2.5 rounded-lg text-sm text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            다시 시도
          </button>
        ) : null}

        {result !== null && (
          <button
            onClick={next}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors"
          >
            다음 코드 →
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-300">
        {targetCount}개 선택하면 자동 채점
      </p>
    </div>
  )
}
