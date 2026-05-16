import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import { getTipBySlug } from '@/lib/curriculum/organic'
import { Locale } from '@/lib/curriculum/types'
import { IconArrowRight, IconArrowLeft } from '@/components/icons'
import { Divider } from '@/components/ui'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  )
}

function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split('\n')
  const blocks: React.ReactNode[] = []
  let para: string[] = []
  let listItems: string[] = []

  const flushPara = (key: string) => {
    if (para.length) {
      blocks.push(
        <p key={key} className="text-ink-soft text-[15px] leading-relaxed my-4">
          {renderInline(para.join(' '))}
        </p>
      )
      para = []
    }
  }
  const flushList = (key: string) => {
    if (listItems.length) {
      blocks.push(
        <ul key={key} className="my-4 space-y-1.5">
          {listItems.map((item, i) => (
            <li key={i} className="flex gap-3 text-ink-soft text-[15px] leading-relaxed">
              <span className="text-ink-faint mt-1.5 w-1 h-1 bg-ink-faint rounded-full shrink-0"></span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      listItems = []
    }
  }

  lines.forEach((line, i) => {
    if (line.startsWith('## ')) {
      flushPara(`p-${i}`); flushList(`l-${i}`)
      blocks.push(
        <h2 key={i} className="display text-xl text-ink mt-10 mb-3 leading-snug">
          {line.replace(/^##\s+/, '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      flushPara(`p-${i}`); flushList(`l-${i}`)
      blocks.push(
        <h3 key={i} className="text-base font-semibold text-ink mt-6 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>
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

export default async function TipPage({ params }: Props) {
  const { slug } = await params
  const locale = (await getLocale()) as Locale

  const tip = getTipBySlug(slug)
  if (!tip) notFound()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-12">

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-ink-faint hover:text-ink transition-colors font-mono tracking-widest"
      >
        <IconArrowLeft size={14} />
        HOME
      </Link>

      {/* Cover */}
      <header className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="section-no">T</span>
          <span className="eyebrow">Tip · 2 min read</span>
        </div>
        <h1 className="display text-4xl text-ink leading-[1.05]">
          {tip.title[locale]}
        </h1>
        <p className="text-ink-soft text-[15px] leading-relaxed">
          {tip.summary[locale]}
        </p>
      </header>

      <Divider />

      {/* Content */}
      <article className="max-w-none -mt-2">
        {renderMarkdown(tip.content[locale])}
      </article>

      {/* Apply now */}
      {tip.suggestedBackingTrackId && (
        <section className="pt-4 border-t border-rule">
          <Link
            href={`/jam/${tip.suggestedBackingTrackId}`}
            className="group flex items-baseline justify-between py-4 hover:bg-surface/50 -mx-4 px-4 transition-colors"
          >
            <div>
              <div className="eyebrow mb-1">Apply now</div>
              <div className="text-base text-ink">백킹 트랙에서 바로 적용</div>
            </div>
            <IconArrowRight size={16} className="text-ink-faint group-hover:text-ink transition-colors" />
          </Link>
        </section>
      )}
    </div>
  )
}
