import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Youtube, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

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
  { label: 'Nail the Sale',      href: '/courses/nail-the-sale' },
  { label: 'Corporate Training', href: '/courses/corporate-training' },
]

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 1,
        background: 'linear-gradient(90deg, transparent, var(--red), transparent)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          padding: '64px 0 48px',
        }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 16 }}>
              Ankit <span style={{ color: 'var(--red)' }}>Khare</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: 24, maxWidth: 260 }}>
              Cracking the Code to Sales Psychology & High-Ticket Closures.<br />
              <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Sell Smart • Close Big • Win Always</em>
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

          {/* Quick Links */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {quickLinks.map(link => (
                <a key={link.label} href={link.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 400, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span style={{ color: 'var(--red)', fontSize: '0.7rem' }}>▸</span> {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
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
                    color: 'var(--text-muted)', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-red)'
                    e.currentTarget.style.color = 'var(--red)'
                    e.currentTarget.style.background = 'var(--red-dim)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.background = 'var(--surface)'
                  }}
                >
                  {link.label} <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: MapPin, text: 'Delhi, India' },
                { icon: Phone,  text: '+91 97528 09028',       href: 'tel:+919752809028' },
                { icon: Mail,   text: 'ntswithankit@gmail.com', href: 'mailto:ntswithankit@gmail.com' },
              ].map(({ icon: Icon, text, href }) => (
                <a key={text} href={href || '#'}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
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

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Nail the Sale with Ankit. All Rights Reserved.
          </span>
          <Link to="/admin/login"
            style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-head)', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-muted)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            Admin
          </Link>
        </div>

      </div>
    </footer>
  )
}