import type {SchemaTypeDefinition} from 'sanity'

import {blogCategory} from './blogCategory'
import {faqCategory} from './faqCategory'
import {studyGuideCategory} from './studyGuideCategory'

export const taxonomyTypes: SchemaTypeDefinition[] = [
  blogCategory,
  studyGuideCategory,
  faqCategory,
]
