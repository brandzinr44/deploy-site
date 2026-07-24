'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, FormEvent } from 'react'

const navLinks = [
  
  { name: 'Work', href: '' },
  { name: 'Contact', href: '' },
]

const socialLinks = [
  { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif' },
  { name: 'Twitter', link: 'https://x.com/adnaanakif' },
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
      className="overflow-hidden cursor-pointer leading-none"
      style={{ height: '1.2em' }}
      transition={{ duration: 0.2 }}
    >
      {/* Primary Text */}
      <motion.div
        className="flex leading-none"
        style={{ height: '1.2em' }}
        animate={{ y: isHovered ? '-1.2em' : '0em' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`primary-${index}`}
            initial={{ opacity: 1, y: '0em' }}
            animate={
              isHovered
                ? {
                    opacity: 0,
                    y: '-1em',
                  }
                : {
                    opacity: 1,
                    y: '0em',
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
        className="flex leading-none"
        style={{ height: '1.2em' }}
        animate={{ y: isHovered ? '-1.2em' : '0em' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={`secondary-${index}`}
            initial={{ opacity: 0, y: '1em' }}
            animate={
              isHovered
                ? {
                    opacity: 1,
                    y: '0em',
                  }
                : {
                    opacity: 0,
                    y: '1em',
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
    <div ref={containerRef} className="w-full flex justify-center py-0">
      <div className="flex gap-0 w-fit lg:-translate-x-3 -translate-x-1">
  {text.split("").map((char, index) => (
    <motion.span
      key={index}
      className="text-[clamp(65px,18vw,310px)] font-medium tracking-tighter text-foreground leading-none"
      initial={{ y: 60, opacity: 0 }}
      animate={
        isInView
          ? { y: 0, opacity: 1 }
          : isOutOfView
          ? { y: -60, opacity: 0 }
          : { y: 60, opacity: 0 }
      }
      transition={{
        duration: 0.3,
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

function NewsletterRow() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage('Thank you for subscribing!')
        setEmail('')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Error submitting email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="grid grid-cols-2 border-t border-foreground py-3 md:py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: '-40px' }}
      custom={3}
      variants={rowVariants}
    >
      <span className="text-[20px] text-foreground font-regular uppercase">Newsletter</span>
      <div className="flex items-center justify-end">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="border border-foreground px-4 py-3 flex items-center justify-between gap-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-[20px] text-foreground placeholder-foreground outline-none flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !email}
              className="text-[20px] text-foreground font-regular whitespace-nowrap  disabled:opacity-50"
            >
              {isLoading ? 'Sending...' : 'Enter'}
            </button>
          </div>
          {message && (
            <p className="text-[20px] text-foreground mt-2">{message}</p>
          )}
        </form>
      </div>
    </motion.div>
  )
}

export default function FooterSection() {


  return (
    <footer className="relative w-full bg-background">
      <div className="relative z-20 px-5 lg:px-6 pt-0 md:pt-0 pb-1 md:pb-4">

        {/* Row 0 — Nav */}
        <motion.div
          className="grid grid-cols-2 py-3 md:py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={0}
          variants={rowVariants}
        >
          <span className="text-[20px] text-foreground font-regular uppercase">Nav</span>
          <nav className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[20px] text-foreground underline underline-offset-4 decoration-foreground w-fit"
              >
                <AnimatedText text={link.name} />
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Row 1 — Social */}
        <motion.div
          className="grid grid-cols-2 border-t border-foreground py-3 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={1}
          variants={rowVariants}
        >
          <span className="text-[20px] text-foreground font-regular uppercase">Social</span>
          <div className="flex flex-col gap-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[20px] text-foreground underline underline-offset-4 decoration-foreground w-fit"
              >
                <AnimatedText text={link.name} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Row 2 — Address */}
        <motion.div
          className="grid grid-cols-2 border-t border-foreground py-3 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={2}
          variants={rowVariants}
        >
          <span className="text-[20px] text-foreground font-regular uppercase">Address</span>
          <div>
            <a
              href="mailto:adnan.lozinr@gmail.com"
              className="text-[20px] text-foreground underline underline-offset-4 decoration-foreground block mb-3 w-fit"
            >
              <AnimatedText text="Start a project" />
            </a>
            <p className="text-[20px] text-foreground leading-snug">
              Based in Bangladesh<br />
              Working Worldwide.
            </p>
          </div>
        </motion.div>

        {/* Row 3 — Newsletter */}
        <NewsletterRow />

      </div>

      {/* Logo - Full width container */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-5 lg:px-6 py-0 bg-background">
        <AnimatedLogo />
      </div>
    </footer>
  )
}