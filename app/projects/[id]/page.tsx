'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { projectsData } from '@/lib/projects-data'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectName = typeof params.id === 'string' ? params.id : 'lozinr'
  const project = projectsData.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === projectName)
  const [preloaderDone, setPreloaderDone] = useState(true)
  const [showAbout, setShowAbout] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    challenge: true,
    strategy: true,
    process: true
  })

  const toggleSection = (section: 'challenge' | 'strategy' | 'process') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const heroSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(heroScroll, [0, 1], ['-12%', '12%'])

  // Prevent scroll when overlay is open
  useEffect(() => {
    if (showAbout) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'

      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [showAbout])

  if (!project) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#edefee] flex items-center justify-center">
          <p className="text-[#0e0c0a]/40 text-sm tracking-tight">Project not found</p>
        </main>
        <FooterSection />
      </>
    )
  }

  const validImages = project.images.filter(img => img && img !== '#')
  const galleryImages = validImages.slice(0, 10)
  const infoImage = validImages[0]

  const meta = {
    overview: project.overview,
    challengeDesc: project.challengeDesc,
    strategicDirection: project.strategicDirection,
    deliverables: project.deliverables || [],
    duration: project.duration,
  }

  const MetaGrid = ({ theme = 'light' as 'light' | 'dark', skipOverviewChallenge = false }) => {
    const labelClass = theme === 'dark' ? 'text-white/50' : 'text-foreground/40'
    const valueClass = theme === 'dark' ? 'text-white' : 'text-foreground'
    const borderClass = theme === 'dark' ? 'border-white/10' : 'border-foreground/10'

    return (
      <div className="pt-8">
        {!skipOverviewChallenge && meta.overview && (
          <div className={`pb-8 mb-8 border-b ${borderClass}`}>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Overview</p>
            <p className={`text-[16px] tracking-tight leading-relaxed ${valueClass}`}>{meta.overview}</p>
          </div>
        )}
        {!skipOverviewChallenge && meta.challengeDesc && (
          <div className={`pb-8 mb-8 border-b ${borderClass}`}>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Challenge</p>
            <p className={`text-[16px] tracking-tight leading-relaxed ${valueClass}`}>{meta.challengeDesc}</p>
          </div>
        )}
        {meta.strategicDirection && (
          <div className={`pb-8 mb-8 border-b ${borderClass}`}>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Strategic Direction</p>
            <p className={`text-[16px] tracking-tight leading-relaxed ${valueClass}`}>{meta.strategicDirection}</p>
          </div>
        )}
        {meta.deliverables.length > 0 && (
          <div className={`pb-8 mb-8 border-b ${borderClass}`}>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Deliverables</p>
            <div className="flex flex-wrap gap-2">
              {meta.deliverables.map((item: string, i: number) => (
                <span key={i} className={`text-[16px] tracking-tight ${valueClass}`}>
                  {item}
                  {i < meta.deliverables.length - 1 && <span className="mx-2">/</span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {meta.duration && (
          <div>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Duration</p>
            <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.duration}</p>
          </div>
        )}
      </div>
    )
  }

  const creativeWorkSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    image: validImages[0] || 'https://lozinr.com/favicon.svg',
    creator: { '@type': 'Organization', name: 'Lozinr', url: 'https://lozinr.com' },
    datePublished: new Date(project.year).toISOString(),
  }

  return (
    <>
      <Header preloaderDone={preloaderDone} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <main className="min-h-screen bg-background">

        {/* ─── Project Info ─── */}
        <section
  ref={heroSectionRef}
  className="relative overflow-hidden flex flex-col justify-end px-2 lg:px-4 pt-32 md:pt-40 pb-16 md:pb-24"
  style={{ minHeight: 'min(100vh, calc(100vw * 16 / 9))' }}
>
          {infoImage && (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: heroImageY }}
              >
                <Image
                  src={infoImage}
                  alt={project.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )}

          <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              <div>
                <h1
                  className="font-medium tracking-tight text-white leading-none mb-6"
                  style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                >
                  {project.name}
                </h1>
                <p className="text-[16px] text-white/80 leading-relaxed tracking-tight font-medium mb-8 max-w-[600px]">
                  {project.description}
                </p>
                <div className="flex gap-3 flex-wrap items-center">
                  {project.ctas.map((cta, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium tracking-tight">
                      {cta.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setShowAbout(true)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer transition-all duration-300 lg:self-end relative bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
            >
              <h3 className="text-[13px] font-medium tracking-tight text-white">Behind the Brand</h3>
              <span className="text-[18px] text-white/70">+</span>
            </motion.button>
          </div>
        </section>

        {/* ─── Behind the Brand Overlay ─── */}
        <AnimatePresence>
          {showAbout && (
            <motion.div
              onClick={() => setShowAbout(false)}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 top-0 left-0 right-0 bg-background z-[100] flex overflow-hidden"
              style={{ height: '100vh' }}
            >
              {/* Overlay content wrapper */}
              <div className="w-full h-full overflow-y-auto px-2 lg:px-4 pt-20 lg:pt-32 pb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto"
                >
                  {/* Left 50% */}
                  <div>
                    <h2 className="text-[40px] lg:text-[56px] font-medium tracking-tight text-foreground mb-12">
                      Behind the Brand
                    </h2>

                    {/* Overview Section */}
                    <div className="mb-12">
                      <h3 className="text-[14px] text-foreground/60 uppercase tracking-wide mb-4">Overview</h3>
                      <div className="space-y-4">
                        {project.detailOverview && project.detailOverview.body.split('\n').map((line, idx) => (
                          line.trim() && (
                            <p key={idx} className="text-[16px] tracking-tight leading-relaxed text-foreground">
                              {line}
                            </p>
                          )
                        ))}
                      </div>
                    </div>

                    {/* Challenge Section */}
                    <div>
                      <h3 className="text-[14px] text-foreground/60 uppercase tracking-wide mb-4">Challenge</h3>
                      <div className="space-y-4">
                        {project.detailChallenge && project.detailChallenge.body.split('\n').map((line, idx) => (
                          line.trim() && (
                            <p key={idx} className="text-[16px] tracking-tight leading-relaxed text-foreground">
                              {line}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right 50% */}
                  <div>
                    <MetaGrid theme="light" skipOverviewChallenge />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── For The Challenge Section ─── */}
        {project.detailChallenge && (
          <section className="relative px-2 lg:px-4 py-16 md:py-24 border-t border-foreground/10">
            {/* Absolute positioned button for mobile */}
            <button
              onClick={() => toggleSection('challenge')}
              className="absolute right-2 top-16 md:hidden"
              aria-label="Toggle challenge section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.challenge ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
            >
              {/* Left Column — 20% (Headline) */}
              <div className="md:col-span-1">
                <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                  Challenge
                </h2>
              </div>

              {/* Middle Column — 40% (Content) */}
              <AnimatePresence>
                {expandedSections.challenge && (
                  <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-[16px] font-medium tracking-tight text-foreground mb-8 uppercase">
                      {project.detailChallenge.thinking}
                    </p>
                    
                    <div className="space-y-4">
                      {project.detailChallenge.body.split('\n').map((line, idx) => (
                        line.trim() && (
                          <p key={idx} className="text-[16px] tracking-tight leading-tight text-foreground">
                            {line}
                          </p>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Absolute positioned button for desktop */}
            <button
              onClick={() => toggleSection('challenge')}
              className="hidden md:block absolute right-2 lg:right-4 top-16 md:top-24"
              aria-label="Toggle challenge section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.challenge ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>
          </section>
        )}

        {/* ─── Divider ─── */}
        <div className="h-px bg-foreground mx-2 lg:mx-4" />

        {/* ─── Strategy Section ─── */}
        {project.detailStrategy && (
          <section className="relative px-2 lg:px-4 py-16 md:py-24">
            {/* Absolute positioned button for mobile */}
            <button
              onClick={() => toggleSection('strategy')}
              className="absolute right-2 top-16 md:hidden"
              aria-label="Toggle strategy section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.strategy ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
            >
              {/* Left Column — 20% (Headline) */}
              <div className="md:col-span-1">
                <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                  Strategy
                </h2>
              </div>

              {/* Middle Column — 40% (Content) */}
              <AnimatePresence>
                {expandedSections.strategy && (
                  <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                <p className="text-[16px] font-medium tracking-tight text-foreground mb-12 uppercase">
                  {project.detailStrategy.thinking}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                  <div>
                    <p className="text-[16px] font-medium tracking-tight text-foreground uppercase mb-3">Positioning</p>
                    <p className="text-[16px] tracking-tight leading-tight text-foreground">
                      {project.detailStrategy.positioning}
                    </p>
                  </div>

                  <div>
                    <p className="text-[16px] font-medium tracking-tight text-foreground uppercase mb-3">Audience</p>
                    <p className="text-[16px] tracking-tight leading-tight text-foreground">
                      {project.detailStrategy.audience}
                    </p>
                  </div>

                  <div>
                    <p className="text-[16px] font-medium tracking-tight text-foreground uppercase mb-3">Brand Personality</p>
                    <div className="flex flex-wrap gap-3">
                      {project.detailStrategy.personality.map((trait, idx) => (
                        <span key={idx} className="px-4 py-1.5 rounded-full bg-foreground border border-foreground text-[16px] font-medium tracking-tight text-background">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[16px] font-medium tracking-tight text-foreground uppercase mb-3">Objective</p>
                    <p className="text-[16px] tracking-tight leading-tight text-foreground">
                      {project.detailStrategy.objective}
                    </p>
                  </div>
                </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Absolute positioned button for desktop */}
            <button
              onClick={() => toggleSection('strategy')}
              className="hidden md:block absolute right-2 lg:right-4 top-16 md:top-24"
              aria-label="Toggle strategy section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.strategy ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>
          </section>
        )}

        {/* ─── Divider ─── */}
        <div className="h-px bg-foreground mx-2 lg:mx-4" />

        {/* ─── Process Section ─── */}
        {project.detailProcess && (
          <section className="relative px-2 lg:px-4 py-16 md:py-24">
            {/* Absolute positioned button for mobile */}
            <button
              onClick={() => toggleSection('process')}
              className="absolute right-2 top-16 md:hidden"
              aria-label="Toggle process section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.process ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
            >
              {/* Left Column — 20% (Headline) */}
              <div className="md:col-span-1">
                <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                  Process
                </h2>
              </div>

              {/* Middle Column — 40% (Content) */}
              <AnimatePresence>
                {expandedSections.process && (
                  <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                <p className="text-[16px] font-medium tracking-tight text-foreground mb-12 uppercase">
                  Strong identities are built through decisions—not inspiration.
                </p>

                <div className="space-y-8 md:space-y-12">
                  {project.detailProcess.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                      className="flex gap-6 md:gap-8"
                    >
                      <div className="flex-shrink-0">
                        <span className="text-[32px] md:text-[40px] font-medium tracking-tight text-foreground">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[16px] font-medium tracking-tight text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[16px] tracking-tight leading-tight text-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

            {/* Absolute positioned button for desktop */}
            <button
              onClick={() => toggleSection('process')}
              className="hidden md:block absolute right-2 lg:right-4 top-16 md:top-24"
              aria-label="Toggle process section"
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ rotate: expandedSections.process ? 0 : 45 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </motion.svg>
            </button>
          </section>
        )}

        {/* ─── Images — no scroll animation ─── */}
        {/* ─── Logo Variations Section ─── */}
        <section className="px-2 lg:px-4 py-16 md:py-24 space-y-2">
          {/* Logo 01 - Grid Construction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen -mx-[calc(50vw-50%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%2002-KaqnpyY1ZifajnLEHfJvT9wKzQbmgq.png"
                alt="Lozinr Logo Construction Grid"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Logo 02 - Split Variation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen -mx-[calc(50vw-50%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%2003-LZ9wMZbuwTvqVREeQCyFU3Ukbv1ZLI.png"
                alt="Lozinr Logo and Typography Variation"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Logo 03 - Primary Lockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen -mx-[calc(50vw-50%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-HGJSSbYrWDNpMXahvFVPxKScz0knzm.png"
                alt="Lozinr Studio Primary Lockup"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* ─── Identity Section ─── */}
        <section className="px-2 lg:px-4 py-16 md:py-24 border-t border-foreground/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
          >
            {/* Left Column — 20% (Headline) */}
            <div className="md:col-span-1">
              <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                Identity
              </h2>
            </div>

            {/* Middle Column — 60% (Thinking Statement + Body) */}
            <div className="md:col-span-3">
              <div className="space-y-6">
                <div>
                  <p className="text-[14px] font-medium tracking-tight text-foreground/50 uppercase mb-2">
                    Thinking Statement
                  </p>
                  <p className="text-[16px] tracking-tight text-foreground leading-relaxed">
                    Recognition comes from repetition, not complexity.
                  </p>
                </div>
                <div>
                  <p className="text-[14px] font-medium tracking-tight text-foreground/50 uppercase mb-2">
                    Body
                  </p>
                  <p className="text-[16px] tracking-tight text-foreground leading-relaxed">
                    The identity was designed as a flexible system—not a single logo. Every variation follows the same principles, making the brand recognizable across every touchpoint.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column — 20% (Empty) */}
            <div className="md:col-span-1"></div>
          </motion.div>
        </section>

        {/* ─── Typography & Color Images ─── */}
        <section className="px-2 lg:px-4 py-16 md:py-24 space-y-2">
          {/* Typography Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen -mx-[calc(50vw-50%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Typography-cq2D7qokmf5awn4uIFOIjwdi8hBWr6.png"
                alt="Helvetica Neue Typography System"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Color Palette Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-screen -mx-[calc(50vw-50%)]"
          >
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2040-k58aXEAs8w3raJoN8gRlYBndSRP7UF.png"
                alt="Color Palette - Autumn Orange, Off-White, Charcoal"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* ─── Visual Identity Section ─── */}
        <section className="px-2 lg:px-4 py-16 md:py-24 border-t border-foreground/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
          >
            {/* Left Column — 20% (Headline) */}
            <div className="md:col-span-1">
              <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                Visual Identity
              </h2>
            </div>

            {/* Middle Column — 60% (Thinking Statement + Content) */}
            <div className="md:col-span-3">
              <div className="space-y-6">
                <div>
                  <p className="text-[14px] font-medium tracking-tight text-foreground/50 uppercase mb-2">
                    Thinking Statement
                  </p>
                  <p className="text-[16px] tracking-tight text-foreground leading-relaxed">
                    Every visual choice should reinforce the same perception.
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-medium tracking-tight text-foreground/50 uppercase mb-2">
                    Color
                  </p>
                  <p className="text-[16px] tracking-tight text-foreground leading-relaxed">
                    Three colors. One purpose. Confidence through restraint.
                  </p>
                </div>

                <div>
                  <p className="text-[14px] font-medium tracking-tight text-foreground/50 uppercase mb-2">
                    Typography
                  </p>
                  <p className="text-[16px] tracking-tight text-foreground leading-relaxed">
                    One type family. Nine weights. Unlimited flexibility. Helvetica Neue became the foundation of the entire system because consistency scales better than variety.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column — 20% (Empty) */}
            <div className="md:col-span-1"></div>
          </motion.div>
        </section>

        {/* ─── Reflection Section ─── */}
        {project.reflection && (
          <section className="px-2 lg:px-4 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4"
            >
              {/* Left Column — 20% */}
              <div className="md:col-span-1">
                <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight text-foreground leading-tight">
                  Reflection
                </h2>
              </div>

              {/* Middle Column — 40% */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <p className="text-[16px] leading-tight tracking-tight text-foreground font-regular">
                    {project.reflection.line1}
                  </p>
                  <p className="text-[16px] leading-tight leading-tight tracking-tight text-foreground font-regular">
                    {project.reflection.line2}
                  </p>
                  <p className="text-[16px] leading-tight leading-tight tracking-tight text-foreground font-regular">
                    {project.reflection.line3}
                  </p>
                </div>
              </div>

              {/* Right Column — 40% (Empty) */}
              <div className="md:col-span-2"></div>
            </motion.div>
          </section>
        )}

      </main>
      <FooterSection />
    </>
  )
}