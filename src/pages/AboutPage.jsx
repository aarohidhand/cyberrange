import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TerminalBlock from '../components/TerminalBlock'
import './AboutPage.css'

gsap.registerPlugin(ScrollTrigger)

const whyCards = [
  { icon: '🌐', title: 'Expanding Attack Surface', desc: 'Digitized cities create millions of new entry points for adversaries across IoT, SCADA, and cloud infrastructure.' },
  { icon: '⚡', title: 'Critical Dependencies', desc: 'Power grids, water systems, and transport networks depend on interconnected digital systems vulnerable to cascading failures.' },
  { icon: '🛡️', title: 'National Security', desc: 'Smart city infrastructure is a prime target for nation-state actors and advanced persistent threat groups.' },
  { icon: '👥', title: 'Public Safety', desc: 'Cyber attacks on urban infrastructure directly impact the safety and well-being of millions of citizens.' },
]

export default function AboutPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section-label').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -30, opacity: 0, duration: 0.5 })
      })
      gsap.utils.toArray('.section-title').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 40, opacity: 0, duration: 0.6 })
      })
      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: (i % 4) * 0.08 })
      })
      gsap.utils.toArray('.section-divider').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, scaleX: 0, duration: 0.6 })
      })
      gsap.from('.about-platform-img', { scrollTrigger: { trigger: '.about-platform', start: 'top 80%' }, x: -50, opacity: 0, duration: 0.6 })
      gsap.from('.about-platform-terminal', { scrollTrigger: { trigger: '.about-platform', start: 'top 80%' }, x: 50, opacity: 0, duration: 0.6 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      {/* Hero */}
      <section className="section about-hero">
        <div className="container">
          <div className="section-label">// About</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>MUJ-Cyberange<br />Cyberange Lab</h1>
          <p className="section-subtitle">Inspired by Life · Secured by Research</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="card mission-card">
              <div className="section-label">// Mission</div>
              <h3 className="section-title" style={{ fontSize: 24 }}>Our Mission</h3>
              <p className="about-text">To pioneer zero-trust architecture and defensive protocols for the next generation of smart city infrastructure, training the cybersecurity leaders of tomorrow through immersive, real-world simulations.</p>
            </div>
            <div className="card mission-card">
              <div className="section-label">// Vision</div>
              <h3 className="section-title" style={{ fontSize: 24 }}>Our Vision</h3>
              <p className="about-text">A world where interconnected urban environments operate with absolute resilience against cyber threats, powered by cutting-edge research and a globally connected community of defenders.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* Why Smart City Security */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Smart City Security</div>
          <h2 className="section-title">Why Smart City Security Matters</h2>
          <p className="section-subtitle">As urban centers become fully digitized, securing critical infrastructure is a matter of public safety.</p>
          <div className="grid-4">
            {whyCards.map((c, i) => (
              <div key={i} className="card activity-card">
                <span className="activity-icon">{c.icon}</span>
                <h4 className="activity-title">{c.title}</h4>
                <p className="activity-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* Platform + Terminal */}
      <section className="section about-platform">
        <div className="container">
          <div className="section-label">// The Platform</div>
          <h2 className="section-title">The Cyberange Cyberange Platform</h2>
          <p className="section-subtitle">A comprehensive, highly scalable simulation environment mirroring real-world industrial control systems and IoT networks.</p>
          <div className="about-platform-grid">
            <div className="about-platform-img">
              <img src="/photos/lab.png" alt="Cyberange Platform" style={{ width: '100%', borderRadius: 12 }} />
            </div>
            <div className="about-platform-terminal">
              <TerminalBlock />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
