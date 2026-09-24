import type { Metadata } from 'next'
import { Link } from '@/lib/i18n/navigation'
import DrillLibraryStats from '@/components/drills/DrillLibraryStats'
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
    <div>
      <header className="relative overflow-hidden border-b border-ink bg-blue">
        <div
          aria-hidden
          className="dither-coarse fade-l pointer-events-none absolute inset-y-0 right-0 w-1/2 text-ink opacity-40"
        />
        <div className="relative flex justify-between px-4 pt-5 sm:px-6">
          <p className="label">Sys / 02</p>
          <p className="label">{`Index — ${String(DRILLS.length).padStart(2, '0')} drills`}</p>
        </div>
        <div className="relative grid items-end gap-6 px-4 pb-8 pt-10 sm:px-6 md:grid-cols-12">
          <h1 className="mega md:col-span-9">Train</h1>
          <p className="break-keep border border-ink bg-blue p-3 text-[15px] leading-[1.7] md:col-span-3">
            짧게 반복하며 손과 귀의 반응을 확인하는 기본기 훈련.
          </p>
        </div>
      </header>

      <ol>
        {DRILLS.map((d) => (
          <li key={d.type} className="border-b border-ink">
            <Link
              href={`/train/${d.type}`}
              className="arrow-shift grid gap-x-6 gap-y-4 px-4 py-6 transition-colors duration-100 hover:bg-pink sm:px-6 md:grid-cols-12 md:items-start md:py-8"
            >
              <span className="section-no text-ink md:col-span-1">
                {String(d.number).padStart(2, '0')}
              </span>
              <div className="md:col-span-6">
                <span className="display block text-3xl leading-[1.02] text-ink sm:text-5xl">
                  {d.title}
                </span>
                <span className="mt-3 block max-w-xl break-keep text-[15px] leading-[1.7] text-ink-soft">
                  {d.description}
                </span>
              </div>
              <div className="md:col-span-4">
                <DrillLibraryStats drillType={d.type} />
              </div>
              <span className="label text-right md:col-span-1">
                Open <span className="arrow">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
