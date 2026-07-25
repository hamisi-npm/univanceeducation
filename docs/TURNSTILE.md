# Cloudflare Turnstile

Protects the **consultation form** and **newsletter subscription** forms against automated abuse.

## Obtain keys

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Turnstile**.
2. Create a widget for your production domain (and localhost if desired).
3. Copy the **Site Key** and **Secret Key**.

Never commit the secret key.

## Configure production

Set on the Next.js host (e.g. Vercel → Environment Variables):

| Variable | Visibility | Purpose |
|----------|------------|---------|
| `TURNSTILE_SITE_KEY` | Server (passed to client forms as a prop) | Renders the widget |
| `TURNSTILE_SECRET_KEY` | Server only | Siteverify API |

Redeploy after adding keys.

Protected endpoints:

- `POST /api/contact`
- `POST /api/newsletter`

## Local development

Add Cloudflare’s [dummy always-pass keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) to `web/.env` / `.env.local`:

```bash
TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Behavior without keys:

- Forms show a temporary unavailable message (no widget).
- API verification fails closed (`503` if secret missing; `400` for bad/missing tokens).

## Verification flow

```
Client Turnstile widget → turnstileToken in JSON body
  → request size limit
  → rate limit
  → JSON parse
  → Cloudflare Siteverify (fail closed)
  → honeypot
  → Zod
  → business logic
```
