import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './EventsPage.css'

gsap.registerPlugin(ScrollTrigger)

const events = [
  { month: 'MAR', day: '22', title: 'Smart Grid Security Workshop', desc: 'Hands-on workshop on SCADA/ICS vulnerability assessment and defensive strategies for smart grid infrastructure.', type: 'Workshop' },
  { month: 'APR', day: '05', title: 'CyberRange CTF 2026', desc: 'Annual Capture-the-Flag competition featuring challenges in web exploitation, reverse engineering, cryptography, and forensics.', type: 'Competition' },
  { month: 'APR', day: '18', title: 'AI-Driven Threat Intelligence', desc: 'Guest lecture on leveraging machine learning for real-time threat detection and automated incident response.', type: 'Lecture' },
  { month: 'MAY', day: '10', title: 'Red vs Blue Team Drill', desc: 'Full-day adversarial simulation exercise with live-fire scenarios on emulated critical infrastructure.', type: 'Exercise' },
  { month: 'JUN', day: '14', title: 'International Cybersecurity Symposium', desc: 'Multi-day symposium with international speakers on the future of smart city security and critical infrastructure defense.', type: 'Conference' },
]

const typeBadgeColors = {
  Workshop: { bg: 'rgba(255,101,0,0.15)', color: '#FF6500' },
  Competition: { bg: 'rgba(0,255,65,0.12)', color: '#00ff41' },
  Lecture: { bg: 'rgba(100,180,255,0.12)', color: '#64b4ff' },
  Exercise: { bg: 'rgba(255,50,50,0.12)', color: '#ff5050' },
  Conference: { bg: 'rgba(180,100,255,0.12)', color: '#b464ff' },
}

export default function EventsPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.events-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.utils.toArray('.event-item').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: i * 0.08 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Upcoming</div>
          <h1 className="section-title events-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Events</h1>
          <p className="section-subtitle">Immersive experiences, rigorous competitions, and hands-on skill-building workshops.</p>

          <div className="events-timeline">
            {events.map((e, i) => {
              const colors = typeBadgeColors[e.type] || typeBadgeColors.Workshop
              return (
                <div key={i} className="event-item card">
                  <div className="event-date">
                    <span className="event-month">{e.month}</span>
                    <span className="event-day">{e.day}</span>
                  </div>
                  <div className="event-body">
                    <div className="event-header">
                      <h3 className="event-title">{e.title}</h3>
                      <span className="event-badge" style={{ background: colors.bg, color: colors.color }}>{e.type}</span>
                    </div>
                    <p className="event-desc">{e.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
