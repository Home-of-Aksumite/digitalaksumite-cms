import type { Payload } from 'payload'

export async function seedAboutPage(payload: Payload) {
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      title: "Crafting Tomorrow's Foundation",
      mission:
        'To engineer digital infrastructure that empowers institutions and individuals across the world — from Addis Ababa to Amsterdam, from Nairobi to New York.',
      vision:
        'A world where technology serves humanity with integrity. Where African innovation leads globally. Where systems outlive their builders.',
      teamIntro: 'Our engineers combine technical precision with global perspective.',
      history:
        "Two years ago, three students in a campus dormitory saw something broken. Organizations struggled with technology that failed when it mattered most. Systems crashed. Data vanished. Trust eroded. We started with one laptop, no funding, and a conviction: Africa deserves technology as reliable as anything built in Silicon Valley or Berlin. So we built it ourselves. Today, we serve clients across three continents. The dormitory is gone. The conviction remains.",
      values: [
        { title: 'Excellence', description: 'Good enough is never enough.', icon: 'star' },
        { title: 'Impact', description: 'Technology must serve people, not vanity.', icon: 'zap' },
        { title: 'Integrity', description: 'We do what we say. No exceptions.', icon: 'shield' },
      ],
      stats: [
        { value: '2+', label: 'Years of Excellence' },
        { value: '50+', label: 'Systems Delivered' },
        { value: '3', label: 'Continents Served' },
        { value: '100%', label: 'Commitment' },
      ],
      companyImages: [],
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
