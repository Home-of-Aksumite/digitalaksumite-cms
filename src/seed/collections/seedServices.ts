import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedServices(payload: Payload) {
  const serviceDocs = await Promise.all([
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'custom-software-development' } },
      data: {
        title: 'Custom Software Development',
        slug: 'custom-software-development',
        featured: true,
        description: 'Tailored applications engineered for your specific workflow. Scalable, secure, and built to evolve.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'web-development-design' } },
      data: {
        title: 'Web Development & Design',
        slug: 'web-development-design',
        featured: true,
        description: 'High-performance websites that convert visitors into believers. Fast, accessible, visually striking.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'system-architecture-strategy' } },
      data: {
        title: 'System Architecture & Strategy',
        slug: 'system-architecture-strategy',
        featured: true,
        description: 'Technical roadmaps for organizations ready to modernize. We design what others will build.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'digital-transformation' } },
      data: {
        title: 'Digital Transformation',
        slug: 'digital-transformation',
        featured: false,
        description: 'Legacy systems reimagined. We bridge where you are and where you need to be.',
      },
    }),
  ])

  return serviceDocs
    .map((d) => (d as unknown as { id?: string }).id)
    .filter((id): id is string => Boolean(id))
}
