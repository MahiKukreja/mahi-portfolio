import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'
import { experience, type Experience } from '../data/experience'
import { activitiesRow } from '../data/activities'
import { viralContent } from '../data/viralContent'
import { HoverPreview } from './HoverPreview'
import { ArrowNE } from './Icons'

type ExperienceCardProps = {
  onExperience: (id: Experience['id'], trigger: HTMLElement) => void
  onActivities: (trigger: HTMLElement) => void
}

type PreviewState = { key: string; rect: DOMRect } | null

const HOVER_DELAY = 120

/** Hover previews only make sense with a real hovering pointer. */
function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1100px)').matches
}

export function ExperienceCard({ onExperience, onActivities }: ExperienceCardProps) {
  const [preview, setPreview] = useState<PreviewState>(null)
  const timer = useRef<number | undefined>(undefined)

  const hide = useCallback(() => {
    window.clearTimeout(timer.current)
    setPreview(null)
  }, [])

  const show = useCallback((key: string, el: HTMLElement, delay = HOVER_DELAY) => {
    if (!canHover()) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setPreview({ key, rect: el.getBoundingClientRect() }), delay)
  }, [])

  // Fixed-position previews would drift on scroll/resize, so just hide them.
  useEffect(() => {
    if (!preview) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide()
    window.addEventListener('scroll', hide, { passive: true })
    window.addEventListener('resize', hide)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', hide)
      window.removeEventListener('resize', hide)
      window.removeEventListener('keydown', onKey)
    }
  }, [preview, hide])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  /** Props that wire a row to the preview: mouse hover and keyboard focus. */
  const previewProps = (key: string) => ({
    onPointerEnter: (e: PointerEvent<HTMLElement>) => e.pointerType === 'mouse' && show(key, e.currentTarget),
    onPointerLeave: hide,
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (e.currentTarget.matches(':focus-visible')) show(key, e.currentTarget, 0)
    },
    onBlur: hide,
    'aria-describedby': preview?.key === key ? `preview-${key}` : undefined,
  })

  const previewContent: Record<string, ReactNode> = {
    ...Object.fromEntries(
      experience.map((x) => [
        x.id,
        <>
          <span className="preview-title">{x.name}</span>
          {x.preview}
        </>,
      ]),
    ),
    activities: (
      <>
        <span className="preview-title">{activitiesRow.label}</span>
        {activitiesRow.preview}
      </>
    ),
    viral: (
      <>
        <img className="preview-img" src={viralContent.thumbnail} alt="" width={640} height={800} />
        <span className="preview-title">{viralContent.label}</span>
        {viralContent.previewCaption}
      </>
    ),
  }

  return (
    <section className="card exp-card area-exp" data-card="exp" aria-label="Experience and activities">
      <div className="exp-section" data-reveal="8">
        <h2>Experience</h2>
        <ul className="exp-list">
          {experience.map((x) => (
            <li key={x.id}>
              <button
                type="button"
                className="exp-row"
                aria-haspopup="dialog"
                {...previewProps(x.id)}
                onClick={(e) => {
                  hide()
                  onExperience(x.id, e.currentTarget)
                }}
              >
                <span>
                  <span className="exp-row-title">{x.name}</span>
                  <span className="exp-row-sub">{x.rowSubtext}</span>
                </span>
                <ArrowNE size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="exp-section" data-reveal="8">
        <h2>Activities</h2>
        <ul className="exp-list">
          <li>
            <button
              type="button"
              className="exp-row"
              aria-haspopup="dialog"
              {...previewProps('activities')}
              onClick={(e) => {
                hide()
                onActivities(e.currentTarget)
              }}
            >
              <span className="exp-row-title">{activitiesRow.label}</span>
              <ArrowNE size={16} />
            </button>
          </li>
          <li>
            <a
              className="exp-row"
              href={viralContent.href}
              target="_blank"
              rel="noopener noreferrer"
              {...previewProps('viral')}
              onClick={hide}
            >
              <span className="exp-row-title">{viralContent.label}</span>
              <span className="sr-only">(opens a PDF in a new tab)</span>
              <ArrowNE size={16} />
            </a>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {preview && (
          <HoverPreview key={preview.key} id={`preview-${preview.key}`} anchor={preview.rect}>
            {previewContent[preview.key]}
          </HoverPreview>
        )}
      </AnimatePresence>
    </section>
  )
}
