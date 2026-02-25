import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CheckCircle, Target, Zap, ArrowLeft, Send,
  Brain, MessageSquare, Users, Shield,
  BookOpen, Star, Clock, Check, Video
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import StatsSection from '../components/StatsSection'
import TestimonialsSection from '../components/TestimonialsSection'

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

// Splitting strings to bypass citation injections while keeping exact text
const systemBullets = [
  'Attract high-intent buyers through a ' + 'simple Neuroscience strategies',
  'Get paid high-ticket clients ' + 'without being salesy',
  'Use strategic follow-up process that prevents ' + 'clients from ghosting you',
  'Get on calls with serious prospects who already see you ' + 'as the authority that can help them.'
]

const whatYouWillLearn = [
  'You will learn solid prospecting so you ' + 'stop begging every client to buy.',
  'You will learn how to nurture a lead toward ' + 'closure, not torture them for conversion.',
  'You will learn how to create an irresistible offer that makes the ' + 'prospect buy on their own, instead of you selling.',
  'You will see a neuroscience-based approach that emotionally ' + 'drives clients to become your repeat customers.',
  'If you are a consultant or a coach, you will learn ' + 'how to double your webinar conversion rate.',
  'You will learn follow-up strategies that ' + 'stop prospects from ghosting you.',
  'You will learn how to soft close a lead ' + 'the right way.',
  'You will learn tonality that positions you as a partner in ' + 'front of the client, not a seller.',
  'You will learn advanced objection handling so prospects stop ' + 'hiding behind smoke screen objections.',
  'After this course, you will be able to convert clients from any industry or niche. This course is ' + 'built on human psychology principles that work across all buyer types.'
]

const targetAudience = [
  'Consultants who are tired of being ghosted ' + 'after "great" calls',
  'Advisors and Sales Executives ' + 'who want to reclaim their time',
  'Coaches who want to pre-qualify ' + 'and convert serious buyers',
  'Anyone ready to stop chasing and ' + 'start charging for their expertise',
  'Anyone who\'s spending a lot of money on Ads, Teams and wondering ' + 'when they\'ll see any ROI'
]

