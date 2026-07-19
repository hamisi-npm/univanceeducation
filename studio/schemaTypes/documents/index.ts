import type {SchemaTypeDefinition} from 'sanity'

import {collectionTypes} from './collections'
import {pageDocumentTypes} from './pages'
import {sharedDocumentObjectTypes} from './shared'
import {siteDocumentTypes, siteObjectTypes} from './site'

export {
  collectionTypes,
  pageDocumentTypes,
  sharedDocumentObjectTypes,
  siteDocumentTypes,
  siteObjectTypes,
}

export const documentTypes: SchemaTypeDefinition[] = [
  ...siteDocumentTypes,
  ...pageDocumentTypes,
  ...collectionTypes,
]
