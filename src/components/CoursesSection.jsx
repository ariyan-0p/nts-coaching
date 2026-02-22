import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Award, Clock, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const courses = [
  {
    id: 'fmp',
    href: '/courses/fmp',
    tag: '2.5-Month Live Course',
    title: 'Financial Market Professional',
    subtitle: 'FMP — Never Depend on a Single Income',
    desc: 'A certified 4-module program covering Stock Market Fundamentals, Money Management, Technical Analysis, and Derivatives — designed to help you achieve financial freedom.',
    modules: 4,
    students: '1,000+',
    duration: '2.5 Months',
    level: 'All Levels',
    highlights: [
      'Stock Market Fundamentals & Indices',
      'Money Management & Financial Goals',
      'Technical Analysis — Charts, Indicators, SMC',
      'Futures & Options — Greeks, Hedging, Strategies',
      '25+ Back-tested Trading Strategies',
      '25+ Screeners for Investing',
    ],
    badge: 'Certified',
  },
  {
    id: 'sales-mastery',
    href: '/courses/sales-mastery',
    tag: '10-Module Transformation',
    title: 'Sales Mastery Program',
    subtitle: 'Turn Your Profession into Predictable Income',
    desc: 'A proven 10-module sales training that gives you the exact roadmap to attract perfect-fit clients effortlessly and authentically — without ever feeling "salesy".',
    modules: 10,
    students: '500+',
    duration: 'Self-paced',
    level: 'All Levels',
    highlights: [
      'Sales Ignite & Top Performer Mindset',
      'Psychology of Buying & Demand Triggers',
      'Closing Secrets & Negotiation Tactics',
      'Advance Objection Handling',
      'Follow-Up & Relationship Selling',
      'Unlocking Revenue in the Digital Age',
    ],
    badge: 'NTS Signature',
  },
]

export default function CoursesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { theme } = useTheme()

  const moduleHoverBg = theme === 'light' ? '#f1f3f5' : '#0f0f0f'

  return (
    <section id="courses" className="section" ref={ref}
      style={{ background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 400, height: 400,
        background: 'radial-gradient(circle, var(--red-dim) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span style={{ width: 24, height: 2, background: 'var(--red)', display: 'inline-block' }} />
            Courses
            <span style={{ width: 24, height: 2, background: 'var(--red)', display: 'inline-block' }} />
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Programs Built for <span>Real Results</span>
          </h2>
          <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center' }}>
            Four powerhouse programs — from sales mastery to financial market expertise — designed to transform how you earn, sell, and invest.
          </p>
        </motion.div>

        {/* Course Cards — 2x2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 64 }}>
          {courses.map((course, i) => (
            <motion.div key={course.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Top accent bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--red), transparent)' }} />

              {/* Badge */}
              <div style={{ padding: '24px 28px 0' }}>
                <span className="badge badge-red" style={{ marginBottom: 16 }}>
                  <span className="red-dot" /> {course.badge}
                </span>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>{course.tag}</div>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
                  {course.title}
                </h3>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 16 }}>
                  {course.subtitle}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>
                  {course.desc}
                </p>
              </div>

              {/* Meta row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', margin: '0 28px', marginBottom: 24 }}>
                {[
                  { icon: BookOpen, label: 'Modules',  value: course.modules ? `${course.modules}` : 'Custom' },
                  { icon: Users,    label: 'Trained',  value: course.students },
                  { icon: Clock,    label: 'Duration', value: course.duration },
                  { icon: Award,    label: 'Level',    value: course.level },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ background: 'var(--bg)', padding: '12px 8px', textAlign: 'center' }}>
                    <Icon size={13} color="var(--red)" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.72rem', color: 'var(--text)', lineHeight: 1.1 }}>{value}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div style={{ padding: '0 28px', flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 12 }}>What You Get</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {course.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <ChevronRight size={13} color="var(--red)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ padding: 28, marginTop: 24, borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
                <Link to={course.href} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  View Details <ArrowRight size={15} />
                </Link>
                <a href="/#contact" className="btn btn-outline btn-sm">Enquire</a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          #courses > div > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}