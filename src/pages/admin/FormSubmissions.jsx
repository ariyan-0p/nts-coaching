import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Trash2, Search, Filter, Mail, Phone, Calendar, BookOpen } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import toast from 'react-hot-toast'

// Mock data — will be replaced by API calls
const mockSubmissions = [
  { id: 1, course: 'nail-the-sale',       name: 'Priya Sharma',     email: 'priya@example.com',  phone: '+91 9876543210', profession: 'Freelancer',        interest: 'High-ticket clients', createdAt: '2025-09-01T10:30:00', status: 'new' },
  { id: 2, course: 'corporate-training',  name: 'Raj Technologies', email: 'hr@rajtech.com',      phone: '+91 8765432109', company: 'Raj Technologies', teamSize: '11-30',  createdAt: '2025-09-02T14:15:00', status: 'contacted' },
  { id: 3, course: 'nail-the-sale',       name: 'Amit Desai',       email: 'amit@gmail.com',      phone: '+91 7654321098', profession: 'Real Estate Agent', interest: 'Closing bigger deals', createdAt: '2025-09-03T09:00:00', status: 'new' },
  { id: 4, course: 'corporate-training',  name: 'Meghna Corp',      email: 'admin@meghna.in',     phone: '+91 6543210987', company: 'Meghna Corp', teamSize: '31-100',    createdAt: '2025-09-03T16:45:00', status: 'converted' },
]

const STATUS_COLORS = {
  new:       { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', color: '#60a5fa', label: 'New' },
  contacted: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  color: '#facc15', label: 'Contacted' },
  converted: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#4ade80', label: 'Converted' },
  closed:    { bg: 'rgba(156,163,175,0.1)', border: 'rgba(156,163,175,0.3)', color: '#9ca3af', label: 'Closed' },
}

const COURSE_LABELS = {
  'nail-the-sale':      'Nail the Sale',
  'corporate-training': 'Corporate Training',
}

