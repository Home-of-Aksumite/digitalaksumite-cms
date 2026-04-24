import type { Payload } from 'payload'

import { seedAboutPage } from './globals/seedAboutPage'
import { seedContactPage } from './globals/seedContactPage'
import { seedFooter } from './globals/seedFooter'
import { seedHomePage } from './globals/seedHomePage'
import { seedNavbar } from './globals/seedNavbar'
import { seedPrivacyPolicy } from './globals/seedPrivacyPolicy'
import { seedSiteSettings } from './globals/seedSiteSettings'
import { seedTermsOfService } from './globals/seedTermsOfService'

export async function seedGlobals(payload: Payload) {
  await seedSiteSettings(payload)
  await seedHomePage(payload)
  await seedAboutPage(payload)
  await seedNavbar(payload)
  await seedContactPage(payload)
  await seedFooter(payload)
  await seedPrivacyPolicy(payload)
  await seedTermsOfService(payload)
}
