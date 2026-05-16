import { notFound } from 'next/navigation'
import { Link } from '@/lib/i18n/navigation'
import { IconArrowLeft } from '@/components/icons'
import FretboardFind from '@/components/drills/FretboardFind'
import IntervalEar from '@/components/drills/IntervalEar'
import ChordQualityEar from '@/components/drills/ChordQualityEar'
import VoicingFind from '@/components/drills/VoicingFind'
import ChordToneId from '@/components/drills/ChordToneId'
import ChordConstruction from '@/components/drills/ChordConstruction'

interface Props {
  params: Promise<{ type: string; locale: string }>
}

const DRILL_TYPES = ['fretboard-find', 'interval-ear', 'chord-quality-ear', 'voicing-find', 'chord-tone-id', 'chord-construction']

export default async function DrillPage({ params }: Props) {
  const { type } = await params
  if (!DRILL_TYPES.includes(type)) notFound()

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/drill"
          className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
        >
          <IconArrowLeft size={14} />
          DRILLS
        </Link>
      </div>
      {type === 'fretboard-find' && <FretboardFind />}
      {type === 'interval-ear' && <IntervalEar />}
      {type === 'chord-quality-ear' && <ChordQualityEar />}
      {type === 'voicing-find' && <VoicingFind />}
      {type === 'chord-tone-id' && <ChordToneId />}
      {type === 'chord-construction' && <ChordConstruction />}
    </div>
  )
}
