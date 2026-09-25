# NexaX Website

Public NexaXTech marketing site (Nuxt 4). Hosted on **Google Cloud Run**.

## Local

```bash
npm install
cp .env.example .env   # add Resend keys for demo forms
npm run dev            # http://localhost:3002
```

Demo / contact forms POST to `/api/demo` and email via **Resend** (not `mailto`).

Abuse controls on the API:
- 3 requests / IP / 15 minutes
- honeypot field
- same email/phone dedupe for 1 hour

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
