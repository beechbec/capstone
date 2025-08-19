import { Link } from 'react-router-dom'
import Header from '../../components/shared/Header'
import { RECENT_ORDERS } from '../../data/orders'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-cream text-blue">
      <Header hideAuthActions />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          <section className="bg-white rounded-xl border border-blue/20 p-4">
            <h2 className="font-heading font-bold text-lg mb-3">Recent Orders</h2>
            <ul className="space-y-2">
              {RECENT_ORDERS.map((o) => (
                <li key={o.id} className="flex items-center justify-between text-sm">
                  <span className="truncate mr-2">{o.id} — {o.customerName}</span>
                  <span className="rounded-full bg-cream px-2 py-0.5 text-xs">{o.status}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-right">
              <Link to="/admin/orders" className="text-gold font-semibold">Manage Orders →</Link>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-blue/20 p-4">
            <h2 className="font-heading font-bold text-lg mb-3">Services Offered</h2>
            <p className="text-sm">View current catalog entries and their statuses.</p>
            <div className="mt-3 text-right">
              <Link to="/admin/portfolio" className="text-gold font-semibold">Manage Portfolio →</Link>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-blue/20 p-4">
            <h2 className="font-heading font-bold text-lg mb-3">Portfolio Status</h2>
            <p className="text-sm">Activate, deactivate, or retire services.</p>
            <div className="mt-3 text-right">
              <Link to="/admin/portfolio" className="text-gold font-semibold">Open Portfolio →</Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


