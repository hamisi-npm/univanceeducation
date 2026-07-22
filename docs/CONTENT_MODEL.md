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
| `programsPage` | `programsPage` |
| `studyGuidesPage` | `studyGuidesPage` |
| `blogPage` | `blogPage` |
| `faqsPage` | `faqsPage` |
| `contactPage` | `contactPage` |
| `legalPage` | `legalPage-privacy`, `legalPage-terms` |

### Homepage fields (redesign 2026-07)

Rendered on site / editable in Studio: `hero`, `trustStats`, `programFinder`, `servicesPreview`, `featuredDestinations`, `whyChooseUs`, `ctaBanner`, `seo`.

Service card links use `/services#slug`.

**Program finder:** chrome only (labels, placeholders, visibility toggles, theme, CTA). Dropdown values are loaded at runtime from Destinations, Course Categories, and Study Levels — not stored on the homepage document. Submit navigates to `/programs?destination=&category=&level=`.

## Collections

| Type | Notes |
|------|-------|
| `service` | Ordered service offerings |
| `destination` | Study destinations (geography) |
| `university` | University profiles; optional legacy `programs: string[]` chips |
| `program` | Study programs; required `university` ref; destination derived via `university->destination` |
| `partnerUniversity` | Partner logos / links |
| `blogPost` | Posts with author + category refs |
| `blogCategory` | Taxonomy |
| `courseCategory` | Program taxonomy |
| `studyLevel` | Program taxonomy |
| `faculty` | Program taxonomy |
| `degreeType` | Program taxonomy |
| `studyGuide` | Guides with category refs |
| `studyGuideCategory` | Taxonomy |
| `testimonial` | Student testimonials |
| `teamMember` | About team |
| `author` | Blog authors |
| `faqCategory` | FAQ groups with embedded items |
| `processStep` | Process timeline steps |

## Shared objects (selected)

`imageWithAlt`, `richText`, `seo`, `button`, `ctaLink`, `sectionHeader`, `statistic`, `faqItem`, `selectOption`, `contactDetails`, `socialLink`, `address`, `primaryOffice`, plus page parts (`ctaBanner`, `heroBadge`, `heroFloatingCard`, `programFinder`, `faqPreview`, `whyChooseUsFeature`, …).

## Relationships

- Blog posts → `author`, `blogCategory`
- Study guides → `studyGuideCategory`
- Universities → required `destination`
- Programs → required `university`, `courseCategory`, `studyLevel`; optional `faculty`, `degreeType`
- Destination for a program is **always derived** (`university->destination`) — never stored on `program`
- University / destination detail pages list programs via GROQ joins, not embedded program arrays
- Page singletons reference collections where featured content is curated
- No separate `country` / `city` types — destinations are the geographic entity
