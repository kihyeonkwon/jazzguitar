'use client'

import { NumericDisplay } from '@/components/ui'

interface ScoreDisplayProps {
  correct: number
  total: number
}

export default function ScoreDisplay({ correct, total }: ScoreDisplayProps) {
  const ratio = total === 0 ? 0 : Math.round((correct / total) * 100)
  return (
    <div className="flex items-end gap-8">
      <NumericDisplay value={`${correct}/${total}`} label="정답" size="lg" />
      <NumericDisplay value={`${ratio}%`} label="정답률" size="md" />
    </div>
  )
}
