import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCurrentUser } from '../../../data/auth'
import { resolveFlowFromTopic } from '../../../chat'
import type { BotMessage } from '../../../chat/types'
import ChatHeaderMobile from './ChatHeaderMobile.tsx'
import ChatHeaderDesktop from './ChatHeaderDesktop.tsx'
import ChatSidebar from './ChatSidebar.tsx'
import ChatMessageList from './ChatMessageList.tsx'
import ChatInput from './ChatInput.tsx'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

export default function Chat() {
  const [search] = useSearchParams()
  const topic = search.get('topic') || 'About Us'
  const navigate = useNavigate()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [suggestedReplies, setSuggestedReplies] = useState<string[] | null>(null)
  const [ended, setEnded] = useState(false)

  const idleWarnRef = useRef<number | null>(null)
  const idleEndRef = useRef<number | null>(null)
  const IDLE_MS = 120000
  const GRACE_MS = 30000

  const listRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

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
    setSuggestedReplies(null)
    setEnded(false)
  }, [topic])

  const sendUser = (text: string) => {
    if (!getCurrentUser() && text.trim().toLowerCase().includes('sign in')) {
      navigate('/signin')
      return
    }
    if (ended) {
      const choice = text.toLowerCase()
      if (choice.includes('satisfied')) {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: 'user', text, ts: Date.now() },
          { id: crypto.randomUUID(), role: 'bot', text: 'Thanks for your feedback!', ts: Date.now() },
        ])
        return
      }
      return
    }
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'user', text, ts: Date.now() }])
    setTyping(true)
    if (text.toLowerCase().includes('end chat') || text.toLowerCase() === 'end') {
      setTyping(false)
      setEnded(true)
      setSuggestedReplies(['Satisfied', 'Unsatisfied'])
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: 'bot', text: 'Chat ended. How was your experience?', ts: Date.now() },
      ])
      return
    }
    const flow = resolveFlowFromTopic(topic)
    const ctx = { topic: flow.title }
    setTimeout(() => {
      flow
        .respond(ctx, text)
        .then((res) => {
          const next = res.messages.map((b) => ({ id: crypto.randomUUID(), role: b.role, text: b.text, ts: Date.now() } as Message))
          setMessages((m) => [...m, ...next])
          if (Array.isArray(res.quickReplies)) {
            setSuggestedReplies(res.quickReplies)
          } else {
            setSuggestedReplies(null)
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

  useEffect(() => {
    const clearTimers = () => {
      if (idleWarnRef.current) window.clearTimeout(idleWarnRef.current)
      if (idleEndRef.current) window.clearTimeout(idleEndRef.current)
      idleWarnRef.current = null
      idleEndRef.current = null
    }
    clearTimers()
    if (ended) return
    idleWarnRef.current = window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: 'bot', text: 'Are you still there?', ts: Date.now() },
      ])
    }, IDLE_MS)
    idleEndRef.current = window.setTimeout(() => {
      setEnded(true)
      setSuggestedReplies(['Satisfied', 'Unsatisfied'])
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: 'bot', text: 'Ending the conversation due to inactivity.', ts: Date.now() },
        { id: crypto.randomUUID(), role: 'bot', text: 'How was your experience?', ts: Date.now() },
      ])
    }, IDLE_MS + GRACE_MS)
    return clearTimers
  }, [messages, typing, ended])

  return (
    <div className="h-screen overflow-hidden bg-cream text-blue flex flex-col lg:grid lg:grid-cols-[20rem_1fr] xl:grid-cols-[22rem_1fr]">
      <ChatHeaderMobile topic={topic} onBack={() => navigate('/app')} onOpenMenu={() => setSidebarOpen(true)} />

      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ChatSidebar topic={topic} sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <section className="flex flex-col min-h-0 flex-1">
        <ChatHeaderDesktop topic={topic} onBack={() => navigate('/app')} />

        <div ref={listRef} className="flex-1 overflow-y-auto p-3 sm:p-6 lg:pr-10 min-h-0">
          <div className="max-w-4xl mx-auto">
            <ChatMessageList
              messages={messages}
              typing={typing}
              suggestedReplies={suggestedReplies}
              topic={topic}
              onQuickReply={sendUser}
            />
          </div>
        </div>

        <div className="p-3 sm:px-6 sm:pb-4 bg-white border-t border-gray-100 lg:border-t-0 lg:bg-transparent">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={onSubmit}
            ended={ended}
          />
        </div>
      </section>
    </div>
  )
}


