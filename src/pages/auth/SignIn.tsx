import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Header from '../../components/shared/Header'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header hideAuthActions />

      <main className="max-w-[980px] mx-auto px-4 py-6 sm:py-10 safe-area-inset">
        <h1 className="font-heading text-blue text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight">Sign in to your account</h1>
        <p className="text-center mt-3 text-blue text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gold font-semibold hover:underline">Sign up</Link>
        </p>

        <div className="mt-6 sm:mt-8 flex items-start justify-center">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            {/* TODO(auth): Handle onSubmit to call Firebase signInWithEmailAndPassword(email, password); on success navigate('/app'). Show errors inline. */}
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue mb-2">Email</label>
                <input
                  className="w-full h-12 rounded-lg border border-blue/30 px-3 text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue mb-2">Password</label>
                <div className="relative">
                  <input
                    className="w-full h-12 rounded-lg border border-blue/30 px-3 pr-12 text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 my-auto h-10 w-10 grid place-items-center text-gold hover:text-gold/80 transition-colors touch-manipulation"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 select-none">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  <span className="text-blue">Keep me logged in</span>
                </label>
                <a href="#" className="text-red font-semibold">Forgot your password?</a>
              </div>

              <button 
                type="submit" 
                className="w-full h-12 rounded-lg bg-blue text-white font-semibold hover:bg-blue/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation"
              >
                Sign in
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gold font-medium">Or continue with</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* TODO(auth): Replace with Firebase signInWithPopup(new GoogleAuthProvider()) and navigate('/app') on success. */}
              <button
                type="button"
                className="w-full h-12 rounded-lg border border-gray-300 bg-white font-semibold text-blue inline-flex items-center justify-center gap-3 hover:bg-gray-50 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation"
                onClick={() => (window.location.href = '/app')}
              >
                <FcGoogle className="text-xl" /> Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
