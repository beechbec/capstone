import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import CustHome from './pages/CustHome'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'

// TODO(auth): Initialize Firebase in `src/lib/firebase.ts` and provide AuthContext; optionally init Supabase in `src/lib/supabase.ts` for DB/storage.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        {/* TODO(authz): Protect '/app' and '/chat' with a <RequireAuth> wrapper; check roles via Firebase custom claims or Supabase 'profiles'. */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app" element={<RequireAuth><CustHome /></RequireAuth>} />
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
