import type { Payload } from 'payload'

import { upsertByWhere } from '../helpers/upsert'

export async function seedBlogPosts(payload: Payload) {
  await upsertByWhere({
    payload,
    collection: 'blog-posts',
    where: { slug: { equals: 'the-silence-after-launch' } },
    data: {
      title: 'The Silence After the Launch',
      slug: 'the-silence-after-launch',
      excerpt: 'Why most software fails in month three, and how to prevent it.',
      featured: true,
      authorName: 'Digital Aksumite Team',
      publishedDate: '2026-01-15',
      content:
        'The launch went perfectly. Champagne. Congratulations. Then silence.\n\n' +
        'By month three, usage drops. Bugs pile up. The team that built it has moved to the next project. Technical debt compounds silently.\n\n' +
        'This is the pattern we see across the industry. Software is abandoned not because it was poorly launched, but because it was poorly maintained.\n\n' +
        'We build differently. Every project includes a maintenance roadmap from day one. Documentation is not an afterthought. Monitoring is not optional.\n\n' +
        'The best software is not the one that launches with fanfare. It is the one that still works flawlessly years later.',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'blog-posts',
    where: { slug: { equals: 'built-in-africa-used-in-berlin' } },
    data: {
      title: 'Built in Africa, Used in Berlin',
      slug: 'built-in-africa-used-in-berlin',
      excerpt: 'On building global-grade technology from Ethiopia.',
      featured: true,
      authorName: 'Digital Aksumite Team',
      publishedDate: '2026-02-20',
      content:
        'There is a misconception that quality technology only comes from certain places.\n\n' +
        'We are based in Addis Ababa. Our clients are in Singapore, Toronto, London, and Lagos. They do not work with us despite our location. They work with us because of our results.\n\n' +
        'African engineers bring unique advantages. We understand infrastructure constraints that would break lesser systems. We build resilience by necessity, not by choice.\n\n' +
        'When you build technology that works on unreliable networks, it works everywhere. When you design for limited resources, you create elegant solutions.\n\n' +
        'The future of technology is not geography. It is capability.',
    },
  })

  await upsertByWhere({
    payload,
    collection: 'blog-posts',
    where: { slug: { equals: 'the-boring-choice-is-right' } },
    data: {
      title: 'The Boring Choice Is Usually the Right One',
      slug: 'the-boring-choice-is-right',
      excerpt: 'Why we pick stable technology over trendy stacks.',
      featured: true,
      authorName: 'Digital Aksumite Team',
      publishedDate: '2026-03-05',
      content:
        'We have seen the framework of the month come and go.\n\n' +
        'Every year brings a new technology that promises to revolutionize everything. Developers chase trends. Companies rewrite working systems. Technical debt accumulates under the guise of innovation.\n\n' +
        'We choose boring technology. Tools that have been proven over decades. Languages with mature ecosystems. Systems with documented edge cases and predictable behavior.\n\n' +
        'When you are building for the long term, reliability trumps novelty every time. A boring stack that works is infinitely better than an exciting stack that breaks.\n\n' +
        'Your users do not care about your technology. They care that it works. Choose accordingly.',
    },
  })
}
