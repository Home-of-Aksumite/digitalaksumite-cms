import type { GlobalConfig } from 'payload';
import { isAuthenticated } from '../access'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
    },
  ],
};
