# NexaX Website — Staging & Production Deployment

Operator guide for the automated CI/CD pipeline. This document does **not** create GCP resources; it lists what must exist before the first deploy.

## Branch strategy

| Branch | Environment | GCP project | Cloud Run service | Domain(s) |
|--------|-------------|--------------------|---------------------|-----------|
| `staging` | Staging | `nexax-erp-staging` | `nexax-website-staging` | `staging.nexaxtech.com` |
| `main` | Production | `nexax-erp-production` | `nexax-website` | `nexaxtech.com`, `www.nexaxtech.com` |

Feature work lands on branches such as `feat/website-staging-cicd`, merges to `staging` for validation, then to `main` for production.

Workflows **reject** any git ref other than:

- Staging: `refs/heads/staging`
- Production: `refs/heads/main`

`workflow_dispatch` from a feature branch fails before authentication.

## Environment architecture

### Shared

- Region: `asia-southeast1`
- Artifact Registry repository: `website`
- Image name: `nexax-website`
- Image tag: immutable git commit SHA (`nexax-website:<sha>`)
- Auth: Google Cloud Workload Identity Federation (no JSON keys)
- Runtime secrets: Google Secret Manager → Cloud Run

### Staging

- Project: `nexax-erp-staging`
- Service: `nexax-website-staging` (**must exist before CI**)
- Public URL: `https://staging.nexaxtech.com`
- GTM: disabled (`NUXT_PUBLIC_GTM_ID` empty string on the service)
- Resend: real email with **staging-only** Secret Manager credentials

### Production

- Project: `nexax-erp-production`
- Service: `nexax-website` (existing; **must exist before CI**)
- Canonical URL: `https://www.nexaxtech.com`
- GTM: `GTM-PQP878R2`
- Resend: production credentials and recipient

## Required GitHub configuration

### Environments

Create two GitHub Environments and configure protection:

| Environment | Required reviewers | Deployment branches |
|-------------|--------------------|---------------------|
| `staging` | optional | **Only** `staging` |
| `production` | **Required** (at least one reviewer) | **Only** `main` |

YAML cannot encode reviewers; configure them in the GitHub UI. Without these settings, production can deploy on every push to `main`.

### Environment variables (per environment)

Set as **Environment variables** (not repository secrets):

| Name | Staging (required exact value) | Production (required exact value) |
|------|--------------------------------|-----------------------------------|
| `GCP_PROJECT_ID` | `nexax-erp-staging` | `nexax-erp-production` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | Staging WIF provider resource name | Production WIF provider resource name |
| `GCP_DEPLOYER_SERVICE_ACCOUNT` | Staging deployer SA email | Production deployer SA email |
| `GCP_REGION` | `asia-southeast1` | `asia-southeast1` |
| `ARTIFACT_REGISTRY_REPOSITORY` | `website` | `website` |
| `CLOUD_RUN_SERVICE` | `nexax-website-staging` | `nexax-website` |

Workflows **fail before auth** if project, region, service, or Artifact Registry repository variables do not match the expected values above.

### Repository / workflow permissions

Workflows request only:

- `contents: read`
- `id-token: write`

No GCP JSON keys in GitHub.

## Workflow triggers and behaviour

| Workflow | File | Allowed refs |
|----------|------|--------------|
| Deploy Staging | `.github/workflows/deploy-staging.yml` | `refs/heads/staging` only |
| Deploy Production | `.github/workflows/deploy-production.yml` | `refs/heads/main` only |

Each successful run:

1. Validates git ref and GitHub Environment target variables
2. Checks out the commit
3. Authenticates with WIF
4. **Fails if the Cloud Run service does not already exist** (no implicit create)
5. Builds and pushes `…/website/nexax-website:<sha>`
6. Deploys **that image only** (does not rewrite env vars, secrets, runtime SA, or scaling)
7. Verifies health (HTTP 200 + environment-specific HTML/redirect checks)
8. Writes revision / image details to the job summary

Concurrency groups `deploy-staging` and `deploy-production` prevent overlapping deploys.

### Staging smoke checks (automated)

Against the Cloud Run service URL (no real email sent):

