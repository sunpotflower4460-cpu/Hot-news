'use client';

import Link from 'next/link';
import { BookOpenText, ChevronRight, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleReadTracker } from '@/components/article/ArticleReadTracker';
import { ArticleTrustPanel } from '@/components/article/ArticleTrustPanel';
import { ComfortScore } from '@/components/article/ComfortScore';
import { CoverArt } from '@/components/article/CoverArt';
import { WhyComfortBlock } from '@/components/article/WhyComfortBlock';
import { CategoryChip } from '@/components/category/CategoryChip';
import { SaveButton } from '@/components/favorites/SaveButton';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { localizeArticle } from '@/lib/i18n/articleTranslations';
import { useI18n } from '@/lib/i18n/useI18n';
import { formatDate } from '@/lib/utils/date';
import type { Article } from '@/types/article';

export function ArticleDetailContent({
  article: rawArticle,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const { locale, t } = useI18n();
  const article = localizeArticle(rawArticle, locale);
  const primary = article.category[0];
  const paragraphs = article.body.split('\n\n').filter(Boolean);
  const brightnessScore = article.editorialAssessment?.brightnessScore ?? article.comfortScore;
  const sourceOnly = article.publishMode === 'source_link_only';
  const safeShort = article.status === 'SAFE_SHORT_VERSION' || article.publishMode === 'safe_short';
  const fullBody = !sourceOnly && !safeShort;
  const sourceExplanation = sourceOnly
    ? locale === 'ja'
      ? 'このページでは元記事の内容を再掲載せず、出典への案内だけを行っています。'
      : 'This page does not reproduce the original article and only provides a route to the source.'
    : safeShort
      ? locale === 'ja'
        ? '内容の核を変えず、安全な範囲で短くまとめ、元の情報へたどれるよう出典を明記しています。'
        : 'We preserve the central meaning in a reader-safe short version and clearly link to the original information.'
      : locale === 'ja'
        ? '内容の核を変えないよう短く再編集し、元の情報へたどれるよう出典を明記しています。'
        : 'We edit the story into a shorter form without changing its central meaning and clearly link to the original information.';

  return (
    <article className="pb-12">
      <ArticleReadTracker articleId={article.id} />
      <ScreenHeader back action={<SaveButton id={article.id} articleTitle={article.title} />} />

      <div className="px-5">
        <CoverArt
          category={primary}
          seed={article.id}
          size="lg"
          className="h-60 w-full rounded-panel shadow-soft-lg"
        />
      </div>

      <div className="relative z-10 -mt-8 px-5">
        <section className="soft-surface rounded-panel px-5 pb-5 pt-5 shadow-float">
          <div className="flex flex-wrap gap-1.5">
            {article.category.map((category) => (
              <CategoryChip key={category} id={category} />
            ))}
          </div>

          <h1 className="mt-3 font-rounded text-h1 font-bold leading-[1.58] text-text">
            {article.title}
          </h1>

          <div className="mt-4 rounded-card border border-accent/10 bg-accent-soft/45 px-4 py-3.5 shadow-inner-light">
            <p className="text-[0.7rem] font-bold tracking-[0.06em] text-accent">
              {t('article.summary')}
            </p>
            <p className="mt-1.5 text-body leading-relaxed text-text/90">{article.summary}</p>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line/35 pt-3">
            <ArticleMeta article={rawArticle} />
            <ComfortScore score={brightnessScore} />
          </div>
        </section>
      </div>

      <div className="space-y-6 px-5 pt-6">
        <WhyComfortBlock text={article.whyComfort} />

        {fullBody && (
          <section
            aria-labelledby="article-body-heading"
            className="soft-surface rounded-panel px-5 py-6 shadow-soft"
          >
            <div className="mb-4 flex items-center gap-2 border-b border-line/40 pb-3 text-accent">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft shadow-inner-light">
                <BookOpenText aria-hidden size={15} />
              </span>
              <h2 id="article-body-heading" className="text-body font-bold text-text">
                {t('article.body')}
              </h2>
            </div>
            <div className="prose-ja font-serif text-text/90">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {safeShort && (
          <section
            aria-labelledby="safe-short-heading"
            className="soft-surface rounded-panel px-5 py-6 shadow-soft"
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-accent-soft/75 px-3 py-1.5 text-caption font-bold text-accent">
              <ShieldCheck aria-hidden size={14} />
              <h2 id="safe-short-heading">{t('article.safeShort')}</h2>
            </div>
            <p className="font-serif text-body-lg leading-[1.95] text-text/90">{article.summary}</p>
            <p className="mt-4 text-caption leading-relaxed text-muted">
              {t('article.safeShortBody')}
            </p>
          </section>
        )}

        {sourceOnly && (
          <section
            aria-labelledby="source-only-heading"
            className="soft-surface rounded-panel px-5 py-6 text-center shadow-soft"
          >
            <div className="ambient-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
              <ExternalLink aria-hidden size={26} strokeWidth={1.7} />
            </div>
            <h2 id="source-only-heading" className="mt-4 text-h2 font-bold text-text">
              {t('article.sourceOnlyTitle')}
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
              {t('article.sourceOnlyBody')}
            </p>
          </section>
        )}

        {!sourceOnly && (
          <aside className="relative overflow-hidden rounded-panel border border-accent/10 bg-accent-soft/55 px-5 py-5 shadow-inner-light">
            <div
              aria-hidden
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl"
            />
            <Sparkles aria-hidden size={18} className="relative text-accent" />
            <p className="relative mt-2 font-rounded text-body-lg font-medium text-text">
              {t('article.takeaway')}
            </p>
            <p className="relative mt-1 text-caption text-muted">{t('article.takeawayBody')}</p>
          </aside>
        )}

        <section aria-labelledby="source-heading" className="glass rounded-card border px-4 py-4">
          <h2 id="source-heading" className="text-body font-bold text-text">
            {t('article.sourceHeading')}
          </h2>
          <p className="mt-1 text-caption leading-relaxed text-muted">{sourceExplanation}</p>

          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer external"
            className="mt-4 flex min-h-14 items-center gap-3 rounded-card bg-accent-strong px-4 py-3 text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/16">
              <ExternalLink aria-hidden size={16} />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-body font-bold">
                {locale === 'ja'
                  ? `${article.sourceName}で元記事を読む`
                  : `Read the original at ${article.sourceName}`}
              </span>
              <span className="mt-0.5 block text-[0.7rem] text-white/78">
                {t('article.sourceOpen')}
              </span>
            </span>
            <ChevronRight aria-hidden size={18} className="shrink-0" />
          </a>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-muted/80">
            <span>
              {t('article.sourceDate')}: {formatDate(article.sourcePublishedAt, locale)}
            </span>
            <span>
              {t('article.articleId')}: {article.id}
            </span>
          </div>
        </section>

        <ArticleTrustPanel article={rawArticle} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-11 space-y-4">
          <div className="flex items-end justify-between gap-3 px-5">
            <div>
              <p className="text-[0.7rem] font-bold tracking-[0.08em] text-accent">
                {t('article.relatedLabel')}
              </p>
              <h2 id="related-heading" className="mt-1 text-h2 font-bold text-text">
                {t('article.relatedTitle')}
              </h2>
            </div>
            <Link
              href={`/browse/${primary}`}
              className="flex min-h-11 items-center gap-0.5 rounded-pill bg-surface/55 px-3 text-caption font-semibold text-accent backdrop-blur"
            >
              {t('common.viewAll')}
              <ChevronRight aria-hidden size={14} />
            </Link>
          </div>
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 [scroll-padding-inline:1.25rem]">
            {related.map((candidate) => (
              <li key={candidate.id} className="snap-start">
                <ArticleCard article={candidate} layout="rail" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
