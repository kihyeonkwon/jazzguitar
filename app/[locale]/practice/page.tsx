import { getTranslations } from 'next-intl/server'
import Metronome from '@/components/music/Metronome'
import ChordQuiz from '@/components/music/ChordQuiz'

export default async function PracticePage() {
  const t = await getTranslations('practice')

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
      </div>

      {/* Metronome */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">메트로놈</h2>
        <Metronome initialBpm={80} showTimeSignature />
      </section>

      {/* Chord Quiz */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">코드 구구단</h2>
        <p className="text-gray-500 text-sm mb-4">코드 이름을 보고 구성음을 입력하세요.</p>
        <ChordQuiz />
      </section>
    </div>
  )
}
