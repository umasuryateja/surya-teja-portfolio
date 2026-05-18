import { ReactNode, HTMLAttributes } from 'react'

type BadgeVariant = 'accent' | 'muted' | 'success' | 'warning' | 'error' | 'mono'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  accent: 'bg-accent/10 border-accent/30 text-accent',
  muted: 'bg-white/5 border-white/10 text-text-muted',
  success: 'bg-green-400/10 border-green-400/30 text-green-400',
  warning: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  error: 'bg-red-400/10 border-red-400/30 text-red-400',
  mono: 'bg-accent/5 border-accent/20 text-accent font-mono',
}

/**
 * Badge component — pill-shaped label for tech stacks, statuses, etc.
 */
export default function Badge({ variant = 'accent', children, className = '', ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </span>
  )
}
