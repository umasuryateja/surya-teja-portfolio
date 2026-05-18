interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
}

/**
 * Standardized section header — label tag above, large title, optional subtitle.
 * Used consistently across all 8 sections.
 */
export default function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="text-center">
      {/* Label tag */}
      <p className="inline-block px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono font-semibold tracking-widest uppercase mb-4">
        {label}
      </p>

      {/* Main title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 max-w-xl mx-auto text-text-muted text-base leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Decorative underline */}
      <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
    </header>
  )
}
