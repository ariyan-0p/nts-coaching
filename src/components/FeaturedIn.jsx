import { useInView } from 'react-intersection-observer'

// Row 1 Data
const brandsRow1 = [
  "Entrepreneur", "MSNBC", "ELITE DAILY", "HUFFPOST", "FOX NEWS", "Forbes",
  "Entrepreneur", "MSNBC", "ELITE DAILY", "HUFFPOST", "FOX NEWS", "Forbes",
]

// Row 2 Data
const brandsRow2 = [
  "TODAY", "Daily Mail", "FINANCIAL REVIEW", "CEO Magazine", "smartcompany", "THE AGE",
  "TODAY", "Daily Mail", "FINANCIAL REVIEW", "CEO Magazine", "smartcompany", "THE AGE",
]

// Row 3 Data
const brandsRow3 = [
  "Business Insider", "TechCrunch", "Wall Street Journal", "Bloomberg", "Inc.", "Fast Company",
  "Business Insider", "TechCrunch", "Wall Street Journal", "Bloomberg", "Inc.", "Fast Company",
]

const LogoItem = ({ text, index }) => (
  <div 
    className="brand-logo-item"
    style={{
      fontFamily: index % 2 === 0 ? 'serif' : 'sans-serif',
      fontWeight: 800,
      textTransform: text === "Forbes" || text === "Entrepreneur" || text === "Inc." ? 'capitalize' : 'uppercase',
    }}
  >
    {text}
  </div>
)

export default function FeaturedIn() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} style={{ padding: '60px 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="container-fluid" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease' }}>
        
        {/* BROUGHT THIS BACK: The Section Heading */}
        <h3 style={{ 
          textAlign: 'center', 
          fontFamily: 'var(--font-head)', 
          fontSize: '0.9rem', 
          letterSpacing: '0.3em', 
          textTransform: 'uppercase', 
          color: 'var(--text-dim)',
          marginBottom: '50px',
          fontWeight: 700
        }}>
          As Featured In
        </h3>

        <div className="marquee-wrapper-mask">
          
          {/* ROW 1: Scrolls Left */}
          <div className="marquee-track scroll-left-1">
            <div className="marquee-content">
              {brandsRow1.map((brand, i) => <LogoItem key={i} text={brand} index={i} />)}
            </div>
            <div className="marquee-content">
              {brandsRow1.map((brand, i) => <LogoItem key={`dup-${i}`} text={brand} index={i} />)}
            </div>
          </div>

          {/* ROW 2: Scrolls Right */}
          <div className="marquee-track scroll-right" style={{ marginTop: '35px' }}>
            <div className="marquee-content">
              {brandsRow2.map((brand, i) => <LogoItem key={i} text={brand} index={i + 6} />)}
            </div>
            <div className="marquee-content">
              {brandsRow2.map((brand, i) => <LogoItem key={`dup-${i}`} text={brand} index={i + 6} />)}
            </div>
          </div>

          {/* ROW 3: Scrolls Left */}
          <div className="marquee-track scroll-left-2" style={{ marginTop: '35px' }}>
            <div className="marquee-content">
              {brandsRow3.map((brand, i) => <LogoItem key={i} text={brand} index={i + 12} />)}
            </div>
            <div className="marquee-content">
              {brandsRow3.map((brand, i) => <LogoItem key={`dup-${i}`} text={brand} index={i + 12} />)}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .marquee-wrapper-mask {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          align-items: center;
          gap: 70px; 
          padding-right: 70px; 
          will-change: transform; 
        }

        .brand-logo-item {
          font-size: 1.5rem;
          color: var(--text-dim); 
          transition: all 0.3s ease;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-logo-item:hover {
          color: var(--text);
          transform: scale(1.1);
        }
        
        .brand-logo-item img {
           max-height: 40px;
           width: auto;
           filter: grayscale(100%) brightness(150%) opacity(0.5); 
           transition: all 0.3s ease;
        }
        .brand-logo-item:hover img {
           filter: grayscale(0%) brightness(100%) opacity(1); 
        }

        .scroll-left-1 .marquee-content {
          animation: scrollLeft 35s linear infinite;
        }

        .scroll-right .marquee-content {
          animation: scrollRight 45s linear infinite -15s; 
        }

        .scroll-left-2 .marquee-content {
          animation: scrollLeft 40s linear infinite -25s; 
        }

        @keyframes scrollLeft {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }

        @keyframes scrollRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0%); }
        }

        @media (max-width: 768px) {
          .marquee-content { gap: 40px; padding-right: 40px; }
          .brand-logo-item { font-size: 1.1rem; }
          .marquee-track { margin-top: 25px !important; }
        }
      `}</style>
    </section>
  )
}