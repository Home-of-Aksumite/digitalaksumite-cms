import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

function sanitizeInput(input: unknown): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

function normalizeRelationshipID(value: unknown): string | number | undefined {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (!value || typeof value !== 'object') return undefined;

  const id = (value as any).id;
  if (typeof id === 'string' || typeof id === 'number') return id;
  return undefined;
}

const validateAndNormalizeJobApplication = async ({ data, operation, req }: any) => {
  const d = data as any;

  const coverLetterText = lexicalToPlainText(d?.coverLetter);
  if (typeof coverLetterText === 'string') d.coverLetter = coverLetterText;

  const name = sanitizeInput(d?.name);
  const email = typeof d?.email === 'string' ? d.email.toLowerCase().trim() : '';
  const phone = d?.phone ? sanitizeInput(d.phone) : undefined;
  const portfolioLink = typeof d?.portfolioLink === 'string' ? d.portfolioLink.trim() : undefined;
  const coverLetter = sanitizeInput(d?.coverLetter);

  const errors: string[] = [];

  if (!name || name.length < 3) errors.push('Name must be at least 3 characters');
  if (!email || !EMAIL_REGEX.test(email)) errors.push('Valid email is required');
  if (!coverLetter || coverLetter.length < 10) errors.push('Cover letter must be at least 10 characters');
  if (phone && !PHONE_REGEX.test(phone)) errors.push('Invalid phone number format');
  if (portfolioLink && !URL_REGEX.test(portfolioLink)) errors.push('Invalid portfolio URL format');

  const jobOpeningID = normalizeRelationshipID(d?.jobOpening);

  if (jobOpeningID) {
    const jobOpening = await req.payload.findByID({
      collection: 'job-openings',
      id: jobOpeningID,
      depth: 0,
    });

    if (!jobOpening) {
      errors.push('Invalid job opening reference');
    } else if ((jobOpening as any).isActive === false) {
      errors.push('This job opening is no longer active');
    }
  } else {
    d.applicationType = 'General Application';
  }

  if (errors.length > 0) {
    throw new Error(errors.join(' | '));
  }

  d.name = name;
  d.email = email;
  if (typeof phone === 'string') d.phone = phone;
  if (typeof portfolioLink === 'string') d.portfolioLink = portfolioLink;
  d.coverLetter = coverLetter;

  if (operation === 'create') {
    d.submittedAt = new Date();
  }

  return d;
};

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'applicationType', 'submittedAt'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true, // Public submissions allowed
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  hooks: {
    afterRead: [({ doc }) => {
      const d = doc as any
      const text = lexicalToPlainText(d?.coverLetter)
      if (typeof text === 'string') d.coverLetter = text
      return d
    }],
    beforeChange: [validateAndNormalizeJobApplication],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'applicationType',
      type: 'select',
      options: [
        { label: 'Job Application', value: 'Job Application' },
        { label: 'Internship', value: 'Internship' },
        { label: 'General Application', value: 'General Application' },
      ],
      defaultValue: 'Job Application',
      required: true,
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resume-uploads' as any,
      admin: {
        description: 'Upload resume/CV file',
      },
    },
    {
      name: 'portfolioLink',
      type: 'text',
      admin: {
        description: 'Optional portfolio link',
      },
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      required: true,
    },
    {
      name: 'jobOpening',
      type: 'relationship',
      relationTo: 'job-openings',
      admin: {
        description: 'Optional: link to specific job opening',
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      defaultValue: () => new Date(),
    },
  ],
};
