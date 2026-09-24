import type { MetadataRoute } from 'next'
import { routing } from '@/lib/i18n/routing'
import { absoluteUrl, SITE_URL, localePath } from '@/lib/seo'
import type { Locale } from '@/lib/curriculum/types'
import { GAME_TYPES } from '@/lib/train/games'

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
    { path: '/train', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/rank', changeFrequency: 'daily', priority: 0.7 },
  ]

  const trainRoutes: RouteConfig[] = GAME_TYPES.map((type) => ({
    path: `/train/${type}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...coreRoutes, ...trainRoutes].flatMap(routesForLocales)
}
