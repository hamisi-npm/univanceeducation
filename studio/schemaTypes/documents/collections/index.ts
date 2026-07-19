import type {SchemaTypeDefinition} from 'sanity'

import {author} from './author'
import {blogPost} from './blogPost'
import {destination} from './destination'
import {partnerUniversity} from './partnerUniversity'
import {processStep} from './processStep'
import {service} from './service'
import {studyGuide} from './studyGuide'
import {teamMember} from './teamMember'
import {testimonial} from './testimonial'
import {university} from './university'

export const collectionTypes: SchemaTypeDefinition[] = [
  service,
  destination,
  university,
  partnerUniversity,
  teamMember,
  processStep,
  author,
  blogPost,
  studyGuide,
  testimonial,
]
