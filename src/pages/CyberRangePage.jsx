import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CyberRangePage.css'

gsap.registerPlugin(ScrollTrigger)

const modules = [
  { icon: '⚡', title: 'Smart Grid', desc: 'Simulated power grid with SCADA controllers, substations, and load balancing under attack scenarios.' },
  { icon: '🚦', title: 'Traffic System', desc: 'Connected traffic management infrastructure with signal controllers and vehicle-to-infrastructure communication.' },
  { icon: '📡', title: 'IoT Environment', desc: 'Full IoT ecosystem with edge gateways, sensor networks, and MQTT/CoAP protocol stacks.' },
  { icon: '🚨', title: 'Incident Response', desc: 'Dedicated incident response sandbox with SIEM, forensic tools, and playbook orchestration.' },
  { icon: '🏭', title: 'Industrial Control Systems', desc: 'Emulated ICS/OT environment with PLCs, HMIs, and Modbus/DNP3 protocol simulators.' },
  { icon: '⚔️', title: 'Red/Blue Team Arena', desc: 'Purpose-built adversarial simulation environment with isolated attack and defense networks.' },
]

export default function CyberRangePage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cr-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.from('.cr-banner-img', { scrollTrigger: { trigger: '.cr-banner', start: 'top 85%' }, y: 30, opacity: 0, duration: 0.6 })
      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: (i % 3) * 0.08 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Infrastructure</div>
          <h1 className="section-title cr-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Cyber Range</h1>
          <p className="section-subtitle">The core infrastructure powering our research — a scalable, isolated network simulation for offensive and defensive operations.</p>
        </div>
      </section>

      {/* Banner */}
      <section className="cr-banner">
        <div className="container">
          <div className="cr-banner-wrap">
            <img src="/photos/lab.jpeg" alt="CyberRange Lab" className="cr-banner-img" />
            <div className="cr-banner-overlay">
              <span className="cr-banner-label">LIVE ENVIRONMENT</span>
              <p className="cr-banner-text">Full-scale smart city miniature model with active sensor networks, SCADA controllers, and IoT edge devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Training Modules</div>
          <h2 className="section-title">Simulation Modules</h2>
          <p className="section-subtitle">Six specialized environments for comprehensive cybersecurity training.</p>
          <div className="grid-3">
            {modules.map((m, i) => (
              <div key={i} className="card activity-card">
                <span className="activity-icon">{m.icon}</span>
                <h4 className="activity-title">{m.title}</h4>
                <p className="activity-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom photo */}
      <section className="section">
        <div className="container">
          <img src="/photos/lab.jpeg" alt="Lab Overview" className="cr-bottom-img" />
        </div>
      </section>
    </div>
  )
}
