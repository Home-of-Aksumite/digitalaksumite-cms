import type { Payload } from 'payload'

export async function seedSiteSettings(payload: Payload) {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Digital Aksumite',
      companyEmail: 'hello@digitalaksumite.com',
      companyPhone: '+251 976818108',
      companyAddress: 'Addis Ababa, Ethiopia',
      workingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
      linkedin: 'https://www.linkedin.com/in/digitalaksumite/',
      twitter: 'https://x.com/digitalaksumite',
      instagram: 'https://www.instagram.com/digitalaksumite/',
      github: 'https://github.com/digitalaksumite',
      facebook: 'https://facebook.com/digitalaksumite',
      defaultSEODescription: 'Digital Aksumite - Engineering software systems with a hundred-year perspective.',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
