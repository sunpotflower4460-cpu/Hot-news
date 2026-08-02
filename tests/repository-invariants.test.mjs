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

test('supported Node.js LTS is pinned consistently', async () => {
  const nvmrc = (await read('.nvmrc')).trim();
  const packageJson = JSON.parse(await read('package.json'));
  assert.equal(nvmrc, '24');
  assert.equal(packageJson.engines.node, '>=24 <25');
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

  const settings = await read('src/lib/store/useSettingsStore.ts');
  assert.match(settings, /morningNotify: false/);
  assert.match(settings, /nightNotify: false/);
  assert.match(settings, /weeklyDigest: false/);

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

test('core mobile ux keeps explicit navigation and safe-area spacing', async () => {
  const navigation = await read('src/components/layout/BottomTabBar.tsx');
  assert.match(navigation, /label: 'テーマ'/);
  assert.match(navigation, /label: '保存'/);
  assert.match(navigation, /Icon: Bookmark/);
  assert.match(navigation, /label: '週まとめ'/);

  const onboarding = await read('src/components/onboarding/OnboardingCarousel.tsx');
  assert.match(onboarding, /明るい出来事だけを、1日3件/);
  assert.match(onboarding, /短く読めて、出典も確認できます/);
  assert.match(onboarding, /戻る/);
  assert.match(onboarding, /次へ/);
  assert.match(onboarding, /h-10 w-10/);

  const screenHeader = await read('src/components/layout/ScreenHeader.tsx');
  assert.match(screenHeader, /sticky top-0/);

  const polish = await read('src/app/ux-polish.css');
  assert.match(polish, /calc\(1\.25rem \+ env\(safe-area-inset-top\)\)/);
  assert.match(polish, /calc\(0\.5rem \+ env\(safe-area-inset-bottom\)\)/);
});

test('daily experience is finite, optional, and records history locally', async () => {
  const progress = await read('src/components/home/TodayReadingProgress.tsx');
  assert.match(progress, /今日の3選はここまでです/);
  assert.match(progress, /ここで閉じても大丈夫です/);
  assert.doesNotMatch(progress, /連続/);

  const hint = await read('src/components/home/HomeUsageHint.tsx');
  assert.match(hint, /30秒の要点/);
  assert.match(hint, /ブックマーク/);

  const readingStore = await read('src/lib/store/useReadingStore.ts');
  assert.match(readingStore, /MAX_ENTRIES = 50/);
  assert.match(readingStore, /MAX_AGE_MS = 30/);
  assert.match(readingStore, /name: 'hotnews-reading'/);

  const article = await read('src/app/(app)/article/[id]/page.tsx');
  assert.match(article, /ArticleReadTracker/);
});

test('saved and recent reading actions use unambiguous bookmark language', async () => {
  const saveButton = await read('src/components/favorites/SaveButton.tsx');
  assert.match(saveButton, /Bookmark/);
  assert.match(saveButton, /あとで読むために保存/);
  assert.doesNotMatch(saveButton, /Heart/);

  const favorites = await read('src/app/(app)/favorites/page.tsx');
  assert.match(favorites, /最近読んだニュース/);
  assert.match(favorites, /最大50件|30日/);
});

test('discovery supports user goals as well as editorial categories', async () => {
  const browse = await read('src/app/(app)/browse/page.tsx');
  assert.match(browse, /30秒で読みたい/);
  assert.match(browse, /ほっとしたい/);
  assert.match(browse, /未来を感じたい/);
  assert.match(browse, /子どもと話したい/);
  assert.match(browse, /寝る前に1件/);
});

test('article reading flow exposes summary, source context, sharing, and progressive trust', async () => {
  const article = await read('src/app/(app)/article/[id]/page.tsx');
  assert.match(article, /30秒でわかる要点/);
  assert.match(article, /外部サイトが新しい画面で開きます/);
  assert.match(article, /記事を読む/);

  const trust = await read('src/components/article/ArticleTrustPanel.tsx');
  assert.match(trust, /<details>/);
  assert.match(trust, /確認情報と編集履歴/);
  assert.match(trust, /disclosure-summary/);
  assert.match(trust, /ShareArticleButton/);

  const share = await read('src/components/article/ShareArticleButton.tsx');
  assert.match(share, /navigator\.share/);
  assert.match(share, /navigator\.clipboard\.writeText/);
});

test('offline and privacy explanations disclose local freshness and retention', async () => {
  const network = await read('src/components/pwa/NetworkStatus.tsx');
  assert.match(network, /最後の接続/);
  assert.match(network, /hotnews-last-online/);

  const privacy = await read('src/app/(app)/legal/privacy/page.tsx');
  assert.match(privacy, /最大50件、最長30日/);
  assert.match(privacy, /閲覧履歴の外部送信は行っていません/);
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
