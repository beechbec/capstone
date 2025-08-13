import type { ChatFlow } from '../types'

export const faqsFlow: ChatFlow = {
  id: 'faqs',
  title: 'FAQs',
  initial: () => [{ role: 'bot', text: 'Select a frequently asked question to get started.' }],
  quickReplies: () => ['Pricing', 'Turnaround Time', 'File Formats', 'End Chat'],
  respond: async (_ctx, input) => {
    const answers: Record<string, string> = {
      Pricing: 'Pricing depends on quantity, material, and finish.',
      'Turnaround Time': 'Most jobs complete within 3–5 business days.',
      'File Formats': 'We accept PDF, AI, PSD. Print-ready with bleed is preferred.',
      'End Chat': 'Thanks for chatting! Come back anytime.',
    }
    return { messages: [{ role: 'bot', text: answers[input] ?? 'I’ll get that FAQ soon.' }] }
  },
}