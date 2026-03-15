import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './ContactPage.css'

const roles = ['Student (MUJ)', 'External Student/Researcher', 'Industry Professional', 'Faculty/Academic', 'Media/Press']
const purposes = ['Join the Lab', 'Research Collaboration', 'Industry Partnership', 'General Inquiry']

const infoCards = [
  { icon: '✉️', label: 'Email', value: 'Cyberange@mahe.edu.in' },
  { icon: '📍', label: 'Location', value: 'MUJ, Jaipur 303007, Rajasthan, India' },
  { icon: '🔗', label: 'LinkedIn', value: 'MUJ-Cyberange Cyberange' },
  { icon: '💻', label: 'GitHub', value: 'github.com/mahe-isac' },
]

export default function ContactPage() {
  const pageRef = useRef(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', role: '', purpose: '', message: '' })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); alert('Thank you! Your message has been sent. We will respond shortly.') }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-hero-title', { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
      gsap.from('.contact-info', { x: -50, opacity: 0, duration: 0.6, delay: 0.3 })
      gsap.from('.contact-form-wrap', { x: 50, opacity: 0, duration: 0.6, delay: 0.3 })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="page-content">
      <section className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          <div className="section-label">// Get In Touch</div>
          <h1 className="section-title contact-hero-title" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Contact</h1>
          <p className="section-subtitle">Reach out for collaboration inquiries, research partnerships, or joining the lab.</p>

          <div className="contact-grid">
            <div className="contact-info">
              {infoCards.map((c, i) => (
                <div key={i} className="card info-card">
                  <span className="info-icon">{c.icon}</span>
                  <div>
                    <span className="info-label">{c.label}</span>
                    <span className="info-value">{c.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-form-wrap">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} className="form-input" placeholder="John" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} className="form-input" placeholder="Doe" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@example.com" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select name="role" value={form.role} onChange={handleChange} className="form-select" required>
                      <option value="">Select Role</option>
                      {roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Purpose</label>
                    <select name="purpose" value={form.purpose} onChange={handleChange} className="form-select" required>
                      <option value="">Select Purpose</option>
                      {purposes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="form-textarea" placeholder="Tell us about your interest..." required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
