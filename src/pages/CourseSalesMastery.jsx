import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CheckCircle, Target, Zap, ArrowLeft, Send,
  Brain, TrendingUp, MessageSquare, Users, Shield, Award, BookOpen
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const modules = [
  { num: '01', title: 'Sales Ignite & the Mindset of Top Performers', desc: 'Build the mental frameworks that separate top closers from the rest — confidence, resilience, and goal-setting.', topics: ["Basic reasons a sale doesn't happen", 'Common confidence killers', '5 ways to build unshakeable confidence', 'Key takeaways & action plan'] },
  { num: '02', title: 'Exploring the Psychology of Buying', desc: 'Deep-dive into the psychological triggers that drive consumer purchasing decisions and how to leverage them ethically.', topics: ['The real reason behind every purchase', 'B2B & B2C customer buying behaviour', 'Psychology of trust and risk', 'Strategies to apply in your business'] },
  { num: '03', title: "Buyer's Journey & Sales Pipeline", desc: 'Master the complete sales process from first contact to signed deal with a structured pipeline approach.', topics: ['How to define your ideal customer avatar', 'Leads source mapping & prospecting', "4 stages of the buyer's journey", 'Pipeline forecasting & planning'] },
  { num: '04', title: 'Demand Triggers Technique', desc: 'Create urgency and demand for your products or services using proven psychological triggers.', topics: ['7 types of demand triggers', '5 common mistakes to avoid', '3-step framework for urgency', 'The "make them beg to buy" formula'] },
  { num: '05', title: 'How to Create Offers in Demand', desc: 'Craft irresistible offers that make your product the only obvious choice for your ideal client.', topics: ['Product vs offer — the key difference', 'When offers outshine products', 'Crafting an irresistible offer', 'Real-life case studies for execution'] },
  { num: '06', title: 'The Power of Tonality', desc: 'Master vocal tone to build instant trust, rapport, and persuasive authority in every conversation.', topics: ['Why the tone matters in sales', 'Elements of effective tonality', 'Types of tonalities & pitfalls', 'Practical exercises & action plan'] },
  { num: '07', title: 'Closing Secrets', desc: 'Learn advanced closing frameworks that convert conversations into signed deals — without pressure.', topics: ['Why people love to buy but hate to pay', '2 types of closing approach', '5 negotiation techniques', 'Closing techniques & action plan'] },
  { num: '08', title: 'Advance Objection Handling', desc: 'Identify and dismantle every objection your prospects throw — turn "no" into a committed "yes".', topics: ['Identify real reasons behind objections', 'Why objection isolation is critical', 'Types of common objections', 'Confidence-building response scripts'] },
  { num: '09', title: 'Follow-Up & Relationship Selling', desc: 'Convert cold leads and build long-term client relationships that generate repeat revenue.', topics: ['Follow-up behaviour & timing', 'Psychology behind multiple follow-ups', 'Follow-up strategies that work', 'Why relationship beats transaction'] },
  { num: '10', title: 'Unlocking Revenue in the Digital Age', desc: 'Leverage AI, digital channels, and modern tools to build a scalable, future-proof sales engine.', topics: ['Traditional vs digital selling', 'Channels of digital selling', 'New age word-of-mouth selling', 'Strategies of hybrid selling'] },
]

const includes = [
  'Expert-Led Training by Industry Professionals',
  'Practical Hands-on Exercises & Role Plays',
  'Personalized One-on-One Coaching',
  'Video Tutorials & Resource Library',
  'Community Support & Ongoing Access',
  'Key Takeaways & Action Plans per Module',
  'Real-Life Case Studies for Every Topic',
  'Certificate of Completion',
]

const outcomes = [
  { icon: Target,        stat: 'Laser-Target', label: 'Ideal Clients' },
  { icon: MessageSquare, stat: 'Start',         label: 'Natural Conversations' },
  { icon: Award,         stat: 'Prove',         label: "Your Offer's Value" },
  { icon: Zap,           stat: 'Melt Away',     label: 'Every Objection' },
]

