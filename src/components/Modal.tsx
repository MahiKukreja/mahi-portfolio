import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { m, useReducedMotion } from 'motion/react'
import { CloseIcon } from './Icons'

type ModalProps = {
  title: ReactNode
  eyebrow?: ReactNode
  icon?: ReactNode
  size?: 'md' | 'sm'
  onClose: () => void
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Centred dialog in a portal. The page behind stays rendered, dimmed and blurred.
 * Closes on X, Esc or a backdrop click; traps focus while open.
 * Mount it inside <AnimatePresence> so the exit animation plays.
 * Focus is returned to the trigger by the parent (see useModalState in Home).
 */
export function Modal({ title, eyebrow, icon, size = 'md', onClose, children }: ModalProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  // Lock page scroll (html has scrollbar-gutter: stable, so nothing shifts).
  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      html.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const ease = [0.16, 1, 0.3, 1] as const

  return createPortal(
    <m.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.3, ease }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`modal ${size === 'sm' ? 'modal-sm' : ''}`}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 4 }}
        transition={{ duration: reduce ? 0.15 : 0.35, ease }}
      >
        <div className="modal-head">
          {icon}
          <div className="modal-head-text">
            {eyebrow && <span className="modal-eyebrow">{eyebrow}</span>}
            <h2 id={titleId} className="modal-title">
              {title}
            </h2>
          </div>
          <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </m.div>
    </m.div>,
    document.body,
  )
}
