import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiPaperclip, FiSend, FiMessageSquare, FiMenu, FiX } from 'react-icons/fi'
import SidebarActions from '../components/SidebarActions'
import { resolveFlowFromTopic } from './flows'
import type { BotMessage } from './types'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

// Replies now come from flow modules

export default function Chat() {
  const [search] = useSearchParams()
  const topic = search.get('topic') || 'About Us'
  const navigate = useNavigate()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TODO(db): When ready, load existing conversation from Supabase on mount and persist messages to a 'messages' table. Use user id from Firebase auth.

  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  // Flow-driven; no local reply map needed anymore

  // Load initial messages from flow
  useEffect(() => {
    const flow = resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    const seed = flow.initial(ctx)
    const apply = (arr: BotMessage[]) =>
      setMessages(arr.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message)))
    if (seed instanceof Promise) {
      seed.then(apply)
    } else {
      apply(seed)
    }
  }, [topic])

  const sendUser = (text: string) => {
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text, ts: Date.now() }])
    setTyping(true)
    const flow = resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    setTimeout(() => {
      flow
        .respond(ctx, text)
        .then((res) => {
          const next = res.messages.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message))
          setMessages((m) => [...m, ...next])
        })
        .finally(() => setTyping(false))
    }, 2000)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = input.trim()
    if (!value) return
    setInput('')
    sendUser(value)
  }

  return (
    <div className="h-screen overflow-hidden bg-cream text-blue flex flex-col lg:grid lg:grid-cols-[20rem_1fr] xl:grid-cols-[22rem_1fr]">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-blue font-semibold">
          <FiArrowLeft /> Back
        </button>
        <div className="font-heading font-bold text-lg">{topic}</div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-blue hover:bg-blue/10 transition-colors"
          aria-label="Open chat menu"
        >
          <FiMenu className="h-5 w-5" />
        </button>
      </div>

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
            <Link to="/app" className="text-blue font-heading font-extrabold text-2xl sm:text-3xl lg:text-3xl xl:text-4xl leading-none hover:text-blue/80 transition-colors">Printy</Link>
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

        <div className="p-3 sm:p-4 lg:p-5">
          <div className="text-xs lg:text-sm font-semibold text-gray-500 mb-2 lg:mb-3 uppercase tracking-wide">RECENT CHATS</div>
          {/* TODO(db): Query recent chats for the current user from Supabase 'conversations' and list them here. */}
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

      {/* Conversation column */}
      <section className="flex flex-col min-h-0 flex-1">
        {/* Desktop header */}
        <div className="hidden lg:flex h-14 border-b border-gray-100 bg-white items-center gap-3 px-6">
          <button onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-blue font-semibold hover:text-blue/80 transition-colors">
            <FiArrowLeft /> Back
          </button>
          <div className="mx-auto font-heading font-bold">{topic}</div>
          <div className="w-[72px]" />
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto p-3 sm:p-6 lg:pr-10 min-h-0">
          <div className="max-w-4xl mx-auto">
            {messages.map((m, idx) => {
              const isLastBot = m.role === 'bot' && idx === messages.length - 1
              return (
                <div key={m.id}>
                  <ChatBubble role={m.role} text={m.text} ts={m.ts} />
                  {isLastBot && (
                    <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                      {(
                        Array.isArray(resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }))
                          ? (resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }) as string[])
                          : []
                      ).map((q) => (
                        <button
                          key={q}
                          onClick={() => sendUser(q)}
                          className="
                            rounded-xl border border-blue/20 bg-white px-3 py-2 text-sm font-semibold text-blue 
                            hover:bg-blue/5 hover:border-blue/30 
                            active:scale-95 
                            focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-1
                            transition-all duration-150 ease-in-out
                            touch-manipulation
                            min-h-[44px] flex items-center
                          "
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            {typing && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white border border-blue/20 px-4 py-3">
                <div className="flex items-end gap-1">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-200" />
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-3 sm:px-6 sm:pb-4 bg-white border-t border-gray-100 lg:border-t-0 lg:bg-transparent">
          <form onSubmit={onSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
            {/* TODO(storage): Upload to Supabase Storage on click and attach file URL to outgoing message. */}
            <button 
              type="button" 
              className="
                h-11 w-11 grid place-items-center rounded-lg border border-blue/20 bg-white text-blue 
                hover:bg-blue/5 hover:border-blue/30 
                focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-1
                transition-colors duration-150 touch-manipulation
              "
              aria-label="Attach file"
            >
              <FiPaperclip />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="
                flex-1 h-11 rounded-lg border border-blue/20 bg-white px-3 text-base
                outline-none focus:ring-2 focus:ring-blue focus:border-blue
                placeholder:text-gray-400
                transition-all duration-150
              "
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="
                h-11 px-4 rounded-lg bg-red text-white font-semibold inline-flex items-center gap-2 
                hover:bg-red/90 active:scale-95 
                focus:outline-none focus:ring-2 focus:ring-red/50 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red
                transition-all duration-150 touch-manipulation
                min-w-[80px]
              "
            >
              <span className="hidden sm:inline">Send</span>
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function ChatBubble({ role, text, ts }: { role: 'bot' | 'user'; text: string; ts: number }) {
  const isBot = role === 'bot'
  return (
    <div className={`mt-4 flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
        <div
          className={`inline-block w-full break-words rounded-2xl px-3 py-3 sm:px-4 border shadow-sm ${
            isBot 
              ? 'bg-white border-blue/20 text-blue' 
              : 'bg-blue text-white border-blue'
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed">{text}</p>
        </div>
        <div className={`mt-1 flex items-center gap-1 text-xs text-gray-500 px-1 ${isBot ? '' : 'justify-end'}`}>
          <FiClock className="h-3 w-3" /> 
          <span>{new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  )
}


