import type { ChatFlow } from '../types'
import { aboutUsFlow } from './AboutUs'
import { faqsFlow } from './Faqs'
import { servicesOfferedFlow } from './ServicesOffered'
import { placeOrderFlow } from './PlaceOrder'
import { trackTicketFlow } from './TrackTicket'
import { guestPlaceOrderFlow } from './GuestPlaceOrder'

export const flows: Record<string, ChatFlow> = {
  about: aboutUsFlow,
  faqs: faqsFlow,
  services: servicesOfferedFlow,
  'place-order': placeOrderFlow,
  'track-ticket': trackTicketFlow,
  'guest-place-order': guestPlaceOrderFlow,
}

export function resolveFlowFromTopic(topicParam: string | null | undefined): ChatFlow {
  const normalized = (topicParam || 'about').toLowerCase()
  if (normalized.includes('about')) return aboutUsFlow
  if (normalized.includes('faq')) return faqsFlow
  if (normalized.includes('service')) return servicesOfferedFlow
  if (normalized.includes('place')) return placeOrderFlow
  if (normalized.includes('guest-place')) return guestPlaceOrderFlow
  if (normalized.includes('ticket') || normalized.includes('track')) return trackTicketFlow
  return aboutUsFlow
}