import { Link } from 'react-router-dom'
import { FiLogOut, FiUser } from 'react-icons/fi'

export default function SidebarActions({ className = '' }: { className?: string }) {
  return (
    <div className={`p-4 space-y-3 ${className}`}>
      <Link
        to="/account"
        className="h-11 w-full inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-cream px-3 font-semibold text-blue hover:bg-blue hover:text-white transition-colors"
      >
        <span className="text-xl" aria-hidden="true"><FiUser /></span>
        Account
      </Link>
      <Link
        to="/signin"
        className="h-11 w-full inline-flex items-center gap-2 rounded-lg bg-red text-white px-3 font-semibold"
      >
        <span className="text-xl" aria-hidden="true"><FiLogOut /></span>
        Logout
      </Link>
    </div>
  )
}


