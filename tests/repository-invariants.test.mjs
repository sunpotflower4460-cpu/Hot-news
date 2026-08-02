import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path) => readFile(resolve(root, path), 'utf8');

const exists = async (path) => {
  try {
    await read(path);
    return true;
  } catch {
    return false;
  }
};

test('commercial configuration has a valid stage and integration consistency', async () => {
  const config = JSON.parse(await read('src/config/commercial.json'));
  assert.ok(['preview', 'production'].includes(config.releaseStage));

  if (config.features.mockContent) {
    assert.equal(config.integrations.contentApi, 'mock');
  }

  const pairs = [
    ['analytics', 'analyticsProvider'],
    ['diagnostics', 'diagnosticsProvider'],
    ['subscriptions', 'billingProvider'],
    ['pushNotifications', 'notificationProvider'],
  ];

  for (const [feature, provider] of pairs) {
    if (config.features[feature]) assert.notEqual(config.integrations[provider], 'none');
  }
});

test('reader-facing selectors retain the central publication gate', async () => {
  const selectors = await read('src/lib/data/selectors.ts');
  assert.match(selectors, /isArticleEligibleForPublication/);
  assert.match(selectors, /eligibleArticles/);

  const favorites = await read('src/app/(app)/favorites/page.tsx');
  assert.match(favorites, /isArticleEligibleForPublication/);

  const article = await read('src/app/(app)/article/[id]/page.tsx');
  assert.match(article, /source_link_only/);
  assert.match(article, /safe_short/);
  assert.match(article, /ArticleTrustPanel/);
});

test('publication gate requires safe sources, assessment, and provenance for real articles', async () => {
  const policy = await read('src/lib/editorial/policy.ts');
  assert.match(policy, /isSafeSourceUrl/);
  assert.match(policy, /url\.protocol === 'https:'/);
  assert.match(policy, /isAssessmentApproved/);
  assert.match(policy, /isProvenanceComplete/);
  assert.match(policy, /correctionStatus !== 'RETRACTED'/);
});

test('commercial legal and support routes exist', async () => {
  const required = [
    'src/app/(app)/legal/privacy/page.tsx',
    'src/app/(app)/legal/terms/page.tsx',
    'src/app/(app)/legal/commerce/page.tsx',
    'src/app/(app)/legal/editorial-policy/page.tsx',
    'src/app/(app)/legal/accessibility/page.tsx',
    'src/app/(app)/settings/privacy/page.tsx',
    'src/app/(app)/support/page.tsx',
  ];

  for (const path of required) assert.equal(await exists(path), true, path);
});

test('privacy and diagnostics are deny-by-default and feature gated', async () => {
  const privacy = await read('src/lib/store/usePrivacyStore.ts');
  assert.match(privacy, /analytics: 'denied'/);
  assert.match(privacy, /diagnostics: 'denied'/);

  const telemetry = await read('src/lib/telemetry/client.ts');
  assert.match(telemetry, /commercialConfig\.features\.analytics/);
  assert.match(telemetry, /analytics !== 'allowed'/);
  assert.match(telemetry, /commercialConfig\.features\.diagnostics/);
  assert.match(telemetry, /diagnostics !== 'allowed'/);
});

test('preview indexing state matches robots.txt', async () => {
  const config = JSON.parse(await read('src/config/commercial.json'));
  const robots = await read('public/robots.txt');

  if (config.releaseStage === 'preview') {
    assert.match(robots, /Disallow:\s*\//);
  } else {
    assert.doesNotMatch(robots, /Disallow:\s*\/$/m);
  }
});

test('static hosting headers contain baseline browser protections', async () => {
  const headers = await read('public/_headers');
  assert.match(headers, /X-Content-Type-Options:\s*nosniff/);
  assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /object-src 'none'/);
  assert.match(headers, /geolocation=\(\)/);
  assert.match(headers, /Referrer-Policy:\s*no-referrer/);
});

test('manifest includes commercial identity and useful shortcuts', async () => {
  const manifest = JSON.parse(await read('public/manifest.webmanifest'));
  assert.equal(manifest.lang, 'ja');
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  const shortcutUrls = new Set((manifest.shortcuts ?? []).map((shortcut) => shortcut.url));
  assert.ok(shortcutUrls.has('/home'));
  assert.ok(shortcutUrls.has('/favorites'));
  assert.ok(shortcutUrls.has('/night'));
});

test('native privacy manifest starts with tracking and collection disabled', async () => {
  const manifest = await read('ios-template/PrivacyInfo.xcprivacy');
  assert.match(manifest, /<key>NSPrivacyTracking<\/key>\s*<false\/>/);
  assert.match(manifest, /<key>NSPrivacyCollectedDataTypes<\/key>\s*<array\/>/);
});

test('commercial operations and incident documents exist', async () => {
  const required = [
    'docs/COMMERCIAL_RELEASE_CHECKLIST.md',
    'docs/APP_STORE_SUBMISSION.md',
    'docs/APP_STORE_METADATA_JA.md',
    'docs/DATA_INVENTORY.md',
    'docs/CONTENT_OPERATIONS.md',
    'docs/INCIDENT_RESPONSE.md',
    'docs/PRODUCTION_ARCHITECTURE.md',
    'SECURITY.md',
  ];

  for (const path of required) assert.equal(await exists(path), true, path);
});

test('quality command includes tests and commercial validation', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.match(packageJson.scripts.check, /commercial:check/);
  assert.match(packageJson.scripts.check, /npm test/);
  assert.match(packageJson.scripts['release:check'], /COMMERCIAL_RELEASE=1/);
});
