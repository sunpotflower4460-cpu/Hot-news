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
import { ARTICLES } from '@/mock/articles';
import { getArticleById, getArticlesByCategory } from '@/lib/data/selectors';
import { formatJaDate } from '@/lib/utils/date';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const primary = article.category[0];
  const related = (await getArticlesByCategory(primary)).filter((a) => a.id !== article.id).slice(0, 6);
  const paragraphs = article.body.split('\n\n');

  return (
    <article className="animate-fade-up pb-10">
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
          {article.category.map((c) => (
            <CategoryChip key={c} id={c} />
          ))}
        </div>

        <h1 className="text-pretty font-rounded text-h1 font-bold leading-snug text-text">
          {article.title}
        </h1>

        <div className="flex flex-col gap-2 border-y border-line/60 py-3">
          <ComfortScore score={article.comfortScore} />
          <ArticleMeta article={article} />
        </div>

        <WhyComfortBlock text={article.whyComfort} />

        <div className="prose-ja font-serif text-text/90">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="rounded-card border border-line/70 bg-surface-2/50 p-4">
          <p className="text-caption text-muted">
            本文は出典をもとに、読者に負担のないようやさしく再編集しています。詳しくは出典をご覧ください。
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
          <p className="mt-1 text-caption text-muted">
            出典公開日：{formatJaDate(article.sourcePublishedAt)}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-8 space-y-3">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-h2 font-bold text-text">同じテーマのお話</h2>
            <Link
              href={`/browse/${primary}`}
              className="flex items-center gap-0.5 text-caption font-medium text-accent"
            >
              もっと見る
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-1">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} layout="rail" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
