import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Upload, Trash2, Eye, EyeOff, Image, Video, Type, Plus, X, Star } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

const TYPES = [
  { value: 'text',  label: 'Text Review', icon: Type },
  { value: 'image', label: 'Image',       icon: Image },
  { value: 'video', label: 'Video',       icon: Video },
]

// Local state only until backend is connected
const initialTestimonials = [
  { id: 1, type: 'text', name: 'Radhika Menon', role: 'Founder, Thrive Wellness Studio', text: 'Working with Ankit Khare transformed the way I approached client conversations...', rating: 5, result: 'Closed ₹85,000 deal', published: true },
  { id: 2, type: 'text', name: 'Arjun Patel',   role: 'Regional Sales Manager, NexaTech', text: 'Ankit conducted a 3-day workshop for our enterprise sales team...', rating: 5, result: '35% deal size increase', published: true },
  { id: 3, type: 'text', name: 'Rishabh Jain',  role: 'Freelance Branding Consultant', text: 'Before meeting Ankit, I was stuck closing small-ticket projects...', rating: 5, result: '₹1.2L client landed', published: true },
  { id: 4, type: 'text', name: 'Deepak Chauhan',role: 'Director, Elevate Realtors', text: 'We\'ve worked with many trainers, but Ankit\'s workshop was different...', rating: 5, result: '40% conversion improvement', published: true },
]

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
        >
          <Star size={20} color="#f59e0b" fill={(hover || value) >= n ? '#f59e0b' : 'transparent'} />
        </button>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [showForm, setShowForm] = useState(false)
  const [uploadType, setUploadType] = useState('text')
  const [rating, setRating] = useState(5)
  const [preview, setPreview] = useState(null)
  const [filter, setFilter] = useState('all')
  const fileRef = useRef()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => { document.title = 'Testimonials | NTS Admin' }, [])

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview({ url, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name, size: (file.size / 1024).toFixed(1) + ' KB' })
  }

  const onSubmit = async (data) => {
    try {
      // When backend ready: POST to /api/testimonials with FormData
      await new Promise(r => setTimeout(r, 800))

      const newItem = {
        id: Date.now(),
        type: uploadType,
        name: data.name,
        role: data.role,
        text: data.text || '',
        rating,
        result: data.result || '',
        published: true,
        previewUrl: preview?.url || null,
        mediaName: preview?.name || null,
      }
      setTestimonials(p => [newItem, ...p])
      toast.success('Testimonial added successfully!')
      reset()
      setPreview(null)
      setRating(5)
      setShowForm(false)
    } catch {
      toast.error('Failed to add testimonial')
    }
  }

  const togglePublish = (id) => {
    setTestimonials(p => p.map(t => t.id === id ? { ...t, published: !t.published } : t))
    const t = testimonials.find(t => t.id === id)
    toast.success(t.published ? 'Testimonial hidden' : 'Testimonial published')
  }

  const deleteItem = (id) => {
    if (!confirm('Delete this testimonial?')) return
    setTestimonials(p => p.filter(t => t.id !== id))
    toast.success('Deleted')
  }

  const filtered = filter === 'all' ? testimonials
    : filter === 'published' ? testimonials.filter(t => t.published)
    : testimonials.filter(t => !t.published)

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--text)' }}>
              Testimonials
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 300, marginTop: 4 }}>
              Manage client reviews — upload images, videos, or text testimonials.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(p => !p)}>
            {showForm ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Add Testimonial</>}
          </button>
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: 32 }}
            >
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '28px 28px' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 24 }}>
                  New Testimonial
                </h2>

                {/* Type selector */}
                <div style={{ display: 'flex', gap: 1, background: 'var(--border)', marginBottom: 24, width: 'fit-content' }}>
                  {TYPES.map(({ value, label, icon: Icon }) => (
                    <button key={value} type="button"
                      onClick={() => { setUploadType(value); setPreview(null) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                        background: uploadType === value ? 'var(--red)' : 'var(--surface)',
                        color: uploadType === value ? '#fff' : 'var(--text-muted)',
                        border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        transition: 'all 0.2s',
                      }}
                    >
                      <Icon size={14} /> {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Client Name *</label>
                      <input className="form-input" placeholder="Full name" {...register('name', { required: 'Required' })} />
                      {errors.name && <span className="form-error">{errors.name.message}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role / Company</label>
                      <input className="form-input" placeholder="e.g. Sales Manager, ABC Corp" {...register('role')} />
                    </div>
                  </div>

                  {/* Text review */}
                  {uploadType === 'text' && (
                    <div className="form-group" style={{ marginBottom: 16 }}>
                      <label className="form-label">Review Text *</label>
                      <textarea className="form-input" placeholder="Client's testimonial..." {...register('text', { required: uploadType === 'text' ? 'Required' : false })} style={{ minHeight: 100 }} />
                      {errors.text && <span className="form-error">{errors.text.message}</span>}
                    </div>
                  )}

                  {/* File upload */}
                  {(uploadType === 'image' || uploadType === 'video') && (
                    <div style={{ marginBottom: 16 }}>
                      <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>
                        {uploadType === 'image' ? 'Upload Image *' : 'Upload Video *'}
                      </label>
                      <div
                        onClick={() => fileRef.current?.click()}
                        style={{
                          border: `2px dashed ${preview ? 'var(--border-red)' : 'var(--border)'}`,
                          padding: '28px', textAlign: 'center', cursor: 'pointer',
                          background: preview ? 'var(--red-dim)' : 'var(--surface)',
                          transition: 'all 0.2s',
                        }}
                      >
                        {preview ? (
                          <div>
                            {preview.type === 'image'
                              ? <img src={preview.url} alt="preview" style={{ maxHeight: 160, maxWidth: '100%', margin: '0 auto', objectFit: 'contain' }} />
                              : <video src={preview.url} controls style={{ maxHeight: 160, maxWidth: '100%', margin: '0 auto' }} />
                            }
                            <p style={{ marginTop: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{preview.name} ({preview.size})</p>
                          </div>
                        ) : (
                          <>
                            <Upload size={28} color="var(--text-dim)" style={{ margin: '0 auto 10px' }} />
                            <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                              Click to upload {uploadType}
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
                              {uploadType === 'image' ? 'PNG, JPG, WebP (max 5MB)' : 'MP4, MOV, WebM (max 50MB)'}
                            </p>
                          </>
                        )}
                      </div>
                      <input ref={fileRef} type="file"
                        accept={uploadType === 'image' ? 'image/*' : 'video/*'}
                        onChange={handleFile} style={{ display: 'none' }} />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Result / Achievement</label>
                      <input className="form-input" placeholder="e.g. Closed ₹85,000 deal" {...register('result')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <StarPicker value={rating} onChange={setRating} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? 'Saving...' : <><Upload size={15} /> Save Testimonial</>}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => { setShowForm(false); reset(); setPreview(null) }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', width: 'fit-content', marginBottom: 20 }}>
          {['all', 'published', 'hidden'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '8px 18px',
                background: filter === f ? 'var(--red)' : 'var(--surface)',
                color: filter === f ? '#fff' : 'var(--text-muted)',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
            >{f} {f === 'all' ? `(${testimonials.length})` : f === 'published' ? `(${testimonials.filter(t=>t.published).length})` : `(${testimonials.filter(t=>!t.published).length})`}</button>
          ))}
        </div>

        {/* Testimonials list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-2)', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              No testimonials found
            </div>
          )}
          {filtered.map((t, i) => (
            <motion.div key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                background: 'var(--bg-2)', padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                borderLeft: `3px solid ${t.published ? 'var(--red)' : 'var(--border)'}`,
              }}
            >
              {/* Type icon */}
              <div style={{ width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)' }}>
                {t.type === 'image' ? <Image size={15} color="var(--text-dim)" />
                : t.type === 'video' ? <Video size={15} color="var(--text-dim)" />
                : <Type size={15} color="var(--text-dim)" />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)' }}>{t.name}</span>
                  {!t.published && <span className="badge badge-yellow">Hidden</span>}
                  {t.result && <span style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--red)' }}>↑ {t.result}</span>}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{t.role}</div>
                {t.text && <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: 6, fontWeight: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 500 }}>{t.text}</p>}
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} color="#f59e0b" fill="#f59e0b" />)}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button onClick={() => togglePublish(t.id)}
                  title={t.published ? 'Hide' : 'Publish'}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-red)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  {t.published ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button onClick={() => deleteItem(t.id)}
                  title="Delete"
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#f87171' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 300 }}>
          Note: Changes are stored in local state only until the backend is connected. Published testimonials will automatically appear on the website once the API is integrated.
        </p>

      </main>
    </div>
  )
}