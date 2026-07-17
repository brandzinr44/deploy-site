'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  
  { name: 'Work', href: '' },
  { name: 'Contact', href: '' },
]

const socialLinks = [
  { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif' },
  { name: 'X', link: 'https://x.com/adnaanakif' },
]

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
}

function AnimatedText({ text }: { text: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden h-6 cursor-pointer"
      transition={{ duration: 0.2 }}
    >
      {/* Primary Text */}
      <motion.div
        className="flex"
        animate={{ y: isHovered ? -24 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`primary-${index}`}
            initial={{ opacity: 1, y: 0 }}
            animate={
              isHovered
                ? {
                    opacity: 0,
                    y: -20,
                  }
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={{
              delay: isHovered ? index * 0.03 : index * 0.02,
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>

      {/* Secondary Text */}
      <motion.div
        className="flex"
        animate={{ y: isHovered ? -24 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`secondary-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHovered
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{
              delay: isHovered ? index * 0.03 : 0,
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isOutOfView, setIsOutOfView] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        setIsOutOfView(!entry.isIntersecting)
      },
      { margin: '-40px', threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const text = 'Lozinr Studio'
  
  return (
    <div ref={containerRef} className="w-full flex justify-center py-8">
      <div className="flex gap-0 w-fit -translate-x-3">
  {text.split("").map((char, index) => (
    <motion.span
      key={index}
      className="text-4xl md:text-[305px] font-medium tracking-tighter text-background leading-none"
      initial={{ y: 60, opacity: 0 }}
      animate={
        isInView
          ? { y: 0, opacity: 1 }
          : isOutOfView
          ? { y: -60, opacity: 0 }
          : { y: 60, opacity: 0 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ))}
</div>
    </div>
  )
}

export default function FooterSection() {


  return (
    <footer className="relative w-full bg-foreground">
      <div className="relative z-20 px-5 lg:px-6 pt-0 md:pt-0 pb-10 md:pb-14">

        {/* Row 0 — Divider with tagline */}
        <motion.div
          className="py-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={0}
          variants={rowVariants}
        >
          <p className="md:text-[36px] text-[18px] text-background font-medium tracking-tight">Built for founders who think long term.</p>
        </motion.div>

        {/* Row 1 — Nav */}
        <motion.div
          className="grid grid-cols-2 py-8 md:py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={1}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Nav</span>
          <nav className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[16px] text-background underline underline-offset-4 decoration-background w-fit"
              >
                <AnimatedText text={link.name} />
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Row 2 — Social */}
        <motion.div
          className="grid grid-cols-2 border-t border-background py-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={2}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Social</span>
          <div className="flex flex-col gap-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] text-background underline underline-offset-4 decoration-background w-fit"
              >
                <AnimatedText text={link.name} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Row 3 — Address */}
        <motion.div
          className="grid grid-cols-2 border-t border-background py-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={3}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Address</span>
          <div>
            <a
              href="mailto:adnan.lozinr@gmail.com"
              className="text-[16px] text-background underline underline-offset-4 decoration-background block mb-3 w-fit"
            >
              <AnimatedText text="Start a project" />
            </a>
            <p className="text-[16px] text-background leading-snug">
              Based in Bangladesh<br />
              Working Worldwide.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Logo - Full width container */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-5 lg:px-6 py-5 md:py-5 bg-foreground">
        <AnimatedLogo />
      </div>
    </footer>
  )
}
