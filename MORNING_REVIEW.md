# 아침 리뷰 문서 — 2026-05-17

기현님, 푹 주무셨길 바랍니다. 어제 작업한 것들을 정리해두었습니다. **확인하셔야 할 것**과 **검토 후 의견 주실 것**으로 나눴습니다.

---

## ✅ 어젯밤 완료된 작업 총정리

### A. 디자인 시스템 구축
- **타이포그래피**: Noto Sans KR (300~800) + JetBrains Mono로 교체
- **모노톤 토큰**: `paper / paper-bright / surface / rule / ink / ink-soft / ink-faint / ink-quiet`
- **8개 프리미티브**: Button, Card, SectionHeader, NumericDisplay, Pill, Divider, Hint, Stat
- **17개 커스텀 SVG 아이콘**: 7 트렁크 아이콘 + 10 유틸리티 아이콘
- **`/ko/design-system`**: 디자인 시스템 쇼케이스 페이지 (참고용)

### B. 모든 페이지 새 DS로 리팩토링
이모지 0개, 컬러 0개, 직각 모서리, 에디토리얼 톤:
- Header (네비 미니멀화)
- LanguageSwitcher (직각 + mono caps)
- Home Dashboard (에디토리얼 카피 + 섹션 번호 01~05)
- Tree of Jazz (Haeckel 스타일, 모노톤 + 커스텀 아이콘)
- Trunk page (편집물 느낌의 잎 목록 + 이전/다음 트렁크)
- Leaf page (Guided Practice CTA 추가 + Self-check)
- Jam library (트랙 목록을 에디토리얼 행 형태)
- Jam session (트랙 메타데이터 3분할 stat)
- BackingTrackPlayer (NOW PLAYING + 코드 진행)
- Recorder (오디오/영상 토글, 백킹+마이크 믹스, .webm 다운로드)
- Tip page (마이크로 레슨)
- Principles index / detail (이론 사전)
- FloatingMetronome (라인 아이콘으로 교체)
- Metronome 풀 모드 (출판물 스타일)
- ChordQuiz (플랫 표기 12음 그리드, mono 라벨)
- Practice page (드릴 안내 추가)
- Licks page

### C. Self-check 영속화
- localStorage에 잎별 체크 상태 저장
- 진행률 바, 완료 시 inverse 박스 안내
- Tree of Jazz에서 완료 잎은 검정 채움 + 진행률 카운터

### D. Practice Engine (Order A의 새 시스템)
**가장 큰 신규 작업입니다.**
- `PracticeStep / PracticeProtocol / Rating / LeitnerBox` 타입 추가
- `lib/practice/leitner.ts` — 박스 1~5 SRS 엔진 (자동 복습 일정)
- `lib/practice/protocols.ts` — 블루스 트렁크 잎 3개에 가이드 프로토콜 3종 정의
- `SessionWizard` — 4단계 wizard (listen → echo → apply → reflect)
  - 진행률 바, 단계 헤더, sticky 컨트롤
  - reflect 단계 자가평가 1~5 (4↑ 박스 진급, 3 유지, 1-2 리셋)
- `/session/[leafSlug]?p=[protocolId]` 라우트
- 잎 페이지에 "Guided Practice" CTA 카드
- **홈 대시보드 `DueWidget`** — Due/New 자동 큐레이션 (데이터 있을 때만 노출)

**검증 완료**: 4점 평가 → 박스 2 진급 → 3일 후 복습 자동 일정.

### E. 드릴 5종 (병렬 서브에이전트가 빌드)
- 지판 음 찾기 — 6줄×13프렛 SVG, 60초 타이머
- 인터벌 청음 — 12 인터벌, Tone.js sine 음, 10문제 라운드
- 코드 퀄리티 청음 — Maj7/m7/7/m7b5/dim7, PolySynth
- 보이싱 찾기 — Drop 2 보이싱, 4음 선택
- 코드톤 식별 — 1/3/5/7 식별
- `/drill` 라이브러리 + `/drill/[type]` 5개 + 점수 localStorage 영속화

### F. 빌드/타입 상태
- TypeScript `noEmit`: **에러 0**
- `next build`: **클린 통과**
- 등록 라우트: 18개

---

## 🔍 확인하셔야 할 항목 (기본값은 이미 적용)

1. **Practice Engine 프로토콜 데이터** — 현재 블루스 트렁크 잎 3개에만 프로토콜이 있습니다 (`p-blues-1-pent`, `p-blues-2-mixo`, `p-blues-3-kenny`). 나머지 잎들에는 곧 추가 필요.
   - 위치: [`lib/practice/protocols.ts`](web/lib/practice/protocols.ts)

2. **Daily Dashboard 추천 로직** — 현재 "Today's Jam"이 항상 F블루스 80, "This Week" 팁이 고정. SRS 데이터 누적 후 적응형 추천으로 발전 가능.

3. **BackingTrack 사운드 품질** — Tone.js 합성이라 클립처럼 깔끔하지만 따뜻한 톤은 아닙니다. 사용해보시고 의견 주세요.

4. **Recorder 백킹+마이크 믹스** — Web Audio API로 합쳐서 .webm 출력. 마이크 권한 + Chrome 권장. 실제로 녹음해서 다운로드 확인해주세요.

