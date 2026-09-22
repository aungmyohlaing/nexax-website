# NexaX Website

Public NexaXTech marketing site (Nuxt 4). Hosted on **Google Cloud Run**.

## Local

```bash
npm install
npm run dev          # http://localhost:3002
```

## Docker (smoke test before Cloud Run)

```bash
npm run docker:up    # http://localhost:3002 → container port 8080
```

The image listens on **8080** (Cloud Run `PORT`).

## Cloud Run

Manual deploy today (no GitHub Actions yet). Infra runbook: `nexax-infrastructure` → `docs/runbooks/cloud-run-web-apps.md`.

```powershell
docker build -t asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v1 .
docker push asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v1
gcloud run deploy nexax-website --image asia-southeast1-docker.pkg.dev/nexax-erp-production/erp-frontend/nexax-website:v1 --region asia-southeast1 --platform managed --allow-unauthenticated
```

Use a single-line `gcloud` command on Windows PowerShell.
