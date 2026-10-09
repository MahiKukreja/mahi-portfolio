import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { experience, type Experience } from '../data/experience'
import { NavBar } from '../components/NavBar'
import { HeroCard } from '../components/HeroCard'
import { PhotoCard } from '../components/PhotoCard'
import { ExperienceCard } from '../components/ExperienceCard'
import { PikeazyCard } from '../components/PikeazyCard'
import { CaseStudiesCard } from '../components/CaseStudiesCard'
import { QuoteCard } from '../components/QuoteCard'
import { ExperienceModal } from '../components/ExperienceModal'
import { ActivitiesModal } from '../components/ActivitiesModal'
import { ContactModal } from '../components/ContactModal'
import { HeadedModal } from '../components/HeadedModal'
import { useEntrance } from '../components/EntranceChoreographer'

type ModalState =
  | { kind: 'experience'; id: Experience['id'] }
  | { kind: 'activities' }
  | { kind: 'contact' }
  | { kind: 'headed' }
  | null

export function Home() {
  const frameRef = useRef<HTMLDivElement>(null)
  const entranceAttr = useEntrance(frameRef)
  const [modal, setModal] = useState<ModalState>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const open = useCallback((next: Exclude<ModalState, null>, trigger: HTMLElement) => {
    returnFocus.current = trigger
    setModal(next)
  }, [])

  const close = useCallback(() => {
    setModal(null)
    const el = returnFocus.current
    requestAnimationFrame(() => {
      if (el?.isConnected) el.focus()
    })
  }, [])

  const activeExperience = modal?.kind === 'experience' ? experience.find((x) => x.id === modal.id) : undefined

  return (
    <div className="page">
      <div ref={frameRef} className="frame" data-entrance={entranceAttr}>
        <NavBar onContact={(t) => open({ kind: 'contact' }, t)} />
        <main style={{ display: 'contents' }}>
          <HeroCard />
          <PhotoCard />
          <ExperienceCard
            onExperience={(id, t) => open({ kind: 'experience', id }, t)}
            onActivities={(t) => open({ kind: 'activities' }, t)}
          />
          <PikeazyCard />
          <CaseStudiesCard />
          <QuoteCard onHeaded={(t) => open({ kind: 'headed' }, t)} />
        </main>
      </div>

      <AnimatePresence mode="wait">
        {activeExperience && <ExperienceModal key={`exp-${activeExperience.id}`} item={activeExperience} onClose={close} />}
        {modal?.kind === 'activities' && <ActivitiesModal key="activities" onClose={close} />}
        {modal?.kind === 'contact' && <ContactModal key="contact" onClose={close} />}
        {modal?.kind === 'headed' && (
          // "let's talk" swaps this modal for Contact; focus later returns to "Where I'm headed".
          <HeadedModal key="headed" onClose={close} onTalk={() => setModal({ kind: 'contact' })} />
        )}
      </AnimatePresence>
    </div>
  )
}
