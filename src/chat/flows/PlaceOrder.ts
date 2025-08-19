import type { BotMessage, ChatFlow, FlowContext } from '../types'
import { getCurrentUser } from '../../data/auth'

function requireAuthMessages(): BotMessage[] {
  return [
    { role: 'bot', text: 'You must sign in to place an order.' },
    { role: 'bot', text: 'Please go to Sign In and return to continue.' },
  ]
}

export const placeOrderFlow: ChatFlow = {
  id: 'place-order',
  title: 'Place an Order',
  initial: (_ctx: FlowContext) => {
    const user = getCurrentUser()
    if (!user) {
      return [
        ...requireAuthMessages(),
        { role: 'bot', text: 'Use the Sign In button above to continue.' },
      ]
    }
    const msgs: BotMessage[] = [
      { role: 'bot', text: 'Great! Let’s set up your order. Which service would you like?' },
      { role: 'bot', text: 'Examples: Digital Printing › Certificate › Standard Certificates OR Commercial Printing › Invoice › Carbonless Invoice Forms' },
    ]
    return msgs
  },
  quickReplies: () => ['Attach File (mock)', 'End Chat'],
  respond: async (_ctx, userInput) => {
    const user = getCurrentUser()
    if (!user) {
      return { messages: requireAuthMessages(), quickReplies: ['Sign In', 'Back', 'End Chat'] }
    }
    // Very simple mock parsing: collect one field per turn
    const messages: BotMessage[] = []
    const lower = userInput.toLowerCase()
    if (lower.includes('attach')) {
      messages.push({ role: 'bot', text: 'File attached (mock).' })
      messages.push({ role: 'bot', text: 'Please provide quantity (e.g., 500).' })
      return { messages }
    }
    if (/\b\d+\b/.test(lower)) {
      messages.push({ role: 'bot', text: 'Got it. What size do you prefer? (e.g., A4, Letter)' })
      return { messages }
    }
    if (lower.includes('a4') || lower.includes('letter') || lower.includes('size')) {
      messages.push({ role: 'bot', text: 'Noted. What material/paper? (e.g., 120gsm matte)' })
      return { messages }
    }
    if (lower.includes('gsm') || lower.includes('paper') || lower.includes('material')) {
      messages.push({ role: 'bot', text: 'Color? (e.g., Full color, Black & White)' })
      return { messages }
    }
    if (lower.includes('color')) {
      messages.push({ role: 'bot', text: 'Finish? (e.g., Matte, Glossy)' })
      return { messages }
    }
    if (lower.includes('matte') || lower.includes('glossy') || lower.includes('finish')) {
      messages.push({ role: 'bot', text: 'When do you need it? (e.g., 2–3 business days)' })
      return { messages }
    }
    if (lower.includes('day') || lower.includes('week')) {
      const tier = user.tier || 'regular'
      const orderId = `ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
      if (tier === 'valued') {
        messages.push({ role: 'bot', text: `Order created: ${orderId}. As a valued customer, your order is prioritized. We’ll notify you when it’s ready for pickup or delivery.` })
      } else {
        messages.push({ role: 'bot', text: `Order created: ${orderId}. Please wait for a quotation and payment instructions.` })
      }
      return { messages }
    }
    return { messages: [{ role: 'bot', text: 'Please provide your order details step-by-step. You can start by attaching a file (mock) or sending your quantity.' }] }
  },
}