function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.new
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: s.bg, border: `1px solid ${s.border}`, fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: s.color }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
      {s.label}
    </span>
  )
}

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.title = 'Form Submissions | NTS Admin'
    // When backend ready: fetch('/api/submissions').then(r=>r.json()).then(setSubmissions)
  }, [])

  const updateStatus = (id, status) => {
    setSubmissions(p => p.map(s => s.id === id ? { ...s, status } : s))
    toast.success(`Status updated to "${STATUS_COLORS[status].label}"`)
    if (selected?.id === id) setSelected(p => ({ ...p, status }))
  }

  const deleteSubmission = (id) => {
    if (!confirm('Delete this submission?')) return
    setSubmissions(p => p.filter(s => s.id !== id))
    if (selected?.id === id) setSelected(null)
    toast.success('Submission deleted')
  }

  const exportCSV = () => {
    const headers = ['ID', 'Course', 'Name', 'Email', 'Phone', 'Date', 'Status']
    const rows = submissions.map(s => [s.id, COURSE_LABELS[s.course] || s.course, s.name, s.email, s.phone, new Date(s.createdAt).toLocaleDateString(), STATUS_COLORS[s.status]?.label || s.status])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'submissions.csv'; a.click()
    toast.success('CSV exported!')
  }

  const filtered = submissions.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
    const matchCourse = courseFilter === 'all' || s.course === courseFilter
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    return matchSearch && matchCourse && matchStatus
  })

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Form Submissions
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 300, marginTop: 4 }}>
              Course enrollment and contact form submissions — {submissions.length} total.
            </p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={exportCSV}>
            <Download size={14} /> Export CSV
          </button>
        </div>

        {/* Summary strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 24 }}>
          {Object.entries(STATUS_COLORS).map(([status, s]) => (
            <div key={status} style={{ background: 'var(--bg-2)', padding: '14px 16px', cursor: 'pointer', transition: 'background 0.2s' }}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              onMouseEnter={e => e.currentTarget.style.background = '#111'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
            >
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.5rem', color: s.color, lineHeight: 1 }}>
                {submissions.filter(sub => sub.status === status).length}
              </div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={14} color="var(--text-dim)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input className="form-input" placeholder="Search by name or email..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: 36, height: 38, fontSize: '0.85rem' }}
            />
          </div>
          {/* Course filter */}
          <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}
            className="form-input" style={{ width: 'auto', height: 38, fontSize: '0.82rem', background: 'var(--surface)', color: 'var(--text)', minWidth: 160 }}>
            <option value="all">All Courses</option>
            <option value="nail-the-sale">Nail the Sale</option>
            <option value="corporate-training">Corporate Training</option>
          </select>
          {/* Status filter */}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="form-input" style={{ width: 'auto', height: 38, fontSize: '0.82rem', background: 'var(--surface)', color: 'var(--text)', minWidth: 130 }}>
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_COLORS).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 2, alignItems: 'start' }}>

          {/* Table */}
          <div style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px', gap: 0, background: 'var(--bg-3)', borderBottom: '1px solid var(--border)', padding: '10px 16px' }}>
              {['Name', 'Course', 'Date', 'Status', 'Actions'].map(h => (
                <div key={h} style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{h}</div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-2)', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                No submissions found
              </div>
            )}

            {filtered.map((sub, i) => (
              <motion.div key={sub.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 80px',
                  padding: '12px 16px', alignItems: 'center',
                  background: selected?.id === sub.id ? 'var(--red-dim)' : 'var(--bg-2)',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: `3px solid ${selected?.id === sub.id ? 'var(--red)' : 'transparent'}`,
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
                onClick={() => setSelected(selected?.id === sub.id ? null : sub)}
              >
                {/* Name */}
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', color: 'var(--text)' }}>{sub.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 300 }}>{sub.email}</div>
                </div>
                {/* Course */}
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                  {COURSE_LABELS[sub.course] || sub.course}
                </div>
                {/* Date */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 300 }}>
                  {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
                {/* Status */}
                <StatusBadge status={sub.status} />
                {/* Actions */}
                <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                  <button onClick={() => setSelected(selected?.id === sub.id ? null : sub)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-red)'; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  ><Eye size={12} /></button>
                  <button onClick={() => deleteSubmission(sub.id)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#f87171' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  ><Trash2 size={12} /></button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '24px', position: 'sticky', top: 20 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--text)' }}>{selected.name}</div>
                  <StatusBadge status={selected.status} />
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  { icon: Mail,     label: 'Email',   value: selected.email },
                  { icon: Phone,    label: 'Phone',   value: selected.phone },
                  { icon: BookOpen, label: 'Course',  value: COURSE_LABELS[selected.course] || selected.course },
                  { icon: Calendar, label: 'Date',    value: new Date(selected.createdAt).toLocaleString('en-IN') },
                  ...(selected.company ? [{ icon: FileText, label: 'Company', value: selected.company }] : []),
                  ...(selected.teamSize ? [{ icon: FileText, label: 'Team Size', value: selected.teamSize }] : []),
                  ...(selected.profession ? [{ icon: FileText, label: 'Profession', value: selected.profession }] : []),
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 10 }}>
                    <Icon size={14} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>{label}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 300 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Update status */}
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>Update Status</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {Object.entries(STATUS_COLORS).map(([status, s]) => (
                    <button key={status} onClick={() => updateStatus(selected.id, status)}
                      style={{
                        padding: '6px 12px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        background: selected.status === status ? s.bg : 'var(--surface)',
                        border: `1px solid ${selected.status === status ? s.border : 'var(--border)'}`,
                        color: selected.status === status ? s.color : 'var(--text-muted)',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >{s.label}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <a href={`mailto:${selected.email}`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Mail size={13} /> Email
                </a>
                <a href={`tel:${selected.phone}`} className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                  <Phone size={13} /> Call
                </a>
              </div>
            </motion.div>
          )}
        </div>

        <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 300 }}>
          Showing mock data. Real submissions will appear here once the Node.js backend and database are connected.
        </p>

      </main>
    </div>
  )
}