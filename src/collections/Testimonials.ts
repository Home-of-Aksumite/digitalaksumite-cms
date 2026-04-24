import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
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
      const text = lexicalToPlainText(d?.quote)
      if (typeof text === 'string') d.quote = text
      return d
    }],
    beforeChange: [({ data }) => {
      const d = data as any
      const text = lexicalToPlainText(d?.quote)
      if (typeof text === 'string') d.quote = text
      return d
    }],
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'clientPhoto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
