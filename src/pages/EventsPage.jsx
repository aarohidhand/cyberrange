import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './EventsPage.css'

gsap.registerPlugin(ScrollTrigger)

const typeBadgeColors = {
  Workshop: { bg: 'rgba(255,101,0,0.15)', color: '#FF6500' },
  Competition: { bg: 'rgba(0,255,65,0.12)', color: '#00ff41' },
  Lecture: { bg: 'rgba(100,180,255,0.12)', color: '#64b4ff' },
  Exercise: { bg: 'rgba(255,50,50,0.12)', color: '#ff5050' },
  Conference: { bg: 'rgba(180,100,255,0.12)', color: '#b464ff' },
}

const allPhotos = [
  '/photos/event/event1.png',
  '/photos/main.jpeg',
  '/photos/event/event2.png',
  '/photos/lab.png'
]

const events = [
  { month: 'MAR', day: '22', title: 'Smart Grid Security Workshop', desc: 'Hands-on workshop on SCADA/ICS vulnerability assessment and defensive strategies for smart grid infrastructure.', type: 'Workshop', status: 'upcoming' },
  { month: 'APR', day: '05', title: 'Cyberange CTF 2026', desc: 'Annual Capture-the-Flag competition featuring challenges in web exploitation, reverse engineering, cryptography, and forensics.', type: 'Competition', status: 'upcoming' },
  { month: 'APR', day: '18', title: 'AI-Driven Threat Intelligence', desc: 'Guest lecture on leveraging machine learning for real-time threat detection and automated incident response.', type: 'Lecture', status: 'past', photos: [...allPhotos, ...allPhotos] },
  { month: 'MAY', day: '10', title: 'Red vs Blue Team Drill', desc: 'Full-day adversarial simulation exercise with live-fire scenarios on emulated critical infrastructure.', type: 'Exercise', status: 'past', photos: [...allPhotos, ...allPhotos].reverse() },
]

export default function EventsPage() {
  const pageRef = useRef(null)
  const [filter, setFilter] = useState('All')

  const filteredEvents = events.filter(e => filter === 'All' || 
    (filter === 'Upcoming' && e.status === 'upcoming') || 
    (filter === 'Past' && e.status === 'past')
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.events-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.from('.events-filter', { y: 20, opacity: 0, duration: 0.5, delay: 0.4 })
      
      gsap.fromTo('.event-item', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [filter]) // Re-run animation when filter changes

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140, paddingBottom: 100 }}>
        <div className="container">
          <div className="section-label">// Events</div>
          <h1 className="section-title events-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Experiences</h1>
          <p className="section-subtitle">Immersive experiences, rigorous competitions, and hands-on skill-building workshops.</p>

          <div className="events-filter">
            {['All', 'Upcoming', 'Past'].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="events-timeline">
            {filteredEvents.map((e, i) => {
              const colors = typeBadgeColors[e.type] || typeBadgeColors.Workshop
              return (
                <div key={`${e.title}-${i}`} className="event-item card">
                  <div className="event-date">
                    <span className="event-month">{e.month}</span>
                    <span className="event-day">{e.day}</span>
                  </div>
                  <div className="event-body">
                    <div className="event-header">
                      <h3 className="event-title">{e.title}</h3>
                      <div className="event-badges">
                        <span className="event-badge" style={{ background: colors.bg, color: colors.color }}>{e.type}</span>
                        <span className={`status-badge ${e.status}`}>{e.status.toUpperCase()}</span>
                      </div>
                    </div>
                    <p className="event-desc">{e.desc}</p>
                    
                    {e.status === 'past' && e.photos && (
                      <div className="photo-scroll-container">
                        <div className="photo-track">
                          {e.photos.map((img, idx) => (
                            <img key={`photo-${idx}`} src={img} alt={`${e.title} snippet ${idx}`} className="track-image" loading="lazy" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
            
            {filteredEvents.length === 0 && (
              <div className="no-events-message card">
                <p>No events found for this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
