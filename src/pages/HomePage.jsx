import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection'
import CTABand from '../components/CTABand'
import './HomePage.css'

gsap.registerPlugin(ScrollTrigger)

const collabs = [
  { name: 'ETH Zurich', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'NTNU', flag: '🇳🇴', country: 'Norway' },
  { name: 'Uni Lausanne', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'ZHAW', flag: '🇨🇭', country: 'Switzerland' },
  { name: 'THM', flag: '🇩🇪', country: 'Germany' },
  { name: 'IIT (BHU)', flag: '🇮🇳', country: 'India' },
  { name: 'IIIT Allahabad', flag: '🇮🇳', country: 'India' },
  { name: 'NIT Jalandhar', flag: '🇮🇳', country: 'India' },
  { name: 'IIIT Raipur', flag: '🇮🇳', country: 'India' },
  { name: 'C3I Hub IIT Kanpur', flag: '🇮🇳', country: 'India' },
]

const mentors = [
  { name: 'Atul Kumar', role: 'Security Architect', initials: 'AK' },
  { name: 'Vaibhav Shukla', role: 'Threat Intelligence Lead', initials: 'VS' },
  { name: 'Dr. Amandeep Kapoor', role: 'CISO & Advisor', initials: 'AK' },
  { name: 'Siddharth Simharaju', role: 'Red Team Specialist', initials: 'SS' },
  { name: 'Sai Rakshit', role: 'SOC Operations Lead', initials: 'SR' },
  { name: 'Aseem Shrey', role: 'AppSec Engineer', initials: 'AS' },
]

const studentActivities = [
  { icon: '🔬', title: 'Research', desc: 'Publish papers in top-tier security conferences and journals.' },
  { icon: '🎯', title: 'Cyber Range Training', desc: 'Hands-on offensive and defensive exercises on realistic environments.' },
  { icon: '🛠️', title: 'Product Development', desc: 'Build enterprise-grade security tools and platforms.' },
  { icon: '🏆', title: 'Hackathons', desc: 'Compete in national and international CTF competitions.' },
  { icon: '💻', title: 'Open Source', desc: 'Contribute to critical open-source security projects.' },
  { icon: '🏢', title: 'Internships', desc: 'Industry placements at leading cybersecurity firms.' },
  { icon: '📋', title: 'Policy & Governance', desc: 'Draft cybersecurity policy frameworks and compliance strategies.' },
  { icon: '🎖️', title: 'Certifications', desc: 'Prepare for OSCP, CISSP, CEH and other industry certifications.' },
]

const flagshipActivities = [
  { title: 'Cyber Range Exercises', desc: 'Full-spectrum attack and defense simulations on emulated critical infrastructure.' },
  { title: 'Red vs Blue Team Drills', desc: 'Adversarial exercises pitting offensive and defensive squads in real-time scenarios.' },
  { title: 'CTF Competitions', desc: 'Regular Capture-the-Flag events covering crypto, reverse engineering, and web exploitation.' },
  { title: 'Industry Workshops', desc: 'Expert-led sessions on emerging threats, tools, and defensive strategies.' },
  { title: 'Security Tool Development', desc: 'Building and publishing open-source security tools for the community.' },
  { title: 'Research Publications', desc: 'Peer-reviewed papers in IEEE, ACM, and Springer security venues.' },
]

const features = [
  { icon: '🏙️', title: 'Smart City Cybersecurity', desc: 'Protecting next-generation urban infrastructure from cyber threats.' },
  { icon: '🎯', title: 'Cyber Range Training', desc: 'Immersive simulated environments for offensive and defensive operations.' },
  { icon: '🤝', title: 'Research + Industry Collaboration', desc: 'Bridging academia and industry through joint projects and mentorship.' },
  { icon: '🚀', title: 'Student Opportunities', desc: 'Multiple tracks for research, innovation, and professional development.' },
]

export default function HomePage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered animations
      gsap.utils.toArray('.section-label').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -30, opacity: 0, duration: 0.5 })
      })

      gsap.utils.toArray('.section-title').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 40, opacity: 0, duration: 0.6 })
      })

      gsap.utils.toArray('.card').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 30, opacity: 0, duration: 0.5, delay: (i % 6) * 0.06
        })
      })

      gsap.utils.toArray('.section-divider').forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 90%' }, scaleX: 0, duration: 0.6 })
      })

      // About section split animation
      gsap.from('.about-img-wrap', { scrollTrigger: { trigger: '.about-section', start: 'top 80%' }, x: -50, opacity: 0, duration: 0.6 })
      gsap.from('.about-text-wrap', { scrollTrigger: { trigger: '.about-section', start: 'top 80%' }, x: 50, opacity: 0, duration: 0.6 })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <HeroSection />

      {/* ─── About the Lab ─── */}
      <section className="section about-section">
        <div className="container">
          <div className="section-label">// About the Lab</div>
          <h2 className="section-title">Where Research Meets Real-World Defense</h2>
          <div className="about-grid">
            <div className="about-img-wrap">
              <img src="/photos/lab.jpeg" alt="CyberRange Lab" className="about-img" />
              <div className="about-img-corner about-img-corner--tl" />
              <div className="about-img-corner about-img-corner--br" />
            </div>
            <div className="about-text-wrap">
              <p className="section-subtitle" style={{ marginBottom: 32 }}>
                MUJ-ISAC Cyber Range Lab is a state-of-the-art cybersecurity research facility focused on smart city security, critical infrastructure protection, and next-generation defense technologies.
              </p>
              <div className="features-list">
                {features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <span className="feature-icon">{f.icon}</span>
                    <div>
                      <h4 className="feature-title">{f.title}</h4>
                      <p className="feature-desc">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ─── Global Collaborations ─── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Global Research Collaborations</div>
          <h2 className="section-title">Partnering Across Borders</h2>
          <p className="section-subtitle">Collaborating with leading institutions worldwide to advance cybersecurity research and education.</p>
          <div className="grid-5">
            {collabs.map((c, i) => (
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

      {/* ─── Industry Mentors ─── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Industry Mentors</div>
          <h2 className="section-title">Learn From the Best</h2>
          <p className="section-subtitle">Our mentors bring decades of real-world experience from leading cybersecurity organizations.</p>
          <div className="grid-3">
            {mentors.map((m, i) => (
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

      <div className="container"><div className="section-divider" /></div>

      {/* ─── What Students Can Do ─── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// What Students Can Do</div>
          <h2 className="section-title">Your Path to Cyber Excellence</h2>
          <p className="section-subtitle">From research to competitions, multiple paths to become an elite cybersecurity professional.</p>
          <div className="grid-4">
            {studentActivities.map((a, i) => (
              <div key={i} className="card activity-card">
                <span className="activity-icon">{a.icon}</span>
                <h4 className="activity-title">{a.title}</h4>
                <p className="activity-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="section-divider" /></div>

      {/* ─── Flagship Activities ─── */}
      <section className="section">
        <div className="container">
          <div className="section-label">// Flagship Activities</div>
          <h2 className="section-title">Core Programs</h2>
          <p className="section-subtitle">Our signature programs that define the CyberRange experience.</p>
          <div className="flagship-list">
            {flagshipActivities.map((f, i) => (
              <div key={i} className="card flagship-item">
                <div className="flagship-accent" />
                <div>
                  <h4 className="flagship-title">{f.title}</h4>
                  <p className="flagship-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
