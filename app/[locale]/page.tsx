import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { Link } from '@/lib/i18n/navigation'
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
  asLocale,
  buildPageMetadata,
  jsonLd,
} from '@/lib/seo'
import {
  IconArrowRight,
  IconBlues,
  IconCheck,
  IconHarmony,
  IconMetronome,
  IconRoot,
  IconStandards,
} from '@/components/icons'

const TRUST_ROW = ['Lesson Notes', 'Tree', 'Train', 'Voicing', 'Standards', 'Ear']

const LANDING_IMAGES = {
  tree: '/assets/landing/tree-workspace.png',
  practice: '/assets/landing/practice-flow.png',
  train: '/assets/landing/train-tools.png',
}

const PLANNER_ROWS = [
  ['오늘 시간', '60분'],
  ['현재 주제', 'Drop 2/3 코드 보이싱'],
  ['확인 도구', '스케일 구성음 · 지판 음 · 코드 진행'],
]

const OUTCOMES = [
  ['10분', '워밍업', '지판 음과 스케일 구성음을 짧게 확인합니다.'],
  ['40분', '주제 연습', '오늘의 주제를 단계별 체크포인트로 진행합니다.'],
  ['10분', '곡 적용', '연습한 내용을 실제 진행 위에서 점검합니다.'],
]

const STATS = [
  ['1 주제', '한 세션에서 다룰 핵심을 하나로 제한합니다.'],
  ['5분', '기본기는 짧은 라운드로 자주 확인합니다.'],
  ['1 곡', '마지막 기준은 설명이 아니라 곡 위의 적용입니다.'],
]

const TOPIC_TABS = ['이론', '실습', '체크리스트', 'Train', '곡 적용']

const TOOL_GRID = [
  {
    title: 'Tree',
    body: '흩어진 레슨 자료를 주제와 단계로 정리합니다.',
    icon: <IconHarmony size={18} />,
  },
  {
    title: 'Train',
    body: '지판, 스케일, 코드 구성음을 짧은 라운드로 확인합니다.',
    icon: <IconBlues size={18} />,
  },
  {
    title: '코드 진행 악보',
    body: '연습한 보이싱을 실제 진행 위에서 바로 들어봅니다.',
    icon: <IconStandards size={18} />,
  },
  {
    title: '오늘의 주제',
    body: '이론, 실습, 체크리스트를 한 화면에서 따라갑니다.',
    icon: <IconRoot size={18} />,
  },
]

const BENEFITS = [
  ['레슨 후 정리', '선생님에게 받은 자료를 주제 단위로 정리합니다.'],
  ['기본기 확인', '반복 확인이 필요한 항목은 Train으로 분리합니다.'],
  ['단계별 진행', '체크포인트를 따라가며 다음 단계로 이동합니다.'],
  ['곡 위 적용', '마지막에는 코드 진행과 곡 위에서 확인합니다.'],
  ['과한 메뉴 제거', '지금 필요한 학습 흐름만 남깁니다.'],
  ['확장 가능한 구조', '새로운 레슨 자료를 기존 Tree에 붙일 수 있습니다.'],
]

const FAQ = [
  ['이 서비스는 누구를 위한 건가요?', '재즈 기타를 체계적으로 시작하고 싶은 학습자를 위한 개인 학습 시스템입니다.'],
  ['재즈기타 독학에도 도움이 되나요?', '레슨을 받지 않는 학습자도 주제, Train, 곡 적용 순서로 재즈기타 기본기를 정리할 수 있습니다.'],
  ['재즈기타 레슨 복습용으로 쓸 수 있나요?', '선생님에게 받은 자료를 주제별로 모으고, 다음 연습에서 바로 확인할 수 있게 구성합니다.'],
  ['Tree와 Train은 어떻게 다른가요?', 'Tree는 학습 지도를 보는 공간이고, Train은 손과 귀의 반응을 짧게 확인하는 공간입니다.'],
  ['레슨 자료가 계속 늘어나도 괜찮나요?', '주제 단위로 묶는 구조라 자료가 늘어나도 기존 흐름 안에 배치할 수 있습니다.'],
  ['연습은 어느 정도 분량을 기준으로 하나요?', '기본은 1시간 세션입니다. 워밍업 10분, 메인 40분, 곡 적용 10분으로 나눕니다.'],
]

