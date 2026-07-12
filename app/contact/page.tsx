import type { Metadata } from 'next'
import ContactClient from '@/components/contact-client'

export const metadata: Metadata = {
  title: 'Start a Project | Lozinr Brand Identity Studio',
  description: 'Ready to build a brand worth remembering? Contact Lozinr Brand Identity Studio to discuss your startup or SaaS branding project. Let\'s create something distinctive together.',
  keywords: [
    'contact brand studio',
    'work with brand designer',
    'brand project inquiry',
    'startup branding services',
    'brand identity consultation',
  ],
  alternates: {
    canonical: 'https://lozinr.com/contact',
  },
}

export default function Contact() {
  return <ContactClient />
}

