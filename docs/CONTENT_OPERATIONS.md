# Content Operations Runbook

Hot News must never allow ingestion, summarization, or scheduling code to publish directly to readers. All content moves through an auditable state machine and the central publication gate.

## Recommended lifecycle

1. `INGESTED`
2. `SOURCE_VALIDATING`
3. `DUPLICATE_CHECK`
4. `BRIGHTNESS_REVIEW`
5. `FACT_CHECK`
6. `RIGHTS_REVIEW`
7. `READY`
8. `PUBLISHED`

Exceptional states:

- `QUARANTINED`
- `REJECTED`
- `RETRACTED`
- `CORRECTION_PENDING`

## Candidate ingestion

Store at minimum:

- canonical source URL
- source name and source type
- source publication time and fetch time
- title and content hash
- language and region
- discovered-by channel
- raw-source storage reference, subject to rights and retention policy
- robots/licensing status where applicable

Do not scrape or republish content when terms, robots rules, copyright, access controls, or technical measures prohibit it.

## Duplicate detection

Use layered checks:

- canonical URL equality
- normalized title similarity
- source content hash
- named-entity and event-time overlap
- embedding similarity
- shared primary-source reference

Merge candidates representing the same underlying event. Preserve all supporting sources rather than creating multiple reader articles.

## Source quality

Prefer:

1. official or primary source
2. reputable independent reporting
3. specialist publication with transparent methods
4. secondary aggregators only as discovery leads

Do not publish from a single low-confidence social post, anonymous claim, copied press-release farm, or AI-generated site.

## Bright-news assessment

Score and record:

- brightness of the central event
- emotional safety
- credible hope
- concrete positive change
- dark-context ratio
- reliability
- rights safety
- rejection reasons

A warm ending does not override a dark central premise. Human reviewers may reject any candidate regardless of model score.

## Fact checking

- verify names, places, dates, quantities, and causal claims
- distinguish announced plans from completed results
- preserve uncertainty and conditions
- avoid converting correlation into causation
- confirm medical, environmental, and scientific claims with primary material where possible
- use at least two independent sources for high-impact claims
- record claim-level evidence references

## Rights review

Choose one publication mode:

- `normal`: app summary and approved image/text treatment
- `no_image`: summary without external image
- `safe_short`: limited summary only
- `source_link_only`: no body reproduction

Record image owner, license, attribution, permitted transformations, territory, and expiry. If rights are unclear, use no image or source-link-only mode.

## AI use

For every AI-assisted output, record:

- provider and model
- model version
- prompt/policy version
- input source IDs
- output hash
- moderation results
- human edits
- final reviewer

Never treat model confidence as source reliability. Never allow the model to invent quotes, dates, numbers, organizations, or source links.

## Publication

Before publishing, verify:

- status is `READY`
- all required assessment fields exist
- source URL is valid and safe
- publication mode is compatible with rights status
- title and summary do not overstate the source
- no hidden distressing premise dominates
- timestamps use the correct timezone
- preview image and notification copy match the article
- cache invalidation and retraction paths are available

## Corrections

Severity examples:

- Minor: typo or non-material wording
- Material: incorrect fact that changes understanding
- Critical: wrong identity, fabricated claim, rights violation, unsafe medical claim, or dark-content gate bypass

Actions:

1. quarantine critical content immediately
2. stop scheduled notifications and digests
3. invalidate CDN, PWA, and API caches
4. preserve evidence and audit logs
5. correct or retract
6. add a visible correction note when appropriate
7. notify affected partners/users when harm is plausible
8. complete root-cause review

## Retraction guarantees

A retracted article must not remain accessible through:

- direct article URL
- favorites
- category lists
- search
- related articles
- weekly digest
- notifications
- push payload deep links
- offline cache
- social preview metadata
- sitemap or feed

## Editorial service levels

Set actual staffed targets before launch. Suggested priorities:

- rights/safety/identity complaint: immediate triage during staffed hours
- critical factual error: quarantine first, investigate second
- material correction: same business day target
- ordinary correction: two business day target
- feature suggestion: no guaranteed response

## Separation of duties

Production publication should require distinct permissions for:

- ingestion configuration
- editorial approval
- rights approval
- publish/retract action
- billing/admin access
- infrastructure access

High-risk actions should require step-up authentication and an immutable audit event.
