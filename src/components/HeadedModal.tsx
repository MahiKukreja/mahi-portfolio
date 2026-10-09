import { headed } from '../data/headed'
import { ArrowRight } from './Icons'
import { Modal } from './Modal'

type HeadedModalProps = { onClose: () => void; onTalk: () => void }

export function HeadedModal({ onClose, onTalk }: HeadedModalProps) {
  return (
    <Modal title={headed.title} eyebrow={headed.eyebrow} onClose={onClose}>
      <ol className="headed-list">
        {headed.points.map((p, i) => (
          <li key={p.title} className="headed-item">
            <span className="headed-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="headed-closing">
        {headed.closing}
        <button type="button" className="btn-inline" aria-haspopup="dialog" onClick={onTalk}>
          {headed.cta} <ArrowRight size={13} />
        </button>
      </p>
    </Modal>
  )
}
