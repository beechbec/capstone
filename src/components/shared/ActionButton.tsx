import type { ReactNode } from 'react'

type ActionButtonProps = {
  icon: ReactNode
  label: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function ActionButton({ icon, label, size = 'sm', className = '', onClick }: ActionButtonProps) {
  // Responsive sizing with touch-friendly minimum heights (44px+)
  const sizeClasses = {
    sm: 'h-24 sm:h-24',
    md: 'h-28 sm:h-32',
    lg: 'h-32 sm:h-36 lg:h-40'
  }
  
  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-lg sm:text-xl lg:text-2xl'
  }
  
  const iconSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl'
  }
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClasses[size]} w-full rounded-2xl border border-blue/20 bg-white text-blue font-semibold shadow-sm 
        transition-all duration-200 ease-in-out
        hover:bg-blue/5 hover:border-blue/30 hover:shadow-md
        active:scale-95 active:bg-blue/10
        focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2
        touch-manipulation
        ${className}
      `}
      aria-label={`${label} button`}
    >
      <div className="h-full w-full flex flex-col items-center justify-center gap-2 sm:gap-3 px-3 py-2">
        <span className={`${iconSizes[size]} text-gold transition-transform duration-200 group-hover:scale-110`}>
          {icon}
        </span>
        <span className={`${textSizes[size]} font-semibold text-center leading-tight`}>
          {label}
        </span>
      </div>
    </button>
  )
}


