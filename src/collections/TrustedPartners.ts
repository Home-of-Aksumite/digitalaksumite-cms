import type { CollectionConfig } from 'payload';
import { isAuthenticated } from '../access';

export const TrustedPartners: CollectionConfig = {
  slug: 'trusted-partners',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional link to partner website',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Partner', value: 'partner' },
        { label: 'Client', value: 'client' },
        { label: 'Technology', value: 'technology' },
      ],
      defaultValue: 'partner',
    },
  ],
};
