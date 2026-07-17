'use client'

import { motion } from 'framer-motion'

interface Product {
  id: number
  title: string
  image: string
  description: string
  cta: string
}

const products: Product[] = [
  {
    id: 1,
    title: 'Brand Guidelines',
    image: '/work-hero.svg',
    description: 'Premium design template for modern startups',
    cta: 'Get it',
  },
  {
    id: 2,
    title: 'Product Two',
    image: '/work-hero.svg',
    description: 'Complete system for digital agencies',
    cta: 'Get it',
  },
  {
    id: 3,
    title: 'Product Three',
    image: '/work-hero.svg',
    description: 'Enterprise solution for large-scale projects',
    cta: 'Get it',
  },
  {
    id: 4,
    title: 'Product Three',
    image: '/work-hero.svg',
    description: 'Enterprise solution for large-scale projects',
    cta: 'Get it',
  },
  
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function TemplateProducts() {
  return (
    <section className="w-full bg-foreground py-16 md:py-24 px-5 lg:px-6">
      <div className="max-w-full mx-auto">
        {/* Section Title */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
        >
         
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-[30px] bg-background "
            >
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden bg-background">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1 p-4 md:p-4 bg-white">
                <h3 className="text-[22px] md:text-[26px] font-medium tracking-tight mb-0 text-foreground">
                  {product.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-foreground/60 mb-5 flex-grow leading-relaxed">
                  {product.description}
                </p>

                {/* CTA Button */}
                <motion.button
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-foreground text-white font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {product.cta}
                  <span className="ml-2">→</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
