/**
 * Fixed document IDs for singleton fetches (must match Studio desk structure).
 */
export const singletonDocumentIds = {
  siteSettings: 'siteSettings',
  navigation: 'navigation',
  footer: 'footer',
  homepage: 'homepage',
  aboutPage: 'aboutPage',
  contactPage: 'contactPage',
  faqsPage: 'faqsPage',
  servicesPage: 'servicesPage',
  destinationsPage: 'destinationsPage',
  universitiesPage: 'universitiesPage',
  blogPage: 'blogPage',
  studyGuidesPage: 'studyGuidesPage',
} as const

/** Fixed IDs for legal singletons (same schema type, unique `kind`). */
export const legalPageDocumentIds = {
  privacy: 'legalPage-privacy',
  terms: 'legalPage-terms',
} as const

export type SingletonDocumentType = keyof typeof singletonDocumentIds
