import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ResearchPage.css'

gsap.registerPlugin(ScrollTrigger)

const areas = [
  { id: '01', title: 'Smart City Security', desc: 'Securing urban digital infrastructure — power grids, water systems, and transportation networks — against sophisticated cyber threats.', tags: ['SCADA', 'IoT', 'Zero Trust'] },
  { id: '02', title: 'Critical Infrastructure Protection', desc: 'Defending national critical infrastructure through advanced threat modeling, vulnerability assessment, and resilience frameworks.', tags: ['ICS', 'NIST', 'Resilience'] },
  { id: '03', title: 'IoT Security', desc: 'Identifying and mitigating vulnerabilities across connected devices, edge computing platforms, and IoT communication protocols.', tags: ['Firmware', 'MQTT', 'BLE'] },
  { id: '04', title: 'AI for Cybersecurity', desc: 'Leveraging machine learning and deep learning for real-time intrusion detection, automated threat hunting, and anomaly detection.', tags: ['ML/DL', 'NLP', 'Adversarial'] },
  { id: '05', title: 'OT / ICS Security', desc: 'Specialized research on securing operational technology environments, including industrial control systems and SCADA networks.', tags: ['Modbus', 'DNP3', 'PLC'] },
  { id: '06', title: 'Cyber Threat Intelligence', desc: 'Building next-generation threat intelligence platforms for proactive defense through advanced analytics and information sharing.', tags: ['STIX/TAXII', 'OSINT', 'APT'] },
]

export default function ResearchPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.research-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
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
          <div className="section-label">// Research Areas</div>
          <h1 className="section-title research-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Research</h1>
          <p className="section-subtitle">Pushing the boundaries of cybersecurity through cutting-edge research across six specialized domains.</p>

          <div className="grid-2" style={{ gap: 20 }}>
            {areas.map((area, i) => (
              <div key={i} className="card research-card">
                <span className="research-id">{area.id}</span>
                <h3 className="research-card-title">{area.title}</h3>
                <p className="research-card-desc">{area.desc}</p>
                <div className="research-tags">
                  {area.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
