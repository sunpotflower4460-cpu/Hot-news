import Link from 'next/link';
import { Bot, BookOpenCheck, Flag, ShieldCheck } from 'lucide-react';
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

  return (
    <aside className="glass rounded-card border px-4 py-4">
      <div className="flex items-center gap-2 text-accent">
        <ShieldCheck aria-hidden size={17} />
        <h2 className="text-caption font-bold tracking-wide">このニュースの確認情報</h2>
      </div>

      {provenance ? (
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
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
        <div className="mt-3 rounded-card bg-accent-soft/45 px-4 py-3">
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

      {provenance?.aiAssisted && (
        <p className="mt-3 flex items-start gap-2 text-[0.68rem] leading-relaxed text-muted/80">
          <Bot aria-hidden size={13} className="mt-0.5 shrink-0" />
          AIは要約案などを補助し、公開前に出典照合と編集確認を行っています。
        </p>
      )}
    </aside>
  );
}

function TrustValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.66rem] font-bold text-muted/80">{label}</dt>
      <dd className="mt-0.5 text-caption font-semibold text-text">{value}</dd>
    </div>
  );
}
