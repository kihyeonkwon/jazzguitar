import { notFound } from 'next/navigation'
import { getProtocolsForLeaf, getProtocolById } from '@/lib/practice/protocols'
import { getLeafBySlug } from '@/lib/curriculum/organic'
import SessionWizard from '@/components/practice/SessionWizard'

interface Props {
  params: Promise<{ leafSlug: string; locale: string }>
  searchParams: Promise<{ p?: string }>
}

export default async function SessionPage({ params, searchParams }: Props) {
  const { leafSlug } = await params
  const { p } = await searchParams

  const leaf = getLeafBySlug(leafSlug)
  if (!leaf) notFound()

  const protocol = p
    ? getProtocolById(p)
    : getProtocolsForLeaf(leafSlug)[0]

  if (!protocol) notFound()

  return <SessionWizard protocol={protocol} />
}
