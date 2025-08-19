import { resolveFlowFromTopic } from '../../../chat'
import ChatMessageBubble from './ChatMessageBubble.tsx'

type Message = {
  id: string
  role: 'bot' | 'user'
  text: string
  ts: number
}

export default function ChatMessageList({
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
    <div>
      {messages.map((m, idx) => {
        const isLastBot = m.role === 'bot' && idx === messages.length - 1
        return (
          <div key={m.id}>
            <ChatMessageBubble role={m.role} text={m.text} ts={m.ts} />
            {isLastBot && (
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
                {(
                  suggestedReplies ?? (
                    Array.isArray(resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }))
                      ? (resolveFlowFromTopic(topic).quickReplies({ topic: resolveFlowFromTopic(topic).title }) as string[])
                      : []
                  )
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
          <div className="flex items-end gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-200" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold animate-dot animation-delay-400" />
          </div>
        </div>
      )}
    </div>
  )
}


