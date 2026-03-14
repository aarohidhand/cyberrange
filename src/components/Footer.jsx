import { Link } from 'react-router-dom'
import './Footer.css'

const footerNav = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Research', path: '/research' },
  { name: 'Cyber Range', path: '/cyberrange' },
  { name: 'People', path: '/people' },
]

const footerEngage = [
  { name: 'Opportunities', path: '/opportunities' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
]

const footerResources = [
  { name: 'Publications', path: '/publications' },
  { name: 'Open Source', path: '/opensource' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="footer__logo-link">
            <img src="/photos/logo.png" alt="MUJ-ISAC" className="footer__logo" />
          </Link>
          <span className="footer__tagline">MUJ-ISAC Cyber Range Lab</span>
          <p className="footer__desc">
            Pioneering smart city cybersecurity through cutting-edge research, immersive training, and global collaboration.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Navigation</h4>
          {footerNav.map(l => <Link key={l.name} to={l.path} className="footer__link">{l.name}</Link>)}
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Engage</h4>
          {footerEngage.map(l => <Link key={l.name} to={l.path} className="footer__link">{l.name}</Link>)}
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Resources</h4>
          {footerResources.map(l => <Link key={l.name} to={l.path} className="footer__link">{l.name}</Link>)}
        </div>
      </div>

      <div className="container footer__bottom">
        <span className="footer__copy">© {new Date().getFullYear()} MUJ-ISAC Cyber Range Lab</span>
        <span className="footer__motto">INSPIRED BY LIFE · SECURED BY RESEARCH</span>
      </div>
    </footer>
  )
}
