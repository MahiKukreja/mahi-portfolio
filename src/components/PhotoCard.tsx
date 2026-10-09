import { profile } from '../data/profile'

export function PhotoCard() {
  return (
    <div className="card portrait area-portrait" data-card="portrait">
      <img
        src="/portrait.webp"
        alt={profile.portraitAlt}
        width={900}
        height={1225}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  )
}
