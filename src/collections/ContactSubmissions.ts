import type { CollectionConfig } from 'payload';
import { lexicalToPlainText } from '../utils/lexicalToPlainText'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

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

const validateAndNormalizeContactSubmission = async ({ data, operation }: any) => {
  const d = data as any;

  const messageText = lexicalToPlainText(d?.message);
  if (typeof messageText === 'string') d.message = messageText;

  const name = sanitizeInput(d?.name);
  const email = typeof d?.email === 'string' ? d.email.toLowerCase().trim() : '';
  const phone = d?.phone ? sanitizeInput(d.phone) : undefined;
  const message = sanitizeInput(d?.message);

  const errors: string[] = [];

  if (!name || name.length < 3) errors.push('Name must be at least 3 characters');
  if (!email || !EMAIL_REGEX.test(email)) errors.push('Valid email is required');
  if (!message || message.length < 10) errors.push('Message must be at least 10 characters');
  if (phone && !PHONE_REGEX.test(phone)) errors.push('Invalid phone number format');

  if (errors.length > 0) {
    throw new Error(errors.join(' | '));
  }

  d.name = name;
  d.email = email;
  if (typeof phone === 'string') d.phone = phone;
  d.message = message;

  if (operation === 'create') {
    d.submittedAt = new Date();
  }

  return d;
};

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'inquiryType', 'submittedAt'],
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
      const text = lexicalToPlainText(d?.message)
      if (typeof text === 'string') d.message = text
      return d
    }],
    beforeChange: [validateAndNormalizeContactSubmission],
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
      name: 'inquiryType',
      type: 'select',
      options: [
        { label: 'General Inquiry', value: 'General Inquiry' },
        { label: 'Project Request', value: 'Project Request' },
        { label: 'Question', value: 'Question' },
        { label: 'Partnership', value: 'Partnership' },
        { label: 'Other', value: 'Other' },
      ],
      defaultValue: 'General Inquiry',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'serviceInterest',
      type: 'text',
    },
    {
      name: 'budget',
      type: 'text',
    },
    {
      name: 'timeline',
      type: 'text',
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
