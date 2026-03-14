import { Link } from 'react-router-dom'
import './CTABand.css'

export default function CTABand({ title = "Ready to Defend the Digital World?", buttons }) {
  const defaultButtons = [
    { label: 'Join the Lab', path: '/opportunities', variant: 'btn-primary' },
    { label: 'Apply for Research Track', path: '/contact', variant: 'btn-outline' },
    { label: 'Partner With Us', path: '/contact', variant: 'btn-ghost' },
  ]

  const btns = buttons || defaultButtons

  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <h2 className="cta-band__title">{title}</h2>
        <div className="cta-band__btns">
          {btns.map((b, i) => (
            <Link key={i} to={b.path} className={`btn ${b.variant}`}>{b.label}</Link>
          ))}
        </div>
      </div>
    </section>
  )
}
