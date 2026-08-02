import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const strict = process.env.COMMERCIAL_RELEASE === '1';
const configPath = resolve(root, 'src/config/commercial.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const failures = [];
const warnings = [];

const read = (path) => readFile(resolve(root, path), 'utf8');
const fileExists = (path) =>
  read(path)
    .then(() => true)
    .catch(() => false);

const requireText = (value, label) => {
  if (typeof value !== 'string' || value.trim().length === 0) failures.push(`${label} is required`);
};

const requireHttps = (value, label) => {
  requireText(value, label);
  if (typeof value === 'string' && value && !value.startsWith('https://')) {
    failures.push(`${label} must use https://`);
  }
};

const requireInternalRoute = (value, label) => {
  requireText(value, label);
  if (typeof value === 'string' && value && !/^\/[a-z0-9/_-]*$/i.test(value)) {
    failures.push(`${label} must be an internal route beginning with /`);
  }
};

const versionParts = (range) => {
  const match = String(range ?? '').match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : null;
};

const atLeast = (actual, required) => {
  for (let index = 0; index < required.length; index += 1) {
    if (actual[index] > required[index]) return true;
    if (actual[index] < required[index]) return false;
  }
  return true;
};

if (config.releaseStage !== 'production') failures.push('releaseStage must be production');
requireText(config.app?.bundleId, 'app.bundleId');
requireHttps(config.app?.publicBaseUrl, 'app.publicBaseUrl');
requireText(config.operator?.legalName, 'operator.legalName');
requireText(config.operator?.representative, 'operator.representative');
requireText(config.operator?.postalAddress, 'operator.postalAddress');
requireText(config.operator?.contactEmail, 'operator.contactEmail');
requireText(config.legal?.privacyEffectiveDate, 'legal.privacyEffectiveDate');
requireText(config.legal?.termsEffectiveDate, 'legal.termsEffectiveDate');

for (const [key, value] of Object.entries(config.urls ?? {})) {
  requireInternalRoute(value, `urls.${key}`);
}

if (config.features?.subscriptions) {
  requireText(config.operator?.phone, 'operator.phone when subscriptions are enabled');
}

if (config.app?.bundleId && !/^[A-Za-z0-9]+(?:[.-][A-Za-z0-9]+)+$/.test(config.app.bundleId)) {
  failures.push('app.bundleId is not a valid reverse-domain style identifier');
}
if (
  config.operator?.contactEmail &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.operator.contactEmail)
) {
  failures.push('operator.contactEmail is not a valid email address');
}

if (config.features?.mockContent) failures.push('features.mockContent must be false');
if (!config.features?.realNewsApi) failures.push('features.realNewsApi must be true');
if (config.integrations?.contentApi === 'mock')
  failures.push('integrations.contentApi must not be mock');

const integrationChecks = [
  ['analytics', 'analyticsProvider'],
  ['diagnostics', 'diagnosticsProvider'],
  ['subscriptions', 'billingProvider'],
  ['pushNotifications', 'notificationProvider'],
];

for (const [feature, provider] of integrationChecks) {
  if (
    config.features?.[feature] &&
    (!config.integrations?.[provider] || config.integrations[provider] === 'none')
  ) {
    failures.push(`features.${feature} is enabled but integrations.${provider} is not configured`);
  }
}

const nextVersion = versionParts(packageJson.dependencies?.next);
const nextIsSupported =
  nextVersion &&
  ((nextVersion[0] === 15 && atLeast(nextVersion, [15, 5, 21])) ||
    (nextVersion[0] === 16 && atLeast(nextVersion, [16, 2, 11])) ||
    nextVersion[0] > 16);
if (!nextIsSupported) {
  failures.push(
    'Next.js must be upgraded to a currently supported security baseline before release',
  );
}

const selectors = await read('src/lib/data/selectors.ts').catch(() => '');
if (/[@/]mock\/articles/.test(selectors) || /\bARTICLES\b/.test(selectors)) {
  failures.push('reader selectors still load the fictional mock corpus');
}

const articleRoute = await read('src/app/(app)/article/[id]/page.tsx').catch(() => '');
if (/[@/]mock\/articles/.test(articleRoute) || /generateStaticParams/.test(articleRoute)) {
  failures.push('article routes still depend on build-time mock static parameters');
}

const nativeRequired = [
  'ios/App/App.xcodeproj/project.pbxproj',
  'ios/App/App/PrivacyInfo.xcprivacy',
  'ios/App/App/Assets.xcassets/AppIcon.appiconset/Contents.json',
];
for (const path of nativeRequired) {
  if (!(await fileExists(path))) failures.push(`native release artifact is missing: ${path}`);
}

if (config.features?.subscriptions) {
  const billingEvidence = ['src/lib/native/purchases.ts', 'server/billing/README.md'];
  for (const path of billingEvidence) {
    if (!(await fileExists(path)))
      failures.push(`subscription release evidence is missing: ${path}`);
  }
}

if (config.features?.pushNotifications) {
  const notificationEvidence = [
    'src/lib/native/notifications.ts',
    'server/notifications/README.md',
  ];
  for (const path of notificationEvidence) {
    if (!(await fileExists(path)))
      failures.push(`notification release evidence is missing: ${path}`);
  }
}

const robots = await read('public/robots.txt').catch(() => '');
if (/Disallow:\s*\/$/m.test(robots)) {
  failures.push('public/robots.txt still blocks the entire production site');
}

const requiredFiles = [
  'SECURITY.md',
  'docs/COMMERCIAL_RELEASE_CHECKLIST.md',
  'docs/APP_STORE_SUBMISSION.md',
  'docs/APP_STORE_METADATA_JA.md',
  'docs/DATA_INVENTORY.md',
  'docs/CONTENT_OPERATIONS.md',
  'docs/INCIDENT_RESPONSE.md',
  'docs/PRODUCTION_ARCHITECTURE.md',
  'ios-template/PrivacyInfo.xcprivacy',
  'public/.well-known/security.txt',
  'src/app/(app)/legal/privacy/page.tsx',
  'src/app/(app)/legal/terms/page.tsx',
  'src/app/(app)/legal/commerce/page.tsx',
  'src/app/(app)/legal/editorial-policy/page.tsx',
  'src/app/(app)/legal/accessibility/page.tsx',
  'src/app/(app)/support/page.tsx',
  'src/app/(app)/settings/privacy/page.tsx',
];

for (const path of requiredFiles) {
  if (!(await fileExists(path))) failures.push(`required commercial file is missing: ${path}`);
}

if (!strict) {
  warnings.push(...failures);
  console.log('Commercial readiness preview');
  console.log(`Stage: ${config.releaseStage}`);
  console.log(`Outstanding blockers: ${warnings.length}`);
  for (const item of warnings) console.log(`- ${item}`);
  console.log('\nRun COMMERCIAL_RELEASE=1 npm run commercial:check to enforce release blockers.');
  process.exit(0);
}

if (failures.length > 0) {
  console.error(`Commercial release check failed with ${failures.length} blocker(s):`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log('Commercial release check passed.');
