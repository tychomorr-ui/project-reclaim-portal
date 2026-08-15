# Project Reclaim — Oregon Lightsail Handoff Package

**Status:** Deployment preparation only. No external Lightsail instance was accessed, modified, or deployed by this package.

**Application:** `project-reclaim-portal`

**Intended handoff:** User-managed AWS Lightsail instance in Oregon. The phrase “Lycel instance” is treated as a Lightsail instance for planning purposes.

## What this package contains

This directory contains a PM2 process definition for the production bundle and this deployment runbook. It intentionally contains no credentials, database URLs, OAuth secrets, storage keys, owner identifiers, or third-party integration tokens.

## Preflight requirements

Confirm the instance operating system, Node.js version, pnpm availability, available memory, firewall rules, static IP, DNS ownership, database reachability, S3/storage configuration, OAuth callback URLs, and TLS certificate strategy before deployment. The application should run behind HTTPS and a reverse proxy, not directly on an unprotected public Node port.

Create a static IP before mapping a domain. AWS notes that a dynamic Lightsail public IP can change after stop/start, while a static IP remains attached to the instance for DNS mapping.[1]

## Build and transfer sequence

Run the following locally from the project root after reviewing the current checkpoint:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
```

Transfer the release bundle and package manifests through an approved secure channel. Do not copy local `.env` files or secrets into the archive. On the instance, install production dependencies and start the process with PM2:

```bash
pnpm install --prod --frozen-lockfile
pm2 start deployment/lightsail/ecosystem.config.cjs
pm2 save
pm2 startup
```

The application must receive its runtime port from the environment. Do not hard-code an Oregon instance port into application source. Confirm that the reverse proxy forwards HTTPS traffic to the same environment-provided port used by the Node server.

## Required runtime configuration

Populate these values through the instance’s secret-management process or a protected environment file owned by the operator. Never commit them to the repository:

| Variable group | Purpose |
|---|---|
| `DATABASE_URL` | Production MySQL/TiDB connection string with TLS and least-privilege credentials. |
| `JWT_SECRET`, `OAUTH_SERVER_URL`, `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL` | Session and OAuth configuration. Update the OAuth callback allowlist for the final domain. |
| `OWNER_OPEN_ID`, `OWNER_NAME` | Protected owner workspace identity. Verify the value before opening `/admin`. |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`, frontend forge values | Only if the deployment is intended to use the managed integration layer; otherwise keep the integration plan-only and remove unused exposure. |
| Storage variables used by the existing storage helper | Private evidence and document storage. Confirm bucket policy, server-side access, and non-public defaults. |
| `PORT` or platform-provided port | Runtime listening port supplied by the host. |

## DNS and TLS

At the registrar, map the final domain’s `A` record to the Lightsail static IP, or use the selected Lightsail DNS zone. Use a certificate covering the apex and required `www` or subdomain names. After DNS propagation, verify HTTPS, OAuth callback behavior, public registry reads, owner authorization, private evidence access, and database connectivity.

## Backup and rollback

Enable Lightsail automatic snapshots before exposing the service publicly. AWS states that automatic snapshots retain seven daily snapshots and replace the oldest with the newest when enabled.[1] Maintain a separate database backup and test restoration before loading real participant, evidence, or property records. Keep the managed Project Reclaim checkpoint as the application rollback source; do not use destructive filesystem resets on the instance.

## Oregon launch boundary

This package prepares hosting only. It does not claim Oregon operations, an Oregon property, an Oregon agency relationship, emergency-response authority, or a relocation of the Mendocino–Lake County pilot model. Those are separate governance, property, partner, and authorization decisions.

## References

[1]: https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-quick-start-guide-nodejs.html "AWS Lightsail: Deploy and manage a Node.js stack on Lightsail"


## Current publication-readiness assessment — August 15, 2026

The application is technically prepared for an operator-managed Oregon Lightsail deployment: `pnpm check`, `pnpm test`, and `pnpm build` pass locally; the build produces `dist/public` and `dist/index.js`; and the PM2/runbook package is secret-free. The project is **not yet live on the user’s Oregon instance** because no instance shell, static IP, DNS record, reverse proxy, runtime environment, production database, OAuth callback allowlist, TLS certificate, or backup configuration has been verified in this session.

In practical terms, Project Reclaim is close to publishing as software, but not yet ready to claim a production launch. The remaining deployment steps are operational: confirm the instance and static IP, install the release, inject production secrets, configure the database and storage, map `reclaim.nexinus.net`, configure TLS and OAuth, run smoke tests, enable snapshots and backups, and verify the owner-only routes.

## Archangel control-plane boundary

The Project Reclaim portal currently has **no live Archangel connector** and no Archangel endpoint, authentication token, event schema, command authority, device protocol, or failure-handling contract has been supplied. The future integration should begin as a read-only status or event bridge, with explicit authorization, audit logs, least-privilege credentials, replay protection, and a human-controlled disable switch. No Archangel connection was attempted, no credentials were requested, and no control-plane command can be issued from this portal at the current checkpoint.

## Fresh-instance launcher

Use `project-reclaim-launch.sh` from a trusted workstation or sandbox against a new Ubuntu Lightsail instance. The AWS region key is an authentication key; for the standard Ubuntu image, keep the SSH username as `ubuntu` unless the instance was intentionally created with a different login user. Do not use `root` merely because the downloaded key is the region’s default or “root” key.

The launcher requires the new instance IP or hostname, the private key path, and the secret-free release archive. It accepts a mode-600 production environment file through `--env-file`; without that file it installs the release but deliberately does not start PM2. The script installs Node.js 22.13.0, pnpm 10.4.1, PM2, and Nginx; creates a versioned release; preserves SSH before enabling UFW; configures Nginx; starts PM2; and performs an HTTP localhost check. It does not request TLS or change DNS automatically.

Example:

```bash
chmod 600 /path/to/project-reclaim-ssh.pem
chmod 750 deployment/lightsail/project-reclaim-launch.sh
./deployment/lightsail/project-reclaim-launch.sh \
  --host NEW_LIGHTSAIL_STATIC_IP \
  --user ubuntu \
  --key /path/to/project-reclaim-ssh.pem \
  --release /path/to/project-reclaim-release-e5c2eb96.tgz \
  --env-file /path/to/project-reclaim.production.env
```

The production environment file must be created locally with mode `600` and must never be committed. It should contain the server-side values required by `server/_core/env.ts`, including `NODE_ENV=production`, `PORT=3000`, `DATABASE_URL`, `JWT_SECRET`, `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_API_URL`, and `BUILT_IN_FORGE_API_KEY`.

After the launcher reports `DEPLOYMENT_READY_HTTP_ONLY`, create the DNS A record `reclaim.nexinus.net → NEW_LIGHTSAIL_STATIC_IP`. Once DNS resolves, request the certificate with Certbot, then run HTTPS smoke tests. Archangel remains intentionally disconnected until its endpoint, authentication, event contract, and authorization are separately supplied.
