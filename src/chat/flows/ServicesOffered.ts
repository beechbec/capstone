import type { BotMessage, ChatFlow, FlowContext } from '../types'
import { listActiveServicesForChat } from '../../data/services'

const intro = `Here are our currently offered services. Select a category to explore more, or ask me about placing an order.`

function formatList(items: string[]): string {
  if (!items.length) return 'No active services at the moment.'
  return ['Active Services:', ...items.map((s, i) => `${i + 1}. ${s}`)].join('\n')
}

export const servicesOfferedFlow: ChatFlow = {
  id: 'services',
  title: 'Services Offered',
  initial: (_ctx: FlowContext) => {
    const items = listActiveServicesForChat()
    const msgs: BotMessage[] = [
      { role: 'bot', text: intro },
      { role: 'bot', text: formatList(items) },
    ]
    return msgs
  },
  quickReplies: () => ['Place an Order', 'Back', 'End Chat'],
  respond: async (_ctx, userInput) => {
    const text = userInput.toLowerCase()
    if (text.includes('place')) {
      return {
        messages: [
          { role: 'bot', text: 'Placing an order requires you to sign in. Please sign in to proceed.' },
        ],
        quickReplies: ['Sign In', 'Back', 'End Chat'],
      }
    }
    if (text.includes('sign in')) {
      return {
        messages: [
          { role: 'bot', text: 'Navigate to Sign In via the header or go to /signin to continue.' },
        ],
      }
    }
    if (text.includes('back')) {
      return { messages: [{ role: 'bot', text: 'What would you like to do next?' }] }
    }
    if (text.includes('end')) {
      return { messages: [{ role: 'bot', text: 'Thanks for chatting with Printy!' }] }
    }
    // default echo
    return { messages: [{ role: 'bot', text: "Please choose one of the options: 'Place an Order', 'Back', or 'End Chat'." }] }
  },
}


