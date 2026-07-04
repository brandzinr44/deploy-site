export interface ProjectSection {
  label: string
  description: string
}

export interface Project {
  id: number
  name: string
  description: string
  category: string
  industry: string
  year: string
  ctas: { label: string }[]
  images: string[]
  client?: string
  clientUrl?: string
  sector?: string
  discipline?: string
  office?: string
  partner?: string
  partnerUrl?: string
  team?: string[]
  sections: {
    challenge: ProjectSection
    strategy: ProjectSection
    identity: ProjectSection
    application: ProjectSection
    outcome: ProjectSection
  }
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Lozinr',
    description: 'Lozinr Studio was built to prove that world-class branding isnt defined by geography. Its defined by clear thinking, intentional systems, and craftsmanship that lasts.',
    category: 'Branding, Campaign & Content',
    industry: 'Design Agency',
    year: '2024',
    client: 'Lozinr Design Studio',
    clientUrl: 'https://lozinr.com',
    sector: 'Design & Creative',
    discipline: 'Brand Identity, Visual System',
    office: 'Comilla, Bangladesh',
    partner: 'Adnan Akif',
    partnerUrl: 'https://lozinr.com',
    team: ['Adnan Akif', 'Design Team', 'Creative Director', 'Strategist'],
    ctas: [
      { label: 'Independent Branding Studio' },
      { label: 'Brand Strategy' }
      { label: 'Visual Identity' }
      { label: 'Website' }
    
    ],
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201-sPDYBiZdoFuMk6f9avuWkv1FKv1biV.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%202-L9cyRymuIKcWCg9UcBExt3YwMLe6Yb.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%203-vZ58nxLG71FNWlMeFqKKh5x3LkUxU4.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%204-fspfqdrqvw1fiSrAJ6afFiFVkwmLFI.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%205-4Ffal1MVK7oLMe7ixqa4gEDcFSMtN8.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%206-4vVCO2ICAEfzg1NKBwLYtBljY3LdXO.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%207-Fy1geWoBOPQS0OaPwotE3H6aPV8kQh.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%208-jViUshaVSc6389CSO7w8J6LOP2hlIB.jpg'
    ],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'Building a brand identity for a design studio from scratch presents a unique pressure — the studio itself becomes the proof of concept. Every design decision is scrutinised because the audience is designers, founders, and businesses who judge quality instantly. The challenge was to create an identity that was not just visually strong, but conceptually undeniable. It had to communicate intelligence, craft, and humanity — all without a single word.'
      },
      strategy: {
        label: 'Strategy',
        description: 'Rather than designing a logo first, we started with a question: what if the identity came entirely from the name itself? This constraint-led approach pushed us away from generic geometric shapes and toward something genuinely discovered. The strategy was to build the entire visual system around a single insight — one idea strong enough to carry every touchpoint from business card to website. Three colours, two fonts, one concept. Maximum restraint for maximum impact.'
      },
      identity: {
        label: 'Identity',
        description: 'Inside the first two letters — "L" and "o" — we discovered a hidden face: two eyes and a nose formed by the negative space between them. This became the heart of Lozinr\'s identity. The logomark is both a letterform and a human expression — conceptual yet warm, minimal yet full of meaning. The colour system is built on Solid Black (#0E0C0A) as the primary canvas, Light Silver (#E2E2E2) for contrast and warmth, and Tribal Green (#26775C) as the accent that gives the brand its distinct, memorable personality. Typography is set in a single geometric sans-serif — clean, confident, and consistent across all applications.'
      },
      application: {
        label: 'Application',
        description: 'The identity was applied across every touchpoint a design studio encounters — business cards, letterhead, envelopes, tote bags, and digital platforms. Each application was designed to feel intentional: the business card uses the green as the primary face with the logomark anchoring the front, while the back carries the wordmark bold and full-bleed in black. The stationery suite uses the green as a surface, with black materials layered on top — creating a visual system that is immediately recognisable across print and screen. The website carries the same palette and typographic rhythm, ensuring consistency from first impression to final interaction.'
      },
      outcome: {
        label: 'Outcome',
        description: 'The Lozinr identity achieved what every studio brand should — it became a portfolio piece in itself. The hidden face concept gives clients and collaborators an immediate story to hold onto, turning a logo into a talking point. More importantly, it established a clear visual language that now extends across all Lozinr projects — a foundation that scales as the studio grows.'
      }
    }
  },
  {
    id: 2,
    name: 'Adnan Akif',
    description: 'A bold and modern branding project that redefines personal identity through innovative design and strategic positioning.',
    category: 'Branding',
    industry: 'Personal Branding',
    year: '2024',
    client: 'Adnan Akif',
    sector: 'Personal Branding & Portfolio',
    discipline: 'Brand Identity, Web Design',
    office: 'Comilla, Bangladesh',
    partner: 'Creative Director',
    team: ['Adnan Akif', 'Branding Specialist', 'Digital Designer'],
    ctas: [
      { label: 'Brand Strategy' },
      { label: 'Visual Identity' }
    ],
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2001-cG6CTg0P6GqBrKieXI434Bk8dmam2B.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2002-sMaS68iIm16ONNyZe75THLYjsck1Eo.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2003-boZO9E1sFD1zlJ2OMUQPtq7StWWBPL.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2004-9pB1c8qPiQkfhvZIXfE8ghzEg7wPBJ.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2005-Ddm2miFeUBRn0rxUXNJ5f4WPj7OB5P.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2006-1UBLLCNjX26rvLBbodaeyORbQzk3B9.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2007-xUbjbBf3stw0hhMYnwdFt4GtIL6hbj.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2008-aSVryxPAE9afxMQEBwx8COqT1mz5P2.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2009-A4qDQ2vr6XjAwSzIuc1ZwZc9Y1Qrg8.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adnan%20Akif%2010-UrZmqUctrvtz9Q0oDd6Q3E9ffXdZMT.jpg'
    ],
    sections: {
      challenge: {
        label: 'Challenge',
        description: 'Creating a distinctive personal brand identity for Adnan Akif that stands out in a competitive creative landscape while maintaining authenticity and professional credibility.'
      },
      strategy: {
        label: 'Strategy',
        description: 'We developed a comprehensive brand strategy focused on establishing Adnan as a thought leader, leveraging his unique perspective and creative expertise to build a memorable personal brand.'
      },
      identity: {
        label: 'Identity',
        description: 'The visual identity combines bold typography with refined minimalism, creating a memorable mark that communicates innovation, professionalism, and creative excellence.'
      },
      application: {
        label: 'Application',
        description: 'The brand system was applied across all touchpoints including portfolio website, business materials, social media presence, and professional communications for consistent brand representation.'
      },
      outcome: {
        label: 'Outcome',
        description: 'The new brand identity successfully positioned Adnan Akif as a distinctive creative professional, resulting in increased visibility and recognition within the industry.'
      }
    }
  }
]
