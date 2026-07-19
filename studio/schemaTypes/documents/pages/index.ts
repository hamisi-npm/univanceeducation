import type {SchemaTypeDefinition} from 'sanity'

import {aboutPage} from './aboutPage'
import {blogPage} from './blogPage'
import {contactPage} from './contactPage'
import {destinationsPage} from './destinationsPage'
import {faqsPage} from './faqsPage'
import {homepage} from './homepage'
import {legalPage} from './legalPage'
import {servicesPage} from './servicesPage'
import {studyGuidesPage} from './studyGuidesPage'
import {universitiesPage} from './universitiesPage'

export const pageDocumentTypes: SchemaTypeDefinition[] = [
  homepage,
  aboutPage,
  contactPage,
  faqsPage,
  legalPage,
  servicesPage,
  destinationsPage,
  universitiesPage,
  blogPage,
  studyGuidesPage,
]
