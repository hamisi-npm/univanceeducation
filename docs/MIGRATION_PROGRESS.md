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
| Home | Done | Sanity-only, no fallbacks |
| About | Done | |
| Services | Done | |
| Destinations | Done | |
| Universities | Done | |
| Study Guides | Done | |
| Blog | Done | |
| FAQ | Done | |
| Contact | Done | Form Zod stays in code; copy from Sanity |
| Legal | Done | |
| SEO / metadata | Done | CMS SEO + createCmsPageMetadata |
| Hardening | Done | No fallbacks; empty dataset needs seed |

## Gates (verified 2026-07-18)

```bash
cd univanceeducation/studio && npm run lint   # pass
cd univanceeducation/web && npm run lint && npm run typecheck && npm run build  # pass
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
