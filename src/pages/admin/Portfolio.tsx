import { useState } from 'react'
import Header from '../../components/shared/Header'
import { SERVICE_CATEGORIES } from '../../data/services'
import type { ServiceStatus } from '../../data/services'

export default function AdminPortfolio() {
  const [cats, setCats] = useState(SERVICE_CATEGORIES)
  return (
    <div className="min-h-screen bg-cream text-blue">
      <Header hideAuthActions />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold">Service Portfolio</h1>
        <div className="mt-6 space-y-4">
          {cats.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl border border-blue/20 p-4">
              <h2 className="font-heading font-bold text-lg mb-2">{cat.name}</h2>
              {cat.subcategories.map((sub) => (
                <div key={sub.id} className="mb-3">
                  <h3 className="font-semibold mb-2">{sub.name}</h3>
                  <div className="space-y-2">
                    {sub.services.map((svc) => (
                      <div key={svc.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">{svc.name}</div>
                          <div className="text-xs text-gray-500">{svc.description}</div>
                        </div>
                        <select
                          className="border border-blue/30 rounded px-2 py-1"
                          value={svc.status}
                          onChange={(e) => {
                            svc.status = e.target.value as ServiceStatus
                            setCats([...cats])
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="retired">Retired</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


