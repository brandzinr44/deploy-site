'use client'

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { projectsData } from '@/lib/projects-data'

// ─── Card ────────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  total,
}: {
  project: (typeof projectsData)[0]
  index: number
  total: number
}) {
  const imgRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // Tilt on hover
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 })

  // Parallax on scroll — progress goes 0 → 1 as the image crosses the viewport
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imgRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateX.set(((e.clientY - cy) / rect.height) * -10)
    rotateY.set(((e.clientX - cx) / rect.width) * 10)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHovered(false)
  }

  const slug = project.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <Link
      href={`/projects/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="relative flex flex-col gap-3 group"
    >
      {/* Image */}
      <div
        ref={imgRef}
        onMouseMove={handleMouseMove}
        className="relative w-full overflow-hidden bg-back/10"
        style={{ aspectRatio: '16/9' }}
      >
        <motion.div
          style={{
            y: parallaxY,
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
            perspective: 800,
          }}
          className="absolute inset-0 scale-125"
        >
          <Image
            src={project.images[0]}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Text — directly below the thumbnail */}
      <div className="flex flex-col gap-3 mt-2">

        <h3 className="text-[24px] font-regular text-foreground tracking-tight leading-tight">
          {project.name}
        </h3>

        {/* Divider under the title */}
        <div className="h-px w-full bg-foreground" />

        <p className="text-[18px] font-regualar text-foreground/80 leading-tight tracking-tight">
          {project.description}
        </p>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            <span className="inline-block text-[16px] bg-foreground font-regular tracking-tight text-background rounded-full px-3 py-1">
              {project.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="inline-block text-[16px] bg-foreground font-regular tracking-tight text-background rounded-full px-3 py-1">
              {project.year}
            </span>
          </motion.div>
        </div>
      </div>
    </Link>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function Work() {
  const displayProjects = projectsData.filter((p) => p.images[0] !== '#')

  return (
    <section id="work-section" className="bg-background py-12 md:py-24 px-3 lg:px-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-7 gap-y-12 md:gap-y-20">
        {displayProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectRow project={project} index={i} total={displayProjects.length} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}