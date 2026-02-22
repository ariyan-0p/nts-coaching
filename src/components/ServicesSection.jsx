import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Brain, Target, Lightbulb, Users, BarChart3, Phone } from 'lucide-react'

const services = [
  {
    icon: Brain,
    number: '01',
    title: 'Sales Psychology That Converts',
    desc: 'Discover the proven psychological principles that drive buying decisions. Learn how to influence prospects ethically by tapping into trust, emotion, urgency, and authority — closing more deals without sounding pushy.',
    tags: ['Trust Building', 'Buyer Emotion', 'Urgency Triggers'],
  },
  {
    icon: Target,
    number: '02',
    title: 'High-Ticket Sales Strategies',
    desc: 'Master the art of selling premium offers with confidence and clarity. Position high-value services, lead effective discovery calls, and overcome pricing objections to attract serious buyers and close ₹50k+ deals consistently.',
    tags: ['Discovery Calls', 'Price Objections', '₹50k+ Deals'],
  },
  {
    icon: Lightbulb,
    number: '03',
    title: 'Real-World Sales Tips That Deliver',
    desc: 'Get access to field-tested sales techniques that actually work in real conversations. From opening lines to follow-up messages — every tip is practical, simple, and results-driven for any experience level.',
    tags: ['Opening Lines', 'Follow-Up', 'Proven Scripts'],
  },
  {
    icon: Users,
    number: '04',
    title: '1-on-1 Sales Coaching',
    desc: 'Weekly personalized sessions tailored to your business model. We focus on your real challenges, fine-tune your scripts, mindset, and follow-up strategies. Ideal for Freelancers, Consultants, and Entrepreneurs.',
    tags: ['Freelancers', 'Consultants', 'Entrepreneurs'],
  },
  {
    icon: BarChart3,
    number: '05',
    title: 'Corporate Sales Training',
    desc: 'In-depth sales workshops for your entire team — fully customized to your industry and sales cycle. Includes role plays, frameworks, and KPI tracking. Improves team productivity by 30–60%.',
    tags: ['Role Plays', 'KPI Tracking', '30–60% Uplift'],
  },
  {
    icon: Phone,
    number: '06',
    title: 'Sales Funnel Diagnosis',
    desc: 'Not converting? I\'ll audit your complete sales funnel — from first contact to close — and identify & fix the leaks fast. Includes a Video Review, PDF Report, and a 30-Min Strategy Session.',
    tags: ['Full Audit', 'PDF Report', '30-Min Strategy'],
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="section" ref={ref}
      style={{ background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '40%', right: '-10%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'end' }}
        >
          <div>
            <div className="eyebrow">What We Do</div>
            <h2 className="section-title">Ready To Level Up <span>Your Sales</span></h2>
          </div>
          <div>
            <p className="section-sub">
              Comprehensive sales coaching programs designed to transform individuals and teams into high-performance closing machines — regardless of industry or experience level.
            </p>
            <a href="/#contact" className="btn btn-primary" style={{ marginTop: 20 }}>
              Let's Talk Strategy
            </a>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
          {services.map(({ icon: Icon, number, title, desc, tags }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: 'var(--bg-2)',
                padding: '36px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'background 0.25s',
              }}
              whileHover={{ backgroundColor: '#0f0f0f' }}
            >
              {/* Number watermark */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: 'var(--font-head)', fontWeight: 900,
                fontSize: '4rem', color: 'rgba(255,255,255,0.03)',
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
              }}>{number}</div>

              {/* Red left border on hover */}
              <motion.div
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 3, background: 'var(--red)',
                  scaleY: 0, originY: 0,
                }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <div style={{
                width: 44, height: 44, marginBottom: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--red-dim)', border: '1px solid var(--border-red)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}>
                <Icon size={20} color="var(--red)" />
              </div>

              <h3 style={{
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: '1.15rem', letterSpacing: '0.02em', textTransform: 'uppercase',
                color: 'var(--text)', marginBottom: 12, lineHeight: 1.2,
              }}>{title}</h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 20 }}>
                {desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 8px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    fontFamily: 'var(--font-head)', fontWeight: 600,
                    fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: 1,
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderTop: 'none',
            padding: '24px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text)' }}>
            Ready to <span style={{ color: 'var(--red)' }}>transform</span> your sales performance?
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="tel:+919752809028" className="btn btn-outline btn-sm">
              <Phone size={14} /> Call Now
            </a>
            <a href="/#contact" className="btn btn-primary btn-sm">Get Started</a>
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          #services .services-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          #services .container > div:first-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #services .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}