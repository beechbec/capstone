import { Link } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { getCurrentUser, signOutMock } from '../../data/auth'

export default function SidebarActions({ className = '' }: { className?: string }) {
  const user = getCurrentUser()
  return (
    <div className={`p-4 sm:p-5 lg:p-6 space-y-3 lg:space-y-4 ${className}`}>
      <Link
        to="/account"
        className="h-12 lg:h-14 w-full inline-flex items-center gap-2 lg:gap-3 rounded-lg border border-gray-200 bg-cream px-3 lg:px-4 font-semibold text-blue hover:bg-blue hover:text-white transition-colors touch-manipulation text-sm lg:text-base"
      >
        <span className="text-lg lg:text-xl xl:text-2xl" aria-hidden="true"><FiUser /></span>
        Account
      </Link>
      <button
        onClick={() => {
          if (user) {
            signOutMock()
          }
          window.location.href = '/signin'
        }}
        className="h-12 lg:h-14 w-full inline-flex items-center justify-center gap-2 lg:gap-3 rounded-lg bg-red text-white px-3 lg:px-4 font-semibold hover:bg-red/90 transition-colors touch-manipulation text-sm lg:text-base"
      >
        <span className="text-lg lg:text-xl xl:text-2xl" aria-hidden="true"><FiLogOut /></span>
        {user ? 'Logout' : 'Logout'}
      </button>
    </div>
  )
}


