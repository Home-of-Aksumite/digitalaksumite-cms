import type { Payload } from 'payload'

export async function seedTermsOfService(payload: Payload) {
  await payload.updateGlobal({
    slug: 'terms-of-service',
    data: {
      pageTitle: 'Terms of Service',
      pageDescription: 'Clear Agreements. Fair Terms. Delivered As Promised.',
      lastUpdated: new Date().toISOString(),
      sections: [
        {
          title: 'Services',
          content:
            'We provide custom software development, web development, system architecture, and digital transformation consulting. Each project begins with a written agreement specifying scope, timeline, and deliverables.',
        },
        {
          title: 'Intellectual Property',
          content:
            'Client owns all rights to the final deliverables upon full payment. We retain the right to use general methodologies and non-proprietary techniques. All third-party components remain subject to their original licenses.',
        },
        {
          title: 'Confidentiality',
          content:
            'Information shared with us during project engagement remains strictly confidential. This obligation survives contract termination.',
        },
        {
          title: 'Payment Terms',
          content:
            'Standard terms: 50% upfront, 50% upon completion. Custom arrangements available for enterprise clients. Late payments may incur service suspension after reasonable notice.',
        },
        {
          title: 'Warranty & Liability',
          content:
            'We warrant that our work will meet agreed specifications for 90 days post-delivery. Our liability is limited to the contract value. We cannot be held responsible for circumstances beyond reasonable control.',
        },
        {
          title: 'Governing Law',
          content:
            'These terms are governed by the laws of the Federal Democratic Republic of Ethiopia, with jurisdiction in Addis Ababa.',
        },
      ],
    } as unknown as Record<string, unknown>,
  } as unknown as Parameters<typeof payload.updateGlobal>[0])
}
