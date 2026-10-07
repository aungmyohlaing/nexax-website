# NexaX Website

Public NexaXTech marketing site (Nuxt 4, SSR). Hosted on **Google Cloud Run**.

Canonical origin: **https://www.nexaxtech.com**

## Pages

| Route | What it is |
|-------|------------|
| `/` | Home |
| `/erp` | NexaX ERP product page (demo request) |
| `/regify` | 301 to https://regify.nexaxtech.com |

Copy is English and Myanmar. The visitor’s choice is stored in the `nexax-preferred-locale` cookie.

## Canonical host

`nexaxtech.com` (apex only) returns **301** to the same path and query on `https://www.nexaxtech.com`. The check uses `Host` and `X-Forwarded-Host`. Other hosts, including `www` and Cloud Run URLs, are left alone.

The redirect is a Nitro plugin (`server/plugins/canonical-www.ts`) so it runs before static files. Do not prerender `/` or `/erp`. A prerendered HTML asset is served as 200 and never hits the redirect.

```bash
npm test   # server/utils/canonicalHost.test.mjs
```

## Local

```bash
npm install
cp .env.example .env   # add Resend keys for demo forms
npm run dev            # http://localhost:3002
```

Demo and contact forms POST to `/api/demo` and email via **Resend**. The site does not call the ERP API.

| Env | Required | Notes |
|-----|----------|--------|
| `RESEND_API_KEY` | yes | Server only. Not a `NUXT_PUBLIC_*` value |
| `RESEND_FROM` | yes | Verified sender, e.g. `NexaXTech <noreply@nexaxtech.com>` |
| `RESEND_TO` | no | Defaults to `amhlaing@gmail.com` |

`/api/demo` accepts `source: "erp"` (company, phone, email, business) or `source: "contact"` (name, business, phone). Abuse controls:

- 3 requests / IP / 15 minutes
- honeypot field (`website`) — filled requests return success and do not email
- same email or phone deduped for 1 hour

## Docker (smoke test before Cloud Run)

```bash
npm run docker:up    # http://localhost:3002 → container port 8080
```

Pass Resend env into the container (see `docker-compose.yml`).

The image listens on **8080** (Cloud Run `PORT`).

## Cloud Run

Manual deploy today (no GitHub Actions yet). Infra runbook: `nexax-infrastructure` → `docs/runbooks/cloud-run-web-apps.md`.

```powershell
docker build -t asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v2 .

docker push asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v2

gcloud run deploy nexax-website --image asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v2 --region asia-southeast1 --platform managed --allow-unauthenticated --set-env-vars "RESEND_API_KEY=re_xxx,RESEND_FROM=NexaXTech <noreply@nexaxtech.com>,RESEND_TO=amhlaing@gmail.com"
```

On PowerShell, prefer `--update-env-vars` / Secret Manager for the API key so it is not left in shell history. Use a **single-line** `gcloud` command.
