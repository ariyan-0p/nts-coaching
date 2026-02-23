import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Image, FileText, Users, TrendingUp, ArrowRight, Activity, Loader2 } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    testimonials: 0,
    newSubmissions: 0,
    totalEnrollments: 0,
    fmpLeads: 0,
    salesLeads: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Dashboard | NTS Admin'
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // Fetch all submissions to calculate metrics
        const response = await fetch('http://localhost:5000/api/submissions')
        const result = await response.json()

        if (result.success) {
          const allLeads = result.data
          setStats({
            testimonials: 4, // Mock until Testimonial API is ready
            newSubmissions: allLeads.filter(l => l.status === 'new').length,
            totalEnrollments: allLeads.length,
            fmpLeads: allLeads.filter(l => l.course === 'fmp-program').length,
            salesLeads: allLeads.filter(l => l.course === 'nail-the-sale').length
          })
        }
      } catch (err) {
        toast.error("Failed to sync live metrics")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const quickStats = [
    { icon: Image,     label: 'Testimonials',     value: stats.testimonials, sub: 'Published',       color: 'var(--red)',   href: '/admin/testimonials' },
    { icon: FileText,  label: 'New Leads',        value: stats.newSubmissions, sub: 'Awaiting review', color: '#3b82f6',     href: '/admin/submissions' },
    { icon: Users,     label: 'Total Leads',      value: stats.totalEnrollments, sub: 'All courses',    color: '#10b981',     href: '/admin/submissions' },
    { icon: TrendingUp,label: 'Site Status',      value: 'LIVE',              sub: 'Cloud Connected', color: '#f59e0b',     href: '#' },
  ]

  const quickActions = [
    { label: 'Upload Testimonial', href: '/admin/testimonials', icon: Image, desc: 'Add image, video or text review' },
    { label: 'Manage Submissions', href: '/admin/submissions', icon: FileText, desc: 'See all course enrollment requests' },
  ]

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Activity size={16} color="var(--red)" />
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)' }}>Live Monitor</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', color: 'var(--text)' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: 300, marginTop: 4 }}>
            Real-time control center for Ankit Khare's programs.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
          {quickStats.map(({ icon: Icon, label, value, sub, color, href }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={href} style={{ display: 'block', padding: '24px 20px', background: 'var(--bg-2)', textDecoration: 'none', transition: 'background 0.2s', height: '100%' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}18`, border: `1px solid ${color}40` }}>
                    <Icon size={16} color={color} />
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : value}
                </div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text)', marginTop: 4 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4, fontWeight: 300 }}>{sub}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Course Performance Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>FMP Program</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{stats.fmpLeads} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 300 }}>Total Leads</span></div>
            </div>
            <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>Sales Mastery</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{stats.salesLeads} <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 300 }}>Total Leads</span></div>
            </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Admin Shortcuts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
            {quickActions.map(({ label, href, icon: Icon, desc }) => (
              <Link key={label} to={href}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'var(--bg-2)', textDecoration: 'none', transition: 'background 0.2s', borderLeft: '3px solid transparent' }}
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

      </main>
    </div>
  )
}