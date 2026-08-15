# Project Reclaim Operational Governance Readiness

> **Working design record — not medical or legal advice.** Project Reclaim should obtain qualified California privacy, clinical, workforce, land-use, and legal review before relying on this design for regulated data exchange, clinical referrals, property access, or public operational claims.

**Reference date:** August 12, 2026 (Pacific Time)  
**Purpose:** Translate the next portal upgrades into operational controls: owner-only evidence governance, a public-but-verified referral directory, and one authorization-gated field-to-evidence pilot.

## Operating Principle

The portal may make a workflow visible before it becomes active. It must not make an operating claim before the responsible person, evidence, authorization, and review state are visible internally. The CDC’s guidance on credible evidence calls for a collection strategy that identifies what data will be collected, how, when, from whom, data sources, quality expectations, and a data-management plan.[1]

## Owner-Only Governance Workflows

| Workflow | Protected owner input | Public result | Non-negotiable control |
|---|---|---|---|
| Impact metric | Metric, value, unit, source, method, date, verification state, verifier | Only the latest verified public metric record | A pending, superseded, missing-source, or missing-date record never replaces the public pending state with a count |
| Participant story | Excerpt, chosen attribution, category, consent/publication state, review date | Only a consent-approved and publication-approved excerpt | The portal never stores signed consent forms, health records, SUD records, justice records, images, audio, or participant contact details in the public story table |
| Referral directory | Organization, public contact route, service type, public scope, service area, verification date, owner, status | Only entries confirmed as public, current, and verified | A directory entry is a public-information listing, not proof of a formal Project Reclaim partnership, eligibility determination, or referral completion |
| Field-evidence pilot | Scope, authorization state, work order status, crew label, material pathway, evidence links, reviewer | No public record until the public-release gate is met | General location only; no property address, parcel data, exact coordinates, cultural information, or private evidence is released without authorization |

## Referral Directory and Privacy Boundary

The public directory should begin as an **information directory**, not a shared care-management system. It can identify publicly available qualified-provider, community-support, training, housing-navigation, or emergency resources and clearly explain who owns the listing and when it was last verified. It must not ask a site visitor to describe a diagnosis, medication, treatment history, substance-use treatment, probation condition, legal case, or private housing situation.

DHCS states that parties involved in care coordination should share the minimum necessary information and follow applicable law and consent processes when needed; it also notes that such agreements do not supersede federal or state privacy requirements.[2] Consequently, the initial Project Reclaim directory stores only public organizational information and a verification record. Any future warm-handoff workflow requires separate consent, partner agreement, and qualified review.

| Directory status | Meaning | Public visibility |
|---|---|---|
| Draft | Owner is evaluating a possible resource | Hidden |
| Verification pending | Public information is being checked | Hidden |
| Verified | Public route, scope, and review date are confirmed | Visible |
| Needs recheck | The listing is visible only while the review window remains valid; owner must recheck | Visible with “recheck due” internally |
| Retired | The organization or route should not be presented | Hidden |

## Crisis and Emergency Routing

Project Reclaim is not an emergency, crisis, medical, behavioral-health, or substance-use treatment provider. The support-services page may direct a person in immediate danger to call 911 and may link to or offer the public 988 Lifeline connection path. The official 988 Lifeline states that people may call, text, or chat 24/7/365 for free and confidential support, including for mental-health, emotional-distress, alcohol, or drug-use concerns.[3] The directory must not label 988 as a Project Reclaim service or make claims about local emergency response.

## First Field-to-Evidence Pilot

The first pilot is an **authorization-gated record**, not a pre-announced operating site. It should remain in a private owner workspace until the project authority, location disclosure level, safety readiness, and evidence protocol are documented. Its purpose is to prove the chain that the public portal already describes:

> **Authorized scope → work order → crew → material pathway → completion evidence → independent review → public summary (only if approved)**

| Gate | Minimum owner evidence | Public consequence if missing |
|---|---|---|
| Authority | Documented project authority, landholder/agency permission, or executed work agreement reference | No public project or site claim |
| Scope | Work purpose, general area, activity, exclusions, and planned evidence indicators | No acreage, work-completion, or site-specific result claim |
| Safety & workforce | Named operational lead, safety readiness decision, and participant role boundary | No crew or employment claim |
| Work order | Status, dated work sequence, and accountable owner | No “active work” presentation |
| Evidence | Dated, attributable evidence link or record, material pathway, and reviewer | No “completed” or “verified” presentation |
| Public release | Explicit disclosure level and reviewer decision | Keep any record owner-only or publish only a generalized summary |

This data collection design aligns with CDC guidance to define indicators, select appropriate data sources, assess accuracy, completeness, consistency, timeliness, and relevance, and document data-collection procedures.[1]

## Minimum Data Model and Retention Boundary

The initial pilot should store only the minimum operational data necessary to coordinate and verify the work. Evidence files, if later used, belong in controlled storage with a key and public-release flag; neither file bytes nor sensitive details belong in public data tables. The public release record should be a separate, intentionally selected summary rather than an automatic mirror of the owner record.

No operational workflow should contain protected health information, SUD treatment records, probation/parole records, or private property information unless Project Reclaim later has the specific legal basis, partner agreement, access control, data retention rule, and review required for that data category.

## Implementation Release Checklist

Before creating a metric, publishing a story, listing a resource, or moving a field pilot to public visibility, the owner should confirm the following: the source or authorization is current; the public description is accurate; the public status matches the evidence; no sensitive details are exposed; a named reviewer is accountable; and a correction, retirement, or withdrawal path exists.

