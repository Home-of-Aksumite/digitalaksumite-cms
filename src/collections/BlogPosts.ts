import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterRead: [({ doc }) => {
      const d = doc as any
      const text = lexicalToPlainText(d?.content)
      if (typeof text === 'string') d.content = text
      return d
    }],
    beforeChange: [
      ({ data }: { data: { title?: string; slug?: string; [key: string]: unknown } }) => {
        const content = lexicalToPlainText((data as any)?.content)
        if (typeof content === 'string') (data as any).content = content

        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'authorName',
      type: 'text',
    },
  ],
};
