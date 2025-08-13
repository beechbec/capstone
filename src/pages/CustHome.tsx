import { Link } from 'react-router-dom'
import { FiInfo, FiHelpCircle, FiShoppingCart, FiPackage, FiSettings } from 'react-icons/fi'
import ActionButton from '../components/ActionButton'
import SidebarActions from '../components/SidebarActions'

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

        <SidebarActions />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start">
        <div className="w-full max-w-6xl px-6">
          <h1 className="mt-40 mb-10 text-center font-heading text-5xl sm:text-6xl font-extrabold text-blue">
            How can I help you today?
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/chat?topic=About%20Us"><ActionButton icon={<FiInfo />} label="About Us" size="lg" /></Link>
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

