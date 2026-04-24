import type { Payload } from 'payload'
import { isDatabaseEmpty } from './helpers/dbState'

import { seedGlobals } from './seedGlobals'
import { seedCollections } from './seedCollections'

export async function runSeed(payload: Payload, args?: { overwrite?: boolean }) {
  const isProduction = process.env.NODE_ENV === 'production'
  const enableSeedInProduction = process.env.ENABLE_SEED_IN_PRODUCTION === 'true'
  const overwriteEnv = process.env.SEED_OVERWRITE === 'true'
  const overwrite = Boolean(args?.overwrite ?? overwriteEnv)

  if (isProduction && !enableSeedInProduction) {
    payload.logger.info(
      '🌱 Seed skipped: Production environment (set ENABLE_SEED_IN_PRODUCTION=true to override)'
    )
    return { seeded: false, reason: 'production_disabled' as const }
  }

  const shouldSeed = overwrite ? true : await isDatabaseEmpty(payload)

  if (!shouldSeed) {
    payload.logger.info('🌱 Seed skipped: Database already contains content (set SEED_OVERWRITE=true to overwrite)')
    return { seeded: false, reason: 'not_empty' as const }
  }

  payload.logger.info('🌱 Seeding Payload content...')

  await seedGlobals(payload)
  await seedCollections(payload)

  payload.logger.info('✅ Seed complete')

  return { seeded: true, reason: 'completed' as const }
}
