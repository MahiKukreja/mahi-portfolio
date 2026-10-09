import { profile } from '../data/profile'
import { Sunburst } from './Icons'

export function HeroCard() {
  return (
    <section className="card hero area-hero" data-card="hero" aria-labelledby="hero-name">
      <Sunburst className="sunburst" data-reveal="3" />
      <p className="status-pill" data-reveal="3">
        <span className="status-dot" aria-hidden="true" />
        {profile.status}
      </p>
      <div className="hero-body">
        <span className="num-label" data-reveal="4">01</span>
        <h1 id="hero-name" className="hero-title">
          <span className="line" data-reveal="4">{profile.name}</span>
          <span className="line" data-reveal="5">
            <span className="hl">{profile.titleHighlight}</span> {profile.titleRest}
          </span>
        </h1>
        <p className="hero-about" data-reveal="6">{profile.about}</p>
        <ul className="chips" aria-label="Focus areas" data-reveal="7">
          {profile.chips.map((c) => (
            <li key={c} className="chip">{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
