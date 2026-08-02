# Data Inventory

This document must match the production binary, backend, support process, and third-party SDKs. Update it before any data flow changes.

## Current preview data

| Data                            | Location                     | Purpose                                         | Sent externally | Retention                              | User control                                   |
| ------------------------------- | ---------------------------- | ----------------------------------------------- | --------------- | -------------------------------------- | ---------------------------------------------- |
| Saved article IDs               | Browser/device local storage | Save articles on this device                    | No              | Until removed or local data is cleared | Toggle save or delete all local data           |
| Recently opened article ID/time | Browser/device local storage | Daily progress and return to recently read news | No              | Maximum 50 entries and 30 days         | Delete all local data                          |
| Theme and time-of-day settings  | Browser/device local storage | Visual preferences                              | No              | Until reset                            | Settings or delete all local data              |
| Notification preferences        | Browser/device local storage | Future preference preview                       | No              | Until reset                            | Notification settings or delete all local data |
| Privacy choices                 | Browser/device local storage | Record future analytics/diagnostics preference  | No              | Until reset                            | Privacy settings or delete all local data      |
| Last online timestamp           | Browser/device local storage | Explain whether offline content may be stale    | No              | Until next connection or local clear   | Delete all local data                          |
| Static application cache        | Browser/device Cache Storage | Offline shell and previously opened assets      | No              | Until cache expiry/update/clear        | Delete all local data or OS/browser controls   |

## Currently not collected

- account identifiers
- name, email, phone, address
- precise or approximate location
- contacts, photos, files, microphone, camera
- advertising identifiers
- payment details
- article reading history on a server
- search terms on a server
- support form text on a server
- analytics or diagnostics events

## External navigation and sharing

When a user opens an article source, the destination website may receive ordinary web request data under its own policy. Hot News should use a no-referrer policy and should not append user identifiers, tracking parameters, reading history, or consent state to source links.

When a user chooses Share, the app passes the article title, short summary, and current page URL to the operating system share sheet. If a share sheet is unavailable, only the current page URL is copied to the clipboard. The app does not receive the destination selected in the share sheet.

## Planned production data — not yet approved

Every planned data flow remains disabled until it has an owner, purpose, legal basis, retention period, deletion behavior, security controls, App Store disclosure, and policy text.

| Planned capability          | Possible data                                         | Default status  | Minimum release condition                                                      |
| --------------------------- | ----------------------------------------------------- | --------------- | ------------------------------------------------------------------------------ |
| Anonymous product analytics | event name, app version, coarse device class          | Off             | Explicit consent, reviewed event allowlist, provider contract, retention limit |
| Diagnostics                 | error class, build, OS version, non-sensitive context | Off             | Explicit consent, redaction, sampling, retention limit, access control         |
| Accounts                    | user ID, email or Sign in with Apple identifier       | Not implemented | Authentication, recovery, export, in-app deletion, breach process              |
| Saved-news sync             | user ID, article IDs, timestamps                      | Not implemented | Account controls, encryption, retention/deletion                               |
| Push notifications          | device push token, topic preference                   | Not implemented | Permission, token rotation/deletion, provider security                         |
| Subscriptions               | Apple transaction identifiers, entitlement state      | Not implemented | StoreKit, server verification, lifecycle handling, support                     |
| Support                     | contact details and message                           | Not implemented | Public support channel, retention, access restriction, deletion handling       |
| Editorial admin             | staff account, action audit logs                      | Not implemented | Strong authentication, least privilege, immutable audit trail                  |

## Analytics event allowlist

If analytics is introduced, events must use a fixed schema. Never send:

- article title, body, summary, or source URL
- free text or support messages
- names, email addresses, phone numbers, addresses
- authentication tokens or transaction payloads
- exact timestamps when a coarser bucket is sufficient
- full user agent when a coarse device class is enough
- saved article IDs or reading history unless separately justified and disclosed

Suggested safe event properties:

- event name from a reviewed enum
- app version and build number
- platform and coarse OS major version
- coarse screen class
- feature flag state
- success/failure category without stack, URL, or payload

## Retention principles

- collect only what is necessary
- define deletion dates before collection begins
- use shorter retention for raw events and longer retention only for aggregated statistics
- delete or irreversibly aggregate data when the purpose ends
- document legal retention exceptions
- test deletion and backup expiry
- remove access for former staff immediately

## Data-flow change procedure

1. Open a privacy-impact change request.
2. Update this inventory.
3. Review source code, SDK behavior, backend logging, and support workflow.
4. Update privacy policy and App Store privacy answers.
5. Add or update consent UX.
6. Validate native privacy manifests and required-reason APIs.
7. Obtain product, engineering, privacy/legal, and security approval.
8. Release behind a disabled-by-default feature flag.
9. Verify production telemetry contains only approved fields.
