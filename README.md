# Univance Education

Standalone Sanity Studio + Next.js marketing site.

```
univanceeducation/
├── studio/   # Sanity Studio → npx sanity deploy
├── web/      # Next.js site → deploy on Vercel (root directory: web)
└── docs/     # Architecture and CMS docs
```

## Local development

```bash
# Studio (http://localhost:3333)
cd studio && npm install && npm run dev

# Web (http://localhost:3000)
cd web && npm install && npm run dev
```

## Deploy

- **Web:** Vercel → Root Directory = `web`
- **Studio:** `cd studio && npx sanity deploy`

Sanity project: `wh3g5h3l` · dataset: `production`