- Homepage HTTP 200
- HTML does **not** contain `GTM-PQP878R2`
- HTML contains `staging.nexaxtech.com`
- HTML does **not** contain `https://www.nexaxtech.com`
- `/erp/` redirect `Location` is not `https://www.nexaxtech.com…`

### Production smoke checks (automated)

- Homepage HTTP 200
- HTML contains `www.nexaxtech.com`
- HTML contains `GTM-PQP878R2`

## GCP prerequisites

Do this in each project before the first workflow run.

### 1. APIs

Enable:

- Cloud Run API (`run.googleapis.com`)
- Artifact Registry API (`artifactregistry.googleapis.com`)
- Secret Manager API (`secretmanager.googleapis.com`)
- IAM Credentials API (`iamcredentials.googleapis.com`)
- IAM API (`iam.googleapis.com`)
- Security Token Service API (`sts.googleapis.com`)
- Cloud Resource Manager API (`cloudresourcemanager.googleapis.com`)

`sts.googleapis.com` and `iam.googleapis.com` are required for Workload Identity Federation token exchange and service-account impersonation.

### 2. Artifact Registry

```bash
gcloud artifacts repositories create website \
  --repository-format=docker \
  --location=asia-southeast1 \
  --project=PROJECT_ID \
  --description="NexaX website container images"
```

Image path:

```text
asia-southeast1-docker.pkg.dev/PROJECT_ID/website/nexax-website:<git-sha>
```

### 3. Service accounts (separate per project)

**Deployer (GitHub Actions only)** — examples:

- Staging: `nexax-website-deployer@nexax-erp-staging.iam.gserviceaccount.com`
- Production: `nexax-website-deployer@nexax-erp-production.iam.gserviceaccount.com`

Recommended least-privilege starting point. Scope each role as narrowly as your IAM tooling allows (verify against current Google Cloud IAM docs for your org before applying):

| Role / binding | Intended scope | Purpose |
|----------------|----------------|---------|
| `roles/run.developer` | Target Cloud Run service only (`nexax-website-staging` or `nexax-website`) | Update that service and its revisions without `setIamPolicy` (prefer over `roles/run.admin`) |
| `roles/artifactregistry.writer` | The `website` Artifact Registry repository only | Push images to that repository |
| `roles/iam.serviceAccountUser` | The environment’s **runtime** service account only | Allow deploy to act as that revision identity |

Do not grant these roles project-wide when a resource-level binding is available. If a deploy fails with a permission error after using `roles/run.developer` on the service, inspect the exact denied permission in Cloud Audit Logs before widening scope. Do not grant `roles/run.admin` by default; it includes IAM policy changes on Cloud Run resources.

**Runtime (Cloud Run revision)** — examples:

- Staging: `nexax-website-runtime@nexax-erp-staging.iam.gserviceaccount.com`
- Production: existing runtime SA for `nexax-website`

Runtime SA needs `roles/secretmanager.secretAccessor` on the website Resend secrets in that project.

### 4. Workload Identity Federation (strict branch conditions)

Create a pool + GitHub OIDC provider **per project** (or separate providers with distinct attribute conditions).

Replace `OWNER` with the GitHub org/user that owns `nexax-website`.

**Required provider attribute mappings**

The deployer service-account IAM binding below uses a `principalSet` on `attribute.repository`. That principal only works when the OIDC provider maps GitHub token claims into Google attributes. Configure these mappings on each provider:

```text
google.subject=assertion.sub
attribute.repository=assertion.repository
attribute.ref=assertion.ref
```

- `google.subject=assertion.sub` — standard subject mapping for the federated identity.
- `attribute.repository=assertion.repository` — required for members of the form `…/attribute.repository/OWNER/nexax-website`.
- `attribute.ref=assertion.ref` — required so provider attribute conditions can enforce `refs/heads/staging` or `refs/heads/main`.

Without `attribute.repository=assertion.repository`, the `attribute.repository` principalSet binding will not match incoming GitHub Actions tokens.

**Staging provider attribute condition (required):**

```text
assertion.repository == "OWNER/nexax-website" && assertion.ref == "refs/heads/staging"
```

