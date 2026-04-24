import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'
import { isAuthenticated } from '../access'

export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    afterRead: [({ doc }) => {
      const d = doc as any
      const desc = lexicalToPlainText(d?.description)
      if (typeof desc === 'string') d.description = desc
      const reqs = lexicalToPlainText(d?.requirements)
      if (typeof reqs === 'string') d.requirements = reqs
      return d
    }],
    beforeChange: [
      ({ data }: { data: { title?: string; slug?: string; [key: string]: unknown } }) => {
        const desc = lexicalToPlainText((data as any)?.description)
        if (typeof desc === 'string') (data as any).description = desc
        const reqs = lexicalToPlainText((data as any)?.requirements)
        if (typeof reqs === 'string') (data as any).requirements = reqs

        if (data.title && !data.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'department',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'employmentType',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Part-time', value: 'Part-time' },
        { label: 'Internship', value: 'Internship' },
        { label: 'Contract', value: 'Contract' },
      ],
      defaultValue: 'Full-time',
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'isInternship',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'requirements',
      type: 'textarea',
    },
    {
      name: 'salaryRange',
      type: 'text',
    },
  ],
};
