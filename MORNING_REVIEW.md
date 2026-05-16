# 아침 리뷰 — 새 시스템 완성

기현님, 푹 주무셨길 바랍니다. 어젯밤 제안하신 **단순화된 구조**(잎 하나에 이론·실습·체크리스트 통합 + 데일리 1드릴+1잎)가 모두 완성됐습니다.

---

## ✅ 어젯밤 완료된 작업 — 4 Phase 전부

### Phase 1 — 아키텍처 단순화
**잎 한 페이지에 모든 게** (Theory · Jam Tracks · Exercises · Checkpoints)
- 더 이상 Tip/Principle/Protocol 따로 안 다님
- 잎 페이지에서 다 보고 다 체크
- 형제 잎 네비게이션 (Prev/Next)

**체크포인트가 4 레벨로** (Bronze 30 / Silver 30 / Gold 25 / Master 15)
- 0–100점 점수 시스템
- 100점이 될 때까지 잎이 SRS로 재등장 (자연스러운 반복)
- 레벨별로 항목 다름:
  - Bronze: "일단 가능" (3-4개)
  - Silver: "안정적" (3-4개)
  - Gold: "음악적" (3-4개)
  - Master: "자유로움" (2-3개)

**Daily Session = 1 드릴 + 1 잎** (4 섹션 네비: Today / Jam / Tree / Drills)
- 워밍업 드릴: 점수 가장 낮은 + 직전 회피
- 오늘의 잎: 진행 중 잎 중 점수 가장 낮은 것 (없으면 첫 미시작 잎)
- 처방전 카드: 05분 워밍업 + 40분 잎 + 10분 잼 = 60분 권장

### Phase 2 — 35개 잎 전부 풍부화
모든 기존 잎이 **새 shape**으로 완전히 채워졌습니다:
- `theory.content` — 친절한 블로그 톤 ("무엇인가 / 어떻게 쓰이는가 / 핵심 포인트" 구조), 400~700자
- `practice.exercises` — 2-3개 단계별 실습 (BPM 명시)
- `practice.backingTrackIds` — 매핑됨
- `checkpoints` — Bronze/Silver/Gold/Master 4레벨 전부 작성
- 톤: **합니다 / 입니다 / 할 수 있습니다** 경어체 유지

트렁크별 잎 수:
| 트렁크 | 잎 수 |
|--------|------|
| 기초 (Foundation) | 4 |
| 블루스 (Blues) | 6 |
| 화성·컴핑 | 8 (기존 6 + 신규 2) |
| 솔로 (Soloing) | 9 (기존 6 + 신규 3) |
| 청음 | 4 |
| 스탠다드 | 5 |
| 아티스트 | 4 |
| **합계** | **40** |

### Phase 4 — 강의 노트 흡수 (누락 개념 신규 잎)

강의 노트(lesson_old, lesson_new)에서 누락된 개념을 5개 신규 잎으로 추가:

