import { activitiesRow, events, highlights, leadership, wins } from '../data/activities'
import { Modal } from './Modal'

export function ActivitiesModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title={activitiesRow.label} onClose={onClose}>
      <section className="modal-section" aria-labelledby="act-leadership">
        <h3 id="act-leadership">Leadership</h3>
        {leadership.map((r) => (
          <div key={r.role} className="role">
            <div className="role-head">
              <span className="role-name">{r.role}, {r.org}</span>
              <span className="role-org">({r.orgNote})</span>
              <span className="role-dates">{r.dates}</span>
            </div>
            <p>{r.description}</p>
          </div>
        ))}
      </section>
      <section className="modal-section" aria-labelledby="act-wins">
        <h3 id="act-wins">Competition wins</h3>
        <ul className="bullets">
          {wins.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </section>
      <section className="modal-section" aria-labelledby="act-events">
        <h3 id="act-events">Events organised</h3>
        <ul className="bullets">
          {events.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </section>
      <section className="modal-section" aria-labelledby="act-highlights">
        <h3 id="act-highlights">Highlights</h3>
        <ul className="bullets">
          {highlights.map((w) => <li key={w}>{w}</li>)}
        </ul>
      </section>
    </Modal>
  )
}
