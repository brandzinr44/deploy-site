import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Identity Work & Case Studies | Lozinr Branding Agency',
  description: 'See how Lozinr designs brand identities for startups. Real case studies across tech, health, fashion, and finance — brand identity design done with strategy and craft.',
  keywords: [
    'brand identity case studies',
    'branding portfolio',
    'logo design examples',
    'brand strategy portfolio',
    'creative branding work',
    'brand identity projects',
    'startup branding examples',
  ],
  alternates: {
    canonical: 'https://lozinr.com/work',
  },
}

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
