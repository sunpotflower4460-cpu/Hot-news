# Commercial Release Checklist

This checklist is the release gate for publishing Hot News as a commercial product. A visually complete preview is not a releasable product.

## P0 release blockers

- [ ] `src/config/commercial.json` uses `releaseStage: production`
- [ ] Bundle ID is final and matches the native target
- [ ] Public HTTPS base URL is live
- [ ] Operator legal name, representative, address, contact email, and required phone disclosure are final
- [ ] Privacy policy and terms have effective dates
- [ ] Legal text has been reviewed for the actual business and data flows
- [ ] Every supported commercial language has specialist-reviewed legal, privacy, support, billing, and App Store text
- [ ] `features.mockContent` is false
- [ ] Real news API and production database are configured
- [ ] No preview or fictional article can appear in production
- [ ] `robots.txt` no longer blocks the production site
- [ ] Current Next.js, React, and other dependencies have no unresolved high/critical release blocker
- [ ] `npm run release:check` passes
- [ ] GitHub quality, CodeQL, and dependency review checks pass
- [ ] Real-device smoke testing passes

## Product truth

- [ ] Every visible feature works as described
- [ ] Preview labels and placeholder copy are removed
- [ ] Notifications are hidden until real delivery exists
- [ ] Premium is hidden until StoreKit receipt validation exists
- [ ] Account UI is hidden until account creation, recovery, export, and deletion exist
- [ ] Ads are hidden until disclosures, consent, and policy review are complete
- [ ] Empty, loading, error, offline, and maintenance states are tested

## Localization and language quality

- [ ] Japanese and English dictionary keys are identical
- [ ] Every visible reader and settings route has been reviewed in both languages
- [ ] All production articles include reviewed English content or are clearly unavailable in English
- [ ] Dates, times, numbers, reading-time labels, and accessibility labels follow the selected locale
- [ ] Language choice persists across restart and is included in local-data deletion
- [ ] `<html lang>` changes with the selected language before hydration
- [ ] Dynamic Type and narrow-screen layouts are tested with longer English copy
- [ ] VoiceOver pronunciation and reading order are tested in Japanese and English
- [ ] Search, notifications, support templates, and system emails use the selected language
- [ ] English privacy policy, terms, commerce disclosure, editorial policy, and accessibility statement receive specialist review
- [ ] App Store metadata, screenshots, support URL, privacy URL, and review notes are complete for every storefront language
- [ ] Translation fallback never presents Japanese legal text as reviewed English text

## Bright-news editorial integrity

- [ ] Every reader-facing query uses the central publication gate
- [ ] Ingestion cannot publish directly to readers
- [ ] Candidate source, fetched timestamp, canonical URL, and content hash are stored
- [ ] Duplicate and near-duplicate detection is active
- [ ] Primary-source preference is implemented
- [ ] Important claims receive independent corroboration
- [ ] Brightness, emotional safety, hope, positive change, dark-context ratio, reliability, and rights are stored
- [ ] Model, prompt, policy version, and reviewer actions are auditable
- [ ] Human quarantine, correction, retraction, and republish controls exist
- [ ] Retracted content is removed from caches, notifications, favorites, digests, and direct URLs
- [ ] Images have documented rights and attribution
- [ ] Sponsored or affiliated content is visually separated and disclosed

## Privacy and data protection

- [ ] Data inventory matches production behavior
- [ ] App Store privacy answers include all first- and third-party SDK behavior
- [ ] Privacy policy URL is public and stable
- [ ] Privacy choices URL is public and stable
- [ ] Optional analytics and diagnostics are disabled before consent
- [ ] Event schemas reject article text, URLs, search queries, free text, credentials, and personal data
- [ ] Retention periods are configured and enforceable
- [ ] User deletion requests have an operational workflow
- [ ] Account deletion is available in-app if accounts exist
- [ ] Data processors and subprocessors are documented
- [ ] Privacy manifest is generated from the final native dependency graph
- [ ] Required-reason API declarations are verified in Xcode's privacy report

## Security

- [ ] Secrets are stored only in approved secret managers
- [ ] No API key is embedded in the web or native client unless explicitly public and restricted
- [ ] Backend authorization is deny-by-default
- [ ] Admin/editor roles use strong authentication and least privilege
- [ ] Article publication and retraction actions are audit logged
- [ ] Rate limiting, abuse detection, and request size limits exist
- [ ] CSP and `connect-src` list only production endpoints
- [ ] Source URLs are validated against allowed protocols
- [ ] Dependencies and container images are scanned
- [ ] Backups are encrypted and restore-tested
- [ ] Incident contacts and severity ownership are current
- [ ] Private vulnerability reporting is enabled

## Reliability and observability

- [ ] Error monitoring provider is configured only after consent/disclosure review
- [ ] Health checks cover API, database, ingestion, editorial queue, notifications, and billing
- [ ] Structured logs exclude secrets, article bodies, and user-entered text
- [ ] Alerts have owners and actionable thresholds
- [ ] Retry and dead-letter behavior is defined for ingestion and notifications
- [ ] Database migrations are reversible or have a tested recovery path
- [ ] Backup restore drill has been completed
- [ ] Offline and stale-content behavior is defined
- [ ] Status and maintenance communication templates exist

## Payments and subscriptions

- [ ] StoreKit 2 purchase flow is implemented
- [ ] Server-side transaction/receipt verification is implemented
- [ ] Restore purchases works
- [ ] Subscription status works across supported devices
- [ ] Manage-subscription link is available
- [ ] Price, billing period, auto-renewal, cancellation, and trial terms are shown before purchase
- [ ] Premium provides ongoing value
- [ ] Grace period, billing retry, refund, revocation, and expiration are handled
- [ ] Deleting an account does not imply cancellation of Apple's subscription
- [ ] Free features remain usable as described

## Support and legal operations

- [ ] Public support URL contains real contact details
- [ ] Correction, rights, privacy, billing, and safety reports have separate priorities
- [ ] Support response ownership is assigned
- [ ] Terms, privacy policy, commerce disclosure, and editorial policy are linked in-app
- [ ] Copyright/takedown process is documented
- [ ] Consumer complaints and refund escalation path is documented
- [ ] Accessibility contact path exists
- [ ] Version and build number are visible to support

## App Store submission

- [ ] App name, subtitle, description, keywords, screenshots, age rating, category, copyright, and URLs are final
- [ ] Review notes explain the bright-news editorial model
- [ ] Review account is provided if login becomes required
- [ ] All external content and images have rights to display
- [ ] Export compliance answers are complete
- [ ] Privacy Nutrition Label matches the binary
- [ ] Native privacy manifest is valid
- [ ] Notification, background, and network entitlements are minimal
- [ ] App works without unavailable backend dependencies during review
- [ ] No placeholder, test purchase, demo text, or broken link remains

## Release execution

```bash
npm ci
npm run check
COMMERCIAL_RELEASE=1 npm run commercial:check
```

Then complete the device/browser QA matrix, create a signed release candidate, freeze editorial schema changes, and obtain release approval from product, engineering, editorial, privacy/legal, and support owners.
