import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './OpenSourcePage.css'

gsap.registerPlugin(ScrollTrigger)

const repos = [
  { name: 'scada-honeypot', desc: 'High-interaction honeypot for SCADA/ICS protocols including Modbus, DNP3, and S7comm.', lang: 'Python', stars: 142 },
  { name: 'iot-firmware-scanner', desc: 'Automated firmware extraction and vulnerability scanning tool for IoT devices.', lang: 'Python/Bash', stars: 89 },
  { name: 'smartcity-threat-model', desc: 'Comprehensive threat modeling framework specifically designed for smart city infrastructure.', lang: 'Python', stars: 67 },
  { name: 'cyberange-ctf-platform', desc: 'Full-featured CTF platform with dynamic challenge scoring, team management, and live scoreboards.', lang: 'Go/React', stars: 203 },
  { name: 'ics-packet-dataset', desc: 'Curated dataset of ICS/SCADA network traffic with labeled attack signatures for ML model training.', lang: 'Dataset CSV', stars: 311 },
  { name: 'threat-intel-aggregator', desc: 'Multi-source threat intelligence aggregation and correlation engine with STIX/TAXII support.', lang: 'Python', stars: 55 },
]

export default function OpenSourcePage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.oss-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
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
          <div className="section-label">// GitHub Repositories</div>
          <h1 className="section-title oss-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Open Source</h1>
          <p className="section-subtitle">Tools, datasets, and frameworks built by MUJ-ISAC and released freely to the security community.</p>

          <div className="grid-2" style={{ gap: 16 }}>
            {repos.map((r, i) => (
              <div key={i} className="card repo-card">
                <h3 className="repo-name">/{r.name}</h3>
                <p className="repo-desc">{r.desc}</p>
                <div className="repo-meta">
                  <span className="tag">{r.lang}</span>
                  <span className="repo-stars">★ {r.stars}</span>
                  <a href="#" className="repo-link" onClick={e => e.preventDefault()}>View on GitHub ↗</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
