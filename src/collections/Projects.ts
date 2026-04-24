import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const Projects: CollectionConfig = {
  slug: 'projects',
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
      const text = lexicalToPlainText(d?.description)
      if (typeof text === 'string') d.description = text
      return d
    }],
    beforeChange: [
      ({ data }: { data: { title?: string; slug?: string; [key: string]: unknown } }) => {
        const desc = lexicalToPlainText((data as any)?.description)
        if (typeof desc === 'string') (data as any).description = desc

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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'External project URL (if applicable)',
      },
    },
  ],
};
