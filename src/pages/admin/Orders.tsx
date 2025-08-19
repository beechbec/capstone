import { useState } from 'react'
import Header from '../../components/shared/Header'
import { ORDER_STATUSES, RECENT_ORDERS, updateOrderStatus } from '../../data/orders'

export default function AdminOrders() {
  const [orders, setOrders] = useState(RECENT_ORDERS)
  return (
    <div className="min-h-screen bg-cream text-blue">
      <Header hideAuthActions />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold">Orders</h1>
        <div className="mt-6 bg-white rounded-xl border border-blue/20 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-cream/50 border-b border-blue/20">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Service</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-blue/10">
                  <td className="p-3 font-semibold">{o.id}</td>
                  <td className="p-3">{o.customerName}</td>
                  <td className="p-3">{o.servicePath}</td>
                  <td className="p-3">
                    <select
                      className="border border-blue/30 rounded px-2 py-1"
                      value={o.status}
                      onChange={(e) => {
                        updateOrderStatus(o.id, e.target.value as any)
                        setOrders([...RECENT_ORDERS])
                      }}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}


