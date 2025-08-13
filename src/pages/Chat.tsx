import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiPaperclip, FiSend, FiMessageSquare } from 'react-icons/fi'
import SidebarActions from '../components/SidebarActions'
import { resolveFlowFromTopic } from '../chat/flows'
import type { BotMessage } from '../chat/types'

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
    <div className="h-screen overflow-hidden bg-cream text-blue grid grid-cols-[18rem_1fr]">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 px-6 flex items-center border-b border-gray-100">
          <Link to="/app" className="text-blue font-heading font-extrabold text-3xl leading-none">Printy</Link>
          <span className="ml-2 pt-3 text-xs text-gold">by B.J. Santiago INC.</span>
        </div>

        <div className="p-3">
          <div className="text-xs font-semibold text-gray-500 mb-2">RECENT CHATS</div>
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-3 bg-cream border border-blue/20">
            <FiMessageSquare className="text-blue" />
            <div className="flex-1 text-left">
              <div className="font-semibold">{topic}</div>
              <div className="text-xs text-gray-500">{new Date().toLocaleString()}</div>
            </div>
          </button>
        </div>

        <div className="flex-1" />
        <SidebarActions />
      </aside>

      {/* Conversation column */}
      <section className="flex flex-col min-h-0">
        <div className="h-14 border-b border-gray-100 bg-white flex items-center gap-3 px-6">
          <button onClick={() => navigate('/app')} className="inline-flex items-center gap-2 text-blue font-semibold">
            <FiArrowLeft /> Back
          </button>
          <div className="mx-auto font-heading font-bold">{topic}</div>
          <div className="w-[72px]" />
        </div>

        <div ref={listRef} className="flex-1 overflow-y-auto p-6 pr-10 min-h-0">
          <div className="max-w-10xl">
            {messages.map((m, idx) => {
              const isLastBot = m.role === 'bot' && idx === messages.length - 1
              return (
                <div key={m.id}>
                  <ChatBubble role={m.role} text={m.text} ts={m.ts} />
                  {isLastBot && (
                    <div className="mt-2 flex flex-wrap gap-3">
                      {(
                        Array.isArray(resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }))
                          ? (resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }) as string[])
                          : []
                      ).map((q) => (
                        <button
                          key={q}
                          onClick={() => sendUser(q)}
                          className="rounded-xl border border-blue/20 bg-white px-3 py-2 text-sm font-semibold text-blue hover:bg-white/80"
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

        <div className="px-6 pb-4">
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <button type="button" className="h-11 w-11 grid place-items-center rounded-lg border border-blue/20 bg-white text-blue">
              <FiPaperclip />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-11 rounded-lg border border-blue/20 bg-white px-3 outline-none focus:ring-2 focus:ring-blue"
            />
            <button type="submit" className="h-11 px-4 rounded-lg bg-red text-white font-semibold inline-flex items-center gap-2">
              Send <FiSend />
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
      <div>
        <div
          className={`inline-block max-w-[48rem] break-words rounded-2xl px-4 py-3 border shadow-sm ${
            isBot ? 'bg-white border-blue/20' : 'bg-blue text-white border-blue'
          }`}
        >
          {text}
        </div>
        <div className={`mt-1 flex items-center gap-1 text-xs text-gray-500 ${isBot ? '' : 'justify-end'}`}>
          <FiClock /> {new Date(ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}


