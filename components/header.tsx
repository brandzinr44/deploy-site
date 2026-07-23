'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'



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



function DesktopNavItem({
  label,
  isActive,
}: {
  label: string
  isActive: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-[22px] font-normal tracking-tight overflow-hidden h-[30px] transition-colors duration-200 ${
        isActive ? 'text-[#C4714F]' : 'text-foreground'
      }`}
    >
      {/* Primary Text */}
      <motion.div
        className="flex"
        animate={{ y: isHovered ? -28 : 0 }}
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
        animate={{ y: isHovered ? -28 : 0 }}
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

function SocialLinkWithAnimation({
  social,
  index,
  onClose,
}: {
  social: { name: string; link: string }
  index: number
  onClose: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 group flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
    >
      {/* Social Name with Letter Animation */}
      <span className="text-[11px] md:text-[12px] font-normal tracking-wide uppercase text-foreground border border-foreground/40 rounded-full px-2 py-1 whitespace-nowrap overflow-hidden h-[24px] flex items-center">
        <motion.div className="flex" animate={{ y: isHovered ? -24 : 0 }} transition={{ duration: 0.4 }}>
          <div className="flex">
            {social.name.split('').map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 1, y: 0 }}
                animate={isHovered ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
                transition={{
                  delay: isHovered ? idx * 0.03 : 0,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
          <div className="flex">
            {social.name.split('').map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  delay: isHovered ? idx * 0.03 : 0,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </span>

      <span className="w-7 h-7 rounded-full border border-foreground/40 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-foreground" viewBox="0 0 10 10" fill="none">
          <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`text-[79px] font-regular tracking-tighter leading-[0.5em] overflow-hidden h-[70px] transition-colors duration-200 text-foreground`}
      style={{ fontFamily: 'var(--font-display)' }}
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
        animate={{ y: isHovered ? -28 : 0 }}
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

export default function Header() {
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

  const navLinks = ['Work', 'Contact', 'Store']

  const socialLinks = [
    { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif' },
  { name: 'Twitter', link: 'https://x.com/adnaanakif' },
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
      className={`h-4 md:h-6 w-auto transition-colors duration-300 ${mobileLogoColor} ${desktopLogoColor}`}
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
        animate={{ y: isHeaderVisible && !isMenuOpen ? 0 : -100, opacity: isHeaderVisible && !isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background layer — fades in only between threshold from top and threshold from bottom */}
      <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between gap-4 py-3 px-3 lg:px-6 lg:py-4 w-full">

          {/* Mobile: Left Logo | Desktop: Left Features + Store Nav */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* Mobile Logo */}
            <div
              className="md:hidden flex-shrink-0 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <Logo />
            </div>

            {/* Desktop Left Nav */}
            <div className="hidden md:flex items-center gap-1">
              <DesktopNavItem label="Features," isActive={false} />
              <DesktopNavItem label="Store," isActive={false} />
              <DesktopNavItem label="Jobs" isActive={false} />
            </div>
          </div>

          {/* Center: Logo (Desktop Only) */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 flex-shrink-0 cursor-pointer z-[80]"
            onClick={() => router.push('/')}
          >
            <Logo />
          </div>

          {/* Right: Store Icon + Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0 ml-auto z-[80]">
            {/* Store Icon */}
            <button className="flex items-center justify-center w-7 h-7 flex-shrink-0">
              <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>

            {/* Hamburger Menu — also acts as the close button while menu is open */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 cursor-pointer w-10 h-10 justify-center items-center flex-shrink-0 z-[100]"
            >
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fixed Hamburger Button (always visible) */}
      {isMenuOpen && (
        <motion.div
          className="fixed top-3 right-3 lg:top-5 lg:right-6 z-[101]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1 cursor-pointer w-10 h-10 justify-center items-center flex-shrink-0"
          >
            <motion.span
              className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      )}

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

            {/* Content layer — 3 Column Grid Layout */}
            <motion.div
              className="fixed inset-0 z-[61] flex items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              {/* Mobile Single Column — Full Width */}
              <div className="md:hidden flex flex-col items-start justify-start w-full py-20 px-6 gap-12">
                {/* Navigation Items — Top, Left-Aligned */}
                <div className="flex flex-col items-start justify-start w-full" style={{ lineHeight: '0.7' }}>
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

                {/* Social Links — Bottom, Single Row */}
                <div className="flex flex-row items-center gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <SocialLinkWithAnimation
                      key={social.name}
                      social={social}
                      index={index}
                      onClose={() => setIsMenuOpen(false)}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop 3-Column Layout */}
              <div className="hidden md:flex inset-0 w-full items-stretch">
                {/* Left Column — SVG Logo */}
                <div className="flex-1 border-r border-foreground flex items-start justify-center pt-8 px-6">
                  <img
                    src="/menu-logo.svg"
                    alt="Menu Logo"
                    className="h-70 w-auto"
                  />
                </div>

                {/* Middle Column — Navigation */}
                <div className="flex-1 border-r border-foreground flex flex-col justify-between py-8 px-6">
                  {/* Navigation Items — Top, Left-Aligned */}
                  <div className="flex flex-col items-start justify-start" style={{ lineHeight: '0.7' }}>
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

                  {/* Social Links — Bottom, Single Row */}
                  <div className="flex flex-row items-center gap-3 flex-nowrap">
                    {socialLinks.map((social, index) => (
                      <SocialLinkWithAnimation
                        key={social.name}
                        social={social}
                        index={index}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Column — Empty */}
                <div className="flex-1" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
