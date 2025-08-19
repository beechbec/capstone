import { Link } from 'react-router-dom'

type HeaderProps = {
  hideAuthActions?: boolean
}

export default function Header({ hideAuthActions = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="max-w-[1120px] mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-baseline gap-1 sm:gap-2 min-w-0 flex-1">
          <Link to="/" className="text-blue font-extrabold text-2xl sm:text-3xl leading-none font-heading focus:outline-none focus-enhanced">
            Printy
          </Link>
          <span className="text-xs sm:text-sm text-gold whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="hidden xs:inline">by </span>B.J. Santiago INC.
          </span>
        </div>
        {/* TODO(auth): If Firebase user is present, show user menu and Sign out; else show Sign In/Up. Role-based links (e.g., admin) can be conditionally rendered. */}
        {!hideAuthActions && (
          <nav className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Link 
              to="/signin" 
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-md text-blue font-semibold inline-flex items-center text-sm sm:text-base focus-enhanced touch-manipulation"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-md bg-blue text-white font-semibold inline-flex items-center text-sm sm:text-base focus-enhanced touch-manipulation"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}


