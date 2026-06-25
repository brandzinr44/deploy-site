'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const LETTERS = [
  { d: "M40.75 0 L4.93 0 L4.93 167.16 L112.87 167.16 L112.87 139.46 L40.75 139.46 Z", ox: 58.9 },
  { d: "M237.14,10.62c-12.16-7.08-26.17-10.62-42.02-10.62s-29.78,3.54-41.79,10.62c-12.01,7.08-21.44,16.89-28.28,29.44-6.85,12.55-10.27,27.05-10.27,43.52s3.42,30.98,10.27,43.52c6.85,12.55,16.28,22.36,28.28,29.44,12.01,7.08,25.94,10.62,41.79,10.62s29.86-3.54,42.02-10.62c12.16-7.08,21.59-16.89,28.28-29.44,6.7-12.54,10.04-27.05,10.04-43.52s-3.35-30.97-10.04-43.52c-6.7-12.54-16.13-22.36-28.28-29.44ZM234.83,111.4c-3.69,7.77-8.89,13.82-15.58,18.12-6.7,4.31-14.74,6.46-24.13,6.46s-17.01-2.15-23.78-6.46c-6.77-4.31-12.01-10.35-15.7-18.12-3.69-7.77-5.54-17.05-5.54-27.82s1.85-20.05,5.54-27.82c3.69-7.77,8.93-13.77,15.7-18.01,6.77-4.23,14.7-6.35,23.78-6.35s17.43,2.12,24.13,6.35c6.7,4.24,11.89,10.24,15.58,18.01,3.69,7.77,5.54,17.05,5.54,27.82s-1.85,20.05-5.54,27.82Z", ox: 195.1 },
  { d: "M406.25 27.46 L406.25 0 L290.19 0 L290.19 29.61 L365.18 29.61 L289.95 139.7 L289.95 167.16 L406.49 167.16 L406.49 137.55 L330.55 137.55 Z", ox: 348.2 },
  { d: "M433.49 0 H469.31 V167.16 H433.49 Z", ox: 451.4 },
  { d: "M605.44 109.85 L532.13 0 L496.31 0 L496.31 167.16 L532.13 167.16 L532.13 57.79 L605.44 167.16 L641.26 167.16 L641.26 0 L605.44 0 Z", ox: 568.8 },
  { d: "M795.07,167.16l-33.65-68.64c2.18-.81,4.25-1.73,6.18-2.76,8.91-4.78,15.48-11.06,19.7-18.87,4.22-7.8,6.33-16.16,6.33-25.07,0-9.55-2.19-18.23-6.57-26.03-4.38-7.8-11.07-14.05-20.06-18.75-9-4.69-20.26-7.04-33.79-7.04h-64.95v167.16h35.82v-64.24h20.79l29.6,64.24h40.6ZM704.08,29.85h26.98c8.91,0,15.48,2.11,19.7,6.33,4.22,4.22,6.33,9.91,6.33,17.07s-2.11,13.13-6.33,17.43c-4.22,4.3-10.79,6.45-19.7,6.45h-26.98V29.85Z", ox: 748.7 },
]

const WM_VB_W = 800
const WM_VB_H = 167.16
const HEADER_H = 16
const HEADER_W = HEADER_H * (WM_VB_W / WM_VB_H)

type Phase =
  | 'fall'       // letters drop in staggered
  | 'pulse'      // wordmark breathes once
  | 'shatter'    // letters explode outward
  | 'void'       // black void — blank moment
  | 'rise'       // letters rise from below
  | 'settle'     // snap to header size
  | 'exit'       // fade to nothing
  | 'done'

// Deterministic random so StrictMode double-render gets same values
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

const STAGGER    = 0.07
const REVEAL_DUR = 0.65
const LAST_DONE  = (LETTERS.length - 1) * STAGGER + REVEAL_DUR  // ~1.0s

const getBigScale = (vpW: number) => Math.min(vpW * 0.52, 520) / HEADER_W

const EASE_FALL = [0.4, 0, 0.6, 1]  as const
const EASE_RISE = [0.2, 0, 0.2, 1]  as const
const EASE_OUT  = [0.16, 1, 0.3, 1] as const

