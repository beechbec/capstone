import { Link } from 'react-router-dom'
import { FiMessageSquare, FiX } from 'react-icons/fi'
import SidebarActions from '../../shared/SidebarActions'

export default function ChatSidebar({ topic, sidebarOpen, onClose }: { topic: string; sidebarOpen: boolean; onClose: () => void }) {
  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 sm:w-80 lg:w-80 xl:w-88 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out h-screen lg:sidebar-shadow
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="h-16 lg:h-20 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center">
          <Link to="/app" className="text-blue font-heading font-extrabold text-2xl sm:text-3xl lg:text-3xl xl:text-4xl leading-none hover:text-blue/80 transition-colors">Printy</Link>
          <span className="ml-2 pt-2 lg:pt-3 text-xs sm:text-xs lg:text-sm text-gold font-medium">by B.J. Santiago INC.</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600"
          aria-label="Close menu"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      <div className="p-3 sm:p-4 lg:p-5">
        <div className="text-xs lg:text-sm font-semibold text-gray-500 mb-2 lg:mb-3 uppercase tracking-wide">RECENT CHATS</div>
        <button className="w-full flex items-center gap-3 lg:gap-4 rounded-xl px-3 lg:px-4 py-3 lg:py-4 bg-cream border border-blue/20 hover:bg-blue/5 transition-colors touch-manipulation">
          <FiMessageSquare className="text-blue flex-shrink-0 text-lg lg:text-xl" />
          <div className="flex-1 text-left min-w-0">
            <div className="font-semibold truncate text-sm lg:text-base">{topic}</div>
            <div className="text-xs lg:text-sm text-gray-500 truncate">{new Date().toLocaleString()}</div>
          </div>
        </button>
      </div>

      <div className="flex-1" />
      <SidebarActions />
    </aside>
  )
}


