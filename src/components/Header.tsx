import { Link } from 'react-router-dom'

type HeaderProps = {
  hideAuthActions?: boolean
}

export default function Header({ hideAuthActions = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
      <div className="max-w-[1120px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <Link to="/" className="text-blue font-extrabold text-3xl leading-none font-heading focus:outline-none">
            Printy
          </Link>
          <span className="ml-0 text-sm text-gold">by B.J. Santiago INC.</span>
        </div>
        {!hideAuthActions && (
          <nav className="flex items-center gap-2">
            <Link to="/signin" className="h-9 px-3 rounded-md text-blue font-semibold inline-flex items-center">Sign In</Link>
            <Link to="/signup" className="h-9 px-3 rounded-md bg-blue text-white font-semibold inline-flex items-center">Sign Up</Link>
          </nav>
        )}
      </div>
    </header>
  )
}


