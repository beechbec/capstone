import type { ReactNode } from 'react'

type ActionButtonProps = {
  icon: ReactNode
  label: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function ActionButton({ icon, label, size = 'sm', className = '', onClick }: ActionButtonProps) {
  const sizeClass = size === 'lg' ? 'h-36' : size === 'md' ? 'h-28' : 'h-24'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${sizeClass} w-full rounded-2xl border border-blue/20 bg-white text-blue font-semibold shadow-sm transition-colors hover:bg-white/80 ${className}`}
    >
      <div className="h-full w-full flex flex-col items-center justify-center gap-3">
        <span className="text-2xl text-gold">{icon}</span>
        <span className="text-lg">{label}</span>
      </div>
    </button>
  )
}


