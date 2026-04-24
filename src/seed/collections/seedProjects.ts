import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedProjects(payload: Payload, args: { serviceIds: string[] }) {
  const { serviceIds } = args

  await upsertByWhere({
    payload,
    collection: 'projects',
    where: { slug: { equals: 'the-united-stand' } },
    data: {
      title: 'The United Stand',
      slug: 'the-united-stand',
      featured: true,
      link: 'https://theunitedstand.com',
      services: serviceIds,
      description:
        "Complete digital infrastructure for the world's largest independent Manchester United fan channel.\n\n" +
        'With 2M+ subscribers and peak concurrent viewership exceeding 500,000 during major matches, the platform demands absolute reliability. We engineered a content management system, subscription infrastructure, and video delivery pipeline that never falters when the world watches.\n\n' +
        'The challenge: handle millions of concurrent users, integrate multiple payment gateways for global donations, and maintain sub-second page loads across five continents.\n\n' +
        'Outcome:\n\n' +
        '• Zero downtime during Manchester Derby peak traffic\n' +
        '• 40% faster page loads compared to previous platform\n' +
        '• Global CDN serving 50+ countries simultaneously',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'projects',
    where: { slug: { equals: 'aksum-eye-clinic' } },
    data: {
      title: 'Aksum Eye Clinic',
      slug: 'aksum-eye-clinic',
      featured: true,
      link: 'https://aksumeyeclinic.com',
      services: serviceIds,
      description:
        "Patient management system and public website for Ethiopia's premier eye care facility.\n\n" +
        'We digitized appointment scheduling, patient records, and billing for a clinic serving thousands monthly. The system handles sensitive medical data with encryption standards meeting international healthcare compliance.\n\n' +
        'Patients now book appointments in seconds. Staff access complete medical histories instantly. The clinic operates with the efficiency of European institutions while serving local communities.\n\n' +
        'Impact:\n\n' +
        '• 60% reduction in appointment scheduling time\n' +
        '• 100% digital patient record retention\n' +
        '• Zero data breaches since launch',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'projects',
    where: { slug: { equals: 'yohana-music' } },
    data: {
      title: 'Yohana Music',
      slug: 'yohana-music',
      featured: true,
      link: 'https://yohanasolomon.com',
      services: serviceIds,
      description:
        'Portfolio platform for an Ethiopian artist reaching global audiences.\n\n' +
        'Designed for discovery and built for scale. The platform showcases music, visual art, and live performance schedules to fans across three continents. We prioritized immersive visual design while maintaining lightning-fast load times.\n\n' +
        'Integration with streaming platforms, automated tour announcements, and a merchandise system enable the artist to focus on creation while technology handles distribution.\n\n' +
        'Features:\n\n' +
        '• Direct fan engagement through integrated newsletter\n' +
        '• Multi-language support for global reach\n' +
        '• E-commerce ready for merchandise expansion',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'projects',
    where: { slug: { equals: 'meridian-logistics' } },
    data: {
      title: 'Meridian Logistics',
      slug: 'meridian-logistics',
      featured: false,
      link: 'https://meridianlogistics.example',
      services: serviceIds,
      description:
        'Real-time tracking and fleet management system connecting East African supply chains to European markets.\n\n' +
        'We built the digital backbone that tracks thousands of shipments across borders. GPS tracking, automated customs documentation, and predictive analytics help goods move faster with complete transparency.\n\n' +
        'The system integrates with port authorities, freight forwarders, and client ERP systems. Real-time visibility replaced phone calls and paperwork.\n\n' +
        'Capabilities:\n\n' +
        '• Live tracking across 6 countries and 2 continents\n' +
        '• Automated customs pre-clearance documentation\n' +
        '• 30% faster delivery times through route optimization',
    },
  })
}
