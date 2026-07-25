import {BookIcon} from '@sanity/icons/Book'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {ComposeIcon} from '@sanity/icons/Compose'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {HomeIcon} from '@sanity/icons/Home'
import {LockIcon} from '@sanity/icons/Lock'
import {MenuIcon} from '@sanity/icons/Menu'
import {PanelLeftIcon} from '@sanity/icons/PanelLeft'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UsersIcon} from '@sanity/icons/Users'
import {DocumentIcon} from '@sanity/icons/Document'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {BoltIcon} from '@sanity/icons/Bolt'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {
  cookiePolicyDocumentId,
  emailTemplateDocumentIds,
  legalPageDocumentIds,
  newsletterPageDocumentIds,
  singletonDocumentIds,
  systemMessagesDocumentId,
} from '../schemaTypes/singletons'

type SingletonConfig = {
  title: string
  schemaType: string
  documentId: string
  icon?: ComponentType
}

type CollectionConfig = {
  title: string
  schemaType: string
  icon?: ComponentType
  defaultOrdering?: {field: string; direction: 'asc' | 'desc'}[]
}

function singletonEditor(S: StructureBuilder, config: SingletonConfig) {
  const item = S.listItem()
    .title(config.title)
    .child(
      S.document()
        .schemaType(config.schemaType)
        .documentId(config.documentId)
        .title(config.title),
    )

  if (config.icon) {
    return item.icon(config.icon)
  }

  return item
}

function collectionEditor(S: StructureBuilder, config: CollectionConfig) {
  let list = S.documentTypeList(config.schemaType).title(config.title)

  if (config.defaultOrdering) {
    list = list.defaultOrdering(config.defaultOrdering)
  }

  const item = S.listItem().title(config.title).schemaType(config.schemaType).child(list)

  if (config.icon) {
    return item.icon(config.icon)
  }

  return item
}

