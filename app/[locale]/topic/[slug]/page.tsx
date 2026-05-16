import { redirect } from 'next/navigation'
import { getPrincipleBySlug } from '@/lib/curriculum/organic'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

// /topic/[slug] → /principles/[slug] (legacy redirect)
export default async function LegacyTopicRedirect({ params }: Props) {
  const { slug, locale } = await params

  if (getPrincipleBySlug(slug)) {
    redirect(`/${locale}/principles/${slug}`)
  }
  // 없으면 트리로
  redirect(`/${locale}/curriculum`)
}
