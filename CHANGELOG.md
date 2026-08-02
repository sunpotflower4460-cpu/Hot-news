# Changelog

All notable product, editorial, privacy, security, and operational changes are recorded here.

The project follows semantic versioning once commercial releases begin.

## Unreleased

### Added

- enforceable bright-news editorial assessment and publication gate
- article provenance, AI-assistance, fact-check, verification, and correction metadata
- soft time-of-day UI system and complete reader journey redesign
- loading, empty, error, 404, offline, and unavailable-feature states
- privacy choices and complete device-local data deletion
- privacy policy, terms, commerce disclosure, editorial policy, and accessibility statement
- support and article-correction reporting paths
- PWA offline shell and conservative cache handling
- commercial configuration and strict release-readiness validator
- CI, CodeQL, dependency review, scheduled audit, and SBOM generation
- security disclosure policy and browser security headers
- App Store, data inventory, editorial operations, incident response, and production architecture documentation
- dependency-free repository invariant tests

### Changed

- product language now centers genuine bright events rather than generalized comfort
- reader-facing selectors consistently filter through the publication gate
- article publication modes now control body rendering
- notification and premium routes are hidden or blocked when unavailable in production
- metadata and indexing behavior now follow commercial release stage
- error diagnostics require both a feature flag and explicit user consent

### Security

- unsafe source protocols, credential-bearing URLs, localhost sources, malformed dates, and retracted provenance are rejected from publication
- production release is blocked on an outdated Next.js security baseline
- preview mock content is blocked from search indexing

## 0.1.0 — Development preview

- initial static Next.js UI shell with fictional news data
