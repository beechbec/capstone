import type { BotMessage, ChatFlow, FlowContext } from '../types'
import { formatContactForChat } from '../../data/contacts'

function ticketId(): string {
  const n = Math.floor(Math.random() * 1000000)
  return `TKT-${n.toString().padStart(6, '0')}`
}

export const fallbackFlow: ChatFlow = {
  id: 'fallback',
  title: 'Help & Support',
  initial: (_ctx: FlowContext) => {
    const msgs: BotMessage[] = [
      { role: 'bot', text: "I didn't quite get that. You can contact us directly or open a support ticket." },
      { role: 'bot', text: formatContactForChat() },
    ]
    return msgs
  },
  quickReplies: () => ['Open a Ticket', 'Contact Us', 'Back', 'End Chat'],
  respond: async (_ctx, userInput) => {
    const text = userInput.toLowerCase()
    if (text.includes('ticket')) {
      const id = ticketId()
      return {
        messages: [
          { role: 'user', text: 'Open a Ticket' },
          { role: 'bot', text: `Your support ticket has been created. Ticket ID: ${id}` },
          { role: 'bot', text: 'Our team will contact you shortly. You can track a ticket from the chat home.' },
        ],
        quickReplies: ['Track a Ticket', 'Back', 'End Chat'],
      }
    }
    if (text.includes('contact')) {
      return { messages: [{ role: 'bot', text: formatContactForChat() }] }
    }
    if (text.includes('track')) {
      return { messages: [{ role: 'bot', text: 'To track a ticket, provide your name and Ticket ID in the Track Ticket flow.' }] }
    }
    if (text.includes('end')) {
      return { messages: [{ role: 'bot', text: 'Thanks for chatting with Printy!' }] }
    }
    return { messages: [{ role: 'bot', text: "Please choose 'Open a Ticket' or 'Contact Us'." }] }
  },
}


