import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'

import {schemaTypes} from './schemaTypes'
import {legalPageDocumentIds} from './schemaTypes/singletons'
import {structure} from './structure'

const singletonSchemaTypes = new Set([
  'siteSettings',
  'navigation',
  'footer',
  'homepage',
  'aboutPage',
  'contactPage',
  'faqsPage',
  'legalPage',
  'servicesPage',
  'destinationsPage',
  'universitiesPage',
  'blogPage',
  'studyGuidesPage',
])

const deskOnlySingletonTypes = new Set([
  'siteSettings',
  'navigation',
  'footer',
  'homepage',
  'aboutPage',
  'contactPage',
  'faqsPage',
  'servicesPage',
  'destinationsPage',
  'universitiesPage',
  'blogPage',
  'studyGuidesPage',
])

export default defineConfig({
  name: 'default',
  title: 'Univance Education',

  projectId: 'wh3g5h3l',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:3000',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (previousActions, {schemaType}) => {
      if (!singletonSchemaTypes.has(schemaType)) {
        return previousActions
      }

      return previousActions.filter(({action}) => action !== 'duplicate')
    },
  },

  templates: (previous: Template[]) => [
    ...previous.filter(
      (template) => !deskOnlySingletonTypes.has(template.schemaType ?? ''),
    ),
    {
      id: legalPageDocumentIds.privacy,
      title: 'Privacy Policy',
      schemaType: 'legalPage',
      value: {kind: 'privacy'},
    },
    {
      id: legalPageDocumentIds.terms,
      title: 'Terms & Conditions',
      schemaType: 'legalPage',
      value: {kind: 'terms'},
    },
  ],
})
