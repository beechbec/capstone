import { useRef, useState } from 'react'
import { FiChevronDown, FiInfo, FiHelpCircle, FiShoppingCart, FiPackage, FiSettings } from 'react-icons/fi'
import Header from './components/shared/Header'
import ActionButton from './components/shared/ActionButton'
import GuestChat from './components/guest/chat/GuestChat'

function App() {
  const chatSectionRef = useRef<HTMLDivElement | null>(null)
  const [topic, setTopic] = useState<string>('')
  const [guestChatActive, setGuestChatActive] = useState(false)

  const handleScrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen flex flex-col safe-area-inset">
      <Header />

      <main className="flex-1">
        {/* Hero (full screen) */}
        <section className="min-h-[100vh] min-h-[100dvh] bg-gradient-to-b from-white to-cream flex items-center text-center safe-area-inset-top">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="font-heading text-blue text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              Introducing Printy
            </h1>
            <p className="max-w-2xl lg:max-w-3xl mx-auto text-blue text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-0">
              For over 33 years, B.J. Santiago Inc. has delivered trusted printing solutions to businesses across the Philippines.
              Now, with <strong>Printy</strong>, our prompt-based chatbot assistant, we're making it easier than ever to browse services,
              place orders, track print jobs, and get instant support — all in one chat.
            </p>
            <div className="mt-6 sm:mt-8">
              <button
                onClick={handleScrollToChat}
                type="button"
                className="inline-flex items-center gap-2 bg-red text-white rounded-full px-4 sm:px-5 py-2.5 sm:py-3 font-semibold text-sm sm:text-base focus-enhanced touch-manipulation hover:bg-red/90 transition-colors"
              >
                Try out Printy
                <FiChevronDown aria-hidden />
              </button>
              <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">Experience our new chatbot assistant today</div>
            </div>
          </div>
        </section>

        {/* Guest Chat (landing) */}
        <section className="min-h-[100vh] min-h-[100dvh] bg-gradient-to-b from-cream to-white safe-area-inset-bottom" ref={chatSectionRef}>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[100vh] min-h-[100dvh] flex flex-col items-center justify-center text-center py-8 sm:py-12">
            <h2 className="text-blue font-heading text-2xl xs:text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 leading-tight px-2 sm:px-0">
              Hi there! I'm Printy, your chatbot assistant!
            </h2>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base px-2 sm:px-0">
              Choose a topic and chat right here. Guest chats are not saved.
            </p>
            {!guestChatActive ? (
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs xs:max-w-lg sm:max-w-2xl lg:max-w-3xl px-2 sm:px-0">
                <button onClick={() => { setTopic('About Us'); setGuestChatActive(true) }} className="text-left"><ActionButton icon={<FiInfo aria-hidden />} label="About Us" size="md" /></button>
                <button onClick={() => { setTopic('FAQs'); setGuestChatActive(true) }} className="text-left"><ActionButton icon={<FiHelpCircle aria-hidden />} label="FAQs" size="md" /></button>
                <button onClick={() => { setTopic('Guest Place Order'); setGuestChatActive(true) }} className="text-left"><ActionButton icon={<FiShoppingCart aria-hidden />} label="Place an Order" size="md" /></button>
                <button onClick={() => { setTopic('Track Ticket'); setGuestChatActive(true) }} className="text-left"><ActionButton icon={<FiPackage aria-hidden />} label="Track a Ticket" size="md" /></button>
                <button onClick={() => { setTopic('Services Offered'); setGuestChatActive(true) }} className="text-left"><ActionButton icon={<FiSettings aria-hidden />} label="Services Offered" size="md" /></button>
              </div>
            ) : (
              <div className="mt-2 w-full">
                <GuestChat topic={topic} onBack={() => { setGuestChatActive(false); setTopic('') }} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
