'use client'

import dynamic from 'next/dynamic'

const CurriculumGraph = dynamic(
  () => import('@/components/curriculum/CurriculumGraph'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-56px)] bg-white flex items-center justify-center">
        <span className="text-gray-400 text-sm">그래프 로딩 중...</span>
      </div>
    ),
  }
)

export default function CurriculumPageClient() {
  return <CurriculumGraph />
}
