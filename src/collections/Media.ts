import type { CollectionConfig } from 'payload';
import { isAuthenticated } from '../access';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: './media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'small',
        width: 600,
        height: 600,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 1200,
        height: 1200,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1920,
        height: 1920,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};
