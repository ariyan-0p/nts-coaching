import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, FileText, LogOut, ExternalLink, Image } from 'lucide-react'
import toast from 'react-hot-toast'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',      href: '/admin' },
  { icon: Image,           label: 'Testimonials',   href: '/admin/testimonials' },
  { icon: FileText,        label: 'Form Submissions',href: '/admin/submissions' },
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem('nts_admin_token')
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div className="admin-sidebar">
      {/* Logo */}
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text)' }}>
          Ankit <span style={{ color: 'var(--red)' }}>Khare</span>
        </div>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 2 }}>
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = location.pathname === href
          return (
            <Link key={href} to={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', marginBottom: 2,
                fontFamily: 'var(--font-head)', fontWeight: 600,
                fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: active ? '#fff' : 'var(--text-muted)',
                background: active ? 'var(--red-dim)' : 'transparent',
                borderLeft: `3px solid ${active ? 'var(--red)' : 'transparent'}`,
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = '#fff' } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' } }}
            >
              <Icon size={15} /> {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <a href="/" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-muted)', transition: 'all 0.2s', textDecoration: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <ExternalLink size={14} /> View Site
        </a>
        <button onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            transition: 'color 0.2s', width: '100%',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  )
}