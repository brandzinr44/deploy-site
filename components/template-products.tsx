'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  image: string
  description: string
  price: string
  cta: string
  link: string
}

const products: Product[] = [
  {
    id: 1,
    title: 'Brand Guidelines',
    image: 'https://pipu74e1kouytary.private.blob.vercel-storage.com/brnd.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfUGlQdTc0ZTFLb3V5dGFyeSIsIm93bmVySWQiOiJ0ZWFtX2RubXEwWnNRNkdHZ0tjNmczcVNGcnU3ZiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg0Mzg2MjU5MTg3LCJpYXQiOjE3ODQzNDMwNTkzNTN9.KFNp7hKShdSGKwuPiTowTy3H2xNSzYkyeDZm7lrUPGA&vercel-blob-signature=vVAb_pANFws4XpJz4_Bc67N8bGW7Qi6vU8uMAMJ0ykE',
    description: 'Showcase Mockups',
    price: 'From $800',
    cta: 'Get it',
    link: 'https://adnaanakif.gumroad.com/l/brandguidelinessystem',
  },
  {
    id: 2,
    title: 'Product Two',
    image: '/work-hero.svg',
    description: 'Showcase Mockups',
    price: 'From $49',
    cta: 'Get it',
    link: '/product-two',
  },
  {
    id: 3,
    title: 'Product Three',
    image: '/work-hero.svg',
    description: 'Showcase Mockups',
    price: 'From $99',
    cta: 'Get it',
    link: '/product-three',
  },
  {
    id: 4,
    title: 'Product Four',
    image: '/work-hero.svg',
    description: 'Showcase Mockups',
    price: 'From $149',
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
    <section className="w-full bg-background py-16 md:py-24 px-5 lg:px-6">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => (
            <Link key={product.id} href={product.link} className="h-full">
              <motion.div
                variants={itemVariants}
                className="group flex flex-col h-full"
              >
                {/* Product Thumbnail — 16:9, no border, no rounding */}
                <div className="relative w-full aspect-video overflow-hidden bg-background">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Add to Bag overlay — slides down from top on hover */}
                  <div className="absolute top-0 left-0 right-0 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-center gap-1.5 py-3 bg-foreground/80 text-white text-[13px] font-medium tracking-tight -translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span>Add to Bag</span>
                      
                    </button>
                  </div>
                </div>

                {/* Product Info — below thumbnail, uniform text sizes */}
                <div className="flex flex-col pt-3 gap-1">
                  <h3 className="text-[15px] font-medium tracking-tight text-black leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-[15px] font-normal text-black leading-tight">
                    {product.description}
                  </p>
                  <p className="text-[15px] font-normal text-black leading-snug">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}