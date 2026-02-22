import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Who is your coaching ideal for?',
    a: "My coaching is perfect for entrepreneurs, sales professionals, business owners, consultants, and corporate sales teams looking to improve their conversion rates, build confidence, and close high-ticket deals. Whether you're just starting out or have years of experience, my personalized approach will meet you where you are.",
  },
  {
    q: 'What can I expect from a coaching session?',
    a: "Each session is practical, goal-oriented, and tailored to your needs. We'll break down your sales process, refine your pitch, handle objections, and role-play real-world scenarios. You'll leave every session with actionable insights and clear next steps to implement immediately.",
  },
  {
    q: 'How soon can I see results?',
    a: 'Many clients start seeing noticeable improvements within the first 2–4 weeks. That said, results depend on your commitment to applying the strategies consistently. I provide the tools and structure — you bring the action.',
  },
  {
    q: 'What industries do you specialize in?',
    a: "I've successfully trained teams across IT, Real Estate, FMCG, Startups, EdTech, Financial Services, and Fortune 500 companies. Sales psychology and closing frameworks are universal — the principles apply across all industries, and I customize them to your specific market.",
  },
  {
    q: 'Is the Nail the Sale course self-paced?',
    a: 'Yes! The Nail the Sale course is fully self-paced with 24 modules you can complete on your own schedule. You get lifetime access to all course material, including any future updates. Each module is designed for focused, bite-sized learning so you can implement as you go.',
  },
  {
    q: 'How is Corporate Sales Training different from the online course?',
    a: "Corporate Sales Training is a live, fully customized workshop program designed for teams. It includes role plays, real scenario exercises, and is tailored to your specific industry, sales cycle, and pain points. It's an immersive experience — not a pre-recorded course.",
  },
  {
    q: 'Do you offer a free discovery call?',
    a: "Absolutely. I encourage everyone to book a free 20-minute discovery call before committing to any program. This helps us both understand whether we're the right fit and what kind of support will serve you best. Use the contact form or call directly to schedule.",
  },
]

export default function FAQSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section" ref={ref}
      style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>

          {/* Left sticky header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ position: 'sticky', top: 100 }}
          >
            <div className="eyebrow">FAQ</div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="section-sub" style={{ marginBottom: 32 }}>
              Everything you need to know before taking the next step. Can't find your answer? Just reach out.
            </p>
            <a href="/#contact" className="btn btn-primary">Ask a Question</a>

            {/* Decorative stat */}
            <div style={{
              marginTop: 40, padding: '20px 24px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--red)',
            }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--text)', lineHeight: 1 }}>98%</div>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>
                Client Satisfaction Rate
              </div>
            </div>
          </motion.div>

          {/* Right — Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            {faqs.map((faq, i) => (
              <div key={i}
                style={{
                  background: open === i ? 'var(--surface-2)' : 'var(--surface)',
                  border: '1px solid',
                  borderColor: open === i ? 'var(--border-red)' : 'var(--border)',
                  transition: 'all 0.25s',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.65rem',
                      color: open === i ? 'var(--red)' : 'var(--text-dim)',
                      minWidth: 28, flexShrink: 0, letterSpacing: '0.1em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-head)', fontWeight: 700,
                      fontSize: '0.95rem', letterSpacing: '0.03em', textTransform: 'uppercase',
                      color: open === i ? 'var(--text)' : 'var(--text-muted)',
                      textAlign: 'left', lineHeight: 1.3,
                    }}>
                      {faq.q}
                    </span>
                  </div>

                  {/* Plus/Minus icon */}
                  <div style={{
                    width: 28, height: 28, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: open === i ? 'var(--red)' : 'var(--surface)',
                    border: '1px solid',
                    borderColor: open === i ? 'var(--red)' : 'var(--border)',
                    transition: 'all 0.2s',
                  }}>
                    {open === i
                      ? <Minus size={14} color="#fff" />
                      : <Plus size={14} color="var(--text-muted)" />
                    }
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div style={{ padding: '0 24px 20px 66px' }}>
                        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #faq .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #faq .container > div > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}