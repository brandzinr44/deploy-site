'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'

const Preloader = dynamic(() => import('@/components/preloader'), { ssr: false })

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function HomeWithPreloader() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [triggerHeroAnimation, setTriggerHeroAnimation] = useState(false)
  const doneRef = useRef(false)

  // stable reference — never changes, so preloader useEffect won't re-run
  const handleComplete = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    setPreloaderDone(true)
  }, [])

  useEffect(() => {
    if (preloaderDone) {
      const t = setTimeout(() => setTriggerHeroAnimation(true), 900)
      return () => clearTimeout(t)
    }
  }, [preloaderDone])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={handleComplete} />}

      <Header preloaderDone={preloaderDone} />

      <main>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.08 }}
        >
          <HeroSection triggerAnimation={triggerHeroAnimation} />
        </motion.div>
      </main>
    </>
  )
}
