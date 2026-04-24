import type { Payload } from 'payload'

import { seedServices } from './collections/seedServices'
import { seedProjects } from './collections/seedProjects'
import { seedTestimonials } from './collections/seedTestimonials'
import { seedBlogPosts } from './collections/seedBlogPosts'
import { seedJobOpenings } from './collections/seedJobOpenings'
import { seedTrustedPartners } from './collections/seedTrustedPartners'

export async function seedCollections(payload: Payload) {
  const serviceIds = await seedServices(payload)
  await seedProjects(payload, { serviceIds })
  await seedTestimonials(payload)
  await seedBlogPosts(payload)
  await seedJobOpenings(payload)
  await seedTrustedPartners(payload)
}
