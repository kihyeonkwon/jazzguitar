'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import FretboardDiagram from '@/components/music/FretboardDiagram'

const SheetMusic = dynamic(() => import('@/components/music/SheetMusic'), { ssr: false })
const ChordDiagram = dynamic(() => import('@/components/music/ChordDiagram'), { ssr: false })

/**
 * 경량 markdown 렌더러 — 헤딩(##, ###), 리스트(-), 볼드(**), 인라인 코드(`),
 * 그리고 fenced 블록 3종 지원:
 *   ```abc        → 오선지 (abcjs)
 *   ```fretboard  → 지판 다이어그램 (FretboardDiagram)
 *   ```chord      → 코드 다이어그램 (ChordDiagram)
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

// ─── Fenced block 파서 ────────────────────────────────────────────────

interface FretboardParams {
  title?: string
  root: string
  notes: string[]
  frets: [number, number]
  showDegrees?: boolean
}

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

function parseFretboardBody(body: string): FretboardParams {
  const kv = parseKeyValue(body)
  const fretsStr = kv.frets || '0-12'
  const [fromStr, toStr] = fretsStr.split(/[-–~]/).map(s => s.trim())
  const from = parseInt(fromStr, 10)
  const to = parseInt(toStr ?? fromStr, 10)
  return {
    title: kv.title,
    root: kv.root || 'C',
    notes: (kv.notes || '').split(',').map(s => s.trim()).filter(Boolean),
    frets: [
      Number.isFinite(from) ? from : 0,
      Number.isFinite(to) ? to : 12,
    ],
    showDegrees: kv['show-degrees'] === 'false' ? false : true,
  }
}

function parseChordBody(body: string): { chord: string; caption?: string } {
  const kv = parseKeyValue(body)
  if (kv.chord || kv.name) {
    return { chord: kv.chord || kv.name, caption: kv.caption }
  }
  // 키 없으면 첫 줄을 코드명으로
  const first = body.trim().split('\n')[0]
  return { chord: first.trim() }
}

// ─── Block 파서 ───────────────────────────────────────────────────────

type Block =
  | { kind: 'text';      lines: string[] }
  | { kind: 'abc';       body: string }
  | { kind: 'fretboard'; params: FretboardParams }
  | { kind: 'chord';     params: { chord: string; caption?: string } }

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
    const fence = line.match(/^```(\w+)?\s*$/)
    if (fence) {
      flushText()
      const kind = (fence[1] ?? '').toLowerCase()
      // 닫는 ``` 까지 수집
      const bodyLines: string[] = []
      i++
      while (i < lines.length && !lines[i].match(/^```\s*$/)) {
        bodyLines.push(lines[i])
        i++
      }
      i++ // skip closing fence
      const body = bodyLines.join('\n')
      if (kind === 'abc') {
        blocks.push({ kind: 'abc', body })
      } else if (kind === 'fretboard') {
        blocks.push({ kind: 'fretboard', params: parseFretboardBody(body) })
      } else if (kind === 'chord' || kind === 'chord-diagram') {
        blocks.push({ kind: 'chord', params: parseChordBody(body) })
      } else {
        // 알 수 없는 fence → 일반 코드 블록으로
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
        <div key={i} className="my-6 border border-rule">
          <SheetMusic notation={b.body} minimal />
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
    return null
  })
}
