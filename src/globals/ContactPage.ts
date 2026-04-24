import type { GlobalConfig } from 'payload';
import { isAuthenticated } from '../access';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'formTitle',
      type: 'text',
    },
    {
      name: 'formDescription',
      type: 'textarea',
    },
  ],
};