**Production provider attribute condition (required):**

```text
assertion.repository == "OWNER/nexax-website" && assertion.ref == "refs/heads/main"
```

Keep these branch conditions strict. Do **not** use repository-only conditions such as `assertion.repository == "OWNER/nexax-website"` for production. That weakens branch isolation for `workflow_dispatch`. Workflow branch guards (`refs/heads/staging` / `refs/heads/main`) remain in force and are separate from WIF.

Expected GitHub OIDC claims used above:

| Claim | Staging | Production |
|-------|---------|------------|
| `repository` | `OWNER/nexax-website` | `OWNER/nexax-website` |
| `ref` | `refs/heads/staging` | `refs/heads/main` |

Bind impersonation so only the matching identity can use the deployer SA. Prefer attribute conditions on the provider (above). Example IAM binding scoped by repository (provider condition still enforces branch). This `principalSet` depends on the `attribute.repository=assertion.repository` mapping documented above:

```bash
gcloud iam service-accounts add-iam-policy-binding DEPLOYER_SA \
  --project=PROJECT_ID \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL/attribute.repository/OWNER/nexax-website"
```

Where supported by your pool mapping, prefer a tighter principal that includes the branch attribute (for example `attribute.ref`) so staging and production cannot impersonate each other’s deployer SAs even if a provider is misconfigured. That tighter principal likewise requires the corresponding attribute mapping (`attribute.ref=assertion.ref`).

Use the full provider resource name as `GCP_WORKLOAD_IDENTITY_PROVIDER` in the matching GitHub Environment.

### 5. Secret Manager (create before first deploy)

Separate secrets **per project**. Never reuse production secret values in staging.

| Secret Manager secret ID | Cloud Run env var | Staging | Production |
|--------------------------|-------------------|---------|------------|
| `nexax-website-resend-api-key` | `NUXT_RESEND_API_KEY` | Staging Resend API key | Production Resend API key |
| `nexax-website-resend-from` | `NUXT_RESEND_FROM` | Staging verified sender | Production verified sender |
| `nexax-website-resend-to` | `NUXT_RESEND_TO` | Test recipient (may be `amhlaing@gmail.com`) | `amhlaing@gmail.com` |

Grant the **runtime** SA `secretAccessor` on each secret.

```bash
printf '%s' 'RE_STAGING_KEY' | gcloud secrets create nexax-website-resend-api-key \
  --project=nexax-erp-staging \
  --replication-policy=automatic \
  --data-file=-
```

### 6. One-time Cloud Run service creation (BEFORE first CI deploy)

CI **will not** create the service. Create it once with the correct runtime SA, public env, and secrets, using any initial image (or a placeholder build), then let CI only update the image.

**Staging public env (required):**

| Variable | Value |
|----------|-------|
| `NUXT_PUBLIC_SITE_URL` | `https://staging.nexaxtech.com` |
| `NUXT_PUBLIC_GTM_ID` | *(empty string — must be set empty, not omitted)* |

**Production public env:**

| Variable | Value |
|----------|-------|
| `NUXT_PUBLIC_SITE_URL` | `https://www.nexaxtech.com` |
| `NUXT_PUBLIC_GTM_ID` | `GTM-PQP878R2` |

Example staging bootstrap (adjust image/runtime SA names):

```bash
gcloud run deploy nexax-website-staging \
  --project=nexax-erp-staging \
  --region=asia-southeast1 \
  --image=asia-southeast1-docker.pkg.dev/nexax-erp-staging/website/nexax-website:BOOTSTRAP_SHA \
  --service-account=nexax-website-runtime@nexax-erp-staging.iam.gserviceaccount.com \
  --port=8080 \
  --allow-unauthenticated \
  --update-env-vars="NUXT_PUBLIC_SITE_URL=https://staging.nexaxtech.com,NUXT_PUBLIC_GTM_ID=" \
  --update-secrets="NUXT_RESEND_API_KEY=nexax-website-resend-api-key:latest,NUXT_RESEND_FROM=nexax-website-resend-from:latest,NUXT_RESEND_TO=nexax-website-resend-to:latest"
```

