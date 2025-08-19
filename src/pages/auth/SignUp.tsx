import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiEye, FiEyeOff, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Header from '../../components/shared/Header'

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [showPw1, setShowPw1] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  return (
    <div className="mobile-min-vh bg-white safe-area-inset">
      <Header hideAuthActions />

      <main className="max-w-[980px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-10 safe-area-inset-bottom">
        <h1 className="font-heading text-blue text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight px-2 sm:px-0">
          Create your account
        </h1>
        <p className="text-center mt-2 sm:mt-3 text-blue text-sm sm:text-base px-2 sm:px-0">
          Already have an account?{' '}
          <Link to="/signin" className="text-gold font-semibold hover:underline focus-enhanced">Sign in</Link>
        </p>

        <div className="mt-4 sm:mt-6 lg:mt-8 flex items-start justify-center">
          <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            {/* Stepper */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 px-2 sm:px-0">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3">
                  <div className={`h-8 w-8 sm:h-9 sm:w-9 grid place-items-center rounded-full border-2 text-sm sm:text-base font-semibold ${i <= step ? 'bg-blue text-white border-blue' : 'border-blue text-blue'}`}>
                    {i <= step ? '✓' : i}
                  </div>
                  {i < 3 && <div className={`w-8 sm:w-12 lg:w-16 h-[2px] sm:h-[3px] rounded ${i < step ? 'bg-blue' : 'bg-blue/40'}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="font-heading text-blue text-xl sm:text-2xl text-center mb-4 sm:mb-6">Account Information</h2>
                <form className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Email</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="email" 
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Password</label>
                    <div className="relative">
                      <input 
                        className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 pr-12 sm:pr-14 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                        type={showPw1 ? 'text' : 'password'} 
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPw1((v) => !v)} 
                        className="absolute inset-y-0 right-2 sm:right-3 my-auto h-10 w-10 sm:h-11 sm:w-11 grid place-items-center text-gold hover:text-gold/80 transition-colors touch-manipulation tap-target"
                        aria-label={showPw1 ? 'Hide password' : 'Show password'}
                      >
                        <span className="text-lg sm:text-xl">
                          {showPw1 ? <FiEyeOff /> : <FiEye />}
                        </span>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Confirm Password</label>
                    <div className="relative">
                      <input 
                        className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 pr-12 sm:pr-14 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                        type={showPw2 ? 'text' : 'password'} 
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPw2((v) => !v)} 
                        className="absolute inset-y-0 right-2 sm:right-3 my-auto h-10 w-10 sm:h-11 sm:w-11 grid place-items-center text-gold hover:text-gold/80 transition-colors touch-manipulation tap-target"
                        aria-label={showPw2 ? 'Hide password' : 'Show password'}
                      >
                        <span className="text-lg sm:text-xl">
                          {showPw2 ? <FiEyeOff /> : <FiEye />}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* TODO(auth+db): On real submit, use Firebase createUserWithEmailAndPassword; then insert a row into Supabase 'profiles' with uid, email, and role (e.g., 'customer'). */}
                <button 
                  onClick={next} 
                  className="w-full mt-4 sm:mt-6 h-11 sm:h-12 rounded-lg bg-blue text-white font-semibold text-sm sm:text-base hover:bg-blue/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target"
                >
                  Next
                </button>

                <div className="flex items-center gap-3 my-4 sm:my-5">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs sm:text-sm text-gold font-medium whitespace-nowrap">Or continue with</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <button 
                  type="button" 
                  className="w-full h-11 sm:h-12 rounded-lg border border-gray-300 bg-white font-semibold text-blue text-sm sm:text-base inline-flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target"
                >
                  <FcGoogle className="text-lg sm:text-xl flex-shrink-0" /> 
                  <span>Sign up with Google</span>
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-heading text-blue text-xl sm:text-2xl text-center mb-4 sm:mb-6">Personal Information</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">First Name</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="text"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Last Name</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="text"
                      autoComplete="family-name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Phone Number</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="tel" 
                      placeholder="+63 9XXXXXXXXX"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Gender</label>
                    <select className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target">
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Birthday</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="date"
                      autoComplete="bday"
                    />
                  </div>
                </form>
                <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row justify-between gap-3 xs:gap-4">
                  <button 
                    onClick={prev} 
                    className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-gold text-white font-semibold text-sm sm:text-base hover:bg-gold/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target order-2 xs:order-1"
                  >
                    <FiChevronLeft /> Previous
                  </button>
                  <button 
                    onClick={next} 
                    className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-blue text-white font-semibold text-sm sm:text-base hover:bg-blue/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target order-1 xs:order-2"
                  >
                    Next <FiChevronRight />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-heading text-blue text-xl sm:text-2xl text-center mb-4 sm:mb-6">Address Information</h2>
                <form className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Building/House Number (optional)</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="text"
                      autoComplete="address-line1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Street</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="text"
                      autoComplete="address-line2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Barangay</label>
                    <input 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target" 
                      type="text"
                      autoComplete="address-level3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Province</label>
                    {/* TODO(db): Fetch provinces from Supabase table 'provinces' on entering Step 3; store in state and map into options. */}
                    <select className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target">
                      <option value="">Select province</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">City/Municipality</label>
                    {/* TODO(db): After province is selected, fetch cities from Supabase 'cities' filtering by province_id. */}
                    <select className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target">
                      <option value="">Select province first</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm sm:text-base font-medium text-blue mb-2">Country</label>
                    <select 
                      className="w-full h-11 sm:h-12 rounded-lg border border-blue/30 px-3 sm:px-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue transition-all duration-150 touch-manipulation tap-target"
                      autoComplete="country"
                    >
                      <option>Philippines</option>
                    </select>
                  </div>
                </form>

                <div className="mt-4 sm:mt-6 flex flex-col xs:flex-row justify-between gap-3 xs:gap-4">
                  <button 
                    onClick={prev} 
                    className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-gold text-white font-semibold text-sm sm:text-base hover:bg-gold/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target order-2 xs:order-1"
                  >
                    <FiChevronLeft /> Previous
                  </button>
                  {/* TODO(db): On click, upsert address/profile into Supabase (e.g., 'addresses' linked to user uid, and 'profiles' with role). Then navigate('/app'). */}
                  <button 
                    className="h-11 sm:h-12 px-4 sm:px-6 rounded-lg bg-blue text-white font-semibold text-sm sm:text-base hover:bg-blue/90 active:scale-98 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-2 transition-all duration-150 touch-manipulation tap-target order-1 xs:order-2"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
