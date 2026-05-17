'use client'

import { renderMarkdown } from './markdown'

interface Props {
  content: string
}

export default function TheoryProse({ content }: Props) {
  return (
    <article className="leaf-prose max-w-none">
      {renderMarkdown(content)}
    </article>
  )
}
