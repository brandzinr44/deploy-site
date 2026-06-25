'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <>
      {/* initial={false} on AnimatePresence skips this on first page load —
          it only fires on real client-side navigations between routes */}
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
