import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { AuthUser } from '../lib/firebase'

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // TODO(auth): Subscribe to Firebase onAuthStateChanged and map to AuthUser
  useEffect(() => {
    // Placeholder subscription. Replace with Firebase auth listener when SDK is added.
    return () => {}
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async signInWithEmail(_email: string, _password: string) {
      setLoading(true)
      try {
        // const cred = await firebaseSignInWithEmail(email, password)
        // setUser(cred)
        throw new Error('Firebase not configured yet')
      } finally {
        setLoading(false)
      }
    },
    async signUpWithEmail(_email: string, _password: string) {
      setLoading(true)
      try {
        // const cred = await firebaseSignUpWithEmail(email, password)
        // setUser(cred)
        throw new Error('Firebase not configured yet')
      } finally {
        setLoading(false)
      }
    },
    async signInWithGoogle() {
      setLoading(true)
      try {
        // const cred = await firebaseSignInWithGoogle()
        // setUser(cred)
        throw new Error('Firebase not configured yet')
      } finally {
        setLoading(false)
      }
    },
    async signOut() {
      setLoading(true)
      try {
        // await firebaseSignOut()
        setUser(null)
      } finally {
        setLoading(false)
      }
    },
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


