# Univance Education

Standalone Sanity Studio + Next.js marketing site.

```
univanceeducation/
├── studio/   # Sanity Studio → npx sanity deploy
├── web/      # Next.js site → deploy on Vercel (root directory: web)
└── docs/     # Architecture, CMS, deployment
```

## Local development

```bash
# Studio (http://localhost:3333)
cd studio && npm install && npm run dev

# Web (http://localhost:3000)
cd web && npm install && npm run dev
```

### Environment

```bash
cd web
cp .env.example .env
# Fill Sanity, DATABASE_URL, DIRECT_URL, and Resend values
```

### Database (local)

```bash
cd web
npm run prisma:migrate   # local only — creates/applies migrations
```

## Deploy

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for production steps.

Summary:

- **Web:** Vercel → Root Directory = `web`
- **Migrations:** `cd web && npm run prisma:deploy` (never `migrate dev` in production)
- **Studio:** `cd studio && npx sanity deploy`

Sanity project: `wh3g5h3l` · dataset: `production`
