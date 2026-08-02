import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { ArticleTrustPanel } from '@/components/article/ArticleTrustPanel';
import { ComfortScore } from '@/components/article/ComfortScore';
import { CoverArt } from '@/components/article/CoverArt';
import { WhyComfortBlock } from '@/components/article/WhyComfortBlock';
import { CategoryChip } from '@/components/category/CategoryChip';
import { SaveButton } from '@/components/favorites/SaveButton';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { getArticleById, getArticlesByCategory } from '@/lib/data/selectors';
import { isArticleEligibleForPublication } from '@/lib/editorial/policy';
import { formatJaDate } from '@/lib/utils/date';
import { ARTICLES } from '@/mock/articles';

export function generateStaticParams() {
  return ARTICLES.filter(isArticleEligibleForPublication).map((article) => ({ id: article.id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const primary = article.category[0];
  const related = (await getArticlesByCategory(primary))
    .filter((candidate) => candidate.id !== article.id)
    .slice(0, 6);
  const paragraphs = article.body.split('\n\n').filter(Boolean);
  const brightnessScore = article.editorialAssessment?.brightnessScore ?? article.comfortScore;
  const sourceOnly = article.publishMode === 'source_link_only';
  const safeShort = article.status === 'SAFE_SHORT_VERSION' || article.publishMode === 'safe_short';
  const fullBody = !sourceOnly && !safeShort;

  return (
    <article className="pb-12">
      <ScreenHeader
        back
        action={<SaveButton id={article.id} articleTitle={article.title} />}
      />

      <div className="px-5">
        <CoverArt
          category={primary}
          seed={article.id}
          size="lg"
          className="h-64 w-full rounded-panel shadow-soft-lg"
        />
      </div>

      <div className="relative z-10 -mt-8 px-5">
        <section className="soft-surface rounded-panel px-5 pb-5 pt-5 shadow-float">
          <div className="flex flex-wrap gap-1.5">
            {article.category.map((category) => (
              <CategoryChip key={category} id={category} />
            ))}
          </div>

          <h1 className="mt-3 font-rounded text-h1 font-bold leading-[1.62] text-text">
            {article.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line/35 pt-3">
            <ArticleMeta article={article} />
            <ComfortScore score={brightnessScore} />
          </div>
        </section>
      </div>

      <div className="space-y-6 px-5 pt-6">
        <WhyComfortBlock text={article.whyComfort} />

        {fullBody && (
          <div className="soft-surface rounded-panel px-5 py-6 shadow-soft">
            <div className="prose-ja font-serif text-text/90">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {safeShort && (
          <div className="soft-surface rounded-panel px-5 py-6 shadow-soft">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-pill bg-accent-soft/75 px-3 py-1.5 text-caption font-bold text-accent">
              <ShieldCheck aria-hidden size={14} />
              安全な短縮版
            </div>
            <p className="font-serif text-body-lg leading-[1.95] text-text/90">{article.summary}</p>
            <p className="mt-4 text-caption leading-relaxed text-muted">
              読む負担や掲載上の理由から、要点だけを表示しています。詳しい内容は出典で確認できます。
            </p>
          </div>
        )}

        {sourceOnly && (
          <div className="soft-surface rounded-panel px-5 py-6 text-center shadow-soft">
            <div className="ambient-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/35 text-accent shadow-glow">
              <ExternalLink aria-hidden size={26} strokeWidth={1.7} />
            </div>
            <h2 className="mt-4 text-h2 font-bold text-text">出典で読むニュースです</h2>
            <p className="mx-auto mt-2 max-w-xs text-body leading-relaxed text-muted">
              本文の転載や要約を行わず、信頼できる元記事への案内だけを掲載しています。
            </p>
          </div>
        )}

        {!sourceOnly && (
          <aside className="relative overflow-hidden rounded-panel border border-accent/10 bg-accent-soft/55 px-5 py-5 shadow-inner-light">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/35 blur-2xl" />
            <Sparkles aria-hidden size={18} className="relative text-accent" />
            <p className="relative mt-2 font-rounded text-body-lg font-medium text-text">
              今日の光を、ひとつ持ち帰って。
            </p>
            <p className="relative mt-1 text-caption text-muted">
              世界には、静かに前へ進んでいる出来事が今日もあります。
            </p>
          </aside>
        )}

        <div className="glass rounded-card border px-4 py-4">
          <p className="text-caption leading-relaxed text-muted">
            {sourceOnly
              ? 'このページでは元記事の内容を再掲載せず、出典への案内だけを行っています。'
              : safeShort
                ? '内容の核を変えず、安全な範囲で短くまとめ、元の情報へたどれるよう出典を明記しています。'
                : '内容の核を変えないよう短く再編集し、元の情報へたどれるよう出典を明記しています。'}
          </p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer external"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-pill bg-accent-soft/75 px-3.5 py-2 text-body font-semibold text-accent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow active:translate-y-0"
          >
            <ExternalLink aria-hidden size={15} />
            {article.sourceName}の記事を読む
          </a>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-muted/75">
            <span>出典公開日：{formatJaDate(article.sourcePublishedAt)}</span>
            <span>記事ID：{article.id}</span>
          </div>
        </div>

        <ArticleTrustPanel article={article} />
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-11 space-y-4">
          <div className="flex items-end justify-between gap-3 px-5">
            <div>
              <p className="text-[0.68rem] font-bold tracking-[0.12em] text-accent">MORE LIGHT</p>
              <h2 id="related-heading" className="mt-1 text-h2 font-bold text-text">
                同じテーマの明るいニュース
              </h2>
            </div>
            <Link
              href={`/browse/${primary}`}
              className="flex min-h-11 items-center gap-0.5 rounded-pill bg-surface/55 px-3 text-caption font-semibold text-accent backdrop-blur"
            >
              もっと見る
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
