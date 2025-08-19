import type { ChatFlow } from './types'
import { aboutUsFlow } from './flows/AboutUs'
import { faqsFlow } from './flows/Faqs'
import { faqsFlow as guestFaqsFlow } from './flows/GuestFaqs'
import { servicesOfferedFlow } from './flows/ServicesOffered'
import { placeOrderFlow } from './flows/PlaceOrder'
import { guestPlaceOrderFlow } from './flows/GuestPlaceOrder'
import { issueTicketFlow } from './flows/IssueTicket'

export const flows: Record<string, ChatFlow> = {
  about: aboutUsFlow,
  faqs: faqsFlow,
  'guest-faqs': guestFaqsFlow,
  services: servicesOfferedFlow,
  'place-order': placeOrderFlow,
  'guest-place-order': guestPlaceOrderFlow,
  'issue-ticket': issueTicketFlow,
}

export function resolveFlowFromTopic(topicParam: string | null | undefined): ChatFlow {
  const normalized = (topicParam || 'about').toLowerCase()
  if (normalized.includes('about')) return aboutUsFlow
  if (normalized.includes('faq')) return faqsFlow
  if (normalized.includes('guest-faq')) return guestFaqsFlow
  if (normalized.includes('service')) return servicesOfferedFlow
  if (normalized.includes('place')) return placeOrderFlow
  if (normalized.includes('guest-place')) return guestPlaceOrderFlow
  if (normalized.includes('issue')) return issueTicketFlow
  return aboutUsFlow
}