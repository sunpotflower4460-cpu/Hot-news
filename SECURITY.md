# Security Policy

## Supported versions

Security fixes are applied to:

- the latest commit on `main`
- the latest App Store version once the native app is released

Older preview builds and abandoned branches are not guaranteed to receive fixes.

## Reporting a vulnerability

Please do **not** open a public issue for a vulnerability that could expose user data, bypass editorial controls, alter billing, execute code, reveal secrets, or disrupt the service.

Use GitHub's private security advisory flow:

https://github.com/sunpotflower4460-cpu/Hot-news/security/advisories/new

Include, where possible:

- affected page, version, or commit
- reproduction steps
- expected and actual behavior
- impact and realistic abuse scenario
- screenshots or a minimal proof of concept
- whether the issue is already being exploited

Do not include real personal information, access tokens, private article material, or destructive payloads.

## Response targets

These are operational targets, not guaranteed service levels:

- acknowledgement: within 3 business days
- initial severity assessment: within 7 business days
- critical containment: as soon as reasonably possible
- coordinated disclosure: after a fix or mitigation is available

## Safe harbor

Good-faith research that avoids privacy invasion, service disruption, social engineering, data destruction, and unnecessary access will be handled constructively. Stop testing and report immediately if you encounter personal data, credentials, payment information, unpublished editorial material, or a way to affect other users.

## Scope priorities

High-priority reports include:

- exposure of user or support data
- bypass of article quarantine, retraction, or publication gates
- unauthorized access to editorial or admin functions
- subscription or receipt validation bypasses
- cross-site scripting or code execution
- secret leakage in builds, logs, or CI
- cache behavior that keeps retracted content publicly accessible
- vulnerabilities in the future ingestion and AI editorial pipeline
