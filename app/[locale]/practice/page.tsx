import Metronome from '@/components/music/Metronome'
import ChordQuiz from '@/components/music/ChordQuiz'
import { SectionHeader } from '@/components/ui'

export default function PracticePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-16">
      <SectionHeader
        number={0}
        eyebrow="Practice Tools"
        title="연습 도구"
        description="언제든 꺼내 쓰는 보조 도구들. 메트로놈은 우측 하단 플로팅 버튼으로도 어느 페이지에서나 호출됩니다."
      />

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="section-no">M</span>
          <span className="eyebrow">Full Metronome</span>
        </div>
        <Metronome initialBpm={80} showTimeSignature />
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="section-no">C</span>
          <span className="eyebrow">Chord Construction</span>
        </div>
        <p className="text-ink-soft text-sm">
          코드 이름을 보고 구성음을 즉시 떠올리는 연습. Triad / 7th 두 모드.
        </p>
        <ChordQuiz />
      </section>
    </div>
  )
}
