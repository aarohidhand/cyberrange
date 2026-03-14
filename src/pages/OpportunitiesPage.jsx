import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OpportunitiesPage.css'

gsap.registerPlugin(ScrollTrigger)

const tracks = [
  { title: 'Research Track', desc: 'For students focused on theoretical vulnerability analysis, cryptographic implementations, and publishing academic papers.', perks: ['Publish at IEEE/ACM conferences', 'Faculty mentorship', 'Access to research datasets', 'Thesis collaboration', 'Conference travel support'] },
  { title: 'Industry Track', desc: 'Hands-on experience with enterprise tools, SOC operations, and preparation for industry certifications (OSCP, CISSP).', perks: ['Enterprise tool access', 'SOC rotation program', 'Certification prep courses', 'Industry mentor pairing', 'Internship pathways'] },
  { title: 'Innovation Track', desc: 'For developers building the next generation of open-source security tools and defensive architectures.', perks: ['Build real products', 'Open source contributions', 'Startup mentorship', 'Hackathon funding', 'Patent support'] },
  { title: 'Leadership Track', desc: 'Managing teams, orchestrating red/blue team exercises, and leading cyber defense competitions.', perks: ['Lead CTF teams', 'Event management', 'Workshop facilitation', 'Community building', 'Professional networking'] },
]

const steps = [
  { num: '01', title: 'Apply Online', desc: 'Submit your application through the contact form with your resume and statement of interest.' },
  { num: '02', title: 'Skill Assessment', desc: 'Complete a hands-on technical challenge designed to evaluate your current capabilities.' },
  { num: '03', title: 'Interview', desc: 'Meet with faculty and mentors to discuss your goals and preferred track.' },
  { num: '04', title: 'Onboarding', desc: 'Get lab access, meet your team, and begin your cybersecurity journey.' },
]

export default function OpportunitiesPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.opp-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.utils.toArray('.section-label').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -30, opacity: 0, duration: 0.5 })
      })
      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: (i % 4) * 0.08 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Career Paths</div>
          <h1 className="section-title opp-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Opportunities</h1>
          <p className="section-subtitle">Tailored development paths to transform students into elite cybersecurity professionals.</p>

          <div className="grid-2" style={{ gap: 20 }}>
            {tracks.map((t, i) => (
              <div key={i} className="card track-card">
                <h3 className="track-title">{t.title}</h3>
                <p className="track-desc">{t.desc}</p>
                <ul className="track-perks">
                  {t.perks.map((p, j) => <li key={j} className="track-perk">→ {p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      <section className="section">
        <div className="container">
          <div className="section-label">// Application Process</div>
          <h2 className="section-title">How to Join</h2>
          <div className="grid-4" style={{ gap: 16 }}>
            {steps.map((s, i) => (
              <div key={i} className="card step-card">
                <span className="step-num">{s.num}</span>
                <h4 className="step-title">{s.title}</h4>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/contact" className="btn btn-primary">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
