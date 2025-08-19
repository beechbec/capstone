import type { BotMessage, ChatFlow } from '../types'
import { RECENT_ORDERS } from '../../data/orders'

type Option = { label: string; next: string }
type Node = {
  id: string
  message?: string
  question?: string
  answer?: string
  options: Option[]
}

const NODES: Record<string, Node> = {
  issue_ticket_start: {
    id: 'issue_ticket_start',
    message: "Hi! I'm Printy 🤖. What type of issue are you experiencing?",
    options: [
      { label: 'I need help with my order', next: 'order_issue' },
      { label: 'I need help with my payment', next: 'payment_issue' },  
      { label: 'I have another issue', next: 'other_issue' },
      { label: 'End Chat', next: 'end' },
    ],
  },

  order_issue: {
    id: 'order_issue',
    question: 'Order Issue',
    answer: 'Please enter your Order ID or details about your order in the message box below.',
    options: [], // No quick reply options; user must type
  },

  payment_issue: {
    id: 'payment_issue',
    question: 'Payment Issue',
    answer: 'Please provide details about your payment.',
    options: [], // No quick reply options; user must type
  },

  other_issue: {
    id: 'other_issue',
    question: 'Other Issue',
    answer: 'Please provide details about your issue.',
    options: [], // No quick reply options; user must type
  },

  end: {
    id: 'end',
    answer: 'Thank you for chatting with Printy! Have a great day. 👋',
    options: [],
  },
}

let currentNodeId: keyof typeof NODES = 'issue_ticket_start'

function nodeToMessages(node: Node): BotMessage[] {
  if (node.message) return [{ role: 'bot', text: node.message }]
  if (node.answer) return [{ role: 'bot', text: node.answer }]
  return []
}

function nodeQuickReplies(node: Node): string[] {
  return node.options.map((o) => o.label)
}

export const issueTicketFlow: ChatFlow = {
  id: 'issue_ticket',
  title: 'Issue a Ticket',
  initial: () => {
    currentNodeId = 'issue_ticket_start'
    return nodeToMessages(NODES[currentNodeId])
  },
  quickReplies: () => nodeQuickReplies(NODES[currentNodeId]),
  respond: async (_ctx, input) => {
    const current = NODES[currentNodeId]

    // Special handling: when asking for Order ID, allow free-text order lookup
    if (currentNodeId === 'order_issue') {
      const raw = input.trim().toUpperCase()
      const idMatch = raw.match(/ORD[- ]?\d{6}/)
      const normalizedId = idMatch
        ? idMatch[0].replace(' ', '-').replace(/^ORD(?!-)/, 'ORD-')
        : raw

      const found = RECENT_ORDERS.find((o) => o.id.toUpperCase() === normalizedId)
      if (found) {
        const details = `Found order ${found.id} for ${found.customerName}.\nService: ${found.servicePath}\nStatus: ${found.status}\nCreated: ${new Date(found.createdAt).toLocaleString()}`
        return {
          messages: [
            { role: 'bot', text: 'Let me check your Order ID real quick…' },
            { role: 'bot', text: details },
          ],
          quickReplies: ['End Chat'],
        }
      }
      return {
        messages: [
          { role: 'bot', text: 'Let me check your Order ID real quick…' },
          { role: 'bot', text: `Sorry, I couldn’t find an order with ID “${input.trim()}”. Please double-check the ID (e.g., ORD-000145) or provide more details.` },
        ],
        quickReplies: [],
      }
    }

    // Default node-based navigation via quick replies
    const selection = current.options.find(
      (o) => o.label.toLowerCase() === input.trim().toLowerCase()
    )
    if (!selection) {
      return {
        messages: [{ role: 'bot', text: 'Please choose one of the options.' }],
        quickReplies: nodeQuickReplies(current),
      }
    }
    currentNodeId = selection.next as keyof typeof NODES
    const node = NODES[currentNodeId]
    const messages = nodeToMessages(node)
    const quickReplies = nodeQuickReplies(node)
    if (currentNodeId === 'end') {
      return { messages, quickReplies: ['End Chat'] }
    }
    return { messages, quickReplies }
  },
}