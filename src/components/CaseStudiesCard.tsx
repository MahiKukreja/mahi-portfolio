import { caseStudies, caseStudiesIntro } from '../data/caseStudies'
import { ArrowNE } from './Icons'

export function CaseStudiesCard() {
  return (
    <section className="card cases area-cases" data-card="cases" aria-labelledby="cases-title">
      <div data-reveal="10">
        <span className="num-label">03</span>
        <h2 id="cases-title" className="card-title" style={{ marginTop: 8 }}>{caseStudiesIntro.title}</h2>
        <p className="cases-sub">{caseStudiesIntro.subtitle}</p>
      </div>
      <ul className="cases-grid" data-reveal="10">
        {caseStudies.map((cs) => (
          <li key={cs.company} style={{ minHeight: 0 }}>
            <a
              className="link-card case-mini"
              href={cs.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="thumb-box">
                <div className="thumb">
                  <img src={cs.thumbnail} alt="" width={900} height={507} loading="lazy" decoding="async" />
                </div>
              </div>
              <span className="case-foot">
                <span className="case-name">{cs.company}</span>
                <span className="case-open">
                  Open <ArrowNE size={11} />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
