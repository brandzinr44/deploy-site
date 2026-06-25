import type { MetadataRoute } from 'next'
import { projectsData } from '@/lib/projects-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lozinr.com'

  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: 'weekly' as const,
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: 'monthly' as const,
      priority: 0.95,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      lastModified: new Date(),
    },
  ]

  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
    lastModified: new Date(),
  }))

  return [...staticPages, ...projectPages]
}
