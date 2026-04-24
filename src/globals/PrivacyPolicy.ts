import type { GlobalConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const PrivacyPolicy: GlobalConfig = {
  slug: 'privacy-policy',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  hooks: {
    afterRead: [({ doc }) => {
      const d = doc as any
      const sections = d?.sections
      if (Array.isArray(sections)) {
        for (const s of sections) {
          const text = lexicalToPlainText(s?.content)
          if (typeof text === 'string') s.content = text
        }
      }
      return d
    }],
    beforeChange: [({ data }) => {
      const d = data as any
      const sections = d?.sections
      if (Array.isArray(sections)) {
        for (const s of sections) {
          const text = lexicalToPlainText(s?.content)
          if (typeof text === 'string') s.content = text
        }
      }
      return d
    }],
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'pageDescription',
      type: 'textarea',
    },
    {
      name: 'lastUpdated',
      type: 'date',
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'textarea',
        },
      ],
    },
  ],
};
