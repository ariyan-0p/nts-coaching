import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    document.title = 'Admin Login | NTS'
    // If already logged in, redirect
    if (localStorage.getItem('nts_admin_token')) navigate('/admin')
  }, [navigate])

  const onSubmit = async ({ username, password }) => {
    try {
      // When backend is ready:
      // const res = await fetch('/api/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, password }) })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message)
      // localStorage.setItem('nts_admin_token', data.token)

      // Temporary mock auth
      await new Promise(r => setTimeout(r, 800))
      if (username === 'admin' && password === 'nts@2025') {
        localStorage.setItem('nts_admin_token', 'mock_token_replace_with_jwt')
        toast.success('Welcome back, Admin!')
        navigate('/admin')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      toast.error(err.message || 'Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 500, background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1, padding: '0 20px' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
            Ankit <span style={{ color: 'var(--red)' }}>Khare</span>
          </div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '36px 32px' }}>
          {/* Lock icon */}
          <div style={{ width: 52, height: 52, background: 'var(--red-dim)', border: '1px solid var(--border-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
            <Lock size={22} color="var(--red)" />
          </div>

          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', color: 'var(--text)', marginBottom: 6 }}>
            Admin Login
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: 28, fontWeight: 300 }}>
            Authorized personnel only
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--text-dim)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className="form-input"
                  placeholder="Enter username"
                  style={{ paddingLeft: 40 }}
                  {...register('username', { required: 'Username is required' })}
                />
              </div>
              {errors.username && <span className="form-error">{errors.username.message}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="var(--text-dim)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter password"
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  {...register('password', { required: 'Password is required' })}
                />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary"
              disabled={isSubmitting}
              style={{ justifyContent: 'center', width: '100%', padding: '14px', opacity: isSubmitting ? 0.7 : 1, marginTop: 4 }}
            >
              {isSubmitting ? 'Signing in...' : <><LogIn size={16} /> Sign In</>}
            </button>
          </form>

          <div style={{ marginTop: 20, padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Demo: admin / nts@2025
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          <a href="/" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >← Back to Website</a>
        </p>
      </motion.div>
    </div>
  )
}