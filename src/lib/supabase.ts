// Lightweight scaffold for Supabase integration.
// Replace these placeholders with real @supabase/supabase-js client when ready.
import { hasSupabaseEnv } from '../config/env'

export type SupabaseClient = unknown

export function isSupabaseConfigured(): boolean {
  return hasSupabaseEnv()
}

// TODO(db): Implement by creating supabase client with createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
export function getSupabaseClient(): SupabaseClient {
  throw new Error('Supabase not configured yet. Install and wire SDK.')
}

// Example typed helpers to guide future usage
export type Conversation = {
  id: string
  user_id: string
  title: string
  created_at: string
}

export async function listUserConversations(_userId: string): Promise<Conversation[]> {
  // TODO(db): return await supabase.from('conversations').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  return []
}

export async function upsertMessage(): Promise<void> {
  // TODO(db): Insert message into 'messages' with conversation_id, role, text
}

export type Province = { id: string; name: string }
export type City = { id: string; name: string; province_id: string }

export async function fetchProvinces(): Promise<Province[]> {
  // TODO(db): return await supabase.from('provinces').select('id,name').order('name')
  return []
}

export async function fetchCitiesByProvince(_provinceId: string): Promise<City[]> {
  // TODO(db): return await supabase.from('cities').select('id,name,province_id').eq('province_id', provinceId).order('name')
  return []
}


