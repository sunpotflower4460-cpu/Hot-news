'use client';

import Link from 'next/link';
import { Bot, BookOpenCheck, ChevronDown, Flag, ShieldCheck } from 'lucide-react';
import { ShareArticleButton } from '@/components/article/ShareArticleButton';
import { localizeArticle } from '@/lib/i18n/articleTranslations';
import { useI18n } from '@/lib/i18n/useI18n';
import type { Article, SourceType } from '@/types/article';
import { formatDate } from '@/lib/utils/date';

const SOURCE_LABELS: Record<SourceType, { ja: string; en: string }> = {
  PRIMARY: { ja: '一次資料', en: 'Primary material' },
  OFFICIAL: { ja: '公式情報', en: 'Official information' },
  INDEPENDENT: { ja: '独立報道', en: 'Independent reporting' },
  SECONDARY: { ja: '二次情報', en: 'Secondary source' },
};

export function ArticleTrustPanel({ article: rawArticle }: { article: Article }) {
  const { locale, t } = useI18n();
  const article = localizeArticle(rawArticle, locale);
  const provenance = article.provenance;
  const sourceLabel = provenance ? SOURCE_LABELS[provenance.sourceType][locale] : '';
  const overview = provenance
    ? locale === 'ja'
      ? `${sourceLabel}を中心に${provenance.sourceCount}件で確認`
      : `Checked against ${provenance.sourceCount} source${provenance.sourceCount === 1 ? '' : 's'}, centered on ${sourceLabel.toLowerCase()}`
    : locale === 'ja'
      ? '商用版では出典・確認履歴を公開します'
      : 'Production articles will include source and review history';

  return (
    <aside className="glass overflow-hidden rounded-card border">
      <details>
        <summary className="disclosure-summary group flex min-h-[4.75rem] cursor-pointer items-center gap-3 px-4 py-3.5 focus-visible:outline-offset-[-3px]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/75 text-accent shadow-inner-light">
            <ShieldCheck aria-hidden size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-body font-bold text-text">{t('article.trustTitle')}</span>
            <span className="mt-0.5 block text-caption leading-snug text-muted">{overview}</span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface/65 text-muted shadow-inner-light">
            <ChevronDown
              aria-hidden
              size={17}
              className="disclosure-chevron transition-transform duration-300"
            />
          </span>
        </summary>

        <div className="border-t border-line/45 px-4 pb-4 pt-4">
          {provenance ? (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <TrustValue label={t('article.sourceType')} value={sourceLabel} />
              <TrustValue
                label={t('article.sourceCount')}
                value={
                  locale === 'ja' ? `${provenance.sourceCount}件` : `${provenance.sourceCount}`
                }
              />
              <TrustValue
                label={t('article.lastVerified')}
                value={formatDate(provenance.lastVerifiedAt, locale)}
              />
              <TrustValue
                label={t('article.editorialReviewed')}
                value={formatDate(provenance.editorialReviewedAt, locale)}
              />
              <TrustValue
                label={t('article.ai')}
                value={provenance.aiAssisted ? t('article.aiUsed') : t('article.aiUnused')}
              />
              <TrustValue
                label={t('article.correction')}
                value={
                  provenance.correctionStatus === 'CORRECTED'
                    ? t('article.corrected')
                    : t('article.notCorrected')
                }
              />
            </dl>
          ) : (
            <div className="rounded-card bg-accent-soft/45 px-4 py-3">
              <p className="text-caption leading-relaxed text-muted">
                {locale === 'ja'
                  ? 'この画面は架空データによる表示確認です。商用公開する実ニュースには、出典数、AI補助、事実確認、編集確認、訂正状態を必須で記録します。'
                  : 'This screen uses fictional preview data. Production news must record source count, AI assistance, fact checking, editorial review, and correction status.'}
              </p>
            </div>
          )}

          {provenance?.correctionStatus === 'CORRECTED' && provenance.correctionNote && (
            <div className="mt-4 rounded-card border border-amber-500/20 bg-amber-100/55 px-4 py-3 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100">
              <p className="text-caption font-bold">
                {locale === 'ja' ? '訂正について' : 'About this correction'}
              </p>
              <p className="mt-1 text-caption leading-relaxed opacity-85">
                {provenance.correctionNote}
              </p>
            </div>
          )}

          {provenance?.aiAssisted && (
            <p className="mt-4 flex items-start gap-2 rounded-card bg-surface/55 px-3 py-2.5 text-[0.72rem] leading-relaxed text-muted">
              <Bot aria-hidden size={14} className="mt-0.5 shrink-0 text-accent" />
              {locale === 'ja'
                ? 'AIは要約案などを補助し、公開前に出典照合と編集確認を行っています。'
                : 'AI may assist with a draft summary. A person checks the sources and reviews the article before publication.'}
            </p>
          )}

          <div className="mt-4 grid gap-2 border-t border-line/45 pt-4 sm:grid-cols-2">
            <Link
              href="/legal/editorial-policy"
              className="flex min-h-11 items-center justify-center gap-2 rounded-pill bg-accent-soft/65 px-3 text-caption font-semibold text-accent"
            >
              <BookOpenCheck aria-hidden size={15} />
              {t('article.policy')}
            </Link>
            <Link
              href="/support"
              className="flex min-h-11 items-center justify-center gap-2 rounded-pill border border-line/55 bg-surface/70 px-3 text-caption font-semibold text-text"
            >
              <Flag aria-hidden size={15} />
              {t('article.report')}
            </Link>
          </div>
        </div>
      </details>

      <div className="border-t border-line/45 px-4 py-4">
        <p className="mb-2 text-center text-caption leading-relaxed text-muted">
          {locale === 'ja'
            ? '誰かに伝えたいときだけ、端末の共有機能を使えます。'
            : 'Use your device share menu only when you want to pass this story along.'}
        </p>
        <ShareArticleButton title={article.title} summary={article.summary} />
      </div>
    </aside>
  );
}

function TrustValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-bold text-muted/80">{label}</dt>
      <dd className="mt-0.5 text-caption font-semibold text-text">{value}</dd>
    </div>
  );
}
