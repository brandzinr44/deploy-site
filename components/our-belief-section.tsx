'use client'

import React from 'react'
import { motion } from 'framer-motion'

const OUR_BELIEF_TEXT = "Our Belief"
const BELIEF_DESCRIPTION = `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business—not trends.
That's the standard we hold ourselves to on every project.`

export default function OurBeliefSection() {
  return (
    <div className="w-full bg-foreground text-background py-20 md:py-28 px-5 lg:px-6">
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 items-start">
        {/* Left Column: 40% on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full md:w-2/5 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-background flex-shrink-0" />
            <h2 className="text-[22px] font-medium text-background tracking-tight">
              {OUR_BELIEF_TEXT}
            </h2>
          </div>
        </motion.div>

        {/* Right Column: 60% on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full md:w-3/5"
        >
          <p className="text-[24px] leading-tight tracking-tight text-background font-regular">
            {BELIEF_DESCRIPTION}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
