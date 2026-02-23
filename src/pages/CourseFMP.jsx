import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CheckCircle, BookOpen, Clock, Award, Users, ArrowLeft, Send,
  TrendingUp, BarChart2, PieChart, Layers, Phone, Mail, Globe, Linkedin
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

// --- IMPORTS FOR GRAPH AND TESTIMONIALS ---
import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'

const modules = [
  {
    num: '01', title: 'Fundamentals of Stock Market',
    sessions: [
      'Mis-conceptions About The Stock Market',
      'Basics of the Stock Market — BSE, NSE, Global Markets',
      'Primary & Secondary Markets — IPO, OHLC, Corporate Actions',
      'Types of Orders — SL, Intraday, CF, AMO, GTT, Short Selling',
      'Types of Indices — Indian & Global, NIFTY Weightage',
      'Fundamental Analysis — GDP, PMI, CRR, Repo Rate',
      'Quantitative Analysis — Balance Sheet, P&L, Ratio Analysis',
      'Case Studies of Top 5 Companies + Screeners',
    ],
  },
  {
    num: '02', title: 'Money Management',
    sessions: [
      'Economic Affairs — Inflation, Emergency Fund, Compounding',
      'Financial Goal Planning — Short & Long Term Goals',
      'Comparative Study — Gold vs Nifty 50 vs Real Estate',
      'Types of Investments — Mutual Funds, Gold, Stocks, Crypto',
    ],
  },
  {
    num: '03', title: 'Technical Analysis',
    sessions: [
      'Introduction — TA Assumptions, Dow Theory, Elliott Wave',
      'Price Action — Candlesticks, Trend Lines, Support & Resistance',
      'Indicators — SMA/EMA, MACD, RSI, Bollinger Bands, VWAP',
      'Chart Patterns — Head & Shoulder, Double Top/Bottom, Cup & Handle',
      'Smart Money Concept — OB/FVG/VCP, Liquidity, BOS/BCB',
    ],
  },
  {
    num: '04', title: 'Derivative Market (Futures & Options)',
    sessions: [
      'Derivative Market — Types of Futures, Index & Stock Futures',
      'Derivative Terminology — Margins, MTM, Margin Calculator',
      'Hedging — Stock & Portfolio Hedging Strategies',
      'Moneyness of Options — Call/Put, ITM/ATM/OTM, Greeks, PCR',
      'Call & Put Options — Payoff Charts, Intrinsic Value, Selling',
      'Summarizing Options — Strike Price Selection, Hedging Strategies',
    ],
  },
]

const includes = [
  '20+ E-books & Stock Market Notes',
  '25+ Back-tested Trading Strategies',
  '25+ Screeners for Investing',
  'Support in Demat Account Opening',
  'Demo of Demat & Paper Trading Apps',
  'TradingView & Chartink Usage',
  'Market Watchlist for Stock Selection',
  'P&L Tracker — Stock Market',
]

const stats = [
  { icon: Layers,   value: '4',       label: 'Core Modules' },
  { icon: BookOpen, value: '25+',     label: 'Strategies' },
  { icon: Clock,    value: '2.5 Mo.', label: 'Duration' },
  { icon: Users,    value: '1000+',   label: 'Alumni' },
]

const whyCards = [
  { icon: TrendingUp, title: 'Live Market Training',   desc: 'Learn with real-time market data, live charts, and actual trade setups — not just theory.' },
  { icon: BarChart2,  title: '25+ Proven Strategies',  desc: 'Back-tested trading strategies across equity, derivatives, and commodity markets.' },
  { icon: PieChart,   title: 'Complete Ecosystem',     desc: 'From Demat setup to TradingView mastery — a full end-to-end learning journey.' },
  { icon: Award,      title: 'Certified Program',      desc: 'Earn a recognized certificate of completion from Arthashastra Training Academy.' },
  { icon: Users,      title: 'Community Support',      desc: 'Join a thriving community of traders and investors. Questions answered within 24 hours.' },
  { icon: BookOpen,   title: '20+ E-Books & Notes',    desc: 'Comprehensive study material, screeners, and P&L trackers included for life.' },
]

