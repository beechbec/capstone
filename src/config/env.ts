// Centralized Vite env reader with light typing and helpers

type ViteEnv = {
  [key: string]: string | boolean | undefined
}

const viteEnv: ViteEnv = (import.meta as any)?.env ?? {}

function readEnvString(name: string, fallback = ''): string {
  const value = viteEnv[name]
  return typeof value === 'string' ? value : fallback
}

export type FirebaseEnv = {
  apiKey: string
  authDomain: string
  projectId: string
  appId: string
  messagingSenderId?: string
  storageBucket?: string
  measurementId?: string
}

export type SupabaseEnv = {
  url: string
  anonKey: string
}

export const env = {
  firebase: {
    apiKey: readEnvString('VITE_FIREBASE_API_KEY'),
    authDomain: readEnvString('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: readEnvString('VITE_FIREBASE_PROJECT_ID'),
    appId: readEnvString('VITE_FIREBASE_APP_ID'),
    messagingSenderId: readEnvString('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    storageBucket: readEnvString('VITE_FIREBASE_STORAGE_BUCKET'),
    measurementId: readEnvString('VITE_FIREBASE_MEASUREMENT_ID'),
  } as FirebaseEnv,
  supabase: {
    url: readEnvString('VITE_SUPABASE_URL'),
    anonKey: readEnvString('VITE_SUPABASE_ANON_KEY'),
  } as SupabaseEnv,
}

export function hasFirebaseEnv(): boolean {
  return Boolean(env.firebase.apiKey && env.firebase.authDomain && env.firebase.projectId && env.firebase.appId)
}

export function hasSupabaseEnv(): boolean {
  return Boolean(env.supabase.url && env.supabase.anonKey)
}