## References

[1]: https://www.cdc.gov/evaluation/php/evaluation-framework-action-guide/step-4-gather-credible-evidence.html "CDC — Step 4: Gather Credible Evidence"
[2]: https://www.dhcs.ca.gov/data-sharing-and-confidentiality-faqs/ "California DHCS — Data Sharing and Confidentiality FAQs"
[3]: https://988lifeline.org/ "988 Suicide & Crisis Lifeline"


## Meta-Compound Expansion: Two-Site Governance

**Reference date:** August 15, 2026 (Pacific Time). The two-site hybrid model remains a planning architecture: a vineyard-style residential and land-stewardship campus paired with a Clearlake operations, materials, and field-school hub. The portal records leads and release gates; it does not establish property control, a licensed residence, or active operations.

> **Release rule:** no property, participant, clinical, supervision, title, code, safety, or partner claim becomes public until the responsible source, reviewer, consent or authorization basis, and release state are recorded.

## Property Diligence Gate Register

The current property dashboard distinguishes a public lead from broker-confirmed, title-reviewed, code-reviewed, safety-reviewed, and board-ready states. For the vineyard campus lead, the immediate task is to identify the exact parcel, owner or authorized broker, current use, access, water, septic, fire access, occupancy, and restrictions. For **3360 Old Highway 53 in Clearlake**, public listing material may describe a commercial or operational context, but current listing status, title, zoning, occupancy, suitability, and financing conclusions require current broker, county, title, and professional records.

| Gate | Required evidence | Responsible reviewer | Public state |
|---|---|---|---|
| Lead identity | Address or parcel reference, source URL, and source-as-of date | Property lead | Planning candidate |
| Broker / owner authority | Current listing, broker contact, or owner authorization | Broker / counsel | Not yet verified |
| Title | Current title commitment or recorded-document review, easements, liens, and restrictions | Title company / counsel | Not yet reviewed |
| Zoning and use | County zoning, permitted use, occupancy, building and land-development requirements | Planning / building professional | Not yet reviewed |
| Water and wastewater | Well, water service, septic or other wastewater records, site evaluation | Licensed / county reviewer | Not yet reviewed |
| Fire and life safety | Access, ingress/egress, defensible space, alarms, exits, emergency plan, hazard assessment | Fire / safety professional | Not yet cleared |
| Environmental and site hazards | Flood, wildfire, hazardous materials, trees, soil, structural, mold, or asbestos review as applicable | Qualified professionals | Not yet cleared |
| Insurance and financing | Property, general liability, workers’ compensation, auto, professional, participant, and residential coverage | Broker / counsel | Not yet bound |
| Board decision | Written go / no-go / hold decision with conditions | Board or owner | Not approved |

Lake County identifies Community Development as including Building Safety, Code Enforcement, and Planning, and directs current permits and applications to its online permitting portal.[4] The county’s Assessor–Recorder and public recorder index are public starting points for recorded-document research, but they are not a substitute for a current title commitment or counsel review.[5] [6] Lake County Environmental Health identifies septic and land-development review as separate county processes that can require a site evaluation and permit.[7] [8]

## Resident Intake and Onboarding Boundary

The public intake form records only a name, optional contact channel, entry pathway, requested track, accessibility or communication note, and explicit consent to contact. It does not request diagnoses, treatment records, substance-use records, criminal history, supervision conditions, immigration information, or crisis details. Owner review should use the application code as the operating reference and keep additional sensitive information outside this portal until counsel and qualified providers define a compliant workflow.

The planned pathway is:

**Request → consent check → safety and accessibility conversation → eligibility and fit review → support/referral coordination → separate residential or work agreement → placement decision → orientation → training/work record → advancement or exit plan.**

A court, probation, parole, corrections, or alternative-to-incarceration referral is a separate authorization path. The portal cannot promise court credit, sentence substitution, supervision approval, placement, or legal representation. Any such pathway requires the responsible public authority, written authority, participant-rights notice, grievance and exit process, safety plan, and counsel review.

## Draft Control Packet

The following documents should be drafted and separately approved before the first resident or field crew is accepted: a participant agreement; residential rules and occupancy agreement; workforce classification and pay memo; clinical and recovery referral MOU; corrections or supervision MOU; privacy notice and retention schedule; incident and safeguarding protocol; and property/procurement release checklist. The application, dashboard, and public pages label these as draft or pending professional review.

## IWA / Sage Coordination Boundary

Indigenous Wellness Alliance describes itself as a Native-led 501(c)(3) organization offering culturally responsive mental wellness, re-entry support, substance-use recovery, suicide prevention, and family-strengthening services.[9] Project Reclaim may offer a human-reviewed link and referral surface, but it must not imply a contract, endorsement, shared client record, or automatic referral. Any future Sage connection requires the official product owner, endpoint, authentication method, minimum-data contract, consent language, security review, and written agreement.

## References Added

[4]: https://www.lakecountyca.gov/410/Community-Development "Lake County Community Development"
[5]: https://www.lakecountyca.gov/271/Assessor---Recorder "Lake County Assessor–Recorder"
[6]: https://www.lakecountyca.gov/1632/Recorders-Index-Search-External "Lake County Recorders Index Search"
[7]: https://www.lakecountyca.gov/211/Environmental-Health "Lake County Environmental Health"
[8]: https://www.lakecountyca.gov/376/Land-Development "Lake County Land Development"
[9]: https://www.iwainc.org/ "Indigenous Wellness Alliance official site"
