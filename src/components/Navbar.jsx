import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
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
  { label: 'Testimonials', href: '/#testimonials', type: 'anchor' },
  { label: 'FAQ',          href: '/#faq',          type: 'anchor' },
  { label: 'Contact',      href: '/#contact',      type: 'anchor' },
]

// ── Inline Theme Toggle Switch ──────────────────────────────
function ThemeSwitch({ theme, toggleTheme }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="theme-switch"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Sun icon */}
      <svg className="theme-switch__icon theme-switch__icon--sun" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>

      {/* Track */}
      <div className={`theme-switch__track ${isDark ? 'theme-switch__track--dark' : ''}`}>
        <div className={`theme-switch__thumb ${isDark ? 'theme-switch__thumb--dark' : ''}`} />
      </div>

      {/* Moon icon */}
      <svg className="theme-switch__icon theme-switch__icon--moon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </button>
  )
}

// ── Main Navbar ─────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown]     = useState(false)
  const location  = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

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

  // Logo: dark mode → white logo, light mode → dark logo
  const logoSrc = isDark
    ? '/assets/nts-logo-white.png'
    : '/assets/nts-logo-dark.png'

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo-link">
            <img
              key={logoSrc}           /* key forces re-render on theme change */
              src={logoSrc}
              alt="NTS Logo"
              className="navbar__logo"
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="desktop-nav navbar__links">
            {navLinks.map(link => (
              link.type === 'dropdown' ? (
                <div key={link.label} className="navbar__dropdown-wrap"
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <button className="navbar__link navbar__link--btn">
                    {link.label} <ChevronDown size={13} className={`navbar__chevron ${dropdown ? 'navbar__chevron--open' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        className="navbar__dropdown"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                      >
                        {link.children.map(child => (
                          <Link key={child.label} to={child.href} className="navbar__dropdown-item">
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
                  className="navbar__link"
                  onClick={link.type === 'anchor' ? (e) => { e.preventDefault(); handleAnchorClick(link.href) } : undefined}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* ── Right Side ── */}
          <div className="navbar__right">
            {/* Theme Toggle — always visible (desktop + mobile top bar) */}
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />

            {/* CTA — desktop only */}
            <a
              href="/#contact"
              onClick={e => { e.preventDefault(); handleAnchorClick('/#contact') }}
              className="desktop-cta navbar__cta"
            >
              Book a Session
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              className="hamburger navbar__hamburger"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top bar with close button */}
            <div className="mobile-menu__topbar">
              <span className="mobile-menu__topbar-title">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="mobile-menu__close">
                <X size={24} />
              </button>
            </div>

            <div className="mobile-menu__body">
              {navLinks.map((link, i) => (
                link.type === 'dropdown' ? (
                  <div key={link.label} className="mobile-menu__group">
                    <div className="mobile-menu__group-label">{link.label}</div>
                    {link.children.map(child => (
                      <Link key={child.label} to={child.href} className="mobile-menu__sub-link">
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                ) : link.type === 'route' ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="mobile-menu__link"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <motion.a key={link.label}
                    href={link.href}
                    className="mobile-menu__link"
                    onClick={(e) => { e.preventDefault(); handleAnchorClick(link.href) }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                )
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mobile-menu__footer">
              <a href="/#contact"
                onClick={e => { e.preventDefault(); handleAnchorClick('/#contact') }}
                className="mobile-menu__cta"
              >
                Book a Session
              </a>
              <div className="mobile-menu__socials">
                <span className="mobile-menu__follow">Follow</span>
                {[
                  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/nail-thesale/' },
                  { label: 'Instagram', href: 'https://www.instagram.com/nail_thesale/' },
                  { label: 'Facebook',  href: 'https://www.facebook.com/people/Nail-the-Sale-with-Ankit/61576911484081/' },
                  { label: 'YouTube',   href: 'https://www.youtube.com/channel/UC5ArEQ8ZPw77_4oJ2HU13Zw' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="mobile-menu__social-link">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          STYLES
         ══════════════════════════════════════════════════════ */}
      <style>{`

        /* ── Navbar shell ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          border-bottom: 1px solid transparent;
          background: transparent;
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
        }
        .navbar--scrolled {
          border-bottom-color: var(--border);
          background: var(--nav-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Logo ── */
        .navbar__logo-link {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .navbar__logo {
          height: 62px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: opacity 0.2s;
        }
        .navbar__logo:hover { opacity: 0.85; }

        /* ── Nav links ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar__link {
          padding: 8px 14px;
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .navbar__link:hover { color: var(--text); }
        .navbar__link--btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .navbar__chevron {
          transition: transform 0.2s;
        }
        .navbar__chevron--open {
          transform: rotate(180deg);
        }

        /* ── Dropdown ── */
        .navbar__dropdown-wrap {
          position: relative;
        }
        .navbar__dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--bg-2);
          border: 1px solid var(--border);
          min-width: 250px;
          padding: 8px 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        }
        .navbar__dropdown-item {
          display: block;
          padding: 10px 18px;
          font-family: var(--font-head);
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          border-left: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .navbar__dropdown-item:hover {
          color: var(--text);
          border-left-color: var(--red);
          background: var(--red-dim);
        }

        /* ── Right side ── */
        .navbar__right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* ── CTA button ── */
        .navbar__cta {
          display: inline-flex;
          align-items: center;
          padding: 10px 22px;
          background: var(--red);
          color: #fff;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s, transform 0.2s;
        }
        .navbar__cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ── Hamburger ── */
        .navbar__hamburger {
          color: var(--text);
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          display: none;
        }

        /* ══════════════════════════════════════
            THEME TOGGLE SWITCH
           ══════════════════════════════════════ */
        .theme-switch {
          display: flex;
          align-items: center;
          gap: 7px;
          background: none;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 5px 10px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }
        .theme-switch:hover {
          border-color: var(--red);
          background: var(--red-dim);
        }
        .theme-switch__icon {
          color: var(--text-muted);
          flex-shrink: 0;
          transition: color 0.2s;
        }
        .theme-switch:hover .theme-switch__icon {
          color: var(--red);
        }

        /* Track */
        .theme-switch__track {
          width: 32px;
          height: 17px;
          border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--border);
          position: relative;
          transition: background 0.25s;
          flex-shrink: 0;
        }
        .theme-switch__track--dark {
          background: var(--red);
          border-color: var(--red);
        }

        /* Thumb */
        .theme-switch__thumb {
          position: absolute;
          top: 50%;
          left: 2px;
          transform: translateY(-50%);
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--text-muted);
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s;
        }
        .theme-switch__thumb--dark {
          transform: translate(15px, -50%);
          background: #fff;
        }

        /* ══════════════════════════════════════
            MOBILE MENU
           ══════════════════════════════════════ */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        /* Top bar: title + close */
        .mobile-menu__topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 68px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .mobile-menu__topbar-title {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .mobile-menu__close {
          color: var(--text);
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .mobile-menu__body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 16px 28px 24px;
          overflow-y: auto;
        }
        .mobile-menu__links {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }
        .mobile-menu__link {
          display: block;
          padding: 14px 0;
          font-family: var(--font-head);
          font-weight: 800;
          font-size: 1.55rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--text);
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
        }
        .mobile-menu__link:hover {
          color: var(--red);
          padding-left: 8px;
        }
        .mobile-menu__group {
          padding: 16px 0 8px;
          border-bottom: 1px solid var(--border);
        }
        .mobile-menu__group-label {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .mobile-menu__sub-link {
          display: block;
          padding: 10px 14px;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          border-left: 2px solid var(--border-red);
          margin-bottom: 4px;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .mobile-menu__sub-link:hover {
          color: var(--red);
          border-left-color: var(--red);
        }
        .mobile-menu__footer {
          margin-top: 32px;
        }
        .mobile-menu__cta {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 14px 24px;
          background: var(--red);
          color: #fff;
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          transition: opacity 0.2s;
        }
        .mobile-menu__cta:hover { opacity: 0.88; }
        .mobile-menu__socials {
          margin-top: 24px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }
        .mobile-menu__follow {
          font-family: var(--font-head);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          color: var(--text-dim);
          text-transform: uppercase;
        }
        .mobile-menu__social-link {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .mobile-menu__social-link:hover { color: var(--red); }

        /* ══════════════════════════════════════
            RESPONSIVE BREAKPOINTS
           ══════════════════════════════════════ */
        @media (min-width: 1024px) {
          .navbar__hamburger { display: none !important; }
          .desktop-nav       { display: flex !important; }
          .desktop-cta       { display: inline-flex !important; }
          .desktop-theme-toggle { display: block !important; }
        }
        @media (max-width: 1023px) {
          .desktop-nav          { display: none !important; }
          .desktop-cta          { display: none !important; }
          .desktop-theme-toggle { display: none !important; }
          .navbar__hamburger    { display: flex !important; }
          .navbar__inner        { padding: 0 20px; }
        }
        @media (max-width: 480px) {
          .mobile-menu__link { font-size: 1.25rem; }
          .mobile-menu { padding: 72px 20px 28px; }
        }

      `}</style>
    </>
  )
}