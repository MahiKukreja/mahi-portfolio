type IconProps = { size?: number; className?: string }

/** ↗ diagonal arrow */
export function ArrowNE({ size = 14, className = '' }: IconProps) {
  return (
    <svg className={`arrow arrow-ne ${className}`} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** → right arrow */
export function ArrowRight({ size = 14, className = '' }: IconProps) {
  return (
    <svg className={`arrow arrow-e ${className}`} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** Thin radial line-art, as on the sample board. */
export function Sunburst({ className = '', ...rest }: { className?: string; 'data-reveal'?: string }) {
  const rays = 36
  const lines = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2
    const inner = 7
    const outer = i % 2 === 0 ? 46 : 36
    return (
      <line
        key={i}
        x1={50 + Math.cos(a) * inner}
        y1={50 + Math.sin(a) * inner}
        x2={50 + Math.cos(a) * outer}
        y2={50 + Math.sin(a) * outer}
      />
    )
  })
  return (
    <svg className={className} {...rest} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      {lines}
      <circle cx="50" cy="50" r="2.2" fill="var(--gold)" stroke="none" />
    </svg>
  )
}
