'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import FretboardDiagram from '@/components/music/FretboardDiagram'
import PentatonicShape from '@/components/music/PentatonicShape'
import Quiz from '@/components/leaf/blocks/Quiz'
import Callout from '@/components/leaf/blocks/Callout'
import TwoColumn from '@/components/leaf/blocks/TwoColumn'

const SheetMusic = dynamic(() => import('@/components/music/SheetMusic'), { ssr: false })
const ChordDiagram = dynamic(() => import('@/components/music/ChordDiagram'), { ssr: false })

/**
 * 경량 markdown 렌더러 + fenced 블록 7종:
 *   ```abc        → 오선지
 *   ```fretboard  → 지판 다이어그램 (단일 / 다중 포지션)
 *   ```chord      → 코드 다이어그램
 *   ```quiz       → 미니 퀴즈
 *   ```callout    → 강조 박스 (tip/info/warning/note)
 *   ```two-column → 좌/우 비교
 */

// ─── Inline ───────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
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

// ─── Fenced block 헬퍼 ─────────────────────────────────────────────────

function parseKeyValue(body: string): Record<string, string> {
  const map: Record<string, string> = {}
  body.split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const k = line.slice(0, idx).trim().toLowerCase()
    const v = line.slice(idx + 1).trim()
    if (k) map[k] = v
  })
  return map
}

/**
 * key:value 헤더와 본문 분리 — 첫 빈 줄 이전은 header, 이후는 body
 * 빈 줄이 없으면 전부 header.
 */
function splitHeaderBody(body: string): { header: Record<string, string>; body: string } {
  const lines = body.split('\n')
  const blankIdx = lines.findIndex(l => l.trim() === '')
  if (blankIdx === -1) {
    return { header: parseKeyValue(body), body: '' }
  }
  const headerText = lines.slice(0, blankIdx).join('\n')
  const bodyText = lines.slice(blankIdx + 1).join('\n')
  return { header: parseKeyValue(headerText), body: bodyText }
}

// ─── Fretboard params ─────────────────────────────────────────────────

interface FretboardParams {
  title?: string
  root: string
  notes: string[]
  frets: [number, number]
  positions?: Array<[number, number]>
  positionLabels?: string[]
  showDegrees?: boolean
}

function parseRange(s: string): [number, number] {
  const [a, b] = s.split(/[-–~]/).map(x => parseInt(x.trim(), 10))
  return [Number.isFinite(a) ? a : 0, Number.isFinite(b) ? b : a]
}

function parseFretboardBody(body: string): FretboardParams {
  const kv = parseKeyValue(body)
  const params: FretboardParams = {
    title: kv.title,
    root: kv.root || 'C',
    notes: (kv.notes || '').split(',').map(s => s.trim()).filter(Boolean),
    frets: parseRange(kv.frets || '0-12'),
    showDegrees: kv['show-degrees'] === 'false' ? false : true,
  }
  // 다중 포지션
  if (kv.positions) {
    params.positions = kv.positions
      .split(',')
      .map(s => parseRange(s.trim()))
  }
  if (kv['position-labels']) {
    params.positionLabels = kv['position-labels']
      .split(',')
      .map(s => s.trim())
  }
  return params
}

// ─── Chord params ─────────────────────────────────────────────────────

function parseChordBody(body: string): { chord: string; caption?: string } {
  const kv = parseKeyValue(body)
  if (kv.chord || kv.name) {
    return { chord: kv.chord || kv.name, caption: kv.caption }
  }
  const first = body.trim().split('\n')[0]
  return { chord: first.trim() }
}

// ─── Quiz params ──────────────────────────────────────────────────────

interface QuizParams {
  question: string
  choices: string[]
  correct: string
  hint?: string
}

function parseQuizBody(body: string): QuizParams {
  const kv = parseKeyValue(body)
  return {
    question: kv.question || '',
    choices: (kv.choices || '').split(',').map(s => s.trim()).filter(Boolean),
    correct: kv.correct || '',
    hint: kv.hint,
  }
}

