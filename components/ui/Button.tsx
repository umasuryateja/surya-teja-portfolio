import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never }

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-background font-bold hover:bg-accent/90 shadow-lg shadow-accent/20 hover:shadow-accent/30',
  outline:
    'border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/70',
  ghost:
    'border border-white/10 text-text-primary hover:bg-white/5 hover:border-white/20',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

/**
 * Reusable Button component — supports button and anchor rendering.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold',
    'transition-all duration-200 focus-visible:outline-accent',
    'hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ')

  if ((rest as ButtonAsAnchor).as === 'a') {
    const { as: _as, ...anchorRest } = rest as ButtonAsAnchor
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
