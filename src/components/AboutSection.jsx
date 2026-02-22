import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Zap, CheckCircle } from 'lucide-react'
import CountUp from 'react-countup'

const stats = [
  { icon: TrendingUp, value: 18,   suffix: '+', label: 'Years Experience' },
  { icon: Users,      value: 5000, suffix: '+', label: 'Professionals Trained' },
  { icon: Award,      value: 500,  suffix: '+', label: 'Corporate Workshops' },
  { icon: Zap,        value: 100,  suffix: '+', label: 'High-Impact Workshops' },
]

const brands = ['Network18', 'Dainik Bhaskar', 'Times of India', 'IndiaMart', 'Reliance Retail']

const highlights = [
  'Dale Carnegie & Neuroscience Certified Sales Coach',
  'Rose from Executive to AVP leading 1,000+ executives',
  "Generated crores in revenue for India's biggest brands",
  'Expert in Sales Psychology & High-Ticket Closures',
  'Trained teams across IT, Real Estate, Startups & Fortune 500',
]

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="section" ref={ref}
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)', overflow: 'hidden' }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Left — Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            {/* Main image frame */}
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              {/* Corner brackets */}
              {['tl','tr','bl','br'].map(pos => (
                <div key={pos} style={{
                  position: 'absolute',
                  width: 32, height: 32,
                  borderColor: 'var(--red)',
                  borderStyle: 'solid',
                  borderWidth: pos.includes('t') && pos.includes('l') ? '2px 0 0 2px'
                             : pos.includes('t') && pos.includes('r') ? '2px 2px 0 0'
                             : pos.includes('b') && pos.includes('l') ? '0 0 2px 2px'
                             : '0 2px 2px 0',
                  top:    pos.includes('t') ? -8 : 'auto',
                  bottom: pos.includes('b') ? -8 : 'auto',
                  left:   pos.includes('l') ? -8 : 'auto',
                  right:  pos.includes('r') ? -8 : 'auto',
                  zIndex: 2,
                  opacity: 0.7,
                }} />
              ))}

              <img
                src="/assets/ankit-hero.png"
                alt="Ankit Khare"
                style={{
                  width: '100%', maxHeight: 500,
                  objectFit: 'cover', objectPosition: 'top',
                  filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))',
                  position: 'relative', zIndex: 1,
                }}
              />

              {/* Floating badge */}
              <div style={{
                position: 'absolute', bottom: 24, right: -20,
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--red)',
                padding: '14px 20px', zIndex: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--text)', lineHeight: 1 }}>18+</div>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>Years in Sales</div>
              </div>
            </div>

            {/* Brands ticker */}
            <div style={{ marginTop: 32, padding: '16px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 10 }}>
                Worked With
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {brands.map(b => (
                  <span key={b} style={{
                    padding: '4px 10px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-head)', fontWeight: 600,
                    fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                  }}>{b}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="eyebrow">About Me</div>
            <h2 className="section-title" style={{ marginBottom: 8 }}>
              Nail the Sale <span>with Ankit</span>
            </h2>
            <div style={{ width: 48, height: 3, background: 'var(--red)', marginBottom: 24 }} />

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 24 }}>
              I'm <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Ankit Khare</strong> — Dale Carnegie & Neuroscience Certified Sales Coach. With <strong style={{ color: 'var(--text)', fontWeight: 600 }}>18 years of corporate sales firepower</strong>, I've worked with India's biggest brands, rising from an executive to the AVP level and leading <strong style={{ color: 'var(--text)', fontWeight: 600 }}>1,000+ executives</strong> to deliver record-breaking results.
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
              Today, I channel that experience into <strong style={{ color: 'var(--text)', fontWeight: 600 }}>100+ high-impact workshops</strong> for industries ranging from IT and real estate to startups and Fortune 500 giants — blending <strong style={{ color: 'var(--text)', fontWeight: 600 }}>battle-tested strategies</strong> with <strong style={{ color: 'var(--text)', fontWeight: 600 }}>neuroscience-backed buyer psychology</strong>.
            </p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
              {highlights.map((h, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}
                >
                  <CheckCircle size={15} color="var(--red)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5 }}>{h}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1, background: 'var(--border)',
              border: '1px solid var(--border)', marginBottom: 32,
            }}>
              {stats.map(({ icon: Icon, value, suffix, label }) => (
                <div key={label} style={{ background: 'var(--bg)', padding: '16px 12px', textAlign: 'center' }}>
                  <Icon size={16} color="var(--red)" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--text)', lineHeight: 1 }}>
                    {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : `0${suffix}`}
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/#contact" className="btn btn-primary">Work With Me</a>
              <a href="/#courses" className="btn btn-outline">View Courses</a>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #about .container > div > div:first-child { order: 2; }
          #about .container > div > div:last-child  { order: 1; }
        }
        @media (max-width: 600px) {
          #about .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  )
}