Omitting `NUXT_PUBLIC_SITE_URL` or `NUXT_PUBLIC_GTM_ID` on staging causes production defaults from the image to apply. Staging CI smoke checks will fail until these are set.

Service settings to preserve on later CI deploys (image-only updates):

- Port `8080`
- Runtime service account
- Public env + Secret Manager bindings
- Scaling / CPU / memory / ingress as configured

### 7. Domain mapping / DNS

- Staging: map `staging.nexaxtech.com` when approved
- Production: keep existing apex/www mappings

This CI/CD change set does **not** modify DNS.

## Application runtime behaviour

### Public config

| Variable | Production | Staging |
|----------|------------|---------|
| `NUXT_PUBLIC_SITE_URL` | `https://www.nexaxtech.com` | `https://staging.nexaxtech.com` (required) |
| `NUXT_PUBLIC_GTM_ID` | `GTM-PQP878R2` | empty (required empty to disable) |

SEO, canonical links, and JSON-LD use `runtimeConfig.public.siteUrl`.

### Canonical redirects

| Request host | Behaviour |
|--------------|-----------|
| `nexaxtech.com` | 301 → `https://www.nexaxtech.com` + path/query |
| `www.nexaxtech.com` | Stay; trailing-slash → absolute www URL |
| `staging.nexaxtech.com` | Stay; trailing-slash → absolute staging URL (never www) |
| `*.run.app`, localhost, unknown | No apex redirect; trailing-slash uses **relative** URL |

`Host` is preferred. `X-Forwarded-Host` is used only when `Host` is absent and the forwarded value is allowlisted.

### Resend / `/api/demo`

- Staging sends real email for QA with staging-only secrets.
- Requires `NUXT_RESEND_API_KEY`, `NUXT_RESEND_FROM`, and `NUXT_RESEND_TO`.
- Missing any value → **503** (no baked-in recipient, no legacy `RESEND_*`).
- Keys are server-only. Deployment checks do not send email.

## Manual first staging deployment

1. Complete GCP prerequisites in `nexax-erp-staging` (AR, SAs, WIF with **branch** attribute conditions, secrets).
2. **Create** `nexax-website-staging` with runtime SA, public env, and Resend secrets (**before** CI).
3. Configure GitHub Environment `staging` (variables + deployment branch restriction).
4. Merge the feature branch into `staging` after review.
5. Watch **Deploy Staging** (ref/target validation → image update → smoke checks).
6. Map `staging.nexaxtech.com` when DNS is approved; re-check redirects on the custom domain.
7. Manually QA demo email with staging Resend (not automated).
8. Only after sign-off: merge to `main`, with production Environment protection enabled.

## Subsequent automatic deployments

- Push/merge to `staging` → staging deploy
- Push/merge to `main` → production deploy (after Environment approval)

No `latest` tag is used for deployment.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| “Ref … is not allowed” | `workflow_dispatch` from wrong branch | Run from `staging` / `main` only |
| Target variable mismatch | Wrong GitHub Environment vars | Set exact project/service/region values |
| Service does not exist | Skipped one-time create | Bootstrap Cloud Run with env/secrets first |
| WIF auth fails | Provider condition / SA binding | Check `assertion.ref` and repository claim |
| Staging smoke: production GTM | Empty GTM env omitted | Set `NUXT_PUBLIC_GTM_ID=` on the service |
| Staging smoke: missing staging host | Site URL not set | Set `NUXT_PUBLIC_SITE_URL=https://staging.nexaxtech.com` |
| `/api/demo` → 503 | Missing Resend secret binding | Attach all three secrets; runtime SA accessor |

## Rollback

Redeploy a prior known-good SHA:

```bash
gcloud run deploy SERVICE \
  --project=PROJECT_ID \
  --region=asia-southeast1 \
  --image=asia-southeast1-docker.pkg.dev/PROJECT_ID/website/nexax-website:GOOD_SHA
```

## Local verification

```bash
npm ci
npm test
npm run build
docker build -t nexax-website:local .
```

Do not bake `.env` into the image. Pass `NUXT_*` values at container runtime.