// Scanline / glitch lines — rendered as SVG overlay
function GlitchLines({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <motion.div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.18, 0, 0.12, 0] }}
      transition={{ duration: 0.5, times: [0, 0.2, 0.5, 0.7, 1] }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: 0, right: 0,
            top: `${seededRand(i * 7) * 90}%`,
            height: `${1 + seededRand(i * 13) * 3}px`,
            background: 'currentColor',
            opacity: 0.6,
          }}
          initial={{ scaleX: 0, x: '-100%' }}
          animate={{ scaleX: 1, x: '100%' }}
          transition={{ duration: 0.18 + seededRand(i) * 0.2, delay: i * 0.04 }}
        />
      ))}
    </motion.div>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>('fall')
  const [vpW, setVpW]     = useState(1440)
  const onCompleteRef     = useRef(onComplete)

  // keep ref current without it being a dep of the timer effect
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    setVpW(window.innerWidth)
  }, [])

  // All timers in ONE effect with no external deps — immune to double-fire
  useEffect(() => {
    const revealEnd = 140 + LAST_DONE * 1000  // ~1280ms

    const t1 = setTimeout(() => setPhase('pulse'),   revealEnd + 80)
    const t2 = setTimeout(() => setPhase('shatter'), revealEnd + 700)
    const t3 = setTimeout(() => setPhase('void'),    revealEnd + 1350)
    const t4 = setTimeout(() => setPhase('rise'),    revealEnd + 1580)
    const t5 = setTimeout(() => setPhase('settle'),  revealEnd + 2400)
    const t6 = setTimeout(() => setPhase('exit'),    revealEnd + 2900)
    const t7 = setTimeout(() => {
      onCompleteRef.current()
    }, revealEnd + 3500)
    const t8 = setTimeout(() => setPhase('done'),    revealEnd + 3650)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      clearTimeout(t5); clearTimeout(t6); clearTimeout(t7); clearTimeout(t8)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === 'done') return null

  const bigScale = getBigScale(vpW)

  const isFall    = phase === 'fall'
  const isPulse   = phase === 'pulse'
  const isShatter = phase === 'shatter'
  const isVoid    = phase === 'void'
  const isRise    = phase === 'rise'
  const isSettle  = phase === 'settle'
  const isExit    = phase === 'exit'

  // shatter angles — deterministic
  const shatterAngles = useMemo(() =>
    LETTERS.map((_, i) => ({
      angle: (i / LETTERS.length) * Math.PI * 2 + seededRand(i * 3) * 0.8,
      dist:  260 + seededRand(i * 7) * 180,
      rot:   (seededRand(i * 11) - 0.5) * 140,
    }))
  , [])

  const wrapperScale = isSettle
    ? 1  // snap to actual header size
    : isExit
    ? bigScale * 0.92
    : isPulse
    ? bigScale * 1.02
    : bigScale

  const showWordmark = !isVoid

  return (
    <div
      className="text-foreground"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'var(--background)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* scanline glitch on shatter */}
      <GlitchLines active={isShatter} />

      {/* void flash */}
      <AnimatePresence>
        {isVoid && (
          <motion.div
            key="void"
            style={{ position: 'absolute', inset: 0, background: 'var(--background)', zIndex: 1 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.22, delay: 0.05 }}
          />
        )}
      </AnimatePresence>

      {/* wordmark wrapper */}
      <AnimatePresence>
        {showWordmark && (
          <motion.div
            key="wordmark"
            style={{
              position: 'absolute',
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
            }}
            initial={{ scale: bigScale, opacity: isFall ? 1 : 0 }}
            animate={{
              scale:   wrapperScale,
              opacity: isExit ? 0 : 1,
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              scale: isSettle
                ? { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
                : isExit
                ? { duration: 0.6, ease: EASE_OUT }
                : isPulse
                ? { duration: 0.8, ease: EASE_OUT }
                : { duration: 0 },
              opacity: { duration: 0.4, ease: EASE_OUT },
            }}
          >
            <svg
              viewBox={`0 0 ${WM_VB_W} ${WM_VB_H}`}
              xmlns="http://www.w3.org/2000/svg"
              width={HEADER_W}
              height={HEADER_H}
              style={{ display: 'block', overflow: 'visible' }}
            >
              {LETTERS.map((letter, i) => {
                const clipId = `lc-${i}`

                // ── FALL: drop in from above, clipped ─────────────────────
                if (isFall || isPulse) {
                  return (
                    <g key={i}>
                      {isFall && (
                        <defs>
                          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                            <rect x={letter.ox - 130} y={0} width={260} height={WM_VB_H} />
                          </clipPath>
                        </defs>
                      )}
                      <motion.g
                        clipPath={isFall ? `url(#${clipId})` : undefined}
                        initial={isFall ? { y: -(WM_VB_H + 20) } : false}
                        animate={{ y: 0 }}
                        transition={isFall ? {
                          duration: REVEAL_DUR,
                          delay: 0.14 + i * STAGGER,
                          ease: EASE_FALL,
                        } : { duration: 0 }}
                      >
                        <path d={letter.d} fill="currentColor" />
                      </motion.g>
                    </g>
                  )
                }

                // ── SHATTER: fly apart ────────────────────────────────────
                if (isShatter) {
                  const { angle, dist, rot } = shatterAngles[i]
                  return (
                    <motion.g
                      key={i}
                      style={{ transformOrigin: `${letter.ox}px 83px` }}
                      initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * dist,
                        y: Math.sin(angle) * dist,
                        rotate: rot,
                        scale: 0.2,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.03,
                        ease: [0.4, 0, 1, 1],
                      }}
                    >
                      <path d={letter.d} fill="currentColor" />
                    </motion.g>
                  )
                }

                // ── RISE: shoot up from below, clipped ───────────────────
                if (isRise) {
                  const rcId = `rc-${i}`
                  return (
                    <g key={i}>
                      <defs>
                        <clipPath id={rcId} clipPathUnits="userSpaceOnUse">
                          <rect x={letter.ox - 130} y={0} width={260} height={WM_VB_H} />
                        </clipPath>
                      </defs>
                      <motion.g
                        clipPath={`url(#${rcId})`}
                        initial={{ y: WM_VB_H + 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          y:       { duration: 0.65, delay: i * 0.05, ease: EASE_RISE },
                          opacity: { duration: 0.25, delay: i * 0.05 },
                        }}
                      >
                        <path d={letter.d} fill="currentColor" />
                      </motion.g>
                    </g>
                  )
                }

                // ── SETTLE / EXIT: static ─────────────────────────────────
                return (
                  <g key={i}>
                    <path d={letter.d} fill="currentColor" />
                  </g>
                )
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* thin progress line at bottom */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          height: '1px',
          background: 'currentColor',
          opacity: 0.15,
          transformOrigin: 'left center',
        }}
        initial={{ scaleX: 0, width: '100%' }}
        animate={{
          scaleX: isExit ? 0 : isSettle ? 1 : isRise ? 0.8 : isVoid ? 0 : isShatter ? 0.55 : isPulse ? 0.4 : 0.15,
        }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
    </div>
  )
}
