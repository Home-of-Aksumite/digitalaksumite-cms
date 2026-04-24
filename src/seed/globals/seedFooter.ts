import type { Payload } from 'payload'

export async function seedFooter(payload: Payload) {
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        'Digital Aksumite crafts software systems with a hundred-year perspective. We engineer digital infrastructure that serves civilization.',
      copyrightText: '© 2026 Digital Aksumite. All rights reserved. Built to endure.',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
