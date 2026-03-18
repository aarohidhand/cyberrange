import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const dropdownLinks1 = [
  { name: 'Research', path: '/research' },
  { name: 'Publications', path: '/publications' },
  { name: 'Open Source', path: '/opensource' },
]


const dropdownLinks2 = [
  { name: 'Our Services', path: '/services' },
  { name: 'Training Programs', path: '/training' },
]

// Order in navbar:
// Home, Cyberange, Events, Services & Training, Research & Resources, Team, Collaborations
const navItems = [
  { type: 'link', name: 'Home', path: '/' },
  { type: 'link', name: 'Cyberange', path: '/cyberange' },
  { type: 'link', name: 'Events', path: '/events' },
  { type: 'menu', name: 'Services & Training', items: dropdownLinks2 },
  { type: 'menu', name: 'Research & Resources', items: dropdownLinks1 },
  { type: 'link', name: 'Team', path: '/team' },
  { type: 'link', name: 'Collaborations', path: '/collaborators' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    // On non-home pages, keep navbar in \"scrolled\" state always.
    if (location.pathname !== '/') {
      setScrolled(true)
      return
    }

    const onScroll = () => {
      const aboutSection = document.querySelector('.about-section')
      const triggerY = aboutSection
        ? aboutSection.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70)
        : window.innerHeight * 0.7
      setScrolled(window.scrollY >= triggerY)
    }

    window.addEventListener('scroll', onScroll)
    // run once on mount to set initial state on home
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <Link to="/" className="navbar__brand">
            <img src="/photos/logo.png" alt="MUJ-Cyberange" className="navbar__logo" />
            <div className="navbar__brand-text">
              <span className="navbar__brand-name">MUJ-Cyberange</span>
              <span className="navbar__brand-sub">Cyber Security Lab</span>
            </div>
          </Link>

          <nav className="navbar__nav">
            {navItems.map(item => {
              if (item.type === 'menu') {
                return (
                  <div key={item.name} className="navbar__dropdown">
                    <button className="navbar__link navbar__dropdown-trigger" type="button">
                      {item.name}
                      <span className="navbar__caret" aria-hidden="true">▾</span>
                    </button>
                    <div className="navbar__dropdown-panel">
                      {item.items.map(sub => (
                        <Link key={sub.name} to={sub.path} className="navbar__dropdown-link">
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              const isActive = location.pathname === item.path
              return (
                <Link key={item.name} to={item.path} className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}>
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <Link to="/apply" className="btn btn-primary navbar__contact-btn">Apply Now</Link>

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
            {navItems.map(item => {
              if (item.type === 'menu') {
                return (
                  <div key={item.name} className="mobile-menu__group">
                    <div className="mobile-menu__group-title">{item.name}</div>
                    {item.items.map(sub => (
                      <Link key={sub.name} to={sub.path} className="mobile-menu__link mobile-menu__sublink">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )
              }

              const isActive = location.pathname === item.path
              return (
                <Link key={item.name} to={item.path} className={`mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`}>
                  {item.name}
                </Link>
              )
            })}

            <Link to="/apply" className="btn btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>Apply Now</Link>
          </nav>
        </div>
      </div>
    </>
  )
}
