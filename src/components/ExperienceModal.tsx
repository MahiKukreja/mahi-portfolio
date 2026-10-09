import type { Experience } from '../data/experience'
import { Modal } from './Modal'

export function ExperienceModal({ item, onClose }: { item: Experience; onClose: () => void }) {
  return (
    <Modal
      title={item.modalTitle}
      eyebrow={item.dates}
      icon={<img className="modal-logo" src={item.logo} alt={`${item.name} logo`} width={56} height={56} />}
      onClose={onClose}
    >
      <ul className="stat-chips" aria-label="Key numbers">
        {item.chips.map((c) => (
          <li key={c} className="stat-chip">{c}</li>
        ))}
      </ul>
      <ul className="bullets">
        {item.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </Modal>
  )
}
