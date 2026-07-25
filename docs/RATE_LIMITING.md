# Distributed rate limiting (Upstash Redis)

Shared rate limits for public form APIs across multiple server instances.

## Limits (unchanged)

| Endpoint | Scope | Limit | Window |
|----------|-------|-------|--------|
| `POST /api/contact` | `contact:<ip>` | 5 | 60 seconds |
| `POST /api/newsletter` | `newsletter:<ip>` | 8 | 60 seconds |

## Upstash setup

1. Create a Redis database in the [Upstash Console](https://console.upstash.com/).
2. Open the database → **REST API**.
3. Copy **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `UPSTASH_REDIS_REST_URL` | Production recommended | Upstash REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Production recommended | Upstash REST token |
| `RATE_LIMIT_REDIS_FAIL_MODE` | Optional | `memory` or `unavailable` |

## Local development

Leave Upstash unset. The app uses the in-memory sliding-window limiter (same limits).

Optional: point at a free Upstash DB for parity with production.

## Production deployment

Set both Upstash variables in Vercel (Production / Preview).

### Failure behavior

| Situation | Behavior |
|-----------|----------|
| Upstash **not** configured | In-memory limiter (per instance). Logged warning recommended in ops review. |
| Upstash configured, Redis **healthy** | Distributed sliding window via `@upstash/ratelimit`. |
| Upstash configured, Redis **down**, `NODE_ENV=production` (default) | **HTTP 503** — fail closed. Trade-off: temporary outage of forms instead of unbounded traffic. |
| Upstash configured, Redis **down**, development / `RATE_LIMIT_REDIS_FAIL_MODE=memory` | Fall back to in-memory limiter. Trade-off: limits are not shared across instances. |

Override with:

```bash
RATE_LIMIT_REDIS_FAIL_MODE=unavailable  # always 503 on Redis errors
RATE_LIMIT_REDIS_FAIL_MODE=memory       # always fall back
```

## Response headers

On success and on HTTP 429 (when calculated):

- `RateLimit-Limit`
- `RateLimit-Remaining`
- `RateLimit-Reset` (unix seconds)

On HTTP 429 additionally:

- `Retry-After`
