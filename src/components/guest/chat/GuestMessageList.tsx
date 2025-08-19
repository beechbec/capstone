import { FiClock } from 'react-icons/fi'
import { resolveFlowFromTopic, flows } from '../../../chat'
import { faqsFlow as guestFaqsFlow } from '../../../chat/flows/GuestFaqs'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

export default function GuestMessageList({
  messages,
  typing,
  suggestedReplies,
  topic,
  onQuickReply,
}: {
  messages: Message[]
  typing: boolean
  suggestedReplies: string[] | null
  topic: string
  onQuickReply: (q: string) => void
}) {
  return (
    <>
      {messages.map((m, idx) => {
        const isLastBot = m.role === 'bot' && idx === messages.length - 1
        return (
          <div key={m.id}>
            <div className={`mt-4 flex ${m.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
              <div className="max-w-[85%] sm:max-w-[75%]">
                <div className={`inline-block w-full break-words rounded-2xl px-3 py-3 sm:px-4 border shadow-sm text-left ${m.role === 'bot' ? 'bg-white border-blue/20 text-blue' : 'bg-blue text-white border-blue'}`}>
                  <p className="text-sm sm:text-base leading-relaxed text-left">{m.text}</p>
                </div>
                <div className={`mt-1 flex items-center gap-1 text-xs text-gray-500 px-1 ${m.role === 'bot' ? '' : 'justify-end'}`}>
                  <FiClock className="h-3 w-3" />
                  <span>{new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            {isLastBot && (
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                {(
                  suggestedReplies ?? (() => {
                    const lower = topic.toLowerCase()
                    const flow = lower.includes('place')
                      ? flows['guest-place-order']
                      : lower.includes('faq')
                      ? guestFaqsFlow
                      : resolveFlowFromTopic(topic)
                    const ctx = { topic: flow.title }
                    const q = flow.quickReplies(ctx)
                    return Array.isArray(q) ? (q as string[]) : []
                  })()
                ).map((q) => (
                  <button
                    key={q}
                    onClick={() => onQuickReply(q)}
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
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-200" />
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-400" />
        </div>
      )}
    </>
  )
}


