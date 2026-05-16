'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Topic, Locale } from '@/lib/curriculum/types'
import SheetMusic from '@/components/music/SheetMusic'
import Metronome from '@/components/music/Metronome'
import ChordDiagram from '@/components/music/ChordDiagram'
import Checklist from '@/components/topic/Checklist'

interface Props {
  topic: Topic
  locale: Locale
}

type SectionId = 'theory' | 'practice' | 'checkpoints'

export default function TopicTabs({ topic, locale }: Props) {
  const t = useTranslations('topic')
  const [activeSection, setActiveSection] = useState<SectionId>('theory')

  const theoryRef = useRef<HTMLElement>(null)
  const practiceRef = useRef<HTMLElement>(null)
  const checkpointsRef = useRef<HTMLElement>(null)

  const sections: { id: SectionId; label: string; ref: React.RefObject<HTMLElement | null> }[] = [
    { id: 'theory', label: t('theory'), ref: theoryRef },
    { id: 'practice', label: t('practice'), ref: practiceRef },
    { id: 'checkpoints', label: t('checkpoints'), ref: checkpointsRef },
  ]

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id, ref }) => {
      if (!ref.current) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      observer.observe(ref.current)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      {/* Sticky section nav */}
      <nav className="sticky top-14 z-30 bg-white border-b border-gray-200 -mx-4 px-4 mb-8">
        <div className="flex gap-8 py-3">
          {sections.map(({ id, label, ref }) => (
            <button
              key={id}
              onClick={() => scrollTo(ref)}
              className={`text-sm transition-colors ${
                activeSection === id
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="space-y-16">
        {/* Theory Section */}
        <section id="theory" ref={theoryRef as React.RefObject<HTMLElement>} className="scroll-mt-28">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('theory')}</h2>
          <div className="space-y-6">
            <div
              className="prose prose-sm max-w-none
                prose-headings:text-gray-900 prose-h2:text-xl prose-h2:font-bold prose-h3:text-base prose-h3:font-semibold prose-h3:text-gray-800
                prose-p:text-gray-600 prose-li:text-gray-600
                prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
                prose-strong:text-gray-800
                prose-table:text-gray-600 prose-th:text-gray-700 prose-th:border-gray-200 prose-td:border-gray-200
                whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(topic.theory.content[locale]) }}
            />

            {topic.theory.abcNotation && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                  악보 예시
                </h3>
                <SheetMusic notation={topic.theory.abcNotation} />
              </div>
            )}

            {topic.theory.chords && topic.theory.chords.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                  코드 다이어그램
                </h3>
                <div className="flex flex-wrap gap-4">
                  {topic.theory.chords.map((chord) => (
                    <ChordDiagram key={chord} chordName={chord} />
                  ))}
                </div>
              </div>
            )}

            {topic.tools.includes('metronome') && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
                  {t('metronome')}
                </h3>
                <div className="max-w-xs">
                  <Metronome compact />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Practice Section */}
        <section id="practice" ref={practiceRef as React.RefObject<HTMLElement>} className="scroll-mt-28">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('practice')}</h2>
          <div className="space-y-6">
            {topic.practice.exercises.map((exercise, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">
                      {t('exercise')} {idx + 1}
                    </div>
                    <h3 className="text-gray-900 font-semibold">{exercise.title[locale]}</h3>
                    <p className="text-gray-500 text-sm mt-1">{exercise.description[locale]}</p>
                  </div>
                  {exercise.bpm && (
                    <div className="text-xs px-2.5 py-1 rounded-full shrink-0 border border-gray-200 text-gray-500">
                      {exercise.bpm} BPM
                    </div>
                  )}
                </div>

                {exercise.abcNotation && (
                  <SheetMusic notation={exercise.abcNotation} bpm={exercise.bpm} />
                )}

                {exercise.bpm && !exercise.abcNotation && (
                  <Metronome initialBpm={exercise.bpm} compact />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Checkpoints Section */}
        <section id="checkpoints" ref={checkpointsRef as React.RefObject<HTMLElement>} className="scroll-mt-28">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('checkpoints')}</h2>
          <Checklist topic={topic} />
        </section>
      </div>
    </div>
  )
}

// Simple markdown-to-HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Code blocks
    .replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Tables (basic)
    .replace(/^\|(.+)\|$/gm, (match) => {
      if (match.includes('---')) return ''
      const cells = match.split('|').filter(c => c.trim())
      const isHeader = markdown.indexOf(match) < markdown.indexOf('---')
      const tag = isHeader ? 'th' : 'td'
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>'
    })
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Paragraphs
    .split('\n\n')
    .map(block => {
      if (block.startsWith('<') || block.trim() === '') return block
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`
    })
    .join('\n')
}
