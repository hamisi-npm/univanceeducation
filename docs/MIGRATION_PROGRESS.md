# Migration Progress

Track feature migration into `univanceeducation/web`. Each row requires lint + typecheck + build before marking done.

| Feature | Status | Notes |
|---------|--------|-------|
| Docs foundation | Done | ARCHITECTURE, CMS_GUIDE, CONTENT_MODEL |
| Studio schemas | Done | ~47 types, modular layout, schema deployed |
| Desk structure | Done | Content / Site / People / Taxonomy |
| Web Sanity plumbing | Done | client, live, image, draft mode, revalidate, defineQuery |
| Navigation | Done | Via `getGlobalLayoutData` / site services |
| Footer | Done | Via site services |
| Site Settings | Done | Via site services |
| Home | Done | Redesign 2026-07: full-bleed hero, program finder, brand tokens, new sections |
| About | Done | |
| Services | Done | |
| Destinations | Done | |
| Universities | Done | |
| Programs | Done | Listing `/programs`, detail `/programs/[slug]`, taxonomies, finder → query params; university/destination joins |
| Study Guides | Done | |
| Blog | Done | |
| FAQ | Done | |
| Contact | Done | Form Zod stays in code; copy from Sanity |
| Legal | Done | |
| SEO / metadata | Done | CMS SEO + createCmsPageMetadata |
| Hardening | Done | No fallbacks; empty dataset needs seed |
| Homepage redesign | Done | Schema + UI match approved mock; lint/typecheck/build pass |
| Programs module | Done | Schemas + data layer + listing/detail + finder + uni/dest integrations + SEO/sitemap |

## Gates (verified 2026-07-22)

```bash
cd univanceeducation/web && npm run lint && npm run typecheck && npm run build  # pass
```

## Programs editorial (Studio)

After deploying Studio schema changes:

1. Create taxonomy docs: Course Categories, Study Levels, Faculties, Degree Types
2. Create Programs linked to Universities
3. Fill **Programs Page** singleton (`programsPage`)
4. Update Homepage **Program Finder** chrome; set CTA href to `/programs`

```bash
cd univanceeducation/studio && npm run deploy
```

## Important: empty Content Lake

Dataset `production` on project `wh3g5h3l` currently has **0 documents**.

Seed before runtime content works:

```bash
# From repo root (requires SANITY_API_WRITE_TOKEN)
npm run sanity:seed
```

Or create content in Studio at http://localhost:3333.

Marketing pages use `dynamic = "force-dynamic"` and throw if required singletons are missing at request time (no fallback marketing copy).
