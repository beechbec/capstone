import { FiArrowLeft } from 'react-icons/fi'

export default function ChatHeaderDesktop({ topic, onBack }: { topic: string; onBack: () => void }) {
  return (
    <div className="hidden lg:flex h-14 border-b border-gray-100 bg-white items-center gap-3 px-6">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-blue font-semibold hover:text-blue/80 transition-colors">
        <FiArrowLeft /> Back
      </button>
      <div className="mx-auto font-heading font-bold">{topic}</div>
      <div className="w-[72px]" />
    </div>
  )
}


