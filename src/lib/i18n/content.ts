import type { CategoryMeta } from '@/types/article';
import type { Locale, TranslationKey } from './messages';
import { translate } from './messages';

const CATEGORY_KEYS: Record<
  CategoryMeta['id'],
  { label: TranslationKey; blurb: TranslationKey }
> = {
  'animals-nature': { label: 'category.animals', blurb: 'category.animalsBlurb' },
  kindness: { label: 'category.kindness', blurb: 'category.kindnessBlurb' },
  'bright-tech': { label: 'category.tech', blurb: 'category.techBlurb' },
  'arts-culture': { label: 'category.arts', blurb: 'category.artsBlurb' },
  'night-reads': { label: 'category.night', blurb: 'category.nightBlurb' },
};

export function localizeCategory(category: CategoryMeta, locale: Locale): CategoryMeta {
  const keys = CATEGORY_KEYS[category.id];
  return {
    ...category,
    labelJa: translate(locale, keys.label),
    blurb: translate(locale, keys.blurb),
  };
}
