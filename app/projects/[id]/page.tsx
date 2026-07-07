'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { projectsData } from '@/lib/projects-data'
import Image from 'next/image'
import { useRef, useState } from 'react'
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

  const heroSectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(heroScroll, [0, 1], ['-12%', '12%'])

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

  const MetaGrid = ({ theme = 'light' as 'light' | 'dark' }) => {
    const labelClass = theme === 'dark' ? 'text-white/50' : 'text-foreground/40'
    const valueClass = theme === 'dark' ? 'text-white' : 'text-foreground'
    const borderClass = theme === 'dark' ? 'border-white/10' : 'border-foreground/10'

    return (
      <div className="pt-8">
        {meta.overview && (
          <div className={`pb-8 mb-8 border-b ${borderClass}`}>
            <p className={`text-[16px] tracking-tight mb-4 ${labelClass}`}>Overview</p>
            <p className={`text-[16px] tracking-tight leading-relaxed ${valueClass}`}>{meta.overview}</p>
          </div>
        )}
        {meta.challengeDesc && (
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
            <div className="absolute inset-0 w-screen -mx-[calc(50vw-50%)] overflow-hidden">
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
              <div className="absolute inset-0 bg-black/55" />
            </div>
          )}

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-24">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="font-medium tracking-tight text-white leading-none mb-6"
                  style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                >
                  {project.name}
                </h1>
                <p className="text-[16px] text-white/80 leading-relaxed tracking-tight font-medium mb-8 max-w-[600px]">
                  {project.description}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {project.ctas.map((cta, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium tracking-tight">
                      {cta.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="lg:w-48 lg:flex lg:flex-col lg:justify-end lg:self-end"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <button
                onClick={() => setShowAbout(v => !v)}
                aria-expanded={showAbout}
                className="flex items-center justify-between lg:justify-start lg:gap-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors rounded-lg px-4 py-3 w-full text-left cursor-pointer"
              >
                <h3 className="text-[16px] font-medium tracking-tight text-white">Behind the Brand</h3>
                <span className={`text-[18px] text-white/70 transition-transform duration-300 ${showAbout ? 'rotate-45' : ''}`}>+</span>
              </button>

              <AnimatePresence initial={false}>
                {showAbout && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:hidden overflow-hidden"
                  >
                    <p className="text-[16px] text-white/80 leading-relaxed tracking-tight pt-4">
                      {project.description}
                    </p>
                    <MetaGrid theme="dark" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ─── For The Challenge Section ─── */}
        {project.detailChallenge && (
          <section className="px-2 lg:px-4 py-16 md:py-24 border-t border-foreground/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <h2 className="text-[32px] md:text-[56px] font-medium tracking-tight text-foreground mb-12 leading-tight">
                For The Challenge
              </h2>
              
              <p className="text-[16px] font-medium tracking-tight text-foreground/60 mb-8 uppercase">
                {project.detailChallenge.thinking}
              </p>
              
              <div className="space-y-6">
                {project.detailChallenge.body.split('\n').map((line, idx) => (
                  line.trim() && (
                    <p key={idx} className="text-[16px] tracking-tight leading-relaxed text-foreground">
                      {line}
                    </p>
                  )
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ─── Divider ─── */}
        <div className="h-px bg-foreground/10 mx-2 lg:mx-4" />

        {/* ─── Strategy Section ─── */}
        {project.detailStrategy && (
          <section className="px-2 lg:px-4 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <h2 className="text-[32px] md:text-[56px] font-medium tracking-tight text-foreground mb-12 leading-tight">
                Strategy
              </h2>
              
              <p className="text-[16px] font-medium tracking-tight text-foreground/60 mb-12 uppercase">
                {project.detailStrategy.thinking}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <p className="text-[13px] font-medium tracking-tight text-foreground/40 uppercase mb-3">Positioning</p>
                  <p className="text-[16px] tracking-tight leading-relaxed text-foreground">
                    {project.detailStrategy.positioning}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-medium tracking-tight text-foreground/40 uppercase mb-3">Audience</p>
                  <p className="text-[16px] tracking-tight leading-relaxed text-foreground">
                    {project.detailStrategy.audience}
                  </p>
                </div>

                <div>
                  <p className="text-[13px] font-medium tracking-tight text-foreground/40 uppercase mb-3">Brand Personality</p>
                  <div className="flex flex-wrap gap-3">
                    {project.detailStrategy.personality.map((trait, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-[13px] font-medium tracking-tight text-foreground">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[13px] font-medium tracking-tight text-foreground/40 uppercase mb-3">Objective</p>
                  <p className="text-[16px] tracking-tight leading-relaxed text-foreground">
                    {project.detailStrategy.objective}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ─── Divider ─── */}
        <div className="h-px bg-foreground/10 mx-2 lg:mx-4" />

        {/* ─── Process Section ─── */}
        {project.detailProcess && (
          <section className="px-2 lg:px-4 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <h2 className="text-[32px] md:text-[56px] font-medium tracking-tight text-foreground mb-12 leading-tight">
                Process
              </h2>
              
              <p className="text-[16px] font-medium tracking-tight text-foreground/60 mb-12 uppercase">
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
                      <span className="text-[32px] md:text-[40px] font-medium tracking-tight text-foreground/30">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-medium tracking-tight text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[16px] tracking-tight leading-relaxed text-foreground/70">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ─── Images — no scroll animation ─── */}
        <section className="pb-16 md:pb-24">
          <div className={`flex flex-col gap-2 ${showAbout ? 'lg:flex-row lg:gap-8 py-5 px-2 lg:px-4' : ''}`}>
            <div className={`flex flex-col gap-2 ${showAbout ? 'w-full lg:w-1/2' : 'w-full'}`}>
              {galleryImages.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-screen -mx-[calc(50vw-50%)] ${showAbout ? 'lg:w-full lg:mx-0' : ''}`}
                >
                  <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={image}
                      alt={`${project.name} ${idx + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {showAbout && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block lg:w-1/2"
              >
                <div className="lg:sticky lg:top-32">
                  <h3 className="text-[16px] font-medium tracking-tight text-foreground mb-4">Behind the Brand</h3>
                  <p className="text-[16px] text-foreground/70 leading-relaxed tracking-tight">{project.description}</p>
                  <MetaGrid />
                </div>
              </motion.div>
            )}
          </div>
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
                <h2 className="text-[16px] font-medium tracking-tight text-foreground leading-tight">
                  Reflection
                </h2>
              </div>

              {/* Middle Column — 40% */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <p className="text-[24px] md:text-[28px] leading-tight tracking-tight text-foreground font-regular">
                    {project.reflection.line1}
                  </p>
                  <p className="text-[24px] md:text-[28px] leading-tight tracking-tight text-foreground font-regular">
                    {project.reflection.line2}
                  </p>
                  <p className="ttext-[24px] md:text-[28px] leading-tight tracking-tight text-foreground font-regular">
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
