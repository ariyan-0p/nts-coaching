import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image, FileText, Users, TrendingUp, ArrowRight, Activity } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

const quickStats = [
  { icon: Image,     label: 'Testimonials',      value: '4',    sub: 'Published',   color: 'var(--red)',     href: '/admin/testimonials' },
  { icon: FileText,  label: 'Form Submissions',  value: '0',    sub: 'Pending review', color: '#3b82f6',    href: '/admin/submissions' },
  { icon: Users,     label: 'Total Enrollments', value: '0',    sub: 'This month',  color: '#10b981',       href: '/admin/submissions' },
  { icon: TrendingUp,label: 'Site Visitors',     value: '--',   sub: 'Connect analytics', color: '#f59e0b', href: '#' },
]

const quickActions = [
  { label: 'Upload New Testimonial', href: '/admin/testimonials', icon: Image, desc: 'Add image, video or text review' },
  { label: 'View Form Submissions',  href: '/admin/submissions',  icon: FileText, desc: 'See all course enrollment requests' },
]

export default function AdminDashboard() {
  useEffect(() => { document.title = 'Dashboard | NTS Admin' }, [])

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Activity size={16} color="var(--red)" />
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)' }}>Overview</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 300, marginTop: 4 }}>
            Manage testimonials, form submissions, and site content from here.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
          {quickStats.map(({ icon: Icon, label, value, sub, color, href }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={href} style={{
                display: 'block', padding: '24px 20px',
                background: 'var(--bg-2)', textDecoration: 'none',
                transition: 'background 0.2s', height: '100%',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}40` }}>
                    <Icon size={16} color={color} />
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)', marginTop: 4 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4, fontWeight: 300 }}>{sub}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
            {quickActions.map(({ label, href, icon: Icon, desc }) => (
              <Link key={label} to={href}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 24px', background: 'var(--bg-2)',
                  textDecoration: 'none', transition: 'background 0.2s',
                  borderLeft: '3px solid transparent',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderLeftColor = 'var(--red)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderLeftColor = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--red-dim)', border: '1px solid var(--border-red)' }}>
                    <Icon size={17} color="var(--red)" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)' }}>{label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 300, marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
                <ArrowRight size={16} color="var(--text-dim)" />
              </Link>
            ))}
          </div>
        </div>

        {/* Info box */}
        <div style={{ padding: '20px 24px', background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--red)' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 8 }}>
            Backend Integration Pending
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.7 }}>
            This admin panel is currently running in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>frontend-only mode</strong>. 
            Once the Node.js + JWT backend is connected, this dashboard will display real data — 
            form submissions, testimonial uploads, and user analytics will all be live.
          </p>
        </div>

      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-content > div:nth-child(2) { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .admin-content > div:nth-child(2) { grid-template-columns: 1fr !important; }
          .admin-content > div:nth-child(3) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}