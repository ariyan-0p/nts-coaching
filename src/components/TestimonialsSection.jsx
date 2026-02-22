import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react'

// Static testimonials (will be replaced by API data when backend is ready)
const staticTestimonials = [
  {
    id: 1,
    type: 'text',
    name: 'Radhika Menon',
    role: 'Founder, Thrive Wellness Studio',
    image: 'https://ntswithankit.com/wp-content/uploads/2025/09/p1-3.png',
    text: 'Working with Ankit Khare transformed the way I approached client conversations. I used to underprice my wellness programs and hesitate during discovery calls. After just a few coaching sessions, I confidently closed my first ₹85,000 package. His blend of psychology and practical coaching is unmatched.',
    rating: 5,
    result: 'Closed ₹85,000 deal',
  },
  {
    id: 2,
    type: 'text',
    name: 'Arjun Patel',
    role: 'Regional Sales Manager, NexaTech Solutions',
    image: 'https://ntswithankit.com/wp-content/uploads/2025/09/p1.png',
    text: 'Ankit conducted a 3-day workshop for our enterprise sales team. His energy, insights, and objection-handling frameworks were game-changing. Our average deal size increased by 35% within two months, and the team finally feels confident with high-ticket pitches.',
    rating: 5,
    result: '35% deal size increase',
  },
  {
    id: 3,
    type: 'text',
    name: 'Rishabh Jain',
    role: 'Freelance Branding Consultant',
    image: 'https://ntswithankit.com/wp-content/uploads/2025/09/p1-1.png',
    text: 'Before meeting Ankit, I was stuck closing small-ticket projects despite having the skills. His coaching helped me refine my pitch, reframe client objections, and confidently charge what I\'m worth. I recently landed a ₹1.2L client after using his call structure!',
    rating: 5,
    result: '₹1.2L client landed',
  },
  {
    id: 4,
    type: 'text',
    name: 'Deepak Chauhan',
    role: 'Director, Elevate Realtors',
    image: 'https://ntswithankit.com/wp-content/uploads/2025/09/p1-2.png',
    text: 'We\'ve worked with many trainers, but Ankit\'s workshop was different — it was real, relatable, and deeply impactful. His understanding of sales psychology helped our team move from transactional selling to consultative closing. We\'ve seen over a 40% improvement in lead conversion.',
    rating: 5,
    result: '40% conversion improvement',
  },
]

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
  const [testimonials, setTestimonials] = useState(staticTestimonials)

  // When backend is ready, fetch dynamic testimonials
  // useEffect(() => {
  //   fetch('/api/testimonials').then(r => r.json()).then(data => setTestimonials(data))
  // }, [])

  const prev = () => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent(p => (p + 1) % testimonials.length)

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [testimonials.length])

  const featured = testimonials[current]

  return (
    <section id="testimonials" className="section" ref={ref}
      style={{ background: 'var(--bg-2)', overflow: 'hidden', position: 'relative' }}
    >
      {/* Decorative */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <div className="eyebrow">Testimonials</div>
            <h2 className="section-title">Client Wins That <span>Speak for Themselves</span></h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={prev} style={{
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.borderColor = 'var(--border-red)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            ><ChevronLeft size={18} /></button>
            <button onClick={next} style={{
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dim)'; e.currentTarget.style.borderColor = 'var(--border-red)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            ><ChevronRight size={18} /></button>
          </div>
        </motion.div>

        {/* Main testimonial spotlight */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}>

          {/* Featured */}
          <AnimatePresence mode="wait">
            <motion.div key={featured.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderLeft: '3px solid var(--red)',
                padding: '36px 32px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <Quote size={48} color="rgba(220,38,38,0.1)" style={{ position: 'absolute', top: 20, right: 20 }} />

              <StarRating count={featured.rating} />

              <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.8, fontWeight: 300, fontStyle: 'italic', margin: '20px 0 24px' }}>
                "{featured.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <img
                  src={featured.image}
                  alt={featured.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-red)' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'var(--red)', color: '#fff',
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem',
                  border: '2px solid var(--border-red)',
                }}>
                  {featured.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text)' }}>
                    {featured.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 300 }}>{featured.role}</div>
                </div>
              </div>

              {/* Result badge */}
              <div style={{
                marginTop: 20, padding: '8px 14px',
                background: 'var(--red-dim)', border: '1px solid var(--border-red)',
                display: 'inline-block',
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#f87171',
              }}>
                ↑ {featured.result}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnail list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {testimonials.map((t, i) => (
              <button key={t.id} onClick={() => setCurrent(i)}
                style={{
                  flex: 1, textAlign: 'left', padding: '16px 20px',
                  background: i === current ? 'var(--red-dim)' : 'var(--surface)',
                  border: 'none', borderLeft: `3px solid ${i === current ? 'var(--red)' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <img
                  src={t.image} alt={t.name}
                  style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  onError={e => { e.target.src = ''; e.target.style.background = 'var(--red)' }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: i === current ? 'var(--text)' : 'var(--text-muted)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 300, marginTop: 2 }}>{t.role}</div>
                </div>
                {i === current && (
                  <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{
                height: 2, borderRadius: 2, border: 'none', cursor: 'pointer',
                width: i === current ? 32 : 16,
                background: i === current ? 'var(--red)' : 'var(--border)',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #testimonials .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #testimonials .container > div:nth-child(2) > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}