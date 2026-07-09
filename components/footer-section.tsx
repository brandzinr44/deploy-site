'use client'

import { motion } from 'framer-motion'

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

export default function FooterSection() {


  return (
    <footer className="relative w-full bg-foreground">
      <div className="relative z-20 px-5 lg:px-6 pt-0 md:pt-0 pb-10 md:pb-14">

        {/* Row 0 — Divider with tagline */}
        <motion.div
          className="py-8 md:py-10 border-t border-background"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={0}
          variants={rowVariants}
        >
          <p className="md:text-[36px] text-[24px] text-background font-medium tracking-tight">Built for founders who think long term.</p>
        </motion.div>

        {/* Rows 1-3 — Main content with 40/60 split */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 border-t border-background py-8 md:py-10 gap-8 md:gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={1}
          variants={rowVariants}
        >
          {/* Left Side — 40% (col-span-2) */}
          <div className="md:col-span-2 flex flex-col gap-8 md:gap-10">
            {/* Nav */}
            <div>
              <span className="text-[16px] text-background font-medium block mb-4">Nav</span>
              <nav className="flex flex-col gap-0">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[16px] text-background underline underline-offset-4 decoration-background"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <span className="text-[16px] text-background font-medium block mb-4">Social</span>
              <div className="flex flex-col gap-0">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-background underline underline-offset-4 decoration-background"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <span className="text-[16px] text-background font-medium block mb-4">Address</span>
              <p className="text-[16px] text-background leading-snug">
                Based in Bangladesh<br />
                Working Worldwide.
              </p>
            </div>
          </div>

          {/* Right Side — 60% (col-span-3) - Grid layout */}
          <div className="md:col-span-3 md:pl-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {/* Work & Contact */}
              <div>
                <span className="text-[16px] text-background font-medium block mb-4">Work</span>
                <div className="flex flex-col gap-3">
                  <a
                    href="/work"
                    className="text-[16px] text-background underline underline-offset-4 decoration-background"
                  >
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div>
                <span className="text-[16px] text-background font-medium block mb-4">Contact</span>
                <a
                  href="mailto:adnanakif.co@gmail.com"
                  className="text-[16px] text-background underline underline-offset-4 decoration-background"
                >
                  Start a project
                </a>
              </div>

              {/* Empty column for spacing or future content */}
              <div></div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Logo - Full width container */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-5 lg:px-6 py-5 md:py-5 bg-foreground">
        <div className="flex justify-center">
          <img
            src="/footer-wordmark.svg"
            alt="Lozinr"
            className="w-full h-auto max-w-full"
          />
        </div>
      </div>
    </footer>
  )
}
