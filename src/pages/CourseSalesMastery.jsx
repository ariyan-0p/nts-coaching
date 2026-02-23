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

const modules = [
  { num: '01', icon: Brain,         title: 'Sales Ignite & Mindset of Top Performers', desc: 'Build the mental frameworks that separate top closers from the rest — confidence, resilience, and unshakeable goal-setting.' },
  { num: '02', icon: Users,         title: 'Exploring the Psychology of Buying',        desc: 'Deep-dive into the psychological triggers that drive purchasing decisions and learn how to leverage them ethically.' },
  { num: '03', icon: TrendingUp,    title: "Buyer's Journey & Sales Pipeline",          desc: 'Master the complete sales process from first contact to signed deal using a proven structured pipeline approach.' },
  { num: '04', icon: Zap,           title: 'Demand Triggers Technique',                 desc: 'Create genuine urgency and demand using 7 proven psychological triggers and a 3-step framework that works every time.' },
  { num: '05', icon: Target,        title: 'How to Create Offers in Demand',            desc: 'Craft irresistible offers that make your product the only obvious choice — backed by real-world case studies.' },
  { num: '06', icon: MessageSquare, title: 'The Power of Tonality',                     desc: 'Master vocal tone to build instant trust, rapport, and persuasive authority in every sales conversation.' },
  { num: '07', icon: Award,         title: 'Closing Secrets',                           desc: 'Advanced closing frameworks that convert conversations into signed deals — authentically, without pressure.' },
  { num: '08', icon: Shield,        title: 'Advance Objection Handling',                desc: 'Identify and dismantle every objection your prospects raise. Turn consistent "no" responses into committed decisions.' },
  { num: '09', icon: BookOpen,      title: 'Follow-Up & Relationship Selling',          desc: 'Convert cold leads and build long-term client relationships that generate repeat revenue and warm referrals.' },
  { num: '10', icon: BarChart2,     title: 'Revenue in the Digital Age',                desc: 'Leverage AI, digital channels, and modern tools to build a scalable, future-proof hybrid sales engine.' },
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
  { icon: Target,        label: 'Laser-Target Clients',  desc: 'Find people who already want what you offer' },
  { icon: MessageSquare, label: 'Natural Conversations', desc: 'Open dialogues that feel like friendly chats' },
  { icon: Award,         label: 'Prove Your Value',      desc: 'Make your offer worth every penny' },
  { icon: Zap,           label: 'Melt Objections',       desc: 'Handle pushback with grace and zero pressure' },
  { icon: TrendingUp,    label: 'Close With Confidence', desc: 'Sign new clients naturally and authentically' },
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

            {/* Left */}
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

            {/* Right — Includes card */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="smp-hero-card">
                <div className="smp-card-top-bar" />
                <div className="smp-card-label">What's Included</div>
                <div className="smp-includes-list">
                  {includes.map((item, i) => (
                    <motion.div key={item} className="smp-include-item"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                    >
                      <CheckCircle size={14} style={{ color: 'var(--red)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="smp-card-guarantee">
                  <Shield size={16} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div className="smp-guarantee-title">Results-Focused Guarantee</div>
                    <p className="smp-guarantee-text">
                      Built on real-world frameworks that deliver measurable results — regardless of your industry or experience level.
                    </p>
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
          OUTCOMES STRIP
      ══════════════════════════ */}
      <section className="smp-outcomes-section">
        <div className="container">
          <div className="smp-outcomes-grid">
            {outcomes.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} className="smp-outcome-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="smp-outcome-icon"><Icon size={20} /></div>
                <div className="smp-outcome-label">{label}</div>
                <div className="smp-outcome-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CURRICULUM — curiosity-driven
      ══════════════════════════ */}
      <section id="modules" className="smp-curriculum-section">
        <div className="container">

          <div className="smp-section-header">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>The Curriculum</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              What Happens <span>Inside?</span>
            </h2>
            <p className="smp-section-sub">
              10 deeply researched modules. Each one designed to close a specific gap between where you are now — and where your income should be.
            </p>
          </div>

          {/* Journey path — teaser only, no module names */}
          <div className="smp-journey">

            {/* Left: transformation pillars */}
            <div className="smp-pillars">
              {[
                { num: '01–02', theme: 'The Foundation',     teaser: `Most salespeople lose before they even open their mouth. You'll discover exactly why — and rewire that permanently.` },
                { num: '03–05', theme: 'The System',         teaser: `There's a sequence that top closers follow on every call. You'll have it mapped out, practised, and ready to deploy.` },
                { num: '06–07', theme: 'The Conversion',     teaser: `The difference between "I'll think about it" and a signed deal is a handful of techniques most reps never learn.` },
                { num: '08–09', theme: 'The Armour',         teaser: `Objections, ghosting, price pushback — this is where 90% of sales die. After this, they won't.` },
                { num: '10',    theme: 'The Scale',          teaser: `How to take everything you've built and multiply it using the tools most sales professionals are completely ignoring.` },
              ].map(({ num, theme, teaser }, i) => (
                <motion.div key={num} className="smp-pillar"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="smp-pillar-num">{num}</div>
                  <div className="smp-pillar-body">
                    <div className="smp-pillar-theme">{theme}</div>
                    <p className="smp-pillar-teaser">{teaser}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: proof block */}
            <motion.div className="smp-proof-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="smp-proof-top-bar" />

              <div className="smp-proof-headline">
                By the end of this program, you won't just know how to sell.
              </div>
              <div className="smp-proof-sub">
                You'll <em>think</em> differently. Every conversation, every objection, every close will feel natural — because you'll understand what's actually happening in the buyer's mind.
              </div>

              <div className="smp-proof-stats">
                {[
                  { val: '10',   label: 'Focused Modules' },
                  { val: '8+',   label: 'Hours of Training' },
                  { val: '40+',  label: 'Scripts & Frameworks' },
                  { val: '5K+',  label: 'Professionals Trained' },
                ].map(s => (
                  <div key={s.label} className="smp-proof-stat">
                    <div className="smp-proof-stat-val">{s.val}</div>
                    <div className="smp-proof-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="smp-proof-divider" />

              <div className="smp-proof-quote">
                "The syllabus is just a map. The real transformation happens when you start applying what you learn on live calls — and you'll feel the shift within days."
              </div>
              <div className="smp-proof-attr">— Ankit Khare, Founder NTS</div>

              <a href="#enroll" className="btn btn-primary" style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}>
                <Send size={15} /> Get the Full Program Details
              </a>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════
          WHY IT WORKS
      ══════════════════════════ */}
      <section className="smp-why-section">
        <div className="container">
          <div className="smp-section-header">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Program Highlights</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Why Sales Mastery <span>Works</span>
            </h2>
          </div>
          <div className="smp-highlights-grid">
            {highlights.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} className="smp-highlight-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="smp-highlight-icon"><Icon size={22} /></div>
                <div className="smp-highlight-title">{title}</div>
                <p className="smp-highlight-desc">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          ENROLL FORM
      ══════════════════════════ */}
      <section id="enroll" className="smp-enroll-section">
        <div className="smp-enroll-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="smp-enroll-wrap">

            <div className="smp-section-header">
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Enrollment</div>
              <h2 className="section-title" style={{ textAlign: 'center' }}>
                Ready to <span>Master Sales?</span>
              </h2>
              <p className="smp-section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
                Fill in your details and our team will reach out within 24 hours with program details.
              </p>
            </div>

            <div className="smp-form-card">
              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="smp-form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" placeholder="Your full name" {...register('fullName', { required: 'Required' })} />
                    {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" placeholder="your@email.com" type="email"
                      {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })} />
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
                    <input className="form-input" type="date" {...register('dateOfBirth')} />
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
                  <textarea className="form-input"
                    placeholder="Describe your current sales challenges and what you want to achieve..."
                    {...register('helpNeeded', { required: 'Please describe what help you need' })}
                    style={{ minHeight: 110 }}
                  />
                  {errors.helpNeeded && <span className="form-error">{errors.helpNeeded.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}
                  style={{ justifyContent: 'center', width: '100%', padding: '16px', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Enrollment Request</>}
                </button>

                <p className="smp-form-note">
                  No spam. Your information is safe and used only to contact you about this program.
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`

        /* ── HERO ── */
        .smp-hero {
          min-height: 80vh; background: var(--bg);
          display: flex; align-items: center;
          padding: 120px 0 80px;
          position: relative; overflow: hidden;
          transition: background var(--theme-speed);
        }
        .smp-hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.6; pointer-events: none;
        }
        .smp-hero-glow {
          position: absolute; top: 20%; right: -5%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        [data-theme="light"] .smp-hero-glow {
          background: radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%);
        }
        [data-theme="light"] .smp-hero { background: linear-gradient(160deg, #fafafa 60%, #fff5f5 100%); }

        .smp-back-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--text-muted); font-family: var(--font-head);
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 36px; transition: color 0.2s;
        }
        .smp-back-link:hover { color: var(--text); }

        .smp-hero-layout {
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: 64px; align-items: start;
        }

        .smp-eyebrow-wrap {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          background: var(--red-dim); border: 1px solid var(--border-red);
          border-radius: 2px;
          font-family: var(--font-head); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--red); margin-bottom: 20px; width: fit-content;
        }
        .smp-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--red); flex-shrink: 0;
          animation: smp-blink 1.5s ease-in-out infinite;
        }
        @keyframes smp-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .smp-h1 {
          font-family: var(--font-head); font-weight: 900;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.95; letter-spacing: -0.01em;
          text-transform: uppercase; color: var(--text);
          margin-bottom: 20px; transition: color var(--theme-speed);
        }
        .smp-h1-accent { color: var(--red); position: relative; }
        .smp-h1-accent::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--red), transparent);
        }

        .smp-hero-sub {
          font-size: 1rem; color: var(--text-muted);
          line-height: 1.75; font-weight: 300;
          max-width: 460px; margin-bottom: 24px;
          transition: color var(--theme-speed);
        }

        .smp-meta-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
        .smp-meta-item {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px;
          background: var(--surface); border: 1px solid var(--border);
          font-family: var(--font-head); font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }

        .smp-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .smp-hero-card {
          background: var(--bg-2); border: 1px solid var(--border);
          padding: 32px 28px; position: relative;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }
        [data-theme="light"] .smp-hero-card { box-shadow: 0 8px 40px rgba(0,0,0,0.08); }

        .smp-card-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--red), transparent);
        }
        .smp-card-label {
          font-family: var(--font-head); font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--red); margin-bottom: 20px;
        }

        .smp-includes-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .smp-include-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.88rem; color: var(--text-muted); font-weight: 300;
          transition: color var(--theme-speed);
        }

        .smp-card-guarantee {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 16px; background: var(--red-dim);
          border: 1px solid var(--border-red); border-radius: 2px;
        }
        .smp-guarantee-title {
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text); margin-bottom: 4px;
        }
        .smp-guarantee-text {
          font-size: 0.78rem; color: var(--text-muted);
          font-weight: 300; line-height: 1.55; margin: 0;
          transition: color var(--theme-speed);
        }

        /* ── OUTCOMES ── */
        .smp-outcomes-section {
          background: var(--bg-2); padding: 64px 0;
          transition: background var(--theme-speed);
        }
        .smp-outcomes-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 1px; background: var(--border);
        }
        .smp-outcome-card {
          background: var(--bg-2); padding: 28px 20px; text-align: center;
          transition: background 0.2s;
        }
        .smp-outcome-card:hover { background: var(--surface-2); }
        .smp-outcome-icon {
          width: 44px; height: 44px; border-radius: 2px;
          background: var(--red-dim); border: 1px solid var(--border-red);
          display: flex; align-items: center; justify-content: center;
          color: var(--red); margin: 0 auto 12px;
        }
        .smp-outcome-label {
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;
          color: var(--text); margin-bottom: 6px;
          transition: color var(--theme-speed);
        }
        .smp-outcome-desc {
          font-size: 0.73rem; color: var(--text-dim);
          font-weight: 300; line-height: 1.5;
          transition: color var(--theme-speed);
        }

        /* ── CURRICULUM ── */
        .smp-curriculum-section {
          background: var(--bg); padding: 80px 0;
          transition: background var(--theme-speed);
        }

        .smp-section-header { text-align: center; margin-bottom: 48px; }
        .smp-section-sub {
          font-size: 0.95rem; color: var(--text-muted);
          font-weight: 300; line-height: 1.7;
          max-width: 580px; margin: 12px auto 0;
          transition: color var(--theme-speed);
        }

        /* Journey layout */
        .smp-journey {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px; background: var(--border);
          border: 1px solid var(--border);
          align-items: stretch;
        }

        /* Pillars — left column */
        .smp-pillars {
          display: flex; flex-direction: column;
          gap: 1px; background: var(--border);
        }

        .smp-pillar {
          display: flex; gap: 0;
          background: var(--bg-2);
          transition: background 0.2s;
          border-left: 3px solid transparent;
        }
        .smp-pillar:hover {
          background: var(--surface-2);
          border-left-color: var(--red);
        }

        .smp-pillar-num {
          font-family: var(--font-head); font-weight: 900;
          font-size: 0.68rem; color: var(--red);
          letter-spacing: 0.1em;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          padding: 20px 14px;
          border-right: 1px solid var(--border);
          flex-shrink: 0;
          opacity: 0.7;
          transition: border-color var(--theme-speed);
        }

        .smp-pillar-body { padding: 20px 20px; }

        .smp-pillar-theme {
          font-family: var(--font-head); font-weight: 800;
          font-size: 0.85rem; text-transform: uppercase;
          letter-spacing: 0.08em; color: var(--text);
          margin-bottom: 8px;
          transition: color var(--theme-speed);
        }

        .smp-pillar-teaser {
          font-size: 0.83rem; color: var(--text-muted);
          font-weight: 300; line-height: 1.65; margin: 0;
          transition: color var(--theme-speed);
        }

        /* Proof block — right column */
        .smp-proof-block {
          background: var(--bg-2);
          padding: 36px 32px;
          display: flex; flex-direction: column;
          position: relative;
          transition: background var(--theme-speed);
        }
        [data-theme="light"] .smp-proof-block {
          background: var(--bg-3);
        }

        .smp-proof-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--red), transparent);
        }

        .smp-proof-headline {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(1.1rem, 2vw, 1.4rem);
          line-height: 1.25; color: var(--text);
          text-transform: uppercase; letter-spacing: 0.02em;
          margin-bottom: 16px;
          transition: color var(--theme-speed);
        }

        .smp-proof-sub {
          font-size: 0.9rem; color: var(--text-muted);
          font-weight: 300; line-height: 1.75;
          margin-bottom: 28px;
          transition: color var(--theme-speed);
        }
        .smp-proof-sub em { color: var(--red); font-style: normal; font-weight: 600; }

        .smp-proof-stats {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); margin-bottom: 28px;
        }
        .smp-proof-stat {
          background: var(--surface); padding: 16px 12px; text-align: center;
          transition: background var(--theme-speed);
        }
        .smp-proof-stat-val {
          font-family: var(--font-head); font-weight: 900;
          font-size: 1.6rem; color: var(--red); line-height: 1;
        }
        .smp-proof-stat-label {
          font-family: var(--font-head); font-size: 0.6rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-muted); margin-top: 4px;
          transition: color var(--theme-speed);
        }

        .smp-proof-divider {
          height: 1px; background: var(--border); margin-bottom: 24px;
          transition: background var(--theme-speed);
        }

        .smp-proof-quote {
          font-size: 0.88rem; color: var(--text-muted);
          font-style: italic; line-height: 1.7;
          padding-left: 16px;
          border-left: 2px solid var(--red);
          margin-bottom: 8px;
          transition: color var(--theme-speed);
        }
        .smp-proof-attr {
          font-family: var(--font-head); font-size: 0.7rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-dim); padding-left: 16px;
          transition: color var(--theme-speed);
        }

        /* ── WHY IT WORKS ── */
        .smp-why-section {
          background: var(--bg-2); padding: 80px 0;
          transition: background var(--theme-speed);
        }
        .smp-highlights-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; background: var(--border);
        }
        .smp-highlight-card {
          background: var(--bg-2); padding: 32px 28px;
          border-left: 3px solid transparent; transition: all 0.2s;
        }
        .smp-highlight-card:hover {
          background: var(--surface-2); border-left-color: var(--red);
        }
        .smp-highlight-icon {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          background: var(--red-dim); border: 1px solid var(--border-red);
          color: var(--red); margin-bottom: 16px;
        }
        .smp-highlight-title {
          font-family: var(--font-head); font-weight: 700;
          font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em;
          color: var(--text); margin-bottom: 10px;
          transition: color var(--theme-speed);
        }
        .smp-highlight-desc {
          font-size: 0.88rem; color: var(--text-muted);
          font-weight: 300; line-height: 1.75; margin: 0;
          transition: color var(--theme-speed);
        }

        /* ── ENROLL ── */
        .smp-enroll-section {
          background: var(--bg); padding: 80px 0;
          position: relative; overflow: hidden;
          transition: background var(--theme-speed);
        }
        .smp-enroll-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .smp-enroll-wrap { max-width: 760px; margin: 0 auto; }

        .smp-form-card {
          background: var(--bg-2); border: 1px solid var(--border);
          border-top: 3px solid var(--red); padding: 40px 36px; margin-top: 40px;
          transition: background var(--theme-speed), border-color var(--theme-speed);
        }
        [data-theme="light"] .smp-form-card { box-shadow: 0 8px 40px rgba(0,0,0,0.07); }
        .smp-form-card form { display: flex; flex-direction: column; gap: 20px; }
        .smp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .smp-form-note {
          font-size: 0.75rem; color: var(--text-dim);
          text-align: center; margin-top: -4px;
          transition: color var(--theme-speed);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .smp-outcomes-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .smp-hero { padding: 100px 0 60px; }
          .smp-hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .smp-highlights-grid { grid-template-columns: 1fr !important; }
          .smp-journey { grid-template-columns: 1fr !important; }
          .smp-proof-block { padding: 28px 24px; }
        }
        @media (max-width: 768px) {
          .smp-outcomes-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .smp-proof-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .smp-form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .smp-hero { padding: 88px 0 48px; }
          .smp-pillar-num { writing-mode: horizontal-tb; padding: 14px 16px; border-right: none; border-bottom: 1px solid var(--border); }
          .smp-pillar { flex-direction: column; }
          .smp-pillar-body { padding: 16px; }
          .smp-form-card { padding: 24px 16px; }
          .smp-outcomes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}