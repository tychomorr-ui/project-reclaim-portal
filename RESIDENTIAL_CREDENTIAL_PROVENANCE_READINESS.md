# Project Reclaim Residential, Credential, and Provenance Readiness

> **Working design record — not legal, clinical, financial, real-estate, or accreditation advice.** Project Reclaim should obtain qualified California land-use, housing, labor, privacy, safety, education, and digital-asset counsel before acquiring property, operating housing, describing a residential program, issuing credentials, or representing a cryptographic or blockchain verification service as active.

**Reference date:** August 12, 2026 (Pacific Time)  
**Purpose:** Define the public-facing and technical boundaries for an inclusive residential-and-training vision, evidence-backed work records, controlled evidence files, and a possible future UniversalTruth provenance connection.

## Inclusive Participation Boundary

Project Reclaim is designed for **adults seeking voluntary, dignity-centered pathways into practical work, training, stewardship, and advancement**. The site may name veterans, returning residents, people experiencing homelessness, people in recovery, people navigating mental-health barriers, people changing careers, and other adults as communities that may benefit from access to opportunity. It must not make a person’s identity, diagnosis, justice history, housing status, veteran status, or recovery status a condition of participation. It must not collect that information through public pathway pages.

## Residential Readiness, Not an Active Housing Claim

The portal may describe the intended residential model: acquiring, leasing, or contracting for currently unused homes, farmhouses, ranches, and similar properties, then responsibly rehabilitating them for a future voluntary residential-and-training pathway. It may describe one-year and two-year learning-and-work pathways as a planning model. It must not say that Project Reclaim controls any property, provides housing, operates a residential program, offers treatment, accepts residents, or has completed a rehabilitation until the corresponding authority, funding, property, safety, insurance, local-permitting, and program-review gates are satisfied.

| Planning layer | Publicly safe description | Required release condition |
|---|---|---|
| Property opportunity | Potential future property acquisition, lease, or contract pathway | No address, owner information, or implied property control before written authority |
| Rehabilitation learning site | Future hands-on carpentry and stewardship learning concept | Scope, safety lead, insurance, labor review, and site authorization |
| Residential pathway | Future voluntary living-and-learning model | Housing, clinical, privacy, accessibility, program, and local-review approvals |
| One- or two-year sequence | Portfolio-centered learning and work pathway concept | Defined curriculum, partner role, credential issuer, and participant terms |

## Skills, Credentials, and Work Records

Project Reclaim can record work completed, skills demonstrated, evidence links, reviewers, and approved credential status. A work record is **not** automatically a degree, a license, a trade certification, a Registered Apprenticeship, or a guarantee of employment. The U.S. Department of Labor describes Registered Apprenticeship as an industry-driven pathway with paid work, mentorship, supplemental education, progressive wages, and a portable credential that is approved and validated by the Department or a State Apprenticeship Agency.[1]

The portal should therefore display the distinction between **Project Reclaim learning record**, **partner-issued credential**, **regulated license/certification**, and **registered apprenticeship credential**. When an external provider, employer, issuer, or agency has not formally authorized a credential, the interface must present a portfolio or evidence record—not an equivalent credential claim.

| Record class | What it can show | What it must not claim without issuer approval |
|---|---|---|
| Work record | Role, task, date range, reviewer, evidence link, safety/status note | Employment status, payroll records, identity details, or a guarantee of competency |
| Skills portfolio | Demonstrated project, artifact, reflection, public-safe evidence | State license, trade certification, college credit, or apprenticeship completion |
| Partner credential | Named issuer, criteria, issue/expiry date, public verification route | Issuance until the named issuer actually approves it |
| Registered apprenticeship | Approved sponsor, occupation, program terms, credential route | Registered status without federal or state validation |

The Open Badges standard illustrates a useful future-oriented model: a signed credential can include the issuer, recipient, criteria, evidence, and achievement metadata, while a comprehensive learner record can bundle multiple credentials.[2] That model informs data fields; Project Reclaim will not issue an Open Badge, CLR, or other credential until it has an approved issuer, criteria, learner consent, identity controls, and a verification process.

## Controlled Evidence Files

Evidence files will be owner-uploaded and stored in controlled object storage. Each record needs an owner-only file key, a public-release selection, a related project/work record, date captured, contributor/reviewer, evidence type, and a public-safe description. A public evidence URL must be a deliberate release, not an automatic mirror of a private upload. The database stores metadata and the storage layer holds file bytes.

## UniversalTruth Integration Assessment

The public UniversalTruth site at `universaltruth.life` presents a NEXINUS/TERMINUS console, describes a Truth Substrate and related concepts, and labels its **Proof Fulcrum** as “STANDBY,” stating that promotion to live requires a real signal.[3] The public pages reviewed do not expose integration documentation, a published API reference, an authentication model, a webhook contract, or a non-custodial provenance endpoint for Project Reclaim. The current Manus connector configuration also has no UniversalTruth connector.

Project Reclaim therefore implements **provenance readiness**, not an active UniversalTruth, Truth Ledger, Truth Coin, Truth Substrate, Bitcoin, or blockchain integration. NIST explains that a blockchain is a tamper-evident and tamper-resistant distributed ledger, but that general characteristic does not by itself validate the truth, legality, safety, authorship, or privacy of a source record.[4] A hash or eventual external receipt can support integrity verification only after the underlying record is authentic, authorized, consented, and reviewed.

| Stage | Project Reclaim action | Public claim allowed |
|---|---|---|
| 0 — Local evidence | Store reviewable evidence metadata and private files with controlled release | “Evidence record pending review” |
| 1 — Internal provenance packet | Produce a canonical public-safe summary and a content digest without a token, wallet, payment, or chain transaction | “Provenance packet prepared for review” |
| 2 — UniversalTruth technical review | Confirm official API, endpoint, authentication, data model, failure modes, retention, and privacy terms | “Integration under technical review” |
| 3 — Controlled pilot | Use a written non-custodial agreement, test data or approved public record, and independent verification | “Pilot verification available,” only if actually verifiable |
| 4 — Production release | Document live service, public verification route, incident response, and long-term ownership | Specific, evidence-backed system claim only |

Project Reclaim will not issue, sell, custody, transfer, promote, price, or make investment claims about any coin, token, wallet, or blockchain asset. It will not place personal, clinical, housing, justice, or sensitive property data on-chain. Any future connection must use public-safe evidence only, with participant consent where applicable and independent legal/security review.

## References

[1]: https://www.apprenticeship.gov/employers/registered-apprenticeship-program "U.S. Department of Labor — Registered Apprenticeship Program"
[2]: https://www.1edtech.org/standards/open-badges "1EdTech — Open Badges"
[3]: https://universaltruth.life/proof-fulcrum "UniversalTruth — Proof Fulcrum"
[4]: https://www.nist.gov/publications/blockchain-technology-overview "NIST — Blockchain Technology Overview"
