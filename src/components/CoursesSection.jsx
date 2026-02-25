import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

// --- 1. DATA SETUP ---
const tabData = {
  courses: [
    {
      id: 'sales-mastery',
      href: '/courses/sales-mastery',
      title: 'Sales Mastery Program',
      desc: 'The exact roadmap to attract perfect-fit clients effortlessly and authentically — without ever feeling "salesy".',
      ctaText: 'Enroll Now',
      // ADD YOUR FIRST THUMBNAIL HERE:
      thumbnail: '/assets/sales-mastery-thumb.jpg', 
      hasVideo: false, 
    },
    {
      id: 'fmp',
      href: '/courses/fmp',
      title: 'Financial Market Professional',
      desc: 'A certified program covering Stock Market Fundamentals, Money Management, Technical Analysis, and Derivatives to help you achieve financial freedom.',
      ctaText: 'Enroll Now',
      // ADD YOUR SECOND THUMBNAIL HERE:
      thumbnail: '/assets/fmp-thumb.jpg', 
      hasVideo: false, 
    }
  ]
}

export default function CoursesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  
  // Since there are only courses to display now, we just use the courses array directly
  const currentItems = tabData.courses

  return (
    <section id="courses" className="section" ref={ref} style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div className="container">

        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', margin: '0 auto 40px' }}
        >
          <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Programs</div>
          <h2 className="section-title">Your Path to <span>Growth</span></h2>
        </motion.div>

        {/* --- TABS / LINKS --- */}
        <motion.div 
          className="tab-container"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="tab-btn active">
            Courses
          </button>
          <a 
            href="https://chat.whatsapp.com/IyP0WiRjuC4DtYPNwFuFan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tab-btn"
          >
            Join Community
          </a>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div 
            key="courses"
            className="cards-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentItems.map((item) => (
              <div key={item.id} className="course-card">
                
                {/* CSS Laptop Mockup */}
                <div className="laptop-mockup">
                  <div className="laptop-screen">
                    <div className="screen-content">
                      
                      {/* --- THUMBNAIL IMAGE --- */}
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', // Ensures the image perfectly fills the laptop screen
                          zIndex: 1
                        }} 
                      />

                      {/* --- THE PLAY BUTTON (Appears on top of thumbnail if hasVideo is true) --- */}
                      {item.hasVideo && (
                        <div className="screen-play-btn">
                          <Play size={20} fill="#fff" style={{ marginLeft: '4px' }} />
                        </div>
                      )}

                    </div>
                  </div>
                  <div className="laptop-base">
                    <div className="laptop-notch"></div>
                  </div>
                </div>

                {/* Card Text Content */}
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                
                {/* CTA Button */}
                <Link to={item.href} className="card-cta">
                  {item.ctaText}
                </Link>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* --- STYLES --- */}
      <style>{`
        /* --- Tabs --- */
        .tab-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }
        
        .tab-btn {
          padding: 14px 40px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-family: var(--font-head);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .tab-btn:hover {
          border-color: var(--text-dim);
          color: var(--text);
        }

        .tab-btn.active {
          background: var(--red);
          border-color: var(--red);
          color: #fff;
          box-shadow: 0 10px 20px rgba(220, 38, 38, 0.2);
        }

        /* --- Grid Layout --- */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: start;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
        }

        /* --- Pure CSS Laptop Mockup --- */
        .laptop-mockup {
          width: 100%;
          max-width: 340px;
          margin: 0 auto 30px;
          perspective: 1000px;
        }

        .laptop-screen {
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #111;
          border: 6px solid #222;
          border-radius: 12px 12px 0 0;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 0 2px #000;
        }

        [data-theme="light"] .laptop-screen {
          border-color: #ddd;
          background: #fff;
          box-shadow: inset 0 0 0 2px #eee;
        }

        .screen-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #000; /* Fallback background while image loads */
        }

        /* Play Button specific styles */
        .screen-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: var(--red);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.5);
          transition: transform 0.2s ease, background 0.2s ease;
          z-index: 3;
        }
        
        .course-card:hover .screen-play-btn {
          transform: translate(-50%, -50%) scale(1.1);
          background: #ff0000;
        }

        .laptop-base {
          width: 115%;
          height: 14px;
          background: #333;
          margin-left: -7.5%;
          border-radius: 0 0 16px 16px;
          position: relative;
          box-shadow: 0 15px 25px rgba(0,0,0,0.4);
        }

        [data-theme="light"] .laptop-base {
          background: #ccc;
          box-shadow: 0 15px 25px rgba(0,0,0,0.1);
        }

        .laptop-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: #222;
          border-radius: 0 0 4px 4px;
        }
        [data-theme="light"] .laptop-notch { background: #aaa; }

        /* --- Text Content --- */
        .card-title {
          font-family: var(--font-head);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 30px;
          font-weight: 400;
          flex-grow: 1;
        }

        /* --- Full Width CTA Button --- */
        .card-cta {
          display: block;
          width: 100%;
          padding: 18px 0;
          background: var(--red);
          color: #fff;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .card-cta:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(220, 38, 38, 0.3);
        }

        /* --- Mobile Adjustments --- */
        @media (max-width: 768px) {
          .tab-btn { padding: 12px 24px; font-size: 0.95rem; }
          .laptop-mockup { max-width: 280px; }
          .card-title { font-size: 1.4rem; }
        }
      `}</style>
    </section>
  )
}