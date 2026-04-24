import dotenv from 'dotenv'
import { getPayload } from 'payload'

import { runSeed } from './runSeed'

dotenv.config()

async function main() {
  const payload = await getPayload({
    config: (await import('../payload.config.js')).default,
  })

  await runSeed(payload)

  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
