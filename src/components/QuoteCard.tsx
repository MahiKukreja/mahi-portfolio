import { quote } from '../data/profile'
import { ArrowRight } from './Icons'

type QuoteCardProps = { onHeaded: (trigger: HTMLElement) => void }

export function QuoteCard({ onHeaded }: QuoteCardProps) {
  return (
    <section className="card quote-card area-quote" data-card="quote" aria-label="Quote">
      <figure style={{ margin: 0 }} data-reveal="11">
        <blockquote>
          <p className="quote-text">“{quote.text}”</p>
        </blockquote>
      </figure>
      <div className="quote-foot" data-reveal="11">
        <span className="quote-attr">{quote.attribution}</span>
        <button
          type="button"
          className="btn-headed"
          aria-haspopup="dialog"
          data-headed-trigger
          onClick={(e) => onHeaded(e.currentTarget)}
        >
          {quote.cta} <ArrowRight size={13} />
        </button>
      </div>
    </section>
  )
}
