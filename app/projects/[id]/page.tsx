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

  const projectAny = project as any
  const meta = {
    client: projectAny.client || project.name,
    clientUrl: projectAny.clientUrl,
    sector: projectAny.sector || 'Brand Identity',
    discipline: projectAny.discipline || 'Brand Identity',
    office: projectAny.office || 'New York',
    partner: projectAny.partner || 'Natasha Jen',
    partnerUrl: projectAny.partnerUrl,
    team: projectAny.team || ['Alex Hulme', 'Saundra Marcel', 'David Dai', 'Donovan Brien', 'Yubin Won'],
  }

  const MetaGrid = ({ theme = 'light' as 'light' | 'dark' }) => {
    const labelClass = theme === 'dark' ? 'text-white/50' : 'text-foreground/40'
    const valueClass = theme === 'dark' ? 'text-white' : 'text-foreground'
    const linkClass =
      theme === 'dark'
        ? 'text-white underline underline-offset-2 hover:text-white/70'
        : 'text-foreground underline underline-offset-2 hover:text-foreground/70'

    return (
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8">
        <div className="flex flex-col gap-8">
          <div>
            <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Client</p>
            {meta.clientUrl ? (
              <a href={meta.clientUrl} target="_blank" rel="noopener noreferrer" className={`text-[16px] tracking-tight transition-colors ${linkClass}`}>
                {meta.client}
              </a>
            ) : (
              <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.client}</p>
            )}
          </div>
          <div>
            <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Sector</p>
            <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.sector}</p>
          </div>
          <div>
            <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Discipline</p>
            <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.discipline}</p>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Office</p>
            <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.office}</p>
          </div>
          <div>
            <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Partner</p>
            {meta.partnerUrl ? (
              <a href={meta.partnerUrl} target="_blank" rel="noopener noreferrer" className={`text-[16px] tracking-tight transition-colors ${linkClass}`}>
                {meta.partner}
              </a>
            ) : (
              <p className={`text-[16px] tracking-tight ${valueClass}`}>{meta.partner}</p>
            )}
          </div>
          {meta.team.length > 0 && (
            <div>
              <p className={`text-[16px] tracking-tight mb-1 ${labelClass}`}>Project team</p>
              <div className="flex flex-col">
                {meta.team.map((member: string, i: number) => (
                  <p key={i} className={`text-[16px] tracking-tight ${valueClass}`}>{member}</p>
                ))}
              </div>
            </div>
          )}
        </div>
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
                  <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium tracking-tight">
                    Brand Identity
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[13px] font-medium tracking-tight">
                    Entertainment
                  </span>
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
                <h3 className="text-[16px] font-medium tracking-tight text-white">About the project</h3>
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
                  <h3 className="text-[16px] font-medium tracking-tight text-foreground mb-4">About the project</h3>
                  <p className="text-[16px] text-foreground/70 leading-relaxed tracking-tight">{project.description}</p>
                  <MetaGrid />
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </main>
      <FooterSection />
    </>
  )
}