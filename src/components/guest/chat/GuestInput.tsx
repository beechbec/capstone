import { FiPaperclip } from 'react-icons/fi'

export default function GuestInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <>
      <button type="button" className="h-11 w-11 grid place-items-center rounded-lg border border-blue/20 bg-white text-blue hover:bg-blue/5 hover:border-blue/30 focus:outline-none focus:ring-2 focus:ring-blue/50 focus:ring-offset-1 transition-colors duration-150 touch-manipulation" aria-label="Attach file">
        <FiPaperclip />
      </button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 h-11 rounded-lg border border-blue/20 bg-white px-3 text-base outline-none focus:ring-2 focus:ring-blue focus:border-blue placeholder:text-gray-400 transition-all duration-150"
      />
    </>
  )
}


