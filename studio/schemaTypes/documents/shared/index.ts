import type {SchemaTypeDefinition} from 'sanity'

import {contactMethod} from './contactMethod'
import {contentLink} from './contentLink'
import {ctaBanner} from './ctaBanner'
import {faqPreview} from './faqPreview'
import {heroBadge} from './heroBadge'
import {heroFloatingCard} from './heroFloatingCard'
import {whyChooseUsFeature} from './whyChooseUsFeature'

/** Document-local object types — register before documents that use them. */
export const sharedDocumentObjectTypes: SchemaTypeDefinition[] = [
  ctaBanner,
  heroBadge,
  heroFloatingCard,
  contactMethod,
  whyChooseUsFeature,
  faqPreview,
  contentLink,
]
