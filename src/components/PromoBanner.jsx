import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function PromoBanner() {
  return (
    <section className="promo-container">
      <div className="container">
        <motion.a 
          href="#contact"
          className="promo-banner"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Subtle animated background shine */}
          <div className="promo-shine" />

          <div className="promo-content">
            <h2 className="promo-title">
              <Zap size={28} fill="currentColor" className="promo-icon" />
              SECURE YOUR FREE 30-MINUTE STRATEGY SESSION
            </h2>
            <p className="promo-subtext">
              Be quick! FREE spots are almost gone for February
            </p>
          </div>
          
          <div className="promo-arrow">
            <ArrowRight size={32} />
          </div>
        </motion.a>
      </div>

      <style>{`
        .promo-container {
          padding: 80px 0;
          background: var(--bg);
        }

        .promo-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--red); /* Matches NTS Red */
          padding: 40px 56px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          /* Matches the sharp clip-path style of your buttons */
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
          box-shadow: 0 30px 60px rgba(220, 38, 38, 0.25);
          transition: all 0.3s ease;
        }

        .promo-banner:hover {
          background: #ef4444; /* Slightly brighter red on hover */
          box-shadow: 0 40px 80px rgba(220, 38, 38, 0.4);
        }

        .promo-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.15),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.75s;
        }

        .promo-banner:hover .promo-shine {
          left: 150%;
        }

        .promo-content {
          position: relative;
          z-index: 2;
        }

        .promo-title {
          font-family: var(--font-head);
          font-size: clamp(1.4rem, 3.5vw, 2.8rem);
          font-weight: 900;
          line-height: 1.05;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 16px;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .promo-subtext {
          font-size: 1.2rem;
          font-weight: 400;
          margin-top: 10px;
          opacity: 0.9;
          font-family: var(--font-body);
          letter-spacing: 0.02em;
        }

        .promo-icon {
          color: #fff;
          flex-shrink: 0;
        }

        .promo-arrow {
          width: 72px;
          height: 72px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .promo-banner:hover .promo-arrow {
          transform: translateX(12px);
          background: #fff;
          color: var(--red);
        }

        @media (max-width: 900px) {
          .promo-banner {
            padding: 40px 32px;
          }
          .promo-title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .promo-banner {
            flex-direction: column;
            text-align: center;
            padding: 48px 24px;
            gap: 32px;
          }
          .promo-title {
            justify-content: center;
            font-size: 1.5rem;
            flex-direction: column;
          }
          .promo-arrow {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  )
}