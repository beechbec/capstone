import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Header from '../components/Header'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header hideAuthActions />

      <main className="max-w-[980px] mx-auto px-4 py-10">
        <h1 className="font-heading text-blue text-4xl sm:text-5xl font-extrabold text-center">Sign in to your account</h1>
        <p className="text-center mt-2 text-blue">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-gold font-semibold">Sign up</Link>
        </p>

        <div className="mt-8 flex items-start justify-center">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue mb-1">Email</label>
                <input
                  className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue"
                  type="email"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue mb-1">Password</label>
                <div className="relative">
                  <input
                    className="w-full h-11 rounded-lg border border-blue/30 px-3 pr-10 outline-none focus:ring-2 focus:ring-blue"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center text-gold"
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

              <button type="submit" className="w-full h-11 rounded-lg bg-blue text-white font-semibold">Sign in</button>

              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gold">Or continue with</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                className="w-full h-11 rounded-lg border border-gray-300 bg-white font-semibold text-blue inline-flex items-center justify-center gap-3"
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
