import { Link } from '@/lib/i18n/navigation'

export default function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono tabular tracking-widest text-ink-faint">
        <div className="flex items-center gap-4">
          <span>JAZZ GUITAR LESSONS</span>
          <span className="text-ink-quiet">/</span>
          <span>LESSONS BY YS</span>
          <span className="text-ink-quiet">/</span>
          <span>BUILT BY 권기현</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/curriculum" className="hover:text-ink transition-colors">TREE</Link>
          <Link href="/drill" className="hover:text-ink transition-colors">DRILLS</Link>
          <span className="text-ink-quiet">v0.2</span>
        </div>
      </div>
    </footer>
  )
}
