'use client'

import React from 'react'
import { motion } from 'framer-motion'

const OUR_BELIEF_TEXT = "Our Belief"
const BELIEF_DESCRIPTION = `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business—not trends.
That's the standard we hold ourselves to on every project.`

export default function OurBeliefSection() {
  return (
    <div className="w-full bg-background text-foreground py-20 md:py-28 px-5 lg:px-6">
      <div className="flex flex-col md:flex-row gap-8 md:gap-4">
        {/* Left Column: 20% on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full md:w-1/5 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-foreground flex-shrink-0" />
            <h2 className="text-[16px] font-medium text-foreground tracking-tight">
              {OUR_BELIEF_TEXT}
            </h2>
          </div>
        </motion.div>

        {/* Middle Column: 40% on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full md:w-2/5"
        >
          <p className="text-base md:text-lg leading-relaxed tracking-tight text-foreground/90 font-normal whitespace-pre-line">
            {BELIEF_DESCRIPTION}
          </p>
        </motion.div>

        {/* Right Column: 40% on desktop, hidden on mobile */}
        <div className="hidden md:block w-full md:w-2/5" />
      </div>
    </div>
  )
}
