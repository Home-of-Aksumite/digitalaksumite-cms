import type { Payload } from 'payload'

export type SeedableCollection =
  | 'services'
  | 'projects'
  | 'testimonials'
  | 'blog-posts'
  | 'job-openings'
  | 'trusted-partners'

export async function upsertByWhere(args: {
  payload: Payload
  collection: SeedableCollection
  where: Record<string, unknown>
  data: Record<string, unknown>
}) {
  const { payload, collection, where, data } = args

  const existing = await (payload.find as unknown as (args: any) => Promise<any>)({
    collection,
    where,
    limit: 1,
    depth: 0,
  })

  const doc = existing.docs?.[0]

  if (doc?.id) {
    return payload.update({
      collection,
      id: doc.id,
      data,
      depth: 0,
    })
  }

  return payload.create({
    collection,
    data: data as unknown as Record<string, unknown>,
    depth: 0,
  } as unknown as Parameters<typeof payload.create>[0])
}