// ─── Callout params ───────────────────────────────────────────────────

interface CalloutParams {
  type?: 'tip' | 'info' | 'warning' | 'note'
  title?: string
  body: string
}

function parseCalloutBody(body: string): CalloutParams {
  const { header, body: msg } = splitHeaderBody(body)
  const type = (header.type as CalloutParams['type']) || 'note'
  return {
    type,
    title: header.title,
    body: msg.trim() || header.body || '',
  }
}

// ─── Two-column params ────────────────────────────────────────────────
// 형식: --- left / 헤더 / 본문 / --- right / 헤더 / 본문

interface TwoColumnParams {
  left:  { header?: string; body: string }
  right: { header?: string; body: string }
}

function parseTwoColumnBody(body: string): TwoColumnParams {
  const lines = body.split('\n')
  let current: 'left' | 'right' | null = null
  const blocks: Record<'left' | 'right', string[]> = { left: [], right: [] }

  for (const line of lines) {
    const m = line.match(/^---\s*(left|right)\s*$/i)
    if (m) {
      current = m[1].toLowerCase() as 'left' | 'right'
      continue
    }
    if (current) blocks[current].push(line)
  }

  const parseSide = (lns: string[]) => {
    const text = lns.join('\n')
    const { header, body: rest } = splitHeaderBody(text)
    return { header: header.header || header.title, body: rest.trim() || text.trim() }
  }

  return {
    left:  parseSide(blocks.left),
    right: parseSide(blocks.right),
  }
}

// ─── Block 파서 ───────────────────────────────────────────────────────

type Block =
  | { kind: 'text';       lines: string[] }
  | { kind: 'abc';        body: string }
  | { kind: 'fretboard';  params: FretboardParams }
  | { kind: 'chord';      params: { chord: string; caption?: string } }
  | { kind: 'shape';      params: { type: 'A' | 'B'; title?: string } }
  | { kind: 'quiz';       params: QuizParams }
  | { kind: 'callout';    params: CalloutParams }
  | { kind: 'two-column'; params: TwoColumnParams }

function parseBlocks(md: string): Block[] {
  const blocks: Block[] = []
  const lines = md.split('\n')
  let i = 0
  let textBuffer: string[] = []
  const flushText = () => {
    if (textBuffer.length > 0) {
      blocks.push({ kind: 'text', lines: textBuffer })
      textBuffer = []
    }
  }

  while (i < lines.length) {
    const line = lines[i]
    const fence = line.match(/^```([\w-]+)?\s*$/)
    if (fence) {
      flushText()
      const kind = (fence[1] ?? '').toLowerCase()
      const bodyLines: string[] = []
      i++
      while (i < lines.length && !lines[i].match(/^```\s*$/)) {
        bodyLines.push(lines[i])
        i++
      }
      i++
      const body = bodyLines.join('\n')

      switch (kind) {
        case 'abc':
          blocks.push({ kind: 'abc', body })
          break
        case 'fretboard':
          blocks.push({ kind: 'fretboard', params: parseFretboardBody(body) })
          break
        case 'chord':
        case 'chord-diagram':
          blocks.push({ kind: 'chord', params: parseChordBody(body) })
          break
        case 'shape':
        case 'pentatonic-shape': {
          const kv = parseKeyValue(body)
          const t = (kv.type || 'A').toUpperCase() === 'B' ? 'B' : 'A'
          blocks.push({ kind: 'shape', params: { type: t, title: kv.title } })
          break
        }
        case 'quiz':
          blocks.push({ kind: 'quiz', params: parseQuizBody(body) })
          break
        case 'callout':
          blocks.push({ kind: 'callout', params: parseCalloutBody(body) })
          break
        case 'two-column':
        case 'twocol':
          blocks.push({ kind: 'two-column', params: parseTwoColumnBody(body) })
          break
        default:
          textBuffer.push('```' + (fence[1] ?? ''), ...bodyLines, '```')
      }
      continue
    }
    textBuffer.push(line)
    i++
  }
  flushText()
  return blocks
}

