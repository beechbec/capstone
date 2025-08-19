import { FiClock } from 'react-icons/fi'

export default function ChatMessageBubble({ role, text, ts }: { role: 'bot' | 'user'; text: string; ts: number }) {
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


