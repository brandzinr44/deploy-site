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
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    setPreloaderDone(true)
  }, [])

  return (
    <>
      {/* Preloader on first load */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

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
