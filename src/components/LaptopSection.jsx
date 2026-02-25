import { motion } from 'framer-motion';

export default function LaptopSection() {
  return (
    <section className="laptop-section">
      <div className="container">
        <motion.div 
          className="laptop-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          {/* Subtle Red Glow behind the laptop to match NTS theme */}
          <div className="laptop-glow" />
          
          <img 
            src="/assets/nts-laptop-mockup.png" 
            alt="NTS System Mockup" 
            className="laptop-image"
          />
        </motion.div>
      </div>

      <style>{`
        .laptop-section {
          /* Made transparent so it blends seamlessly into the sections above/below */
          background: transparent; 
          
          /* Increased bottom padding slightly to give the shadow room to breathe */
          padding: 80px 0 60px; 
          
          /* REMOVED 'overflow: hidden;' WHICH WAS SLICING THE SHADOW IN HALF */
          position: relative;
        }

        .laptop-wrapper {
          position: relative;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .laptop-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .laptop-image {
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 1;
          /* Softened the shadow slightly so it looks amazing on both Light and Dark mode */
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.35));
        }

        @media (max-width: 768px) {
          .laptop-section {
            padding: 40px 0 40px;
          }
          .laptop-wrapper {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}