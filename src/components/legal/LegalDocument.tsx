import type { ReactNode } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { isCommercialPreview } from '@/config/commercial';

export function LegalDocument({
  title,
  summary,
  effectiveDate,
  children,
}: {
  title: string;
  summary: string;
  effectiveDate?: string;
  children: ReactNode;
}) {
  return (
    <article className="pb-12">
      <ScreenHeader title={title} subtitle={summary} back />
      <div className="space-y-5 px-5 pt-1">
        {isCommercialPreview && (
          <aside className="rounded-card border border-amber-500/20 bg-amber-100/55 px-4 py-4 text-amber-950 shadow-inner-light dark:bg-amber-950/25 dark:text-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle aria-hidden size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-body font-bold">商用公開前のドラフトです</p>
                <p className="mt-1 text-caption leading-relaxed opacity-80">
                  運営者情報、施行日、問い合わせ先、実際に導入する外部サービスを確定し、専門家の確認後に本番公開してください。
                </p>
              </div>
            </div>
          </aside>
        )}

        <section className="soft-surface rounded-panel px-5 py-6 shadow-soft">
          <div className="mb-5 flex items-center gap-2 border-b border-line/45 pb-4 text-accent">
            <ShieldCheck aria-hidden size={18} />
            <p className="text-caption font-bold tracking-wide">
              {effectiveDate ? `施行日：${effectiveDate}` : '施行日は正式公開前に設定します'}
            </p>
          </div>
          <div className="legal-copy space-y-7">{children}</div>
        </section>
      </div>
    </article>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h2 className="text-h2 font-bold text-text">{title}</h2>
      <div className="space-y-2.5 text-body leading-[1.95] text-text/85">{children}</div>
    </section>
  );
}
