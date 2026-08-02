# Production Architecture

The current repository is a static UI prototype. Commercial automatic news delivery requires a runtime architecture that keeps unreviewed data away from readers and keeps secrets out of the client.

## Recommended system boundaries

### Reader client

Responsibilities:

- display approved articles
- local theme, favorites, consent, and offline shell
- authenticated API calls when accounts exist
- StoreKit UI through a native bridge when subscriptions exist
- push permission and deep-link handling

Must not contain:

- source API secrets
- AI provider secrets
- admin credentials
- publication authority
- trusted subscription entitlement logic

### Public reader API

Responsibilities:

- return published, non-retracted articles only
- enforce pagination, rate limits, and schema validation
- omit internal prompts, raw sources, reviewer identities, and private audit data
- return cache version and retraction-aware responses
- support ETag or version-based caching

### Ingestion workers

Responsibilities:

- retrieve permitted sources
- normalize canonical URLs and timestamps
- hash content and detect duplicates
- store candidate provenance
- enqueue assessment jobs

Ingestion workers cannot set `PUBLISHED`.

### Editorial assessment service

Responsibilities:

- source reliability checks
- bright-news scoring
- dark-context detection
- factual claim extraction
- AI-assisted summary drafts
- rights-mode recommendation
- policy versioning

Outputs remain candidates until approval requirements are met.

### Editorial admin

Responsibilities:

- candidate review
- source and claim inspection
- approve/reject/quarantine/retract/correct
- rights status and publication mode
- notification preview and approval
- audit history

Protect with strong authentication, least privilege, and step-up verification for publish/retract actions.

### Database

Recommended logical tables:

- `sources`
- `source_snapshots`
- `article_candidates`
- `articles`
- `article_sources`
- `claims`
- `claim_evidence`
- `editorial_assessments`
- `rights_records`
- `article_versions`
- `publication_events`
- `corrections`
- `retractions`
- `notification_campaigns`
- `audit_events`
- `users`, `favorites`, `consents` only when accounts exist
- `subscription_entitlements`, `store_transactions` only when billing exists

Use immutable version records for published content. Never overwrite evidence needed to explain a correction.

## Publication gate

A single backend function must determine reader eligibility. It should require:

- approved editorial decision
- status `PUBLISHED`
- no active quarantine or retraction
- valid source and rights state
- brightness and safety thresholds
- current policy version or explicit grandfathering
- publication time reached

Every API, feed, search index, digest, notification, favorite sync, related-story query, and cache warmer must call the same gate.

## Static shell strategy

For Capacitor/iOS, keep the application shell bundled and fetch approved content at runtime. Avoid generating one static route per article for daily updates.

Suitable client routing patterns:

- fixed article route with runtime ID lookup
- client-side router backed by the public API
- local encrypted cache of approved article DTOs

The API should return a safe tombstone for retracted content so cached clients remove it.

## Caching

- cache only reader-safe DTOs
- include article version and retraction version
- use short TTLs for listings
- purge article, listing, search, digest, and notification caches on correction/retraction
- prevent service-worker cache from serving retracted article pages indefinitely
- store offline expiry and last-verified time

## Notifications

Pipeline:

1. select only eligible articles
2. generate notification draft
3. check emotional safety and text length
4. human or policy approval
5. schedule by user timezone and preference
6. send through provider
7. record provider message ID and article version
8. disable deep link if article is retracted

Never send directly from ingestion or a model output.

## Billing

Use StoreKit 2 in the native client and verify transactions on a trusted server.

- client initiates purchase
- server verifies signed transaction data
- entitlement is derived server-side
- App Store server notifications update renewals, refunds, revocations, and billing states
- client refreshes entitlement from server
- local premium flags are display caches only

## Accounts

Delay accounts until cross-device value justifies the privacy and support cost. If added:

- prefer Sign in with Apple or another minimal identity flow
- separate account ID from editorial/analytics identifiers
- offer export and in-app deletion
- delete synchronized favorites and preferences
- retain only legally necessary billing/audit records
- explain subscription cancellation separately

## Secrets

- source and AI keys exist only in server secret storage
- use separate development, staging, and production projects
- rotate keys and scope them by environment
- block secrets from logs and error payloads
- use short-lived credentials for CI deployment where possible

## Environments

- local: mock data, no production secrets
- development: synthetic/test data
- staging: production-like, non-public, test billing and notifications
- production: real content and users

Production data must not be copied into development without approved anonymization.

## Deployment safeguards

- migration check before deploy
- canary or staged rollout for backend changes
- feature flags default off
- health checks and synthetic reader tests
- rollback plan
- audit event for configuration changes
- release approval record

## Suggested first backend milestone

1. hosted database and public read API
2. internal admin authentication
3. candidate/source schema
4. central publication gate
5. manual article creation and retraction
6. runtime client loading
7. only then automated ingestion and AI assistance

This sequence delivers a trustworthy product before adding automation risk.
