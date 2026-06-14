/**
 * 커스텀 라인 아이콘 — 24x24, stroke 1.5, currentColor
 * 모두 같은 시각 언어. 이모지 대체.
 */

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

// ─── Trunk icons (7) ──────────────────────────────────────────────

// 기초 — 4x4 fretboard grid
export function IconFoundation(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="4" width="16" height="16" rx="0.5" />
      <line x1="4"  y1="9"  x2="20" y2="9"  />
      <line x1="4"  y1="14" x2="20" y2="14" />
      <line x1="9"  y1="4"  x2="9"  y2="20" />
      <line x1="14" y1="4"  x2="14" y2="20" />
    </Svg>
  )
}

// 블루스 — 12 short bars
export function IconBlues(p: IconProps) {
  return (
    <Svg {...p}>
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 3.5 + (i * 17) / 11
        const h = (i % 3 === 0) ? 12 : (i % 3 === 1) ? 8 : 6
        return <line key={i} x1={x} y1={12 + h / 2} x2={x} y2={12 - h / 2} />
      })}
    </Svg>
  )
}

// 화성·컴핑 — 3 dots in triangular triad pattern
export function IconHarmony(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="6"  r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6"  cy="17" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17" r="1.6" fill="currentColor" stroke="none" />
      <line x1="12" y1="6"  x2="6"  y2="17" />
      <line x1="12" y1="6"  x2="18" y2="17" />
      <line x1="6"  y1="17" x2="18" y2="17" />
    </Svg>
  )
}

// 솔로 — single curved melodic line
export function IconSoloing(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 16 Q 7 6, 12 10 T 21 8" />
      <circle cx="3"  cy="16" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="21" cy="8"  r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  )
}

// 청음 — concentric arcs (sonar)
export function IconEar(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path d="M10 6.5 a 7 7 0 0 1 0 11" />
      <path d="M13.5 4 a 11 11 0 0 1 0 16" />
      <path d="M17 1.5 a 15 15 0 0 1 0 21" opacity="0.5" />
    </Svg>
  )
}

// 스탠다드 — open book
export function IconStandards(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 5 Q 4 4, 5 4 L 11 4 Q 12 4, 12 5 L 12 19 Q 12 20, 11 20 L 5 20 Q 4 20, 4 19 Z" />
      <path d="M20 5 Q 20 4, 19 4 L 13 4 Q 12 4, 12 5 L 12 19 Q 12 20, 13 20 L 19 20 Q 20 20, 20 19 Z" />
      <line x1="6"  y1="8"  x2="10" y2="8" />
      <line x1="6"  y1="11" x2="10" y2="11" />
      <line x1="14" y1="8"  x2="18" y2="8" />
      <line x1="14" y1="11" x2="18" y2="11" />
    </Svg>
  )
}

// 아티스트 — note head + stem
export function IconArtist(p: IconProps) {
  return (
    <Svg {...p}>
      <ellipse cx="8" cy="17" rx="4" ry="3" transform="rotate(-20 8 17)" fill="currentColor" stroke="none" />
      <line x1="12" y1="16.5" x2="12" y2="4" />
      <path d="M12 4 Q 18 5, 17 11" />
    </Svg>
  )
}

// 시작 (root) — small filled dot center
export function IconRoot(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </Svg>
  )
}

// ─── Utility icons ────────────────────────────────────────────────

export function IconArrowRight(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </Svg>
  )
}

export function IconArrowLeft(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 6 5 12 11 18" />
    </Svg>
  )
}

export function IconCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <polyline points="5 12 10 17 19 7" />
    </Svg>
  )
}

export function IconPlus(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  )
}

export function IconMinus(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  )
}

export function IconClose(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Svg>
  )
}

export function IconMenu(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="5" y1="12" x2="19" y2="12" />
      <line x1="5" y1="17" x2="19" y2="17" />
    </Svg>
  )
}

export function IconPlay(p: IconProps) {
  return (
    <Svg {...p}>
      <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconStop(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="6" y="6" width="12" height="12" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconRecord(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function IconMetronome(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 21 L 9 4 L 15 4 L 17 21 Z" />
      <line x1="12" y1="18" x2="12" y2="7" />
    </Svg>
  )
}

export function IconDownload(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 4 L 12 16" />
      <polyline points="7 11 12 16 17 11" />
      <line x1="5" y1="20" x2="19" y2="20" />
    </Svg>
  )
}

// ─── 트렁크 슬러그 → 아이콘 매핑 ──────────────────────────────────

import type { TrunkSlug } from '@/lib/curriculum/types'

export const TrunkIconMap: Record<TrunkSlug, React.ComponentType<IconProps>> = {
  'solo':       IconSoloing,
  'comping':    IconHarmony,
  'repertoire': IconStandards,
  'ear-time':   IconEar,
}
