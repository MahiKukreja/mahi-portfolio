import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { m, useReducedMotion } from 'motion/react'

type HoverPreviewProps = {
  id: string
  anchor: DOMRect
  children: ReactNode
}

const WIDTH = 270
const OFFSET = 18
const EDGE = 12

/** Small floating card shown to the left of the hovered/focused row (desktop only). */
export function HoverPreview({ id, anchor, children }: HoverPreviewProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const anchorY = anchor.top + anchor.height / 2
  const [top, setTop] = useState(anchorY)

  // Centre on the row, but keep the whole card inside the viewport.
  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 0
    setTop(Math.min(Math.max(anchorY - h / 2, EDGE), window.innerHeight - h - EDGE))
  }, [anchorY])

  const left = Math.max(EDGE, anchor.left - WIDTH - OFFSET)

  return createPortal(
    <m.div
      ref={ref}
      id={id}
      role="tooltip"
      className="preview"
      style={{ left, top, width: WIDTH, ['--pointer-y' as string]: `${anchorY - top}px` }}
      initial={{ opacity: 0, x: reduce ? 0 : 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reduce ? 0 : 4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>,
    document.body,
  )
}
