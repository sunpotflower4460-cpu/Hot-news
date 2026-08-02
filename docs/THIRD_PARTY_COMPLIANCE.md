# Third-Party Software Compliance

Commercial releases must maintain an accurate inventory of open-source packages, native SDKs, hosted services, fonts, icons, and content licenses.

## Before each release

1. Generate an SBOM from the locked production dependency graph.
2. Review direct and transitive licenses.
3. Identify attribution, notice, source-offer, modification, and redistribution obligations.
4. Review native CocoaPods, Swift Packages, Capacitor plugins, and embedded frameworks separately.
5. Review font and icon licenses, including modification and trademark restrictions.
6. Confirm no package uses a license incompatible with the intended distribution model.
7. Produce the third-party notices shown in-app or bundled with the binary where required.
8. Archive the exact notice file with the release build.

## Current direct package families

The repository currently uses packages from the Next.js, React, Framer Motion, Lucide, Zustand, Tailwind CSS, TypeScript, ESLint, Prettier, PostCSS, and related ecosystems.

Do not treat this paragraph as the final notice list. Versions and transitive dependencies must be derived from `package-lock.json` for each release.

## Review rules

- Do not copy license text from memory.
- Use the license files from the exact resolved package versions.
- Flag GPL/AGPL/SSPL, non-commercial, source-available, custom, unknown, or missing licenses for specialist review.
- Confirm hosted-service terms separately from software licenses.
- Confirm source-content and image rights separately from code licenses.
- Store evidence of commercial font and asset licenses.
- Re-run the review whenever a dependency, plugin, SDK, font, icon set, or content provider changes.

## Recommended release artifacts

- CycloneDX SBOM
- third-party notice text
- license review summary
- vulnerability audit result
- dependency diff from the previous release
- list of third-party data processors
- list of third-party domains contacted by the binary

The scheduled GitHub workflow generates an SBOM and audits production npm dependencies. Native dependencies must be added after the iOS project exists.
