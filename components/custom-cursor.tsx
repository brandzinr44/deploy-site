'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [supported, setSupported] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    setSupported(hasFinePointer)
    if (!hasFinePointer) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsVisible(true)
    }
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(
        !!target.closest('a, button, [role="button"], input, textarea, select')
      )
    }
    const hide = () => setIsVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseleave', hide)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseleave', hide)
    }
  }, [x, y])

  if (!supported) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[200] pointer-events-none rounded-full"
        style={{
          x: prefersReducedMotion ? x : springX,
          y: prefersReducedMotion ? y : springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 44 : 8,
          height: isPointer ? 44 : 8,
          border: isPointer ? '1px solid var(--accent)' : 'none',
          background: isPointer ? 'transparent' : 'var(--accent)',
          opacity: isVisible ? 1 : 0,
          transition:
            'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s, border 0.2s, opacity 0.2s',
        }}
      />
      {/* @media gate keeps this from ever hiding the native cursor on touch devices,
          independent of the JS state above */}
      <style jsx global>{`
        @media (pointer: fine) {
          a, button, [role='button'], input, select, textarea, body {
            cursor: none;
          }
        }
      `}</style>
    </>
  )
}