export default function CourseSalesMastery() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Sales Mastery Program | Ankit Khare'
  }, [])

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://ntswithankit.com/api/submissions', {
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
          <Link to="/" className="smp-back-link"><ArrowLeft size={16} /> Back to Home</Link>

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
                  { icon: Clock,    text: '5 Hrs Recorded' },
                  { icon: Video,    text: '4 Live Sessions' },
                  { icon: Users,    text: 'All Levels'  },
                  { icon: Star,     text: '4.9 Rated'  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="smp-meta-item"><Icon size={14} /> {text}</div>
                ))}
              </div>
              <div className="smp-hero-ctas">
                <a href="#enroll" className="btn btn-primary"><Send size={16} /> Enroll Now</a>
                <a href="#modules" className="btn btn-outline"><BookOpen size={16} /> View Curriculum</a>
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
                      <CheckCircle size={16} style={{ color: 'var(--red)', flexShrink: 0 }} />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="smp-card-guarantee">
                  <Shield size={20} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
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
          THE HOOK
      ══════════════════════════ */}
      <section className="smp-hook-section">
        <div className="container">
          <div className="smp-hook-grid">
            <motion.div className="smp-hook-left" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="smp-hook-audience-badge">
                <Target size={14} className="text-red" /> COACHES, CONSULTANTS, ADVISORS, FREELANCERS, SALES EXECUTIVES AND BUSINESS OWNERS:
              </div>
              <h2 className="smp-hook-title">
                STOP SELLING AND MAKE PROSPECTS<br/>
                FEEL <span className="text-red">COMPELLED TO BUY</span>
              </h2>
              <p className="smp-hook-highlight">
                Build a Premium Pipeline and attract only qualified prospects who pay you for your offer
              </p>
            </motion.div>

            <motion.div className="smp-hook-right" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="smp-hook-feature-card">
                <Brain size={28} className="text-red smp-hook-icon" />
                <p>Enroll in our neuroscience-based Client Converting Course that's ROI positive from week 1, so you can scale as high as you want without ever worrying about ad spend or marketing spend</p>
              </div>
              <div className="smp-hook-feature-card">
                <BookOpen size={28} className="text-red smp-hook-icon" />
                <p><strong>Discover the complete 10 modules course that flips your Regular Call into a Revenue Stream - and fills your calendar with serious buyers only.</strong></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          THE PROBLEM
      ══════════════════════════ */}
      <section className="smp-problem-section">
        <div className="container smp-problem-container">
          <motion.div className="smp-problem-text" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2>You might be great at what you do.<br/>But every week, you find yourself doing free calls that go nowhere.</h2>
            
            <div className="smp-quote-box">
              <p>They say:</p>
              <ul>
                <li>"We'll think about it."</li>
                <li>"We're just exploring options."</li>
                <li>"Let's revisit next quarter."</li>
                <li>"It's out of my budget"</li>
                <li>"Once you pitch your service they GHOST you"</li>
              </ul>
            </div>

            <p className="smp-frustration">And you walk away frustrated, thinking,  "Why do I even bother?"</p>
            
            <div className="smp-truth-bomb">
              <h3>Here's the truth no one tells you:</h3>
              <p>Your "free call" isn't free. It's costing you Authority, Time, and Money.</p>
              <p className="smp-truth-bold">And serious buyers don't want free calls.</p>
              <div className="smp-wants-list">
                <span>They want clarity.</span>
                <span>They want frameworks.</span>
                <span>They want to work with an expert who values their own time.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          THE SOLUTION & SYSTEM
      ══════════════════════════ */}
      <section className="smp-solution-section">
        <div className="container">
          <div className="smp-solution-top">
            <h2>And there's a better way...<br/><span>With Sales Mastery Program</span></h2>
            <p>What if you could book calls with pre-sold prospects who know you, know your worth, know how you can help them, and have already given you money commitment before the closure call even happens?</p>
            <p className="smp-solution-bold">That's exactly what this training teaches you.</p>
          </div>

          <div className="smp-system-box">
            <h3>Learn the full system I use to:</h3>
            <ul className="smp-system-list">
              {systemBullets.map((bullet, i) => (
                <li key={i}><Check size={20} className="text-red" /> <span>{bullet}</span></li>
              ))}
            </ul>
            <div className="smp-system-footer">
              This isn't a theory, it's a zero-fluff well articulated course and it's the same method I have used (and helped clients use) to generate paid calls that lead to predictable 5 and 7-figure deals.
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          MID-PAGE CTA
      ══════════════════════════ */}
      <section className="smp-mid-cta">
        <div className="container">
          <div className="smp-mid-cta-box">
            <h2 className="smp-mid-warning">STOP DOING UNLIMITED CALLS<br/>AND HOPING FOR 10% CONVERSION</h2>
            <p className="smp-mid-bold">THAT'S NOT A SALES STRATEGY!</p>
            <p className="smp-mid-sub">If you want to GET PAID CLIENTS EFFORTLESSLY</p>
            <a href="#enroll" className="btn smp-btn-white">
              SECURE YOUR FREE 30-MINUTE SESSION
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          WHAT YOU WILL LEARN
      ══════════════════════════ */}
      <section className="smp-learn-section">
        <div className="container">
          <div className="smp-section-header">
            <h2 className="section-title" style={{ textAlign: 'center' }}>What You Will Learn In This Course</h2>
          </div>

          <div className="smp-learn-list-wrapper">
            <ul className="smp-learn-list-clean">
              {whatYouWillLearn.map((text, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Zap size={20} className="text-red smp-learn-icon-inline" />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CURRICULUM MODULES (IMAGE)
      ══════════════════════════ */}
      <section id="modules" className="smp-curriculum-section">
        <div className="container">
          <div className="smp-section-header">
             <h2 className="section-title" style={{ textAlign: 'center', textTransform: 'uppercase' }}>SALES MASTERY PROGRAM-MODULES</h2>
          </div>
          <motion.div className="smp-modules-image-wrapper" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src="/assets/modules-books.jpg" alt="10 Sales Mastery Modules" className="smp-modules-img" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          WHY IT WORKS
      ══════════════════════════ */}
      <section className="smp-why-section">
        <div className="container">
          <motion.div className="smp-why-content" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="smp-roi-heading">Imagine knowing every penny you spend on ads will come back the same day.</h3>
            <p className="smp-roi-sub">That's what the Sales Mastery Program makes possible - Immediate ROI, Unlimited Growth.</p>
            
            <h4 className="smp-works-title">Here's why it works when nothing else does:</h4>
            
            <div className="smp-works-box">
              <p><strong>The Sales Mastery Program flips the model:</strong><br/>Instead of paying to get clients, clients pay to get to you.</p>
              <p>Neuroscience Strategies of Sales Mastery Program reverses the process. You stop chasing people who waste your time - and start talking only to those willing to invest first.</p>
              
              <ul className="smp-works-bullets">
                <li><CheckCircle size={18} className="text-red" /> <span>It turns your funnel into a self-funding system.</span></li>
                <li><CheckCircle size={18} className="text-red" /> <span>It pre-frames authority. Prospects show up already seeing you as the expert - not a vendor.</span></li>
                <li><CheckCircle size={18} className="text-red" /> <span>It turns calls into conversions. Every conversation starts with trust, clarity, and buyer intent - not skepticism.</span></li>
              </ul>
              
              <p>That's how real experts build predictable, profitable pipelines - and scale them as high as they choose, without begging, chasing, or convincing.</p>
              <p className="smp-works-highlight">You also get the emotional rush every day of seeing buyers come into your business!</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          WHO THIS IS FOR
      ══════════════════════════ */}
      <section className="smp-who-section">
        <div className="container">
          <motion.div className="smp-who-box" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <div className="smp-who-top-bar" />
            <h2 className="smp-who-title">WHO THIS IS FOR</h2>
            <ul className="smp-who-list">
              {targetAudience.map((audience, i) => (
                <li key={i}><Target size={18} /> <span>{audience}</span></li>
              ))}
            </ul>
            <div className="smp-who-footer">
              If that's you - this is the Course you've been looking for
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          GRAPH & REVIEWS
      ══════════════════════════ */}
      <StatsSection />
      <TestimonialsSection />

      {/* ══════════════════════════
          ENROLL FORM
      ══════════════════════════ */}
      <section id="enroll" className="smp-enroll-section">
        <div className="smp-enroll-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="smp-enroll-wrap">
            <div className="smp-section-header">
              <p className="smp-zero-fluff">ZERO FLUFF - NO UPSELLING - NO CROSS SELLING</p>
              <p className="smp-one-course">Only 1 Course for all your Revenue Generating Needs.</p>
              <h2 className="section-title" style={{ textAlign: 'center', marginTop: '30px' }}>So, if you're READY TO 10X REVENUE THE <span>EFFORTLESS WAY...</span></h2>
            </div>

            <div className="smp-form-card">
              <div className="smp-form-header">
                <h3>SECURE YOUR FREE 30-MINUTE SESSION</h3>
              </div>
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
                  {isSubmitting ? 'Submitting...' : <><Send size={18} /> SECURE YOUR FREE 30-MINUTE SESSION</>}
                </button>
                <p className="smp-form-note">No spam. Your data is secure.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        /* Hero */
        .smp-hero { min-height: 80vh; background: var(--bg); display: flex; align-items: center; padding: 120px 0 80px; position: relative; overflow: hidden; transition: background var(--theme-speed); }
        .smp-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.6; pointer-events: none; }
        .smp-hero-glow { position: absolute; top: 20%; right: -5%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(220,38,38,0.08) 0%, transparent 70%); pointer-events: none; }
        .smp-back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 36px; }
        .smp-hero-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start; }
        .smp-eyebrow-wrap { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: var(--red-dim); border: 1px solid var(--border-red); border-radius: 2px; font-size: 0.75rem; font-weight: 700; color: var(--red); margin-bottom: 20px; }
        .smp-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); animation: smp-blink 1.5s ease-in-out infinite; }
        @keyframes smp-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .smp-h1 { font-family: var(--font-head); font-weight: 900; font-size: clamp(3rem, 6vw, 5.5rem); line-height: 0.95; text-transform: uppercase; color: var(--text); margin-bottom: 20px; }
        .smp-h1-accent { color: var(--red); position: relative; }
        .smp-hero-sub { font-size: 1.15rem; color: var(--text-muted); line-height: 1.8; font-weight: 400; max-width: 480px; margin-bottom: 28px; }
        .smp-meta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
        .smp-meta-item { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: var(--surface); border: 1px solid var(--border); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); }
        .smp-hero-card { background: var(--bg-2); border: 1px solid var(--border); padding: 36px 32px; position: relative; }
        .smp-card-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--red), transparent); }
        .smp-card-label { font-size: 0.8rem; font-weight: 700; color: var(--red); margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.1em; }
        .smp-includes-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .smp-include-item { display: flex; align-items: center; gap: 12px; font-size: 1rem; color: var(--text-muted); font-weight: 400; }
        .smp-card-guarantee { display: flex; gap: 14px; padding: 20px; background: var(--red-dim); border: 1px solid var(--border-red); border-radius: 2px; }
        .smp-guarantee-title { font-weight: 700; font-size: 0.95rem; text-transform: uppercase; color: var(--text); margin-bottom: 6px; letter-spacing: 0.05em; }
        .smp-guarantee-text { font-size: 0.9rem; color: var(--text-muted); font-weight: 400; line-height: 1.6; }

        /* The Hook */
        .smp-hook-section { background: var(--bg-2); padding: 100px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .smp-hook-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; }
        .smp-hook-audience-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px; padding: 8px 14px; border: 1px solid var(--border); border-radius: 4px; background: var(--surface); }
        .smp-hook-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; color: var(--text); line-height: 1.15; margin-bottom: 24px; text-transform: uppercase; }
        .smp-hook-title span.text-red { color: var(--red); }
        .smp-hook-highlight { font-size: 1.25rem; font-weight: 600; color: var(--text-muted); line-height: 1.6; border-left: 3px solid var(--red); padding-left: 16px; margin: 0; }
        .smp-hook-right { display: flex; flex-direction: column; gap: 20px; }
        .smp-hook-feature-card { background: var(--bg); border: 1px solid var(--border); padding: 32px; border-radius: 6px; display: flex; gap: 24px; align-items: flex-start; transition: transform 0.2s; }
        .smp-hook-feature-card:hover { transform: translateY(-3px); border-color: var(--border-red); }
        .smp-hook-icon { flex-shrink: 0; background: var(--red-dim); padding: 14px; border-radius: 8px; width: 56px; height: 56px; border: 1px solid var(--border-red); }
        .smp-hook-feature-card p { font-size: 1.05rem; color: var(--text); line-height: 1.6; margin: 0; }

        /* Problem Section */
        .smp-problem-section { background: var(--surface); padding: 80px 0; border-bottom: 1px solid var(--border); }
        .smp-problem-container { max-width: 800px; margin: 0 auto; }
        .smp-problem-text h2 { font-size: 2rem; font-weight: 800; color: var(--text); line-height: 1.3; margin-bottom: 30px; text-align: center; }
        .smp-quote-box { background: var(--bg-2); border: 1px solid var(--border); border-left: 4px solid var(--red); padding: 24px 32px; margin-bottom: 24px; }
        .smp-quote-box p { font-weight: 700; text-transform: uppercase; font-size: 0.9rem; color: var(--red); margin-bottom: 16px; letter-spacing: 0.05em; }
        .smp-quote-box ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .smp-quote-box li { font-size: 1.1rem; color: var(--text-muted); font-style: italic; }
        .smp-frustration { font-size: 1.2rem; font-weight: 600; color: var(--text); text-align: center; margin-bottom: 40px; }
        .smp-truth-bomb { background: var(--bg); padding: 40px; border-radius: 4px; text-align: center; border: 1px solid var(--border); }
        .smp-truth-bomb h3 { font-size: 1.5rem; color: var(--red); margin-bottom: 16px; text-transform: uppercase; font-weight: 800; }
        .smp-truth-bomb p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }
        .smp-truth-bold { font-weight: 800; color: var(--text) !important; font-size: 1.2rem !important; }
        .smp-wants-list { display: flex; flex-direction: column; gap: 12px; font-weight: 700; color: var(--text); font-size: 1.2rem; margin-top: 24px; }

        /* Solution Section */
        .smp-solution-section { background: var(--bg); padding: 80px 0; }
        .smp-solution-top { max-width: 800px; margin: 0 auto 40px; text-align: center; }
        .smp-solution-top h2 { font-size: 2rem; font-weight: 800; color: var(--text); margin-bottom: 20px; line-height: 1.3; }
        .smp-solution-top h2 span { color: var(--red); }
        .smp-solution-top p { font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }
        .smp-solution-bold { font-weight: 700; color: var(--text) !important; font-size: 1.25rem !important; }
        .smp-system-box { max-width: 800px; margin: 0 auto; background: var(--bg-2); border: 1px solid var(--border); padding: 40px; border-radius: 4px; }
        .smp-system-box h3 { font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 24px; text-transform: uppercase; }
        .smp-system-list { list-style: none; padding: 0; margin: 0 0 30px 0; display: flex; flex-direction: column; gap: 20px; }
        .smp-system-list li { display: flex; gap: 16px; align-items: flex-start; font-size: 1.1rem; color: var(--text-muted); line-height: 1.5; }
        .text-red { color: var(--red); flex-shrink: 0; margin-top: 3px; }
        .smp-system-footer { font-size: 1rem; color: var(--text-dim); background: var(--surface); padding: 20px; border: 1px solid var(--border); font-style: italic; line-height: 1.6; }

        /* Mid CTA */
        .smp-mid-cta { background: #d62828; padding: 80px 20px; text-align: center; border-radius: 4px; }
        .smp-mid-cta-box { max-width: 800px; margin: 0 auto; }
        .smp-mid-warning { font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: #ffffff; line-height: 1.3; margin-bottom: 20px; text-transform: uppercase; }
        .smp-mid-bold { font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 700; color: #ffffff; margin-bottom: 24px; text-transform: uppercase; }
        .smp-mid-sub { font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 40px; }
        .smp-btn-white { display: inline-block; background: #ffffff; color: #d62828; font-weight: 800; font-size: 1.1rem; padding: 20px 40px; border-radius: 6px; text-transform: uppercase; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s; }
        .smp-btn-white:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); color: #b01a1a; }

        /* Learn Section */
        .smp-learn-section { background: var(--surface); padding: 80px 0; border-bottom: 1px solid var(--border); }
        .smp-learn-list-wrapper { max-width: 800px; margin: 0 auto; background: var(--bg-2); border: 1px solid var(--border); padding: 40px; }
        .smp-learn-list-clean { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 24px; }
        .smp-learn-list-clean li { display: flex; gap: 16px; align-items: flex-start; font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; }
        .smp-learn-icon-inline { flex-shrink: 0; margin-top: 4px; }

        /* Modules Section */
        .smp-curriculum-section { background: var(--bg); padding: 80px 0; }
        .smp-modules-image-wrapper { max-width: 1000px; margin: 0 auto; }
        .smp-modules-img { width: 100%; height: auto; display: block; border-radius: 4px; }

        /* Why It Works Section */
        .smp-why-section { background: var(--surface); padding: 80px 0; border-top: 1px solid var(--border); }
        .smp-why-content { max-width: 800px; margin: 0 auto; }
        .smp-roi-heading { font-size: 1.8rem; font-weight: 800; color: var(--text); line-height: 1.3; text-align: center; margin-bottom: 16px; }
        .smp-roi-sub { font-size: 1.2rem; font-weight: 600; color: var(--red); text-align: center; margin-bottom: 40px; }
        .smp-works-title { font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 24px; text-transform: uppercase; }
        .smp-works-box { background: var(--bg-2); border: 1px solid var(--border); padding: 40px; border-left: 4px solid var(--red); font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; }
        .smp-works-box p { margin-bottom: 20px; }
        .smp-works-bullets { list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 16px; }
        .smp-works-bullets li { display: flex; gap: 12px; align-items: flex-start; }
        .smp-works-highlight { font-weight: 700; color: var(--text); font-size: 1.15rem; margin-top: 24px; margin-bottom: 0 !important; }

        /* Who This Is For */
        .smp-who-section { background: var(--bg); padding: 80px 0; }
        .smp-who-box { max-width: 800px; margin: 0 auto; background: var(--bg-2); border: 1px solid var(--border); padding: 40px; position: relative; }
        .smp-who-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--red), transparent); }
        .smp-who-title { font-weight: 900; font-size: 1.8rem; color: var(--text); text-align: center; margin-bottom: 30px; letter-spacing: 0.05em; }
        .smp-who-list { list-style: none; padding: 0; margin: 0 0 30px 0; display: flex; flex-direction: column; gap: 20px; }
        .smp-who-list li { display: flex; gap: 16px; align-items: flex-start; font-size: 1.15rem; color: var(--text-muted); line-height: 1.5; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
        .smp-who-list li:last-child { border-bottom: none; padding-bottom: 0; }
        .smp-who-list li svg { color: var(--red); flex-shrink: 0; margin-top: 4px; }
        .smp-who-footer { font-size: 1.1rem; font-weight: 800; color: var(--text); text-align: center; background: var(--red-dim); padding: 20px; border: 1px solid var(--border-red); }

        /* Enroll */
        .smp-enroll-section { background: var(--bg); padding: 80px 0; position: relative; overflow: hidden; border-top: 1px solid var(--border); }
        .smp-enroll-glow { position: absolute; top: 50%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 70%); transform: translate(-50%,-50%); pointer-events: none; }
        .smp-enroll-wrap { max-width: 800px; margin: 0 auto; }
        .smp-zero-fluff { font-size: 1.2rem; font-weight: 800; color: var(--red); text-align: center; margin-bottom: 10px; }
        .smp-one-course { font-size: 1.1rem; font-weight: 600; color: var(--text-muted); text-align: center; margin-bottom: 20px; }
        .smp-form-card { background: var(--bg-2); border: 1px solid var(--border); border-top: 3px solid var(--red); padding: 48px 40px; margin-top: 40px; }
        .smp-form-header { text-align: center; margin-bottom: 30px; }
        .smp-form-header h3 { font-size: 1.4rem; color: var(--text); text-transform: uppercase; font-weight: 900; margin-bottom: 8px; }
        .smp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .smp-form-note { font-size: 0.85rem; color: var(--text-dim); text-align: center; margin-top: 16px; }

        @media (max-width: 900px) {
          .smp-hero-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .smp-hook-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .smp-form-row { grid-template-columns: 1fr !important; }
          .smp-problem-text h2 { font-size: 1.5rem; }
          .smp-btn-white { width: 100%; padding: 16px; }
        }
      `}</style>
    </div>
  )
}