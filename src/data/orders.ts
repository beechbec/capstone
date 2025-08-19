export type OrderStatus =
  | 'Pending'
  | 'Quoted'
  | 'Awaiting Payment'
  | 'Processing'
  | 'Ready'
  | 'Released'
  | 'Completed'
  | 'Cancelled'

export type OrderRecord = {
  id: string
  customerName: string
  servicePath: string
  status: OrderStatus
  createdAt: string
}

export const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Quoted',
  'Awaiting Payment',
  'Processing',
  'Ready',
  'Released',
  'Completed',
  'Cancelled',
]

export const RECENT_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-000231',
    customerName: 'Regular Customer',
    servicePath: 'Commercial Printing › Invoice › Carbonless Invoice Forms',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ORD-000145',
    customerName: 'Valued Customer',
    servicePath: 'Digital Printing › Certificate › Standard Certificates',
    status: 'Processing',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const found = RECENT_ORDERS.find((o) => o.id === id)
  if (found) found.status = status
}


