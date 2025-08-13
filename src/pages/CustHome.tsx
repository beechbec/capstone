import { Link } from 'react-router-dom'
import { FiInfo, FiHelpCircle, FiShoppingCart, FiPackage, FiSettings, FiLogOut, FiUser } from 'react-icons/fi'
import ActionButton from '../components/ActionButton'

export default function CustHome() {
  return (
    <div className="min-h-screen bg-cream text-blue flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 px-6 flex items-center border-b border-gray-100">
          <span className="text-blue font-heading font-extrabold text-3xl leading-none">Printy</span>
          <span className="ml-2 pt-3 text-xs text-gold">by B.J. Santiago INC.</span>
        </div>

        <div className="flex-1" />

        <div className="p-4 space-y-3">
          <Link
            to="#"
            className="h-11 w-full inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-cream px-3 font-semibold text-blue"
          >
            <FiUser /> Account
          </Link>
          <Link
            to="/signin"
            className="h-11 w-full inline-flex items-center gap-2 rounded-lg bg-red text-white px-3 font-semibold"
          >
            <FiLogOut /> Logout
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-6xl px-6">
          <h1 className="mt-20 mb-10 text-center font-heading text-5xl sm:text-6xl font-extrabold text-blue">
            How can I help you today?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ActionButton icon={<FiInfo />} label="About Us" size="lg" />
            <ActionButton icon={<FiHelpCircle />} label="FAQs" size="lg" />
            <ActionButton icon={<FiShoppingCart className="text-gold" />} label="Place an Order" size="lg" />
            <ActionButton icon={<FiPackage />} label="Track an Order" size="lg" />
            <ActionButton icon={<FiSettings />} label="Services Offered" size="lg" />
          </div>
        </div>
      </main>
    </div>
  )
}

