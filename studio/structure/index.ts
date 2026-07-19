import {BookIcon} from '@sanity/icons/Book'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {ComposeIcon} from '@sanity/icons/Compose'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {HomeIcon} from '@sanity/icons/Home'
import {LockIcon} from '@sanity/icons/Lock'
import {MenuIcon} from '@sanity/icons/Menu'
import {PanelLeftIcon} from '@sanity/icons/PanelLeft'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {UsersIcon} from '@sanity/icons/Users'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {legalPageDocumentIds, singletonDocumentIds} from '../schemaTypes/singletons'

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
      ]),
    ])
