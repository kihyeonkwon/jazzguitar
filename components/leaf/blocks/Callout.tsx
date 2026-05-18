'use client'

import { renderMarkdown } from '../markdown'

type CalloutType = 'tip' | 'info' | 'warning' | 'note'

interface Props {
  type?: CalloutType
  title?: string
  body: string  // 마크다운 본문
}

const TYPE_LABEL: Record<CalloutType, string> = {
  tip:     'Tip',
  info:    'Info',
  warning: 'Warning',
  note:    'Note',
}

export default function Callout({ type = 'note', title, body }: Props) {
  // warning은 미세한 빨강 보더만 허용 (디자인 시스템 예외)
  const isWarning = type === 'warning'

  return (
    <div className={`my-6 border-l-2 pl-5 py-2 ${
      isWarning ? 'border-red-400' : 'border-ink'
    }`}>
      <div className={`eyebrow mb-1 ${
        isWarning ? 'text-red-500' : 'text-ink-faint'
      }`}>
        {TYPE_LABEL[type]}
      </div>
      {title && (
        <h4 className="text-[15px] font-semibold text-ink mb-1.5">{title}</h4>
      )}
      <div className="callout-body text-[14px] text-ink-soft leading-[1.7]">
        {renderMarkdown(body)}
      </div>
    </div>
  )
}
