import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import PageTransition from '@/components/page-transition'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lozinr.com'),
  title: {
    default: 'Lozinr — Branding Agency & Brand Identity Design Studio',
    template: '%s | Lozinr',
  },
  description: 'Lozinr is a branding agency run by Adnan Akif. We design premium brand identities for startups and ambitious founders. Brand identity design, logo design, brand strategy, and visual identity systems.',
  keywords: [
    'branding agency',
    'brand identity design',
    'logo design agency',
    'brand identity designer for startups',
    'brand strategy',
    'visual identity',
    'startup branding',
    'premium branding studio',
    'Adnan Akif',
    'Lozinr',
  ],
  authors: [{ name: 'Adnan Akif' }],
  creator: 'Adnan Akif',
  publisher: 'Lozinr',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://lozinr.com',
  },
  verification: {
    google: 'W-OA6Yo3JGzMsaE1PXQh3t3b13bAG1bZgb1RReWRq2w',
  },
  category: 'design',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lozinr.com',
    siteName: 'Lozinr',
    title: 'Lozinr — Branding Agency & Brand Identity Design Studio',
    description: 'Lozinr is a branding agency run by Adnan Akif. We design premium brand identities for startups and ambitious founders.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%20copy%2001-WcAWbaFGMsa8gBIagDbeIVAx3k4w5n.jpg',
        width: 1200,
        height: 630,
        alt: 'Lozinr Branding Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lozinr — Branding Agency & Brand Identity Design Studio',
    description: 'Lozinr is a branding agency run by Adnan Akif. We design premium brand identities for startups and ambitious founders.',
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201%20copy%2001-WcAWbaFGMsa8gBIagDbeIVAx3k4w5n.jpg',
    ],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    name: 'Lozinr',
    description: 'Premium branding agency specializing in brand identity design, logo design, and brand strategy for startups and ambitious founders.',
    url: 'https://lozinr.com',
    logo: 'https://lozinr.com/favicon.png',
    priceRange: '$$$$',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://lozinr.com/contact',
      email: 'adnanakif.co@gmail.com',
    },
    founder: {
      '@type': 'Person',
      name: 'Adnan Akif',
    },
    areaServed: 'Worldwide',
    serviceType: ['Brand Identity Design', 'Logo Design', 'Brand Strategy', 'Visual Identity Systems'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Branding Services',
      url: 'https://lozinr.com/services',
    },
    sameAs: [
      'https://www.instagram.com/adnan.o.akif/',
      'https://web.facebook.com/adnan.o.akif',
      'https://www.youtube.com/adnan.o.akif',
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-transparent text-foreground transition-colors duration-300`}>
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  )
}
