'use client';

import Link from 'next/link';
import { Baby, ChevronRight, Clock3, HeartHandshake, Moon, Rocket, Sparkles } from 'lucide-react';
import { CategoryCard } from '@/components/category/CategoryCard';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import type { TranslationKey } from '@/lib/i18n/messages';
import { useI18n } from '@/lib/i18n/useI18n';
import type { CategoryMeta } from '@/types/article';

const PURPOSES: {
  href: string;
  labelKey: TranslationKey;
  description: { ja: string; en: string };
  Icon: typeof Clock3;
}[] = [
  {
    href: '/home',
    labelKey: 'browse.quick',
    description: { ja: '今日の3選から、要点だけ', en: "Start with the key points from today's three" },
    Icon: Clock3,
  },
  {
    href: '/browse/kindness',
    labelKey: 'browse.calm',
    description: { ja: '人のやさしさに触れる話', en: 'Stories shaped by human kindness' },
    Icon: HeartHandshake,
  },
  {
    href: '/browse/bright-tech',
    labelKey: 'browse.future',
    description: { ja: '暮らしを良くする技術', en: 'Technology that improves everyday life' },
    Icon: Rocket,
  },
  {
    href: '/browse/animals-nature',
    labelKey: 'browse.family',
    description: { ja: '動物や自然の明るい話', en: 'Bright stories about animals and nature' },
    Icon: Baby,
  },
  {
    href: '/night',
    labelKey: 'browse.bedtime',
    description: { ja: '短く静かなニュースだけ', en: 'Only short and quiet stories' },
    Icon: Moon,
  },
];

export function BrowseContent({
  categories,
  counts,
}: {
  categories: CategoryMeta[];
  counts: number[];
}) {
  const { locale, t, formatNumber } = useI18n();
  const total = counts.reduce((sum, count) => sum + count, 0);

  return (
    <div className="pb-10">
      <ScreenHeader title={t('browse.title')} subtitle={t('browse.subtitle')} />

      <div className="space-y-6 px-5 pt-1">
        <section
          aria-label={locale === 'ja' ? '掲載内容について' : 'About published stories'}
          className="rounded-card border border-white/40 bg-accent-soft/50 px-4 py-3.5 shadow-inner-light backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-accent">
            <Sparkles aria-hidden size={15} />
            <p className="text-caption font-bold">{t('browse.brightOnly')}</p>
          </div>
          <p className="mt-1 text-caption leading-relaxed text-muted">
            {locale === 'ja'
              ? `現在、${formatNumber(total)}件の掲載基準を満たしたニュースがあります。`
              : `${formatNumber(total)} stories currently meet the publication standard.`}
          </p>
        </section>

        <section aria-labelledby="purpose-heading" className="space-y-3">
          <div className="px-1">
            <p className="text-[0.72rem] font-bold tracking-[0.08em] text-accent">
              {t('browse.purposeLabel')}
            </p>
            <h2 id="purpose-heading" className="mt-1 text-h2 font-bold text-text">
              {t('browse.purposeTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {PURPOSES.map(({ href, labelKey, description, Icon }, index) => (
              <Link
                key={href}
                href={href}
                className={
                  index === PURPOSES.length - 1
                    ? 'soft-surface float-card col-span-2 flex min-h-[5.6rem] items-center gap-3 rounded-card px-4 py-3 shadow-soft'
                    : 'soft-surface float-card min-h-[7.6rem] rounded-card p-3.5 shadow-soft'
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
                  <Icon aria-hidden size={18} />
                </span>
                <span className={index === PURPOSES.length - 1 ? 'min-w-0 flex-1' : 'mt-3 block'}>
                  <span className="block text-body font-bold text-text">{t(labelKey)}</span>
                  <span className="mt-0.5 block text-caption leading-relaxed text-muted">
                    {description[locale]}
                  </span>
                </span>
                {index === PURPOSES.length - 1 && (
                  <ChevronRight aria-hidden size={18} className="shrink-0 text-accent" />
                )}
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="category-list-heading" className="space-y-3">
          <div className="flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[0.72rem] font-bold tracking-[0.08em] text-accent">
                {t('browse.categoriesLabel')}
              </p>
              <h2 id="category-list-heading" className="mt-1 text-h2 font-bold text-text">
                {t('browse.categoriesTitle')}
              </h2>
            </div>
            <span className="rounded-pill bg-surface/60 px-3 py-1.5 text-[0.7rem] font-semibold text-muted shadow-inner-light">
              {locale === 'ja'
                ? `${categories.length}テーマ`
                : `${categories.length} topics`}
            </span>
          </div>

          <div className="space-y-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} count={counts[index]} />
            ))}
          </div>
        </section>

        <Link
          href="/home"
          className="glass flex min-h-[4.5rem] items-center gap-3 rounded-card border px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
            <Sparkles aria-hidden size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-body font-bold text-text">{t('browse.fallbackTitle')}</span>
            <span className="mt-0.5 block text-caption text-muted">
              {t('browse.fallbackBody')}
            </span>
          </span>
          <ChevronRight aria-hidden size={18} className="shrink-0 text-accent" />
        </Link>
      </div>
    </div>
  );
}
