import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import DegreeId from '@/components/drills/DegreeId'
import ChordConstruction from '@/components/drills/ChordConstruction'
import ScaleConstruction from '@/components/drills/ScaleConstruction'
import { getGame } from '@/lib/train/games'
import { asLocale, buildPageMetadata } from '@/lib/seo'

type Props = {
  params: Promise<{ locale: string; type: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, type } = await params
  const locale = asLocale(rawLocale)
  const game = getGame(type)
  const tSite = await getTranslations({ locale, namespace: 'site' })
  if (!game) return { title: tSite('name') }
  const tGames = await getTranslations({ locale, namespace: 'games' })

  return buildPageMetadata({
    locale,
    path: `/train/${type}`,
    title: tGames(`${game.type}.title`),
    description: tGames(`${game.type}.seoDescription`),
    siteName: tSite('name'),
    imageAlt: tSite('ogAlt'),
  })
}

export default async function TrainGamePage({ params }: Props) {
  const { type } = await params
  const game = getGame(type)
  if (!game) notFound()

  return (
    <div>
      {game.type === 'degree-id' && <DegreeId />}
      {game.type === 'chord-construction' && <ChordConstruction />}
      {game.type === 'scale-construction' && <ScaleConstruction />}
    </div>
  )
}
