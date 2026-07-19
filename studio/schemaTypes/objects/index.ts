import type {SchemaTypeDefinition} from 'sanity'

import {address} from './address'
import {button} from './button'
import {contactDetails} from './contactDetails'
import {ctaLink} from './ctaLink'
import {faqItem} from './faqItem'
import {imageWithAlt} from './imageWithAlt'
import {primaryOffice} from './primaryOffice'
import {richText} from './richText'
import {sectionHeader} from './sectionHeader'
import {selectOption} from './selectOption'
import {seo} from './seo'
import {socialLink} from './socialLink'
import {statistic} from './statistic'

/** Shared object schemas — register before documents that use them. */
export const objectTypes: SchemaTypeDefinition[] = [
  imageWithAlt,
  richText,
  selectOption,
  statistic,
  sectionHeader,
  ctaLink,
  button,
  socialLink,
  address,
  primaryOffice,
  contactDetails,
  faqItem,
  seo,
]
