import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CheckCircle, Target, Zap, ArrowLeft, Send,
  Brain, TrendingUp, MessageSquare, Users, Shield,
  Award, BookOpen, Star, Clock, BarChart2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// --- ADDED THESE TWO IMPORTS ---
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'

const outcomes = [
  { icon: Target,        label: 'Laser-Target Clients',  desc: 'Find people who already want what you offer' },
  { icon: MessageSquare, label: 'Natural Conversations', desc: 'Open dialogues that feel like friendly chats' },
  { icon: Award,         label: 'Prove Your Value',      desc: 'Make your offer worth every penny' },
  { icon: Zap,           label: 'Melt Objections',       desc: 'Handle pushback with grace and zero pressure' },
  { icon: TrendingUp,    label: 'Close With Confidence', desc: 'Sign new clients naturally and authentically' },
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

const highlights = [
  { icon: Brain,    title: 'Expert-Led Training',        desc: 'Gain insights from experienced sales professionals who understand real-world selling across every industry.' },
  { icon: Zap,      title: 'Practical Applications',     desc: 'Hands-on exercises that translate theory into strategies you can implement the same day you learn them.' },
  { icon: Users,    title: 'Personalized Support',       desc: 'One-on-one coaching and feedback that addresses your specific challenges and accelerates your growth.' },
  { icon: BookOpen, title: 'Ongoing Learning Resources', desc: 'Video tutorials, a resource library, and community support that keep you improving long after the program.' },
]

export default function CourseSalesMastery() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Sales Mastery Program | Ankit Khare'
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, course: 'sales-mastery' }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Something went wrong')
      toast.success('Request sent! Our team will contact you within 24 hours.')
      reset()
    } catch (error) {
      toast.error('Failed to submit: ' + error.message)
    }
  }

  return (
    <div className="page-enter">
      <Navbar />

      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section className="smp-hero">
        <div className="smp-hero-grid-bg" />
        <div className="smp-hero-glow" />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" className="smp-back-link"><ArrowLeft size={14} /> Back to Home</Link>

          <div className="smp-hero-layout">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="smp-eyebrow-wrap">
                <span className="smp-eyebrow-dot" /> NTS Signature Program
              </div>
              <h1 className="smp-h1">
                Sales<br />
                <span className="smp-h1-accent">Mastery</span><br />
                Program
              </h1>
              <p className="smp-hero-sub">
                A proven 10-module sales training that gives you the exact roadmap to attract perfect-fit clients effortlessly and authentically — without ever feeling "salesy".
              </p>
              <div className="smp-meta-row">
                {[
                  { icon: BookOpen, text: '10 Modules' },
                  { icon: Clock,    text: '~8 Hours'   },
                  { icon: Users,    text: 'All Levels'  },
                  { icon: Star,     text: '4.9 Rated'  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="smp-meta-item"><Icon size={12} /> {text}</div>
                ))}
              </div>
              <div className="smp-hero-ctas">
                <a href="#enroll" className="btn btn-primary"><Send size={15} /> Enroll Now</a>
                <a href="#modules" className="btn btn-outline"><BookOpen size={14} /> View Curriculum</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="smp-hero-card">
                <div className="smp-card-top-bar" />
                <div className="smp-card-label">What's Included</div>
                <div className="smp-includes-list">
                  {includes.map((item, i) => (
                    <motion.div key={item} className="smp-include-item"
                      initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}>
                      <CheckCircle size={14} style={{ color: 'var(--red)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="smp-card-guarantee">
                  <Shield size={16} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="smp-guarantee-title">Results-Focused Guarantee</div>
                    <p className="smp-guarantee-text">Built on real-world frameworks that deliver measurable results — regardless of your industry.</p>
                  </div>
                </div>
                <a href="#enroll" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
                  Get In Touch For Pricing
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          OUTCOMES
      ══════════════════════════ */}
      <section className="smp-outcomes-section">
        <div className="container">
          <div className="smp-outcomes-grid">
            {outcomes.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} className="smp-outcome-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="smp-outcome-icon"><Icon size={20} /></div>
                <div className="smp-outcome-label">{label}</div>
                <div className="smp-outcome-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CURRICULUM
      ══════════════════════════ */}
      <section id="modules" className="smp-curriculum-section">
        <div className="container">
          <div className="smp-section-header">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>The Curriculum</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>What Happens <span>Inside?</span></h2>
          </div>
          <div className="smp-journey">
            <div className="smp-pillars">
              {[
                { num: '01–02', theme: 'The Foundation', teaser: 'Most salespeople lose before they even open their mouth. Discover how to rewire your mindset.' },
                { num: '03–05', theme: 'The System', teaser: 'Master the sequence that top closers follow on every call.' },
                { num: '06–07', theme: 'The Conversion', teaser: 'The techniques that turn "I\'ll think about it" into signed deals.' },
                { num: '08–09', theme: 'The Armour', teaser: 'How to handle objections and price pushback with ease.' },
                { num: '10',    theme: 'The Scale', teaser: 'Multiplying your results using modern digital tools.' },
              ].map(({ num, theme, teaser }, i) => (
                <motion.div key={num} className="smp-pillar" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="smp-pillar-num">{num}</div>
                  <div className="smp-pillar-body">
                    <div className="smp-pillar-theme">{theme}</div>
                    <p className="smp-pillar-teaser">{teaser}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div className="smp-proof-block" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="smp-proof-top-bar" />
              <div className="smp-proof-headline">By the end, you won't just know how to sell. You'll think differently.</div>
              <div className="smp-proof-stats">
                 {[ { val: '10', l: 'Modules' }, { val: '8+', l: 'Hours' }, { val: '40+', l: 'Scripts' }, { val: '5K+', l: 'Trained' }].map(s => (
                   <div key={s.l} className="smp-proof-stat"><div className="smp-proof-stat-val">{s.val}</div><div className="smp-proof-stat-label">{s.l}</div></div>
                 ))}
              </div>
              <div className="smp-proof-quote">"The real transformation happens when you start applying what you learn on live calls."</div>
              <div className="smp-proof-attr">— Ankit Khare, Founder NTS</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          GRAPH & REVIEWS
      ══════════════════════════ */}
      <StatsSection />
      <TestimonialsSection />

      {/* ══════════════════════════
          ENROLL FORM (ORIGINAL FULL FLOW)
      ══════════════════════════ */}
      <section id="enroll" className="smp-enroll-section">
        <div className="smp-enroll-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="smp-enroll-wrap">
            <div className="smp-section-header">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Enrollment</div>
              <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to <span>Master Sales?</span></h2>
              <p className="smp-section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>Fill in your details and Ankit will personally respond within 24 hours.</p>
            </div>

            <div className="smp-form-card">
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your full name" {...register('fullName', { required: 'Required' })} />
                    {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" placeholder="your@email.com" type="email" {...register('email', { required: 'Required', pattern: /^\S+@\S+$/i })} />
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
                    <label className="form-label">Date of Birth</label>
                    <input className="form-input" type="date" {...register('dateOfBirth')} style={{ color: 'var(--text)' }} />
                  </div>
                </div>

                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Current Company</label>
                    <input className="form-input" placeholder="Where do you work?" {...register('currentCompany')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Designation</label>
                    <input className="form-input" placeholder="Your role / title" {...register('currentDesignation')} />
                  </div>
                </div>

                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Instagram ID</label>
                    <input className="form-input" placeholder="@yourhandle" {...register('instagramId')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn URL</label>
                    <input className="form-input" placeholder="linkedin.com/in/yourprofile" {...register('linkedinUrl')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Portfolio / Website</label>
                  <input className="form-input" placeholder="yourwebsite.com" {...register('portfolioUrl')} />
                </div>

                <div className="form-group">
                  <label className="form-label">What Help Do You Need? *</label>
                  <textarea className="form-input" placeholder="Describe your sales challenges..." {...register('helpNeeded', { required: 'Required' })} style={{ minHeight: 110 }} />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ justifyContent: 'center', width: '100%', padding: '16px', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Enrollment Request</>}
                </button>
                <p className="smp-form-note">No spam. Your data is secure.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .smp-hero { min-height: 80vh; background: var(--bg); display: flex; align-items: center; padding: 120px 0 80px; position: relative; overflow: hidden; transition: background var(--theme-speed); }
        .smp-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.6; pointer-events: none; }
        .smp-hero-glow { position: absolute; top: 20%; right: -5%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%); pointer-events: none; }
        .smp-back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 36px; }
        .smp-hero-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start; }
        .smp-eyebrow-wrap { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: var(--red-dim); border: 1px solid var(--border-red); border-radius: 2px; font-size: 0.68rem; font-weight: 700; color: var(--red); margin-bottom: 20px; }
        .smp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: smp-blink 1.5s ease-in-out infinite; }
        @keyframes smp-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .smp-h1 { font-family: var(--font-head); font-weight: 900; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 0.95; text-transform: uppercase; color: var(--text); margin-bottom: 20px; }
        .smp-h1-accent { color: var(--red); position: relative; }
        .smp-hero-sub { font-size: 1rem; color: var(--text-muted); line-height: 1.75; font-weight: 300; max-width: 460px; margin-bottom: 24px; }
        .smp-meta-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
        .smp-meta-item { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: var(--surface); border: 1px solid var(--border); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); }
        .smp-hero-card { background: var(--bg-2); border: 1px solid var(--border); padding: 32px 28px; position: relative; }
        .smp-card-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--red), transparent); }
        .smp-card-label { font-size: 0.68rem; font-weight: 700; color: var(--red); margin-bottom: 20px; text-transform: uppercase; }
        .smp-includes-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .smp-include-item { display: flex; align-items: center; gap: 10px; font-size: 0.88rem; color: var(--text-muted); font-weight: 300; }
        .smp-card-guarantee { display: flex; gap: 12px; padding: 16px; background: var(--red-dim); border: 1px solid var(--border-red); border-radius: 2px; }
        .smp-guarantee-title { font-weight: 700; font-size: 0.82rem; text-transform: uppercase; color: var(--text); margin-bottom: 4px; }
        .smp-guarantee-text { font-size: 0.78rem; color: var(--text-muted); font-weight: 300; line-height: 1.55; }
        .smp-outcomes-section { background: var(--bg-2); padding: 64px 0; }
        .smp-outcomes-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--border); }
        .smp-outcome-card { background: var(--bg-2); padding: 28px 20px; text-align: center; }
        .smp-outcome-icon { width: 44px; height: 44px; background: var(--red-dim); border: 1px solid var(--border-red); display: flex; align-items: center; justify-content: center; color: var(--red); margin: 0 auto 12px; }
        .smp-outcome-label { font-weight: 700; font-size: 0.78rem; text-transform: uppercase; color: var(--text); margin-bottom: 6px; }
        .smp-outcome-desc { font-size: 0.73rem; color: var(--text-dim); font-weight: 300; line-height: 1.5; }
        .smp-curriculum-section { background: var(--bg); padding: 80px 0; }
        .smp-section-header { text-align: center; margin-bottom: 48px; }
        .smp-section-sub { font-size: 0.95rem; color: var(--text-muted); font-weight: 300; line-height: 1.7; max-width: 580px; margin: 12px auto 0; }
        .smp-journey { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--border); border: 1px solid var(--border); }
        .smp-pillars { display: flex; flex-direction: column; gap: 1px; background: var(--border); }
        .smp-pillar { display: flex; background: var(--bg-2); transition: background 0.2s; border-left: 3px solid transparent; }
        .smp-pillar:hover { background: var(--surface-2); border-left-color: var(--red); }
        .smp-pillar-num { font-weight: 900; font-size: 0.68rem; color: var(--red); writing-mode: vertical-rl; padding: 20px 14px; border-right: 1px solid var(--border); }
        .smp-pillar-body { padding: 20px; }
        .smp-pillar-theme { font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: var(--text); margin-bottom: 8px; }
        .smp-pillar-teaser { font-size: 0.83rem; color: var(--text-muted); font-weight: 300; line-height: 1.65; }
        .smp-proof-block { background: var(--bg-2); padding: 36px 32px; position: relative; }
        .smp-proof-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--red), transparent); }
        .smp-proof-headline { font-weight: 800; font-size: 1.2rem; line-height: 1.25; color: var(--text); text-transform: uppercase; margin-bottom: 16px; }
        .smp-proof-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 28px; }
        .smp-proof-stat { background: var(--surface); padding: 16px 12px; text-align: center; }
        .smp-proof-stat-val { font-weight: 900; font-size: 1.6rem; color: var(--red); line-height: 1; }
        .smp-proof-stat-label { font-size: 0.6rem; text-transform: uppercase; color: var(--text-muted); margin-top: 4px; }
        .smp-proof-divider { height: 1px; background: var(--border); margin-bottom: 24px; }
        .smp-proof-quote { font-size: 0.88rem; color: var(--text-muted); font-style: italic; line-height: 1.7; padding-left: 16px; border-left: 2px solid var(--red); }
        .smp-proof-attr { font-size: 0.7rem; text-transform: uppercase; color: var(--text-dim); padding-left: 16px; margin-top: 8px; }
        .smp-why-section { background: var(--bg-2); padding: 80px 0; }
        .smp-highlights-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); }
        .smp-highlight-card { background: var(--bg-2); padding: 32px 28px; border-left: 3px solid transparent; transition: all 0.2s; }
        .smp-highlight-card:hover { background: var(--surface-2); border-left-color: var(--red); }
        .smp-highlight-icon { width: 44px; height: 44px; background: var(--red-dim); border: 1px solid var(--border-red); display: flex; align-items: center; justify-content: center; color: var(--red); margin-bottom: 16px; }
        .smp-highlight-title { font-weight: 700; font-size: 0.95rem; text-transform: uppercase; color: var(--text); margin-bottom: 10px; }
        .smp-highlight-desc { font-size: 0.88rem; color: var(--text-muted); font-weight: 300; line-height: 1.75; }
        .smp-enroll-section { background: var(--bg); padding: 80px 0; position: relative; overflow: hidden; }
        .smp-enroll-glow { position: absolute; top: 50%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%); transform: translate(-50%,-50%); pointer-events: none; }
        .smp-enroll-wrap { max-width: 760px; margin: 0 auto; }
        .smp-form-card { background: var(--bg-2); border: 1px solid var(--border); border-top: 3px solid var(--red); padding: 40px 36px; margin-top: 40px; }
        .smp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .smp-form-note { font-size: 0.75rem; color: var(--text-dim); text-align: center; margin-top: 12px; }

        @media (max-width: 1024px) { .smp-outcomes-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px) {
          .smp-hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .smp-highlights-grid { grid-template-columns: 1fr !important; }
          .smp-journey { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .smp-outcomes-grid { grid-template-columns: 1fr !important; }
          .smp-form-row { grid-template-columns: 1fr !important; }
          .smp-pillar { flex-direction: column; }
          .smp-pillar-num { writing-mode: horizontal-tb; border-right: none; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </div>
  )
}