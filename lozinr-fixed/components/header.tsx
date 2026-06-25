'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  onWorkClick?: () => void
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

function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const scramble = useCallback(() => {
    let iteration = 0
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < iteration) return text[i]
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      iteration += 0.6
      if (iteration >= text.length) {
        clearInterval(intervalRef.current!)
        setDisplay(text)
      }
    }, 40)
  }, [text])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])
  return { display, scramble }
}

function DesktopNavItem({
  label,
  isActive,
  isDark,
  onClick,
}: {
  label: string
  isActive: boolean
  isDark: boolean
  onClick: () => void
}) {
  const { display, scramble } = useScramble(label)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={scramble}
      className={`text-[14px] md:text-[16px] font-medium tracking-tight transition-colors duration-300 text-foreground ${
        isDark ? 'md:text-black' : 'md:text-white'
      }`}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {display}
    </motion.button>
  )
}

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
  const { display, scramble } = useScramble(label)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={scramble}
      className={`text-[60px] font-medium tracking-tighter leading-[0.9em] transition-colors duration-200 ${
        isActive ? 'text-[#C4714F]' : 'text-foreground'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {display}
    </motion.button>
  )
}

export default function Header({ onWorkClick, preloaderDone = false }: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [showHeaderBg, setShowHeaderBg] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [isDarkMobile, setIsDarkMobile] = useState(false)
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

      // ── Background visibility: only show once past threshold from top,
      // and hide again once within threshold of the bottom of the page.
      const docHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight
      const distanceFromBottom = docHeight - (currentScrollY + windowHeight)

      const pastTop = currentScrollY > SCROLL_THRESHOLD
      const nearBottom = distanceFromBottom < SCROLL_THRESHOLD

      setShowHeaderBg(pastTop && !nearBottom)
      setIsDark(pastTop)
      setIsDarkMobile(currentScrollY > SCROLL_THRESHOLD_MOBILE)
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

  const navLinks = ['Work', 'Services', 'About', 'Contact']
  const desktopNavLinks = ['Work', 'Contact']

  const socialLinks = [
    { name: 'Instagram', link: 'https://www.instagram.com/lozinr/' },
    { name: 'Facebook', link: 'https://www.facebook.com/lozinr/' },
  ]

  const handleNavClick = (link: string) => {
    if (link === 'Home') router.push('/')
    else if (link === 'Work') { router.push('/work'); onWorkClick?.() }
    else if (link === 'Contact') window.open(CONTACT_LINK, '_blank', 'noopener,noreferrer')
  }

  // Mobile logo color: black when menu is open OR scrolled past mobile threshold, else white.
  const mobileLogoColor = isMenuOpen || isDarkMobile ? 'text-black' : 'text-white'
  // Desktop logo color: black once scrolled past desktop threshold, else white.
  const desktopLogoColor = isDark ? 'md:text-black' : 'md:text-white'

  // Hamburger lines follow the same mobile rule as the logo.
  const hamburgerColor = isMenuOpen || isDarkMobile ? 'bg-black' : 'bg-white'

  const Logo = () => (
    <svg
      viewBox="0 0 800 167.16"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 md:h-4 w-auto transition-colors duration-300 ${mobileLogoColor} ${desktopLogoColor}`}
    >
      <defs><style>{`.cls-1 { fill: currentColor; }`}</style></defs>
      <polygon className="cls-1" points="40.75 0 4.93 0 4.93 167.16 112.87 167.16 112.87 139.46 40.75 139.46 40.75 0"/>
      <path className="cls-1" d="M237.14,10.62c-12.16-7.08-26.17-10.62-42.02-10.62s-29.78,3.54-41.79,10.62c-12.01,7.08-21.44,16.89-28.28,29.44-6.85,12.55-10.27,27.05-10.27,43.52s3.42,30.98,10.27,43.52c6.85,12.55,16.28,22.36,28.28,29.44,12.01,7.08,25.94,10.62,41.79,10.62s29.86-3.54,42.02-10.62c12.16-7.08,21.59-16.89,28.28-29.44,6.7-12.54,10.04-27.05,10.04-43.52s-3.35-30.97-10.04-43.52c-6.7-12.54-16.13-22.36-28.28-29.44ZM234.83,111.4c-3.69,7.77-8.89,13.82-15.58,18.12-6.7,4.31-14.74,6.46-24.13,6.46s-17.01-2.15-23.78-6.46c-6.77-4.31-12.01-10.35-15.7-18.12-3.69-7.77-5.54-17.05-5.54-27.82s1.85-20.05,5.54-27.82c3.69-7.77,8.93-13.77,15.7-18.01,6.77-4.23,14.7-6.35,23.78-6.35s17.43,2.12,24.13,6.35c6.7,4.24,11.89,10.24,15.58,18.01,3.69,7.77,5.54,17.05,5.54,27.82s-1.85,20.05-5.54,27.82Z"/>
      <polygon className="cls-1" points="406.25 27.46 406.25 0 290.19 0 290.19 29.61 365.18 29.61 289.95 139.7 289.95 167.16 406.49 167.16 406.49 137.55 330.55 137.55 406.25 27.46"/>
      <rect className="cls-1" x="433.49" width="35.82" height="167.16"/>
      <polygon className="cls-1" points="605.44 109.85 532.13 0 496.31 0 496.31 167.16 532.13 167.16 532.13 57.79 605.44 167.16 641.26 167.16 641.26 0 605.44 0 605.44 109.85"/>
      <path className="cls-1" d="M795.07,167.16l-33.65-68.64c2.18-.81,4.25-1.73,6.18-2.76,8.91-4.78,15.48-11.06,19.7-18.87,4.22-7.8,6.33-16.16,6.33-25.07,0-9.55-2.19-18.23-6.57-26.03-4.38-7.8-11.07-14.05-20.06-18.75-9-4.69-20.26-7.04-33.79-7.04h-64.95v167.16h35.82v-64.24h20.79l29.6,64.24h40.6ZM704.08,29.85h26.98c8.91,0,15.48,2.11,19.7,6.33,4.22,4.22,6.33,9.91,6.33,17.07s-2.11,13.13-6.33,17.43c-4.22,4.3-10.79,6.45-19.7,6.45h-26.98V29.85Z"/>
    </svg>
  )

  return (
    <>
      {/* Fixed Navbar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[70] w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100, opacity: isHeaderVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background layer — fades in only between threshold from top and threshold from bottom */}
        <motion.div
          className="absolute inset-0 bg-background/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: showHeaderBg ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

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

          {/* Desktop Nav */}
          <motion.div
            className="hidden md:flex items-center gap-8 ml-auto"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: preloaderDone ? 1 : 0, y: preloaderDone ? 0 : -8 }}
            transition={{ duration: 0.5, delay: preloaderDone ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            {desktopNavLinks.map((link) => {
              const isActive =
                (link === 'Home'     && pathname === '/')         ||
                (link === 'Work'     && pathname === '/work')
              return (
                <DesktopNavItem
                  key={link}
                  label={link}
                  isActive={isActive}
                  isDark={isDark}
                  onClick={() => handleNavClick(link)}
                />
              )
            })}
          </motion.div>

          {/* Mobile Hamburger — also acts as the close button while menu is open */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1 cursor-pointer w-7 h-7 justify-center items-center flex-shrink-0 ml-auto z-[80]"
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
