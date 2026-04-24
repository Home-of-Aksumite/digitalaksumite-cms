# Digital Aksumite CMS (Payload)

Payload backend for managing website content, job applications, and contact submissions.

## Quick Start

```bash
npm install
npm run dev
```

Admin UI:
- http://localhost:8000/admin

API:
- http://localhost:8000/api

## Content Collections / Globals

### Collections

- Job Openings
  - Purpose: career listings
  - Key fields: title, department, location, description, employmentType, isActive

- Blog Posts
  - Purpose: articles
  - Key fields: title, excerpt, content, featuredImage, authorName, publishedDate

- Contact Submissions
  - Purpose: website form submissions
  - Key fields: name, email, message, status

- Job Applications
  - Purpose: applications with optional resume upload
  - Key fields: name, email, coverLetter, resume (media), jobOpening (relationship)

- Services
  - Purpose: services listing
  - Key fields: title, slug, descriptions, icon (media), featured, order

- Projects
  - Purpose: project portfolio
  - Key fields: title, slug, summary/description, featuredImage (media), featured, order

- Testimonials
  - Purpose: social proof
  - Key fields: quote, clientName, company, rating, featured, order

- Trusted Partners
  - Purpose: logos/partners
  - Key fields: name, logo (media), link, featured, order

### Globals

- Home Page
- About Page
- Contact Page
- Site Settings
- Navbar
- Footer
- Privacy Policy
- Terms of Service

## Authentication / Public Access

- The Admin UI requires an admin user.
- Public website reads are intended to be available without authentication.
- Public form submissions:
  - POST `/api/contact-submissions`
  - POST `/api/job-applications`

If you enable auth for public endpoints, you must also set `NEXT_PUBLIC_CMS_API_TOKEN` in the frontend.

## Seed Data

In development, the CMS auto-seeds initial content on startup.

- Entry point: `src/seed/runSeed.ts`
- Triggered from: `src/payload.config.ts` (`onInit`)

## Optimized Endpoint: Home Bundle

To reduce frontend round-trips, the CMS exposes a single endpoint that returns all home page data:

- GET `/api/home-bundle`

Implementation:
- `src/endpoints/home-bundle.ts`

## Media Upload

Media is stored in the `media` collection.

- Upload: POST `/api/media` (multipart form-data)
  - Field name: `file`

Frontend usage:
- `digitalaksumite-web/src/services/job.service.ts`

## Database

Payload uses PostgreSQL in this project.

Required env vars:
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

## Deployment

Typical production flow:

```bash
npm run build
npm run start
```
