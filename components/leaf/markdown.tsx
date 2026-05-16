import React from 'react'

/**
 * 경량 markdown 렌더러 — 헤딩(##, ###), 리스트(-), 볼드(**), 인라인 코드(`) 지원
 * 블로그 톤의 본문을 깔끔하게 렌더링합니다.
 */

function renderInline(text: string): React.ReactNode {
  // 볼드 + 인라인 코드 양쪽 지원
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {p.slice(2, -2)}
        </strong>
      )
    }
    if (p.startsWith('`') && p.endsWith('`')) {
      return (
        <code key={i} className="font-mono text-[13px] bg-surface px-1.5 py-0.5 text-ink">
          {p.slice(1, -1)}
        </code>
      )
    }
    return <span key={i}>{p}</span>
  })
}

export function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split('\n')
  const blocks: React.ReactNode[] = []
  let para: string[] = []
  let listItems: string[] = []

  const flushPara = (key: string) => {
    if (para.length > 0) {
      blocks.push(
        <p key={key} className="text-ink-soft text-[15px] leading-[1.75] my-4">
          {renderInline(para.join(' '))}
        </p>,
      )
      para = []
    }
  }
  const flushList = (key: string) => {
    if (listItems.length > 0) {
      blocks.push(
        <ul key={key} className="my-4 space-y-2">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-3 text-ink-soft text-[15px] leading-[1.7]">
              <span className="text-ink-faint mt-2.5 w-1 h-1 bg-ink-faint rounded-full shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushPara(`p-${i}`); flushList(`l-${i}`)
      blocks.push(
        <h2 key={i} className="display text-2xl text-ink mt-12 mb-3 leading-snug">
          {line.replace(/^##\s+/, '')}
        </h2>,
      )
    } else if (line.startsWith('### ')) {
      flushPara(`p-${i}`); flushList(`l-${i}`)
      blocks.push(
        <h3 key={i} className="text-base font-semibold text-ink mt-8 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>,
      )
    } else if (line.startsWith('- ')) {
      flushPara(`p-${i}`)
      listItems.push(line.replace(/^-\s+/, ''))
    } else if (line.trim() === '') {
      flushPara(`p-${i}`); flushList(`l-${i}`)
    } else {
      flushList(`l-${i}`)
      para.push(line)
    }
  })
  flushPara('p-final'); flushList('l-final')
  return blocks
}
