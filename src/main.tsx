import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Chat from './components/customer/chat/Chat'
import CustHome from './pages/customer/CustHome'
import AccountSettings from './pages/customer/AccountSettings'
import AdminDashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/Orders'
import AdminPortfolio from './pages/admin/Portfolio'
// import { AuthProvider } from './context/AuthContext'
// import RequireAuth from './components/RequireAuth'

// TODO(auth): Initialize Firebase in `src/lib/firebase.ts` and provide AuthContext; optionally init Supabase in `src/lib/supabase.ts` for DB/storage.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider> */}
      <BrowserRouter>
        {/* TODO(authz): Protect '/app' and '/chat' with a <RequireAuth> wrapper; check roles via Firebase custom claims or Supabase 'profiles'. */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/app" element={<RequireAuth><CustHome /></RequireAuth>} />
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} /> */}
          <Route path="/app" element={<CustHome />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/portfolio" element={<AdminPortfolio />} />
        </Routes>
      </BrowserRouter>
    {/* </AuthProvider> */}
  </StrictMode>
)
