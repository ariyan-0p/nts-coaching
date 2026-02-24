import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Youtube, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const socials = [
  { icon: Linkedin,  href: 'https://www.linkedin.com/company/nail-thesale/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/nail_thesale/',        label: 'Instagram' },
  { icon: Facebook,  href: 'https://www.facebook.com/people/Nail-the-Sale-with-Ankit/61576911484081/', label: 'Facebook' },
  { icon: Youtube,   href: 'https://www.youtube.com/channel/UC5ArEQ8ZPw77_4oJ2HU13Zw', label: 'YouTube' },
]

const quickLinks = [
  { label: 'About',        href: '/#about' },
  { label: 'Services',     href: '/#services' },
  { label: 'Courses',      href: '/#courses' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ',          href: '/#faq' },
  { label: 'Contact',      href: '/#contact' },
]

const courseLinks = [
  { label: 'Sales Mastery', href: '/courses/sales-mastery' },
  { label: 'FMP Program',   href: '/courses/fmp' },
]

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const logoSrc = isDark
    ? '/assets/nts-logo-white.png'
    : '/assets/nts-logo-dark.png'

  return (
    <footer style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Decorative Top Glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          padding: '64px 0 48px',
        }}>

          {/* Column 1: Brand & Logo */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-block', marginBottom: 20 }}>
              <img 
                key={logoSrc} 
                src={logoSrc} 
                alt="NTS Logo" 
                style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
              />
            </Link>
            
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 24, maxWidth: 260 }}>
              Cracking the Code to Sales Psychology & High-Ticket Closures.<br />
              <em style={{ color: 'var(--red)', fontStyle: 'italic', fontWeight: 600 }}>Sell Smart • Close Big • Win Always</em>
            </p>
            
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    color: 'var(--text-muted)', transition: 'all 0.2s',
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--red-dim)'
                    e.currentTarget.style.borderColor = 'var(--border-red)'
                    e.currentTarget.style.color = 'var(--red)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quickLinks.map(link => (
                <a key={link.label} href={link.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span style={{ color: 'var(--red)', fontSize: '0.7rem' }}>▸</span> {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Courses */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Courses</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {courseLinks.map(link => (
                <Link key={link.label} to={link.href}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    fontSize: '0.85rem', fontFamily: 'var(--font-head)', fontWeight: 700,
                    letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', transition: 'all 0.2s', textDecoration: 'none'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--surface-2)'
                    e.currentTarget.style.borderColor = 'var(--red)'
                    e.currentTarget.style.color = 'var(--text)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--surface)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  {link.label} <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: MapPin, text: 'Delhi, India' },
                { icon: Phone,  text: '+91 97528 09028',       href: 'tel:+919752809028' },
                { icon: Mail,   text: 'ntswithankit@gmail.com', href: 'mailto:ntswithankit@gmail.com' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href || '#'}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  <div style={{
                    width: 30, height: 30, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--red-dim)', border: '1px solid var(--border-red)',
                  }}>
                    <Icon size={13} color="var(--red)" />
                  </div>
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── UPDATED BOTTOM BAR (Fully Centered) ── */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',     // Stacks items vertically
          alignItems: 'center',        // Centers items horizontally
          justifyContent: 'center',
          gap: 10,                     // Spacing between copyright and your name
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Nail the Sale with Ankit. All Rights Reserved.
          </span>
          
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>
            Powered by <a 
              href="https://ariyan-0p.github.io/Ariyan-portlio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--red)', fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.8}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              Ariyan Samal
            </a>
          </span>
        </div>
        {/* ─────────────────────────────────────── */}

      </div>
    </footer>
  )
}