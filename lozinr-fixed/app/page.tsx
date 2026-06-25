import type { Metadata } from 'next'
import HomeWithPreloader from '@/components/home-with-preloader'

export const metadata: Metadata = {
  title: 'Lozinr — Branding Agency for Startups & Ambitious Founders',
  description: 'We are a branding agency that builds premium brand identities for startups and founders who want to feel expensive before you see the price. Brand identity design, logo design, brand strategy.',
  keywords: [
    'branding agency',
    'brand identity design',
    'startup branding',
    'logo design agency',
    'brand strategy',
    'premium branding studio',
    'brand identity designer',
    'visual identity',
  ],
  alternates: {
    canonical: 'https://lozinr.com',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Lozinr',
  url: 'https://lozinr.com',
  logo: 'https://lozinr.com/favicon.svg',
  description: 'Premium branding agency specializing in brand identity design, logo systems, and visual identity for tech startups and SaaS companies.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
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
  areaServed: ['US', 'UK'],
  serviceType: ['Brand Identity Design', 'Logo Design', 'Brand Strategy', 'Visual Identity Systems'],
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