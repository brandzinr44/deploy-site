import type { Metadata } from 'next'
import HomeWithPreloader from '@/components/home-with-preloader'

export const metadata: Metadata = {
  title: 'Lozinr — Brand Identity Studio for Funded Startups & Ambitious Founders',
  description: 'Lozinr is a brand identity studio helping funded startups and ambitious founders build distinctive brands through strategy, visual identity systems, and timeless design.',
  keywords: [
    'brand identity studio',
    'brand identity for startups',
    'SaaS branding',
    'D2C branding',
    'startup brand identity',
  ],
  alternates: {
    canonical: 'https://lozinr.com',
  },
}

export default function Home() {
  return <HomeWithPreloader />
}