// ─── Text block 렌더 ──────────────────────────────────────────────────

function renderTextBlock(lines: string[], keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  let para: string[] = []
  let listItems: string[] = []

  const flushPara = (k: string) => {
    if (para.length > 0) {
      out.push(
        <p key={k} className="text-ink-soft text-[15px] leading-[1.8] my-4">
          {renderInline(para.join(' '))}
        </p>,
      )
      para = []
    }
  }
  const flushList = (k: string) => {
    if (listItems.length > 0) {
      out.push(
        <ul key={k} className="my-4 space-y-2">
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
      flushPara(`${keyBase}-p-${i}`); flushList(`${keyBase}-l-${i}`)
      out.push(
        <h2 key={`${keyBase}-h2-${i}`} className="display text-2xl text-ink mt-12 mb-3 leading-snug">
          {line.replace(/^##\s+/, '')}
        </h2>,
      )
    } else if (line.startsWith('### ')) {
      flushPara(`${keyBase}-p-${i}`); flushList(`${keyBase}-l-${i}`)
      out.push(
        <h3 key={`${keyBase}-h3-${i}`} className="text-base font-semibold text-ink mt-8 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>,
      )
    } else if (line.startsWith('- ')) {
      flushPara(`${keyBase}-p-${i}`)
      listItems.push(line.replace(/^-\s+/, ''))
    } else if (line.trim() === '') {
      flushPara(`${keyBase}-p-${i}`); flushList(`${keyBase}-l-${i}`)
    } else {
      flushList(`${keyBase}-l-${i}`)
      para.push(line)
    }
  })
  flushPara(`${keyBase}-p-final`); flushList(`${keyBase}-l-final`)
  return out
}

// ─── 메인 export ──────────────────────────────────────────────────────

export function renderMarkdown(md: string): React.ReactNode {
  const blocks = parseBlocks(md)
  return blocks.map((b, i) => {
    if (b.kind === 'text') {
      return <React.Fragment key={i}>{renderTextBlock(b.lines, `t-${i}`)}</React.Fragment>
    }
    if (b.kind === 'abc') {
      return (
        <div key={i} className="my-6">
          <SheetMusic notation={b.body} />
        </div>
      )
    }
    if (b.kind === 'fretboard') {
      return (
        <FretboardDiagram
          key={i}
          title={b.params.title}
          root={b.params.root}
          notes={b.params.notes}
          frets={b.params.frets}
          positions={b.params.positions}
          positionLabels={b.params.positionLabels}
          showDegrees={b.params.showDegrees}
        />
      )
    }
    if (b.kind === 'chord') {
      return (
        <div key={i} className="my-6 flex flex-col items-center">
          <ChordDiagram chordName={b.params.chord} />
          {b.params.caption && (
            <p className="mt-2 text-[11px] font-mono text-ink-faint tracking-widest">
              {b.params.caption}
            </p>
          )}
        </div>
      )
    }
    if (b.kind === 'shape') {
      return (
        <PentatonicShape
          key={i}
          type={b.params.type}
          title={b.params.title}
        />
      )
    }
    if (b.kind === 'quiz') {
      return (
        <Quiz
          key={i}
          question={b.params.question}
          choices={b.params.choices}
          correct={b.params.correct}
          hint={b.params.hint}
        />
      )
    }
    if (b.kind === 'callout') {
      return (
        <Callout
          key={i}
          type={b.params.type}
          title={b.params.title}
          body={b.params.body}
        />
      )
    }
    if (b.kind === 'two-column') {
      return (
        <TwoColumn
          key={i}
          left={b.params.left}
          right={b.params.right}
        />
      )
    }
    return null
  })
}
