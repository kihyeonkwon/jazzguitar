# 아침 리뷰 — Mission Runner 추가

기현님, 친구 피드백 반영해서 **Mission Runner**를 만들었습니다.

---

## 🎯 친구 피드백 → 실제 변경

| 친구 진단 | 처방 | 구현 상태 |
|---------|------|---------|
| Daily가 처방이 아니라 옵션이다 | 단일 미션 중심 5-step Runner | ✅ |
| 드릴 ↔ 잼 단절 | 잎의 `quickDrill`로 컨텍스트 일치 | ✅ (구조), 데이터는 1개만 |
| 릭 부족 (외울 단위 X) | `LickSnippet[]` 타입 + 잎별 1-3개 | ✅ (구조), 데이터는 F블루스만 |
| 녹음 평가 단순화 | Universal 4 체크 컴포넌트 | ✅ |
| 완료 기준 = 행동 | RecordCheck → Bronze 자동 가산 | ✅ |
| 선택 피로 | 홈 = MissionRunner 자동 추천 | ✅ |
| Archive 격하 | nav에서 빠짐, 푸터 링크만 | ✅ |

---

## 🛤️ 새 Daily 흐름

```
01 MISSION OVERVIEW
  ↓
02 WARMUP   — 5분 드릴 (잎과 컨텍스트 일치)
  ↓
03 LICK     — 2-4 마디 짧은 어휘 (외움 토글)
  ↓
04 APPLY    — 백킹 + 녹음
  ↓
05 RECORD   — Universal 4 체크 → Bronze 자동 가산
```

각 단계 sticky 하단에 BACK / NEXT. 잎에 lick·jam·drill 데이터가 없으면 fallback 화면 노출.

---

## ✅ 검증 완료

`http://localhost:3001/ko` 에서 5단계 시퀀스 모두 클릭 테스트 완료:
- Step 1 Mission Overview: 미션 문구 + 시간 배분 (Warmup 5 / Lick 10 / Apply 20 / Check 5)
- Step 2 Warmup: 잎의 quickDrill 표시 + 드릴 진입 버튼
- Step 3 Lick: LickCard (악보 + memorized 토글) — 없으면 빈 화면 노출
- Step 4 Apply: BackingTrackPlayer + Recorder — 없으면 빈 화면
- Step 5 Record: Universal 4 체크 + Bronze 자동 가산

데일리 picker가 트렁크 학습 순서(Foundation → Blues → …) 우선으로 수정됨 (이전엔 알파벳순이라 Artists가 먼저 잡힘).

---

## 🔍 확인하셔야 할 부분 (기본값 적용됨)

### 1. F 블루스 잎에만 LickSnippet 3개 있음
샘플로 `lf-bl-1`에만 채워뒀습니다 — 다른 39개 잎에도 채워야 합니다.

**현재 채워진 릭 3개** (모두 짧은 교본 스타일 일반 패턴):
- `lk-bl-1-pentatonic-down` — 하행 + 상행 페어
- `lk-bl-1-blue-note` — ♭5 블루 노트 강조
- `lk-bl-1-turnaround` — I7 → V7 해결

**의견 주실 부분**: 다른 잎의 릭 데이터 작성 톤
- 모두 **교본 스타일 일반 패턴**으로 갈지 (가장 안전)
- 또는 **유명 아티스트 어법을 흉내낸 자작 라인** ("Burrell-style", "Wes-inspired" 표기)으로 갈지

저작권 안전을 위해 직접 전사(transcribe)는 피하는 게 좋습니다. 교본·교육 자료에서 흔히 보는 일반 패턴 또는 "스타일 영감받은 자작"이 적절합니다.

### 2. quickDrill 데이터도 1개 잎만
F 블루스 잎에만 `quickDrill: { kind: 'scale-notes', params: { scale: 'minor pentatonic', root: 'F' } }` 있음. 나머지는 폴백으로 일반 드릴로 진입.

### 3. Mission Runner 시간 배분 카드 (`05/10/20/05`)
지금은 고정. 잎 진도에 따라 동적 조정할지 결정 필요.

### 4. 외울 릭은 어떻게 외웠는지 검증?
현재는 "MEMORIZED 토글"만 있어 자가 신고. 실제 외웠는지는 잼/녹음에서 사용했는지로 검증.
→ Record Check #3 "오늘의 릭을 1번 이상 자연스럽게 끼워 넣었다"가 그 검증.

---

## 📁 새 파일

```
components/mission/
  ├── MissionRunner.tsx       # 5-step 메인 오케스트레이터
  ├── LickCard.tsx            # 릭 표시 + 외움 토글
  └── RecordCheck.tsx         # Universal 4 체크 (Bronze 자동 가산)

lib/curriculum/types.ts        # LickSnippet, QuickDrill, RecordCheckKey 추가
lib/progress/store.ts          # 릭 마스터리 + 세션 로그 함수
```

수정된 파일:
- `app/[locale]/page.tsx` — 홈 = MissionRunner
- `lib/practice/daily.ts` — 트렁크 학습 순서 우선 (Foundation → Blues …)
- `lib/curriculum/organic.ts` — F 블루스 잎에 mission/licks/quickDrill 샘플 추가

---

## 🚧 다음 작업 (우선순위)

| 우선 | 작업 |
|------|------|
| 1 | 나머지 39개 잎에 `mission` 문구 추가 (단일 행위) |
| 2 | 잎별 LickSnippet 1-3개 작성 (모두 교본 스타일 일반 패턴) |
| 3 | 잎별 quickDrill 명세 추가 |
| 4 | Mission 시간 배분 동적 조정 (잎 진도 기반) |
| 5 | "외운 릭 모음" 페이지 (`/licks` 재활용) |
| 6 | Archive (`/principles`, `/tip`) 정리 또는 사전 검색 페이지로 |

---

## 🌐 깨어나서 확인

`http://localhost:3001/ko` → Mission Runner 시작 (Foundation 12음 잎이 첫 미션으로 잡힙니다).

`http://localhost:3001/ko/leaf/blues-1-chorus-pentatonic` → 릭 3개 + quickDrill 가진 첫 완성 잎. Mission Runner 단계 모두 콘텐츠 있음.

푸시 완료 — 좋은 아침 되세요.
