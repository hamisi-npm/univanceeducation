import type {SchemaTypeDefinition} from 'sanity'

import {blogCategory} from './blogCategory'
import {courseCategory} from './courseCategory'
import {degreeType} from './degreeType'
import {faculty} from './faculty'
import {faqCategory} from './faqCategory'
import {studyGuideCategory} from './studyGuideCategory'
import {studyLevel} from './studyLevel'

export const taxonomyTypes: SchemaTypeDefinition[] = [
  blogCategory,
  studyGuideCategory,
  faqCategory,
  courseCategory,
  studyLevel,
  faculty,
  degreeType,
]
