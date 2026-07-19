'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isActive, setIsActive] = useState(true)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    // Total duration: 2.6 seconds
    // 0.0s - 0.8s: Wordmark slides up, Logo follows
    // 0.8s - 2.0s: Hold and fade
    // 2.0s - 2.6s: Preloader exits, content reveals
    const timer = setTimeout(() => {
      setIsActive(false)
      onCompleteRef.current?.()
    }, 2600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Container for wordmark and logo */}
          <motion.div
            className="flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Wordmark - Slides up first */}
            <motion.img
              src="/wordmark.svg"
              alt="Lozinr Studio"
              className="h-6 w-auto"
              style={{ filter: 'invert(1)' }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0
              }}
            />

            {/* Logo - Follows wordmark with slight delay */}
            <motion.img
              src="/favicon.png"
              alt="Lozinr Logo"
              className="w-24 h-24 rounded-full"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15
              }}
            />
          </motion.div>

          {/* Background slide up to reveal content */}
          <motion.div
            className="absolute inset-0 bg-bg-background"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.8
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
