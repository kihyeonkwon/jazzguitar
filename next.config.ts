import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

// 잠시 내려둔 라우트(app/[locale]/_deprecated) → /train 으로 임시 리다이렉트.
// 되살릴 때는 폴더를 원위치로 옮기고 여기서 해당 경로를 빼면 된다.
const RETIRED = [
  'curriculum',
  'drill',
  'jam',
  'leaf',
  'licks',
  'practice',
  'principles',
  'session',
  'tip',
  'topic',
  'trunk',
]

const RETIRED_TRAIN = [
  'fretboard-find',
  'interval-ear',
  'chord-quality-ear',
  'voicing-find',
  'chord-tone-id',
  'drop-voicing-misty',
]

const nextConfig: NextConfig = {
  async redirects() {
    const retired = `:section(${RETIRED.join('|')})`
    const retiredTrain = `:type(${RETIRED_TRAIN.join('|')})`
    return [
      { source: `/:locale(ko|en|ja)/${retired}/:path*`, destination: '/:locale/train', permanent: false },
      { source: `/${retired}/:path*`, destination: '/ko/train', permanent: false },
      { source: `/:locale(ko|en|ja)/train/${retiredTrain}`, destination: '/:locale/train', permanent: false },
    ]
  },
}

export default withNextIntl(nextConfig)
