import { getLocale } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  backingTracks,
  tips,
  trunks,
  getBackingTrackById,
  getTipBySlug,
} from '@/lib/curriculum/organic'
import { Locale } from '@/lib/curriculum/types'
import { SectionHeader, Divider } from '@/components/ui'
import { TrunkIconMap, IconArrowRight, IconPlay } from '@/components/icons'
import DueWidget from '@/components/practice/DueWidget'

export default async function HomePage() {
  const locale = (await getLocale()) as Locale

  const todaysJam   = getBackingTrackById('bt-f-blues-80') ?? backingTracks[0]
  const missionTip  = getTipBySlug('phrase-on-3')           ?? tips[0]
  const weeksTip    = getTipBySlug('mixolydian-on-IV')      ?? tips[1]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-20">

      {/* ── Cover ────────────────────────────────────────── */}
      <header className="space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="section-no">00</span>
          <span className="eyebrow">Daily</span>
        </div>
        <h1 className="display text-5xl md:text-6xl text-ink leading-[0.95]">
          오늘,<br />한 코러스만.
        </h1>
        <p className="text-ink-soft text-[15px] max-w-md leading-relaxed">
          이론보다 PLAY가 먼저입니다. 매일 짧게 녹음하고 들어보세요.
          하루의 작은 반복이 쌓여 솔로가 됩니다.
        </p>
      </header>

      {/* ── 01. Today's Jam ──────────────────────────────── */}
      <section>
        <div className="bg-ink text-ink-inv p-10 space-y-8">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-3 text-ink-inv/60">
              <span className="font-mono text-[11px] tracking-widest">01</span>
              <span className="eyebrow !text-ink-inv/60">Today&rsquo;s Jam</span>
            </div>
            <span className="text-[11px] font-mono tabular tracking-widest text-ink-inv/60">
              {todaysJam.bpm} BPM · {todaysJam.bars} BARS
            </span>
          </div>

          <h2 className="display text-3xl md:text-4xl text-ink-inv leading-tight">
            {todaysJam.name[locale]}
          </h2>

          {missionTip && (
            <div className="border-l border-ink-inv/30 pl-4">
              <div className="eyebrow !text-ink-inv/40 mb-1">Mission</div>
              <p className="text-ink-inv text-[15px]">
                {missionTip.title[locale]}
              </p>
            </div>
          )}

          <Link
            href={`/jam/${todaysJam.id}`}
            className="inline-flex items-center gap-2 h-11 px-5 bg-paper text-ink hover:bg-surface transition-colors text-sm font-medium"
          >
            <IconPlay size={14} />
            시작
          </Link>
        </div>
      </section>

      {/* ── 02. Due / Guided Practice (only if data exists) ─ */}
      <DueWidget />

      {/* ── 03. This Week ────────────────────────────────── */}
      {weeksTip && (
        <section className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="section-no">03</span>
            <span className="eyebrow">This Week</span>
          </div>
          <Link
            href={`/tip/${weeksTip.slug}`}
            className="group block py-4 border-y border-rule hover:bg-surface/50 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="space-y-1.5">
                <h3 className="display text-xl text-ink leading-snug">
                  {weeksTip.title[locale]}
                </h3>
                <p className="text-ink-soft text-sm leading-relaxed">
                  {weeksTip.summary[locale]}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-ink-faint group-hover:text-ink text-xs font-mono tracking-widest">
                <span className="hidden sm:inline">2 MIN READ</span>
                <IconArrowRight size={14} />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── 04. Warmup ───────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="section-no">04</span>
          <span className="eyebrow">5-Minute Warmup</span>
        </div>
        <Link
          href="/drill"
          className="group block py-4 border-y border-rule hover:bg-surface/50 transition-colors"
        >
          <div className="flex items-baseline justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="display text-xl text-ink leading-snug">
                매일 5분 드릴
              </h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                지판 음 찾기 · 코드 구구단 · 인터벌 청음. 짧고 즉각적인 워밍업.
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2 text-ink-faint group-hover:text-ink text-xs font-mono tracking-widest">
              <span className="hidden sm:inline">START</span>
              <IconArrowRight size={14} />
            </div>
          </div>
        </Link>
      </section>

      {/* ── 05. The Forest (Trunks) ──────────────────────── */}
      <section className="space-y-5">
        <SectionHeader
          number={5}
          eyebrow="The Forest"
          title="7 Branches"
          description="뿌리에서 자란 7개의 큰 가지. 각자의 속도로 오갈 수 있습니다."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule">
          {trunks.map((t, i) => {
            const Icon = TrunkIconMap[t.slug]
            return (
              <Link
                key={t.id}
                href={`/trunk/${t.slug}`}
                className="group bg-paper-bright p-6 hover:bg-surface transition-colors flex items-start gap-5"
              >
                <Icon size={28} className="text-ink shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="section-no">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-base font-semibold text-ink">
                      {t.title[locale]}
                    </h4>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    {t.description[locale]}
                  </p>
                </div>
                <IconArrowRight size={16} className="text-ink-faint group-hover:text-ink shrink-0 mt-1.5" />
              </Link>
            )
          })}
        </div>
      </section>

      <Divider />

      <footer className="flex flex-wrap items-baseline gap-6 text-xs text-ink-faint">
        <Link href="/jam"        className="hover:text-ink transition-colors">Jam 라이브러리</Link>
        <Link href="/curriculum" className="hover:text-ink transition-colors">전체 나무</Link>
        <Link href="/principles" className="hover:text-ink transition-colors">원리 사전</Link>
        <Link href="/drill"      className="hover:text-ink transition-colors">드릴</Link>
        <span className="ml-auto font-mono tabular">v0.1</span>
      </footer>
    </div>
  )
}
