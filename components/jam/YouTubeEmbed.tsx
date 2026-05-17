'use client'

import { useState } from 'react'
import { IconPlay } from '@/components/icons'

interface Props {
  videoId: string
  caption?: string
}

/**
 * YouTube 임베드 — privacy-friendly nocookie 도메인 사용.
 * 클릭 전까지는 thumbnail만 로드 (성능 최적화).
 */
export default function YouTubeEmbed({ videoId, caption }: Props) {
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    return (
      <div className="border border-rule bg-paper-bright">
        <div className="p-4 border-b border-rule flex items-baseline justify-between">
          <span className="eyebrow">Reference · YouTube</span>
          {caption && (
            <span className="text-[11px] font-mono text-ink-faint tracking-widest">
              {caption}
            </span>
          )}
        </div>
        <button
          onClick={() => setLoaded(true)}
          className="group relative w-full aspect-video bg-ink/95 overflow-hidden"
          aria-label="Play YouTube video"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full bg-paper-bright/90 group-hover:bg-paper-bright flex items-center justify-center transition-colors">
              <IconPlay size={24} className="text-ink translate-x-0.5" />
            </span>
          </div>
          <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-paper-bright/80 bg-ink/40 px-2 py-1">
            CLICK TO LOAD
          </div>
        </button>
      </div>
    )
  }

  return (
    <div className="border border-rule bg-paper-bright">
      <div className="p-4 border-b border-rule flex items-baseline justify-between">
        <span className="eyebrow">Reference · YouTube</span>
        {caption && (
          <span className="text-[11px] font-mono text-ink-faint tracking-widest">
            {caption}
          </span>
        )}
      </div>
      <div className="aspect-video bg-ink">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
          title="YouTube reference"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
