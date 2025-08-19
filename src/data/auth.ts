export type UserRole = 'superadmin' | 'admin' | 'customer'
export type CustomerTier = 'regular' | 'valued'

export type UserRecord = {
  id: string
  email: string
  role: UserRole
  tier?: CustomerTier
  firstName?: string
  lastName?: string
}

export const SEEDED_USERS: UserRecord[] = [
  {
    id: 'u-super-1',
    email: 'superadmin@printy.local',
    role: 'superadmin',
  },
  {
    id: 'u-admin-1',
    email: 'admin@printy.local',
    role: 'admin',
  },
  {
    id: 'u-customer-1',
    email: 'customer@printy.local',
    role: 'customer',
    tier: 'regular',
    firstName: 'Alex',
    lastName: 'Regular',
  },
  {
    id: 'u-customer-2',
    email: 'valued@printy.local',
    role: 'customer',
    tier: 'valued',
    firstName: 'Vera',
    lastName: 'Valued',
  },
]

// In-memory auth state for prototype
let currentUser: UserRecord | null = null

export function signInMock(email: string): UserRecord | null {
  const user = SEEDED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  currentUser = user
  return user
}

export function signOutMock(): void {
  currentUser = null
}

export function getCurrentUser(): UserRecord | null {
  return currentUser
}


