# Project Reclaim Portal

Project Reclaim is a public-facing operational portal for wildfire prevention, wood reclamation, land stewardship, workforce development, education, community resilience, and evidence-led partnership planning.

The portal is designed as a navigation plate for a physical-world initiative. Technology supports the work; it does not replace field authorization, professional diligence, partner agreements, clinical oversight, emergency authority, or evidence of completed results.

## Public commitment

Project Reclaim will not claim completed work, participants, acreage, jobs, partnerships, credentials, or outcomes until those facts are documented and verified. Public planning records are labeled as planning, proposed, pending, unverified, or verified. A public page or database record is not itself proof that work occurred.

The portal does not provide clinical treatment, legal advice, emergency dispatch, probation or parole decisions, housing placement, or government-authorized fire operations. Any future residential, behavioral-health, workforce, or emergency-readiness program requires qualified operators, written agreements, appropriate licensing, safeguarding procedures, insurance, and agency authorization.

## Current status

- **Application:** React 19, TypeScript, Tailwind CSS, Express, tRPC, Drizzle ORM, MySQL/TiDB.
- **Authentication:** Manus OAuth integration, with protected procedures for owner-governed workflows.
- **Public capabilities:** Project registry, operational-model pages, workforce and training pathways, evidence-boundary messaging, public resource and planning pages, map-related planning records, and ecosystem documentation.
- **Protected capabilities:** Evidence and release controls, property diligence, pilot command items, credential portfolios, resident-intake records, and owner-only operational workflows.
- **Integrations:** External Archangel, IWA/Sage, blockchain, token, and emergency-control integrations remain intentionally disconnected unless their endpoint, authentication, schema, authority, audit, and failure contracts are separately approved and tested.
- **Deployment:** The repository contains an operator-managed Lightsail handoff under `deployment/lightsail/`. Do not treat a successful source build as proof that a particular external host is configured.

## Repository map

```text
client/                         React application and public pages
server/                         Express/tRPC server, auth, storage, and tests
drizzle/                        Database schema and migration metadata
shared/                         Shared types and constants
deployment/lightsail/           Secret-free PM2, Nginx, and launch runbook
docs and root Markdown files    Governance, diligence, funding, procurement, and validation records
production.env.example          Non-secret production configuration template
.github/workflows/ci.yml        Reproducible typecheck, test, and build checks
```

## Local development

Requirements: Node.js 22.x, pnpm 10.x, and a supported MySQL/TiDB database only when database-backed features are being exercised.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm dev
```

The development server defaults to port `3000`. Runtime values are read from the environment. The project can run many source checks without a database, but protected database behavior requires a valid test or development database and an approved environment file.

## Production configuration

Start from [`production.env.example`](production.env.example). Put real values in a protected secret-management system or a mode-600 file outside the repository. Never commit `production.env`, `.env`, database URLs, OAuth secrets, API keys, private keys, certificates, or copied platform configuration.

At minimum, the production operator must decide and verify:

1. TLS-enabled least-privilege database credentials and backup/restore procedures.
2. A long random `JWT_SECRET` stored outside GitHub.
3. OAuth application ID, callback allowlist, and owner identity.
4. Server-side integration keys, with frontend exposure limited to values intentionally designed for browser use.
5. Storage bucket policy, private evidence defaults, retention, and deletion procedures.
6. Domain, HTTPS certificate, reverse proxy, firewall, process manager, and health checks.
7. Snapshot and rollback procedures before loading real participant, property, or evidence records.
8. Privacy notice, consent language, safeguarding procedures, and release approvals for participant-facing data.

See [`deployment/lightsail/README.md`](deployment/lightsail/README.md) and [`deployment/lightsail/project-reclaim-launch.sh`](deployment/lightsail/project-reclaim-launch.sh) for the secret-free hosting handoff. The launcher deliberately stops before starting the application when a protected environment file has not been supplied.

## Verification and release discipline

Every change intended for release should pass:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
git diff --check
```

Before production promotion, also complete an operator smoke test for the intended host:

- HTTPS and certificate hostname verification.
- HTTP-to-HTTPS redirect.
- Public pages and public data endpoints.
- OAuth login and logout.
- Owner-only authorization boundaries.
- Database connectivity and migration state.
- Private evidence access and storage policy.
- Error handling, logs, backups, snapshots, and rollback.
- No unexpected listening ports or public administrative endpoints.

Record the release commit, build result, deployment time, operator, environment identifier, smoke-test results, and rollback reference. Do not describe a release as live, verified, or operational without a corresponding evidence artifact.

## Data and evidence boundaries

Planning records may describe a proposed site, treatment concept, curriculum, partnership, or future integration. They must not be presented as proof of ownership, permission to enter, zoning approval, completed treatment, employment, credentials, clinical service, or public-safety authority.

Evidence artifacts should identify the source, date, responsible reviewer, scope, privacy classification, approval state, and retention rule. Participant stories and resident records require consent and should not be published merely because they exist in the system.

## Security reporting

Do not open a public issue containing credentials, personal information, private property records, or exploitable details. Follow [`SECURITY.md`](SECURITY.md). If a secret is suspected to have entered Git history, revoke or rotate it first, preserve the incident record, and then coordinate history cleanup.

## License and operational materials

Application source is distributed under the license declared in `package.json`. Board packets, governance records, property diligence materials, and operational templates may contain context-specific information and should be reviewed before redistribution. Their presence in the repository does not establish a public claim, legal opinion, grant award, partner commitment, or property right.

## Primary records

- [`VALIDATION.md`](VALIDATION.md) — recorded checks, boundaries, and remaining verification work.
- [`OPERATIONAL_GOVERNANCE_READINESS.md`](OPERATIONAL_GOVERNANCE_READINESS.md) — privacy, governance, evidence, and release controls.
- [`NEXINUS_ECOSYSTEM_CANONICAL_OPERATING_CHARTER.md`](NEXINUS_ECOSYSTEM_CANONICAL_OPERATING_CHARTER.md) — canonical public operating boundary.
- [`PHARO_LAPSE_PUBLIC_POSITIONING.md`](PHARO_LAPSE_PUBLIC_POSITIONING.md) — development/testing-only public positioning for Pharo-Lapse.
- [`deployment/lightsail/README.md`](deployment/lightsail/README.md) — operator-managed hosting handoff.
