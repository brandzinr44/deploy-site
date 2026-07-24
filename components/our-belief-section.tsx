'use client'

import React from 'react'
import { motion } from 'framer-motion'

const OUR_BELIEF_TEXT = "OUR BELIEF"
const BELIEF_DESCRIPTION = `Great brands aren't built by decoration.
They're built through clear thinking, intentional systems, and decisions that serve the business—not trends.
That's the standard we hold ourselves to on every project.`

export default function OurBeliefSection() {
  return (
    <div className="w-full bg-background text-foreground py-20 md:py-28 px-5 lg:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 items-start">
        {/* Left Column: 50% */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <span className="w-[14px] h-[14px] bg-foreground flex-shrink-0" />
            <h2 className="text-[22px] font-regular text-foreground tracking-tight">
              {OUR_BELIEF_TEXT}
            </h2>
          </div>
        </motion.div>

        {/* Right Column: 50% — description + thumbnail image below, full width of column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-6"
        >
          <p className="text-[22px] leading-tight tracking-tight text-foreground font-regular">
            {BELIEF_DESCRIPTION}
          </p>

          <div className="w-full aspect-video overflow-hidden bg-foreground/5">
            <img
              src="https://guxjkdyjeyrscewv.public.blob.vercel-storage.com/faizur-rehman-aLq9KNZ4rjo-unsplash.jpg"
              alt="Our belief"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}