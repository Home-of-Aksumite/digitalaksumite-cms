import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedTestimonials(payload: Payload) {
  await upsertByWhere({
    payload,
    collection: 'testimonials',
    where: { clientName: { equals: 'Marcus Chen' } },
    data: {
      clientName: 'Marcus Chen',
      company: 'Pacific Trade Network',
      rating: 5,
      featured: true,
      quote:
        'Our platform processes transactions across twelve time zones. Digital Aksumite built the backbone we never worry about. That peace of mind is rare.',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'testimonials',
    where: { clientName: { equals: 'Sarah Williams' } },
    data: {
      clientName: 'Sarah Williams',
      company: 'Meridian Logistics',
      rating: 5,
      featured: true,
      quote:
        'We needed a system that understood both African infrastructure and North American standards. They delivered exactly that. No compromises.',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'testimonials',
    where: { clientName: { equals: 'Dr. Yonas Alemu' } },
    data: {
      clientName: 'Dr. Yonas Alemu',
      company: 'Aksum Eye Clinic',
      rating: 5,
      featured: true,
      quote:
        'Our patients trust us with their sight. We trust Digital Aksumite with our technology. That says everything.',
    },
  })
}
