import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './HeroSection.css'

const stats = [
  { value: 10, suffix: '+', label: 'Partners' },
  { value: 6, suffix: '', label: 'Mentors' },
  { value: 8, suffix: '', label: 'Tracks' },
  { value: null, display: '24/7', label: 'Access' },
]

export default function HeroSection() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.5 })
        .from('.hero-title .line', { opacity: 0, y: 40, stagger: 0.12, duration: 0.6 }, '-=0.2')
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
        .from('.hero-btn', { opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.4 }, '-=0.2')
        .from('.stats-bar', { opacity: 0, y: 30, duration: 0.5 }, '-=0.1')

      // Counter animation for stats
      const counters = heroRef.current?.querySelectorAll('.stat-value[data-count]')
      counters?.forEach(el => {
        const target = parseInt(el.dataset.count)
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 1.5,
          delay: 1,
          snap: { innerText: 1 },
          onUpdate() {
            el.textContent = Math.round(parseFloat(el.innerText || 0)) + (el.dataset.suffix || '')
          }
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__bg-img" />
        <div className="hero__grid-overlay" />
        <div className="hero__gradient" />
      </div>

      <div className="container hero__content">
        <div className="hero-badge badge">
          <span className="badge-dot" />
          <span>MUJ X CYBERANGE LAB</span>
        </div>

        <h1 className="hero-title">
          <span className="line">Defending</span>
          <span className="line">Tomorrow's</span>
          <span className="line"><span className="hero-title--accent">Smart Cities</span></span>
        </h1>

        <p className="hero-sub">
          India's premier cybersecurity research lab — bridging academia and industry through advanced Cyberange training, threat intelligence, and smart city security research.
        </p>

        <div className="hero__btns">
          <Link to="/opportunities" className="btn btn-primary hero-btn">Join the Lab</Link>
          <Link to="/research" className="btn btn-outline hero-btn">Explore Research</Link>
          <Link to="/contact" className="btn btn-ghost hero-btn">Partner With Us →</Link>
        </div>
      </div>

      <div className="stats-bar">
        <div className="container stats-bar__inner">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <span
                className="stat-value"
                data-count={s.value}
                data-suffix={s.suffix}
              >
                {s.display || '0' + s.suffix}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
