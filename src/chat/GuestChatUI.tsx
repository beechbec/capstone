import { useEffect, useRef, useState } from 'react'
import { FiClock, FiPaperclip, FiSend } from 'react-icons/fi'
import type { BotMessage } from './types'
import { resolveFlowFromTopic, flows } from './flows'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

export default function GuestChatUI({ topic, onBack }: { topic: string; onBack?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [suggestedReplies, setSuggestedReplies] = useState<string[] | null>(null)
  const [ended, setEnded] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    const flow = topic.toLowerCase().includes('place') ? flows['guest-place-order'] : resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    const seed = flow.initial(ctx)
    const apply = (arr: BotMessage[]) =>
      setMessages(arr.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message)))
    if (seed instanceof Promise) seed.then(apply)
    else apply(seed)
    setSuggestedReplies(null)
    setEnded(false)
  }, [topic])

  const sendUser = (text: string) => {
    if (ended) return
    const lc = text.trim().toLowerCase()
    if (lc === 'sign in' || lc.includes('sign in')) {
      window.location.href = '/signin'
      return
    }
    if (lc === 'sign up' || lc.includes('sign up')) {
      window.location.href = '/signup'
      return
    }
    if (lc === 'back' || lc.includes('back')) {
      onBack?.()
      return
    }
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text, ts: Date.now() }])
    setTyping(true)
    const flow = topic.toLowerCase().includes('place') ? flows['guest-place-order'] : resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    setTimeout(() => {
      flow
        .respond(ctx, text)
        .then((res) => {
          const next = res.messages.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message))
          setMessages((m) => [...m, ...next])
          setSuggestedReplies(res.quickReplies ?? null)
        })
        .finally(() => setTyping(false))
    }, 2000)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = input.trim()
    if (!value) return
    setInput('')
    // Navigate requests are handled by parent via button clicks
    sendUser(value)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div ref={listRef} className="flex-1 overflow-y-auto p-3 sm:p-6 min-h-[240px] bg-white rounded-xl border border-blue/20">
        {messages.map((m) => (
          <div key={m.id} className={`mt-4 flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
            <div className="max-w-[85%] sm:max-w-[75%]">
              <div className={`inline-block w-full break-words rounded-2xl px-3 py-3 sm:px-4 border shadow-sm ${m.role === 'bot' ? 'bg-white border-blue/20 text-blue' : 'bg-blue text-white border-blue'}`}>
                <p className="text-sm sm:text-base leading-relaxed">{m.text}</p>
              </div>
              <div className={`mt-1 flex items-center gap-1 text-xs text-gray-500 px-1 ${m.role === 'bot' ? '' : 'justify-end'}`}>
                <FiClock className="h-3 w-3" />
                <span>{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-white border border-blue/20 px-4 py-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-200" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-400" />
          </div>
        )}
      </div>

      {/* Quick replies (dynamic; fallback to flow defaults) */}
      {(() => {
        const flow = topic.toLowerCase().includes('place') ? flows['guest-place-order'] : resolveFlowFromTopic(topic)
        const ctx = { topic: flow.title }
        const available = suggestedReplies ?? (Array.isArray(flow.quickReplies(ctx)) ? (flow.quickReplies(ctx) as string[]) : [])
        return available.length > 0 ? (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {available.map((q) => (
              <button
                key={q}
                onClick={() => sendUser(q)}
                className="rounded-xl border border-blue/20 bg-white px-3 py-2 text-sm font-semibold text-blue hover:bg-blue/5 hover:border-blue/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-1 transition-all duration-150 touch-manipulation min-h-[44px]"
              >
                {q}
              </button>
            ))}
          </div>
        ) : null
      })()}

      {/* Input row */}
      <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
        <button type="button" className="h-11 w-11 grid place-items-center rounded-lg border border-blue/20 bg-white text-blue hover:bg-blue/5 hover:border-blue/30 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-1 transition-colors duration-150 touch-manipulation" aria-label="Attach file">
          <FiPaperclip />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 h-11 rounded-lg border border-blue/20 bg-white px-3 text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue placeholder:text-gray-400 transition-all duration-150"
        />
        <button type="submit" disabled={!input.trim()} className="h-11 px-4 rounded-lg bg-red text-white font-semibold inline-flex items-center gap-2 hover:bg-red/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red/50 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 min-w-[80px]">
          <span className="hidden sm:inline">Send</span>
          <FiSend className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}


