'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'

export default function HomeWithPreloader() {
  const [triggerHeroAnimation, setTriggerHeroAnimation] = useState(false)

  useEffect(() => {
    setTriggerHeroAnimation(true)
  }, [])

  return (
    <>
      <Header />

      <main>
        <HeroSection triggerAnimation={triggerHeroAnimation} />
      </main>
    </>
  )
}
