import type { CollectionConfig } from 'payload';
import { isAuthenticated } from '../access';

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

export const ResumeUploads: CollectionConfig = {
  slug: 'resume-uploads',
  admin: {
    useAsTitle: 'filename',
  },
  access: {
    read: isAuthenticated,
    create: () => true,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  upload: {
    staticDir: './media',
    mimeTypes: ['application/pdf'],
  },
  hooks: {
    beforeChange: [({ req }) => {
      const file = (req as any)?.files?.file;
      const size = typeof file?.size === 'number' ? file.size : undefined;
      const mimeType = typeof file?.mimetype === 'string' ? file.mimetype : undefined;

      if (size !== undefined && size > MAX_RESUME_SIZE_BYTES) {
        throw new Error('Resume file must be less than 5MB');
      }

      if (mimeType && mimeType !== 'application/pdf') {
        throw new Error('Resume must be a PDF');
      }

      return;
    }],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Internal label (not shown publicly)',
      },
    },
  ],
};
