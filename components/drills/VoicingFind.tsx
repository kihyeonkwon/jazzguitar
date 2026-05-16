'use client'

import { useCallback, useMemo, useState } from 'react'
import { Chord, Note } from 'tonal'
import DrillFrame from './shared/DrillFrame'
import Fretboard, { FretPosition, MarkedPosition, midiAt } from './shared/Fretboard'
import ScoreDisplay from './shared/ScoreDisplay'
import { Button } from '@/components/ui'
import { IconArrowRight, IconCheck, IconPlay } from '@/components/icons'
import { saveDrillScore } from '@/lib/progress/drills'

const ROOTS = ['C', 'D', 'E', 'F', 'G', 'A', 'Bb', 'Eb']
const QUALITIES = ['maj7', 'm7', '7']

const ROUND_LENGTH = 12

function pcOf(midi: number): number {
  return ((midi % 12) + 12) % 12
}

// Drop 2 보이싱: 닫힌 자리 4성부의 두 번째 위 음(2번째 top, i.e. 2nd voice from top)을 한 옥타브 아래로
// 결과는 [bass, tenor, alto, soprano] (낮은→높은)
function drop2Voicing(chordName: string, rootStringSet: '5' | '6'): {
  positions: FretPosition[]
  notes: string[]
} | null {
  const c = Chord.get(chordName)
  if (c.notes.length < 4) return null
  const [r, t3, t5, t7] = c.notes // root, 3, 5, 7

  // 닫힌 자리 (closed) 음들 MIDI (root from baseOctave going up)
  const baseOct = rootStringSet === '6' ? 3 : 3
  const rootMidi = Note.midi(r + baseOct)
  if (rootMidi == null) return null

  const ascend = (start: number, name: string): number => {
    let m = Note.midi(name + baseOct) ?? 0
    while (m <= start) m += 12
    return m
  }

  const m1 = rootMidi
  const m3 = ascend(m1, t3)
  const m5 = ascend(m3, t5)
  const m7 = ascend(m5, t7)
  // closed: [m1, m3, m5, m7] from low to high
  // top 4 voices from low→high: bass=m1, tenor=m3, alto=m5, soprano=m7
  // drop 2: drop the 2nd from top (alto=m5) down an octave
  // result: [m5 - 12, m1, m3, m7]  but need to re-sort low→high
  const droppedM5 = m5 - 12
  const voicing = [droppedM5, m1, m3, m7].sort((a, b) => a - b)

  // 지판에 배치: 가장 낮은 음 → 5번줄 또는 6번줄 (rootStringSet)
  // 6번줄(s=5)는 E2(40), 5번줄(s=4)는 A2(45)
  // 4성부를 4개의 인접한 줄(낮은→높은) 위에 배치
  const stringTopIdx = rootStringSet === '6' ? 5 : 4 // SVG stringIndex (5 = 6번줄)
  // 4개 줄: stringTopIdx, stringTopIdx-1, stringTopIdx-2, stringTopIdx-3
  const stringIndices = [stringTopIdx, stringTopIdx - 1, stringTopIdx - 2, stringTopIdx - 3]
  if (stringIndices.some((s) => s < 0)) return null

  const positions: FretPosition[] = []
  const notesOut: string[] = []
  for (let i = 0; i < 4; i++) {
    const targetMidi = voicing[i]
    const stringIdx = stringIndices[i]
    const openMidi = midiAt(stringIdx, 0)
    const fret = targetMidi - openMidi
    if (fret < 0 || fret > 12) return null
    positions.push({ string: stringIdx, fret })
    notesOut.push(Note.fromMidi(targetMidi))
  }
  return { positions, notes: notesOut }
}

function generateProblem(): { chordName: string; positions: FretPosition[]; notes: string[] } {
  // 가능한 보이싱이 잡힐 때까지 시도
  for (let i = 0; i < 30; i++) {
    const root = ROOTS[Math.floor(Math.random() * ROOTS.length)]
    const q = QUALITIES[Math.floor(Math.random() * QUALITIES.length)]
    const set = Math.random() < 0.5 ? '5' : '6'
    const voicing = drop2Voicing(root + q, set as '5' | '6')
    if (voicing) {
      return { chordName: root + q, positions: voicing.positions, notes: voicing.notes }
    }
  }
  // fallback
  const voicing = drop2Voicing('Cmaj7', '5')!
  return { chordName: 'Cmaj7', positions: voicing.positions, notes: voicing.notes }
}

