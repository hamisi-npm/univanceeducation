import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'

import {schemaTypes} from './schemaTypes'
import {
  cookiePolicyDocumentId,
  emailTemplateDocumentIds,
  legalPageDocumentIds,
  newsletterPageDocumentIds,
  systemMessagesDocumentId,
} from './schemaTypes/singletons'
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
  'cookiePolicy',
  'servicesPage',
  'destinationsPage',
  'universitiesPage',
  'programsPage',
  'blogPage',
  'studyGuidesPage',
  'newsletterPage',
  'emailTemplate',
  'systemMessages',
])

const deskOnlySingletonTypes = new Set([
  'siteSettings',
  'navigation',
  'footer',
  'homepage',
  'aboutPage',
  'contactPage',
  'faqsPage',
  'cookiePolicy',
  'servicesPage',
  'destinationsPage',
  'universitiesPage',
  'programsPage',
  'blogPage',
  'studyGuidesPage',
  'systemMessages',
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
    {
      id: cookiePolicyDocumentId,
      title: 'Cookie Policy',
      schemaType: 'cookiePolicy',
      value: {},
    },
    {
      id: newsletterPageDocumentIds.confirmation,
      title: 'Newsletter Confirmation',
      schemaType: 'newsletterPage',
      value: {kind: 'confirmation'},
    },
    {
      id: newsletterPageDocumentIds['already-subscribed'],
      title: 'Already Subscribed',
      schemaType: 'newsletterPage',
      value: {kind: 'already-subscribed'},
    },
    {
      id: newsletterPageDocumentIds.invalid,
      title: 'Subscription Invalid',
      schemaType: 'newsletterPage',
      value: {kind: 'invalid'},
    },
    {
      id: newsletterPageDocumentIds.expired,
      title: 'Subscription Expired',
      schemaType: 'newsletterPage',
      value: {kind: 'expired'},
    },
    {
      id: newsletterPageDocumentIds.unsubscribed,
      title: 'Unsubscribed',
      schemaType: 'newsletterPage',
      value: {kind: 'unsubscribed'},
    },
    {
      id: newsletterPageDocumentIds['already-unsubscribed'],
      title: 'Already Unsubscribed',
      schemaType: 'newsletterPage',
      value: {kind: 'already-unsubscribed'},
    },
    {
      id: emailTemplateDocumentIds['consultation-confirmation'],
      title: 'Consultation Confirmation',
      schemaType: 'emailTemplate',
      value: {kind: 'consultation-confirmation'},
    },
    {
      id: emailTemplateDocumentIds['consultation-staff'],
      title: 'Consultation Staff Notification',
      schemaType: 'emailTemplate',
      value: {kind: 'consultation-staff'},
    },
    {
      id: emailTemplateDocumentIds['newsletter-confirmation'],
      title: 'Newsletter Confirmation',
      schemaType: 'emailTemplate',
      value: {kind: 'newsletter-confirmation'},
    },
    {
      id: emailTemplateDocumentIds['newsletter-unsubscribed'],
      title: 'Newsletter Unsubscribed',
      schemaType: 'emailTemplate',
      value: {kind: 'newsletter-unsubscribed'},
    },
    {
      id: systemMessagesDocumentId,
      title: 'System Messages',
      schemaType: 'systemMessages',
      value: {},
    },
  ],
})
