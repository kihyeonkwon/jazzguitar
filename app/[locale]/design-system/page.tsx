'use client'

import {
  Button,
  Card,
  SectionHeader,
  NumericDisplay,
  Pill,
  Divider,
  Hint,
  Stat,
} from '@/components/ui'
import {
  IconFoundation,
  IconBlues,
  IconHarmony,
  IconSoloing,
  IconEar,
  IconStandards,
  IconArtist,
  IconRoot,
  IconArrowRight,
  IconCheck,
  IconPlus,
  IconMinus,
  IconClose,
  IconPlay,
  IconStop,
  IconRecord,
  IconMetronome,
  IconDownload,
} from '@/components/icons'

export default function DesignSystemPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* ── Cover ────────────────────────────────────────────── */}
      <header className="space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="section-no">00</span>
          <span className="eyebrow">Design System</span>
        </div>
        <h1 className="display text-5xl md:text-6xl text-ink leading-[0.95]">
          Jazz Guitar<br />Visual Language
        </h1>
        <p className="text-ink-soft text-lg max-w-xl leading-relaxed">
          모노톤 기반 에디토리얼 시스템. ECM 레코드와 출판물의 절제된 미감을 참고합니다.
          색은 한 가지(검정)만 쓰고, 위계는 타이포그래피와 여백으로 만듭니다.
        </p>
      </header>

      <Divider />

      {/* ── 01. Typography ───────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={1}
          eyebrow="Typography"
          title="Kakao Big Sans · Kakao Small Sans"
          description="한 가지 sans 패밀리로 모든 계층을 표현합니다. 굵기와 트래킹으로 위계를 만듭니다. 숫자는 모노 + tabular 정렬로 정밀함을 확보합니다."
        />

        <Card className="p-8 space-y-6">
          <div className="space-y-1">
            <div className="eyebrow">Display · 800 / -2% tracking</div>
            <p className="display text-5xl text-ink">오늘, 한 코러스만.</p>
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Heading 2 · 700</div>
            <p className="display text-2xl text-ink">F 블루스에서 펜타토닉으로 한 코러스</p>
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Body · 400 / -0.5% tracking</div>
            <p className="text-ink-soft leading-relaxed">
              재즈 기타의 학습은 이론 암기가 아니라 연주의 누적입니다. 매일 한 코러스를 녹음하고
              들어보세요. 어제의 자신이 가장 정확한 거울입니다.
            </p>
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Caption · 400 / faint</div>
            <p className="text-xs text-ink-faint">백킹 트랙 + 마이크가 함께 녹음됩니다.</p>
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Mono · tabular</div>
            <p className="text-ink font-mono tabular text-xl">0123 4567 8901</p>
          </div>
          <div className="space-y-1">
            <div className="eyebrow">Eyebrow / overline</div>
            <p className="eyebrow">Section · Label · Marker</p>
          </div>
        </Card>
      </section>

      {/* ── 02. Color ────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={2}
          eyebrow="Color"
          title="Pure monochrome"
          description="색은 콘텐츠에서만 등장합니다. UI 자체는 검정·회색·종이색만 사용합니다."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-rule border border-rule">
          {[
            { name: 'paper',        hex: '#fafafa', fg: 'text-ink' },
            { name: 'paper-bright', hex: '#ffffff', fg: 'text-ink' },
            { name: 'surface',      hex: '#f4f4f4', fg: 'text-ink' },
            { name: 'rule',         hex: '#e5e5e5', fg: 'text-ink' },
            { name: 'ink-faint',    hex: '#a3a3a3', fg: 'text-ink-inv' },
            { name: 'ink-soft',     hex: '#525252', fg: 'text-ink-inv' },
            { name: 'ink',          hex: '#0a0a0a', fg: 'text-ink-inv' },
          ].map(c => (
            <div
              key={c.name}
              className="p-5 aspect-[3/2] flex flex-col justify-between"
              style={{ backgroundColor: c.hex }}
            >
              <div className={`text-xs font-mono ${c.fg}`}>{c.name}</div>
              <div className={`text-xs font-mono tabular opacity-60 ${c.fg}`}>{c.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03. Trunk Icons ──────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={3}
          eyebrow="Iconography"
          title="Trunk marks"
          description="7개 트렁크용 라인 아이콘. 동일한 시각 언어 (1.5 stroke, 24×24). 이모지를 대체합니다."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule border border-rule">
          {[
            { Icon: IconFoundation, label: 'Foundation', sub: '기초' },
            { Icon: IconBlues,      label: 'Blues',      sub: '블루스' },
            { Icon: IconHarmony,    label: 'Harmony',    sub: '화성·컴핑' },
            { Icon: IconSoloing,    label: 'Soloing',    sub: '솔로 어법' },
            { Icon: IconEar,        label: 'Ear',        sub: '청음' },
            { Icon: IconStandards,  label: 'Standards',  sub: '스탠다드' },
            { Icon: IconArtist,     label: 'Artist',     sub: '아티스트' },
            { Icon: IconRoot,       label: 'Root',       sub: '시작' },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="bg-paper-bright p-6 flex flex-col items-center justify-center gap-4 aspect-square">
              <Icon size={36} className="text-ink" />
              <div className="text-center">
                <div className="eyebrow">{label}</div>
                <div className="text-xs text-ink-soft mt-1">{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-ink">
          <IconArrowRight />
          <IconCheck />
          <IconPlus />
          <IconMinus />
          <IconClose />
          <IconPlay />
          <IconStop />
          <IconRecord />
          <IconMetronome />
          <IconDownload />
        </div>
      </section>

      {/* ── 04. Buttons ──────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={4}
          eyebrow="Components"
          title="Buttons"
          description="3 variants × 3 sizes. 모서리는 모두 직각. 그림자 없음."
        />

        <Card className="p-8 space-y-6">
          <div className="space-y-3">
            <div className="eyebrow">Primary</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">학습 시작</Button>
              <Button size="md">학습 시작</Button>
              <Button size="lg">학습 시작 <IconArrowRight size={16} /></Button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="eyebrow">Secondary</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm">다음 코드</Button>
              <Button variant="secondary" size="md">다음 코드</Button>
              <Button variant="secondary" size="lg">다음 코드</Button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="eyebrow">Ghost</div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" size="sm">건너뛰기</Button>
              <Button variant="ghost" size="md">건너뛰기</Button>
              <Button variant="ghost" size="lg">건너뛰기</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── 05. Numeric & Stat ───────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={5}
          eyebrow="Data display"
          title="Numerals & stats"
          description="BPM, 점수, 시간 등 숫자는 항상 monospace + tabular. 단위는 eyebrow로 분리."
        />

        <Card className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div><NumericDisplay value="80"   label="BPM"    /></div>
          <div><NumericDisplay value="12"   label="Bars"   /></div>
          <div><NumericDisplay value="3/8"  label="Chorus" /></div>
          <div><NumericDisplay value="01:42" label="Recorded" /></div>
        </Card>

        <Card className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t-0">
          <Stat label="Total leaves"    value="28"  hint="across 7 trunks" />
          <Stat label="Completed"       value="1"   hint="3.5%" />
          <Stat label="Days in a row"   value="4"   hint="best: 12" />
          <Stat label="Recordings"      value="17"  hint="this month" />
        </Card>
      </section>

      {/* ── 06. Pills ────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={6}
          eyebrow="Components"
          title="Pills & tags"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Blues</Pill>
          <Pill>Foundation</Pill>
          <Pill variant="outline">미시작</Pill>
          <Pill variant="solid">진행중</Pill>
          <Pill>F · 80 BPM · 12 bars</Pill>
        </div>
      </section>

      {/* ── 07. Hint ─────────────────────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={7}
          eyebrow="Components"
          title="Hint / sidenote"
        />
        <Hint>
          가이드 톤이란 코드의 3도와 7도를 의미합니다. 5줄만으로 코드의 성격을 표현할 수 있습니다.
        </Hint>
        <Hint label="Practice">
          이번 세션은 백킹 트랙 위에서 한 코러스만 칩니다. 코드 충돌 없이 12바를 마치는 것이 목표.
        </Hint>
      </section>

      {/* ── 08. Composition example ──────────────────────────── */}
      <section className="space-y-8">
        <SectionHeader
          number={8}
          eyebrow="In context"
          title="Example composition"
          description="위 토큰들이 실제로 조합되었을 때의 모습."
        />

        <Card className="overflow-hidden">
          <div className="p-8 space-y-6 border-b border-rule">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="section-no">01</span>
                <span className="eyebrow">Today&apos;s Jam</span>
              </div>
              <Pill variant="outline">12 bars · F</Pill>
            </div>
            <div>
              <h3 className="display text-3xl text-ink mb-2">F 블루스 BPM 80</h3>
              <p className="text-ink-soft">미션 — 프레이즈를 코드의 3도에서 끝내기</p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg"><IconPlay size={16} /> 시작</Button>
              <Button variant="ghost" size="lg">다른 트랙 보기</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-rule">
            <div className="p-6"><Stat label="BPM"     value="80" /></div>
            <div className="p-6"><Stat label="Key"     value="F" /></div>
            <div className="p-6"><Stat label="Chorus"  value="8" hint="loop" /></div>
          </div>
        </Card>
      </section>

      <Divider label="End" />

      <footer className="text-xs text-ink-faint">
        Jazz Guitar Design System · Internal reference
      </footer>
    </div>
  )
}
