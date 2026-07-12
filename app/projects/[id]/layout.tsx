import type { Metadata } from 'next'
import { projectsData } from '@/lib/projects-data'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const projectName = params.id
  const project = projectsData.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === projectName)
  
  if (!project) {
    return {
      title: 'Project Not Found | Lozinr',
      description: 'This project could not be found.',
    }
  }

  return {
    title: `${project.name} — Brand Identity Project | Lozinr`,
    description: `${project.description} Discover how Lozinr built a distinctive brand identity system for ${project.name}.`,
    keywords: [
      project.category,
      'brand identity',
      'branding project',
      'visual identity',
      'logo design',
    ],
    alternates: {
      canonical: `https://lozinr.com/projects/${projectName}`,
    },
    openGraph: {
      title: `${project.name} — Brand Identity Project`,
      description: `${project.description} Discover our brand identity work.`,
      url: `https://lozinr.com/projects/${projectName}`,
      images: [
        {
          url: project.images[0],
          width: 1200,
          height: 630,
          alt: `${project.name} brand identity project`,
        },
      ],
    },
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
