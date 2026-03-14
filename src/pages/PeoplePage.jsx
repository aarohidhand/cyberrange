import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PeoplePage.css'

gsap.registerPlugin(ScrollTrigger)

const people = {
  'Director / Faculty': [
    { name: 'Dr. Manoj Kumar Mishra', role: 'Lab Director', initials: 'MM' },
    { name: 'Dr. Sandeep Joshi', role: 'Associate Director', initials: 'SJ' },
  ],
  'Industry Mentors': [
    { name: 'Atul Kumar', role: 'Security Architect', initials: 'AK' },
    { name: 'Vaibhav Shukla', role: 'Threat Intelligence Lead', initials: 'VS' },
    { name: 'Dr. Amandeep Kapoor', role: 'CISO & Advisor', initials: 'AK' },
    { name: 'Siddharth Simharaju', role: 'Red Team Specialist', initials: 'SS' },
    { name: 'Sai Rakshit', role: 'SOC Operations Lead', initials: 'SR' },
    { name: 'Aseem Shrey', role: 'AppSec Engineer', initials: 'AS' },
  ],
  'Research Fellows': [
    { name: 'Ananya Iyer', role: 'Ph.D — Smart City IDS', initials: 'AI' },
    { name: 'Rahul Verma', role: 'M.Tech — OT Security', initials: 'RV' },
    { name: 'Priya Sharma', role: 'Ph.D — Post-Quantum Crypto', initials: 'PS' },
  ],
  'Student Team': [
    { name: 'Arjun Mehta', role: 'Team Lead — Red Team', initials: 'AM' },
    { name: 'Sneha Reddy', role: 'Blue Team Lead', initials: 'SR' },
    { name: 'Karan Patel', role: 'CTF Captain', initials: 'KP' },
    { name: 'Diya Nair', role: 'Research Intern', initials: 'DN' },
  ],
}

export default function PeoplePage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.people-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.utils.toArray('.section-label').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -30, opacity: 0, duration: 0.5 })
      })
      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: (i % 4) * 0.06 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Our Team</div>
          <h1 className="section-title people-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>People</h1>
          <p className="section-subtitle">The brilliant minds behind the research, operations, and innovations at MUJ-ISAC Cyber Range Lab.</p>
        </div>
      </section>

      {Object.entries(people).map(([category, members], catIdx) => (
        <section key={catIdx} className="section" style={{ paddingTop: catIdx === 0 ? 0 : undefined }}>
          <div className="container">
            <div className="section-label">// {category}</div>
            <div className="container"><div className="section-divider" style={{ marginBottom: 32 }} /></div>
            <div className="grid-3">
              {members.map((p, i) => (
                <div key={i} className="card people-card">
                  <div className="avatar">{p.initials}</div>
                  <div className="people-info">
                    <h4 className="people-name">{p.name}</h4>
                    <span className="people-role">{p.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
