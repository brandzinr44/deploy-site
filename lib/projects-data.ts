export interface ProjectSection {
  label: string
  description: string
}

export interface ProjectDetailSection {
  thinking: string
  body: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

// ─── Generic Detail Block ───────────────────────────────────────────────────
// Used to build the flexible "Identity / Visual Identity / Application / ..."
// area of a case study. Each project defines its own `detailSections` array —
// mix as many 'images' and 'content' blocks, in any order, as the case study
// needs. The page template just maps over this array and renders it.
//
//  { type: 'images', images: [{ src, alt }, ...] }
//    → one or more full-bleed 16:9 images stacked in a row
//
//  { type: 'content', heading: 'Identity', fields: [{ label, text }, ...] }
//    → headline + any number of label/text pairs (Thinking Statement, Body,
//      Color, Typography, Positioning — whatever the case study needs)
// ─────────────────────────────────────────────────────────────────────────────
export type DetailBlock =
  | { type: 'images'; images: { src: string; alt: string }[] }
  | { type: 'content'; heading: string; fields: { label: string; text: string }[] }

export interface Project {
  id: number
  name: string
  description: string
  category: string
  industry: string
  year: string
  ctas: { label: string }[]
  images: string[]
  overview?: string
  challengeDesc?: string
  strategicDirection?: string
  deliverables?: string[]
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
  detailSections?: DetailBlock[]
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
    category: 'Branding Agency, Creative Company',
    industry: 'Design Agency',
    year: '2026',
    overview: 'Lozinr Studio is a brand identity studio focused on building strategic brand systems for ambitious founders. This rebrand aligned every part of the business—from positioning to visual identity—into one clear, consistent system.',
    challengeDesc: 'The previous identity no longer reflected the quality of the work or the direction of the studio.',
    strategicDirection: 'Design less. Think deeper. Every decision was made to increase clarity, consistency, and long-term recognition.',
    deliverables: [
      'Brand Strategy',
      'Positioning',
      'Visual Identity',
      'Website Design',
      'Brand Guidelines'
    ],
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

    // ─── Flexible Identity / Visual Identity / Application area ───────────
    // Reorder, remove, or add blocks freely — page.tsx just maps over this.
    detailSections: [
      {
        type: 'images',
        images: [
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%2002-KaqnpyY1ZifajnLEHfJvT9wKzQbmgq.png', alt: 'Lozinr Logo Construction Grid' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%2003-LZ9wMZbuwTvqVREeQCyFU3Ukbv1ZLI.png', alt: 'Lozinr Logo and Typography Variation' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-HGJSSbYrWDNpMXahvFVPxKScz0knzm.png', alt: 'Lozinr Studio Primary Lockup' },
        ]
      },
      {
        type: 'content',
        heading: 'Identity',
        fields: [
          { label: 'Thinking Statement', text: 'Recognition comes from repetition, not complexity.' },
          { label: 'Body', text: 'The identity was designed as a flexible system—not a single logo. Every variation follows the same principles, making the brand recognizable across every touchpoint.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Typography-cq2D7qokmf5awn4uIFOIjwdi8hBWr6.png', alt: 'Helvetica Neue Typography System' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%2040-k58aXEAs8w3raJoN8gRlYBndSRP7UF.png', alt: 'Color Palette - Autumn Orange, Off-White, Charcoal' },
        ]
      },
      {
        type: 'content',
        heading: 'Visual Identity',
        fields: [
          { label: 'Thinking Statement', text: 'Every visual choice should reinforce the same perception.' },
          { label: 'Color', text: 'Three colors. One purpose. Confidence through restraint.' },
          { label: 'Typography', text: 'One type family. Nine weights. Unlimited flexibility. Helvetica Neue became the foundation of the entire system because consistency scales better than variety.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%201-sPDYBiZdoFuMk6f9avuWkv1FKv1biV.jpg', alt: 'Lozinr Application 1' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%202-L9cyRymuIKcWCg9UcBExt3YwMLe6Yb.jpg', alt: 'Lozinr Application 2' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%203-vZ58nxLG71FNWlMeFqKKh5x3LkUxU4.jpg', alt: 'Lozinr Application 3' },
        ]
      },
      {
        type: 'content',
        heading: 'Application',
        fields: [
          { label: 'Body', text: 'The identity was applied across every touchpoint a design studio encounters — business cards, letterhead, envelopes, tote bags, and digital platforms. The stationery suite uses green as a surface with black materials layered on top, creating a system immediately recognisable across print and screen.' },
        ]
      },
      {
        type: 'images',
        images: [
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%204-fspfqdrqvw1fiSrAJ6afFiFVkwmLFI.jpg', alt: 'Lozinr Outcome 1' },
          { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artboard%205-4Ffal1MVK7oLMe7ixqa4gEDcFSMtN8.jpg', alt: 'Lozinr Outcome 2' },
        ]
      },
      {
        type: 'content',
        heading: 'Outcome',
        fields: [
          { label: 'Body', text: 'The hidden face concept gives clients and collaborators an immediate story to hold onto, turning a logo into a talking point. It established a clear visual language that now extends across all Lozinr projects—a foundation that scales as the studio grows.' },
        ]
      },
    ],

    images: [
      '/images/lozinr-hero.png',
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
  }
]