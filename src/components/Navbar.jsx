import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Research', path: '/research' },
  { name: 'Cyberange', path: '/cyberrange' },
  { name: 'Team', path: '/team' },
  { name: 'Collaborators', path: '/collaborators' },
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'Events', path: '/events' },
  { name: 'Publications', path: '/publications' },
  { name: 'Open Source', path: '/opensource' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__brand">
            <img src="/photos/logo.png" alt="MUJ-Cyberange" className="navbar__logo" />
            <div className="navbar__brand-text">
              <span className="navbar__brand-name">MUJ-Cyberange</span>
              <span className="navbar__brand-sub">Cyberange Lab</span>
            </div>
          </Link>

          <nav className="navbar__nav">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link key={link.name} to={link.path} className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                  {link.name}
                </Link>
              )
            })}
            <Link to="/contact" className="btn btn-primary navbar__contact-btn">Get in Contact</Link>
          </nav>

          <button className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu__panel">
          <nav className="mobile-menu__nav">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path
              return (
                <Link key={link.name} to={link.path} className={`mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`}>
                  {link.name}
                </Link>
              )
            })}
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>Get in Contact</Link>
          </nav>
        </div>
      </div>
    </>
  )
}
