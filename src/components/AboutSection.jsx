import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="section" ref={ref}
      style={{ 
        background: 'var(--bg)', 
        overflow: 'hidden',
        padding: '140px 0' 
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="about-grid">

          {/* Left — Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 16 }}>
              Who is behind Nail the Sale
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '3.8rem', color: 'var(--text)', lineHeight: 1.1, marginBottom: 40, textTransform: 'uppercase' }}>
              Hi, I'm Ankit Khare
            </h2>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400, marginBottom: 32 }}>
              I've spent more than 18 years in the corporate trenches, researching and personally experimenting with <span className="highlight-text">neuroscience-backed buyer psychology and high-ticket closures</span> as a sales professional.
            </p>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400, marginBottom: 32 }}>
              What started as a drive to hit my own targets turned into a life-long mission to help you <span className="highlight-text">harness the full potential of your pitch and turn it into record-breaking revenue</span>. Rising from an executive to the AVP level, leading 1,000+ executives, I firmly believe this is a crucial part of creating a better future for sales teams.
            </p>

            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 400 }}>
              The Nail the Sale system is the result of thousands of hours spent teaching, speaking, and coaching teams across Automobile, Retail, Subscription based businesses, Education ,SMEs ... 
              <br /><br />
              And I can't wait to share it with you!
            </p>
          </motion.div>

          {/* Right — The Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ 
              position: 'relative', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              width: '100%', 
              maxWidth: '480px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
              <img
                src="/assets/ankit-photo.png" 
                alt="Ankit Khare"
                style={{
                  width: '100%', 
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .highlight-text {
          color: var(--text);
          font-weight: 500;
          border-bottom: 2px solid var(--red);
          padding-bottom: 2px;
          transition: background 0.3s ease;
        }

        .highlight-text:hover {
          background: rgba(220, 38, 38, 0.1);
        }

        @media (max-width: 1100px) {
          .about-grid { gap: 60px; }
          h2 { font-size: 3.2rem !important; }
        }

        @media (max-width: 900px) {
          #about { padding: 80px 0 !important; }
          .about-grid { 
            grid-template-columns: 1fr; 
            gap: 60px; 
          }
          .about-grid > div:first-child { order: 1; }
          .about-grid > div:last-child  { order: 2; }
          h2 { font-size: 2.8rem !important; }
        }
      `}</style>
    </section>
  )
}