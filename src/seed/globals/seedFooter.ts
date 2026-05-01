import type { Payload } from 'payload'

export async function seedFooter(payload: Payload) {
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        'Digital Aksumite designs customer acquisition systems that transform digital presence into measurable business inquiries. We combine websites, lead capture, and automation into one conversion-focused system.',
      copyrightText: '© 2026 Digital Aksumite. All rights reserved. Built to endure.',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
