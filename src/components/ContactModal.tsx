import { useEffect, useRef, useState } from 'react'
import { links, mailto, tel } from '../data/links'
import { Modal } from './Modal'

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for browsers/contexts without the async clipboard API.
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

/** Last resort: select the visible text so the visitor can copy it themselves. */
function selectText(el: HTMLElement | null) {
  if (!el) return
  const range = document.createRange()
  range.selectNodeContents(el)
  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

function CopyButton({ value, label, targetId }: { value: string; label: string; targetId: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'selected'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <button
      type="button"
      className="btn-copy"
      aria-label={state === 'copied' ? `${label} copied` : `Copy ${label}`}
      onClick={async () => {
        const ok = await copyText(value)
        if (!ok) selectText(document.getElementById(targetId))
        setState(ok ? 'copied' : 'selected')
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setState('idle'), ok ? 1500 : 3000)
      }}
    >
      <span aria-live="polite">{state === 'copied' ? 'Copied ✓' : state === 'selected' ? 'Selected' : 'Copy'}</span>
    </button>
  )
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Let's talk" size="sm" onClose={onClose}>
      <div className="contact-rows">
        <div className="contact-row">
          <div style={{ minWidth: 0 }}>
            <span className="contact-label">Email</span>
            <a id="contact-email" className="contact-value" href={mailto}>{links.email}</a>
          </div>
          <CopyButton value={links.email} label="email" targetId="contact-email" />
        </div>
        <div className="contact-row">
          <div style={{ minWidth: 0 }}>
            <span className="contact-label">Phone</span>
            <a id="contact-phone" className="contact-value" href={tel}>{links.phone}</a>
          </div>
          <CopyButton value={links.phone} label="phone number" targetId="contact-phone" />
        </div>
      </div>
    </Modal>
  )
}