1. **Dorian Tetrachord** — 4음 셀 분리, [A]/[B] 핑거링, 대각선/수직, 4시작 포지션
2. **Half-Whole Dim & Whole Tone Scale** — 대칭 스케일 비교
3. **Im6 vs Im7** — 어느 모드에서 가져오나 (모달 솔로 정확성)
4. **II-V-I 텐션 해결** — Easy/Advanced 보이스리딩 (b9↓5, b13↓9, #11↑9, #9 → b9↓5 등)
5. **Shell Voicings** — 1-3-7 / 1-7-3 (Walking + 멜로디 동시 연주용)

신규 백킹 트랙 1개: **Blue Bossa BPM 100** (Cm key, 16 bars, bossa style).

---

## 🔍 확인하셔야 할 항목 (기본값 적용됨)

1. **추가 신규 잎 후보** — 에이전트가 시간 관계로 5개만 추가했습니다. 나머지 후보 (다음 작업으로 미룬 것):
   - Closed voicing / Drop 3 / Upper Structure Triad
   - Walking Bass (이미 hc-5 있음)
   - 트라이어드 구구단 (이미 fd-2 있음)
   - Symmetric chord / Donna Lee 분석 / Bebop Line (이미 so-4)
   - Sub V7 / Entry chord / Jazz Minor Diatonic / 4종 스케일 체계

2. **신규 드릴 — 스케일 구구단** 추가됨 (`/drill/scale-construction`). 잘 작동하는지 확인.

3. **Tree of Jazz** 진도 0/40으로 카운트 (이전 28에서 늘어남). 35→40 잎 추가 반영.

4. **데일리 알고리즘** 시작 단계에서 어떤 잎을 잡는지 — 처음 사용자(점수 0)는 알파벳 순 첫 잎으로 시작. 더 똑똑하게 만들지 결정 필요.

5. **Daily 페이지 처방전 카드** — `05분 워밍업 + 40분 잎 + 10분 잼 = 60분` 배분. 시간 비율 조정 필요한지.

6. **레거시 라우트** — `/topic`, `/principles`, `/tip`, `/session` 모두 작동하지만 메인 흐름엔 안 보입니다. 완전 삭제할지 검색 가능한 사전으로 유지할지.

---

## 📐 새 데이터 shape 예시 (참고용)

```ts
{
  slug: 'blues-1-chorus-pentatonic',
  title: { ko: 'F 블루스에서 펜타토닉으로 1코러스 친다', ... },
  
  theory: {
    content: { ko: '## 마이너 펜타토닉은 무엇인가\n\n5음으로 구성된 가장 보편적인 솔로 도구입니다...' },
    abcNotation: 'X:1\nT:F minor pentatonic\n...',
  },
  
  practice: {
    exercises: [
      { title: '1포지션 펜타토닉 오르내림', bpm: 80, ... },
      { title: '백킹 위 1코러스 솔로', bpm: 80, ... },
      { title: '코드 변화에 음을 떨어뜨리기', bpm: 80, ... },
    ],
    backingTrackIds: ['bt-f-blues-80'],
  },
  
  checkpoints: [
    { level: 'Bronze', weight: 30, items: [...3-4 items] },
    { level: 'Silver', weight: 30, items: [...3-4 items] },
    { level: 'Gold',   weight: 25, items: [...3-4 items] },
    { level: 'Master', weight: 15, items: [...2-3 items] },
  ],
}
```

---

## 🌅 사용자 경험 흐름 (현재)

1. **홈** (`/ko`) → "오늘, 한 잎." Today's Session
2. **워밍업 드릴 5분** (점수 낮은 것 자동 선택)
3. **오늘의 잎 클릭** → 한 페이지에서
   - 이론 읽기 (블로그 톤)
   - 잼 트랙으로 가서 연주 (백킹 + 마이크 녹음)
   - 4레벨 체크포인트 자가평가
4. 점수가 100점 안 되면 → **내일 다시 등장**
5. 100점 도달 → 다음 잎 자동 추천 (점수 낮은 진행 중인 잎 또는 미시작 잎)

---

## 📂 새/수정 파일

### 신규
- `components/practice/DailySession.tsx` — 새 홈 페이지 (1 드릴 + 1 잎)
- `components/leaf/LeveledCheckpoints.tsx` — 4레벨 체크포인트 UI
- `components/leaf/markdown.tsx` — 공유 마크다운 렌더러
- `lib/practice/daily.ts` — 드릴/잎 picker 알고리즘
- `lib/practice/hooks.ts` — Daily 상태 hooks
- `lib/progress/hooks.ts` — 리액티브 진도 hooks (useLeafScoreMap, useLeafLevelCheckMap)
- `components/drills/ScaleConstruction.tsx` — 신규 7번째 드릴

### 대규모 수정
- `lib/curriculum/types.ts` — Leaf에 theory/practice/checkpoints 필드 (optional)
- `lib/curriculum/organic.ts` — 40개 잎 모두 새 shape으로 풍부화 + 신규 5개 + Blue Bossa 트랙
- `lib/progress/store.ts` — getLeafScore, getLeafLastActivity 등 새 함수
- `app/[locale]/page.tsx` — Daily Session
- `app/[locale]/leaf/[slug]/page.tsx` — 통합 레이아웃
- `app/[locale]/session/[leafSlug]/page.tsx` — leaf로 리다이렉트
- `components/layout/Header.tsx` — 4 nav items (Today / Jam / Tree / Drills)

---

## 🚧 다음 마일스톤 (제안)

| 우선 | 작업 |
|------|------|
| 1 | 위 5개 추가 신규 잎 후보 채우기 (Closed/Drop3, Upper Structure 등) |
| 2 | Tree of Jazz에서 잎 점수 시각화 강화 (0/30/60/100 단계별 채움) |
| 3 | 백킹 트랙 추가 (현재 6개 → 12개 정도, ATTYA, Confirmation 등) |
| 4 | Daily 처방전 시간 비율 동적 조정 (잎 진도에 따라) |
| 5 | 레거시 라우트 정리 또는 사전으로 유지 결정 |
| 6 | Supabase 연결 (멀티 디바이스 + 선생님-학생 연결) |

천천히 검토하시고 의견 주세요.

— 어젯밤 작업한 클로드 드림