export default function CourseFMP() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Financial Market Professional Program | Arthashastra'
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, course: 'fmp-program' }), 
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Something went wrong');

      toast.success('Enrollment request sent! Our team will contact you within 24 hours.')
      reset()
    } catch (error) {
      toast.error('Failed to submit form: ' + error.message)
    }
  }

  return (
    <div className="page-enter">
      <Navbar />

      {/* ── Hero ── */}
      <section className="fmp-hero">
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-60px', width: 520, height: 520, background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" className="fmp-back-link"><ArrowLeft size={14} /> Back to Home</Link>

          <div className="fmp-hero-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="badge badge-red" style={{ marginBottom: 20 }}><span className="red-dot" /> Certified Program</span>
              <div className="eyebrow">2.5-Month Live Course</div>
              <h1 className="fmp-h1">Financial <span style={{ color: 'var(--red)' }}>Market</span> Professional</h1>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
                FMP Program — Never Depend on a Single Income
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32, maxWidth: 480 }}>
                A comprehensive 4-module certified program covering Stock Market Fundamentals, Money Management, Technical Analysis, and Derivatives.
              </p>
              <div className="fmp-stats-grid" style={{ marginBottom: 32 }}>
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} style={{ background: 'var(--surface)', padding: '14px 10px', textAlign: 'center' }}>
                    <Icon size={14} color="var(--red)" style={{ margin: '0 auto 4px' }} />
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{value}</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.52rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#enroll" className="btn btn-primary">Enroll Now</a>
                <a href="tel:6269956666" className="btn btn-outline"><Phone size={14} /> 6269-956666</a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: '3px solid var(--red)', padding: '32px 28px' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 20 }}>Course Inclusions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle size={15} color="var(--red)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28, padding: '20px', background: 'var(--red-dim)', border: '1px solid var(--border-red)' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Fees Structure</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '2rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>₹49,999</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: 4 }}>Including 18% GST</div>
                  <a href="#enroll" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Enroll Now</a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section style={{ background: 'var(--bg-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Full Curriculum</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>4 Modules. <span>Complete Mastery.</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'var(--border)' }}>
            {modules.map((mod, i) => (
              <motion.div key={mod.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="fmp-module-row">
                <div className="fmp-module-label">
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '3rem', color: 'rgba(220,38,38,0.15)', lineHeight: 1 }}>{mod.num}</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text)', lineHeight: 1.3 }}>{mod.title}</div>
                </div>
                <div className="fmp-sessions-grid">
                  {mod.sessions.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ width: 4, height: 4, background: 'var(--red)', flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 300 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose FMP ── */}
      <section style={{ background: 'var(--bg)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Why Choose FMP</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Built for <span>Real Market Success</span></h2>
          </div>
          <div className="fmp-why-grid">
            {whyCards.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }} className="fmp-why-card">
                <div className="fmp-why-icon"><Icon size={22} /></div>
                <div className="fmp-why-title">{title}</div>
                <div className="fmp-why-desc">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <StatsSection />
      <TestimonialsSection />

      {/* ── Enrollment Form ── */}
      <section id="enroll" style={{ background: 'var(--bg-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>Enrollment</div>
              <h2 className="section-title" style={{ textAlign: 'center' }}>Start Your <span>Market Journey</span></h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 300 }}>Fill in your details and our team will contact you within 24 hours.</p>
            </div>
            
            <div className="fmp-form-card">
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                <div className="fmp-form-row">
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

                <div className="fmp-form-row">
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

                <div className="fmp-form-row">
                  <div className="form-group">
                    <label className="form-label">Current Company</label>
                    <input className="form-input" placeholder="Where do you work?" {...register('currentCompany')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Designation</label>
                    <input className="form-input" placeholder="Your role / title" {...register('currentDesignation')} />
                  </div>
                </div>

                <div className="fmp-form-row">
                  <div className="form-group">
                    <label className="form-label">Instagram User ID</label>
                    <input className="form-input" placeholder="@yourhandle" {...register('instagramId')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LinkedIn URL</label>
                    <input className="form-input" placeholder="linkedin.com/in/yourprofile" {...register('linkedinUrl')} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Portfolio / Website Link</label>
                  <input className="form-input" placeholder="yourwebsite.com" {...register('portfolioUrl')} />
                </div>

                <div className="form-group">
                  <label className="form-label">What Help Do You Need? *</label>
                  <textarea className="form-input" placeholder="Describe your financial goals..." {...register('helpNeeded', { required: 'Required' })} style={{ minHeight: 110 }} />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ justifyContent: 'center', width: '100%', padding: '16px', fontSize: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : <><Send size={16} /> Submit Enrollment Request</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .fmp-hero { min-height: 70vh; background: var(--bg); padding: 100px 0 60px; position: relative; overflow: hidden; }
        .fmp-back-link { display: inline-flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; margin-bottom: 32px; }
        .fmp-h1 { font-family: var(--font-head); font-weight: 900; font-size: clamp(2.4rem, 5vw, 4.8rem); text-transform: uppercase; line-height: 1; color: var(--text); }
        .fmp-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .fmp-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
        .fmp-module-row { background: var(--bg-2); padding: 28px 32px; display: grid; grid-template-columns: 200px 1fr; gap: 32px; align-items: start; }
        .fmp-sessions-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 24px; }
        
        .fmp-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border); }
        .fmp-why-card { background: var(--surface); padding: 32px 28px; border-left: 3px solid transparent; transition: all 0.2s ease; }
        .fmp-why-card:hover { background: var(--surface-2); border-left-color: var(--red); }
        .fmp-why-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--red-dim); border: 1px solid var(--border-red); color: var(--red); margin-bottom: 16px; }
        .fmp-why-title { font-family: var(--font-head); font-weight: 700; font-size: 0.95rem; text-transform: uppercase; color: var(--text); margin-bottom: 10px; transition: color var(--theme-speed); }
        .fmp-why-desc { font-size: 0.88rem; color: var(--text-muted); font-weight: 300; line-height: 1.6; transition: color var(--theme-speed); }

        .fmp-form-card { background: var(--bg); border: 1px solid var(--border); border-top: 3px solid var(--red); padding: 40px 36px; }
        .fmp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        @media (max-width: 900px) {
          .fmp-hero-grid { grid-template-columns: 1fr; }
          .fmp-module-row { grid-template-columns: 1fr; gap: 16px; }
          .fmp-why-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .fmp-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .fmp-why-grid { grid-template-columns: 1fr; }
          .fmp-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}