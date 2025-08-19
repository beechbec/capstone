import type { BotMessage, ChatFlow, FlowContext } from '../types'

export const guestPlaceOrderFlow: ChatFlow = {
  id: 'guest-place-order',
  title: 'Place an Order (Guest)',
  initial: (_ctx: FlowContext) => {
    const msgs: BotMessage[] = [
      { role: 'bot', text: 'You need to sign in to place an order.' },
      { role: 'bot', text: 'Please Sign In or create an account to continue.' },
    ]
    return msgs
  },
  quickReplies: () => ['Sign In', 'Sign Up', 'Back', 'End Chat'],
  respond: async (_ctx, userInput) => {
    const text = userInput.toLowerCase()
    if (text.includes('sign in')) {
      return { messages: [{ role: 'bot', text: 'Redirecting you to Sign In…' }] }
    }
    if (text.includes('sign up')) {
      return { messages: [{ role: 'bot', text: 'Redirecting you to Sign Up…' }] }
    }
    if (text.includes('back')) {
      return { messages: [{ role: 'bot', text: 'What would you like to explore next?' }] }
    }
    if (text.includes('end')) {
      return { messages: [{ role: 'bot', text: 'Thanks for chatting with Printy!' }] }
    }
    return { messages: [{ role: 'bot', text: "Please choose 'Sign In', 'Sign Up', 'Back', or 'End Chat'." }] }
  },
}


