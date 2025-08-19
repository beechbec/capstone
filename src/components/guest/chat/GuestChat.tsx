import { useEffect, useRef, useState } from 'react'
import type { BotMessage } from '../../../chat/types'
import { resolveFlowFromTopic, flows } from '../../../chat'
import { faqsFlow as guestFaqsFlow } from '../../../chat/flows/GuestFaqs'

import GuestMessageList from './GuestMessageList.tsx'
import GuestInput from './GuestInput.tsx'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

export default function GuestChat({ topic, onBack }: { topic: string; onBack?: () => void }) {
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
    const lower = topic.toLowerCase()
    const flow = lower.includes('place')
      ? flows['guest-place-order']
      : lower.includes('faq')
      ? guestFaqsFlow
      : resolveFlowFromTopic(topic)
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
    if (lc === 'back' || lc.includes('back')) {
      onBack?.()
      return
    }
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text, ts: Date.now() }])
    setTyping(true)
    const lower = topic.toLowerCase()
    const flow = lower.includes('place')
      ? flows['guest-place-order']
      : lower.includes('faq')
      ? guestFaqsFlow
      : resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    setTimeout(() => {
      flow
        .respond(ctx, text)
        .then((res) => {
          const next = res.messages.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message))
          setMessages((m) => [...m, ...next])
          setSuggestedReplies(res.quickReplies ?? null)
          if (lc.includes('sign in') || lc.includes('already have an account')) {
            setTimeout(() => { window.location.href = '/signin' }, 2000)
          }
          if (lc.includes('sign up') || lc.includes('let me sign up')) {
            setTimeout(() => { window.location.href = '/signup' }, 2000)
          }
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
    <div className="w-full max-w-3xl mx-auto">
      <div ref={listRef} className="flex-1 overflow-y-auto p-3 sm:p-6 min-h-[240px] bg-white rounded-xl border border-blue/20">
        <GuestMessageList
          messages={messages}
          typing={typing}
          suggestedReplies={suggestedReplies}
          topic={topic}
          onQuickReply={sendUser}
        />
      </div>

      <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2">
        <GuestInput value={input} onChange={setInput} />
        <button type="submit" disabled={!input.trim()} className="h-11 px-4 rounded-lg bg-red text-white font-semibold inline-flex items-center gap-2 hover:bg-red/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red/50 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 min-w-[80px]">
          <span className="hidden sm:inline">Send</span>
          {/* Icon inside component to keep parity with customer input */}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </form>
    </div>
  )
}


