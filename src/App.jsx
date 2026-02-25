import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import Preloader from './components/Preloader' // Import your new preloader
import Home from './pages/Home'
import CourseFMP from './pages/CourseFMP'
import CourseSalesMastery from './pages/CourseSalesMastery'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import Testimonials from './pages/admin/Testimonials'
import FormSubmissions from './pages/admin/FormSubmissions'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('nts_admin_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      {/* The Preloader is placed outside the Router to ensure it covers everything */}
      <Preloader />
      
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg-2)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              fontFamily: "'Barlow', sans-serif",
              fontSize: '0.9rem',
            },
            success: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
        <Routes>
          <Route path="/"                               element={<Home />} />
          <Route path="/courses/fmp"                   element={<CourseFMP />} />
          <Route path="/courses/sales-mastery"         element={<CourseSalesMastery />} />
          <Route path="/admin/login"                   element={<AdminLogin />} />
          <Route path="/admin"                         element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/testimonials"            element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
          <Route path="/admin/submissions"             element={<ProtectedRoute><FormSubmissions /></ProtectedRoute>} />
          <Route path="*"                               element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}