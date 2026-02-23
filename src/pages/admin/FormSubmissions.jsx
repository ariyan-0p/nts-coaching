import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, Trash2, Search, Mail, Phone, 
  Instagram, Linkedin, Globe, Loader2, FileText
} from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import toast from 'react-hot-toast'
import * as XLSX from 'xlsx' 

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];

const COURSES = [
  { id: 'fmp-program', label: 'FMP Program' },
  { id: 'nail-the-sale', label: 'Sales Mastery' },
  { id: 'corporate-training', label: 'Corporate' }
]

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState([])
  const [activeTab, setActiveTab] = useState('fmp-program')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // This function fetches ONLY the leads for the active tab from your MongoDB
  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5000/api/submissions?course=${activeTab}`)
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
  }, [activeTab]) // Refetches data whenever you switch between FMP and Sales Mastery

  // --- Excel Export Logic (Differentiated by Course) ---
  const handleExportExcel = () => {
    if (submissions.length === 0) {
      toast.error(`No ${activeTab} leads found to export`);
      return;
    }

    // Format the data for the Excel sheet
    const excelData = submissions.map((lead) => ({
      'Submission Date': new Date(lead.createdAt).toLocaleDateString(),
      'Course': lead.course === 'fmp-program' ? 'Financial Market Professional' : 'Sales Mastery',
      'Full Name': lead.fullName,
      'Email': lead.email,
      'Phone': lead.phone,
      'Status': lead.status?.toUpperCase(),
      'DOB': lead.dateOfBirth || 'N/A',
      'Designation': lead.currentDesignation || 'N/A',
      'Company': lead.currentCompany || 'N/A',
      'Instagram': lead.instagramId || 'N/A',
      'LinkedIn': lead.linkedinUrl || 'N/A',
      'Portfolio': lead.portfolioUrl || 'N/A',
      'Help Needed': lead.helpNeeded || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    
    // The filename dynamically changes based on the active course tab
    const fileName = `NTS_${activeTab}_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success(`Exported ${activeTab} leads successfully!`);
  }

  const updateStatus = async (id, newStatus) => {
    // Optimistically update UI
    setSubmissions(p => p.map(s => s._id === id ? { ...s, status: newStatus } : s))
    toast.success(`Lead status updated to ${newStatus.toUpperCase()}`)
  }

  const deleteLead = async (id) => {
    if (!confirm('Are you sure you want to delete this lead from the database?')) return
    setSubmissions(p => p.filter(s => s._id !== id))
    toast.success('Lead removed from sheet')
  }

  const filtered = submissions.filter(s => 
    s.fullName?.toLowerCase().includes(search.toLowerCase()) || 
    s.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase' }}>
              {activeTab === 'fmp-program' ? 'FMP' : 'Sales'} Lead Sheet
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>Manage and export submissions for this course category.</p>
          </div>
          
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input className="form-input" placeholder="Search this sheet..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 36, width: 220 }} />
            </div>

            <button 
              onClick={handleExportExcel}
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', padding: '10px 16px' }}
            >
              <FileText size={14} /> Export {activeTab === 'fmp-program' ? 'FMP' : 'Sales'} to Excel
            </button>
          </div>
        </div>

        {/* Dynamic Course Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 0, gap: 24 }}>
          {COURSES.map(c => (
            <button key={c.id} onClick={() => setActiveTab(c.id)} style={{
              padding: '12px 8px', background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === c.id ? '2px solid var(--red)' : '2px solid transparent',
              color: activeTab === c.id ? 'var(--text)' : 'var(--text-dim)',
              fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase'
            }}>{c.label}</button>
          ))}
        </div>

        {/* Sheet Table */}
        <div style={{ width: '100%', overflowX: 'auto', background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: 'none' }}>
          {loading ? (
            <div style={{ padding: 100, textAlign: 'center' }}><Loader2 className="animate-spin" /></div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: '1600px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-3)', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  {['Date', 'Full Name', 'Status', 'Phone', 'Email', 'DOB', 'Designation', 'Company', 'Instagram', 'LinkedIn', 'Portfolio', 'Help Needed', 'Actions'].map(h => (
                    <th key={h} style={headerStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr key={sub._id} style={rowStyle} className="table-row-hover">
                    <td style={cellStyle}>{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td style={{ ...cellStyle, fontWeight: 600, color: 'var(--text)' }}>{sub.fullName}</td>
                    <td style={cellStyle}>
                      <select 
                        value={sub.status || 'new'} 
                        onChange={(e) => updateStatus(sub._id, e.target.value)}
                        style={selectStyle}
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
                      </select>
                    </td>
                    <td style={cellStyle}>{sub.phone}</td>
                    <td style={cellStyle}>{sub.email}</td>
                    <td style={cellStyle}>{sub.dateOfBirth || '-'}</td>
                    <td style={cellStyle}>{sub.currentDesignation || '-'}</td>
                    <td style={cellStyle}>{sub.currentCompany || '-'}</td>
                    <td style={cellStyle}>{sub.instagramId ? `@${sub.instagramId}` : '-'}</td>
                    <td style={cellStyle}>
                      {sub.linkedinUrl ? <a href={sub.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--red)' }}><Linkedin size={14}/></a> : '-'}
                    </td>
                    <td style={cellStyle}>
                      {sub.portfolioUrl ? <a href={sub.portfolioUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--text)' }}><Globe size={14}/></a> : '-'}
                    </td>
                    <td style={{ ...cellStyle, maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={sub.helpNeeded}>
                      {sub.helpNeeded || '-'}
                    </td>
                    <td style={cellStyle}>
                      <button onClick={() => deleteLead(sub._id)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

// Global Styles for Table
const headerStyle = { padding: '12px 15px', fontFamily: 'var(--font-head)', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem' };
const cellStyle = { padding: '12px 15px', whiteSpace: 'nowrap' };
const rowStyle = { borderBottom: '1px solid var(--border)' };
const selectStyle = { background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)', padding: '4px', fontSize: '0.7rem' };