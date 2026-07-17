import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Template System — Design System & Guidelines | Lozinr',
  description: 'Explore our comprehensive design system with templates, guidelines, and brand components. Maintain consistency across all digital and physical touchpoints.',
  keywords: [
    'design system',
    'template system',
    'brand templates',
    'design guidelines',
    'design components',
  ],
  alternates: {
    canonical: 'https://lozinr.com/template-system',
  },
}

export default function TemplateSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
