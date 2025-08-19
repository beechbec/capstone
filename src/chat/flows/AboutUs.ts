import type { BotMessage, ChatFlow } from '../types'
import { formatContactForChat } from '../../data/contacts'

export const aboutFlow: ChatFlow = {
  id: 'about',
  title: 'About Us',
  initial: () => [
    { role: 'bot', text: 'Welcome to B.J. Santiago Inc. — established in 1992 in Sampaloc, Manila.' },
    { role: 'bot', text: 'What would you like to know?' },
  ],
  quickReplies: () => ['Company History', 'Our Mission', 'Location & Hours', 'Contact Info', 'Open a Ticket', 'End Chat'],
  respond: async (_ctx, input) => {
    const responses: Record<string, BotMessage[]> = {
      'Company History': [
        { role: 'bot', text: 'Founded in 1992, B.J. Santiago Inc. has served numerous clients with offset, large-format, and digital printing.' },
      ],
      'Our Mission': [
        { role: 'bot', text: 'We provide cost-effective printing built on creative originality, consistent quality, reliable timeliness, and innovative technology.' },
      ],
      'Location & Hours': [
        { role: 'bot', text: 'Sampaloc, Manila. Business Hours: Mon–Sat, 9:00 AM – 6:00 PM.' },
      ],
      'Contact Info': [
        { role: 'bot', text: formatContactForChat() },
      ],
      'Open a Ticket': [
        { role: 'bot', text: 'Sure — creating a support ticket. Ticket ID: TKT-000001 (mock).' },
        { role: 'bot', text: 'Our team will reach out soon. You may Track a Ticket from the chat home.' },
      ],
      'End Chat': [
        { role: 'bot', text: 'Thanks for chatting! If you have more questions, I’m here to help anytime.' },
      ],
    }
    const found = responses[input]
    if (found) return { messages: found }
    return { messages: [
      { role: 'bot', text: "I didn't catch that. You can view Contact Info or Open a Ticket for assistance." },
      { role: 'bot', text: formatContactForChat() },
    ] }
  },
}


