# Incident Response Runbook

This runbook covers security, privacy, editorial, billing, availability, and notification incidents.

## Severity

### SEV-0 — Immediate critical harm

Examples:

- active credential or secret compromise
- unauthorized admin or publication access
- payment or entitlement bypass affecting many users
- exposure of sensitive personal data
- malicious code execution
- widespread publication of fabricated or dangerous content

Target action: stop harm immediately, disable affected paths, preserve evidence, and assign an incident commander.

### SEV-1 — Major production incident

Examples:

- significant outage
- retracted content remains accessible
- large notification mis-send
- material privacy disclosure mismatch
- repeated bright-news gate bypass
- subscription state wrong for many users

Target action: contain rapidly, communicate internally, and provide a user-facing update when impact is meaningful.

### SEV-2 — Limited incident

Examples:

- isolated incorrect article
- broken source links across a category
- localized feature outage
- support data sent to the wrong internal queue

Target action: assign an owner, mitigate, and complete root-cause review if systemic.

### SEV-3 — Minor defect

Examples:

- cosmetic issue
- minor typo
- low-impact intermittent error

Target action: normal backlog with appropriate priority.

## Roles

Before launch, assign named owners for:

- incident commander
- engineering lead
- security/privacy lead
- editorial lead
- communications/support lead
- billing lead
- legal escalation

One person may hold multiple roles in a small team, but ownership must be explicit.

## First 15 minutes

1. Open a private incident record.
2. Confirm severity and incident commander.
3. Stop ongoing harm before investigating root cause.
4. Preserve relevant logs, build IDs, article versions, notification payloads, and audit events.
5. Restrict changes to designated responders.
6. Record all decisions and timestamps.

## Containment controls

Prepare kill switches for:

- all article publication
- a category or source
- AI auto-processing
- push notifications
- subscription entitlement changes
- analytics and diagnostics
- support intake integrations
- external API calls

Editorial quarantine must work without deploying a new app version.

## Security and privacy response

- rotate exposed secrets and revoke sessions
- identify affected systems and data classes
- prevent log and backup loss
- determine whether data was accessed, altered, or exfiltrated
- evaluate legal and contractual notification duties
- preserve a timeline and evidence chain
- notify processors or platform partners where required
- avoid speculative public statements

## Editorial incident response

For fabricated, unsafe, rights-infringing, or materially incorrect content:

1. quarantine the article
2. disable pending notifications and digest inclusion
3. purge caches and deep links
4. preserve the source set, model output, prompt version, and reviewer history
5. assess whether other articles share the failure pattern
6. correct or retract
7. publish a correction note where appropriate
8. retrain rules only after the immediate incident is contained

## Billing incident response

- stop entitlement mutations if verification is unreliable
- keep receipt/transaction evidence immutable
- distinguish Apple billing status from app account status
- provide restore and support guidance
- never grant or revoke entitlement solely from client state
- reconcile server records with App Store transaction history

## Notification incident response

- stop all scheduled sends
- revoke queued campaigns where the provider allows
- identify audience, payload, deep link, and send time
- quarantine linked content
- communicate if the message could cause distress, confusion, or financial harm
- add approval or preview controls before re-enabling

## Communication principles

- state what happened, what is affected, and what users should do
- distinguish confirmed facts from investigation
- avoid exposing attacker methods or personal data
- update on a predictable cadence for major incidents
- close with corrective actions, not only an apology

## Recovery

Before declaring recovery:

- original harm has stopped
- affected paths are tested
- monitoring is active
- caches and queues are clean
- support has a response script
- outstanding affected users/content are identified
- rollback or forward fix is documented

## Post-incident review

Complete for SEV-0/1 and systemic SEV-2 incidents:

- timeline
- user and business impact
- detection gaps
- root cause and contributing factors
- what worked and failed
- permanent corrective actions with owners/dates
- policy, test, monitoring, and training updates
- review of similar hidden failure modes

Focus on system improvements rather than individual blame.
