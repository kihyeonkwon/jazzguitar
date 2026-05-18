'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Note } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import Fretboard, { FretPosition, MarkedPosition, midiAt } from './shared/Fretboard'
import { Button } from '@/components/ui'
import { IconPlay, IconStop } from '@/components/icons'
import { saveDrillRound } from '@/lib/progress/drills'

// 모든 12음 (샵 표기)
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const ROUND_SECONDS = 60

function pickRandom<T>(arr: T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr
  return pool[Math.floor(Math.random() * pool.length)]
}

function pcOf(midi: number): number {
  return ((midi % 12) + 12) % 12
}

function pcOfName(name: string): number {
  const m = Note.midi(name + '4')
  return m == null ? 0 : pcOf(m)
}

export default function FretboardFind() {
  const [targetNote, setTargetNote] = useState<string>('C')
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [foundPositions, setFoundPositions] = useState<FretPosition[]>([])
  const [wrongFlash, setWrongFlash] = useState<FretPosition | null>(null)
  const [totalFound, setTotalFound] = useState(0)
  const [finished, setFinished] = useState(false)
  const correctRef = useRef(0)
  const wrongRef = useRef(0)

  // 타이머
  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false)
          setFinished(true)
          saveDrillRound('fretboard-find', {
            correct: correctRef.current,
            total: correctRef.current + wrongRef.current,
            durationSec: ROUND_SECONDS,
          })
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearTimeout(id)
  }, [running, timeLeft])

  const nextNote = useCallback(() => {
    setTargetNote((prev) => pickRandom(NOTES, prev))
    setFoundPositions([])
  }, [])

  const start = () => {
    setRunning(true)
    setFinished(false)
    setTimeLeft(ROUND_SECONDS)
    setTotalFound(0)
    setFoundPositions([])
    setTargetNote(pickRandom(NOTES))
    correctRef.current = 0
    wrongRef.current = 0
  }

  const stop = () => {
    setRunning(false)
    setFinished(true)
    const elapsed = Math.max(1, ROUND_SECONDS - timeLeft)
    saveDrillRound('fretboard-find', {
      correct: correctRef.current,
      total: correctRef.current + wrongRef.current,
      durationSec: elapsed,
    })
  }

  const handleClick = useCallback(
    (pos: FretPosition) => {
      if (!running) return
      const midi = midiAt(pos.string, pos.fret)
      const targetPc = pcOfName(targetNote)
      const isMatch = pcOf(midi) === targetPc
      const already = foundPositions.some(
        (p) => p.string === pos.string && p.fret === pos.fret
      )
      if (already) return
      if (isMatch) {
        setFoundPositions((prev) => [...prev, pos])
        setTotalFound((n) => n + 1)
        correctRef.current += 1
        // 같은 음의 모든 위치를 찾았는지 검사
        const targetCount = countOccurrences(targetPc)
        if (foundPositions.length + 1 >= targetCount) {
          setTimeout(() => nextNote(), 350)
        }
      } else {
        wrongRef.current += 1
        setWrongFlash(pos)
        setTimeout(() => setWrongFlash(null), 400)
      }
    },
    [running, targetNote, foundPositions, nextNote]
  )

  const marks: MarkedPosition[] = [
    ...foundPositions.map<MarkedPosition>((p) => ({ ...p, kind: 'correct' })),
    ...(wrongFlash ? [{ ...wrongFlash, kind: 'wrong' as const }] : []),
  ]

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  return (
    <DrillFrame
      number={1}
      title="지판 음 찾기"
      description="제시된 음의 모든 위치를 60초 안에 클릭하세요. 옥타브 무관."
      footerStats={[
        { label: 'Time', value: `${mm}:${ss}` },
        { label: 'Found', value: totalFound },
        { label: 'Target', value: targetNote },
      ]}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">Find</span>
          <span className="display text-6xl text-ink font-mono tabular">
            {targetNote}
          </span>
        </div>
        <div className="flex gap-2">
          {!running ? (
            <Button onClick={start} size="md">
              <IconPlay size={16} />
              {finished ? '다시 시작' : '시작'}
            </Button>
          ) : (
            <Button onClick={stop} variant="secondary" size="md">
              <IconStop size={16} />
              종료
            </Button>
          )}
        </div>
      </div>

      <div className="border border-rule bg-paper-bright p-2">
        <Fretboard
          marks={marks}
          onPositionClick={running ? handleClick : undefined}
        />
      </div>

      {finished && (
        <div className="border border-ink p-4 space-y-1">
          <div className="eyebrow">Result</div>
          <div className="text-2xl font-mono tabular">
            {totalFound} positions / {ROUND_SECONDS}s
          </div>
        </div>
      )}
    </DrillFrame>
  )
}

// 6줄 × 13프렛 안에서 특정 pitch class가 몇 번 나오는지
function countOccurrences(pc: number): number {
  let count = 0
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f < 13; f++) {
      if (pcOf(midiAt(s, f)) === pc) count++
    }
  }
  return count
}
