import { useState } from 'react'
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
      ctaText: 'Join Sales Mastery',
      imgBg: 'linear-gradient(135deg, #440000, var(--red))',
      hasVideo: false, 
    },
    {
      id: 'fmp',
      href: '/courses/fmp',
      title: 'Financial Market Professional',
      desc: 'A certified program covering Stock Market Fundamentals, Money Management, Technical Analysis, and Derivatives to help you achieve financial freedom.',
      ctaText: 'Explore FMP Program',
      imgBg: 'linear-gradient(135deg, #111, #222)', 
      hasVideo: false, 
    }
  ],
  membership: [
    {
      id: 'inner-circle',
      href: '/#contact',
      title: 'NTS Inner Circle',
      desc: 'Join an exclusive community of top-performing sales professionals. Get monthly group coaching, live Q&As, and direct access to Ankit.',
      ctaText: 'Apply For Membership',
      imgBg: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
      hasVideo: false,
    }
  ]
}

export default function CoursesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  
  // State to manage which tab is currently active
  const [activeTab, setActiveTab] = useState('courses')

  // Get the data for the currently active tab
  const currentItems = tabData[activeTab]

  return (
    <section id="courses" className="section" ref={ref} style={{ background: 'var(--bg)', padding: '100px 0' }}>
      <div className="container">

        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 className="section-title">Your Path to <span>Growth</span></h2>
        </motion.div>

        {/* --- TABS --- */}
        <motion.div 
          className="tab-container"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'membership' ? 'active' : ''}`}
            onClick={() => setActiveTab('membership')}
          >
            Membership
          </button>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
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
                    <div className="screen-content" style={{ background: item.imgBg }}>
                      
                      {/* --- THE NTS LOGO --- */}
                      <img 
                        src="/assets/nts-logo-white.png" 
                        alt="NTS Logo" 
                        style={{ 
                          // If there's a play button, make the logo smaller and push it up. Otherwise, make it large and centered.
                          height: item.hasVideo ? '30px' : '50px', 
                          marginBottom: item.hasVideo ? '65px' : '0',
                          opacity: 0.9,
                          objectFit: 'contain',
                          zIndex: 2,
                          transition: 'all 0.3s ease'
                        }} 
                      />

                      {/* --- THE PLAY BUTTON --- */}
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
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Play Button specific styles */
        .screen-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -30%);
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
          transform: translate(-50%, -30%) scale(1.1);
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
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .card-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 30px;
          flex-grow: 1;
        }

        /* --- Full Width CTA Button --- */
        .card-cta {
          display: block;
          width: 100%;
          padding: 16px 0;
          background: var(--red);
          color: #fff;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 0.85rem;
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
          .tab-btn { padding: 12px 24px; font-size: 0.8rem; }
          .laptop-mockup { max-width: 280px; }
          .card-title { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  )
}