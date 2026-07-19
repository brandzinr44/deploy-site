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
          <motion.div
            aria-hidden
            className="fixed inset-0 z-[9999] bg-background pointer-events-none"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ 
              duration: 0.9, 
              delay: 0.3,
              ease: [0.76, 0, 0.24, 1] 
            }}
            onAnimationComplete={() => {
              if (showWebReveal) {
                setShowWebReveal(false)
              }
            }}
          />
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
