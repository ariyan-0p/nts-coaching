import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Home',         href: '/',              type: 'route' },
  { label: 'About',        href: '/#about',        type: 'anchor' },
  { label: 'Services',     href: '/#services',     type: 'anchor' },
  {
    label: 'Courses', href: '#', type: 'dropdown',
    children: [
      { label: 'Financial Market Professional', href: '/courses/fmp' },
      { label: 'Sales Mastery Program',         href: '/courses/sales-mastery' },
    ]
  },
  { label: 'Gallery',      href: '/#gallery',      type: 'anchor' },
  { label: 'Testimonials', href: '/#testimonials', type: 'anchor' },
  { label: 'FAQ',          href: '/#faq',          type: 'anchor' },
  { label: 'Contact',      href: '/#contact',      type: 'anchor' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown]     = useState(false)
  const location  = useLocation()
  const { theme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const handleAnchorClick = (href) => {
    setMobileOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68, maxWidth: 1400, margin: '0 auto', padding: '0 40px'
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/assets/nts-logo.png"
              alt="NTS Logo"
              style={{ height: 42, width: 'auto', objectFit: 'contain' }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map(link => (
              link.type === 'dropdown' ? (
                <div key={link.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 14px',
                    fontFamily: 'var(--font-head)', fontWeight: 600,
                    fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', background: 'none', border: 'none',
                    cursor: 'pointer', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {link.label} <ChevronDown size={13} />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute', top: '100%', left: 0,
                          background: 'var(--bg-2)',
                          border: '1px solid var(--border)',
                          minWidth: 240, padding: '8px 0',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        }}
                      >
                        {link.children.map(child => (
                          <Link key={child.label} to={child.href}
                            style={{
                              display: 'block', padding: '10px 18px',
                              fontFamily: 'var(--font-head)', fontWeight: 600,
                              fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                              color: 'var(--text-muted)', transition: 'all 0.2s',
                              borderLeft: '2px solid transparent',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = 'var(--text)'
                              e.currentTarget.style.borderLeftColor = 'var(--red)'
                              e.currentTarget.style.background = 'var(--red-dim)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color = 'var(--text-muted)'
                              e.currentTarget.style.borderLeftColor = 'transparent'
                              e.currentTarget.style.background = 'none'
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a key={link.label}
                  href={link.href}
                  onClick={link.type === 'anchor' ? (e) => { e.preventDefault(); handleAnchorClick(link.href) } : undefined}
                  style={{
                    padding: '8px 14px',
                    fontFamily: 'var(--font-head)', fontWeight: 600,
                    fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--text-muted)', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Right side: Theme Toggle + CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

            {/* Theme toggle — desktop only */}
            <div className="desktop-theme-toggle">
              <ThemeToggle />
            </div>

            <a
              href="/#contact"
              onClick={e => { e.preventDefault(); handleAnchorClick('/#contact') }}
              className="desktop-cta btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 24px',
                background: 'var(--red)',
                color: '#fff',
                fontFamily: 'var(--font-head)',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
              }}
            >
              Book a Session
            </a>

            <button
              onClick={() => setMobileOpen(p => !p)}
              className="hamburger"
              style={{ color: 'var(--text)', padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'var(--bg)',
              display: 'flex', flexDirection: 'column',
              padding: '80px 24px 32px',
              overflowY: 'auto',
            }}
          >
            <button onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, color: 'var(--text)', padding: 6, background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>

            {/* Theme toggle at top of mobile menu */}
            <div style={{ marginBottom: 28 }}>
              <ThemeToggle />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              {navLinks.map((link, i) => (
                link.type === 'dropdown' ? (
                  <div key={link.label}>
                    <div style={{
                      fontFamily: 'var(--font-head)', fontWeight: 700,
                      fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: 'var(--red)', padding: '20px 0 8px',
                    }}>
                      {link.label}
                    </div>
                    {link.children.map(child => (
                      <Link key={child.label} to={child.href}
                        style={{
                          display: 'block', padding: '12px 16px',
                          fontFamily: 'var(--font-head)', fontWeight: 700,
                          fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase',
                          color: 'var(--text-muted)',
                          borderLeft: '2px solid var(--border-red)',
                          marginBottom: 4, textDecoration: 'none',
                        }}
                      >
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <motion.a key={link.label}
                    href={link.href}
                    onClick={link.type === 'anchor' ? (e) => { e.preventDefault(); handleAnchorClick(link.href) } : undefined}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: 'block', padding: '14px 0',
                      fontFamily: 'var(--font-head)', fontWeight: 800,
                      fontSize: '1.6rem', letterSpacing: '0.02em', textTransform: 'uppercase',
                      color: 'var(--text)',
                      borderBottom: '1px solid var(--border)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </motion.a>
                )
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <a href="/#contact"
                onClick={e => { e.preventDefault(); handleAnchorClick('/#contact') }}
                style={{
                  width: '100%', justifyContent: 'center', fontSize: '1rem',
                  display: 'flex', padding: '14px 24px',
                  background: 'var(--red)', color: '#fff',
                  fontFamily: 'var(--font-head)', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                }}
              >
                Book a Session
              </a>
              <div style={{ marginTop: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Follow</span>
                {[
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/nail-thesale/' },
                  { label: 'Instagram', href: 'https://www.instagram.com/nail_thesale/' },
                  { label: 'YouTube',   href: 'https://www.youtube.com/channel/UC5ArEQ8ZPw77_4oJ2HU13Zw' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 1024px) {
          .hamburger { display: none !important; }
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .desktop-theme-toggle { display: block !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .desktop-theme-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}