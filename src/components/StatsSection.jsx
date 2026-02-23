import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2.2, ease: 'easeOut' } },
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 2.1 } },
  }

  return (
    <section id="stats" ref={ref} className="stats-section">
      <div className="container stats-container">

        {/* Header */}
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow">By The Numbers</div>
          <h2 className="section-title">Growth That <span>Speaks Itself</span></h2>
        </motion.div>

        {/* Graph */}
        <motion.div
          className="stats-graph-wrap"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 1000 520" className="stats-svg" xmlns="http://www.w3.org/2000/svg">

            {/* ── Subtle grid ── */}
            {[130, 220, 310, 400].map((y) => (
              <motion.line key={y}
                x1="80" y1={y} x2="940" y2={y}
                stroke="var(--border)" strokeWidth="1" strokeDasharray="4 10"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
              />
            ))}

            {/* ── Axes ── */}
            <motion.line x1="80" y1="60" x2="80" y2="460" stroke="var(--border)" strokeWidth="2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} />
            <motion.line x1="80" y1="460" x2="940" y2="460" stroke="var(--border)" strokeWidth="2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} />

            {/* Axis arrows */}
            <motion.path d="M 74 65 L 80 55 L 86 65" fill="none" stroke="var(--border)" strokeWidth="2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} />
            <motion.path d="M 935 454 L 945 460 L 935 466" fill="none" stroke="var(--border)" strokeWidth="2"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} />

            {/* ── Axis Labels ── */}
            <motion.text x="-240" y="44" transform="rotate(-90)"
              fill="var(--text-muted)" fontSize="14" fontFamily="var(--font-head)"
              fontWeight="700" letterSpacing="0.12em" textAnchor="middle"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              STUDENTS TRAINED
            </motion.text>
            <motion.text x="510" y="500"
              fill="var(--text-muted)" fontSize="14" fontFamily="var(--font-head)"
              fontWeight="700" letterSpacing="0.12em" textAnchor="middle"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              YEARS OF EXPERIENCE
            </motion.text>

            {/* ── Year ticks ── */}
            {[
              { x: 80,  label: '2006' },
              { x: 280, label: '2010' },
              { x: 480, label: '2014' },
              { x: 680, label: '2018' },
              { x: 880, label: '2024' },
            ].map(({ x, label }) => (
              <motion.g key={label}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
                <line x1={x} y1="460" x2={x} y2="470" stroke="var(--border)" strokeWidth="2" />
                <text x={x} y="487" fill="var(--text-dim)" fontSize="13"
                  fontFamily="var(--font-head)" fontWeight="600" textAnchor="middle">
                  {label}
                </text>
              </motion.g>
            ))}

            {/* ────────────────────────────────
                CURVE 1 — Students (RED solid)
               ──────────────────────────────── */}
            <motion.path
              variants={drawLine} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              d="M 100 440 C 220 420, 360 350, 500 260 C 640 170, 760 120, 900 80"
              stroke="var(--red)" strokeWidth="5" fill="none"
              strokeLinecap="round" strokeLinejoin="round"
            />

            {/* Area under curve 1 */}
            <motion.path
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 2.1 } } }}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              d="M 100 440 C 220 420, 360 350, 500 260 C 640 170, 760 120, 900 80 L 900 460 L 100 460 Z"
              fill="url(#redGrad)"
            />

            {/* ────────────────────────────────
                CURVE 2 — Revenue (dashed gray)
               ──────────────────────────────── */}
            <motion.path
              variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 2.2, delay: 0.35, ease: 'easeOut' } } }}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              d="M 100 455 C 280 450, 430 420, 580 370 C 700 330, 810 285, 900 250"
              stroke="var(--text-dim)" strokeWidth="3" fill="none"
              strokeLinecap="round" strokeDasharray="10 7"
            />

            {/* ────────────────────────────────
                CROSSHAIR at 2018 milestone
               ──────────────────────────────── */}
            <motion.line variants={fadeIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              x1="680" y1="190" x2="680" y2="460"
              stroke="var(--red)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.45" />
            <motion.line variants={fadeIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              x1="80" y1="190" x2="680" y2="190"
              stroke="var(--red)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.45" />

            {/* Intersection dot */}
            <motion.circle cx="680" cy="190" r="5" fill="var(--red)"
              initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 2.3 }} style={{ transformOrigin: '680px 190px' }} />

            {/* ────────────────────────────────
                END DOTS
               ──────────────────────────────── */}
            <motion.circle cx="900" cy="80" r="7" fill="var(--red)"
              initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 2.3 }} style={{ transformOrigin: '900px 80px' }} />
            <motion.circle cx="900" cy="250" r="5" fill="var(--text-dim)"
              initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 2.5 }} style={{ transformOrigin: '900px 250px' }} />

            {/* ────────────────────────────────
                LABELS
               ──────────────────────────────── */}
            {inView && (
              <>
                {/* Curve 1 end label */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                  <text x="888" y="65" fill="var(--red)" fontSize="34" fontWeight="900"
                    fontFamily="var(--font-head)" textAnchor="end">
                    5000+
                  </text>
                  <text x="888" y="84" fill="var(--text-muted)" fontSize="12"
                    fontFamily="var(--font-head)" fontWeight="700" letterSpacing="0.12em" textAnchor="end">
                    STUDENTS
                  </text>
                </motion.g>

                {/* Curve 2 end label */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
                  <text x="888" y="238" fill="var(--text-muted)" fontSize="26" fontWeight="800"
                    fontFamily="var(--font-head)" textAnchor="end">
                    ₹500Cr+
                  </text>
                  <text x="888" y="258" fill="var(--text-dim)" fontSize="11"
                    fontFamily="var(--font-head)" fontWeight="700" letterSpacing="0.12em" textAnchor="end">
                    REVENUE GENERATED
                  </text>
                </motion.g>

                {/* Crosshair annotation */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}>
                  <text x="693" y="183" fill="var(--red)" fontSize="15"
                    fontFamily="var(--font-head)" fontWeight="800" letterSpacing="0.05em">
                    1000+
                  </text>
                  <text x="693" y="200" fill="var(--text-dim)" fontSize="11"
                    fontFamily="var(--font-head)" letterSpacing="0.06em">
                    by 2018
                  </text>
                </motion.g>
              </>
            )}

            {/* ── Legend ── */}
            <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 2.7 }}>
              <rect x="100" y="74" width="22" height="4" rx="2" fill="var(--red)" />
              <text x="130" y="82" fill="var(--text-muted)" fontSize="12" fontFamily="var(--font-head)"
                fontWeight="700" letterSpacing="0.1em">STUDENTS TRAINED</text>

              <line x1="320" y1="76" x2="344" y2="76" stroke="var(--text-dim)" strokeWidth="2.5" strokeDasharray="7 5" />
              <text x="352" y="82" fill="var(--text-muted)" fontSize="12" fontFamily="var(--font-head)"
                fontWeight="700" letterSpacing="0.1em">REVENUE GROWTH</text>
            </motion.g>

            {/* Gradient def */}
            <defs>
              <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#dc2626" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* ── 4 stat pills below graph ── */}
        <div className="stats-pills">
          {[
            { value: 18,  suffix: '+', label: 'Years Experience' },
            { value: 500, suffix: '+', label: 'Workshops' },
            { value: 98,  suffix: '%', label: 'Success Rate' },
            { value: 30,  suffix: '+', label: 'Industries' },
          ].map(({ value, suffix, label }, i) => (
            <motion.div key={label} className="stats-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.7 + i * 0.1 }}>
              <div className="stats-pill__value">
                {inView ? <CountUp end={value} duration={2} delay={2.5} /> : '0'}{suffix}
              </div>
              <div className="stats-pill__label">{label}</div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .stats-section {
          background: var(--bg);
          padding: 100px 0 80px;
          overflow: hidden;
        }
        .stats-container { position: relative; z-index: 1; }
        .stats-header { text-align: center; margin-bottom: 56px; }

        .stats-graph-wrap {
          width: 100%;
          border: 1px solid var(--border);
          background: var(--bg-2);
          padding: 28px 12px 4px;
        }
        .stats-svg { width: 100%; height: auto; display: block; overflow: visible; }

        .stats-pills {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-top: none;
        }
        .stats-pill {
          background: var(--bg-2);
          padding: 24px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .stats-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(220,38,38,0.04);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .stats-pill:hover::before { opacity: 1; }
        .stats-pill__value {
          font-family: var(--font-head);
          font-weight: 900;
          font-size: 2.2rem;
          color: var(--text);
          line-height: 1;
        }
        .stats-pill__label {
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 6px;
        }

        @media (max-width: 768px) {
          .stats-section { padding: 72px 0 56px; }
          .stats-graph-wrap { padding: 16px 4px 0; }
          .stats-pills { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-pill__value { font-size: 1.7rem; }
        }
      `}</style>
    </section>
  )
}