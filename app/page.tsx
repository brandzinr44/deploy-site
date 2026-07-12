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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  name: 'Lozinr',
  url: 'https://lozinr.com',
  logo: 'https://lozinr.com/favicon.svg',
  description: 'Brand Identity Studio specializing in brand identity design, logo systems, and visual identity for tech startups and SaaS companies.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    url: 'https://lozinr.com/contact',
  },
  sameAs: [
    'https://twitter.com/lozinr',
    'https://instagram.com/lozinr',
    'https://linkedin.com/company/lozinr',
  ],
  founder: {
    '@type': 'Person',
    name: 'Adnan Akif',
  },
  areaServed: 'Worldwide',
  serviceType: [
  'Brand Strategy',
  'Brand Identity Design',
  'Visual Identity Systems',
  'Logo Identity',
  'Brand Guidelines'
],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <HomeWithPreloader />
    </>
  )
}