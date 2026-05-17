'use client'

import dynamic from 'next/dynamic'
import { BackingTrack, Locale } from '@/lib/curriculum/types'

const BackingTrackPlayer = dynamic(
  () => import('@/components/jam/BackingTrackPlayer'),
  { ssr: false, loading: () => <div className="border border-rule p-6 text-ink-faint text-sm">백킹 트랙 로딩…</div> },
)
const Recorder = dynamic(
  () => import('@/components/jam/Recorder'),
  { ssr: false, loading: () => <div className="border border-rule p-6 text-ink-faint text-sm">녹음기 로딩…</div> },
)
const YouTubeEmbed = dynamic(
  () => import('@/components/jam/YouTubeEmbed'),
  { ssr: false },
)

interface Props {
  track: BackingTrack
  locale: Locale
  showRecorder?: boolean
}

export default function InlineJam({ track, locale, showRecorder = true }: Props) {
  const ytCaption = track.referenceCaption?.[locale]

  return (
    <div className="space-y-5">
      {/* 트랙 메타 */}
      <div className="flex items-baseline justify-between">
        <div className="text-[15px] font-medium text-ink">{track.name[locale]}</div>
        <div className="text-[11px] font-mono tabular text-ink-faint tracking-widest">
          {track.key.toUpperCase()} · {track.bpm} BPM · {track.bars} BARS
        </div>
      </div>

      {/* 우리 백킹 (Tone.js) */}
      <BackingTrackPlayer track={track} />

      {/* 마이크 + 백킹 동시 녹음 */}
      {showRecorder && <Recorder />}

      {/* YouTube reference (옵션) */}
      {track.referenceYoutubeId && (
        <YouTubeEmbed videoId={track.referenceYoutubeId} caption={ytCaption} />
      )}
    </div>
  )
}
