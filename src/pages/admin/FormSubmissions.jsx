import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Trash2, Search, Mail, Phone, 
  Instagram, Linkedin, Globe, Loader2, FileText, Calendar
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx' 

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];

const TABS = [
  { id: 'fmp-program', label: 'FMP Program', type: 'course' },
  { id: 'sales-mastery', label: 'Sales Mastery', type: 'course' },
  { id: 'corporate-training', label: 'Corporate', type: 'course' },
  { id: 'homepage-contact', label: 'Homepage Inquiries', type: 'contact' }
]

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [activeTab, setActiveTab] = useState('fmp-program')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  
  // ── DATE FILTER STATES ──
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const isHomepageTab = TABS.find(t => t.id === activeTab)?.type === 'contact';

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const queryParam = isHomepageTab ? `source=${activeTab}` : `course=${activeTab}`;
      const response = await fetch(`http://localhost:5000/api/submissions?${queryParam}`)
      const result = await response.json()
      if (result.success) {
        setSubmissions(result.data)
      }
    } catch (err) {
      toast.error("Database sync failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = `${activeTab.toUpperCase()} Leads | Admin`
    fetchSubmissions()
  }, [activeTab])

  // ── FILTERING LOGIC (Search + Date) ──
  const filtered = submissions.filter(s => {
    const matchesSearch = (s.fullName || s.name || '').toLowerCase().includes(search.toLowerCase()) || 
                          (s.email || '').toLowerCase().includes(search.toLowerCase());
    
    if (!startDate && !endDate) return matchesSearch;

    const submissionDate = new Date(s.createdAt).setHours(0,0,0,0);
    const start = startDate ? new Date(startDate).setHours(0,0,0,0) : null;
    const end = endDate ? new Date(endDate).setHours(0,0,0,0) : null;

    if (start && submissionDate < start) return false;
    if (end && submissionDate > end) return false;

    return matchesSearch;
  });

  const handleExportExcel = () => {
    if (filtered.length === 0) {
      toast.error(`No filtered leads to export`);
      return;
    }

    const excelData = filtered.map((lead) => {
      const common = {
        'Date': new Date(lead.createdAt).toLocaleDateString(),
        'Name': isHomepageTab ? lead.name : lead.fullName,
        'Email': lead.email,
        'Phone': lead.phone,
        'Status': lead.status?.toUpperCase(),
      };

      return isHomepageTab ? 
        { ...common, 'Interest': lead.interest, 'Message': lead.message } : 
        { ...common, 'Course': lead.course, 'Company': lead.currentCompany, 'Help Needed': lead.helpNeeded };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Leads");
    XLSX.writeFile(workbook, `NTS_Leads_${activeTab}_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success(`Exported ${filtered.length} leads!`);
  }

  const updateStatus = async (id, newStatus) => {
    setSubmissions(p => p.map(s => s._id === id ? { ...s, status: newStatus } : s))
    toast.success(`Updated to ${newStatus.toUpperCase()}`)
  }

  const deleteLead = async (id) => {
    if (!confirm('Permanently delete this lead?')) return
    setSubmissions(p => p.filter(s => s._id !== id))
    toast.success('Lead deleted')
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase' }}>
              {isHomepageTab ? 'General Inquiries' : 'Course Lead Sheet'}
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                Total: {filtered.length} {filtered.length === 1 ? 'Lead' : 'Leads'} found
            </p>
          </div>
          
          <button onClick={handleExportExcel} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
            <FileText size={14} /> Export Filtered to Excel
          </button>
        </div>

        {/* ── FILTERS BAR ── */}
        <div style={{ 
          background: 'var(--bg-2)', 
          border: '1px solid var(--border)', 
          padding: '16px 20px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input className="form-input" placeholder="Search name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36, width: '100%' }} />
          </div>

          {/* Date Start */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>From:</span>
            <input type="date" className="form-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ fontSize: '0.8rem', width: '150px' }} />
          </div>

          {/* Date End */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>To:</span>
            <input type="date" className="form-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ fontSize: '0.8rem', width: '150px' }} />
          </div>

          {/* Clear Dates */}
          {(startDate || endDate) && (
            <button 
              onClick={() => { setStartDate(''); setEndDate(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Reset Dates
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: 24 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '12px 8px', background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === t.id ? '2px solid var(--red)' : '2px solid transparent',
              color: activeTab === t.id ? 'var(--text)' : 'var(--text-dim)',
              fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase'
            }}>{t.label}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto', background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: 'none' }}>
          {loading ? (
            <div style={{ padding: 100, textAlign: 'center' }}><Loader2 className="animate-spin" /></div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: '1400px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-3)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={headerStyle}>Date</th>
                  <th style={headerStyle}>Name</th>
                  <th style={headerStyle}>Status</th>
                  <th style={headerStyle}>Email</th>
                  <th style={headerStyle}>Phone</th>
                  {isHomepageTab ? (
                    <> <th style={headerStyle}>Interest</th> <th style={headerStyle}>Message</th> </>
                  ) : (
                    <> <th style={headerStyle}>Designation</th> <th style={headerStyle}>Company</th> <th style={headerStyle}>Help Needed</th> </>
                  )}
                  <th style={headerStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((sub) => (
                  <tr key={sub._id} style={rowStyle}>
                    <td style={cellStyle}>{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td style={{ ...cellStyle, fontWeight: 600, color: 'var(--text)' }}>{isHomepageTab ? sub.name : sub.fullName}</td>
                    <td style={cellStyle}>
                      <select value={sub.status || 'new'} onChange={(e) => updateStatus(sub._id, e.target.value)} style={selectStyle}>
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
                      </select>
                    </td>
                    <td style={cellStyle}>{sub.email}</td>
                    <td style={cellStyle}>{sub.phone}</td>
                    {isHomepageTab ? (
                      <>
                        <td style={cellStyle}><span style={{ color: 'var(--red)', fontWeight: 600 }}>{sub.interest}</span></td>
                        <td style={{ ...cellStyle, maxWidth: '300px', whiteSpace: 'normal' }}>{sub.message}</td>
                      </>
                    ) : (
                      <>
                        <td style={cellStyle}>{sub.currentDesignation || '-'}</td>
                        <td style={cellStyle}>{sub.currentCompany || '-'}</td>
                        <td style={{ ...cellStyle, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.helpNeeded}</td>
                      </>
                    )}
                    <td style={cellStyle}>
                      <button onClick={() => deleteLead(sub._id)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="10" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>No leads matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

const headerStyle = { padding: '12px 15px', fontFamily: 'var(--font-head)', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' };
const cellStyle = { padding: '12px 15px', whiteSpace: 'nowrap' };
const rowStyle = { borderBottom: '1px solid var(--border)' };
const selectStyle = { background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', padding: '4px', fontSize: '0.7rem' };