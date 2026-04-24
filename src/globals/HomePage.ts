import type { GlobalConfig } from 'payload';
import { isAuthenticated } from '../access';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
    },
    {
      name: 'heroPrimaryButtonText',
      type: 'text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'heroPrimaryButtonUrl',
      type: 'text',
      defaultValue: '/#contact',
    },
    {
      name: 'heroSecondaryButtonText',
      type: 'text',
      defaultValue: 'View Services',
    },
    {
      name: 'heroSecondaryButtonUrl',
      type: 'text',
      defaultValue: '/services',
    },
    {
      name: 'heroSlides',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'servicesIntro',
      type: 'text',
    },
    {
      name: 'projectsIntro',
      type: 'text',
    },
    {
      name: 'testimonialsIntro',
      type: 'text',
    },
    {
      name: 'ctaTitle',
      type: 'text',
    },
    {
      name: 'ctaSubtitle',
      type: 'textarea',
    },
    {
      name: 'ctaButtonText',
      type: 'text',
    },
    {
      name: 'ctaPrimaryButtonText',
      type: 'text',
      defaultValue: 'Start Your Project',
    },
    {
      name: 'ctaPrimaryButtonUrl',
      type: 'text',
      defaultValue: '/#contact',
    },
    {
      name: 'ctaSecondaryButtonText',
      type: 'text',
      defaultValue: 'Schedule a Call',
    },
    {
      name: 'ctaSecondaryButtonUrl',
      type: 'text',
      defaultValue: '/#contact',
    },
  ],
};
