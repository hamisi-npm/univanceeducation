# Content Model

Project: `wh3g5h3l` · Dataset: `production`

Schemas live in `studio/schemaTypes/`. Type names match the production Content Lake.

## Site singletons

| Type | Fixed `_id` | Purpose |
|------|-------------|---------|
| `siteSettings` | `siteSettings` | Brand, contact, social, default SEO |
| `navigation` | `navigation` | Primary nav items |
| `footer` | `footer` | Footer columns and links |

## Page singletons

| Type | Fixed `_id` |
|------|-------------|
| `homepage` | `homepage` |
| `aboutPage` | `aboutPage` |
| `servicesPage` | `servicesPage` |
| `destinationsPage` | `destinationsPage` |
| `universitiesPage` | `universitiesPage` |
| `studyGuidesPage` | `studyGuidesPage` |
| `blogPage` | `blogPage` |
| `faqsPage` | `faqsPage` |
| `contactPage` | `contactPage` |
| `legalPage` | `legalPage-privacy`, `legalPage-terms` |

## Collections

| Type | Notes |
|------|-------|
| `service` | Ordered service offerings |
| `destination` | Study destinations (geography) |
| `university` | University profiles |
| `partnerUniversity` | Partner logos / links |
| `blogPost` | Posts with author + category refs |
| `blogCategory` | Taxonomy |
| `studyGuide` | Guides with category refs |
| `studyGuideCategory` | Taxonomy |
| `testimonial` | Student testimonials |
| `teamMember` | About team |
| `author` | Blog authors |
| `faqCategory` | FAQ groups with embedded items |
| `processStep` | Process timeline steps |

## Shared objects (selected)

`imageWithAlt`, `richText`, `seo`, `button`, `ctaLink`, `sectionHeader`, `statistic`, `faqItem`, `contactDetails`, `socialLink`, `address`, `primaryOffice`, plus page parts (`ctaBanner`, `heroBadge`, `heroFloatingCard`, …).

## Relationships

- Blog posts → `author`, `blogCategory`
- Study guides → `studyGuideCategory`
- Universities → optional `destination`
- Page singletons reference collections where featured content is curated
- No separate `country` / `city` types — destinations are the geographic entity
