// 등급 기준 상수 — 서버 컴포넌트에서도 읽을 수 있도록 'use client' 모듈(drills.ts)과 분리.

export type DrillLevel = 'beginner' | 'proficient' | 'fluent' | 'master'

// CPM(분당 정답) 임계값 — 각 등급으로 진입하는 최소값
export const DRILL_THRESHOLDS: Record<string, Record<DrillLevel, number>> = {
  'fretboard-find':     { beginner: 0, proficient: 12, fluent: 20, master: 35 },
  'interval-ear':       { beginner: 0, proficient: 4,  fluent: 8,  master: 12 },
  'chord-quality-ear':  { beginner: 0, proficient: 5,  fluent: 10, master: 15 },
  'voicing-find':       { beginner: 0, proficient: 3,  fluent: 6,  master: 10 },
  'chord-tone-id':      { beginner: 0, proficient: 8,  fluent: 15, master: 25 },
  'degree-id':          { beginner: 0, proficient: 10, fluent: 20, master: 30 },
  'chord-construction': { beginner: 0, proficient: 6,  fluent: 12, master: 20 },
  'scale-construction': { beginner: 0, proficient: 5,  fluent: 10, master: 18 },
  'drop-voicing-misty': { beginner: 0, proficient: 8,  fluent: 14, master: 22 },
}

// 화면에는 SPC(정답 하나에 걸린 초, 낮을수록 빠름)로 보여 준다. 저장·등급 계산은 CPM 그대로.
export function cpmToSpc(cpm: number): number {
  return 60 / cpm
}

// 등급 인정 정확도 게이트: 90% 이상이어야 해당 라운드 CPM이 등급 산정·달성기록에 반영
export const ACCURACY_GATE = 0.9
