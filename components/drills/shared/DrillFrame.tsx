'use client'

import React from 'react'
import { SectionHeader, Divider } from '@/components/ui'

interface FooterStat {
  label: string
  value: string | number
}

interface DrillFrameProps {
  number: number
  eyebrow?: string
  title: string
  description?: string
  footerStats?: FooterStat[]
  children: React.ReactNode
}

export default function DrillFrame({
  number,
  eyebrow = 'Drill',
  title,
  description,
  footerStats,
  children,
}: DrillFrameProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <SectionHeader
        number={number}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <Divider />

      <div className="space-y-6">{children}</div>

      {footerStats && footerStats.length > 0 && (
        <>
          <Divider />
          <div className="grid grid-cols-3 gap-6">
            {footerStats.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="eyebrow">{s.label}</div>
                <div className="text-2xl font-mono font-medium tabular text-ink leading-none">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
