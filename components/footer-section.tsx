'use client'

import { motion } from 'framer-motion'

const letterData = [
  { points: "40.75 0 4.93 0 4.93 167.16 112.87 167.16 112.87 139.46 40.75 139.46 40.75 0", type: 'polygon' },
  { d: "M237.14,10.62c-12.16-7.08-26.17-10.62-42.02-10.62s-29.78,3.54-41.79,10.62c-12.01,7.08-21.44,16.89-28.28,29.44-6.85,12.55-10.27,27.05-10.27,43.52s3.42,30.98,10.27,43.52c6.85,12.55,16.28,22.36,28.28,29.44,12.01,7.08,25.94,10.62,41.79,10.62s29.86-3.54,42.02-10.62c12.16-7.08,21.59-16.89,28.28-29.44,6.7-12.54,10.04-27.05,10.04-43.52s-3.35-30.97-10.04-43.52c-6.7-12.54-16.13-22.36-28.28-29.44ZM234.83,111.4c-3.69,7.77-8.89,13.82-15.58,18.12-6.7,4.31-14.74,6.46-24.13,6.46s-17.01-2.15-23.78-6.46c-6.77-4.31-12.01-10.35-15.7-18.12-3.69-7.77-5.54-17.05-5.54-27.82s1.85-20.05,5.54-27.82c3.69-7.77,8.93-13.77,15.7-18.01,6.77-4.23,14.7-6.35,23.78-6.35s17.43,2.12,24.13,6.35c6.7,4.24,11.89,10.24,15.58,18.01,3.69,7.77,5.54,17.05,5.54,27.82s-1.85,20.05-5.54,27.82Z", type: 'path' },
  { points: "406.25 27.46 406.25 0 290.19 0 290.19 29.61 365.18 29.61 289.95 139.7 289.95 167.16 406.49 167.16 406.49 137.55 330.55 137.55 406.25 27.46", type: 'polygon' },
  { x: "433.49", y: "0", width: "35.82", height: "167.16", type: 'rect' },
  { points: "605.44 109.85 532.13 0 496.31 0 496.31 167.16 532.13 167.16 532.13 57.79 605.44 167.16 641.26 167.16 641.26 0 605.44 0 605.44 109.85", type: 'polygon' },
  { d: "M795.07,167.16l-33.65-68.64c2.18-.81,4.25-1.73,6.18-2.76,8.91-4.78,15.48-11.06,19.7-18.87,4.22-7.8,6.33-16.16,6.33-25.07,0-9.55-2.19-18.23-6.57-26.03-4.38-7.8-11.07-14.05-20.06-18.75-9-4.69-20.26-7.04-33.79-7.04h-64.95v167.16h35.82v-64.24h20.79l29.6,64.24h40.6ZM704.08,29.85h26.98c8.91,0,15.48,2.11,19.7,6.33,4.22,4.22,6.33,9.91,6.33,17.07s-2.11,13.13-6.33,17.43c-4.22,4.3-10.79,6.45-19.7,6.45h-26.98V29.85Z", type: 'path' },
]

const navLinks = [
  
  { name: 'Work', href: '' },
  { name: 'Contact', href: '' },
]

const socialLinks = [
  { name: 'Instagram', link: 'https://www.instagram.com/adnaanakif/' },
  { name: 'Facebook', link: 'https://www.facebook.com/adnan.o.akif/' },
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

        {/* Row 1 — Nav */}
        <motion.div
          className="grid grid-cols-2 py-8 md:py-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={0}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Nav</span>
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
        </motion.div>

        {/* Row 2 — Social */}
        <motion.div
          className="grid grid-cols-2 border-t border-background py-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={1}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Social</span>
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
        </motion.div>

        {/* Row 3 — Address */}
        <motion.div
          className="grid grid-cols-2 border-t border-background py-8 md:py-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-40px' }}
          custom={2}
          variants={rowVariants}
        >
          <span className="text-[16px] text-background font-medium">Address</span>
          <div>
            <a
              href="mailto:adnanakif.co@gmail.com"
              className="text-[16px] text-background underline underline-offset-4 decoration-background block mb-3"
            >
              Click on email
            </a>
            <p className="text-[16px] text-background leading-snug">
              Comilla, Chittagong, Bangladesh<br />
              Working Worldwide.
            </p>
          </div>
        </motion.div>

        {/* SVG Logo */}
        <div className="w-full mt-16 md:mt-24">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 800 167.16"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-background"
          >
            {letterData.map((letter, i) => (
              <g key={i}>
                {letter.type === 'polygon' && <polygon fill="currentColor" points={(letter as any).points} />}
                {letter.type === 'path' && <path fill="currentColor" d={(letter as any).d} />}
                {letter.type === 'rect' && <rect fill="currentColor" x={(letter as any).x} y={(letter as any).y} width={(letter as any).width} height={(letter as any).height} />}
              </g>
            ))}
          </svg>
        </div>

      </div>
    </footer>
  )
}
