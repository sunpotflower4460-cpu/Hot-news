# App Store Submission Checklist

Re-check Apple's current documentation immediately before submission.

## App information

- [ ] Final app name and subtitle
- [ ] Description and promotional text describe only working features
- [ ] Keywords, categories, age rating, and copyright are final
- [ ] Public support URL is live
- [ ] Public privacy policy URL is live
- [ ] Optional privacy choices URL is live
- [ ] App Review contact information is current
- [ ] Review notes explain the editorial model and any required test path

## Privacy

- [ ] App Store privacy answers match the final binary and every third-party SDK
- [ ] Collected data, purpose, identity linkage, and tracking are declared accurately
- [ ] Consent is obtained before optional analytics or diagnostics begin
- [ ] Retention, deletion, and consent withdrawal are explained
- [ ] The final iOS target contains a valid privacy manifest
- [ ] Xcode's privacy report has been reviewed

Apple requires a privacy policy URL for iOS apps and requires data-handling disclosures for new apps and updates. Third-party SDK behavior must be included.

## Accounts

If account creation is added:

- [ ] Account deletion can be initiated inside the app
- [ ] Deletion removes the account and associated data not legally required to be retained
- [ ] Deactivation is not presented as deletion
- [ ] Subscription billing is explained separately from account deletion
- [ ] Export, access, and deletion support procedures are documented

## Subscriptions

Do not show the premium purchase flow until:

- [ ] StoreKit purchase and restore are implemented
- [ ] Transactions are verified on a trusted server
- [ ] Entitlements synchronize across supported devices
- [ ] Expiration, revocation, refund, grace period, and billing retry are handled
- [ ] Price, period, auto-renewal, cancellation, and trial conditions are shown before purchase
- [ ] A manage-subscription path is available
- [ ] The subscription provides ongoing value

## Review notes

Explain that Hot News:

- selects events whose central premise is positive
- does not soften tragic or fear-based stories into inspirational content
- applies a publication gate for brightness, emotional safety, source reliability, dark-context ratio, and rights
- links every article to its source
- may publish a normal version, safe short version, or source-link-only version
- provides in-app privacy choices and deletion of device-local data

## Screenshot sequence

1. Home and heart-weather greeting
2. Lead bright-news story
3. Article source and editorial explanation
4. Category discovery
5. Bedtime mode
6. Favorites
7. Privacy choices

Use production content only. Remove prototype labels, fictional sources, unsupported feature claims, and placeholder contact details.

## Final command gate

```bash
npm ci
npm run check
COMMERCIAL_RELEASE=1 npm run commercial:check
```

The release candidate must also pass real-device, VoiceOver, installed-PWA, offline, source-link, and App Store purchase tests where applicable.
