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

// ─── Content fade/hide variants (used for everything in the header EXCEPT
// the hamburger button) — replaces the old whole-header slide-up. ─────────────
const contentGroupVariants = {
  visible: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 as const },
  },
  hidden: {
    transition: { staggerChildren: 0.035 },
  },
}

const contentItemVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.96,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] as const },
  },
}

// Desktop left-nav items — no mount/reveal animation. Hover behaves exactly
// like the full-screen menu nav hover: text slides up and out while a
// letter-by-letter staggered duplicate slides up into view. No accent color.
function DesktopNavItem({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-[20px] md:text-[20px] font-normal tracking-tight h-full px-2 flex items-center overflow-hidden"
    >
      <div className="overflow-hidden h-6 relative">
        <motion.div
          animate={{ y: isHovered ? -24 : 0 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary text */}
          <div className="h-6 flex items-center whitespace-nowrap">
            {label}
          </div>

          {/* Secondary text — letters stagger in on hover, same pattern as MobileNavItem */}
          <div className="h-6 flex items-center whitespace-nowrap">
            {label.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: isHovered ? i * 0.025 : 0, duration: 0.4, ease: 'easeOut' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </button>
  )
}

function ArrowGlyph({ color }: { color: string }) {
  return (
    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" style={{ color }} viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Social links now fade/slide in on menu open and reverse (fade/slide out,
// reverse stagger order) on menu close — mirrors the open animation.
function SocialLinkWithAnimation({
  social,
  index,
  enterDelay,
  exitDelay,
  isMenuOpen,
  onClose,
}: {
  social: { name: string; link: string }
  index: number
  enterDelay: number
  exitDelay: number
  isMenuOpen: boolean
  onClose: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [introPlayed, setIntroPlayed] = useState(false)
  const slideTransition = { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }

  useEffect(() => {
    if (!isMenuOpen) {
      setIntroPlayed(false)
      return
    }
    const playTimer = setTimeout(() => setIntroPlayed(true), enterDelay * 1000)
    const resetTimer = setTimeout(() => setIntroPlayed(false), enterDelay * 1000 + 650)
    return () => {
      clearTimeout(playTimer)
      clearTimeout(resetTimer)
    }
  }, [isMenuOpen, enterDelay])

  const active = isHovered || introPlayed

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClose}
      className="flex items-center gap-1.5 flex-shrink-0"
      initial={{ opacity: 0, y: 16 }}
      animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={
        isMenuOpen
          ? { delay: enterDelay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
          : { delay: exitDelay, duration: 0.4, ease: [0.65, 0, 0.35, 1] }
      }
    >
      {/* Text pill — border only, filled layer rises up from the bottom on hover (and once on menu open) */}
      <div className="relative rounded-full border border-foreground/40 overflow-hidden">
        {/* Invisible sizer — gives the pill its width/height from content */}
        <span className="invisible flex items-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap">
          {social.name}
        </span>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap text-foreground"
          animate={{ y: active ? '-100%' : '0%' }}
          transition={slideTransition}
        >
          {social.name}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[16px] font-normal tracking-wide uppercase whitespace-nowrap bg-foreground text-background"
          initial={{ y: '100%' }}
          animate={{ y: active ? '0%' : '100%' }}
          transition={slideTransition}
        >
          {social.name}
        </motion.div>
      </div>

      {/* Arrow circle — separate element, own border-only + bottom-up fill reveal */}
      <div className="hidden md:block relative w-7 h-7 rounded-full border border-foreground/40 overflow-hidden flex-shrink-0">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: active ? '-100%' : '0%' }}
          transition={slideTransition}
        >
          <ArrowGlyph color="var(--foreground)" />
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-foreground"
          initial={{ y: '100%' }}
          animate={{ y: active ? '0%' : '100%' }}
          transition={slideTransition}
        >
          <ArrowGlyph color="var(--background)" />
        </motion.div>
      </div>
    </motion.a>
  )
}

// Mobile/menu nav items — letters stagger IN on open (top-down order),
// and stagger OUT in reverse (last item exits first, last letter exits first)
// on close, mirroring the open animation.
function MobileNavItem({
  label,
  isActive,
  enterDelay,
  exitDelay,
  isMenuOpen,
  onClick,
}: {
  label: string
  isActive: boolean
  enterDelay: number
  exitDelay: number
  isMenuOpen: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) setHasEntered(false)
  }, [isMenuOpen])

  const primaryVisible = isMenuOpen && !isHovered
  const secondaryVisible = isHovered
  const charCount = label.length

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-[79px] font-regular tracking-tighter leading-none overflow-hidden h-[96px] relative block text-foreground"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <div className="overflow-hidden h-[96px]">
        {/* Hover swap wrapper */}
        <motion.div
          animate={{ y: isHovered ? -96 : 0 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Primary Text — letter by letter reveal on open, reverse letter-by-letter on close */}
          <div className="flex h-[96px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  primaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: isHovered ? -20 : 40 }
                }
                transition={
                  isMenuOpen
                    ? hasEntered
                      ? { delay: isHovered ? index * 0.025 : 0, duration: 0.5, ease: 'easeOut' }
                      : { delay: enterDelay + index * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    : {
                        delay: exitDelay + (charCount - 1 - index) * 0.03,
                        duration: 0.4,
                        ease: [0.65, 0, 0.35, 1],
                      }
                }
                onAnimationComplete={() => {
                  if (!hasEntered && isMenuOpen) setHasEntered(true)
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Secondary Text — hover only */}
          <div className="flex h-[96px] items-center">
            {label.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  secondaryVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  delay: isHovered ? index * 0.025 : 0,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </button>
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
    { name: 'YouTube', link: 'https://www.youtube.com/@adnaanakif' },
  ]

  const handleNavClick = (link: string) => {
    if (link === 'Home') router.push('/')
    else if (link === 'Work') router.push('/work')
    else if (link === 'Store') router.push('/store')
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
      {/* Fixed Navbar — the bar itself never moves anymore. Only its inner
          content (logo/nav/store icon) fades out smoothly; the hamburger
          stays put and simply morphs into an X. */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] w-full"
        initial={{ y: -80, opacity: 0, filter: 'blur(6px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Background layer */}
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 flex items-center justify-between gap-4 py-3 px-3 lg:px-6 lg:py-4 w-full">

          {/* Content that fades/hides together as a staggered group */}
          <motion.div
            className="flex items-center gap-6 flex-shrink-0"
            variants={contentGroupVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
          >
            {/* Mobile Logo */}
            <motion.div
              variants={contentItemVariants}
              className="md:hidden flex-shrink-0 cursor-pointer"
              onClick={() => router.push('/')}
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Left Nav */}
            <motion.div
              variants={contentItemVariants}
              className="hidden md:flex items-center gap-1"
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <DesktopNavItem label="Features," onClick={() => router.push('/')} />
              <DesktopNavItem label="Store," onClick={() => router.push('/store')} />
              <DesktopNavItem label="Jobs" onClick={() => router.push('/')} />
            </motion.div>
          </motion.div>

          {/* Center: Logo (Desktop Only) */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 flex-shrink-0 cursor-pointer z-[80]"
            onClick={() => router.push('/')}
            variants={contentItemVariants}
            initial="visible"
            animate={isMenuOpen ? 'hidden' : 'visible'}
            style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
          >
            <Logo />
          </motion.div>

          {/* Right: Store Icon + Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0 ml-auto z-[80]">
            {/* Store Icon — fades with the rest of the content */}
            <motion.button
              onClick={() => router.push('/store')}
              className="flex items-center justify-center w-7 h-7 flex-shrink-0"
              variants={contentItemVariants}
              initial="visible"
              animate={isMenuOpen ? 'hidden' : 'visible'}
              style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
            >
              <svg className="w-6 h-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </motion.button>

            {/* Hamburger — stays in place, always clickable, just morphs to X */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 cursor-pointer w-10 h-10 justify-center items-center flex-shrink-0 z-[100]"
            >
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.span
                className={`w-9 h-0.5 ${hamburgerColor} rounded-full origin-center transition-colors duration-300`}
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              />
            </button>
          </div>
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

            {/* Content layer — 3 Column Grid Layout */}
            <motion.div
              className="fixed inset-0 z-[61] flex items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
            >
              {/* Mobile Single Column — Stacked with Dividers */}
              <div className="md:hidden flex flex-col w-full h-full">
                {/* Top — SVG Logo (reduced height) */}
                <div className="flex-none h-[140px] border-b border-foreground flex items-start justify-start pt-8 px-4 overflow-hidden">
                  <motion.img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wordmark-gWRKyZ4BOkFw33ZwV4Vk6N0fZMNDAc.png"
                    alt="Lozinr Studio"
                    className="h-20 w-auto"
                    initial={{ clipPath: 'inset(0 0 100% 0)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0)' }}
                    exit={{ clipPath: 'inset(0 0 100% 0)' }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>

                {/* Middle — Nav + Social Links */}
                <div className="flex-1 border-b border-foreground flex flex-col justify-center pt-12 pb-8 px-4">
                  {/* Navigation Items — Top, Left-Aligned */}
                  <div className="flex flex-col items-start justify-start -space-y-6">
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
                          enterDelay={0.28 + index * 0.09}
                          exitDelay={(navLinks.length - 1 - index) * 0.09}
                          isMenuOpen={isMenuOpen}
                          onClick={() => {
                            setIsMenuOpen(false)
                            handleNavClick(link)
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* Social Links — extra gap from nav above */}
                  <div className="flex flex-row items-center gap-3 flex-wrap mt-16">
                    {socialLinks.map((social, index) => (
                      <SocialLinkWithAnimation
                        key={social.name}
                        social={social}
                        index={index}
                        enterDelay={0.28 + navLinks.length * 0.09 + index * 0.08}
                        exitDelay={(socialLinks.length - 1 - index) * 0.08}
                        isMenuOpen={isMenuOpen}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom — Empty */}
                <div className="flex-1" />
              </div>

              {/* Desktop 2-Column Layout */}
              <div className="hidden md:flex inset-0 w-full items-stretch">
                {/* Left Column — Navigation */}
                <div className="flex-1 border-r border-foreground flex flex-col justify-between pt-16 pb-8 px-6">
                  {/* Navigation Items — Top, Left-Aligned */}
                  <div className="flex flex-col items-start justify-start -space-y-6">
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
                          enterDelay={0.28 + index * 0.09}
                          exitDelay={(navLinks.length - 1 - index) * 0.09}
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
                        enterDelay={0.28 + navLinks.length * 0.09 + index * 0.08}
                        exitDelay={(socialLinks.length - 1 - index) * 0.08}
                        isMenuOpen={isMenuOpen}
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