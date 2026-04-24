import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedJobOpenings(payload: Payload) {
  await upsertByWhere({
    payload,
    collection: 'job-openings',
    where: { slug: { equals: 'senior-software-engineer' } },
    data: {
      title: 'Senior Software Engineer',
      slug: 'senior-software-engineer',
      department: 'Engineering',
      location: 'Addis Ababa, Ethiopia',
      employmentType: 'Full-time',
      isInternship: false,
      isActive: true,
      publishedDate: '2026-03-01',
      salaryRange: '',
      description:
        'We are looking for experienced software engineers to join our team building systems that serve millions.\n\n' +
        'You will work on challenging infrastructure projects, design scalable architectures, and mentor junior developers.\n\n' +
        'Requirements:\n\n' +
        '• 5+ years of professional software development experience\n' +
        '• Strong knowledge of TypeScript, Node.js, and cloud platforms\n' +
        '• Experience with distributed systems and microservices\n' +
        '• Commitment to code quality and testing',
      requirements: '',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'job-openings',
    where: { slug: { equals: 'product-designer' } },
    data: {
      title: 'Product Designer',
      slug: 'product-designer',
      department: 'Design',
      location: 'Addis Ababa, Ethiopia',
      employmentType: 'Full-time',
      isInternship: false,
      isActive: true,
      publishedDate: '2026-03-10',
      salaryRange: '',
      description:
        'We need a product designer who understands that design is about solving problems, not just making things pretty.\n\n' +
        'You will work closely with engineers and clients to create interfaces that are both beautiful and functional.\n\n' +
        'Requirements:\n\n' +
        '• 3+ years of product design experience\n' +
        '• Proficiency in Figma and design systems\n' +
        '• Strong portfolio demonstrating user-centered design\n' +
        '• Experience working with engineering teams',
      requirements: '',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'job-openings',
    where: { slug: { equals: 'software-engineering-intern' } },
    data: {
      title: 'Software Engineering Intern',
      slug: 'software-engineering-intern',
      department: 'Engineering',
      location: 'Addis Ababa, Ethiopia',
      employmentType: 'Internship',
      isInternship: true,
      isActive: true,
      publishedDate: '2026-03-15',
      salaryRange: '',
      description:
        'Our internship program is designed for students and recent graduates who want to learn how to build production systems.\n\n' +
        'You will work alongside senior engineers on real projects, receive mentorship, and gain hands-on experience with modern technologies.\n\n' +
        'Requirements:\n\n' +
        '• Currently studying Computer Science or related field\n' +
        '• Basic knowledge of JavaScript/TypeScript\n' +
        '• Strong problem-solving skills\n' +
        '• Eagerness to learn and grow',
      requirements: '',
    },
  })
}
