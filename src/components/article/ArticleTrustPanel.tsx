import Link from 'next/link';
import { Bot, BookOpenCheck, ChevronDown, Flag, ShieldCheck } from 'lucide-react';
import type { Article, SourceType } from '@/types/article';
import { formatJaDate } from '@/lib/utils/date';

const SOURCE_LABELS: Record<SourceType, string> = {
  PRIMARY: '一次資料',
  OFFICIAL: '公式情報',
  INDEPENDENT: '独立報道',
  SECONDARY: '二次情報',
};

export function ArticleTrustPanel({ article }: { article: Article }) {
  const provenance = article.provenance;
  const overview = provenance
    ? `${SOURCE_LABELS[provenance.sourceType]}を中心に${provenance.sourceCount}件で確認`
    : '商用版では出典・確認履歴を公開します';

  return (
    <aside className="glass overflow-hidden rounded-card border">
      <details>
        <summary className="disclosure-summary group flex min-h-[4.75rem] cursor-pointer items-center gap-3 px-4 py-3.5 focus-visible:outline-offset-[-3px]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/75 text-accent shadow-inner-light">
            <ShieldCheck aria-hidden size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-body font-bold text-text">確認情報と編集履歴</span>
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
              <TrustValue label="中心の出典" value={SOURCE_LABELS[provenance.sourceType]} />
              <TrustValue label="確認ソース" value={`${provenance.sourceCount}件`} />
              <TrustValue label="最終確認" value={formatJaDate(provenance.lastVerifiedAt)} />
              <TrustValue label="編集確認" value={formatJaDate(provenance.editorialReviewedAt)} />
              <TrustValue
                label="AI補助"
                value={provenance.aiAssisted ? '使用・人が確認' : '使用なし'}
              />
              <TrustValue
                label="訂正状態"
                value={provenance.correctionStatus === 'CORRECTED' ? '訂正あり' : '訂正なし'}
              />
            </dl>
          ) : (
            <div className="rounded-card bg-accent-soft/45 px-4 py-3">
              <p className="text-caption leading-relaxed text-muted">
                この画面は架空データによる表示確認です。商用公開する実ニュースには、出典数、AI補助、事実確認、編集確認、訂正状態を必須で記録します。
              </p>
            </div>
          )}

          {provenance?.correctionStatus === 'CORRECTED' && provenance.correctionNote && (
            <div className="mt-4 rounded-card border border-amber-500/20 bg-amber-100/55 px-4 py-3 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100">
              <p className="text-caption font-bold">訂正について</p>
              <p className="mt-1 text-caption leading-relaxed opacity-85">
                {provenance.correctionNote}
              </p>
            </div>
          )}

          {provenance?.aiAssisted && (
            <p className="mt-4 flex items-start gap-2 rounded-card bg-surface/55 px-3 py-2.5 text-[0.72rem] leading-relaxed text-muted">
              <Bot aria-hidden size={14} className="mt-0.5 shrink-0 text-accent" />
              AIは要約案などを補助し、公開前に出典照合と編集確認を行っています。
            </p>
          )}

          <div className="mt-4 grid gap-2 border-t border-line/45 pt-4 sm:grid-cols-2">
            <Link
              href="/legal/editorial-policy"
              className="flex min-h-11 items-center justify-center gap-2 rounded-pill bg-accent-soft/65 px-3 text-caption font-semibold text-accent"
            >
              <BookOpenCheck aria-hidden size={15} />
              編集・訂正方針
            </Link>
            <Link
              href="/support"
              className="flex min-h-11 items-center justify-center gap-2 rounded-pill border border-line/55 bg-surface/70 px-3 text-caption font-semibold text-text"
            >
              <Flag aria-hidden size={15} />
              この記事を報告
            </Link>
          </div>
        </div>
      </details>
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
