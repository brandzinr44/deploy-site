'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'Discovery',
    description:
      'Every strong brand begins with understanding. We uncover the business, audience, market, and perception gaps before making a single design decision.',
  },
  {
    id: 2,
    number: '02',
    title: 'Strategy',
    description:
      "We define positioning, messaging, and brand direction to ensure every creative decision supports a business objective.",
  },
  {
    id: 3,
    number: '03',
    title: 'Visual Direction',
    description:
      'We establish the visual principles that shape how the brand should be seen, remembered, and experienced.',
  },
  {
    id: 4,
    number: '04',
    title: 'Identity',
    description:
      'We build a cohesive identity system designed for consistency, flexibility, and long-term recognition.',
  },
  {
    id: 5,
    number: '05',
    title: 'Guidelines',
    description:
      'Every decision is documented into a practical system, making the brand easier to scale across teams and platforms.',
  },
]

const DESC_TEXT_CLASS =
  'text-[22px] leading-snug font-regular tracking-tight text-foreground'

// ─── True line-by-line reveal ─────────────────────────────────────
function LineReveal({ text }: { text: string }) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>([])

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return

    const measure = () => {
      const words = text.split(' ')
      el.innerHTML = ''

      const spans = words.map((word, i) => {
        const span = document.createElement('span')
        span.textContent = word
        el.appendChild(span)
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
        return span
      })

      const groups: string[][] = []
      let lastTop = Number.NEGATIVE_INFINITY

      spans.forEach((span, i) => {
        const top = span.offsetTop
        if (Math.abs(top - lastTop) > 1) {
          groups.push([])
          lastTop = top
        }
        groups[groups.length - 1].push(words[i])
      })

      setLines(groups.map((g) => g.join(' ')))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text])

  return (
    <div className="relative">
      <div
        ref={measureRef}
        aria-hidden
        className={`invisible absolute inset-0 ${DESC_TEXT_CLASS}`}
      />
      <div className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${DESC_TEXT_CLASS}`}
            >
              {line}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── List item — title + inline description below it on hover ────
function ProcessListItem({
  step,
  isActive,
  onSelect,
}: {
  step: (typeof processSteps)[0]
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <div
      onMouseEnter={onSelect}
      onFocus={onSelect}
      className="relative border-b border-foreground last:border-none"
    >
      <button
        type="button"
        onClick={onSelect}
        className="relative w-full text-left py-3 md:py-4 focus:outline-none"
      >
        {isActive && (
          <motion.span
            layoutId="process-active-indicator"
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-foreground"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <motion.span
          animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 6 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="block text-[48px] font-regular tracking-tight leading-[1.05] text-foreground"
        >
          {step.title}
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-1 md:pl-2">
              <LineReveal text={step.description} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────
export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="w-full bg-background text-foreground py-20 md:py-24 px-5 lg:px-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 md:gap-x-0">
        {/* Left — dot + label, same as before */}
        <div className="w-full flex items-center gap-2 self-start">
          <span className="w-[16px] h-[16px] bg-foreground" />
          <span className="text-[22px] font-regular text-foreground tracking-tight uppercase">
            Process
          </span>
        </div>

        {/* Right — list, description reveals below hovered item */}
        <div className="w-full flex flex-col">
          {processSteps.map((step, i) => (
            <ProcessListItem
              key={step.id}
              step={step}
              isActive={i === activeIndex}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}