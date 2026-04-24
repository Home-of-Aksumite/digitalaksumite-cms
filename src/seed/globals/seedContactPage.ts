import type { Payload } from 'payload'

export async function seedContactPage(payload: Payload) {
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      title: 'Get in Touch',
      subtitle: 'Ready to start your next project? We would love to hear from you.',
      description:
        'Have a project in mind? Let us build something enduring together. Reach out and let us discuss how we can help.',
      formTitle: 'Send Us a Message',
      formDescription:
        'Fill out the form below and we will respond within 24 hours. Every message is read by our team.',
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
