import { useRef } from 'react'
import { FiChevronDown, FiInfo, FiHelpCircle, FiShoppingCart, FiPackage, FiSettings } from 'react-icons/fi'
import Header from './components/Header'
import ActionButton from './components/ActionButton'

function App() {
  const chatSectionRef = useRef<HTMLDivElement | null>(null)

  const handleScrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero (full screen) */}
        <section className="h-screen bg-gradient-to-b from-white to-cream flex items-center text-center">
          <div className="max-w-[1120px] mx-auto px-4">
            <h1 className="font-heading text-blue text-5xl sm:text-6xl font-extrabold mb-4">Introducing Printy</h1>
            <p className="max-w-3xl mx-auto text-blue">
              For over 33 years, B.J. Santiago Inc. has delivered trusted printing solutions to businesses across the Philippines.
              Now, with <strong>Printy</strong>, our prompt-based chatbot assistant, we’re making it easier than ever to browse services,
              place orders, track print jobs, and get instant support — all in one chat.
            </p>
            <div className="mt-6">
              <button
                onClick={handleScrollToChat}
                type="button"
                className="inline-flex items-center gap-2 bg-red text-white rounded-full px-5 py-3 font-semibold"
              >
                Try out Printy
                <FiChevronDown aria-hidden />
              </button>
              <div className="mt-2 text-sm text-gray-500">Experience our new chatbot assistant today</div>
            </div>
          </div>
        </section>

        {/* Chat (full screen) */}
        <section className="h-screen bg-gradient-to-b from-cream to-white" ref={chatSectionRef}>
          <div className="max-w-[1120px] mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-blue font-heading text-4xl font-bold mb-2">Hi there! I'm Printy, your chatbot assistant!</h2>
            <p className="text-gray-500 mb-6">Click any button below to start a conversation with me.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
              <ActionButton icon={<FiInfo aria-hidden />} label="About Us" size="md" />
              <ActionButton icon={<FiHelpCircle aria-hidden />} label="FAQs" size="md" />
              <ActionButton icon={<FiShoppingCart aria-hidden />} label="Place an Order" size="md" />
              <ActionButton icon={<FiPackage aria-hidden />} label="Track an Order" size="md" />
              <ActionButton icon={<FiSettings aria-hidden />} label="Services Offered" size="md" />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
