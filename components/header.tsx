'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  preloaderDone?: boolean
}

// ─── Typography Scale (Inter — entire website) ───────────────────────────────
// H1  : text-[40px] md:text-[72px] font-semibold tracking-tighter
// H2  : text-[30px] md:text-[52px] font-semibold tracking-tighter
// H3  : text-[22px] md:text-[32px] font-medium  tracking-tight
// Body: text-[15px] md:text-[17px] font-normal  leading-relaxed
// Cap : text-[11px] md:text-[12px] font-normal  tracking-wide uppercase
// Nav : text-[14px] md:text-[16px] font-medium  tracking-tight
// Menu: text-[44px] font-semibold tracking-tighter (mobile full-screen menu)
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_LINK = 'https://cal.com/adnanakif/30-min-meeting'

// Distance (px) from top before header bg / dark text kicks in,
// and distance (px) from bottom before header bg hides again — desktop nav + bg.
const SCROLL_THRESHOLD = 800

// Separate, larger threshold for mobile logo + hamburger color flip.
const SCROLL_THRESHOLD_MOBILE = 1200



function MobileNavItem({
  label,
  isActive,
  delay,
  isMenuOpen,
  onClick,
}: {
  label: string
  isActive: boolean
  delay: number
  isMenuOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-[60px] font-medium tracking-tighter leading-[0.9em] overflow-hidden h-[60px] transition-colors duration-200 ${
        isActive ? 'text-[#C4714F]' : 'text-foreground'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Primary Text */}
      <motion.div
        className="flex"
        animate={{ y: isHovered ? -60 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {label.split('').map((char, index) => (
          <motion.span
            key={index}
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
        animate={{ y: isHovered ? -60 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {label.split('').map((char, index) => (
          <motion.span
            key={index}
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
    </motion.button>
  )
}

export default function Header({ preloaderDone = false }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)

  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollYRef.current
      if (currentScrollY < 50) {
        setIsHeaderVisible(true)
      } else if (isScrollingDown) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }
      lastScrollYRef.current = currentScrollY
    }

    handleScroll() // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const navLinks = ['Work', 'Contact', 'Template System']

  const socialLinks = [
    { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif' },
  { name: 'X', link: 'https://x.com/adnaanakif' },
  ]

  const handleNavClick = (link: string) => {
    if (link === 'Home') router.push('/')
    else if (link === 'Work') router.push('/work')
    else if (link === 'Template System') router.push('/template-system')
    else if (link === 'Contact') window.open(CONTACT_LINK, '_blank', 'noopener,noreferrer')
  }

  // Mobile logo and hamburger colors
  const mobileLogoColor = 'text-black'
  const desktopLogoColor = 'md:text-black'
  const hamburgerColor = 'bg-black'

  const Logo = () => (
    <img
      src="/wordmark.svg"
      alt="Lozinr"
      className={`h-4 md:h-5 w-auto transition-colors duration-300 ${mobileLogoColor} ${desktopLogoColor}`}
      style={{
        filter: 'invert(1)',
      }}
    />
  )

  return (
    <>
      {/* Fixed Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100, opacity: isHeaderVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background layer — fades in only between threshold from top and threshold from bottom */}
      <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between gap-4 py-3 px-3 lg:px-6 lg:py-4 w-full">

          {/* Logo */}
          <motion.div
            className="flex-shrink-0 cursor-pointer z-[80]"
            onClick={() => router.push('/')}
            initial={{ opacity: 0 }}
            animate={{ opacity: preloaderDone ? 1 : 0 }}
            transition={{ duration: 0.18, delay: preloaderDone ? 0.05 : 0 }}
          >
            <Logo />
          </motion.div>

          {/* Hamburger Menu — also acts as the close button while menu is open */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1 cursor-pointer w-7 h-7 justify-center items-center flex-shrink-0 ml-auto z-[80]"
            initial={{ opacity: 0 }}
            animate={{ opacity: preloaderDone ? 1 : 0 }}
            transition={{ duration: 0.4, delay: preloaderDone ? 0.1 : 0 }}
          >
            <motion.span
              className={`w-7 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`w-7 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu — Slide Down */}
      <AnimatePresence>
        {isMounted && isMenuOpen && (
          <>
            {/* Menu background — single layer slide down */}
            <motion.div
              className="fixed inset-0 z-[60] bg-background"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Content layer */}
            <motion.div
              className="fixed inset-0 z-[61] flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              {/* Nav Links */}
              <div className="flex flex-col items-center justify-center gap-0" style={{ lineHeight: '0.85' }}>
                {navLinks.map((link, index) => {
                  const isActive =
                    (link === 'Home'     && pathname === '/')         ||
                    (link === 'Work'     && pathname === '/work')     ||
                    (link === 'Services' && pathname === '/services') ||
                    (link === 'About'    && pathname === '/about')
                  return (
                    <MobileNavItem
                      key={link}
                      label={link}
                      isActive={isActive}
                      delay={0.28 + index * 0.07}
                      isMenuOpen={isMenuOpen}
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleNavClick(link)
                      }}
                    />
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 group"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-[11px] md:text-[12px] font-normal tracking-wide uppercase text-foreground border border-foreground/40 rounded-full px-2 py-1">
                      {social.name}
                    </span>
                    <span className="w-7 h-7 rounded-full border border-foreground/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-foreground" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
