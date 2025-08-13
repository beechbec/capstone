// Lightweight scaffold for Firebase integration.
// Replace these placeholders with real Firebase SDK calls when ready.

export type AuthUser = {
  uid: string
  email?: string | null
  displayName?: string | null
  role?: string | null
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    (import.meta as any).env?.VITE_FIREBASE_API_KEY &&
      (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN
  )
}

// TODO(auth): Implement using Firebase SDK: initializeApp(config) and getAuth().
export async function initializeFirebaseApp(): Promise<void> {
  // Intentionally empty for prototype. Implement once firebase is installed.
}

// TODO(auth): Implement using signInWithEmailAndPassword from 'firebase/auth'.
export async function firebaseSignInWithEmail(_email: string, _password: string): Promise<AuthUser> {
  throw new Error('Firebase not configured yet. Install and wire SDK.')
}

// TODO(auth): Implement using createUserWithEmailAndPassword from 'firebase/auth'.
export async function firebaseSignUpWithEmail(_email: string, _password: string): Promise<AuthUser> {
  throw new Error('Firebase not configured yet. Install and wire SDK.')
}

// TODO(auth): Implement using signInWithPopup(new GoogleAuthProvider()).
export async function firebaseSignInWithGoogle(): Promise<AuthUser> {
  throw new Error('Firebase not configured yet. Install and wire SDK.')
}

// TODO(auth): Implement using signOut() from 'firebase/auth'.
export async function firebaseSignOut(): Promise<void> {
  throw new Error('Firebase not configured yet. Install and wire SDK.')
}


