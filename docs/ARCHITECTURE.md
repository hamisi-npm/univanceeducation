# Architecture — Univance Education (Studio + Web)

## Monorepo layout

```
univanceeducation/
├── studio/     # Standalone Sanity Studio (Vite)
├── web/        # Next.js 16 presentation layer
└── docs/       # Architecture and migration docs
```

## Separation of concerns

> **Sanity owns content. Next.js owns presentation and application logic.**

| Layer | Responsibility |
|-------|----------------|
| `studio/` | Content model, desk structure, editorial UX |
| Sanity Content Lake | Project `wh3g5h3l`, dataset `production` |
| `web/` | GROQ queries → services → mappers → UI |

Studio is **never** embedded in Next.js. Run side by side:

- Studio: `cd studio && npm run dev` → http://localhost:3333
- Web: `cd web && npm run dev` → http://localhost:3000

## Data flow

```
Sanity Content Lake
        ↓
   GROQ (queries/)
        ↓
   Service (services/)
        ↓
   Mapper (mappers/)
        ↓
   UI (features/ / components/)
```

Components must never execute GROQ. Queries live only under `web/src/queries/`.

## Environment variables (`web/`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `wh3g5h3l` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version date string |
| `SANITY_API_READ_TOKEN` | Live Content / draft reads |
| `SANITY_REVALIDATE_SECRET` | Tag-based revalidation webhook |
| `SANITY_PREVIEW_SECRET` | Draft mode enable |

## Caching and preview

- Default: Live Content API via `defineLive` (`next-sanity`)
- Tag-based revalidation at `/api/revalidate`
- Draft Mode + Presentation Tool for Visual Editing
- Perspective: published in production; drafts when Draft Mode is on

## Type safety

TypeGen runs from `studio/` and writes types consumed by `web/` (`sanity.types.ts`).

Configure in `studio/sanity.cli.ts`:

```bash
cd studio && npm run typegen
```

## Seeding content

The `production` dataset starts empty until content is created in Studio or seeded from the legacy root app:

```bash
# From study-abroad repo root (requires SANITY_API_WRITE_TOKEN)
npm run sanity:seed
```

Without seeded content, marketing pages throw at request time (by design — no fallback marketing copy).
