import type { PayloadRequest } from 'payload';

export const homeBundleEndpoint: { path: string; method: 'get'; handler: (req: PayloadRequest) => Promise<Response> } = {
  path: '/home-bundle',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    try {
      const payload = req.payload;

      // Fetch all needed data in parallel
      const [
        homePage,
        aboutPage,
        contactPage,
        siteSettings,
        footer,
        featuredServices,
        featuredProjects,
        featuredTestimonials,
        featuredBlogPosts,
        trustedPartners,
      ] = await Promise.all([
        payload.findGlobal({ slug: 'home-page' }),
        payload.findGlobal({ slug: 'about-page' }),
        payload.findGlobal({ slug: 'contact-page' }),
        payload.findGlobal({ slug: 'site-settings' }),
        payload.findGlobal({ slug: 'footer' }),
        payload.find({
          collection: 'services',
          where: { featured: { equals: true } },
          limit: 6,
          sort: '-createdAt',
        }),
        payload.find({
          collection: 'projects',
          where: { featured: { equals: true } },
          limit: 6,
          sort: '-createdAt',
        }),
        payload.find({
          collection: 'testimonials',
          where: { featured: { equals: true } },
          limit: 3,
          sort: '-createdAt',
        }),
        payload.find({
          collection: 'blog-posts',
          where: { featured: { equals: true } },
          limit: 3,
          sort: '-publishedDate',
        }),
        payload.find({
          collection: 'trusted-partners',
          where: { featured: { equals: true } },
          sort: 'order',
        }),
      ]);

      // Return bundle matching frontend expectations
      const bundle = {
        homePage,
        aboutPage,
        contactPage,
        siteSettings,
        footer,
        featuredServices: featuredServices.docs,
        featuredProjects: featuredProjects.docs,
        featuredTestimonials: featuredTestimonials.docs,
        featuredBlogPosts: featuredBlogPosts.docs,
        trustedPartners: trustedPartners.docs,
      };

      return new Response(JSON.stringify({
        data: bundle,
        meta: {
          timestamp: new Date().toISOString(),
        },
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('Error in home-bundle endpoint:', err);
      return new Response(JSON.stringify({
        error: {
          message: 'Failed to fetch home page data',
          details: err instanceof Error ? err.message : 'Unknown error',
        },
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};
