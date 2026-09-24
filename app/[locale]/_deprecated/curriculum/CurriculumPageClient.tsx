'use client'

import dynamic from 'next/dynamic'

const TreeOfLife = dynamic(
  () => import('@/components/curriculum/TreeOfLife'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-56px)] bg-paper-bright flex items-center justify-center">
        <span className="text-ink-faint text-sm">나무가 자라고 있습니다...</span>
      </div>
    ),
  }
)

export default function CurriculumPageClient() {
  return <TreeOfLife />
}
