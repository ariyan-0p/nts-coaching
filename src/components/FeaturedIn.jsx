import { useInView } from 'react-intersection-observer'

// All logos based on the uploaded assets
const row1Logos = [
  { src: '/assets/The_Times_of_India_Logo_full.png', alt: 'The Times of India' },
  { src: '/assets/Hindustan_Times_logo.svg.png', alt: 'Hindustan Times' },
  { src: '/assets/The_Economic_Times_logo.png', alt: 'The Economic Times' },
  { src: '/assets/ANI.png.webp', alt: 'ANI News' }, 
  // Repeated to make the marquee loop smooth
  { src: '/assets/The_Times_of_India_Logo_full.png', alt: 'The Times of India' },
  { src: '/assets/Hindustan_Times_logo.svg.png', alt: 'Hindustan Times' },
  { src: '/assets/The_Economic_Times_logo.png', alt: 'The Economic Times' },
  { src: '/assets/ANI.png.webp', alt: 'ANI News' }, 
]

const row2Logos = [
  { src: '/assets/Dainik_Bhaskar_Logo.png', alt: 'Dainik Bhaskar' }, 
  { src: '/assets/amar ujala.png', alt: 'Amar Ujala' },
  { src: '/assets/Dainik_Jagran_logo.png', alt: 'Dainik Jagran' }, 
  { src: '/assets/daily-Hunt-Logo.png', alt: 'Daily Hunt' },
  // Repeated
  { src: '/assets/Dainik_Bhaskar_Logo.png', alt: 'Dainik Bhaskar' }, 
  { src: '/assets/amar ujala.png', alt: 'Amar Ujala' },
  { src: '/assets/Dainik_Jagran_logo.png', alt: 'Dainik Jagran' }, 
  { src: '/assets/daily-Hunt-Logo.png', alt: 'Daily Hunt' },
]

const row3Logos = [
  { src: '/assets/DNA_Newspaper_Logo.svg.png', alt: 'DNA Newspaper' },
  { src: '/assets/wire news.png', alt: 'The Wire' }, 
  { src: '/assets/images.jpg', alt: 'News Outlet' },
  { src: '/assets/The_Times_of_India_Logo_full.png', alt: 'The Times of India' }, 
  // Repeated
  { src: '/assets/DNA_Newspaper_Logo.svg.png', alt: 'DNA Newspaper' },
  { src: '/assets/wire news.png', alt: 'The Wire' }, 
  { src: '/assets/images.jpg', alt: 'News Outlet' },
  { src: '/assets/The_Times_of_India_Logo_full.png', alt: 'The Times of India' },
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
        
        {/* The Section Heading - UPDATED HERE */}
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
          
          {/* ROW 1: Scrolls Left */}
          <div className="marquee-track scroll-left-1">
            <div className="marquee-content">
              {row1Logos.map((logo, i) => <LogoItem key={`r1-1-${i}`} logo={logo} />)}
            </div>
            <div className="marquee-content">
              {row1Logos.map((logo, i) => <LogoItem key={`r1-2-${i}`} logo={logo} />)}
            </div>
          </div>

          {/* ROW 2: Scrolls Right */}
          <div className="marquee-track scroll-right" style={{ marginTop: '35px' }}>
            <div className="marquee-content">
              {row2Logos.map((logo, i) => <LogoItem key={`r2-1-${i}`} logo={logo} />)}
            </div>
            <div className="marquee-content">
              {row2Logos.map((logo, i) => <LogoItem key={`r2-2-${i}`} logo={logo} />)}
            </div>
          </div>

          {/* ROW 3: Scrolls Left */}
          <div className="marquee-track scroll-left-2" style={{ marginTop: '35px' }}>
            <div className="marquee-content">
              {row3Logos.map((logo, i) => <LogoItem key={`r3-1-${i}`} logo={logo} />)}
            </div>
            <div className="marquee-content">
              {row3Logos.map((logo, i) => <LogoItem key={`r3-2-${i}`} logo={logo} />)}
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
          .marquee-track { margin-top: 25px !important; }
        }
      `}</style>
    </section>
  )
}