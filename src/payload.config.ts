import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';

import { collections } from './collections'
import { globals } from './globals'

// Custom endpoint for home bundle
import { homeBundleEndpoint } from './endpoints/home-bundle';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret) {
  throw new Error('Missing PAYLOAD_SECRET environment variable');
}

const databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
  throw new Error('Missing DATABASE_URL environment variable');
}

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' | Digital Aksumite CMS',
    },
  },
  editor: lexicalEditor({}),
  onInit: async (payload) => {
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction) return

    try {
      const seedModule = await import('./seed/runSeed')
      await seedModule.runSeed(payload)
    } catch (err) {
      payload.logger.error({ err }, 'Auto-seed failed')
    }
  },
  collections,
  globals,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'Medias',
        },
        'resume-uploads': {
          prefix: 'Resumes',
        },
      } as any,
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: process.env.R2_REGION || 'auto',
        endpoint: process.env.R2_ENDPOINT,
      },
    }),
  ],
  endpoints: [homeBundleEndpoint],
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
  }),
  secret: payloadSecret,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    'http://localhost:3000',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:8000',
    'http://localhost:3001', // Next.js dev
  ],
});
