import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { CoverArt } from '@/components/article/CoverArt';
import { ComfortScore } from '@/components/article/ComfortScore';
import { ArticleMeta } from '@/components/article/ArticleMeta';
import { WhyComfortBlock } from '@/components/article/WhyComfortBlock';
import { CategoryChip } from '@/components/category/CategoryChip';
import { ArticleCard } from '@/components/article/ArticleCard';
import { SaveButton } from '@/components/favorites/SaveButton';
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
  const paragraphs = article.body.split('\n\n');
  const brightnessScore =
    article.editorialAssessment?.brightnessScore ?? article.comfortScore;

  return (
    <article className="pb-10">
      <ScreenHeader back action={<SaveButton id={article.id} />} />

      <div className="px-5">
        <CoverArt
          category={primary}
          seed={article.id}
          size="lg"
          className="h-44 w-full rounded-card"
        />
      </div>

      <div className="space-y-4 px-5 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {article.category.map((category) => (
            <CategoryChip key={category} id={category} />
          ))}
        </div>

        <h1 className="font-rounded text-h1 font-bold leading-snug text-text">{article.title}</h1>

        <div className="flex items-center justify-between">
          <ArticleMeta article={article} />
          <ComfortScore score={brightnessScore} />
        </div>

        <WhyComfortBlock text={article.whyComfort} />

        <div className="prose-ja font-serif text-text/90">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="rounded-card border border-line/70 bg-surface-2/50 p-4">
          <p className="text-caption text-muted">
            内容の核を変えないよう短く再編集し、元の情報へたどれるよう出典を明記しています。
          </p>
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-body font-medium text-accent"
          >
            <ExternalLink size={16} />
            {article.sourceName}の記事を読む
          </a>
          <p className="mt-1 text-[0.7rem] text-muted/80">
            出典公開日：{formatJaDate(article.sourcePublishedAt)}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 space-y-3">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-h2 font-bold text-text">同じテーマの明るいニュース</h2>
            <Link
              href={`/browse/${primary}`}
              className="flex items-center gap-0.5 text-caption font-medium text-accent"
            >
              もっと見る
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
            {related.map((candidate) => (
              <ArticleCard key={candidate.id} article={candidate} layout="rail" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
