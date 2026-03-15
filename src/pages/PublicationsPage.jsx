import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PublicationsPage.css'

gsap.registerPlugin(ScrollTrigger)

const publications = [
  { type: 'IEEE', year: '2025', title: 'Analyzing Zero-Day Exploits in Smart Grid SCADA Systems: A Machine Learning Approach', meta: 'Dr. M. K. Mishra, A. Iyer — IEEE Transactions on Information Forensics and Security' },
  { type: 'IEEE', year: '2025', title: 'Deep Reinforcement Learning for Adaptive Intrusion Detection in IoT Networks', meta: 'R. Verma, S. Joshi — IEEE Internet of Things Journal' },
  { type: 'ACM', year: '2024', title: 'Privacy-Preserving Federated Learning for Distributed Threat Intelligence', meta: 'P. Sharma, M. K. Mishra — ACM Computing Surveys' },
  { type: 'Springer', year: '2024', title: 'Quantum-Resistant Cryptographic Protocols for Municipal IoT Infrastructure', meta: 'P. Sharma — Lecture Notes in Computer Science, Springer' },
  { type: 'Technical Report', year: '2024', title: 'MUJ-Cyberange Smart City Threat Landscape Report 2024', meta: 'Cyberange Research Team — Internal Technical Report' },
]

export default function PublicationsPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pub-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.utils.toArray('.pub-item').forEach((el, i) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 88%' }, y: 30, opacity: 0, duration: 0.5, delay: i * 0.08 })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Academic Output</div>
          <h1 className="section-title pub-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Publications</h1>
          <p className="section-subtitle">Peer-reviewed research, technical reports, and whitepapers from the Cyberange faculty and students.</p>

          <div className="pub-list">
            {publications.map((p, i) => (
              <div key={i} className="pub-item">
                <div className="pub-accent" />
                <div className="pub-content">
                  <div className="pub-badges">
                    <span className="tag">{p.type}</span>
                    <span className="pub-year">{p.year}</span>
                  </div>
                  <h3 className="pub-title">{p.title}</h3>
                  <p className="pub-meta">{p.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
