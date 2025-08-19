import type { BotMessage, ChatFlow, FlowContext } from '../types'

type Ticket = {
  id: string
  name: string
  status: 'Pending' | 'Quoted' | 'Awaiting Payment' | 'Processing' | 'Ready' | 'Released' | 'Completed' | 'Cancelled'
  leadTime?: string
}

// In-memory mock tickets
const TICKETS: Ticket[] = [
  { id: 'TKT-000101', name: 'Alex Regular', status: 'Quoted' },
  { id: 'TKT-000202', name: 'Vera Valued', status: 'Ready', leadTime: 'Pickup within 1 business day' },
]

export const trackTicketFlow: ChatFlow = {
  id: 'track-ticket',
  title: 'Track a Ticket',
  initial: (_ctx: FlowContext) => {
    const msgs: BotMessage[] = [
      { role: 'bot', text: 'To track a ticket, please provide your full name and Ticket ID (e.g., TKT-000123).' },
      { role: 'bot', text: 'Example: Alex Regular, TKT-000101' },
    ]
    return msgs
  },
  quickReplies: () => ['Back', 'End Chat'],
  respond: async (_ctx, userInput) => {
    const parts = userInput.split(',')
    if (parts.length < 2) {
      return {
        messages: [
          { role: 'bot', text: 'Please send in the format: Full Name, TKT-XXXXXX' },
        ],
      }
    }
    const name = parts[0].trim()
    const id = parts[1].trim().toUpperCase()
    const ticket = TICKETS.find((t) => t.id === id && t.name.toLowerCase() === name.toLowerCase())
    if (!ticket) {
      return { messages: [{ role: 'bot', text: 'Sorry, we could not find a ticket matching that name and ID.' }] }
    }
    const lines = [
      `Ticket ${ticket.id}`,
      `Name: ${ticket.name}`,
      `Status: ${ticket.status}`,
    ]
    if (ticket.leadTime) lines.push(`Lead Time: ${ticket.leadTime}`)
    lines.push('Thank you!')
    return { messages: [{ role: 'bot', text: lines.join('\n') }] }
  },
}