function sameSet(a: FretPosition[], b: FretPosition[]): boolean {
  if (a.length !== b.length) return false
  const key = (p: FretPosition) => `${p.string}:${p.fret}`
  const setA = new Set(a.map(key))
  return b.every((p) => setA.has(key(p)))
}

export default function VoicingFind() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [problem, setProblem] = useState<{ chordName: string; positions: FretPosition[]; notes: string[] } | null>(null)
  const [picks, setPicks] = useState<FretPosition[]>([])
  const [revealed, setRevealed] = useState(false)
  const [finished, setFinished] = useState(false)

  const start = () => {
    setRound(1)
    setScore(0)
    setFinished(false)
    setProblem(generateProblem())
    setPicks([])
    setRevealed(false)
  }

  const onClick = useCallback(
    (pos: FretPosition) => {
      if (revealed) return
      setPicks((prev) => {
        const exists = prev.find((p) => p.string === pos.string && p.fret === pos.fret)
        if (exists) return prev.filter((p) => !(p.string === pos.string && p.fret === pos.fret))
        if (prev.length >= 4) return prev
        return [...prev, pos]
      })
    },
    [revealed]
  )

  const check = () => {
    if (!problem) return
    const correct = sameSet(picks, problem.positions)
    if (correct) setScore((s) => s + 1)
    setRevealed(true)
  }

  const next = () => {
    if (!problem) return
    if (round >= ROUND_LENGTH) {
      setFinished(true)
      saveDrillScore('voicing-find', Math.round((score / ROUND_LENGTH) * 100))
      setProblem(null)
      return
    }
    setRound((r) => r + 1)
    setProblem(generateProblem())
    setPicks([])
    setRevealed(false)
  }

  const marks: MarkedPosition[] = useMemo(() => {
    if (!problem) return []
    if (revealed) {
      const correctKeys = new Set(problem.positions.map((p) => `${p.string}:${p.fret}`))
      const m: MarkedPosition[] = []
      // 정답 보이싱 표시 (검정 채움 + 음 라벨)
      problem.positions.forEach((p, i) => {
        const midi = midiAt(p.string, p.fret)
        const pc = pcOf(midi)
        const noteName = problem.notes[i]
        const label = noteName.replace(/\d/g, '').slice(0, 2)
        m.push({ ...p, kind: 'correct', label })
        void pc
      })
      // 사용자가 고른 위치 중 오답 위치는 빨강 X
      picks.forEach((p) => {
        const key = `${p.string}:${p.fret}`
        if (!correctKeys.has(key)) {
          m.push({ ...p, kind: 'wrong' })
        }
      })
      return m
    }
    // 미공개 — 사용자 픽만 표시
    return picks.map<MarkedPosition>((p) => ({ ...p, kind: 'highlight' }))
  }, [problem, picks, revealed])

  return (
    <DrillFrame
      number={4}
      title="보이싱 찾기"
      description="제시된 코드의 Drop 2 보이싱을 지판에서 4음으로 표시하세요. 5번줄 또는 6번줄 베이스."
      footerStats={[
        { label: 'Round', value: `${round}/${ROUND_LENGTH}` },
        { label: 'Score', value: score },
        { label: 'Picks', value: `${picks.length}/4` },
      ]}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow">Chord</span>
          <span className="display text-6xl text-ink font-mono">
            {problem?.chordName ?? '—'}
          </span>
        </div>
        <div className="flex gap-2">
          {round === 0 || finished ? (
            <Button onClick={start} size="md">
              <IconPlay size={16} />
              {finished ? '다시' : '시작'}
            </Button>
          ) : !revealed ? (
            <Button onClick={check} size="md" disabled={picks.length !== 4}>
              <IconCheck size={16} />
              확인
            </Button>
          ) : (
            <Button onClick={next} size="md">
              {round >= ROUND_LENGTH ? '결과' : '다음'}
              <IconArrowRight size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="border border-rule bg-paper-bright p-2">
        <Fretboard
          marks={marks}
          onPositionClick={problem && !revealed ? onClick : undefined}
        />
      </div>

      {revealed && problem && (
        <div className="border-l border-ink pl-4 py-1">
          <div className="eyebrow mb-1">정답 보이싱 (Drop 2)</div>
          <div className="font-mono text-sm text-ink-soft tracking-widest">
            {problem.notes.join('  ·  ')}
          </div>
        </div>
      )}

      {finished && (
        <div className="border border-ink p-4">
          <div className="eyebrow mb-2">Round Result</div>
          <ScoreDisplay correct={score} total={ROUND_LENGTH} />
        </div>
      )}
    </DrillFrame>
  )
}
