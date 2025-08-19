import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import type { ReactNode } from 'react'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-blue">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return <>{children}</>
}


