'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'
import { projectsData } from '@/lib/projects-data'

// ─── Magnetic CTA Button ──────────────────────────────────────────
function MagneticCTA() {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  return (
    <motion.button
      ref={ref}
      onClick={() => window.location.href = '/contact'}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: springX, y: springY }}
      className="w-full flex items-center gap-1"
    >
      <span className="flex-1 text-[16px] font-medium tracking-tight text-background bg-foreground rounded-full px-6 py-3 text-center">
        Start a project
      </span>
      <span className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 288.4 227.4" fill="currentColor" className="text-background">
          <path d="M227.6,6.9c-.2.2-.8.8-1.9,1.7-34.5,29.7-68.6,5.4-78.2-2.7l-4.8-4.1-21.2,33.5,4.5,3c1.4.9,27.7,17.8,54,16L33.4,200.9l23.9,23.9L203.6,78.5c-1.5,26.1,15.1,52,16,53.3l3,4.5,33.5-21.2-4.1-4.8c-12.9-15.2-18.5-30.9-16.8-46.6,1.4-12.5,7-22.4,11.6-28.5l8.5-8.5-23.8-23.8-4,4h.1Z" />
        </svg>
      </span>
    </motion.button>
  )
}

// ─── Data ─────────────────────────────────────────────────────────
const services = [
  {
    id: '01',
    title: 'Brand Identity',
    description:
      'A logo is a mark. A brand identity is a system. We build the complete visual language of your brand — everything from the symbol that represents you, to the colours, typography, and rules that hold it all together. The result is a brand that feels expensive before you see the price.',
    deliverables: [
      'Brand discovery & research',
      'Logo design & variants',
      'Colour palette',
      'Typography system',
      'Visual language & icons',
      'Brand guidelines document',
      'File export (all formats)',
    ],
  },
  {
    id: '02',
    title: 'Brand Strategy',
    description:
      'Before the logo comes the thinking. Strategy is the foundation that every design decision stands on. We define who you are, who you are for, and why they should choose you — then we turn that clarity into a positioning that makes your brand impossible to ignore.',
    deliverables: [
      'Brand purpose & mission',
      'Vision & values',
      'Positioning statement',
      'Ideal buyer persona',
      'Competitor analysis',
      'Brand personality',
      'Messaging framework',
      'Brand strategy document',
    ],
  },
]

// ─── Hero ─────────────────────────────────────────────────────────
function ServicesHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = '/services-hero.jpg'

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
          <Image
            src={heroImage}
            alt="Services"
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
          Services
        </motion.h1>
      </div>
    </div>
  )
}

// ─── Service Card ─────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  isLast,
}: {
  service: (typeof services)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="sticky top-0 w-full bg-background"
      style={{ zIndex: index + 1 }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] md:min-h-screen">

        {/* ── Col Left: number + nav (desktop only) ── */}
        <div className="hidden md:flex flex-col gap-8 px-2 lg:px-3 py-10">
          <motion.span
            className="font-light leading-none tracking-tighter text-foreground select-none text-[36px] lg:text-[46px]"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.id}
          </motion.span>

          <nav className="flex flex-col gap-0">
            {services.map((s, i) => (
              <motion.span
                key={s.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className={`text-[16px] tracking-tight uppercase leading-tighter transition-colors duration-200 ${
                  i === index ? 'text-foreground font-medium' : 'text-foreground/20'
                }`}
              >
                {s.title}
              </motion.span>
            ))}
          </nav>
        </div>

        {/* ── Col Mid: title + description + (mobile: list & CTA) ── */}
        <div className="flex flex-col gap-6 px-2 md:px-3 py-10 overflow-hidden">
          <div className="overflow-hidden">
            <motion.h2
              className="font-light tracking-tighter leading-[0.88] text-foreground text-[36px] lg:text-[46px]"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="md:hidden text-[16px] font-light text-foreground align-baseline mr-2 flex-shrink-0">
                {service.id}
              </span>
              {service.title}
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.p
              className="text-[16px] tracking-tighter uppercase leading-snug text-foreground font-regular"
              initial={{ y: '110%' }}
              animate={inView ? { y: 0 } : { y: '110%' }}
              transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {service.description}
            </motion.p>
          </div>

          {/* Mobile-only: deliverables + CTA */}
          <div className="md:hidden flex flex-col gap-6">
            <ul className="grid grid-cols-1 gap-x-4 gap-y-0">
              {service.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="py-2.5 text-[16px] tracking-tighter uppercase text-foreground leading-tight overflow-hidden"
                >
                  <motion.span
                    className="block"
                    initial={{ y: '100%' }}
                    animate={inView ? { y: 0 } : { y: '100%' }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item}
                  </motion.span>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticCTA />
            </motion.div>
          </div>
        </div>

        {/* ── Col Right: deliverables + CTA (desktop only) ── */}
        <div className="hidden md:flex flex-col justify-between px-3 py-10">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-0">
            {service.deliverables.map((item, i) => (
              <li
                key={i}
                className="py-2.5 text-[16px] tracking-tighter uppercase text-foreground leading-tight overflow-hidden"
              >
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={inView ? { y: 0 } : { y: '100%' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item}
                </motion.span>
              </li>
            ))}
          </ul>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticCTA />
          </motion.div>
        </div>

      </div>
    </motion.div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────
export default function ServicesClient() {
  return (
    <>
      <main className="min-h-screen bg-background flex flex-col">
        <Header preloaderDone={true} />

        {/* Hero */}
        <ServicesHero />

        {/* Sticky scroll service cards */}
        <div className="relative">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isLast={index === services.length - 1}
            />
          ))}
        </div>

        <FooterSection />
      </main>
    </>
  )
}
