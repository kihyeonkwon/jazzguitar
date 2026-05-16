'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import SheetMusic from '@/components/music/SheetMusic'

type LickCategory = 'all' | 'blues' | 'iivi' | 'bebop'

interface Lick {
  id: string
  category: Exclude<LickCategory, 'all'>
  title: string
  description: string
  key: string
  bpm: number
  abcNotation: string
}

const LICKS: Lick[] = [
  {
    id: 'lick-1',
    category: 'blues',
    title: 'F 블루스 기본 릭',
    description: '블루스 스케일 기반. 턴어라운드에 활용.',
    key: 'F',
    bpm: 80,
    abcNotation: `X:1
T:F Blues Lick #1
M:4/4
L:1/8
Q:1/4=80
K:F
_e c _B =B c4 | _e c _B A F4 |]`,
  },
  {
    id: 'lick-2',
    category: 'blues',
    title: '콜-앤-리스폰스 릭',
    description: '블루스 특유의 질문-대답 구조. 2마디 완성.',
    key: 'F',
    bpm: 80,
    abcNotation: `X:1
T:Call and Response Lick
M:4/4
L:1/8
Q:1/4=80
K:F
_e g f _e c2 F2 | _B c _B A F4 |]`,
  },
  {
    id: 'lick-3',
    category: 'blues',
    title: '믹솔리디안 릭',
    description: 'F 믹솔리디안 기반. 재지한 색채.',
    key: 'F',
    bpm: 90,
    abcNotation: `X:1
T:Mixolydian Lick
M:4/4
L:1/8
Q:1/4=90
K:Bb
f _e d c _B A G F |]`,
  },
  {
    id: 'lick-4',
    category: 'iivi',
    title: 'C 키 ii-V-I 릭',
    description: 'Dm7-G7-Cmaj7 전체를 하나의 프레이즈로.',
    key: 'C',
    bpm: 80,
    abcNotation: `X:1
T:ii-V-I Lick in C
M:4/4
L:1/8
Q:1/4=80
K:C
d f a c' | B G F E | C4 z4 |]`,
  },
  {
    id: 'lick-5',
    category: 'iivi',
    title: '가이드 톤 ii-V-I 릭',
    description: '3도-7도 가이드 톤으로 진행하는 심플한 릭.',
    key: 'C',
    bpm: 70,
    abcNotation: `X:1
T:Guide Tone ii-V-I Lick
M:4/4
L:1/4
Q:1/4=70
K:C
[FC]2 [BG]2 | [EB]4 |]`,
  },
  {
    id: 'lick-6',
    category: 'bebop',
    title: '비밥 스케일 런',
    description: '비밥 스케일을 활용한 다운비트 코드톤 착지.',
    key: 'C',
    bpm: 100,
    abcNotation: `X:1
T:Bebop Scale Run
M:4/4
L:1/8
Q:1/4=100
K:C
c B _B A G F E D | C4 z4 |]`,
  },
]

export default function LicksClient() {
  const t = useTranslations('licks')
  const [activeFilter, setActiveFilter] = useState<LickCategory>('all')

  const filters: { id: LickCategory; label: string }[] = [
    { id: 'all', label: t('all') },
    { id: 'blues', label: t('blues') },
    { id: 'iivi', label: t('iivi') },
    { id: 'bebop', label: t('bebop') },
  ]

  const filtered = activeFilter === 'all' ? LICKS : LICKS.filter(l => l.category === activeFilter)

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === f.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lick Grid */}
      <div className="space-y-4">
        {filtered.map((lick) => (
          <div
            key={lick.id}
            className="rounded-xl border border-gray-200 bg-white p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 capitalize">
                    {lick.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {t('key')}: {lick.key}
                  </span>
                </div>
                <h3 className="text-gray-900 font-semibold">{lick.title}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{lick.description}</p>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-full shrink-0 border border-gray-200 text-gray-500">
                {lick.bpm} BPM
              </div>
            </div>
            <SheetMusic notation={lick.abcNotation} bpm={lick.bpm} />
          </div>
        ))}
      </div>
    </div>
  )
}
