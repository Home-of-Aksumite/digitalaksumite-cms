import type { Payload } from 'payload'

export async function seedHomePage(payload: Payload) {
  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'We Build Systems That Last',
      heroSubtitle: 'We build systems that define, protect and guide our society.',
      heroPrimaryButtonText: 'Contact Us',
      heroPrimaryButtonUrl: '/#contact',
      heroSecondaryButtonText: 'Services',
      heroSecondaryButtonUrl: '/#services',
      heroSlides: [],
      servicesIntro: 'Our Services',
      projectsIntro: 'Featured Projects',
      testimonialsIntro: 'What Clients Say',
      ctaTitle: 'Ready to Build Something Lasting?',
      ctaSubtitle:
        'Let us bring your vision to life with the same care and precision that built ancient monuments.',
      ctaButtonText: 'Start Your Project',
      ctaPrimaryButtonText: 'Start Your Project',
      ctaPrimaryButtonUrl: '/#contact',
      ctaSecondaryButtonText: 'Schedule a Call',
      ctaSecondaryButtonUrl: '/#contact',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
