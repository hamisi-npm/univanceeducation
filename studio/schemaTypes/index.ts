import type {SchemaTypeDefinition} from 'sanity'

import {
  collectionTypes,
  pageDocumentTypes,
  sharedDocumentObjectTypes,
  siteDocumentTypes,
  siteObjectTypes,
  systemDocumentTypes,
} from './documents'
import {objectTypes} from './objects'
import {taxonomyTypes} from './taxonomy'

/**
 * All Sanity schema types.
 * Order: shared objects → document objects → taxonomy → collections → site → pages → system.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectTypes,
  ...siteObjectTypes,
  ...sharedDocumentObjectTypes,
  ...taxonomyTypes,
  ...collectionTypes,
  ...siteDocumentTypes,
  ...pageDocumentTypes,
  ...systemDocumentTypes,
]
