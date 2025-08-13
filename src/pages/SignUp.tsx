import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiEye, FiEyeOff, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import Header from '../components/Header'

export default function SignUp() {
  const [step, setStep] = useState(1)
  const [showPw1, setShowPw1] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  const next = () => setStep((s) => Math.min(3, s + 1))
  const prev = () => setStep((s) => Math.max(1, s - 1))

  return (
    <div className="min-h-screen bg-white">
      <Header hideAuthActions />

      <main className="max-w-[980px] mx-auto px-4 py-10">
        <h1 className="font-heading text-blue text-4xl sm:text-5xl font-extrabold text-center">Create your account</h1>
        <p className="text-center mt-2 text-blue">
          Already have an account?{' '}
          <Link to="/signin" className="text-gold font-semibold">Sign in</Link>
        </p>

        <div className="mt-8 flex items-start justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            {/* Stepper */}
            <div className="flex items-center justify-center gap-6 mb-6">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-9 w-9 grid place-items-center rounded-full border-2 ${i <= step ? 'bg-blue text-white border-blue' : 'border-blue text-blue'}`}>{i <= step ? '✓' : i}</div>
                  {i < 3 && <div className={`w-16 h-[3px] rounded ${i < step ? 'bg-blue' : 'bg-blue/40'}`} />}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div>
                <h2 className="font-heading text-blue text-2xl text-center mb-4">Account Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Email</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="email" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Password</label>
                    <div className="relative">
                      <input className="w-full h-11 rounded-lg border border-blue/30 px-3 pr-10 outline-none focus:ring-2 focus:ring-blue" type={showPw1 ? 'text' : 'password'} placeholder="At least 8 characters" />
                      <button type="button" onClick={() => setShowPw1((v) => !v)} className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center text-gold">
                        {showPw1 ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Confirm Password</label>
                    <div className="relative">
                      <input className="w-full h-11 rounded-lg border border-blue/30 px-3 pr-10 outline-none focus:ring-2 focus:ring-blue" type={showPw2 ? 'text' : 'password'} placeholder="Re-enter password" />
                      <button type="button" onClick={() => setShowPw2((v) => !v)} className="absolute inset-y-0 right-2 my-auto h-8 w-8 grid place-items-center text-gold">
                        {showPw2 ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </form>

                <button onClick={next} className="w-full mt-4 h-11 rounded-lg bg-blue text-white font-semibold">Next</button>

                <div className="flex items-center gap-3 my-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-sm text-gold">Or continue with</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <button type="button" className="w-full h-11 rounded-lg border border-gray-300 bg-white font-semibold text-blue inline-flex items-center justify-center gap-3">
                  <FcGoogle className="text-xl" /> Sign up with Google
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-heading text-blue text-2xl text-center mb-4">Personal Information</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">First Name</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Last Name</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="text" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-blue mb-1">Phone Number</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="tel" placeholder="+63 9XXXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Gender</label>
                    <select className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue">
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Birthday</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="date" />
                  </div>
                </form>
                <div className="mt-4 flex justify-between">
                  <button onClick={prev} className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-gold text-white"><FiChevronLeft /> Previous</button>
                  <button onClick={next} className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-blue text-white">Next <FiChevronRight /></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-heading text-blue text-2xl text-center mb-4">Address Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Building/House Number (optional)</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Street</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Barangay</label>
                    <input className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Province</label>
                    <select className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue">
                      <option value="">Select province</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">City/Municipality</label>
                    <select className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue">
                      <option value="">Select province first</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue mb-1">Country</label>
                    <select className="w-full h-11 rounded-lg border border-blue/30 px-3 outline-none focus:ring-2 focus:ring-blue">
                      <option>Philippines</option>
                    </select>
                  </div>
                </form>

                <div className="mt-4 flex justify-between">
                  <button onClick={prev} className="inline-flex items-center gap-2 h-11 px-4 rounded-lg bg-gold text-white"><FiChevronLeft /> Previous</button>
                  <button className="h-11 px-4 rounded-lg bg-blue text-white font-semibold">Create Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
