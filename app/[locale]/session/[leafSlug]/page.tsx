import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ leafSlug: string; locale: string }>
}

// /session/[leafSlug] → /leaf/[slug] (legacy redirect)
// Practice는 이제 잎 페이지의 한 섹션으로 통합됨
export default async function LegacySessionRedirect({ params }: Props) {
  const { leafSlug, locale } = await params
  redirect(`/${locale}/leaf/${leafSlug}`)
}
