# iOS Target Preparation

This directory contains starting material only. It is not a complete Capacitor or Xcode project.

## Privacy manifest

`PrivacyInfo.xcprivacy` currently declares:

- no tracking
- no tracking domains
- no collected data
- no required-reason APIs

That declaration matches the current static preview only. It will become inaccurate as soon as the native target, Capacitor plugins, analytics, diagnostics, notifications, billing, accounts, or other SDKs introduce data collection or required-reason APIs.

Before App Store submission:

1. Add the file to the final application target resources.
2. Inspect every linked SDK and plugin.
3. Generate Xcode's privacy report.
4. Add all required-reason API categories and approved reasons.
5. Add collected-data declarations that match actual production behavior.
6. Validate the archive in App Store Connect.
7. Ensure App Store privacy answers and the public policy match the binary.

An invalid or incomplete privacy manifest can block submission.

## Native project checklist

- final bundle ID from `src/config/commercial.json`
- signing team and provisioning
- release and staging schemes
- version/build-number automation
- app icons in all required raster sizes
- launch screen and dark appearance
- universal/deep links
- minimal entitlements
- network security configuration
- push notification capability only when implemented
- StoreKit capability only when implemented
- privacy manifest
- crash symbol upload only to an approved diagnostics provider
- accessibility labels and Dynamic Type checks
- VoiceOver and reduced-motion device testing
- offline and poor-network testing

## Capacitor boundary

The bundled web application must not contain trusted secrets or publication authority. Native plugins should be wrapped behind small interfaces so the web UI can run without them in browser preview and so permissions are requested only immediately before a feature needs them.

Recommended native interfaces:

- `NotificationsBridge`
- `PurchasesBridge`
- `SecureStorageBridge`
- `AppLinksBridge`
- `ShareBridge`
- `HapticsBridge`

Do not add camera, microphone, location, contacts, or tracking permissions unless a concrete product requirement, privacy review, and user-facing explanation exist.
