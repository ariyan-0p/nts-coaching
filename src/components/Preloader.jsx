import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Reduced pause at 100% for a faster transition
          setTimeout(() => setLoading(false), 300); 
          return 100;
        }
        return prev + 1;
      });
    }, 10); // CUT IN HALF: Changed from 20ms to 10ms for 2x speed

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'inset(50% 0 50% 0)', 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="preloader-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ marginBottom: '30px' }}
            >
              <img 
                src="/assets/nts-logo-white.png" 
                alt="NTS Logo" 
                style={{ 
                  width: '120px', 
                  height: 'auto', 
                  filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))' 
                }} 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="preloader-brand"
            >
              NAIL THE SALE <span style={{ color: 'var(--red)', opacity: 0.8 }}>WITH ANKIT</span>
            </motion.div>

            <div className="progress-container">
              <div className="progress-text">{progress}%</div>
              <div className="progress-track">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="preloader-status">BOOTING NTS ECOSYSTEM...</div>
          </div>

          <style>{`
            .preloader-overlay {
              position: fixed;
              inset: 0;
              background: #000;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            }

            .preloader-content {
              text-align: center;
              width: 350px;
            }

            .preloader-brand {
              font-family: var(--font-head);
              font-weight: 900;
              letter-spacing: 0.3em;
              font-size: 0.9rem;
              margin-bottom: 40px;
              white-space: nowrap;
            }

            .progress-container {
              position: relative;
              margin-bottom: 15px;
            }

            .progress-text {
              font-family: var(--font-head);
              font-size: 5rem;
              font-weight: 900;
              opacity: 0.05;
              position: absolute;
              top: -80px;
              left: 50%;
              transform: translateX(-50%);
              pointer-events: none;
            }

            .progress-track {
              height: 1px;
              width: 100%;
              background: rgba(255,255,255,0.05);
              overflow: hidden;
            }

            .progress-bar {
              height: 100%;
              background: var(--red);
            }

            .preloader-status {
              font-size: 0.5rem;
              letter-spacing: 0.5em;
              color: var(--text-dim);
              text-transform: uppercase;
              margin-top: 10px;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}