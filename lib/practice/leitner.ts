'use client'

import { LeitnerBox, PracticeRecord, Rating } from '@/lib/curriculum/types'

const STORAGE_KEY = 'jazz-guitar-practice-records'
export const PRACTICE_RECORDS_EVENT = 'jazz-guitar-practice-records-change'

function emitPracticeRecordsChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(PRACTICE_RECORDS_EVENT))
}

// 박스별 다음 복습 간격 (일 단위)
const BOX_INTERVAL_DAYS: Record<LeitnerBox, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
}

// 평가 → 박스 이동 (단순 규칙)
//   4-5: 박스 +1
//   3:   유지
//   1-2: 박스 1로 리셋
function nextBox(prev: LeitnerBox, rating: Rating): LeitnerBox {
  if (rating >= 4) return Math.min(5, prev + 1) as LeitnerBox
  if (rating === 3) return prev
  return 1
}

function loadRecords(): Record<string, PracticeRecord> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveRecords(records: Record<string, PracticeRecord>): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  emitPracticeRecordsChange()
}

function recordKey(leafSlug: string, protocolId: string): string {
  return `${leafSlug}__${protocolId}`
}

export function getRecord(leafSlug: string, protocolId: string): PracticeRecord | null {
  return loadRecords()[recordKey(leafSlug, protocolId)] ?? null
}

export function getAllRecords(): PracticeRecord[] {
  return Object.values(loadRecords())
}

export function logPractice(
  leafSlug: string,
  protocolId: string,
  rating: Rating,
): PracticeRecord {
  const records = loadRecords()
  const prev = records[recordKey(leafSlug, protocolId)]
  const prevBox: LeitnerBox = prev?.box ?? 1
  const newBox = nextBox(prevBox, rating)
  const intervalDays = BOX_INTERVAL_DAYS[newBox]
  const now = new Date()
  const nextReview = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000)

  const record: PracticeRecord = {
    leafSlug,
    protocolId,
    rating,
    box: newBox,
    ratedAt:       now.toISOString(),
    nextReviewAt:  nextReview.toISOString(),
  }
  records[recordKey(leafSlug, protocolId)] = record
  saveRecords(records)
  return record
}

// 오늘(또는 그 이전) 복습 예정인 기록들
export function getDueRecords(now: Date = new Date()): PracticeRecord[] {
  return getAllRecords().filter(r => new Date(r.nextReviewAt) <= now)
}

// 처음 시도하는(기록 없는) 잎 후보 가져오기는 호출 측에서 처리
