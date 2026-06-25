'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function HomeWithPreloader() {
  const [triggerHeroAnimation, setTriggerHeroAnimation] = useState(false)

  useEffect(() => {
    setTriggerHeroAnimation(true)
  }, [])

  return (
    <>
      <Header preloaderDone={true} />

      <main>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.08 }}
        >
          <HeroSection triggerAnimation={triggerHeroAnimation} />
        </motion.div>
      </main>
    </>
  )
}
