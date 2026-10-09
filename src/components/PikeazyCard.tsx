import { pikeazyDeck } from '../data/caseStudies'
import { ArrowNE, ArrowRight } from './Icons'

export function PikeazyCard() {
  return (
    <a
      className="card link-card pikeazy area-pikeazy on-dark"
      data-card="pikeazy"
      href={pikeazyDeck.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card-head" data-reveal="9">
        <span className="num-label">02</span>
        <span className="circle-arrow"><ArrowNE size={14} /></span>
      </div>
      <h2 className="card-title" data-reveal="9">{pikeazyDeck.title}</h2>
      <div className="thumb-box" data-reveal="9">
        <div className="thumb">
          <img src={pikeazyDeck.thumbnail} alt="" width={900} height={507} loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="pikeazy-foot" data-reveal="9">
        <p className="pikeazy-stats">{pikeazyDeck.stats}</p>
        <span className="pikeazy-cta">
          {pikeazyDeck.cta} <ArrowRight size={13} />
          <span className="sr-only">(opens in a new tab)</span>
        </span>
      </div>
    </a>
  )
}
