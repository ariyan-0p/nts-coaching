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
    desc: "Not converting? I'll audit your complete sales funnel — from first contact to close — and identify & fix the leaks fast. Includes a Video Review, PDF Report, and a 30-Min Strategy Session.",
    tags: ['Full Audit', 'PDF Report', '30-Min Strategy'],
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="section services-section" ref={ref}>

      {/* Ambient glow blobs */}
      <div className="services-glow services-glow--1" />
      <div className="services-glow services-glow--2" />

      <div className="container services-container">

        {/* ── Header ── */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="services-header__left">
            <div className="eyebrow">What We Do</div>
            <h2 className="section-title">
              Ready To Level Up <span>Your Sales</span>
            </h2>
          </div>
          <div className="services-header__right">
            <p className="section-sub">
              Comprehensive sales coaching programs designed to transform individuals and teams
              into high-performance closing machines — regardless of industry or experience level.
            </p>
            <a href="/#contact" className="btn btn-primary services-header__cta">
              Let's Talk Strategy
            </a>
          </div>
        </motion.div>

        {/* ── Services Grid ── */}
        <div className="services-grid">
          {services.map(({ icon: Icon, number, title, desc, tags }, i) => (
            <motion.div
              key={title}
              className="service-card"
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Animated red left border */}
              <div className="service-card__accent" />

              {/* Number watermark */}
              <div className="service-card__number" aria-hidden="true">{number}</div>

              {/* Top row: icon + number badge */}
              <div className="service-card__top">
                <div className="service-card__icon-wrap">
                  <Icon size={20} className="service-card__icon-svg" />
                </div>
                <span className="service-card__badge">{number}</span>
              </div>

              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{desc}</p>

              {/* Tags */}
              <div className="service-card__tags">
                {tags.map(tag => (
                  <span key={tag} className="service-card__tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          className="services-cta-strip"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          <p className="services-cta-strip__text">
            Ready to <span>transform</span> your sales performance?
          </p>
          <div className="services-cta-strip__actions">
            <a href="tel:+919752809028" className="btn btn-outline btn-sm">
              <Phone size={14} />
              Call Now
            </a>
            <a href="/#contact" className="btn btn-primary btn-sm">
              Get Started
            </a>
          </div>
        </motion.div>

      </div>

      {/* ════════════════════════════════════════
          ALL STYLES — theme-aware, no hardcoding
         ════════════════════════════════════════ */}
      <style>{`

        /* ── Section shell ── */
        .services-section {
          background: var(--bg-2);
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient glows ── */
        .services-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .services-glow--1 {
          top: 30%;
          right: -8%;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%);
        }
        .services-glow--2 {
          bottom: 10%;
          left: -6%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%);
        }

        /* ── Container ── */
        .services-container {
          position: relative;
          z-index: 1;
        }

        /* ── Header ── */
        .services-header {
          margin-bottom: 56px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
        }
        .services-header__cta {
          margin-top: 20px;
          display: inline-flex;
        }

        /* ── Grid ── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }

        /* ── Card ── */
        .service-card {
          background: var(--bg-2);
          padding: 36px 28px 32px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition:
            box-shadow 0.3s ease,
            transform 0.25s ease;
        }

        /* 
          Hover overlay via pseudo-element — theme-agnostic.
          Instead of changing background-color (which fights CSS vars),
          we layer a semi-transparent red tint on top.
          Works correctly in BOTH dark and light mode.
        */
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(220, 38, 38, 0.04);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }
        .service-card:hover::before {
          opacity: 1;
        }

        /* Ensure card content sits above the overlay */
        .service-card > * {
          position: relative;
          z-index: 1;
        }

        .service-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(220, 38, 38, 0.12);
          z-index: 2;
        }

        /* Red left accent bar */
        .service-card__accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--red);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card:hover .service-card__accent {
          transform: scaleY(1);
        }

        /* Large watermark number */
        .service-card__number {
          position: absolute;
          top: 12px;
          right: 18px;
          font-family: var(--font-head);
          font-weight: 900;
          font-size: 5rem;
          color: var(--text-watermark, rgba(128,128,128,0.06));
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color 0.3s;
        }
        .service-card:hover .service-card__number {
          color: var(--text-watermark-hover, rgba(220,38,38,0.08));
        }

        /* Top row */
        .service-card__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        /* Icon box */
        .service-card__icon-wrap {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--red-dim);
          border: 1px solid var(--border-red);
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px));
          transition: background 0.3s, border-color 0.3s;
          flex-shrink: 0;
        }
        .service-card:hover .service-card__icon-wrap {
          background: rgba(220,38,38,0.18);
          border-color: rgba(220,38,38,0.4);
        }
        .service-card__icon-svg {
          color: var(--red);
        }

        /* Small badge (visible on mobile instead of watermark) */
        .service-card__badge {
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-dim);
          opacity: 0.5;
          align-self: flex-start;
          padding-top: 4px;
        }

        /* Title */
        .service-card__title {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.25;
          transition: color 0.3s;
        }
        .service-card:hover .service-card__title {
          color: var(--text);
        }

        /* Description */
        .service-card__desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          line-height: 1.78;
          font-weight: 300;
          margin-bottom: 22px;
          transition: color 0.3s;
        }

        /* Tags */
        .service-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .service-card__tag {
          padding: 3px 9px;
          background: var(--surface);
          border: 1px solid var(--border);
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 0.63rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          transition: background 0.25s, border-color 0.25s, color 0.25s;
        }
        .service-card:hover .service-card__tag {
          border-color: var(--border-red);
          color: var(--red);
        }

        /* ── CTA strip ── */
        .services-cta-strip {
          margin-top: 1px;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-top: none;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          transition: background 0.3s;
        }
        .services-cta-strip__text {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text);
        }
        .services-cta-strip__text span {
          color: var(--red);
        }
        .services-cta-strip__actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        /* No hardcoded theme overrides needed —
           hover uses a pseudo-element overlay so it works
           correctly in both dark and light mode automatically. */

        /* ════════════════════════════════
            TABLET — 2 columns
           ════════════════════════════════ */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ════════════════════════════════
            TABLET — header stack
           ════════════════════════════════ */
        @media (max-width: 860px) {
          .services-header {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 40px;
          }
        }

        /* ════════════════════════════════
            MOBILE — 1 column, refined
           ════════════════════════════════ */
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          /* On mobile, remove transform lift (prevents layout shift) */
          .service-card:hover {
            transform: none;
          }

          /* Tighter card padding on mobile */
          .service-card {
            padding: 28px 20px 24px;
          }

          /* Hide watermark number on small screens (badge is enough) */
          .service-card__number {
            display: none;
          }

          /* Make badge more prominent */
          .service-card__badge {
            font-size: 0.75rem;
            opacity: 0.6;
          }

          .service-card__title {
            font-size: 0.98rem;
          }

          .services-cta-strip {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
          }
          .services-cta-strip__actions {
            width: 100%;
          }
          .services-cta-strip__actions .btn {
            flex: 1;
            justify-content: center;
          }

          .services-cta-strip__text {
            font-size: 0.9rem;
          }
        }

        /* ════════════════════════════════
            Very small screens
           ════════════════════════════════ */
        @media (max-width: 380px) {
          .service-card {
            padding: 22px 16px 20px;
          }
          .service-card__title {
            font-size: 0.92rem;
          }
          .service-card__desc {
            font-size: 0.83rem;
          }
        }

      `}</style>
    </section>
  )
}