# deskdyneDashboard — Admin Web Dashboard

Angular 16 admin dashboard for the Deskdyne food-tech platform. Port **4300**. Inherits monorepo rules from `../CLAUDE.md`.

## Stack

- Angular 16.2 · TypeScript 5.1 · Angular Material 16 · Bootstrap 5.3.2
- RxJS 7.8 · ng-bootstrap 15 · Highcharts 11 · ExcelJS · pdfmake
- Build: Angular CLI 16.2 with 8 GB heap (`--max-old-space-size=8192`)
- Tests: Karma / Jasmine (`npm test`)

## Commands

```bash
npm run serve        # dev server :4300
npm run build        # staging build
npm run builddev     # dev build
npm run buildprod    # production build
npm test             # karma unit tests
```

## Service Call Chain

```
Component
  └── ApiMainService          src/service/apiService/apiMain.service.ts
        └── ApiHttpService    (HTTP + JWT + decryption)
              └── ApiConfigService (endpoint strings)
                    └── environment.ts → serverUrl
```

## Environments

| File | Server | CDN |
|---|---|---|
| `environment.ts` | `http://localhost:7000` | `d26orgtgu8ika0.cloudfront.net` |
| `environment.staging.ts` | ELB staging :7000 | `d26orgtgu8ika0.cloudfront.net` |
| `environment.prod.ts` | `https://api.deskdyne.com` | `dd54a74ylcz91.cloudfront.net` |

## Auth & Routing

- Guard: `src/guards/access.guard.ts` — functional `accessGuard`, checks `ADMIN_PROFILE` in localStorage for per-route permission
- Unauthorized → redirects to `/mainDashboard` or `/org-dashboard` based on `policy_name`, shows toast error 122
- Default route: `/login` · Wildcard: `/login`
- All 51 feature routes lazy-loaded; `scrollPositionRestoration: 'enabled'`, `useHash: false`

## Key Services (`src/service/`)

| Service | Purpose |
|---|---|
| `apiMain.service.ts` | All HTTP API calls |
| `local-storage.service.ts` | LocalStorage wrapper + cache |
| `toaster.service.ts` | Toast notifications |
| `confirmation-modal.service.ts` | Confirm dialogs |
| `session-timeout.service.ts` | Session expiry |
| `excel.service.ts` | Excel export |
| `data-format.service.ts` | Data formatting |
| `sendDataToComponent.service.ts` | Cross-component messaging |
| `loaderstatus.service.ts` | Global loader state |

## App Structure (`src/app/`)

**Core:** `login/` `home/` `guest/` `header/` `toaster/` `confirmation-modal/` `session-timeout/` `main-loader/`

**Orders:** `orders/` `all-orders/` `other-orders/` `search-order/` `consumption-order-details/`

**Outlet:** `outlet/` `outlet-master-menu/` `common-outlet-cafe-select/`

**Billing:** `billing/` → `outlet-billing/` `daily-billing/` `bulk-billing/` `vc-billing/` `wallet-billing/` `company-wallet-billing/`

**Vendor:** `vendor/` `vendor-firm/` `vendor-firm-view/` `vendor-daily-report/` `vendor-report/` `vendor-payout/` `vendor-wallet-dashboard/`

**Org:** `organization-card/` `organization-view/` `org-components/` (dashboard, menu, orders, pre-orders, subscription, reviews, reports, billing, employees, incidents, bulk-orders, manual-orders, audit)

**Admin (deskdyne-components/):** `admin/` `add-admin/` `add-organization/` `search-organization/` `main-dashboard/` `dashboard/` `checklist-question/` `b2b-food-item/` `org-registry/`

**Shared:** `src/shared/constants/` `src/shared/directives/` `common-components/` (20+ reusable feature components)

## Bootstrap

`src/main.ts` → `AppModule` (not standalone) · Root: `AppComponent`
Imports: `HttpClientModule` `FormsModule` `NgbModule` `BrowserAnimationsModule` + Material (Datepicker, Dialog, Button, Tooltip)

## Deployment

- AWS CodeDeploy: `appspec.yml` + `scripts/`
- App Engine: `app.yaml`
- Express cluster server: `server.js`
- Dist output: `dist/dashboard-deskdyne`

## Git Remotes

| Name | URL | Purpose |
|---|---|---|
| `origin` | `git@github-work:Apurv-Patole/deskdyneDashboard.git` | Personal fork |
| `upstream` | `git@github-work:pratapmealawe/deskdyneDashboard.git` | Canonical repo |
| `aiorigin` | `git@github-work:pratapmealawe/deskdyneDashboardAI.git` | AI-assisted work repo |

SSH alias `github-work` uses `~/.ssh/id_ed25519_work`. Push AI branch work to `aiorigin`.

## Plugins & Skills

**Plugins active (inherited from monorepo):**
- **Superpowers** (`obra/superpowers`) — brainstorming, planning, TDD, branch lifecycle
- **ECC** (`affaan-m/everything-claude-code`) — agents, hooks, rules, MCP configs

**Skill routing:**
| Trigger | Skill |
|---|---|
| New feature / bug | `brainstorming` → `writing-plans` → `executing-plans` |
| Any bug/failure | `systematic-debugging` |
| Before coding | `test-driven-development` |
| Parallel tasks | `dispatching-parallel-agents` |
| Done coding | `verification-before-completion` → `finishing-a-development-branch` |
| PR submit/receive | `requesting-code-review` / `receiving-code-review` |

**Agent routing:**
| Need | Agent |
|---|---|
| Feature planning | `planner` |
| Code quality | `code-reviewer` |
| Security | `security-reviewer` |
| Build failure | `build-error-resolver` |
| TypeScript issues | `typescript-reviewer` |
| Dead code | `refactor-cleaner` |

## Constraints

- Budget limits in angular.json: initial bundle ≤ 30 MB, component styles ≤ 400 KB — watch build warnings
- No interceptors in codebase; auth headers handled inside `ApiHttpService`
- `ADMIN_PROFILE` in localStorage is the source of truth for role/permissions — never derive permissions elsewhere
- Immutable data patterns required (see `common/coding-style.md`)
- 80% test coverage minimum; TDD strictly enforced
