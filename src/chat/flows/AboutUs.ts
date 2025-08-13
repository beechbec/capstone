import type { ChatFlow } from '../types'

export const aboutFlow: ChatFlow = {
  id: 'about',
  title: 'About Us',
  initial: () => [
    { role: 'bot', text: 'Hello! I am Printy, your virtual assistant!' },
    { role: 'bot', text: 'What would you like to know about B.J. Santiago Inc.?' },
  ],
  quickReplies: () => ['Company History', 'Our Mission', 'Location & Hours', 'Contact Info', 'End Chat'],
  respond: async (_ctx, input) => {
    const map: Record<string, string> = {
      'Company History': 'B.J. Santiago Inc. has been serving Philippine businesses for over 33 years with trusted printing solutions.',
      'Our Mission': 'To deliver reliable, high-quality print services while providing responsive customer support through Printy.',
      'Location & Hours': 'We are located in the Philippines. Office hours: Mon–Fri, 9:00 AM – 6:00 PM.',
      'Contact Info': 'You can reach us via email or phone. Detailed contact channels will appear here.',
      'End Chat': 'Thanks for chatting! If you have more questions, I’m here to help anytime.',
    }
    const text = map[input] ?? 'Thanks! I’ll share more details soon.'
    return { messages: [{ role: 'bot', text }] }
  },
}


