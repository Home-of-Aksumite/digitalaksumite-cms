import type { Payload } from 'payload'

export async function seedNavbar(payload: Payload) {
  await payload.updateGlobal({
    slug: 'navbar',
    data: {
      ctaButtonText: 'Get Started',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
