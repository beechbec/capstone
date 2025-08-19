import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiInfo, FiHelpCircle, FiShoppingCart, FiPackage, FiSettings, FiMenu, FiX } from 'react-icons/fi'
import ActionButton from '../../components/shared/ActionButton'
import SidebarActions from '../../components/shared/SidebarActions'

export default function CustHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // TODO(auth): Guard this page; if no Firebase user, redirect to '/signin'.
  return (
    <div className="min-h-screen bg-cream text-blue">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-blue font-heading font-extrabold text-2xl leading-none">Printy</span>
          <span className="ml-2 pt-2 text-xs text-gold">by B.J. Santiago INC.</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-blue hover:bg-blue/10 transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-screen lg:min-h-screen">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-80 lg:w-80 xl:w-88 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out h-screen lg:sidebar-shadow
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-16 lg:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-blue font-heading font-extrabold text-2xl sm:text-3xl lg:text-3xl xl:text-4xl leading-none">Printy</span>
              <span className="ml-2 pt-2 lg:pt-3 text-xs sm:text-xs lg:text-sm text-gold font-medium">by B.J. Santiago INC.</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600"
              aria-label="Close menu"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1" />
          <SidebarActions />
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-start lg:ml-0">
          <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="mt-8 sm:mt-16 lg:mt-40 mb-8 sm:mb-10 text-center font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-blue leading-tight">
              How can I help you today?
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8">
              <Link to="/chat?topic=About%20Us"><ActionButton icon={<FiInfo />} label="About Us" size="lg" /></Link>
              <Link to="/chat?topic=FAQs"><ActionButton icon={<FiHelpCircle />} label="FAQs" size="lg" /></Link>
              <ActionButton icon={<FiShoppingCart className="text-gold" />} label="Place an Order" size="lg" />
              <ActionButton icon={<FiPackage />} label="Track an Order" size="lg" />
              <ActionButton icon={<FiSettings />} label="Services Offered" size="lg" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

