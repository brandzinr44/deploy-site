'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'
import TemplateProducts from '@/components/template-products'

// ─── Hero ─────────────────────────────────────────────────────────
function TemplateSystemHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = '/template-hero.jpg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      {heroImage && (
        <motion.div
          className="w-full h-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src={heroImage}
            alt="Template System"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Gradient */}
      <div className="absolute inset-0 bg-black/10" />

      {/* "Template System" title — bottom-left */}
      <div className="absolute bottom-0 left-0 overflow-hidden px-2 lg:px-4 pb-8 lg:pb-8">
        <motion.h1
          className="text-[40px] md:text-[108px] font-medium tracking-tighter leading-[0.9] text-white"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Template System
        </motion.h1>
      </div>
    </div>
  )
}

export default function TemplateSystemPage() {
  return (
    <>
      <Header preloaderDone={true} />
      <TemplateSystemHero />
      <TemplateProducts />
      <FooterSection />
    </>
  )
}
