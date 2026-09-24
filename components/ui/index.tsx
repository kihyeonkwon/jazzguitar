import React from 'react'

// ──────────────────────────────────────────────────────────────────
// Button
// ──────────────────────────────────────────────────────────────────

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: false
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 border font-mono uppercase tracking-[0.02em] transition-colors duration-100 disabled:opacity-30 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:   'border-ink bg-ink text-ink-inv hover:bg-pink hover:text-ink',
    secondary: 'border-ink bg-transparent text-ink hover:bg-ink hover:text-ink-inv',
    ghost:     'border-transparent bg-transparent text-ink-soft hover:border-ink hover:text-ink',
  }[variant]

  const sizes = {
    sm: 'h-8  px-3   text-[11px]',
    md: 'h-10 px-4   text-xs',
    lg: 'h-12 px-6   text-xs',
  }[size]

  return (
    <button className={`${base} ${variants} ${sizes} ${className}`} {...rest}>
      {children}
    </button>
  )
}

// ──────────────────────────────────────────────────────────────────
// Card
// ──────────────────────────────────────────────────────────────────

export function Card({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={`organic-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// ──────────────────────────────────────────────────────────────────
// SectionHeader  (01. EYEBROW · 제목 · 부제)
// ──────────────────────────────────────────────────────────────────

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  number?: number | string
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  return (
    <header className={`space-y-2 ${align === 'center' ? 'text-center' : ''}`}>
      {(number !== undefined || eyebrow) && (
        <div className={`flex items-baseline gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          {number !== undefined && (
            <span className="section-no">
              {String(number).padStart(2, '0')}
            </span>
          )}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </div>
      )}
      <h2 className="display text-4xl md:text-6xl text-ink leading-[0.98]">
        {title}
      </h2>
      {description && (
        <p className="text-ink-soft text-[15px] leading-relaxed max-w-prose">
          {description}
        </p>
      )}
    </header>
  )
}

// ──────────────────────────────────────────────────────────────────
// NumericDisplay  (large tabular numerals)
// ──────────────────────────────────────────────────────────────────

export function NumericDisplay({
  value,
  label,
  size = 'lg',
}: {
  value: string | number
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl',
  }[size]
  return (
    <div className="inline-flex flex-col items-start">
      <span className={`${sizes} display tabular text-ink leading-none`}>
        {value}
      </span>
      {label && (
        <span className="eyebrow mt-2">{label}</span>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────
// Pill
// ──────────────────────────────────────────────────────────────────

export function Pill({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'outline' | 'solid'
  className?: string
}) {
  const styles = {
    default: 'border border-ink bg-surface text-ink',
    outline: 'border border-ink bg-transparent text-ink',
    solid:   'border border-ink bg-ink text-ink-inv',
  }[variant]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] uppercase ${styles} ${className}`}>
      {children}
    </span>
  )
}

// ──────────────────────────────────────────────────────────────────
// Divider
// ──────────────────────────────────────────────────────────────────

export function Divider({
  label,
  className = '',
}: {
  label?: string
  className?: string
}) {
  if (!label) {
    return <hr className={`border-0 border-t border-rule ${className}`} />
  }
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="flex-1 border-t border-rule" />
      <span className="eyebrow">{label}</span>
      <span className="flex-1 border-t border-rule" />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────
// Hint  (subtle informational box)
// ──────────────────────────────────────────────────────────────────

export function Hint({
  children,
  label = 'Note',
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <div className="flex items-start gap-4 border-l-4 border-ink bg-blue px-5 py-4">
      <span className="eyebrow shrink-0 mt-0.5">{label}</span>
      <p className="text-sm text-ink-soft leading-relaxed">{children}</p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────
// Stat  (label + value pair, editorial style)
// ──────────────────────────────────────────────────────────────────

export function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="space-y-1">
      <div className="eyebrow">{label}</div>
      <div className="text-2xl font-mono font-medium tabular text-ink leading-none">
        {value}
      </div>
      {hint && <div className="text-xs text-ink-faint">{hint}</div>}
    </div>
  )
}
