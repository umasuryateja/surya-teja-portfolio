import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Shows a 2px gradient top border */
  topBorder?: boolean
  /** Enables hover lift + glow */
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

/**
 * Glass card wrapper component — applies the standard glassmorphism style.
 */
export default function Card({
  children,
  topBorder = false,
  hoverable = false,
  padding = 'md',
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'glass-card',
        topBorder ? 'gradient-border-top' : '',
        hoverable ? 'cursor-pointer transition-transform hover:scale-[1.01] hover:-translate-y-1' : '',
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
