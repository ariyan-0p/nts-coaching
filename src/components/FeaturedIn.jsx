import { useInView } from 'react-intersection-observer'

// Combined all unique logos into a single array
const allLogos = [
  { src: '/assets/The_Times_of_India_Logo_full.png', alt: 'The Times of India' },
  { src: '/assets/Hindustan_Times_logo.svg.png', alt: 'Hindustan Times' },
  { src: '/assets/The_Economic_Times_logo.jpg', alt: 'The Economic Times' },
  { src: '/assets/ANI.png.webp', alt: 'ANI News' }, 
  { src: '/assets/Dainik_Bhaskar_Logo.jpg', alt: 'Dainik Bhaskar' }, 
  { src: '/assets/amar ujala.png', alt: 'Amar Ujala' },
  { src: '/assets/Dainik_Jagran_logo.png', alt: 'Dainik Jagran' }, 
  { src: '/assets/daily-Hunt-Logo.png', alt: 'Daily Hunt' },
  { src: '/assets/DNA_Newspaper_Logo.svg.png', alt: 'DNA Newspaper' },
  { src: '/assets/wire news.png', alt: 'The Wire' }, 
  { src: '/assets/images.jpg', alt: 'News Outlet' }
]

const LogoItem = ({ logo }) => (
  <div className="brand-logo-item">
    <img src={logo.src} alt={logo.alt} title={logo.alt} />
  </div>
)

export default function FeaturedIn() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section ref={ref} style={{ padding: '60px 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="container-fluid" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease' }}>
        
        <h3 style={{ 
          textAlign: 'center', 
          fontFamily: 'var(--font-head)', 
          fontSize: '1.5rem', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          color: 'var(--red)',
          marginBottom: '50px',
          fontWeight: 900
        }}>
          As Featured In
        </h3>

        <div className="marquee-wrapper-mask">
          
          {/* SINGLE ROW: Scrolls Left */}
          <div className="marquee-track scroll-left">
            <div className="marquee-content">
              {allLogos.map((logo, i) => <LogoItem key={`logo-1-${i}`} logo={logo} />)}
            </div>
            {/* Duplicated for seamless loop */}
            <div className="marquee-content">
              {allLogos.map((logo, i) => <LogoItem key={`logo-2-${i}`} logo={logo} />)}
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
          flex-shrink: 0;
          min-width: 100%;
          justify-content: space-around;
        }

        .brand-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
          flex-shrink: 0;
        }

        .brand-logo-item:hover {
          transform: scale(1.1);
        }
        
        .brand-logo-item img {
           max-height: 40px;
           width: auto;
           transition: all 0.3s ease;
           object-fit: contain;
        }

        /* Adjusted animation duration to account for the longer list of logos */
        .scroll-left .marquee-content {
          animation: scrollLeft 40s linear infinite;
        }

        @keyframes scrollLeft {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }

        @media (max-width: 768px) {
          .marquee-content { gap: 40px; padding-right: 40px; }
        }
      `}</style>
    </section>
  )
}