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

const extractQuotedKeys = (source) =>
  [...source.matchAll(/^\s*'([^']+)':/gm)].map((match) => match[1]);

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

  const articlePage = await read('src/app/(app)/article/[id]/page.tsx');
  assert.match(articlePage, /getArticleById/);
  assert.match(articlePage, /ArticleDetailContent/);

  const detail = await read('src/components/article/ArticleDetailContent.tsx');
  assert.match(detail, /source_link_only/);
  assert.match(detail, /safe_short/);
  assert.match(detail, /ArticleTrustPanel/);
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

test('privacy, diagnostics, and notifications are deny-by-default', async () => {
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
  assert.equal(manifest.display, 'standalone');
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0);

  const shortcutUrls = new Set((manifest.shortcuts ?? []).map((shortcut) => shortcut.url));
  assert.ok(shortcutUrls.has('/home'));
  assert.ok(shortcutUrls.has('/favorites'));
  assert.ok(shortcutUrls.has('/night'));
});

test('Japanese and English dictionaries contain identical keys', async () => {
  const source = await read('src/lib/i18n/messages.ts');
  const ja = source.match(/ja:\s*\{([\s\S]*?)\n  \},\n  en:/)?.[1];
  const en = source.match(/en:\s*\{([\s\S]*?)\n  \},\n\} as const/)?.[1];
  assert.ok(ja, 'Japanese dictionary block is missing');
  assert.ok(en, 'English dictionary block is missing');
  assert.deepEqual(extractQuotedKeys(en).sort(), extractQuotedKeys(ja).sort());
});

test('language preference persists and is applied before hydration', async () => {
  const store = await read('src/lib/store/useLocaleStore.ts');
  assert.match(store, /locale: 'ja'/);
  assert.match(store, /name: 'hotnews-locale'/);
  assert.match(store, /value === 'ja' \|\| value === 'en'/);

  const layout = await read('src/app/layout.tsx');
  assert.match(layout, /hotnews-locale/);
  assert.match(layout, /d\.setAttribute\('lang',locale\)/);
  assert.match(layout, /LocaleProvider/);

  const provider = await read('src/components/i18n/LocaleProvider.tsx');
  assert.match(provider, /root\.lang = locale/);
  assert.match(provider, /document\.title/);
});

test('language switcher is persistent and accessible', async () => {
  const switcher = await read('src/components/i18n/LanguageSwitcher.tsx');
  assert.match(switcher, /role="group"/);
  assert.match(switcher, /aria-pressed/);
  assert.match(switcher, /setLocale/);
  assert.match(switcher, /日本語/);
  assert.match(switcher, /EN/);

  const settings = await read('src/app/(app)/settings/page.tsx');
  assert.match(settings, /LanguageSwitcher/);
  assert.match(settings, /settings\.language/);
});

