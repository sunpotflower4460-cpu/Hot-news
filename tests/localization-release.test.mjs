import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(path, 'utf8');

test('supported locales are explicit and require commercial review', async () => {
  const config = JSON.parse(await read('src/config/commercial.json'));
  assert.equal(config.localization.defaultLocale, 'ja');
  assert.deepEqual(config.localization.supportedLocales, ['ja', 'en']);
  assert.ok(Array.isArray(config.localization.reviewedReleaseLocales));

  const validator = await read('scripts/validate-commercial.mjs');
  assert.match(validator, /localization\.reviewedReleaseLocales must include/);
  assert.match(validator, /docs\/APP_STORE_METADATA_EN\.md/);

  const metadata = await read('docs/APP_STORE_METADATA_EN.md');
  assert.match(metadata, /English Draft/);
  assert.match(metadata, /specialist review/i);
});
