# NexaX Website

Public NexaXTech marketing site (Nuxt 4, SSR). Hosted on **Google Cloud Run**.

| Environment | Branch | Origin |
|-------------|--------|--------|
| Production | `main` | https://www.nexaxtech.com |
| Staging | `staging` | https://staging.nexaxtech.com |

Full CI/CD, WIF, Secret Manager, and Cloud Run setup: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Pages

| Route | What it is |
|-------|------------|
| `/` | Home |
| `/erp` | NexaX ERP product page (demo request) |
| `/regify` | 301 to https://regify.nexaxtech.com |

## Canonical host

Redirects use a trusted hostname allowlist and prefer the request `Host` header:

- `nexaxtech.com` → 301 to `https://www.nexaxtech.com`
- `www.nexaxtech.com` — production canonical
- `staging.nexaxtech.com` — staging canonical (never redirected to www)
- Cloud Run `*.run.app` and localhost — relative trailing-slash redirects

```bash
npm test
```

## Local

```bash
npm ci
cp .env.example .env   # add NUXT_RESEND_* and optional public overrides
npm run dev            # http://localhost:3002
```

| Env | Scope | Notes |
|-----|-------|--------|
| `NUXT_PUBLIC_SITE_URL` | public | Staging must set `https://staging.nexaxtech.com` |
| `NUXT_PUBLIC_GTM_ID` | public | Empty disables the snippet |
| `NUXT_RESEND_API_KEY` | server | Required for `/api/demo` |
| `NUXT_RESEND_FROM` | server | Verified sender |
| `NUXT_RESEND_TO` | server | Required recipient |

## CI/CD

| Workflow | Allowed ref | Target |
|----------|-------------|--------|
| `.github/workflows/deploy-staging.yml` | `refs/heads/staging` | `nexax-erp-staging` / `nexax-website-staging` |
| `.github/workflows/deploy-production.yml` | `refs/heads/main` | `nexax-erp-production` / `nexax-website` |

Image-only deploys; configure Cloud Run env/secrets **before** the first CI run. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
