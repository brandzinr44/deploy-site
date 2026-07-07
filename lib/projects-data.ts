export interface ProjectDetailSection {
  thinking: string
  body: string
}

export interface ProcessStep {
  number: string
  title: string
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
  duration?: string
  reflection?: {
    line1: string
    line2: string
    line3: string
  }
  detailChallenge?: ProjectDetailSection
  detailStrategy?: {
    thinking: string
    positioning: string
    audience: string
    personality: string[]
    objective: string
  }
  detailProcess?: ProcessStep[]
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Lozinr',
    description: 'Lozinr Studio was built to prove that world-class branding isnt defined by geography. Its defined by clear thinking, intentional systems, and craftsmanship that lasts.',
    category: 'Branding Agency, Creative Company',
    industry: 'Design Agency',
    year: '2026',
    duration: '2024 - 2026',
    ctas: [
      { label: 'Brand Strategy' },
      { label: 'Positioning' },
      { label: 'Visual Identity' },
      { label: 'Brand Guidelines' }
    ],
    reflection: {
      line1: 'Every brand we build starts long before the first logo is designed.',
      line2: 'This project reminded us that strong brands are rarely the result of more creativity—they\'re the result of clearer decisions. Every element, from positioning to typography, was designed to reinforce trust and long-term consistency rather than short-term attention.',
      line3: 'That\'s the standard we bring to every brand we build.'
    },
    detailChallenge: {
      thinking: 'Thinking Statement',
      body: 'Every growing business eventually outgrows its identity.\n\nThe original brand had done its job.\n\nBut Lozinr had changed.\n\nThe work became more strategic.\nThe clients became more ambitious.\nThe identity stayed behind.\n\nThis wasn\'t about creating a better logo.\n\nIt was about creating a brand that reflected the standard behind the work.'
    },
    detailStrategy: {
      thinking: 'Before people trust your work, they trust what your brand communicates.',
      positioning: 'Brand systems for founders building companies worth remembering.',
      audience: 'Founders investing in long-term growth—not short-term attention.',
      personality: ['Calm', 'Precise', 'Confident', 'Timeless'],
      objective: 'Create a brand that earns trust before the first conversation.'
    },
    detailProcess: [
      {
        number: '01',
        title: 'Discovery',
        description: 'Understand the business before touching design.'
      },
      {
        number: '02',
        title: 'Positioning',
        description: 'Define what the brand should be known for.'
      },
      {
        number: '03',
        title: 'Exploration',
        description: 'Explore typography, color, composition, and direction. Remove everything that doesn\'t support the strategy.'
      },
      {
        number: '04',
        title: 'System Building',
        description: 'Turn individual assets into one consistent identity system.'
      },
      {
        number: '05',
        title: 'Refinement',
        description: 'Reduce visual noise until every element has a purpose.'
      }
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
    ]
  },
  {
    id: 2,
    name: 'Adnan Akif',
    description: 'A bold and modern branding project that redefines personal identity through innovative design and strategic positioning.',
    category: 'Branding',
    industry: 'Personal Branding',
    year: '2024',
    overview: 'Personal branding project focused on establishing a unique visual identity for creative professional.',
    challengeDesc: 'Creating a distinctive personal brand identity that stands out in a competitive creative landscape while maintaining authenticity.',
    strategicDirection: 'Developed a comprehensive brand strategy leveraging unique perspective and creative expertise to build a memorable personal brand.',
    deliverables: [
      'Brand Strategy',
      'Visual Identity',
      'Website Design',
      'Brand Guidelines'
    ],
    duration: '2024 - 2025',
    ctas: [
      { label: 'Brand Strategy' },
      { label: 'Visual Identity' }
    ],
    reflection: {
      line1: 'Personal branding is perhaps the most challenging category of work because the brand must be authentic while remaining professional.',
      line2: 'For Adnan Akif, we focused on translating his creative vision and expertise into a visual language that communicates both sophistication and approachability. The identity needed to work across diverse platforms—from portfolio presentations to social media—while maintaining a consistent voice.',
      line3: 'The result is a personal brand that feels genuinely distinctive in a crowded creative landscape.'
    },
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
