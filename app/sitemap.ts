import type { MetadataRoute } from 'next'
import { routing } from '@/lib/i18n/routing'
import { absoluteUrl, SITE_URL, localePath } from '@/lib/seo'
import type { Locale } from '@/lib/curriculum/types'
import {
  backingTracks,
  leaves,
  principles,
  tips,
  trunks,
} from '@/lib/curriculum/organic'

const TRAIN_TYPES = [
  'fretboard-find',
  'interval-ear',
  'chord-quality-ear',
  'voicing-find',
  'chord-tone-id',
  'chord-construction',
  'scale-construction',
  'drop-voicing-misty',
]

type RouteConfig = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

function absoluteAlternates(path: string) {
  return {
    ko: `${SITE_URL}${localePath('ko', path)}`,
    en: `${SITE_URL}${localePath('en', path)}`,
    ja: `${SITE_URL}${localePath('ja', path)}`,
    'x-default': `${SITE_URL}${localePath(routing.defaultLocale, path)}`,
  }
}

function routesForLocales({
  path,
  changeFrequency,
  priority,
}: RouteConfig): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale as Locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: absoluteAlternates(path),
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: RouteConfig[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/curriculum', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/train', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/jam', changeFrequency: 'monthly', priority: 0.72 },
    { path: '/licks', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/principles', changeFrequency: 'monthly', priority: 0.62 },
  ]

  const trainRoutes: RouteConfig[] = TRAIN_TYPES.map((type) => ({
    path: `/train/${type}`,
    changeFrequency: 'monthly',
    priority: type.includes('construction') || type.includes('voicing') ? 0.76 : 0.68,
  }))

  const trunkRoutes: RouteConfig[] = trunks.map((trunk) => ({
    path: `/trunk/${trunk.slug}`,
    changeFrequency: 'monthly',
    priority: 0.82,
  }))

  const leafRoutes: RouteConfig[] = leaves.map((leaf) => ({
    path: `/leaf/${leaf.slug}`,
    changeFrequency: 'monthly',
    priority: leaf.level === 'beginner' ? 0.86 : 0.8,
  }))

  const jamRoutes: RouteConfig[] = backingTracks.map((track) => ({
    path: `/jam/${track.id}`,
    changeFrequency: 'monthly',
    priority: 0.66,
  }))

  const tipRoutes: RouteConfig[] = tips.map((tip) => ({
    path: `/tip/${tip.slug}`,
    changeFrequency: 'monthly',
    priority: 0.58,
  }))

  const principleRoutes: RouteConfig[] = principles.map((principle) => ({
    path: `/principles/${principle.slug}`,
    changeFrequency: 'monthly',
    priority: 0.58,
  }))

  return [
    ...coreRoutes,
    ...trainRoutes,
    ...trunkRoutes,
    ...leafRoutes,
    ...jamRoutes,
    ...tipRoutes,
    ...principleRoutes,
  ].flatMap(routesForLocales)
}
