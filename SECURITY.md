# Security Policy

## Scope

This policy covers the Project Reclaim Portal source code, deployment templates, public endpoints, and project documentation in this repository.

The repository must not contain production credentials, private keys, database connection strings, personal participant records, confidential diligence records, or unredacted incident data.

## Supported release line

The `main` branch is the review and release line. A release is supported only after the repository checks pass and the operator records host-level smoke tests, configuration review, backup status, and rollback readiness.

## Reporting a vulnerability

Please do not publish a suspected vulnerability, credential, personal record, or exploit reproduction in a public issue. Contact the project maintainer through the private project channel or the private security-reporting mechanism configured for the GitHub repository. Include:

- affected commit, route, component, or deployment artifact;
- a concise description of impact;
- safe reproduction steps that do not access other people’s data;
- whether a credential or personal record may be exposed; and
- any suggested containment step.

If no private GitHub reporting channel is configured yet, treat the repository as **not accepting sensitive reports through GitHub issues** and use the project owner’s separately verified private contact route.

## Credential exposure response

If a secret may have been committed or exposed:

1. Revoke or rotate the secret immediately at its issuing service.
2. Disable affected sessions, tokens, callbacks, or database accounts as appropriate.
3. Preserve a private incident record with timestamps and affected commits.
4. Remove the secret from the working tree and prevent reintroduction with ignore rules and CI checks.
5. Rewrite Git history only after rotation and coordination with all repository users.
6. Verify that replacement credentials are stored outside GitHub and are not present in build artifacts or logs.

Removing a value from the latest commit does not make an exposed credential safe. Rotation is required.

## Privacy and safety

Do not report participant names, addresses, clinical details, probation or parole information, housing information, or private property records in issues or pull requests. Use de-identified test fixtures and synthetic values.

Project Reclaim is not an emergency dispatch system, clinical service, legal service, or government control plane. Security reports must not be used to request or test unauthorized access to those systems.
