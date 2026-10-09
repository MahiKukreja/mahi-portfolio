import { links } from '../data/links'
import { profile } from '../data/profile'
import { ArrowNE } from './Icons'

type NavBarProps = { onContact: (trigger: HTMLElement) => void }

export function NavBar({ onContact }: NavBarProps) {
  return (
    <header className="card nav area-nav" data-card="nav">
      <span className="nav-name" data-reveal="1">
        {profile.navName}
      </span>
      <nav className="nav-actions" aria-label="Primary" data-reveal="2">
        <a className="btn btn-primary" href={links.resume} target="_blank" rel="noopener noreferrer">
          Resume
          <span className="btn-circle">
            <ArrowNE size={13} />
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a className="btn btn-secondary" href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <button type="button" className="btn btn-secondary" aria-haspopup="dialog" onClick={(e) => onContact(e.currentTarget)}>
          Contact
        </button>
      </nav>
    </header>
  )
}
