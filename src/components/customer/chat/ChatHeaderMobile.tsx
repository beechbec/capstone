import { FiArrowLeft, FiMenu } from 'react-icons/fi'

export default function ChatHeaderMobile({ topic, onBack, onOpenMenu }: { topic: string; onBack: () => void; onOpenMenu: () => void }) {
  return (
    <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-blue font-semibold">
        <FiArrowLeft /> Back
      </button>
      <div className="font-heading font-bold text-lg">{topic}</div>
      <button
        onClick={onOpenMenu}
        className="p-2 rounded-lg text-blue hover:bg-blue/10 transition-colors"
        aria-label="Open chat menu"
      >
        <FiMenu className="h-5 w-5" />
      </button>
    </div>
  )
}


