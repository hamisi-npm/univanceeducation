import type {SchemaTypeDefinition} from 'sanity'

import {footer} from './footer'
import {navigation, navigationItem} from './navigation'
import {siteSettings} from './siteSettings'

export {navigationItem}

export const siteDocumentTypes: SchemaTypeDefinition[] = [
  siteSettings,
  navigation,
  footer,
]

export const siteObjectTypes: SchemaTypeDefinition[] = [navigationItem]
