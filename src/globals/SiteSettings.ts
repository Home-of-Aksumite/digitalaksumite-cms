import type { GlobalConfig } from 'payload';
import { isAuthenticated } from '../access';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'companyEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'companyPhone',
      type: 'text',
    },
    {
      name: 'companyAddress',
      type: 'textarea',
    },
    {
      name: 'workingHours',
      type: 'text',
    },
    {
      name: 'linkedin',
      type: 'text',
    },
    {
      name: 'twitter',
      type: 'text',
    },
    {
      name: 'github',
      type: 'text',
    },
    {
      name: 'instagram',
      type: 'text',
    },
    {
      name: 'facebook',
      type: 'text',
    },
    {
      name: 'defaultSEODescription',
      type: 'textarea',
    },
  ],
};
