import type { BotMessage, ChatFlow } from '../types'
import { formatContactForChat } from '../../data/contacts'

export const faqsFlow: ChatFlow = {
  id: 'faqs',
  title: 'FAQs',
  initial: () => [{ role: 'bot', text: 'Select a frequently asked question to get started.' }],
  quickReplies: () => ['Pricing', 'Turnaround Time', 'File Formats', 'Open a Ticket', 'End Chat'],
  respond: async (_ctx, input) => {
    const answers: Record<string, BotMessage[]> = {
      Pricing: [{ role: 'bot', text: 'Pricing depends on quantity, material, and finish.' }],
      'Turnaround Time': [{ role: 'bot', text: 'Most jobs complete within 3–5 business days.' }],
      'File Formats': [{ role: 'bot', text: 'We accept PDF, AI, PSD. Print-ready with bleed is preferred.' }],
      'Open a Ticket': [
        { role: 'bot', text: 'Creating a support ticket for your issue. Ticket ID: TKT-000002 (mock).' },
        { role: 'bot', text: 'You can track it later via Track a Ticket.' },
      ],
      'End Chat': [{ role: 'bot', text: 'Thanks for chatting! Come back anytime.' }],
    }
    const found = answers[input]
    if (found) return { messages: found }
    return { messages: [
      { role: 'bot', text: "I didn't understand that. Here are our contact details:" },
      { role: 'bot', text: formatContactForChat() },
    ] }
  },
}