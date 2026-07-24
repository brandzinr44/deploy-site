'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/header'
import FooterSection from '@/components/footer-section'
import { useCart } from '@/lib/cart-context'

// ─── Store Hero ─────────────────────────────────────────────────────
function StoreHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['-24%', '24%'])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0])

  useEffect(() => { setIsMounted(true) }, [])

  const heroImage = '/work-hero.svg'

  return (
    <div
      ref={heroRef}
      className="relative w-screen -mx-[calc(50vw-50%)] overflow-hidden"
      style={{ height: 'min(100vh, calc(100vw * 16 / 9))' }}
    >
      {heroImage && (
        <motion.div
          className="w-full h-full"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img
            src={heroImage}
            alt="Store"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-background" />

      {/* "Premium Store" title — centered, looping slide animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-2 lg:px-4">
        <div className="overflow-hidden h-[36px] md:h-[187px]">
          <motion.div
            className="flex flex-col"
            animate={{ y: ['0%', '0%', '-50%', '-50%'] }}
            transition={{
              duration: 5.5,
              times: [0, 0.42, 0.58, 1],
              repeat: Infinity,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <motion.h1
              animate={{ scale: [1, 1, 0.985, 1, 1] }}
              transition={{ duration: 5.5, times: [0, 0.4, 0.5, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }}
              className="text-[40px] md:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center"
            >
              Premium Store
            </motion.h1>
            <h1 className="text-[40px] md:text-[208px] font-medium tracking-tighter leading-[0.9] text-foreground text-center">
              Premium Store
            </h1>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Store Card ──────────────────────────────────────────────────────
interface StoreProduct {
  id: string
  title: string
  image: string
  description: string
  price: number
  license: string
  link: string
}

const products: StoreProduct[] = [
  {
    id: 'brand-guidelines',
    title: 'Brand Guidelines',
    image: 'https://pipu74e1kouytary.private.blob.vercel-storage.com/brnd.png?vercel-blob-delegation=eyJzdG9yZUlkIjoic3RvcmVfUGlQdTc0ZTFLb3V5dGFyeSIsIm93bmVySWQiOiJ0ZWFtX2RubXEwWnNRNkdHZ0tjNmczcVNGcnU3ZiIsInBhdGhuYW1lIjoiKiIsIm9wZXJhdGlvbnMiOlsiZ2V0IiwiaGVhZCJdLCJ2YWxpZFVudGlsIjoxNzg0Mzg2MjU5MTg3LCJpYXQiOjE3ODQzNDMwNTkzNTN9.KFNp7hKShdSGKwuPiTowTy3H2xNSzYkyeDZm7lrUPGA&vercel-blob-signature=vVAb_pANFws4XpJz4_Bc67N8bGW7Qi6vU8uMAMJ0ykE',
    description: 'Comprehensive brand system & mockups',
    price: 800,
    license: 'Brand Guidelines (Commercial License)',
    link: 'https://adnaanakif.gumroad.com/l/brandguidelinessystem',
  },
  {
    id: 'ui-kit',
    title: 'UI Kit',
    image: '/work-hero.svg',
    description: 'Complete design system components',
    price: 299,
    license: 'UI Kit (Commercial License)',
    link: '#',
  },
  {
    id: 'typography-pack',
    title: 'Typography Pack',
    image: '/work-hero.svg',
    description: 'Professional font combinations',
    price: 149,
    license: 'Typography Pack (Commercial License)',
    link: '#',
  },
  {
    id: 'templates',
    title: 'Templates',
    image: '/work-hero.svg',
    description: 'Ready-to-use design templates',
    price: 199,
    license: 'Templates (Commercial License)',
    link: '#',
  },
]

function StoreCard({
  product,
}: {
  product: StoreProduct
}) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  return (
    <Link href={product.link} target={product.link.startsWith('http') ? '_blank' : undefined}>
      <motion.div
        className="group flex flex-col h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image — 16:9 aspect ratio */}
        <div className="relative w-full overflow-hidden bg-foreground/10" style={{ aspectRatio: '16/9' }}>
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1 : 1 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />

          {/* "Add to Bag" button overlay — slides up from bottom on hover */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
            <motion.button
              className="w-full flex items-center justify-center gap-2 py-2 bg-foreground text-background text-[18px] font-regular tracking-tight"
              animate={{
                y: isHovered ? 0 : '100%',
              }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                addToCart({
                  id: product.id,
                  title: product.title,
                  license: product.license,
                  price: product.price,
                  image: product.image,
                })
              }}
            >
              <span>Add to Bag</span>
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-3 flex flex-col gap-1 lg:gap-3 mt-2">
          <h3 className="text-[24px] font-regular text-foreground tracking-tight leading-tight">
            {product.title}
          </h3>

          {/* Divider under the title */}
          <div className="h-px w-full bg-foreground" />

          <p className="text-[18px] font-regualar text-foreground leading-tight tracking-tight">
            {product.description}
          </p>

          <p className="text-[22px] font-regular tracking-tight text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

// ─── Main Store Page ────────────────────────────────────────────────
export default function StorePage() {
  return (
    <>
      <Header preloaderDone={true} />
      <main className="min-h-screen bg-background text-foreground">

        {/* Hero Section */}
        <StoreHero />

        {/* Products Grid */}
        <div className="px-3 lg:px-6 pt-16 pb-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <StoreCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </main>
      <FooterSection />
    </>
  )
}