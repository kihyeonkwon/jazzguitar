import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/lib/i18n/navigation'
import {
  LOCALE_BCP47,
  SITE_URL,
  asLocale,
  buildPageMetadata,
  jsonLd,
} from '@/lib/seo'
import { GAMES } from '@/lib/train/games'
import { ACCURACY_GATE, DRILL_THRESHOLDS, cpmToSpc } from '@/lib/progress/thresholds'

const KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const SAMPLE_CHORD = ['Bb', 'D', 'F', 'Ab']

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)
  const t = await getTranslations({ locale, namespace: 'site' })

  const meta = buildPageMetadata({
    locale,
    title: t('homeTitle'),
    description: t('homeDescription'),
    siteName: t('name'),
    imageAlt: t('ogAlt'),
  })
  // 홈은 [locale] 레이아웃과 같은 세그먼트라 레이아웃의 제목 템플릿이 적용되지 않는다 — 직접 붙인다
  return { ...meta, title: { absolute: `${t('homeTitle')} | ${t('name')}` } }
}

export default async function HomePage({ params }: PageProps) {
  const locale = asLocale((await params).locale)
  const t = await getTranslations({ locale, namespace: 'site' })
  const name = t('name')
  const description = t('homeDescription')

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name,
      url: SITE_URL,
      inLanguage: LOCALE_BCP47[locale],
      description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KRW',
      },
    },
  ]

  return (
    <div className="bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Hero />
      <Diagnosis />
      <Commute />
      <GameIndex />
      <Numerics />
      <Scoring />
      <Archive />
      <Exit />
    </div>
  )
}

/* ── 01 · Atmospheric bitmap hero ─────────────────────────────── */

