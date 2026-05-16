'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { getDueRecords, getAllRecords } from '@/lib/practice/leitner'
import { getProtocolById, practiceProtocols } from '@/lib/practice/protocols'
import { getLeafBySlug } from '@/lib/curriculum/organic'
import { Locale, PracticeRecord } from '@/lib/curriculum/types'
import { IconArrowRight } from '@/components/icons'

export default function DueWidget() {
  const locale = useLocale() as Locale
  const [mounted, setMounted] = useState(false)
  const [due, setDue]         = useState<PracticeRecord[]>([])
  const [allRecords, setAll]  = useState<PracticeRecord[]>([])

  useEffect(() => {
    setDue(getDueRecords())
    setAll(getAllRecords())
    setMounted(true)
  }, [])

  if (!mounted) return null

  // 한 번도 안 해본 프로토콜들 (새로운 것)
  const recordKeys = new Set(allRecords.map(r => `${r.leafSlug}__${r.protocolId}`))
  const newProtocols = practiceProtocols.filter(p =>
    !recordKeys.has(`${p.leafSlug}__${p.id}`)
  )

  // 표시할 카드:
  //   1) 복습 due (있으면 우선)
  //   2) 신규 (없으면 due만)
  //   3) 모두 없으면 위젯 자체 안 보임
  if (due.length === 0 && newProtocols.length === 0) return null

  const dueCard = due[0]
  const newCard = newProtocols[0]

  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-3">
        <span className="section-no">02</span>
        <span className="eyebrow">Guided Practice</span>
      </div>

      <div className="border border-rule bg-paper-bright">
        {dueCard && (() => {
          const proto = getProtocolById(dueCard.protocolId)
          const leaf  = getLeafBySlug(dueCard.leafSlug)
          if (!proto || !leaf) return null
          return (
            <Link
              href={`/session/${leaf.slug}?p=${proto.id}`}
              className="group flex items-baseline gap-5 p-5 hover:bg-surface transition-colors border-b border-rule"
            >
              <span className="eyebrow shrink-0">Due</span>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-ink">{leaf.title[locale]}</div>
                <div className="text-xs text-ink-soft mt-1">
                  {proto.name[locale]}  ·  Box {dueCard.box}
                </div>
              </div>
              <IconArrowRight size={14} className="text-ink-faint group-hover:text-ink mt-1.5" />
            </Link>
          )
        })()}

        {newCard && (() => {
          const leaf = getLeafBySlug(newCard.leafSlug)
          if (!leaf) return null
          return (
            <Link
              href={`/session/${leaf.slug}?p=${newCard.id}`}
              className="group flex items-baseline gap-5 p-5 hover:bg-surface transition-colors"
            >
              <span className="eyebrow shrink-0">New</span>
              <div className="flex-1">
                <div className="text-[15px] font-semibold text-ink">{leaf.title[locale]}</div>
                <div className="text-xs text-ink-soft mt-1">
                  {newCard.name[locale]}  ·  ~{newCard.estimatedMin} min
                </div>
              </div>
              <IconArrowRight size={14} className="text-ink-faint group-hover:text-ink mt-1.5" />
            </Link>
          )
        })()}
      </div>
    </section>
  )
}
