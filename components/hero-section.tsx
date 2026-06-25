'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Work from '@/components/work'
import Process from '@/components/process'
import FooterSection from '@/components/footer-section'

interface HeroSectionProps {
  triggerAnimation?: boolean
}

const ROTATING_WORDS = ['Funded Founders', 'D2C Brands', 'SaaS Startups']

export default function HeroSection({ triggerAnimation = false }: HeroSectionProps) {
  const sectionRef = useRef<HTMLSectionElement>(null)
  const [wordIndex, setWordIndex] = useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -60])
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <main className="min-h-screen bg-foreground">

      {/* Hero Logo Section — space for preloader logo handoff */}
      <section ref={sectionRef} className="bg-transparent overflow-hidden pt-0 py-85 md:py-48">
        <div className="w-full px-3 lg:px-5" />
      </section>

      {/* Hero Content */}
      <section className="pt-0 md:pt-0 flex items-center justify-center min-h-[65vh] relative overflow-hidden bg-transparent">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="px-3 lg:px-6 pb-6 md:pb-8 relative z-20 w-full -translate-y-40 md:-translate-y-45"
        >
          <div className="flex flex-col gap-4 items-center justify-center">

            <div className="flex justify-center w-full relative z-20">
              <motion.h1
                layout
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-[32px] md:text-[52px] font-medium tracking-tighter leading-[1] text-white text-center flex items-center justify-center flex-wrap gap-x-[0.28em]"
              >
                <motion.span layout="position">Brands Built to Last for</motion.span>

                <motion.span
                  layout
                  transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                  className="relative inline-flex overflow-hidden h-[1em] align-middle"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={wordIndex}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="inline-block whitespace-nowrap"
                    >
                      {ROTATING_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              </motion.h1>
            </div>

          </div>
        </motion.div>
      </section>

      <Work />
      <Process />
      <FooterSection />
    </main>
  )
}