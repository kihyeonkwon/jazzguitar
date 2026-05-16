'use client'

import { useMemo, useSyncExternalStore } from 'react'
import {
  getAllRecords,
  getDueRecords,
  PRACTICE_RECORDS_EVENT,
} from './leitner'
import { PracticeRecord } from '@/lib/curriculum/types'

const EMPTY_RECORDS: PracticeRecord[] = []

function subscribePracticeRecords(onChange: () => void) {
  window.addEventListener(PRACTICE_RECORDS_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(PRACTICE_RECORDS_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

function makeStableRecordSnapshot(read: () => PracticeRecord[]) {
  let lastKey = ''
  let lastValue = EMPTY_RECORDS
  return () => {
    const nextValue = read()
    const nextKey = JSON.stringify(nextValue)
    if (nextKey !== lastKey) {
      lastKey = nextKey
      lastValue = nextValue
    }
    return lastValue
  }
}

export function useAllPracticeRecords(): PracticeRecord[] {
  const getSnapshot = useMemo(
    () => makeStableRecordSnapshot(getAllRecords),
    []
  )
  return useSyncExternalStore(
    subscribePracticeRecords,
    getSnapshot,
    () => EMPTY_RECORDS
  )
}

export function useDuePracticeRecords(): PracticeRecord[] {
  const getSnapshot = useMemo(
    () => makeStableRecordSnapshot(() => getDueRecords()),
    []
  )
  return useSyncExternalStore(
    subscribePracticeRecords,
    getSnapshot,
    () => EMPTY_RECORDS
  )
}
