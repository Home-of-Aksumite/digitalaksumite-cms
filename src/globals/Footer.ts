import type { GlobalConfig } from 'payload';
import { isAuthenticated } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'copyrightText',
      type: 'text',
    },
  ],
};
