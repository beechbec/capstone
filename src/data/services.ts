export type ServiceStatus = 'active' | 'inactive' | 'retired'

export type ServiceCategory = {
  id: string
  name: string
  subcategories: Array<{
    id: string
    name: string
    services: Array<{
      id: string
      name: string
      status: ServiceStatus
      description?: string
    }>
  }>
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'digital-printing',
    name: 'Digital Printing',
    subcategories: [
      {
        id: 'certificate',
        name: 'Certificate',
        services: [
          {
            id: 'certificates-standard',
            name: 'Standard Certificates',
            status: 'active',
            description:
              'Quick-turn digital certificate printing for events and recognitions. Paper, size, and finish configurable.',
          },
        ],
      },
    ],
  },
  {
    id: 'commercial-printing',
    name: 'Commercial Printing',
    subcategories: [
      {
        id: 'invoice',
        name: 'Invoice',
        services: [
          {
            id: 'invoice-forms-carbonless',
            name: 'Carbonless Invoice Forms',
            status: 'active',
            description:
              'Custom NCR (carbonless) invoice books with company branding and numbering.',
          },
        ],
      },
    ],
  },
]

export function listActiveServicesForChat(): string[] {
  const items: string[] = []
  for (const cat of SERVICE_CATEGORIES) {
    for (const sub of cat.subcategories) {
      for (const svc of sub.services) {
        if (svc.status === 'active') {
          items.push(`${cat.name} › ${sub.name} › ${svc.name}`)
        }
      }
    }
  }
  return items
}


