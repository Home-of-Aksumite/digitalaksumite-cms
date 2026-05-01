import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedServices(payload: Payload) {
  const serviceDocs = await Promise.all([
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'custom-software-development' } },
      data: {
        featured: false,
        order: 999,
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'web-development-design' } },
      data: {
        featured: false,
        order: 999,
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'system-architecture-strategy' } },
      data: {
        featured: false,
        order: 999,
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'website-strategy-planning' } },
      data: {
        title: 'Website Strategy & Planning',
        slug: 'website-strategy-planning',
        featured: true,
        order: 1,
        description: "Don't build blind. We map out exactly what your website needs to do, who it's for, and how to beat your competitors — before you write a single line of code.",
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'websites-that-bring-customers' } },
      data: {
        title: 'Websites That Bring Customers',
        slug: 'websites-that-bring-customers',
        featured: true,
        order: 2,
        description: 'Fast, stunning websites designed to turn visitors into buyers. We do not just make it look good — we make it work for your business 24/7.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'custom-tools-save-hours' } },
      data: {
        title: 'Custom Tools That Save You Hours',
        slug: 'custom-tools-save-hours',
        featured: true,
        order: 4,
        description: 'Stop doing the same work twice. We build software that automates your daily tasks — inventory, tracking, reports, whatever eats your time.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'online-stores-built-for-sales' } },
      data: {
        title: 'Online Stores Built for Sales',
        slug: 'online-stores-built-for-sales',
        featured: true,
        order: 3,
        description: 'Secure, smooth checkout experiences that customers trust. From product pages to payment confirmation — everything optimized to sell more.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'speed-growth-optimization' } },
      data: {
        title: 'Make Your Site Faster & Findable',
        slug: 'speed-growth-optimization',
        featured: true,
        order: 5,
        description: 'Your site exists. Now let us make it faster and get more people to it. We fix slow pages, improve Google ranking, and get you more leads.',
      },
    }),
    upsertByWhere({
      payload,
      collection: 'services',
      where: { slug: { equals: 'tech-team-on-retainer' } },
      data: {
        title: 'Your Tech Team on Retainer',
        slug: 'tech-team-on-retainer',
        featured: true,
        order: 6,
        description: 'Software breaks. Software ages. Hackers do not sleep. We maintain, update, and protect your systems so you never worry about tech again.',
      },
    }),
  ])

  return serviceDocs
    .map((d) => (d as unknown as { id?: string }).id)
    .filter((id): id is string => Boolean(id))
}
