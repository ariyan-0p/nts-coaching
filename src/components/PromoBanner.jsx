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
              <Zap size={24} fill="currentColor" className="promo-icon" />
              <span>SECURE YOUR FREE 30-MINUTE SESSION</span>
            </h2>
            <p className="promo-subtext">
              Be quick! FREE spots are almost gone for February
            </p>
          </div>
          
          <div className="promo-arrow">
            <ArrowRight size={24} />
          </div>
        </motion.a>
      </div>

      <style>{`
        .promo-container {
          padding: 60px 0;
          background: var(--bg);
        }

        .promo-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--red);
          padding: 30px 45px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          /* Sharp professional clip-path */
          clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2);
          transition: all 0.3s ease;
        }

        .promo-banner:hover {
          background: #ef4444;
          box-shadow: 0 30px 60px rgba(220, 38, 38, 0.35);
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
          flex: 1;
        }

        .promo-title {
          font-family: var(--font-head);
          font-size: clamp(1rem, 2.5vw, 1.8rem);
          font-weight: 900;
          line-height: 1.2;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          text-transform: uppercase;
        }

        .promo-subtext {
          font-size: clamp(0.75rem, 1.5vw, 1rem);
          font-weight: 400;
          margin-top: 5px;
          opacity: 0.9;
          font-family: var(--font-body);
        }

        .promo-icon {
          color: #fff;
          flex-shrink: 0;
        }

        .promo-arrow {
          width: 50px;
          height: 50px;
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
          margin-left: 20px;
        }

        .promo-banner:hover .promo-arrow {
          transform: translateX(8px);
          background: #fff;
          color: var(--red);
        }

        @media (max-width: 768px) {
          .promo-banner {
            padding: 20px 25px; /* Thinner padding for mobile */
            /* Forces horizontal layout on mobile */
            flex-direction: row !important; 
            text-align: left !important;
          }
          .promo-title {
            gap: 8px;
          }
          .promo-icon {
            display: none; /* Hide icon on tiny screens to save space */
          }
          .promo-arrow {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </section>
  )
}