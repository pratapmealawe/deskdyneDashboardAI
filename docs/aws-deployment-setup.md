# AWS Deployment Setup Guide

This document covers everything needed to enable the GitHub Actions deploy workflows
(`deploy-staging.yml` and `deploy-production.yml`) after the build-only workflows are
confirmed working.

---

## Overview of the Flow

```
Push / Merge to branch
        │
        ▼
GitHub Actions: build.yml
  ├── main     → npm run buildprod  (Angular production build)
  └── staging  → npm run build      (Angular staging build)
        │
        ▼ (when deploy workflows are enabled)
GitHub Actions: deploy-staging.yml / deploy-production.yml
  1. Build Angular app
  2. Zip: dist/ + appspec.yml + scripts/ + server.js + package.json
  3. Upload zip → AWS S3 bucket
  4. aws deploy create-deployment → AWS CodeDeploy reads appspec.yml
        │
        ▼
AWS CodeDeploy on EC2
  ApplicationStop  → scripts/application_stop.sh  (kills node)
  BeforeInstall    → scripts/before_install.sh     (creates /home/ec2-user/dashboardadmin)
  ApplicationStart → scripts/application_start.sh  (nvm, npm install, npm run startaws)
        │
        ▼
Express server (server.js) running on EC2, serving dist/dashboard-deskdyne/
```

---

## Step 1 — Create an IAM User for GitHub Actions

1. Go to **AWS Console → IAM → Users → Create user**
2. Name: `github-actions-dashboard` (or similar)
3. Access type: **Programmatic access only**
4. Attach this inline policy (minimum required permissions):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CodeDeploy",
      "Effect": "Allow",
      "Action": [
        "codedeploy:CreateDeployment",
        "codedeploy:GetDeployment",
        "codedeploy:GetDeploymentConfig",
        "codedeploy:RegisterApplicationRevision",
        "codedeploy:GetApplicationRevision"
      ],
      "Resource": "*"
    }
  ]
}
```

5. After creation, copy the **Access Key ID** and **Secret Access Key** — you will not see the secret again.

---

## Step 2 — Create S3 Buckets

Create one or two S3 buckets to store deployment artifacts:

| Purpose | Suggested name |
|---------|---------------|
| Staging artifacts | `deskdyne-dashboard-deploy-staging` |
| Production artifacts | `deskdyne-dashboard-deploy-prod` |

Settings for each bucket:
- Region: `ap-southeast-1` (match your EC2 region)
- Block all public access: **ON**
- Versioning: optional but recommended

---

## Step 3 — Confirm CodeDeploy App & Deployment Groups Exist

Go to **AWS Console → CodeDeploy → Applications**:

- You need one Application per environment (or one shared app with two deployment groups)
- Each deployment group is tied to an EC2 instance (via tags or ASG)

Note down:
- **Application name** (e.g., `deskdyne-dashboard`)
- **Staging deployment group name** (e.g., `staging-group`)
- **Production deployment group name** (e.g., `production-group`)

---

## Step 4 — Add GitHub Secrets

Go to the **`aiorigin` repository on GitHub**:
`github.com/pratapmealawe/deskdyneDashboardAI → Settings → Secrets and variables → Actions`

### Environment file secrets (used by all workflows — keeps env files out of the repo)

| Secret name | Value |
|---|---|
| `ENV_STAGING_TS` | Full contents of `src/environments/environment.staging.ts` |
| `ENV_PROD_TS` | Full contents of `src/environments/environment.prod.ts` |

These are written to disk by the workflow before the Angular build runs, so the actual
files never need to be committed to the repository.

### Staging secrets (used by `deploy-staging.yml`)

| Secret name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key (from Step 1) |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key (from Step 1) |
| `AWS_REGION` | `ap-southeast-1` (your EC2 region) |
| `AWS_S3_BUCKET_STAGING` | S3 bucket name for staging (from Step 2) |
| `AWS_CODEDEPLOY_APP_NAME_STAGING` | CodeDeploy application name (from Step 3) |
| `AWS_CODEDEPLOY_GROUP_NAME_STAGING` | Staging deployment group name (from Step 3) |

### Production secrets (used by `deploy-production.yml`)

| Secret name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | Same IAM user (or a separate prod-only user) |
| `AWS_SECRET_ACCESS_KEY` | Same or separate |
| `AWS_REGION` | Your EC2 region |
| `AWS_S3_BUCKET_PROD` | S3 bucket name for production (from Step 2) |
| `AWS_CODEDEPLOY_APP_NAME_PROD` | CodeDeploy application name |
| `AWS_CODEDEPLOY_GROUP_NAME_PROD` | Production deployment group name |

> **Tip:** Use GitHub Environments (`staging` and `production`) to scope secrets per
> environment and add protection rules (e.g., require manual approval before production deploy).
> The deploy workflows already reference `environment: staging` and `environment: production`.

---

## Step 5 — Enable Auto-Deploy Triggers

Once secrets are set and a manual test deploy succeeds:

In [.github/workflows/deploy-staging.yml](../.github/workflows/deploy-staging.yml), uncomment:
```yaml
# push:
#   branches:
#     - staging
```

In [.github/workflows/deploy-production.yml](../.github/workflows/deploy-production.yml), uncomment:
```yaml
# push:
#   branches:
#     - main
```

This makes deploys fire automatically on every push/merge.

---

## GitHub Environments Setup (Recommended)

Setting up GitHub Environments adds protection rules and secret scoping:

1. Go to repo → **Settings → Environments → New environment**
2. Create `staging` environment:
   - No protection rules (auto-deploy is fine for staging)
   - Add staging-specific secrets here instead of repo-level secrets
3. Create `production` environment:
   - Add **Required reviewers** (yourself or a teammate) — this requires manual approval before prod deploy runs
   - Add production-specific secrets here

---

## Step 6 — GitHub MCP Setup for Claude Code

The file [.claude/settings.json](../.claude/settings.json) configures the GitHub MCP server
so Claude Code can read issues, PRs, and repo state directly.

Replace `YOUR_GITHUB_PAT_HERE` with a real token:

1. Go to `github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)`
2. Click **Generate new token (classic)**
3. Scopes needed: `repo`, `workflow`
4. Copy the token
5. Edit [.claude/settings.json](../.claude/settings.json) and replace the placeholder

> **Do NOT commit the token to git.** Add `.claude/settings.json` to `.gitignore` or use
> `~/.claude/settings.json` (global) instead of the project-level file.

---

## Branch → Environment Mapping

| Git branch | Build config | Deploy target |
|---|---|---|
| `staging` | `npm run build` (staging env) | AWS EC2 staging via CodeDeploy |
| `main` | `npm run buildprod` (prod env) | AWS EC2 production via CodeDeploy |
| Any PR to `main` or `staging` | Same as target branch | Build only, no deploy |

---

## Troubleshooting

**Build fails with heap out of memory:**
The `angular.json` already sets `--max-old-space-size=8192`. If GitHub Actions runner (7 GB RAM)
hits limits, add to the build step:
```yaml
- name: Build (production)
  run: npm run buildprod
  env:
    NODE_OPTIONS: '--max-old-space-size=6144'
```

**CodeDeploy deployment stuck:**
- Check the EC2 instance has the CodeDeploy agent running: `sudo service codedeploy-agent status`
- Check deployment logs on EC2: `/var/log/aws/codedeploy-agent/codedeploy-agent.log`

**S3 access denied:**
- Verify the IAM policy ARN in Step 1 matches your actual bucket name exactly
- Check the bucket is in the same region as specified in `AWS_REGION` secret
