import type { Metadata } from 'next'
import { Link } from '@/lib/i18n/navigation'
import { SectionHeader, Card } from '@/components/ui'
import DrillLibraryStats from './DrillLibraryStats'
import { asLocale, localePath } from '@/lib/seo'

const DRILLS = [
  {
    type: 'fretboard-find',
    number: 1,
    title: '지판 음 찾기',
    description: '60초 안에 한 음의 모든 위치를 지판에서 찾는다.',
  },
  {
    type: 'interval-ear',
    number: 2,
    title: '인터벌 청음',
    description: '두 음의 간격(인터벌)을 듣고 맞춘다. 10문제 라운드.',
  },
  {
    type: 'chord-quality-ear',
    number: 3,
    title: '코드 퀄리티 청음',
    description: 'Maj7 / m7 / 7 / m7b5 / dim7 중 어느 것인지 듣고 맞춘다.',
  },
  {
    type: 'voicing-find',
    number: 4,
    title: '보이싱 찾기',
    description: '코드의 Drop 2 보이싱(4음)을 지판에서 표시한다.',
  },
  {
    type: 'chord-tone-id',
    number: 5,
    title: '코드톤 식별',
    description: '코드와 한 음이 주어진다. 그 음의 도수를 답한다.',
  },
  {
    type: 'chord-construction',
    number: 6,
    title: '코드 구구단',
    description: '코드 이름을 보고 구성음을 클릭으로 선택. Triad / 7th 두 모드.',
  },
  {
    type: 'scale-construction',
    number: 7,
    title: '스케일 구구단',
    description: '루트와 스케일 이름을 보고 구성음을 빠르게 선택한다.',
  },
  {
    type: 'drop-voicing-misty',
    number: 8,
    title: 'Drop 2 / Drop 3 · Misty',
    description: 'Misty 전체 진행을 하나의 스트링셋으로 끝까지 연결한다.',
  },
]

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = asLocale(rawLocale)

  return {
    title: 'Train',
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: localePath(locale, '/train'),
    },
  }
}

export default function DrillLibraryPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 space-y-12">
      <SectionHeader
        number={0}
        eyebrow="Train"
        title="Train"
        description="짧게 반복하며 손과 귀의 반응을 확인하는 기본기 훈련."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DRILLS.map((d) => (
          <Card key={d.type} className="p-5 sm:p-6 space-y-5 transition-transform hover:-translate-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="section-no">{String(d.number).padStart(2, '0')}</span>
              <span className="eyebrow">Train</span>
            </div>
            <div className="space-y-1">
              <h3 className="display text-2xl text-ink leading-tight">{d.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{d.description}</p>
            </div>
            <DrillLibraryStats drillType={d.type} />
            <div className="pt-2">
              <Link
                href={`/train/${d.type}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-ink-inv transition-colors hover:bg-terracotta"
              >
                시작
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
