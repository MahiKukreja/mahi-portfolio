import { useLayoutEffect, useState, type RefObject } from 'react'

/**
 * Entrance choreography (see the transition screenshots, frames 1–5).
 *
 *  0.00–0.45  frame fades in; only the portrait shows, centred at 1.28×
 *  0.25–0.85  portrait contracts to 1× and glides into its grid slot
 *  0.30–0.50  a thin cream line (the nav) appears above the portrait
 *  0.42–1.40  cards grow out from behind the portrait (FLIP from its centre)
 *  0.50–1.00  the nav widens from that line to full width
 *  0.80–1.50  card contents fade up, staggered in reading order
 *
 * Tablet/mobile get a staggered fade-up; reduced motion gets a single 250ms fade.
 * Any click, tap, key or wheel during the sequence completes it instantly.
 *
 * Built on the Web Animations API (compositor-driven, no library). The individual
 * `translate` / `scale` properties are used so hover `transform`s are untouched.
 *
 * Markup contract: the frame carries data-entrance="pending" on first render,
 * cards carry data-card="<name>", and content carries data-reveal="<order>".
 */

type Mode = 'flip' | 'fade' | 'reduced'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

// When each card starts emerging (seconds).
const CARD_DELAYS: Record<string, number> = {
  hero: 0.42,
  exp: 0.45,
  pikeazy: 0.6,
  cases: 0.65,
  quote: 0.7,
}

function pickMode(): Mode {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced'
  if (window.matchMedia('(min-width: 1100px)').matches) return 'flip'
  return 'fade'
}

const centre = (r: DOMRect) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 })

export function useEntrance(frameRef: RefObject<HTMLElement | null>) {
  // Rendered once; the attribute is then managed imperatively.
  const [initialAttr] = useState<'pending'>('pending')

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const mode = pickMode()
    const cards = Array.from(frame.querySelectorAll<HTMLElement>('[data-card]'))
    const reveals = Array.from(frame.querySelectorAll<HTMLElement>('[data-reveal]'))
    const anims: Animation[] = []
    let finished = false

    const play = (el: Element, keyframes: Keyframe[], delay: number, duration: number, easing = EASE) => {
      anims.push(el.animate(keyframes, { delay: delay * 1000, duration: duration * 1000, easing, fill: 'both' }))
    }

    // Only a width change invalidates the measured layout; height-only resizes
    // (mobile URL bar, headless startup) are ignored.
    const startWidth = window.innerWidth
    const onResize = () => {
      if (Math.abs(window.innerWidth - startWidth) > 1) finish()
    }
    const skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const

    const cleanup = () => {
      skipEvents.forEach((t) => window.removeEventListener(t, finish, { capture: true }))
      window.removeEventListener('resize', onResize)
      anims.forEach((a) => a.cancel()) // end state == natural layout, so this is seamless
      frame.removeAttribute('data-entrance')
    }

    function finish() {
      if (finished) return
      finished = true
      cleanup()
    }

    frame.setAttribute('data-entrance', 'running')

    if (mode === 'reduced') {
      play(frame, [{ opacity: 0 }, { opacity: 1 }], 0, 0.25, 'ease-out')
    } else if (mode === 'fade') {
      const nav = cards.find((c) => c.dataset.card === 'nav')
      const rest = cards.filter((c) => c !== nav)
      ;[nav, ...rest].forEach((el, i) => {
        if (!el) return
        play(el, [
          { opacity: 0, translate: '0 24px', scale: '0.96' },
          { opacity: 1, translate: '0 0', scale: '1' },
        ], 0.05 + i * 0.07, 0.6)
      })
    } else {
      const portrait = cards.find((c) => c.dataset.card === 'portrait')
      const nav = cards.find((c) => c.dataset.card === 'nav')
      if (!portrait || !nav) {
        frame.removeAttribute('data-entrance')
        return
      }

      // FLIP: measure the final layout, then animate from the inverted positions.
      const pC = centre(portrait.getBoundingClientRect())
      const fC = centre(frame.getBoundingClientRect())

      // 1. Frame
      play(frame, [{ opacity: 0, scale: '0.97' }, { opacity: 1, scale: '1' }], 0, 0.45)

      // 2. Portrait: centred in the frame at 1.28×, contracts into its slot
      play(portrait, [
        { translate: `${fC.x - pC.x}px ${fC.y - pC.y}px`, scale: '1.28' },
        { translate: '0 0', scale: '1' },
      ], 0.25, 0.6)

      // 3. Nav: a thin line above the portrait, then widens to full width
      const n = nav.getBoundingClientRect()
      const half = 30
      const lineX = Math.min(Math.max(pC.x, n.left + half), n.right - half)
      const v = n.height / 2 - 1.5
      const line = `inset(${v}px ${n.right - (lineX + half)}px ${v}px ${lineX - half - n.left}px round 999px)`
      play(nav, [{ opacity: 0 }, { opacity: 1 }], 0.3, 0.2, 'ease-out')
      play(nav, [{ clipPath: line }, { clipPath: 'inset(0px 0px 0px 0px round 20px)' }], 0.5, 0.5)

      // 4. Cards emerge from behind the portrait's centre, with a slight overshoot
      for (const card of cards) {
        const delay = CARD_DELAYS[card.dataset.card ?? '']
        if (delay === undefined) continue
        const c = centre(card.getBoundingClientRect())
        play(card, [{ translate: `${pC.x - c.x}px ${pC.y - c.y}px` }, { translate: '0 0' }], delay, 0.62)
        play(card, [
          { scale: '0.25', easing: EASE },
          { scale: '1.02', offset: 0.72, easing: 'ease-in-out' },
          { scale: '1' },
        ], delay, 0.7, 'linear')
        play(card, [{ opacity: 0 }, { opacity: 1 }], delay, 0.12, 'linear')
      }

      // 5. Content fades up in reading order (~30ms per step)
      for (const el of reveals) {
        const order = Number(el.dataset.reveal) || 1
        play(el, [{ opacity: 0, translate: '0 12px' }, { opacity: 1, translate: '0 0' }], 0.8 + (order - 1) * 0.03, 0.4)
      }
    }

    skipEvents.forEach((t) => window.addEventListener(t, finish, { capture: true, passive: true }))
    window.addEventListener('resize', onResize)
    Promise.all(anims.map((a) => a.finished)).then(finish, () => {})

    return () => {
      finished = true
      cleanup()
    }
  }, [frameRef])

  return initialAttr
}
