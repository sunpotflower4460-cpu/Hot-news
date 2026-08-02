'use client';

import type { ReactNode } from 'react';
import { AlertTriangle, Languages, ShieldCheck } from 'lucide-react';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { isCommercialPreview } from '@/config/commercial';
import { useI18n } from '@/lib/i18n/useI18n';

const ENGLISH_TITLES: Record<string, string> = {
  プライバシーポリシー: 'Privacy policy',
  利用規約: 'Terms of use',
  '特定商取引法に基づく表記': 'Commercial transaction disclosure',
  '編集・訂正方針': 'Editorial and corrections policy',
  'ニュースの選び方・訂正方針': 'How stories are selected and corrected',
  アクセシビリティ方針: 'Accessibility statement',
};

const ENGLISH_SUMMARIES: Record<string, string> = {
  プライバシーポリシー: 'How data is handled and what users can control',
  利用規約: 'The conditions for using this service',
  '特定商取引法に基づく表記': 'Required operator, pricing, payment, and cancellation information',
  '編集・訂正方針': 'How stories are selected, verified, corrected, and withdrawn',
  'ニュースの選び方・訂正方針': 'How stories are selected, verified, corrected, and withdrawn',
  アクセシビリティ方針: 'Our approach to inclusive access and ongoing improvement',
};

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
  const { locale } = useI18n();
  const displayTitle = locale === 'en' ? (ENGLISH_TITLES[title] ?? title) : title;
  const displaySummary = locale === 'en' ? (ENGLISH_SUMMARIES[title] ?? summary) : summary;

  return (
    <article className="pb-12">
      <ScreenHeader title={displayTitle} subtitle={displaySummary} back />
      <div className="space-y-5 px-5 pt-1">
        {locale === 'en' && (
          <aside className="rounded-card border border-accent/15 bg-accent-soft/55 px-4 py-4 text-text shadow-inner-light">
            <div className="flex items-start gap-3">
              <Languages aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-body font-bold">Reviewed English legal text is still required</p>
                <p className="mt-1 text-caption leading-relaxed text-muted">
                  The product interface and preview stories are available in English. The Japanese
                  draft below remains the working legal document until a specialist reviews and
                  approves a complete English version. Commercial English release is blocked until
                  that review is complete.
                </p>
              </div>
            </div>
          </aside>
        )}

        {isCommercialPreview && (
          <aside className="rounded-card border border-accent/15 bg-accent-soft/55 px-4 py-4 text-text shadow-inner-light">
            <div className="flex items-start gap-3">
              <AlertTriangle aria-hidden size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-body font-bold">
                  {locale === 'ja' ? '商用公開前のドラフトです' : 'Pre-release commercial draft'}
                </p>
                <p className="mt-1 text-caption leading-relaxed text-muted">
                  {locale === 'ja'
                    ? '運営者情報、施行日、問い合わせ先、実際に導入する外部サービスを確定し、専門家の確認後に本番公開してください。'
                    : 'Confirm the operator details, effective date, support contact, and actual external services, then obtain specialist review before production release.'}
                </p>
              </div>
            </div>
          </aside>
        )}

        <section className="soft-surface rounded-panel px-5 py-6 shadow-soft">
          <div className="mb-5 flex items-center gap-2 border-b border-line/45 pb-4 text-accent">
            <ShieldCheck aria-hidden size={18} />
            <p className="text-caption font-bold tracking-wide">
              {effectiveDate
                ? locale === 'ja'
                  ? `施行日：${effectiveDate}`
                  : `Effective date: ${effectiveDate}`
                : locale === 'ja'
                  ? '施行日は正式公開前に設定します'
                  : 'The effective date will be set before production release'}
            </p>
          </div>
          {locale === 'en' && (
            <p className="mb-5 rounded-card bg-surface-2/65 px-4 py-3 text-caption font-semibold text-muted">
              Japanese working draft
            </p>
          )}
          <div lang="ja" className="legal-copy space-y-7">
            {children}
          </div>
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
