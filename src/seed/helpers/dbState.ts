import type { Payload } from 'payload'

export async function isDatabaseEmpty(payload: Payload): Promise<boolean> {
  try {
    const [services, homePage, siteSettings] = await Promise.all([
      (payload.find as unknown as (args: any) => Promise<any>)({
        collection: 'services',
        limit: 1,
        depth: 0,
      }),
      payload.findGlobal({ slug: 'home-page' }).catch(() => null),
      payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    ])

    const hasServices = (services?.totalDocs ?? 0) > 0
    const hasHomeHeroTitle = Boolean((homePage as any)?.heroTitle)
    const hasSiteName = Boolean((siteSettings as any)?.siteName)

    return !hasServices && !hasHomeHeroTitle && !hasSiteName
  } catch {
    return true
  }
}