export default function CourseSalesmastery() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Sales Mastery Program | Ankit Khare'
  }, [])

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1000))
      toast.success('Request sent! Our team will contact you within 24 hours.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="page-enter">
      <Navbar />

      {/* ── Hero ── */}
      <section className="smp-hero">
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: 520, height: 520, background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" className="smp-back-link"
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          ><ArrowLeft size={14} /> Back to Home</Link>

          <div className="smp-hero-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="badge badge-red" style={{ marginBottom: 20 }}><span className="red-dot" /> NTS Signature Program</span>
              <div className="eyebrow">10-Module Transformation</div>
              <h1 className="smp-h1">Sales <span style={{ color: 'var(--red)' }}>Mastery</span><br />Program</h1>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
                Turn Your Profession into Predictable, Growing Income
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32, maxWidth: 480 }}>
                A proven 10-module sales training that gives you the exact roadmap to attract perfect-fit clients effortlessly and authentically — without ever feeling "salesy".
              </p>
              <div className="smp-stats-grid" style={{ marginBottom: 32 }}>
                {outcomes.map(({ icon: Icon, stat, label }) => (
                  <div key={label} style={{ background: 'var(--surface)', padding: '14px 8px', textAlign: 'center' }}>
                    <Icon size={14} color="var(--red)" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.2 }}>{stat}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#enroll" className="btn btn-primary">Enroll Now</a>
                <a href="#modules" className="btn btn-outline">View Modules</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '32px 28px' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 20 }}>What's Included</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle size={15} color="var(--red)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28, padding: '16px', background: 'var(--red-dim)', border: '1px solid var(--border-red)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <Shield size={16} color="var(--red)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>Results-Focused Guarantee</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5, margin: 0 }}>
                    Built on real-world sales frameworks that deliver measurable results — regardless of your industry.
                  </p>
                  <a href="#enroll" className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>Get In Touch For Pricing</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Outcomes Bar ── */}
      <section style={{ background: 'var(--bg-2)', padding: '60px 0' }}>
        <div className="container">
          <div className="smp-outcomes-grid">
            {[
              { icon: Target,        label: 'Laser-Target Clients',  desc: 'Find people who already want what you offer' },
              { icon: MessageSquare, label: 'Natural Conversations', desc: 'Open dialogues that feel like friendly chats' },
              { icon: Award,         label: 'Prove Your Value',      desc: 'Make your offer worth every penny' },
              { icon: Zap,           label: 'Melt Objections',       desc: 'Handle pushback with grace and zero pressure' },
              { icon: TrendingUp,    label: 'Close With Confidence', desc: 'Sign new clients naturally and authentically' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{ background: 'var(--surface)', padding: '24px 20px', textAlign: 'center' }}>
                <Icon size={22} color="var(--red)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text)', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 300, lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section id="modules" style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Full Curriculum</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>10 Modules. <span>Zero Fluff.</span> Pure Results.</h2>
          </div>
          <div className="smp-modules-grid">
            {modules.map((mod, i) => (
              <motion.div key={mod.num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.07 }}
                className="smp-module-card" whileHover={{ backgroundColor: '#0f0f0f' }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'rgba(220,38,38,0.2)', flexShrink: 0, lineHeight: 1 }}>{mod.num}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--text)', lineHeight: 1.3, marginBottom: 4 }}>{mod.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5 }}>{mod.desc}</div>
                  </div>
                </div>
                <div className="smp-topics-grid">
                  {mod.topics.map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <div style={{ width: 3, height: 3, background: 'var(--red)', flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: '0.73rem', color: 'var(--text-dim)', fontWeight: 300, lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Highlights ── */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Program Highlights</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Sales Mastery <span>Works</span></h2>
          </div>
          <div className="smp-highlights-grid">
            {[
              { icon: Brain,    title: 'Expert-Led Training',        desc: 'Gain insights from experienced sales professionals who understand the nuances of real-world selling across industries.' },
              { icon: Zap,      title: 'Practical Applications',     desc: 'Engage in hands-on exercises that translate theory into actionable strategies, ensuring immediate applicability.' },
              { icon: Users,    title: 'Personalized Support',       desc: 'Benefit from one-on-one coaching and feedback to address your specific challenges and enhance individual performance.' },
              { icon: BookOpen, title: 'Ongoing Learning Resources', desc: 'Access video tutorials, a resource library, and community support to foster continuous improvement.' },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ background: 'var(--bg)', padding: '28px', display: 'flex', gap: 20, alignItems: 'flex-start', transition: 'background 0.2s' }}
                whileHover={{ backgroundColor: '#0f0f0f' }}
              >
                <Icon size={22} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text)', marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enrollment Form ── */}
      <section id="enroll" style={{ background: 'var(--bg)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Enrollment</div>
              <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to <span>Master Sales?</span></h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 300, marginTop: 12 }}>Fill in your details and our team will reach out within 24 hours.</p>
            </div>
            <div className="smp-form-card">
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your full name" {...register('name', { required: 'Required' })} />
                    {errors.name && <span className="form-error">{errors.name.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" placeholder="your@email.com" type="email" {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} />
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                  </div>
                </div>
                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel" {...register('phone', { required: 'Required' })} />
                    {errors.phone && <span className="form-error">{errors.phone.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Your Profession *</label>
                    <input className="form-input" placeholder="e.g. Sales Executive, Freelancer, Coach" {...register('profession', { required: 'Required' })} />
                    {errors.profession && <span className="form-error">{errors.profession.message}</span>}
                  </div>
                </div>
                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Sales Experience</label>
                    <select className="form-input" {...register('experience')} style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                      <option value="">Select level...</option>
                      <option value="none">No sales experience</option>
                      <option value="beginner">1–2 years</option>
                      <option value="intermediate">3–5 years</option>
                      <option value="senior">5+ years</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Industry / Sector</label>
                    <input className="form-input" placeholder="e.g. Real Estate, IT, EdTech, Finance" {...register('industry')} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">How Did You Hear About Us?</label>
                  <select className="form-input" {...register('source')} style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                    <option value="">Select...</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral / Friend</option>
                    <option value="google">Google Search</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">What's Your Biggest Sales Challenge Right Now?</label>
                  <textarea className="form-input" placeholder="Describe your current challenges — objections, closing, leads, confidence, etc." {...register('challenge')} style={{ minHeight: 110 }} />
                </div>
                <input type="hidden" value="sales-mastery-program" {...register('course')} />
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}
                  style={{ justifyContent: 'center', width: '100%', padding: '16px', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Enrollment Request</>}
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>No spam. Your information is safe and will only be used to contact you about this program.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .smp-hero { min-height: 70vh; background: var(--bg); display: flex; align-items: center; padding-top: 100px; padding-bottom: 60px; position: relative; overflow: hidden; }
        .smp-back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); font-family: var(--font-head); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 32px; transition: color 0.2s; }
        .smp-h1 { font-family: var(--font-head); font-weight: 900; font-size: clamp(2.4rem, 5.5vw, 5rem); text-transform: uppercase; line-height: 1; color: var(--text); margin-bottom: 8px; }
        .smp-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .smp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .smp-outcomes-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; background: var(--border); }
        .smp-modules-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; background: var(--border); }
        .smp-module-card { background: var(--bg-2); padding: 24px 28px; transition: background 0.2s; }
        .smp-topics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; padding-left: 52px; }
        .smp-highlights-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; background: var(--border); }
        .smp-form-card { background: var(--bg-2); border: 1px solid var(--border); border-top: 3px solid var(--red); padding: 40px 36px; }
        .smp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 900px) {
          .smp-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .smp-outcomes-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .smp-modules-grid { grid-template-columns: 1fr !important; }
          .smp-highlights-grid { grid-template-columns: 1fr !important; }
          .smp-form-row { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 600px) {
          .smp-hero { padding-top: 80px; padding-bottom: 40px; }
          .smp-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .smp-outcomes-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .smp-module-card { padding: 20px 16px; }
          .smp-topics-grid { grid-template-columns: 1fr !important; padding-left: 0 !important; margin-top: 10px; }
          .smp-form-card { padding: 24px 16px; }
        }
      `}</style>
    </div>
  )
}