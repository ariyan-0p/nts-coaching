import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Upload, Trash2, Eye, EyeOff, Image, Video, Type, Plus, X, Star, Loader2 } from 'lucide-react'
import AdminSidebar from './AdminSidebar'

const TYPES = [
  { value: 'text',  label: 'Text Review', icon: Type },
  { value: 'image', label: 'Image',       icon: Image },
  { value: 'video', label: 'Video',       icon: Video },
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
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploadType, setUploadType] = useState('text')
  const [rating, setRating] = useState(5)
  const [preview, setPreview] = useState(null)
  const [filter, setFilter] = useState('all')
  const fileRef = useRef()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/testimonials')
      const result = await res.json()
      if (result.success) setTestimonials(result.data)
    } catch (err) {
      toast.error("Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { 
    document.title = 'Testimonials | NTS Admin'
    fetchTestimonials()
  }, [])

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview({ url, type: file.type.startsWith('video') ? 'video' : 'image', name: file.name })
  }

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('type', uploadType)
    formData.append('name', data.name)
    formData.append('role', data.role)
    formData.append('result', data.result)
    formData.append('rating', rating)

    if (uploadType === 'text') {
      formData.append('text', data.text)
    } else if (fileRef.current.files[0]) {
      formData.append('media', fileRef.current.files[0])
    }

    try {
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        body: formData, // Browser sets multipart/form-data automatically
      })
      
      const result = await response.json()
      if (result.success) {
        setTestimonials(p => [result.data, ...p])
        toast.success('Testimonial published live!')
        reset()
        setPreview(null)
        setShowForm(false)
      }
    } catch {
      toast.error('Failed to save testimonial')
    }
  }

  const togglePublish = async (id) => {
    // In production, add a PATCH route to backend. For now, local toggle:
    setTestimonials(p => p.map(t => t._id === id ? { ...t, published: !t.published } : t))
    toast.success('Visibility toggled')
  }

  const deleteItem = async (id) => {
    if (!confirm('Delete permanently?')) return
    setTestimonials(p => p.filter(t => t._id !== id))
    toast.success('Deleted')
  }

  const filtered = filter === 'all' ? testimonials
    : filter === 'published' ? testimonials.filter(t => t.published)
    : testimonials.filter(t => !t.published)

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.8rem', textTransform: 'uppercase' }}>Testimonials</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Manage video, image, and text reviews.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(p => !p)}>
            {showForm ? <><X size={15} /> Cancel</> : <><Plus size={15} /> Add New</>}
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden', marginBottom: 32 }}>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '28px' }}>
                
                <div style={{ display: 'flex', gap: 1, background: 'var(--border)', marginBottom: 24, width: 'fit-content' }}>
                  {TYPES.map(({ value, label, icon: Icon }) => (
                    <button key={value} type="button" onClick={() => { setUploadType(value); setPreview(null) }}
                      style={{ padding: '10px 18px', background: uploadType === value ? 'var(--red)' : 'var(--surface)', color: uploadType === value ? '#fff' : 'var(--text-dim)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase' }}>
                      <Icon size={14} style={{ marginRight: 8 }} /> {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Client Name *</label>
                      <input className="form-input" {...register('name', { required: true })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role / Company</label>
                      <input className="form-input" {...register('role')} />
                    </div>
                  </div>

                  {uploadType === 'text' ? (
                    <textarea className="form-input" placeholder="Written review..." {...register('text', { required: uploadType === 'text' })} style={{ minHeight: 100, marginBottom: 16 }} />
                  ) : (
                    <div style={{ marginBottom: 16 }}>
                      <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed var(--border)', padding: '40px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
                        {preview ? (
                          preview.type === 'image' ? <img src={preview.url} style={{ maxHeight: 150 }} /> : <video src={preview.url} style={{ maxHeight: 150 }} />
                        ) : <p>Click to upload {uploadType}</p>}
                      </div>
                      <input ref={fileRef} type="file" onChange={handleFile} style={{ display: 'none' }} accept={uploadType === 'image' ? 'image/*' : 'video/*'} />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div className="form-group">
                      <label className="form-label">Achievement</label>
                      <input className="form-input" placeholder="e.g. 50% growth" {...register('result')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rating</label>
                      <StarPicker value={rating} onChange={setRating} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Uploading...' : 'Publish Testimonial'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)' }}>
          {loading ? <Loader2 className="animate-spin" style={{ margin: '40px auto' }} /> : 
            filtered.map((t) => (
              <div key={t._id} style={{ background: 'var(--bg-2)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)' }}>
                  {t.type === 'image' ? <Image size={16} /> : t.type === 'video' ? <Video size={16} /> : <Type size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t.role}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => togglePublish(t._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                    {t.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => deleteItem(t._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </main>
    </div>
  )
}