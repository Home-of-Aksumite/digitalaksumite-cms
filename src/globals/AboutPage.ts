import type { GlobalConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  hooks: {
    afterRead: [({ doc }) => {
      if (!doc || typeof doc !== 'object') return doc

      const d = doc as any

      for (const key of ['mission', 'vision', 'teamIntro', 'history']) {
        const text = lexicalToPlainText(d[key])
        if (typeof text === 'string') d[key] = text
      }

      const values = d?.values
      if (Array.isArray(values)) {
        for (const v of values) {
          const text = lexicalToPlainText(v?.description)
          if (typeof text === 'string') v.description = text
        }
      }

      return d
    }],
    beforeChange: [({ data }) => {
      const d = data as any

      for (const key of ['mission', 'vision', 'teamIntro', 'history']) {
        const text = lexicalToPlainText(d?.[key])
        if (typeof text === 'string') d[key] = text
      }

      const values = d?.values
      if (Array.isArray(values)) {
        for (const v of values) {
          const text = lexicalToPlainText(v?.description)
          if (typeof text === 'string') v.description = text
        }
      }

      return d
    }],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'mission',
      type: 'textarea',
    },
    {
      name: 'vision',
      type: 'textarea',
    },
    {
      name: 'teamIntro',
      type: 'textarea',
    },
    {
      name: 'history',
      type: 'textarea',
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    },
    {
      name: 'companyImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
  ],
};
