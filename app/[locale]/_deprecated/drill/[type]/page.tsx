import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@/lib/i18n/navigation'
import { IconArrowLeft } from '@/components/icons'
import FretboardFind from '@/components/drills/FretboardFind'
import IntervalEar from '@/components/drills/IntervalEar'
import ChordQualityEar from '@/components/drills/ChordQualityEar'
import VoicingFind from '@/components/drills/VoicingFind'
import ChordToneId from '@/components/drills/ChordToneId'
import ChordConstruction from '@/components/drills/ChordConstruction'
import ScaleConstruction from '@/components/drills/ScaleConstruction'
import DropVoicingMisty from '@/components/drills/DropVoicingMisty'
import { asLocale, localePath } from '@/lib/seo'

interface Props {
  params: Promise<{ type: string; locale: string }>
}

const DRILL_TYPES = ['fretboard-find', 'interval-ear', 'chord-quality-ear', 'voicing-find', 'chord-tone-id', 'chord-construction', 'scale-construction', 'drop-voicing-misty']

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, type } = await params
  const locale = asLocale(rawLocale)

  return {
    title: 'Train',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: localePath(locale, `/train/${type}`),
    },
  }
}

export default async function DrillPage({ params }: Props) {
  const { type } = await params
  if (!DRILL_TYPES.includes(type)) notFound()

  return (
    <div>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <Link
          href="/train"
          className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
        >
          <IconArrowLeft size={14} />
          TRAIN
        </Link>
      </div>
      {type === 'fretboard-find' && <FretboardFind />}
      {type === 'interval-ear' && <IntervalEar />}
      {type === 'chord-quality-ear' && <ChordQualityEar />}
      {type === 'voicing-find' && <VoicingFind />}
      {type === 'chord-tone-id' && <ChordToneId />}
      {type === 'chord-construction' && <ChordConstruction />}
      {type === 'scale-construction' && <ScaleConstruction />}
      {type === 'drop-voicing-misty' && <DropVoicingMisty />}
    </div>
  )
}
