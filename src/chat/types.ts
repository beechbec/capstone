export type Role = 'bot' | 'user'

export type BotMessage = {
  role: Role
  text: string
}

export type FlowContext = {
  topic: string
}

export interface ChatFlow {
  id: string
  title: string
  initial: (ctx: FlowContext) => Promise<BotMessage[]> | BotMessage[]
  quickReplies: (ctx: FlowContext) => Promise<string[]> | string[]
  respond: (ctx: FlowContext, userInput: string) => Promise<{ messages: BotMessage[]; quickReplies?: string[] }>
}