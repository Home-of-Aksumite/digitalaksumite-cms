import type { Payload } from 'payload'

export async function seedPrivacyPolicy(payload: Payload) {
  await payload.updateGlobal({
    slug: 'privacy-policy',
    data: {
      pageTitle: 'Privacy Policy',
      pageDescription: 'Your Data. Your Trust. Our Responsibility.',
      lastUpdated: new Date().toISOString(),
      sections: [
        {
          title: 'Information We Collect',
          content:
            'We collect contact details you provide (name, email, phone), project requirements and business information, and technical data necessary for service delivery (IP addresses, system logs).',
        },
        {
          title: 'How We Use It',
          content:
            'Your information is used to deliver the services you requested, communicate project progress and updates, and maintain and improve our systems. We do not sell your data. Ever.',
        },
        {
          title: 'How We Protect It',
          content:
            'We employ industry-standard encryption, limit access to essential personnel only, conduct regular security audits and updates, and retain data only as long as legally and operationally necessary.',
        },
        {
          title: 'Your Rights',
          content:
            'You may request access to, correction of, or deletion of your data at any time. Contact us using the email address listed on our contact page.',
        },
      ],
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
