'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { backingTracks, getBackingTrackById } from '@/lib/curriculum/organic'
import { transposeTrack, getKeyOptions } from '@/lib/music/transpose'
import type { BackingTrack, Locale } from '@/lib/curriculum/types'

const BackingTrackPlayer = dynamic(
  () => import('@/components/jam/BackingTrackPlayer'),
  { ssr: false, loading: () => <div className="border border-rule p-6 text-ink-faint text-sm">백킹 트랙 로딩…</div> },
)
const YouTubeEmbed = dynamic(
  () => import('@/components/jam/YouTubeEmbed'),
  { ssr: false },
)

interface Props {
  recommendedTrackIds: string[]
  locale: Locale
}

export default function JamPicker({ recommendedTrackIds, locale }: Props) {
  // 추천 트랙이 있으면 첫 번째, 없으면 F 블루스
  const initialId = recommendedTrackIds[0] ?? 'bt-f-blues-80'
  const [trackId, setTrackId] = useState(initialId)
  const [semitones, setSemitones] = useState(0)

  const baseTrack = getBackingTrackById(trackId) ?? backingTracks[0]
  const playedTrack: BackingTrack = useMemo(
    () => transposeTrack(baseTrack, semitones),
    [baseTrack, semitones],
  )

  // 트랙 변경 시 키 리셋
  const changeTrack = (newId: string) => {
    setTrackId(newId)
    setSemitones(0)
  }

  const keyOptions = useMemo(() => getKeyOptions(baseTrack.key), [baseTrack.key])
  const ytCaption = baseTrack.referenceCaption?.[locale]

  return (
    <div className="space-y-5">
      {/* 트랙 + 키 셀렉터 */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
        <div className="border border-rule bg-paper-bright">
          <label className="block px-4 pt-3 eyebrow">Track</label>
          <select
            value={trackId}
            onChange={(e) => changeTrack(e.target.value)}
            className="w-full px-4 pb-3 pt-1 bg-transparent text-[14px] font-medium text-ink outline-none cursor-pointer"
          >
            {backingTracks.map(t => {
              const recommended = recommendedTrackIds.includes(t.id)
              return (
                <option key={t.id} value={t.id}>
                  {recommended ? '★ ' : ''}{t.name[locale]}
                </option>
              )
            })}
          </select>
        </div>

        <div className="border border-rule bg-paper-bright md:w-48">
          <label className="block px-4 pt-3 eyebrow">Key</label>
          <select
            value={semitones}
            onChange={(e) => setSemitones(parseInt(e.target.value, 10))}
            className="w-full px-4 pb-3 pt-1 bg-transparent text-[14px] font-mono font-medium text-ink outline-none cursor-pointer"
          >
            {keyOptions.map(opt => (
              <option key={opt.semitones} value={opt.semitones}>
                {opt.label}{opt.semitones === 0 ? '  (원키)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 트랙 메타 */}
      <div className="flex items-baseline justify-between text-[11px] font-mono tabular text-ink-faint tracking-widest">
        <span>
          {playedTrack.key.toUpperCase()} · {playedTrack.bpm} BPM · {playedTrack.bars} BARS
        </span>
        {semitones !== 0 && (
          <span className="text-ink-soft">
            TRANSPOSED {semitones > 0 ? '+' : ''}{semitones} st
          </span>
        )}
      </div>

      {/* 우리 백킹 (리드시트 + 재생 + 녹음 통합) */}
      <BackingTrackPlayer track={playedTrack} />

      {/* YouTube reference (옵션, 원키일 때만) */}
      {semitones === 0 && baseTrack.referenceYoutubeId && (
        <YouTubeEmbed videoId={baseTrack.referenceYoutubeId} caption={ytCaption} />
      )}
    </div>
  )
}
