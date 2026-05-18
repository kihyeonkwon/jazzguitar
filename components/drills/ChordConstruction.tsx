'use client'

import { useEffect, useRef, useState } from 'react'
import ChordQuiz from '@/components/music/ChordQuiz'
import DrillFrame from './shared/DrillFrame'
import { saveDrillRound } from '@/lib/progress/drills'

const ROUND_SIZE = 10  // 10 chord attempts = 1 round

export default function ChordConstruction() {
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const roundStartRef = useRef<number>(0)
  const lastSavedCorrectRef = useRef<number>(0)
  const lastSavedTotalRef = useRef<number>(0)

  // 라운드 완료 시 점수 저장
  useEffect(() => {
    if (score.total === 1 && roundStartRef.current === 0) {
      roundStartRef.current = Date.now()
    }
    if (score.total > 0 && score.total % ROUND_SIZE === 0) {
      const startedAt = roundStartRef.current || Date.now()
      const elapsedSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
      const roundCorrect = score.correct - lastSavedCorrectRef.current
      const roundTotal = score.total - lastSavedTotalRef.current
      saveDrillRound('chord-construction', {
        correct: roundCorrect,
        total: roundTotal,
        durationSec: elapsedSec,
      })
      lastSavedCorrectRef.current = score.correct
      lastSavedTotalRef.current = score.total
      roundStartRef.current = Date.now()
    }
  }, [score])

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  const currentRound = Math.floor(score.total / ROUND_SIZE) + 1
  const inRoundProgress = score.total % ROUND_SIZE

  return (
    <DrillFrame
      number={6}
      title="코드 구구단"
      description="코드 이름을 보고 구성음을 클릭으로 선택. Triad와 7th 두 모드."
      footerStats={[
        { label: 'Round',    value: `${currentRound}` },
        { label: 'Progress', value: `${inRoundProgress}/${ROUND_SIZE}` },
        { label: 'Accuracy', value: `${accuracy}%` },
      ]}
    >
      <ChordQuiz onScoreChange={setScore} />
    </DrillFrame>
  )
}
