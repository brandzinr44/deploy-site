'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Preloader from '@/components/preloader'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [showPreloader, setShowPreloader] = useState(true)
  const [showWebReveal, setShowWebReveal] = useState(true)

  useEffect(() => {
    // Only show preloader on first page load (not on subsequent navigations)
    if (showPreloader) {
      // Keep track that we've shown the preloader
      const hasShownPreloader = sessionStorage.getItem('preloaderShown')
      if (hasShownPreloader) {
        setShowPreloader(false)
        setShowWebReveal(false)
      } else {
        sessionStorage.setItem('preloaderShown', 'true')
      }
    }
  }, [])

  return (
    <>
      {/* Preloader on first load */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Web reveal animation - background shutter slides up on initial load */}
      <AnimatePresence>
        {showWebReveal && (
          <>
            {/* White background overlay */}
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[9999] bg-white pointer-events-none"
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ 
                duration: 1.1, 
                delay: 0.5,
                ease: [0.76, 0, 0.24, 1] 
              }}
              onAnimationComplete={() => {
                if (showWebReveal) {
                  setShowWebReveal(false)
                }
              }}
            />
            
            {/* Logo animation - slides up from bottom to center */}
            <motion.div
              aria-hidden
              className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
              initial={{ opacity: 1 }}
              exit={{ y: '-100%', opacity: 1 }}
              transition={{
                exit: {
                  duration: 1.1,
                  delay: 0.5,
                  ease: [0.76, 0, 0.24, 1]
                }
              }}
            >
              <motion.img
                src="/lozinr-wordmark.png"
                alt="Lozinr Studio"
                className="h-32 md:h-48 w-auto object-contain"
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  y: {
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.76, 0, 0.24, 1]
                  },
                  opacity: {
                    duration: 0.6,
                    delay: 0.4,
                    ease: 'easeOut'
                  }
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page transition overlay */}
      <AnimatePresence initial={false}>
        <motion.div
          key={pathname}
          aria-hidden
          className="fixed inset-0 z-[100] bg-foreground pointer-events-none"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          exit={{ y: 0, transition: { duration: 0 } }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
      </AnimatePresence>
      {children}
    </>
  )
}
