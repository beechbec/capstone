import type { ChatFlow } from '../types'
import { aboutFlow } from './AboutUs'
import { faqsFlow } from './Faqs'

export const flows: Record<string, ChatFlow> = {
  about: aboutFlow,
  faqs: faqsFlow,
}

export function resolveFlowFromTopic(topicParam: string | null | undefined): ChatFlow {
  const normalized = (topicParam || 'about').toLowerCase()
  if (normalized.includes('about')) return aboutFlow
  if (normalized.includes('faq')) return faqsFlow
  return aboutFlow
}