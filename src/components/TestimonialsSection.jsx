import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} color="#f59e0b" fill="#f59e0b" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [current, setCurrent] = useState(0)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch real data from your backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('https://ntswithankit.com/api/testimonials')
        const result = await res.json()
        if (result.success) {
          // Show only published testimonials
          setTestimonials(result.data.filter(t => t.published))
        }
      } catch (err) {
        console.error("Testimonial fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  // Auto-slide logic
  useEffect(() => {
    if (testimonials.length > 0) {
      const timer = setInterval(() => {
        next()
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [current, testimonials.length])

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(p => (p + 1) % testimonials.length)

  if (loading || testimonials.length === 0) return null;

  const featured = testimonials[current]

  return (
    <section id="testimonials" className="section" ref={ref}
      style={{ background: 'var(--bg-2)', overflow: 'hidden', position: 'relative', padding: '100px 0' }}
    >
      {/* Decorative Glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px',
        background: 'rgba(220, 38, 38, 0.05)', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <div className="eyebrow">Wall of Fame</div>
            <h2 className="section-title">Client Wins That <span>Speak for Themselves</span></h2>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={prev} className="nav-btn"><ChevronLeft size={20} /></button>
            <button onClick={next} className="nav-btn"><ChevronRight size={20} /></button>
          </div>
        </motion.div>

        {/* Main Display Grid */}
        <div className="testimonial-display-grid">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={featured._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="testimonial-main-card"
            >
              {/* Media Content Area */}
              {featured.type !== 'text' && (
                <div className="testimonial-media-box">
                  {featured.type === 'video' ? (
                    <video 
                      key={featured.content} // Force reload on change
                      src={`https://ntswithankit.com${featured.content}`} 
                      controls 
                      className="t-video"
                    />
                  ) : (
                    <img 
                      src={`https://ntswithankit.com${featured.content}`} 
                      alt={`${featured.name}'s testimonial`} 
                      className="t-image"
                    />
                  )}
                </div>
              )}

              {/* Text Content Area */}
              <div className="testimonial-content-box" style={{ flex: featured.type === 'text' ? '1' : '0.8' }}>
                <Quote size={60} color="var(--red)" style={{ opacity: 0.1, marginBottom: -40, alignSelf: 'flex-start' }} />
                
                <div style={{ marginBottom: 16 }}>
                  <StarRating count={featured.rating} />
                </div>

                <div className="quote-container">
                  <p className="testimonial-quote">
                     {featured.type === 'text' ? (
                        `"${featured.content}"`
                     ) : (
                        `"${featured.name} achieved incredible results through our specialized programs. Watch the full story to see the transformation."`
                     )}
                  </p>
                </div>

                <div className="testimonial-author-meta">
                  <div className="author-avatar">{featured.name[0]}</div>
                  <div>
                    <h4 className="author-name">{featured.name}</h4>
                    <p className="author-role">{featured.role}</p>
                  </div>
                </div>

                {featured.result && (
                  <div className="result-tag">
                    <span style={{ color: 'var(--red)', fontWeight: 800 }}>IMPACT:</span> {featured.result}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side Nav Thumbnails */}
          <div className="testimonial-sidebar-nav">
            {testimonials.map((t, i) => (
              <button key={t._id} onClick={() => setCurrent(i)}
                className={`thumb-btn ${i === current ? 'active' : ''}`}
              >
                <div className="thumb-icon">
                  {t.type === 'video' ? <VideoIcon size={12}/> : t.type === 'image' ? <ImageIcon size={12}/> : <Quote size={12}/>}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="thumb-name">{t.name}</div>
                  <div className="thumb-role">{t.role}</div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .testimonial-display-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }

        .testimonial-main-card {
          background: var(--bg);
          border: 1px solid var(--border);
          display: flex;
          min-height: 500px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .testimonial-media-box {
          flex: 1.2;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid var(--border);
          position: relative;
        }

        .t-video, .t-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          max-height: 500px;
        }

        .testimonial-content-box {
          padding: 60px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(to bottom right, var(--bg), var(--bg-2));
        }

        .testimonial-quote {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text);
          font-style: italic;
          font-weight: 300;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
        }

        .testimonial-author-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          background: var(--red);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-head);
          font-weight: 800;
          border-radius: 2px;
          font-size: 1.2rem;
        }

        .author-name {
          font-family: var(--font-head);
          text-transform: uppercase;
          font-size: 1rem;
          margin: 0;
          letter-spacing: 0.05em;
          color: var(--text);
        }

        .author-role {
          font-size: 0.8rem;
          color: var(--text-dim);
          margin: 2px 0 0 0;
        }

        .result-tag {
          display: inline-block;
          padding: 12px 20px;
          background: var(--red-dim);
          border: 1px solid var(--border-red);
          font-size: 0.75rem;
          font-family: var(--font-head);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .nav-btn {
          width: 50px;
          height: 50px;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-btn:hover {
          background: var(--red);
          color: #fff;
          border-color: var(--red);
          transform: translateY(-2px);
        }

        .testimonial-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: var(--border);
          border: 1px solid var(--border);
          max-height: 500px;
          overflow-y: auto;
        }

        .thumb-btn {
          padding: 20px;
          background: var(--bg-2);
          border: none;
          display: flex;
          gap: 14px;
          align-items: center;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
          border-left: 4px solid transparent;
        }

        .thumb-btn:hover {
          background: var(--surface);
        }

        .thumb-btn.active {
          background: var(--surface);
          border-left-color: var(--red);
        }

        .thumb-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--bg-3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          flex-shrink: 0;
        }

        .active .thumb-icon {
          color: var(--red);
          background: var(--red-dim);
        }

        .thumb-name {
          font-family: var(--font-head);
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text);
          font-weight: 700;
          margin-bottom: 2px;
        }

        .thumb-role {
          font-size: 0.7rem;
          color: var(--text-dim);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1100px) {
          .testimonial-display-grid { grid-template-columns: 1fr; }
          .testimonial-sidebar-nav { display: none; }
        }

        @media (max-width: 768px) {
          .testimonial-main-card { flex-direction: column; min-height: auto; }
          .testimonial-media-box { height: 300px; border-right: none; border-bottom: 1px solid var(--border); flex: none; }
          .testimonial-content-box { padding: 40px 24px; }
          .testimonial-quote { font-size: 1rem; }
        }
      `}</style>
    </section>
  )
}