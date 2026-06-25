'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'
import { projectsData } from '@/lib/projects-data'

// ─── Hero ─────────────────────────────────────────────────────────
function ContactHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = projectsData.find(p => p.images[0] !== '#')?.images[0]

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: '100vh' }}
    >
      {heroImage && (
        <motion.div
          className="w-full h-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <Image
            src={heroImage}
            alt="Contact"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />

      <div className="absolute top-0 left-0 overflow-hidden px-2 lg:px-4 pt-20 lg:pt-36">
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-[59px] lg:text-[160px] font-regular text-white tracking-tighter text-left leading-tight"
        >
          Contact us
        </motion.h1>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────
export default function ContactClient() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header preloaderDone={true} />

      {/* Hero */}
      <ContactHero />

      <section className="flex-1 flex flex-col px-2 lg:px-4 pt-16">
        {/* Calendly Embed */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="w-full flex-1 py-10 lg:py-20 bg-background"
        >
          <iframe
            src="https://cal.com/adnanakif/30-min-meeting?embed=true"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a meeting"
            className="min-h-[600px] sm:min-h-[700px] md:min-h-[800px]"
          />
        </motion.div>
      </section>

      <FooterSection />
    </main>
  )
}