5. **드릴 5종 본격 사용 후 피드백** — 특히 보이싱 찾기는 Drop 2 정답이 다양해서 채점이 까다로울 수 있습니다.

6. **세션 wizard의 reflect 가중치** — 현재 4↑ = 박스 진급, 1-2 = 리셋. 너무 빡빡/느슨하다 싶으면 조정 가능.

---

## ❓ 검토 후 의견 주실 사항

1. **트렁크별 잎 풍부화 순서** — 블루스 6개는 fleshed. 그 다음 어느 트렁크부터 풍부화할지 (Harmony? Soloing? Standards?).

2. **백킹 트랙 확장** — 현재 5개. 추가로 만들 트랙 (Blue Bossa? All The Things You Are? ATTYA? Confirmation?).

3. **아티스트 트렁크 콘텐츠** — Kenny Burrell부터 시작했는데 그 사람의 잎 데이터는 1개. 어떤 형식으로 풍부화할지 (전사 가이드? 시그니처 릭? 곡 분석?).

4. **선생님 모드 디자인** — 코드로 데이터 추가하기로 했지만, 새 잎/팁/백킹/프로토콜 추가할 때 쓰는 인터널 페이지가 있으면 좋을지.

5. **Floating Metronome 페이지 전환 유지** — 현재 페이지 이동 시 재생 상태가 초기화됩니다. 글로벌 컨텍스트로 유지할까요?

6. **드릴 통과 기준** — 지금은 점수만 기록되고 게이트로 작동 안 함. 잎 selfCheck처럼 "이 드릴 90% 정답률 = 자동 체크" 같은 연결 만들지?

7. **Practice Engine 프로토콜 작성 가이드** — 다른 잎에 프로토콜을 만들 때 따를 템플릿을 더 정형화할지.

---

## 📂 새/수정 파일 목록 (이번 세션)

### 신규
- `app/[locale]/design-system/page.tsx`
- `app/[locale]/session/[leafSlug]/page.tsx`
- `app/[locale]/drill/page.tsx`
- `app/[locale]/drill/DrillLibraryStats.tsx`
- `app/[locale]/drill/[type]/page.tsx`
- `components/ui/index.tsx` (8 프리미티브)
- `components/icons/index.tsx` (17 아이콘)
- `components/practice/SessionWizard.tsx`
- `components/practice/DueWidget.tsx`
- `components/drills/FretboardFind.tsx`
- `components/drills/IntervalEar.tsx`
- `components/drills/ChordQualityEar.tsx`
- `components/drills/VoicingFind.tsx`
- `components/drills/ChordToneId.tsx`
- `components/drills/shared/Fretboard.tsx`
- `components/drills/shared/DrillFrame.tsx`
- `components/drills/shared/DrillSelector.tsx`
- `components/drills/shared/ScoreDisplay.tsx`
- `lib/practice/leitner.ts`
- `lib/practice/protocols.ts`
- `lib/progress/drills.ts`

### 대규모 수정
- `app/layout.tsx` (폰트 교체)
- `app/globals.css` (모노톤 토큰 + 애니메이션)
- `app/[locale]/page.tsx` (홈 — 5섹션 + DueWidget)
- `app/[locale]/curriculum/page.tsx` + `CurriculumPageClient.tsx`
- `app/[locale]/trunk/[slug]/page.tsx`
- `app/[locale]/leaf/[slug]/page.tsx`
- `app/[locale]/jam/page.tsx` + `[trackId]/page.tsx`
- `app/[locale]/tip/[slug]/page.tsx`
- `app/[locale]/principles/page.tsx` + `[slug]/page.tsx`
- `app/[locale]/practice/page.tsx`
- `app/[locale]/licks/page.tsx`
- `lib/curriculum/types.ts` (Practice Engine 타입 추가)
- `lib/progress/store.ts` (Self-check 함수 추가)
- `components/layout/Header.tsx`
- `components/layout/LanguageSwitcher.tsx`
- `components/leaf/SelfCheck.tsx`
- `components/curriculum/TreeOfLife.tsx`
- `components/jam/BackingTrackPlayer.tsx`
- `components/jam/Recorder.tsx`
- `components/music/Metronome.tsx`
- `components/music/FloatingMetronome.tsx`
- `components/music/ChordQuiz.tsx`

---

## 🗺️ 다음 마일스톤 (제안)

| 우선 | 작업 |
|------|------|
| 1 | Practice Protocol을 나머지 잎들에도 추가 (블루스 외 6 트렁크) |
| 2 | 잎 selfCheck를 Tree of Jazz와 더 강하게 시각화 (트렁크 단위 진척률) |
| 3 | 백킹 트랙 5개 → 10~15개 확장 (스탠다드 곡들) |
| 4 | 드릴 통과 → 잎 자동 체크 연동 |
| 5 | 아티스트 트렁크 콘텐츠 구체화 (Kenny Burrell부터) |
| 6 | Supabase 연결 (선택) — 멀티 디바이스, 선생님 ↔ 학생 |

천천히 검토하시고, 어떤 부분부터 의견 주시면 그대로 갑니다.

— 어젯밤 작업한 클로드 드림
