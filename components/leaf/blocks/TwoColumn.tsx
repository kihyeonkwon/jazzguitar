'use client'

import { renderMarkdown } from '../markdown'

interface ColumnData {
  header?: string
  body: string  // 마크다운
}

interface Props {
  left: ColumnData
  right: ColumnData
}

export default function TwoColumn({ left, right }: Props) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
      <Column data={left} />
      <Column data={right} />
    </div>
  )
}

function Column({ data }: { data: ColumnData }) {
  return (
    <div className="bg-paper-bright p-5">
      {data.header && (
        <div className="eyebrow mb-3">{data.header}</div>
      )}
      <div className="text-[14px] text-ink-soft leading-[1.7]">
        {renderMarkdown(data.body)}
      </div>
    </div>
  )
}