function section(
  S: StructureBuilder,
  title: string,
  icon: ComponentType | undefined,
  items: ReturnType<StructureBuilder['listItem']>[],
) {
  const item = S.listItem().title(title).child(S.list().title(title).items(items))

  if (icon) {
    return item.icon(icon)
  }

  return item
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Univance Education')
    .items([
      section(S, 'Content', HomeIcon, [
        singletonEditor(S, {
          title: 'Homepage',
          schemaType: 'homepage',
          documentId: singletonDocumentIds.homepage,
          icon: HomeIcon,
        }),
        section(S, 'About', UsersIcon, [
          singletonEditor(S, {
            title: 'About Page',
            schemaType: 'aboutPage',
            documentId: singletonDocumentIds.aboutPage,
          }),
          collectionEditor(S, {
            title: 'Team Members',
            schemaType: 'teamMember',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
          collectionEditor(S, {
            title: 'Process Steps',
            schemaType: 'processStep',
            defaultOrdering: [{field: 'step', direction: 'asc'}],
          }),
        ]),
        section(S, 'Services', CaseIcon, [
          singletonEditor(S, {
            title: 'Services Page',
            schemaType: 'servicesPage',
            documentId: singletonDocumentIds.servicesPage,
          }),
          collectionEditor(S, {
            title: 'Services',
            schemaType: 'service',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
        ]),
        section(S, 'Destinations', EarthAmericasIcon, [
          singletonEditor(S, {
            title: 'Destinations Page',
            schemaType: 'destinationsPage',
            documentId: singletonDocumentIds.destinationsPage,
          }),
          collectionEditor(S, {
            title: 'Destinations',
            schemaType: 'destination',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
        ]),
        section(S, 'Universities', EarthGlobeIcon, [
          singletonEditor(S, {
            title: 'Universities Page',
            schemaType: 'universitiesPage',
            documentId: singletonDocumentIds.universitiesPage,
          }),
          collectionEditor(S, {
            title: 'Universities',
            schemaType: 'university',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
          collectionEditor(S, {
            title: 'Partner Universities',
            schemaType: 'partnerUniversity',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
        ]),
        section(S, 'Programs', DocumentIcon, [
          singletonEditor(S, {
            title: 'Programs Page',
            schemaType: 'programsPage',
            documentId: singletonDocumentIds.programsPage,
          }),
          collectionEditor(S, {
            title: 'Programs',
            schemaType: 'program',
            defaultOrdering: [{field: 'order', direction: 'asc'}],
          }),
        ]),
        section(S, 'Study Guides', BookIcon, [
          singletonEditor(S, {
            title: 'Study Guides Page',
            schemaType: 'studyGuidesPage',
            documentId: singletonDocumentIds.studyGuidesPage,
          }),
          collectionEditor(S, {
            title: 'Guides',
            schemaType: 'studyGuide',
          }),
        ]),
        section(S, 'Blog', ComposeIcon, [
          singletonEditor(S, {
            title: 'Blog Page',
            schemaType: 'blogPage',
            documentId: singletonDocumentIds.blogPage,
          }),
          collectionEditor(S, {
            title: 'Posts',
            schemaType: 'blogPost',
            defaultOrdering: [{field: 'date', direction: 'desc'}],
          }),
        ]),
        section(S, 'Testimonials', StarIcon, [
          collectionEditor(S, {
            title: 'Testimonials',
            schemaType: 'testimonial',
          }),
        ]),
        section(S, 'FAQ', HelpCircleIcon, [
          singletonEditor(S, {
            title: 'FAQ Page',
            schemaType: 'faqsPage',
            documentId: singletonDocumentIds.faqsPage,
          }),
        ]),
        section(S, 'Contact', CommentIcon, [
          singletonEditor(S, {
            title: 'Contact Page',
            schemaType: 'contactPage',
            documentId: singletonDocumentIds.contactPage,
          }),
        ]),
        section(S, 'Legal', LockIcon, [
          singletonEditor(S, {
            title: 'Privacy Policy',
            schemaType: 'legalPage',
            documentId: legalPageDocumentIds.privacy,
          }),
          singletonEditor(S, {
            title: 'Terms & Conditions',
            schemaType: 'legalPage',
            documentId: legalPageDocumentIds.terms,
          }),
          singletonEditor(S, {
            title: 'Cookie Policy',
            schemaType: 'cookiePolicy',
            documentId: cookiePolicyDocumentId,
          }),
        ]),
      ]),
      S.divider(),
      section(S, 'Site', CogIcon, [
        singletonEditor(S, {
          title: 'Site Settings',
          schemaType: 'siteSettings',
          documentId: singletonDocumentIds.siteSettings,
          icon: EarthGlobeIcon,
        }),
        singletonEditor(S, {
          title: 'Navigation',
          schemaType: 'navigation',
          documentId: singletonDocumentIds.navigation,
          icon: MenuIcon,
        }),
        singletonEditor(S, {
          title: 'Footer',
          schemaType: 'footer',
          documentId: singletonDocumentIds.footer,
          icon: PanelLeftIcon,
        }),
      ]),
      S.divider(),
      section(S, 'People', UsersIcon, [
        collectionEditor(S, {
          title: 'Team Members',
          schemaType: 'teamMember',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
        collectionEditor(S, {
          title: 'Authors',
          schemaType: 'author',
        }),
      ]),
      S.divider(),
      section(S, 'Taxonomy', TagIcon, [
        collectionEditor(S, {
          title: 'Blog Categories',
          schemaType: 'blogCategory',
        }),
        collectionEditor(S, {
          title: 'Study Guide Categories',
          schemaType: 'studyGuideCategory',
        }),
        collectionEditor(S, {
          title: 'FAQ Categories',
          schemaType: 'faqCategory',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
        collectionEditor(S, {
          title: 'Course Categories',
          schemaType: 'courseCategory',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
        collectionEditor(S, {
          title: 'Study Levels',
          schemaType: 'studyLevel',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
        collectionEditor(S, {
          title: 'Faculties',
          schemaType: 'faculty',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
        collectionEditor(S, {
          title: 'Degree Types',
          schemaType: 'degreeType',
          defaultOrdering: [{field: 'order', direction: 'asc'}],
        }),
      ]),
      S.divider(),
      section(S, 'System', BoltIcon, [
        section(S, 'Newsletter Pages', EnvelopeIcon, [
          singletonEditor(S, {
            title: 'Newsletter Confirmation',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds.confirmation,
          }),
          singletonEditor(S, {
            title: 'Already Subscribed',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds['already-subscribed'],
          }),
          singletonEditor(S, {
            title: 'Subscription Invalid',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds.invalid,
          }),
          singletonEditor(S, {
            title: 'Subscription Expired',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds.expired,
          }),
          singletonEditor(S, {
            title: 'Unsubscribed',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds.unsubscribed,
          }),
          singletonEditor(S, {
            title: 'Already Unsubscribed',
            schemaType: 'newsletterPage',
            documentId: newsletterPageDocumentIds['already-unsubscribed'],
          }),
        ]),
        section(S, 'Email Templates', ComposeIcon, [
          singletonEditor(S, {
            title: 'Consultation Confirmation',
            schemaType: 'emailTemplate',
            documentId: emailTemplateDocumentIds['consultation-confirmation'],
          }),
          singletonEditor(S, {
            title: 'Consultation Staff Notification',
            schemaType: 'emailTemplate',
            documentId: emailTemplateDocumentIds['consultation-staff'],
          }),
          singletonEditor(S, {
            title: 'Newsletter Confirmation',
            schemaType: 'emailTemplate',
            documentId: emailTemplateDocumentIds['newsletter-confirmation'],
          }),
          singletonEditor(S, {
            title: 'Newsletter Unsubscribed',
            schemaType: 'emailTemplate',
            documentId: emailTemplateDocumentIds['newsletter-unsubscribed'],
          }),
        ]),
        singletonEditor(S, {
          title: 'System Messages',
          schemaType: 'systemMessages',
          documentId: systemMessagesDocumentId,
          icon: InfoOutlineIcon,
        }),
      ]),
    ])
