import { FiPaperclip, FiSend } from 'react-icons/fi'

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  ended,
}: {
  value: string
  onChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  ended: boolean
}) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="
          flex-1 h-11 rounded-lg border border-blue/20 bg-white px-3 text-base
          outline-none focus:ring-2 focus:ring-blue focus:border-blue
          placeholder:text-gray-400
          transition-all duration-150
        "
        disabled={ended}
      />
      <button 
        type="submit" 
        disabled={!value.trim() || ended}
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
  )
}


