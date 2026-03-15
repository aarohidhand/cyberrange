import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CollaboratorsPage.css'

gsap.registerPlugin(ScrollTrigger)

// Global Research Collaborations — institution logos/cards
const researchCollabs = [
  { name: 'ETH Zurich', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'Norwegian University of Science and Technology', flag: '🇳🇴', country: 'Norway' },
  { name: 'University of Lausanne', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'ZHAW Zurich University of Applied Sciences', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'Technische Hochschule Mittelhessen', flag: '🇩🇪', country: 'Germany' },
  { name: 'Indian Institute of Technology (BHU) Varanasi', flag: '🇮🇳', country: 'India' },
  { name: 'Indian Institute of Information Technology Allahabad', flag: '🇮🇳', country: 'India' },
  { name: 'National Institute of Technology Jalandhar', flag: '🇮🇳', country: 'India' },
  { name: 'Indian Institute of Information Technology Raipur', flag: '🇮🇳', country: 'India' },
  { name: 'C3I Hub, IIT Kanpur', flag: '🇮🇳', country: 'India' },
]

// Industry mentors (same as on Home)
const industryMentors = [
  { name: 'Atul Kumar', role: 'Security Architect', initials: 'AK' },
  { name: 'Vaibhav Shukla', role: 'Threat Intelligence Lead', initials: 'VS' },
  { name: 'Dr. Amandeep Kapoor', role: 'CISO & Advisor', initials: 'AK' },
  { name: 'Siddharth Simharaju', role: 'Red Team Specialist', initials: 'SS' },
  { name: 'Sai Rakshit', role: 'SOC Operations Lead', initials: 'SR' },
  { name: 'Aseem Shrey', role: 'AppSec Engineer', initials: 'AS' },
]

export default function CollaboratorsPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collab-page-hero', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.utils.toArray('.collab-section-title').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -30, opacity: 0, duration: 0.5 })
      })
      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: (i % 6) * 0.06 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section collab-hero-section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Collaborators</div>
          <h1 className="section-title collab-page-hero" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Collaborators</h1>
          <p className="section-subtitle">
            Our research partners and industry mentors who help drive cybersecurity innovation and training at the lab.
          </p>
        </div>
      </section>

      {/* Research Collaborations */}
      <section className="section">
        <div className="container">
          <h2 className="collab-section-title">Research Collaborations</h2>
          <p className="section-subtitle" style={{ marginBottom: 32 }}>
            Partnering with leading institutions worldwide to advance cybersecurity research and education.
          </p>
          <div className="container"><div className="section-divider" style={{ marginBottom: 32 }} /></div>
          <div className="grid-5">
            {researchCollabs.map((c, i) => (
              <div key={i} className="card collab-card">
                <span className="collab-flag">{c.flag}</span>
                <h4 className="collab-name">{c.name}</h4>
                <span className="collab-country">{c.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* Industry Mentors */}
      <section className="section">
        <div className="container">
          <h2 className="collab-section-title">Industry Mentors</h2>
          <p className="section-subtitle" style={{ marginBottom: 32 }}>
            Mentors from leading cybersecurity organizations bringing real-world experience to the lab.
          </p>
          <div className="container"><div className="section-divider" style={{ marginBottom: 32 }} /></div>
          <div className="grid-3">
            {industryMentors.map((m, i) => (
              <div key={i} className="card mentor-card">
                <div className="avatar">{m.initials}</div>
                <div>
                  <h4 className="mentor-name">{m.name}</h4>
                  <span className="mentor-role">{m.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
