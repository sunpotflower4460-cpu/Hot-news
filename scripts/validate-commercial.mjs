import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const strict = process.env.COMMERCIAL_RELEASE === '1';
const configPath = resolve(root, 'src/config/commercial.json');
const config = JSON.parse(await readFile(configPath, 'utf8'));
const failures = [];
const warnings = [];

const requireText = (value, label) => {
  if (typeof value !== 'string' || value.trim().length === 0) failures.push(`${label} is required`);
};

const requireHttps = (value, label) => {
  requireText(value, label);
  if (typeof value === 'string' && value && !value.startsWith('https://')) {
    failures.push(`${label} must use https://`);
  }
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

if (config.features?.mockContent) failures.push('features.mockContent must be false');
if (!config.features?.realNewsApi) failures.push('features.realNewsApi must be true');
if (config.integrations?.contentApi === 'mock') failures.push('integrations.contentApi must not be mock');

const integrationChecks = [
  ['analytics', 'analyticsProvider'],
  ['diagnostics', 'diagnosticsProvider'],
  ['subscriptions', 'billingProvider'],
  ['pushNotifications', 'notificationProvider'],
];

for (const [feature, provider] of integrationChecks) {
  if (config.features?.[feature] && (!config.integrations?.[provider] || config.integrations[provider] === 'none')) {
    failures.push(`features.${feature} is enabled but integrations.${provider} is not configured`);
  }
}

const robots = await readFile(resolve(root, 'public/robots.txt'), 'utf8').catch(() => '');
if (/Disallow:\s*\/$/m.test(robots)) failures.push('public/robots.txt still blocks the entire production site');

const requiredFiles = [
  'SECURITY.md',
  'docs/COMMERCIAL_RELEASE_CHECKLIST.md',
  'docs/APP_STORE_SUBMISSION.md',
  'src/app/(app)/legal/privacy/page.tsx',
  'src/app/(app)/legal/terms/page.tsx',
  'src/app/(app)/support/page.tsx',
  'src/app/(app)/settings/privacy/page.tsx',
];

for (const path of requiredFiles) {
  const exists = await readFile(resolve(root, path), 'utf8').then(() => true).catch(() => false);
  if (!exists) failures.push(`required commercial file is missing: ${path}`);
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