test('all fictional preview articles have complete English translations', async () => {
  const source = await read('src/lib/i18n/articleTranslations.ts');
  const ids = [...source.matchAll(/^\s*(a\d{2}):\s*\{/gm)].map((match) => match[1]);
  assert.equal(ids.length, 24);
  assert.deepEqual(
    ids.sort(),
    Array.from({ length: 24 }, (_, index) => `a${String(index + 1).padStart(2, '0')}`),
  );
  for (const field of ['title', 'summary', 'body', 'sourceName', 'whyComfort', 'region']) {
    assert.match(source, new RegExp(`${field}:`));
  }
});

test('core reader surfaces use locale-aware content and formatting', async () => {
  const required = [
    'src/components/home/HomeGreeting.tsx',
    'src/components/article/ArticleCard.tsx',
    'src/components/article/HeroCard.tsx',
    'src/components/article/ArticleDetailContent.tsx',
    'src/components/category/BrowseContent.tsx',
    'src/components/category/CategoryPageContent.tsx',
    'src/app/(app)/favorites/page.tsx',
    'src/components/digest/DigestContent.tsx',
    'src/app/(app)/settings/page.tsx',
    'src/app/(app)/settings/privacy/page.tsx',
    'src/app/(app)/support/page.tsx',
  ];

  for (const path of required) {
    const source = await read(path);
    assert.match(source, /useI18n|<T /, path);
  }

  const dates = await read('src/lib/utils/date.ts');
  assert.match(dates, /Intl\.DateTimeFormat/);
  assert.match(dates, /locale === 'ja' \? 'ja-JP' : 'en-US'/);
});

test('core mobile ux keeps explicit navigation and safe-area spacing', async () => {
  const navigation = await read('src/components/layout/BottomTabBar.tsx');
  assert.match(navigation, /nav\.home/);
  assert.match(navigation, /nav\.browse/);
  assert.match(navigation, /nav\.saved/);
  assert.match(navigation, /Icon: Bookmark/);
  assert.match(navigation, /nav\.digest/);

  const onboarding = await read('src/components/onboarding/OnboardingCarousel.tsx');
  assert.match(onboarding, /onboarding\.firstTitle/);
  assert.match(onboarding, /onboarding\.secondTitle/);
  assert.match(onboarding, /LanguageSwitcher/);
  assert.match(onboarding, /h-10 w-10/);

  const screenHeader = await read('src/components/layout/ScreenHeader.tsx');
  assert.match(screenHeader, /sticky top-0/);
  assert.match(screenHeader, /LanguageSwitcher/);

  const polish = await read('src/app/ux-polish.css');
  assert.match(polish, /calc\(1\.25rem \+ env\(safe-area-inset-top\)\)/);
  assert.match(polish, /calc\(0\.5rem \+ env\(safe-area-inset-bottom\)\)/);
});

test('daily experience is finite, optional, and records history locally', async () => {
  const progress = await read('src/components/home/TodayReadingProgress.tsx');
  assert.match(progress, /home\.progressComplete/);
  assert.match(progress, /home\.progressCloseAnytime/);
  assert.doesNotMatch(progress, /streak/i);

  const hint = await read('src/components/home/HomeUsageHint.tsx');
  assert.match(hint, /30-second summary/);
  assert.match(hint, /bookmark/);

  const readingStore = await read('src/lib/store/useReadingStore.ts');
  assert.match(readingStore, /MAX_ENTRIES = 50/);
  assert.match(readingStore, /MAX_AGE_MS = 30/);
  assert.match(readingStore, /name: 'hotnews-reading'/);

  const article = await read('src/components/article/ArticleDetailContent.tsx');
  assert.match(article, /ArticleReadTracker/);
});

test('saved and recent reading actions use unambiguous bookmark language', async () => {
  const saveButton = await read('src/components/favorites/SaveButton.tsx');
  assert.match(saveButton, /Bookmark/);
  assert.match(saveButton, /Save .* for later/);
  assert.doesNotMatch(saveButton, /Heart/);

  const favorites = await read('src/app/(app)/favorites/page.tsx');
  assert.match(favorites, /saved\.tabRecent/);
  assert.match(favorites, /30 days/);
});

test('discovery supports user goals as well as editorial categories', async () => {
  const browse = await read('src/components/category/BrowseContent.tsx');
  assert.match(browse, /browse\.quick/);
  assert.match(browse, /browse\.calm/);
  assert.match(browse, /browse\.future/);
  assert.match(browse, /browse\.family/);
  assert.match(browse, /browse\.bedtime/);
});

test('article reading flow exposes localized summary, source, sharing, and trust', async () => {
  const article = await read('src/components/article/ArticleDetailContent.tsx');
  assert.match(article, /article\.summary/);
  assert.match(article, /article\.sourceOpen/);
  assert.match(article, /article\.body/);
  assert.match(article, /localizeArticle/);

  const trust = await read('src/components/article/ArticleTrustPanel.tsx');
  assert.match(trust, /<details>/);
  assert.match(trust, /article\.trustTitle/);
  assert.match(trust, /disclosure-summary/);
  assert.match(trust, /ShareArticleButton/);

  const share = await read('src/components/article/ShareArticleButton.tsx');
  assert.match(share, /navigator\.share/);
  assert.match(share, /navigator\.clipboard\.writeText/);
});

test('offline and privacy explanations disclose freshness, language, and retention', async () => {
  const network = await read('src/components/pwa/NetworkStatus.tsx');
  assert.match(network, /network\.lastConnected/);
  assert.match(network, /hotnews-last-online/);

  const privacy = await read('src/app/(app)/legal/privacy/page.tsx');
  assert.match(privacy, /最大50件、最長30日/);
  assert.match(privacy, /閲覧履歴の外部送信は行っていません/);

  const inventory = await read('docs/DATA_INVENTORY.md');
  assert.match(inventory, /Language preference/);
  assert.match(inventory, /hotnews-locale|Japanese or English/);

  const offline = await read('public/offline.html');
  assert.match(offline, /You are offline/);
});

test('English legal release remains blocked pending specialist review', async () => {
  const legal = await read('src/components/legal/LegalDocument.tsx');
  assert.match(legal, /Reviewed English legal text is still required/);
  assert.match(legal, /Japanese working draft/);

  const checklist = await read('docs/COMMERCIAL_RELEASE_CHECKLIST.md');
  assert.match(checklist, /Every supported commercial language has specialist-reviewed legal/);
  assert.match(checklist, /English privacy policy, terms, commerce disclosure/);
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
