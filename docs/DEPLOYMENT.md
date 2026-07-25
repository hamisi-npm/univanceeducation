# Deployment — Univance Education Web

Production deployment guide for `univanceeducation/web` (Next.js) and operational database migrations.

## Prerequisites

- Vercel project with **Root Directory** = `web` (or the `web` package as the deploy target)
- Supabase PostgreSQL with both connection strings available
- Resend account for transactional email
- Sanity project `wh3g5h3l` / dataset `production`

## Environment variables

Copy from `web/.env.example` into Vercel (Production / Preview / Development as needed):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_*` | Sanity public config |
| `SANITY_API_READ_TOKEN` | Draft / Live reads |
| `SANITY_REVALIDATE_SECRET` | Webhook auth for `/api/revalidate` |
| `SANITY_PREVIEW_SECRET` | Draft mode enable/disable |
| `NEXT_PUBLIC_SITE_URL` | Canonical site origin |
| `DATABASE_URL` | Postgres pooler (runtime Prisma) |
| `DIRECT_URL` | Direct Postgres (migrations) |
| `RESEND_API_KEY` | Email delivery |
| `EMAIL_FROM` | From address |
| `CONSULTATION_INBOX` | Staff consultation notifications |
| `IP_HASH_SALT` | Optional; strengthens IP hashing |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (forms) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret (Siteverify) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL (distributed rate limits) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RATE_LIMIT_REDIS_FAIL_MODE` | Optional: `memory` \| `unavailable` on Redis errors |

Never commit `.env` or `.env.local`.

Turnstile setup details: [`TURNSTILE.md`](./TURNSTILE.md).  
Rate limiting setup: [`RATE_LIMITING.md`](./RATE_LIMITING.md).

## Database migrations (production)

Use **deploy** only in production — never `prisma migrate dev`.

```bash
cd web
npm run prisma:deploy
```

This runs `prisma migrate deploy` against `DIRECT_URL` (see `prisma.config.ts`).

Recommended release order:

1. Set production env vars (including `DATABASE_URL` and `DIRECT_URL`)
2. Run `npm run prisma:deploy` once against production (CI step or one-off)
3. Deploy the Next.js app (`npm run build` → `prisma generate && next build`)

`npm run build` generates the Prisma Client; it does **not** run migrations. Apply migrations explicitly with `prisma:deploy` before or as a gated release step.

Development-only (local):

```bash
npm run prisma:migrate   # prisma migrate dev — local only
```

## Studio

```bash
cd studio
npx sanity deploy
```

## Sanity webhook

Point publish webhooks at `https://<production-domain>/api/revalidate` with `SANITY_REVALIDATE_SECRET`. See root `docs/SANITY_WEBHOOKS.md` for payload details (paths may say `src/`; active handler is `web/src/app/api/revalidate`).