function Hero() {
  const t = useTranslations('landing')
  const tSite = useTranslations('site')
  const tMenu = useTranslations('menu')

  return (
    <section className="relative overflow-hidden border-b border-ink bg-blue">
      {/* 하늘 위의 핑크 비트맵 구름 — 위쪽 양 모서리에서 피어올라 아래로 흩어진다 */}
      <Cloud className="-left-[12%] -top-[18%] h-[62%] w-[58%]" />
      <Cloud className="-right-[10%] -top-[22%] h-[78%] w-[62%]" />
      <Cloud className="right-[18%] top-[38%] h-[46%] w-[40%] opacity-70" />
      <div
        aria-hidden
        className="dither-dense fade-t pointer-events-none absolute inset-x-0 bottom-0 h-56 text-paper"
      />

      <div className="relative grid grid-cols-2 gap-y-2 px-4 pt-5 sm:px-6 md:grid-cols-12">
        <Label className="md:col-span-3">System / 001</Label>
        <Label className="text-right md:col-span-5 md:text-left">{t('metaCenter')}</Label>
        <Label className="md:col-span-2">2026 / 09</Label>
        <Label className="text-right md:col-span-2">{t('metaGames')}</Label>
      </div>

      <div className="relative px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <p
          aria-hidden
          className="mega-ko"
          style={{ fontSize: 'clamp(4.5rem, 19vw, 21rem)', lineHeight: 0.94 }}
        >
          {tSite('mega1')}
          <br />
          <span className="ml-[10vw]">{tSite('mega2')}</span>
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6 lg:mt-16">
          <div className="md:col-span-6 lg:col-span-5">
            <Label>Fig. 00 — 9 × 9</Label>
            <h1 className="display mt-4 text-[2rem] leading-[1.08] sm:text-5xl">
              {t('h1a')}
              <br />
              {t('h1b')}
            </h1>
            <p className="mt-6 max-w-md break-keep text-[17px] leading-[1.7] text-ink-soft">
              {t('heroBody')}
            </p>
          </div>

          <div className="md:col-span-6 xl:absolute xl:right-[5vw] xl:top-[7.5rem] xl:w-[25rem]">
            <div className="os-window">
              <div className="os-titlebar">
                <span className="os-ctl" aria-hidden />
                <span className="flex-1 truncate">question.014</span>
                <span className="os-ctl" aria-hidden />
              </div>
              <div className="os-body">
                <div className="flex items-baseline justify-between border-b border-ink px-3 py-3">
                  <span className="font-sans text-4xl font-semibold tracking-[-0.05em]">Bb7 = ?</span>
                  <span className="text-[11px] text-ink-faint">4 / 4</span>
                </div>
                <div
                  className="grid grid-cols-6 gap-px bg-ink"
                  role="img"
                  aria-label={t('sampleAria')}
                >
                  {KEYS.map((note) => {
                    const on = SAMPLE_CHORD.includes(note)
                    return (
                      <span
                        key={note}
                        className={`grid h-11 place-items-center text-[11px] ${
                          on
                            ? note === 'Bb'
                              ? 'bg-pink font-bold'
                              : 'bg-ink text-ink-inv'
                            : 'bg-paper-bright text-ink-quiet'
                        }`}
                      >
                        {note}
                      </span>
                    )
                  })}
                </div>
                <div className="flex flex-wrap gap-3 border-t border-ink bg-gray px-3 py-3">
                  {GAMES.map((g) => (
                    <Link key={g.type} href={`/train/${g.type}`} className="os-btn arrow-shift">
                      {tMenu(g.menuKey)} <span className="arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="os-statusbar">
                <span>Correct</span>
                <span>2.4s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-ink bg-blue py-2" aria-hidden>
        <div className="ticker-track label">
          {[0, 1].map((dup) => (
            <span key={dup} className="inline-flex">
              {[...KEYS, ...KEYS].map((item, i) => (
                <span key={`${dup}-${i}`} className="px-6">
                  {item} <span className="pl-10">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 02 · Diagnosis — the moment it goes blank ────────────────── */

function Diagnosis() {
  const t = useTranslations('landing')

  return (
    <section className="border-b border-ink bg-pink">
      <div className="grid min-h-[80svh] grid-cols-1 px-4 py-6 sm:px-6 md:grid-cols-12 md:gap-6">
        <div className="flex justify-between md:col-span-12">
          <Label>{t('painLabel')}</Label>
          <Label>Fig. 01</Label>
        </div>
        <h2
          className="display self-center break-keep py-16 md:col-span-9"
          style={{ fontSize: 'clamp(2.5rem, 7.2vw, 7.5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}
        >
          {t('painA')}
          <br />
          {t('painB')}
        </h2>
        <div className="self-end border-t border-ink pt-4 md:col-span-3">
          <p className="break-keep text-[17px] font-semibold leading-[1.6]">{t('painBody')}</p>
          <p className="label mt-6">{t('painNext')}</p>
        </div>
      </div>
    </section>
  )
}

/* ── 02b · When — the commute ─────────────────────────────────── */

function Commute() {
  const t = useTranslations('landing')

  return (
    <section className="border-b border-ink bg-paper">
      <div className="grid gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-12 md:gap-x-6 md:py-16">
        <div className="md:col-span-5">
          <Label>{t('commuteLabel')}</Label>
          <p className="mt-6 flex items-end gap-3" aria-hidden>
            <span className="mega-num">{t('commuteNum')}</span>
            <span className="display pb-[0.12em] text-5xl leading-none sm:text-7xl">{t('commuteUnit')}</span>
          </p>
        </div>
        <div className="self-end md:col-span-6 md:col-start-7">
          <h2 className="display break-keep text-3xl leading-[1.08] sm:text-5xl">{t('commuteTitle')}</h2>
          <p className="mt-6 max-w-xl break-keep text-[17px] leading-[1.7] text-ink-soft">{t('commuteBody')}</p>
          <p className="mt-8 inline-block border border-ink bg-paper-bright px-3 py-2 font-mono text-xs">
            {t('commuteExample')}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── 03 · Game index ──────────────────────────────────────────── */

function GameIndex() {
  const t = useTranslations('landing')
  const tGames = useTranslations('games')
  const tLevel = useTranslations('levels')

  return (
    <section className="border-b border-ink bg-paper">
      <div className="flex justify-between border-b border-ink px-4 py-3 sm:px-6">
        <Label>{t('indexLabel')}</Label>
        <Label>{t('indexUnit')}</Label>
      </div>
      <ol>
        {GAMES.map((g) => {
          const th = DRILL_THRESHOLDS[g.type]
          return (
            <li key={g.type} className="border-b border-ink last:border-b-0">
              <Link
                href={`/train/${g.type}`}
                className="arrow-shift grid gap-x-6 gap-y-5 px-4 py-8 transition-colors duration-100 hover:bg-pink sm:px-6 md:grid-cols-12 md:items-start md:py-12"
              >
                <span className="label md:col-span-1">{g.index}</span>
                <div className="md:col-span-6">
                  <h3 className="display text-[2.75rem] leading-[0.98] sm:text-7xl">{tGames(`${g.type}.title`)}</h3>
                  <p className="mt-4 max-w-md break-keep text-[17px] leading-[1.7] text-ink-soft">{tGames(`${g.type}.description`)}</p>
                </div>
                <div className="md:col-span-4">
                  <div className="border border-ink bg-paper-bright font-mono text-xs">
                    <div className="flex items-baseline justify-between gap-3 border-b border-ink px-3 py-2">
                      <span className="font-bold">{g.example[0]}</span>
                      <span>= {g.example[1]}</span>
                    </div>
                    <div className="grid grid-cols-3 text-center">
                      {([
                        [tLevel('proficient'), th.proficient],
                        [tLevel('fluent'), th.fluent],
                        [tLevel('master'), th.master],
                      ] as const).map(([name, cpm], i) => (
                        <div key={name} className={`px-2 py-2 ${i < 2 ? 'border-r border-ink' : ''}`}>
                          <div className="text-[10px] text-ink-faint">{name}</div>
                          <div className="font-sans text-2xl font-semibold tabular tracking-[-0.04em]">{cpmToSpc(cpm).toFixed(1)}<span className="text-sm">s</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="label mt-2 text-ink-faint">{tGames(`${g.type}.round`)}</p>
                </div>
                <span className="label text-right md:col-span-1">
                  {t('play')} <span className="arrow">→</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

/* ── 04 · Giant numeric composition (dark) ────────────────────── */

function Numerics() {
  const t = useTranslations('landing')
  const offsets = ['md:col-start-1', 'md:col-start-5', 'md:col-start-3']
  const STATS = [
    ['12', t('stat1Unit'), t('stat1Body')],
    ['9', t('stat2Unit'), t('stat2Body')],
    [String(Math.round(ACCURACY_GATE * 100)), t('stat3Unit'), t('stat3Body')],
  ]

  return (
    <section className="border-b border-ink bg-paper text-ink">
      <div className="flex justify-between px-4 pt-6 sm:px-6">
        <Label className="text-ink-faint">Parameters</Label>
        <Label className="text-ink-faint">Chapter 03</Label>
      </div>
      <div className="px-4 pb-10 pt-10 sm:px-6">
        {STATS.map(([num, unit, body], i) => (
          <div
            key={`${num}-${unit}`}
            className="grid grid-cols-1 items-end gap-x-6 border-b border-ink/30 py-6 md:grid-cols-12"
          >
            <div className={`flex items-end gap-4 md:col-span-6 ${offsets[i]}`}>
              <span className="mega-num">{num}</span>
              <span className="display pb-[0.15em] text-5xl leading-none sm:text-7xl">{unit}</span>
            </div>
            <p className="mt-4 max-w-[18rem] break-keep text-[15px] leading-[1.7] text-ink-soft md:col-span-3 md:col-start-10 md:mt-0">
              <span className="label mb-2 block text-ink-faint">{`N.0${i + 1}`}</span>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── 05 · Retro operating-system desktop — how a round is scored ─ */

function Scoring() {
  const t = useTranslations('landing')
  const tGames = useTranslations('games')
  const tLevel = useTranslations('levels')

  return (
    <section className="border-b border-ink bg-gray">
      <div className="os-menubar overflow-hidden whitespace-nowrap">
        <span className="bg-ink text-ink-inv">9×9</span>
        <span>File</span>
        <span>Round</span>
        <span>Score</span>
        <span className="ml-auto text-ink-faint">Sys/04 — Scoring</span>
      </div>

      <div className="grid gap-8 px-4 py-12 sm:px-6 md:grid-cols-12 md:gap-6 md:py-20">
        <div className="md:col-span-4">
          <Label>{t('scoringLabel')}</Label>
          <h2 className="display mt-5 break-keep text-4xl leading-[1.04] lg:text-[3.25rem]">
            {t('scoringTitle')}
          </h2>
          <p className="mt-6 max-w-sm break-keep text-[15px] leading-[1.7] text-ink-soft">
            {t('scoringBody')}
          </p>
        </div>

        <div className="os-window md:col-span-8">
          <div className="os-titlebar">
            <span className="os-ctl" aria-hidden />
            <span className="flex-1 truncate">terminal — round</span>
          </div>
          <div className="terminal text-[11px] sm:text-xs" aria-label={t('scoringLogAria')}>
            <span className="dim">gugudan@train:~$</span> play scale-construction{'\n'}
            <span className="dim">[21:40:02]</span> q01  F  Dorian         F G Ab Bb C D Eb    <span className="ok">ok</span>    4.1s{'\n'}
            <span className="dim">[21:40:07]</span> q02  Ab Major          Ab Bb C Db Eb F G   <span className="ok">ok</span>    5.0s{'\n'}
            <span className="dim">[21:40:13]</span> q03  E  Mixolydian     E F# G# A B C# D#   <span className="hl">miss</span>  → D{'\n'}
            <span className="dim">[21:40:19]</span> q04  Bb Blues Scale    Bb Db Eb E F Ab     <span className="ok">ok</span>    5.6s{'\n'}
            <span className="dim">           </span> …{'\n'}
            <span className="dim">[21:40:58]</span> round   10 questions · 56s{'\n'}
            <span className="dim">[21:40:58]</span> result  9/10 · accuracy 90% · <span className="hl">reaction 6.22s</span>{'\n'}
            <span className="dim">[21:40:58]</span> {t('levelLine')}{'\n'}
            <span className="dim">gugudan@train:~$</span> <span className="cursor" />
          </div>
        </div>

        <div className="os-window self-start md:col-span-7">
          <div className="os-titlebar">
            <span className="os-ctl" aria-hidden />
            <span className="flex-1 truncate">levels.tbl</span>
            <span className="os-ctl" aria-hidden />
          </div>
          <table className="os-body w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-ink bg-gray">
                <th className="border-r border-ink px-3 py-1.5 font-normal">{t('tableGame')}</th>
                <th className="border-r border-ink px-3 py-1.5 text-right font-normal">{tLevel('proficient')}</th>
                <th className="border-r border-ink px-3 py-1.5 text-right font-normal">{tLevel('fluent')}</th>
                <th className="px-3 py-1.5 text-right font-normal">{tLevel('master')}</th>
              </tr>
            </thead>
            <tbody>
              {GAMES.map((g) => {
                const th = DRILL_THRESHOLDS[g.type]
                return (
                  <tr key={g.type} className="border-b border-ink last:border-b-0">
                    <td className="border-r border-ink px-3 py-2 font-sans text-[13px] font-bold">{tGames(`${g.type}.title`)}</td>
                    <td className="border-r border-ink px-3 py-2 text-right tabular">{cpmToSpc(th.proficient).toFixed(1)}s</td>
                    <td className="border-r border-ink px-3 py-2 text-right tabular">{cpmToSpc(th.fluent).toFixed(1)}s</td>
                    <td className="bg-pink px-3 py-2 text-right tabular font-bold">{cpmToSpc(th.master).toFixed(1)}s</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="os-statusbar">
            <span>Unit / Reaction (s)</span>
            <span>Max. to enter</span>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9 md:mt-10">
          <div className="os-window">
            <div className="os-titlebar is-light">
              <span className="os-ctl" aria-hidden />
              <span>Notice</span>
            </div>
            <div className="os-body flex gap-4 border-t border-ink p-4">
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center border border-ink bg-pink font-sans text-lg font-semibold">!</span>
              <p className="break-keep font-sans text-[13px] leading-[1.6]">
                {t('notice', { gate: Math.round(ACCURACY_GATE * 100) })}
              </p>
            </div>
            <div className="flex justify-end border-t border-ink bg-gray p-3">
              <Link href="/train" className="os-btn">OK</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 06 · Dark archive / accordion ────────────────────────────── */

function Archive() {
  const t = useTranslations('landing')
  const FAQ = t.raw('faq') as Array<{ q: string; a: string }>

  return (
    <section className="on-dark bg-ink text-ink-inv">
      <div className="grid items-end gap-6 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-12">
        <h2 className="md:col-span-8">
          <span aria-hidden className="mega block" style={{ fontSize: 'clamp(5rem, 16vw, 18rem)' }}>FAQ</span>
          <span className="display mt-4 block text-2xl sm:text-3xl">{t('faqTitle')}</span>
        </h2>
        <Label className="text-ink-inv/60 md:col-span-4 md:text-right">{t('faqArchive', { count: FAQ.length })}</Label>
      </div>
      <div className="border-t border-ink-inv/40">
        {FAQ.map(({ q: question, a: answer }, i) => (
          <details key={question} className="group border-b border-ink-inv/40">
            <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 px-4 py-6 transition-colors duration-100 hover:bg-pink hover:text-ink sm:px-6 md:grid-cols-[6rem_1fr_auto] [&::-webkit-details-marker]:hidden">
              <span className="label">{`Q.0${i + 1}`}</span>
              <span className="break-keep text-xl font-bold leading-snug tracking-[-0.02em] sm:text-2xl">{question}</span>
              <span aria-hidden className="grid h-6 w-6 place-items-center self-center border border-current font-mono text-sm leading-none">
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <div className="grid grid-cols-[3rem_1fr] gap-x-4 px-4 pb-8 sm:px-6 md:grid-cols-[6rem_1fr]">
              <span className="label text-ink-inv/60">A.</span>
              <p className="max-w-2xl break-keep text-[17px] leading-[1.7] text-ink-inv/80">{answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

/* ── 07 · Exit — three enormous links ─────────────────────────── */

function Exit() {
  const t = useTranslations('landing')
  const tGames = useTranslations('games')

  return (
    <section className="bg-paper">
      <div className="grid gap-6 px-4 py-10 sm:px-6 md:grid-cols-12">
        <Label className="md:col-span-3">{t('exitLabel')}</Label>
        <h2 className="display break-keep text-3xl leading-[1.1] sm:text-5xl md:col-span-8">
          {t('exitTitle')}
        </h2>
      </div>
      <div className="border-t border-ink">
        {GAMES.map((g) => (
          <Link
            key={g.type}
            href={`/train/${g.type}`}
            className="arrow-shift block border-b border-ink px-4 pb-5 pt-4 transition-colors duration-100 last:border-b-0 hover:bg-pink sm:px-6"
          >
            <span className="flex justify-between">
              <span className="label">{g.index}</span>
              <span className="label">{tGames(`${g.type}.title`)}</span>
            </span>
            <span className="mega mt-6 flex items-baseline justify-between" style={{ fontSize: 'clamp(3.5rem, 12vw, 13rem)' }}>
              {g.short}
              <span className="arrow" aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function Cloud({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute text-cloud ${className}`}>
      <div className="dither-coarse mask-blob-wide absolute inset-0" />
      <div className="dither-dense mask-blob absolute inset-[14%]" />
    </div>
  )
}

function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>
}
