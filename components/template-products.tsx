'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  image: string
  description: string
  cta: string
  link: string
}

const products: Product[] = [
  {
    id: 1,
    title: 'Brand Guidelines',
    image: 'https://pipu74e1kouytary.private.blob.vercel-storage.com/brnd.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfUGlQdTc0ZTFLb3V5dGFyeSIsIm93bmVySWQiOiJ0ZWFtX2RubXEwWnNRNkdHZ0tjNmczcVNGcnU3ZiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg0Mzg2MjU5MTg3LCJpYXQiOjE3ODQzNDMwNTkzNTN9.KFNp7hKShdSGKwuPiTowTy3H2xNSzYkyeDZm7lrUPGA&vercel-blob-signature=vVAb_pANFws4XpJz4_Bc67N8bGW7Qi6vU8uMAMJ0ykE',
    description: 'Brand Guidelines System - Professional Figma Template',
    cta: 'Get it',
    link: 'https://adnaanakif.gumroad.com/l/brandguidelinessystem',
  },
  {
    id: 2,
    title: 'Product Two',
    image: '/work-hero.svg',
    description: 'Complete system for digital agencies',
    cta: 'Get it',
    link: '/product-two',
  },
  {
    id: 3,
    title: 'Product Three',
    image: '/work-hero.svg',
    description: 'Enterprise solution for large-scale projects',
    cta: 'Get it',
    link: '/product-three',
  },
  {
    id: 4,
    title: 'Product Four',
    image: '/work-hero.svg',
    description: 'Enterprise solution for large-scale projects',
    cta: 'Get it',
    link: '/product-four',
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <Link key={product.id} href={product.link} className="h-full">
              <motion.div
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-[30px] bg-background h-full"
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
                  <h3 className="text-[18px] font-medium tracking-tight mb-0 text-foreground">
                    {product.title}
                  </h3>
                  <p className="text-[14px] text-foreground mb-5 flex-grow leading-tight">
                    {product.description}
                  </p>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full inline-flex items-center justify-center gap-1 px-6 py-3 bg-foreground text-white font-medium rounded-full hover:bg-foreground/90 active:bg-foreground/80 transition-colors duration-200"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>{product.cta}</span>

                    <svg
                      className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13 7L18 12L13 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
