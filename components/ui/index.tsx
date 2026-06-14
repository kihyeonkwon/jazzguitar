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
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:   'bg-ink text-ink-inv hover:bg-terracotta',
    secondary: 'bg-paper-bright text-ink border border-rule hover:border-sage hover:bg-surface-soft',
    ghost:     'bg-transparent text-ink-soft hover:text-ink hover:bg-surface',
  }[variant]

  const sizes = {
    sm: 'h-8  px-3   text-xs',
    md: 'h-10 px-4   text-sm',
    lg: 'h-12 px-6   text-sm',
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
      <h2 className="display text-3xl md:text-4xl text-ink leading-tight">
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
      <span className={`${sizes} font-mono font-medium tabular text-ink leading-none`}>
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
    default: 'bg-surface text-ink-soft',
    outline: 'bg-transparent text-ink-soft border border-rule',
    solid:   'bg-ink text-ink-inv',
  }[variant]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${styles} ${className}`}>
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
    <div className="flex items-start gap-3 rounded-3xl border border-rule bg-surface-soft px-5 py-4">
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