type PageProps = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  return buildPageMetadata({
    locale,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    keywords: [
      '재즈기타 배우기',
      '재즈기타 입문',
      '재즈기타 학습',
      '재즈기타 연습 앱',
    ],
  })
}

export default function HomePage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'ko-KR',
      description: HOME_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: '재즈기타 입문부터 즉흥연주까지',
      description:
        '재즈기타 코드 보이싱, 스케일, 릭, 컴핑, 블루스 즉흥을 주제별로 배우는 한국어 재즈 기타 학습 과정입니다.',
      url: `${SITE_URL}/ko`,
      inLanguage: 'ko-KR',
      educationalLevel: 'Beginner to Intermediate',
      teaches: [
        '재즈기타 코드 보이싱',
        '재즈기타 스케일',
        '재즈 블루스 즉흥',
        '드롭2 드롭3 코드',
        '컴핑과 레퍼토리 적용',
      ],
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        sameAs: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: HOME_DESCRIPTION,
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

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Practice System</p>
          <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
            더 빠르고, 더 정확하게.
          </h2>
          <p className="mt-5 break-keep text-pretty text-base leading-8 text-ink-soft">
            매번 “오늘 뭐 하지?”에서 시작하지 않도록, 학습 시간과 현재 주제를 기준으로
            오늘의 연습 흐름을 한 화면에 정리합니다.
          </p>
        </div>

        <PracticePlanner />
      </Section>

      <Section subtle>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Learning Standard</p>
          <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
            재즈 기타 학습을 작게 나누고, 끝까지 연결합니다.
          </h2>
        </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
            {STATS.map(([value, body]) => (
            <div key={value} className="bg-paper-bright/70 p-6">
              <div className="display text-4xl text-ink">{value}</div>
              <p className="mt-4 break-keep text-sm leading-7 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Topic Workspace</p>
          <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
            레슨에서 연주까지 한 주제 안에서 진행합니다.
          </h2>
          <p className="mt-5 break-keep text-pretty text-base leading-8 text-ink-soft">
            처음 조금 설명하고 “나머지는 다 바꿔서 해보세요”로 끝나지 않게,
            이론, 실습, 체크리스트, 적용을 한 흐름으로 둡니다.
          </p>
        </div>

        <TopicWorkspace />

        <LandingImage
          src={LANDING_IMAGES.practice}
          alt="기타 연습 흐름과 체크리스트를 정리한 라인 일러스트"
          width={1672}
          height={941}
          className="mt-10"
        />
      </Section>

      <QuoteSection />

      <Section>
        <div className="max-w-2xl">
          <p className="eyebrow">Tools</p>
          <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
            한국에서 만나는 재즈 기타 학습 도구.
          </h2>
          <p className="mt-5 break-keep text-pretty text-base leading-8 text-ink-soft">
            연습 앱이 아니라, 레슨 자료와 실제 연주 사이를 연결하는 학습 운영체제를 목표로 합니다.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            {TOOL_GRID.map((tool) => (
              <div key={tool.title} className="grid min-h-40 bg-paper-bright/70 p-6">
                <div className="flex items-center gap-3 text-ink-soft">
                  <span className="grid h-9 w-9 place-items-center bg-surface-soft text-ink">
                    {tool.icon}
                  </span>
                  <span className="eyebrow">{tool.title}</span>
                </div>
                <div className="self-end">
                  <h3 className="display text-2xl text-ink">{tool.title}</h3>
                  <p className="mt-3 break-keep text-sm leading-7 text-ink-soft">{tool.body}</p>
                </div>
              </div>
            ))}
          </div>
          <LandingImage
            src={LANDING_IMAGES.train}
            alt="기타 기본기 훈련 도구를 보여주는 라인 일러스트"
            width={1536}
            height={1024}
            imageClassName="object-cover"
          />
        </div>
      </Section>

      <Section subtle>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Jazz Guitar OS</p>
            <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
              완전한 스타터 시스템
            </h2>
            <p className="mt-5 break-keep text-pretty text-base leading-8 text-ink-soft">
              주제 지도와 연습 도구를 분리하지 않고, 같은 디자인 언어 안에서 이어지게 만듭니다.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <ProductPanel title="Tree Map" />
            <ProductPanel title="Train Session" train />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <p className="eyebrow">Benefits</p>
          <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
            자격 요건과 혜택
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(([title, body]) => (
            <div key={title} className="bg-paper-bright/70 p-6">
              <IconCheck size={18} className="text-sage" />
              <h3 className="mt-8 text-base font-bold text-ink">{title}</h3>
              <p className="mt-3 break-keep text-sm leading-7 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section subtle>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-4 break-keep text-balance text-3xl leading-[1.18] sm:text-5xl">
              자주 묻는 질문
            </h2>
          </div>
          <div className="px-0 py-2">
            {FAQ.map(([question, answer]) => (
              <details key={question} className="group border-b border-rule/80 py-5 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-sm font-bold text-ink">
                  <span className="break-keep">{question}</span>
                  <span className="text-ink-faint transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 break-keep text-sm leading-7 text-ink-soft">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-ink text-ink-inv">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-6 sm:py-20">
          <p className="eyebrow text-clay">Jazz Guitar Tree</p>
          <h2 className="display mx-auto mt-4 max-w-3xl break-keep text-balance text-3xl leading-[1.16] sm:text-5xl">
            오늘 할 일을 줄이고, 다음 단계는 선명하게.
          </h2>
          <div className="mt-8 flex justify-center gap-3">
            <LandingButton href="/curriculum" tone="light">
              Tree 보기
            </LandingButton>
            <LandingButton href="/train" tone="ghost-dark">
              Train 시작
            </LandingButton>
          </div>
        </div>
      </section>
    </div>
  )
}

function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24">
        <p className="eyebrow">Jazz Guitar Tree</p>
        <h1 className="display mx-auto mt-5 max-w-4xl break-keep text-balance text-4xl leading-[1.16] text-ink sm:text-6xl">
          재즈 기타 학습을
          <br className="hidden sm:block" />
          하나의 워크스페이스에서
        </h1>
        <p className="mx-auto mt-6 max-w-2xl break-keep text-pretty text-base leading-8 text-ink-soft sm:text-lg">
          재즈기타 독학과 레슨 복습에 필요한 노트, 주제 지도, 반복 훈련, 곡 적용을
          한 흐름으로 정리합니다. 초보자가 시킨 대로 따라가도 재즈 즉흥의 기본기를
          쌓을 수 있게 만듭니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LandingButton href="/curriculum" tone="dark">
            Tree 보기
          </LandingButton>
          <LandingButton href="/train">
            Train 시작
          </LandingButton>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4 py-5 text-sm font-bold text-ink-faint">
          {TRUST_ROW.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <LandingImage
          src={LANDING_IMAGES.tree}
          alt="재즈 기타 학습 주제가 나무처럼 확장되는 라인 일러스트"
          width={1672}
          height={941}
          priority
          className="mt-10"
        />
      </div>
    </section>
  )
}

function Section({ children, subtle = false }: { children: ReactNode; subtle?: boolean }) {
  return (
    <section className={subtle ? 'bg-paper-bright/45' : 'bg-paper'}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
        {children}
      </div>
    </section>
  )
}

function LandingButton({
  href,
  tone = 'plain',
  children,
}: {
  href: string
  tone?: 'plain' | 'dark' | 'light' | 'ghost-dark'
  children: ReactNode
}) {
  const styles = {
    plain: 'border border-rule bg-paper-bright text-ink hover:border-sage hover:bg-surface-soft',
    dark: 'bg-ink text-ink-inv hover:bg-terracotta',
    light: 'bg-paper-bright text-ink hover:bg-surface',
    'ghost-dark': 'border border-clay text-ink-inv hover:bg-paper-bright/10',
  }

  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${styles[tone]}`}
    >
      {children}
      <IconArrowRight size={14} />
    </Link>
  )
}

function PracticePlanner() {
  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="grid gap-3 md:grid-cols-3">
        {PLANNER_ROWS.map(([label, value]) => (
          <div key={label} className="bg-paper-bright/65 p-5">
            <div className="section-no">{label}</div>
            <div className="mt-3 break-keep text-sm font-bold text-ink">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {OUTCOMES.map(([time, title, body]) => (
          <div key={title} className="bg-surface-soft/60 p-6">
            <div className="display text-3xl text-ink">{time}</div>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-3 break-keep text-sm leading-7 text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TopicWorkspace() {
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <div className="grid gap-2 sm:grid-cols-5">
        {TOPIC_TABS.map((tab) => (
          <div key={tab} className="bg-surface-soft/75 px-4 py-4 text-center text-xs font-bold text-ink-soft">
            {tab}
          </div>
        ))}
      </div>

      <div className="grid gap-10 px-2 py-8 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-ink-inv">
            <IconMetronome size={18} />
          </div>
          <h3 className="display mt-8 break-keep text-3xl leading-tight text-ink sm:text-4xl">
            Drop 2/3 코드 보이싱
          </h3>
          <p className="mt-5 break-keep text-sm leading-7 text-ink-soft">
            드롭2 3세트, 드롭3 2세트를 M7, D7, m7, m7b5, dim7에 대해 익히고,
            같은 스트링셋 안에서 짧은 진행에 적용합니다.
          </p>
        </div>

        <div className="grid gap-3">
          {[
            ['T', '지판을 형태로 인식합니다.'],
            ['P', '각 세트의 네 인버전을 확인합니다.'],
            ['C', '코드 진행 위에서 가까운 다음 모양으로 이동합니다.'],
          ].map(([tag, text]) => (
            <div key={tag} className="grid grid-cols-[2.5rem_1fr] bg-paper-bright/65 px-4 py-4">
              <span className="section-no">{tag}</span>
              <span className="break-keep text-sm leading-7 text-ink-soft">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LandingImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imageClassName = '',
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  imageClassName?: string
}) {
  return (
    <figure className={`mx-auto overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 960px, calc(100vw - 40px)"
        className={`h-auto w-full mix-blend-multiply ${imageClassName}`}
      />
    </figure>
  )
}

function QuoteSection() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 sm:py-20">
        <p className="display break-keep text-balance text-2xl leading-[1.45] text-ink sm:text-3xl">
          “자료는 많아질 수 있습니다. 중요한 것은 매번 새로 시작하지 않도록,
          오늘의 연습이 다음 단계와 연결되어 있는지 보는 것입니다.”
        </p>
        <div className="mt-7 text-sm font-bold text-ink-soft">Jazz Guitar Tree</div>
      </div>
    </section>
  )
}

function ProductPanel({ title, train = false }: { title: string; train?: boolean }) {
  return (
    <div className="min-h-80 bg-paper-bright/70 p-6">
      <div className="flex items-center justify-between pb-4">
        <span className="eyebrow">{title}</span>
        <span className="section-no">LIVE</span>
      </div>
      {train ? (
        <div className="mt-8">
          <div className="display text-4xl text-ink">F Dorian</div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {['F', 'G', 'Ab', 'Bb', 'C', 'D', 'E', 'Gb'].map((note, index) => (
              <div
                key={note}
                className={`grid aspect-square place-items-center rounded-full text-xs font-bold ${
                  index < 6 ? 'bg-ink text-ink-inv' : 'bg-surface-soft text-ink-soft'
                }`}
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-8 h-48">
          <div className="absolute left-1/2 top-0 h-full w-px bg-rule-strong" />
          {['Foundation', 'Blues', 'Harmony', 'Standards'].map((node, index) => (
            <div
              key={node}
              className={`absolute flex items-center gap-2 text-xs font-bold text-ink ${
                index % 2 === 0 ? 'left-2' : 'right-2'
              }`}
              style={{ top: `${index * 25 + 4}%` }}
            >
              <span className="h-2 w-2 rounded-full bg-sage" />
              {node}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
