import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedTrustedPartners(payload: Payload) {
  const trustedPartners = [
    {
      name: 'Google',
      link: 'https://google.com',
      order: 1,
      featured: true,
      category: 'technology',
    },
    {
      name: 'The United Stand',
      link: 'https://theunitedstand.com',
      order: 2,
      featured: true,
      category: 'client',
    },
    {
      name: 'Yohana Music',
      link: 'https://yohannamusic.com',
      order: 3,
      featured: true,
      category: 'client',
    },
    {
      name: 'Aksum Eye Clinic',
      link: 'https://aksumeyeclinic.com',
      order: 4,
      featured: true,
      category: 'client',
    },
    {
      name: 'Vercel',
      link: 'https://vercel.com',
      order: 5,
      featured: true,
      category: 'technology',
    },
    {
      name: 'Figma',
      link: 'https://figma.com',
      order: 6,
      featured: true,
      category: 'technology',
    },
  ]

  for (const partner of trustedPartners) {
    await upsertByWhere({
      payload,
      collection: 'trusted-partners',
      where: {
        name: {
          equals: partner.name,
        },
      },
      data: partner as unknown as Record<string, unknown>,
    })
  }
}
