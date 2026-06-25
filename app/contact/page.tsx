import type { Metadata } from 'next'
import ContactClient from '@/components/contact-client'

export const metadata: Metadata = {
  title: 'Work With Us | Lozinr Branding Agency',
  description: 'Ready to invest in your brand? Contact Lozinr — a branding agency specializing in brand identity design for startups and founders. Let\'s build something worth remembering.',
  keywords: [
    'contact branding agency',
    'work with designer',
    'brand project inquiry',
    'startup branding services',
    'branding agency contact',
  ],
  alternates: {
    canonical: 'https://lozinr.com/contact',
  },
}

export default function Contact() {
  return <ContactClient />
}

