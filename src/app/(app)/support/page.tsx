'use client';

import Link from 'next/link';
import {
  Accessibility,
  AlertCircle,
  BookOpenCheck,
  ChevronRight,
  LifeBuoy,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { DiagnosticCopyButton } from '@/components/support/DiagnosticCopyButton';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { Card } from '@/components/ui/Card';
import { commercialConfig, configuredValue, isCommercialPreview } from '@/config/commercial';
import { useI18n } from '@/lib/i18n/useI18n';

export default function SupportPage() {
  const { locale, t } = useI18n();
  const email = commercialConfig.operator.contactEmail.trim();

  return (
    <div className="space-y-7 pb-12">
      <ScreenHeader
        title={locale === 'ja' ? 'サポート' : 'Support'}
        subtitle={
          locale === 'ja'
            ? '不具合、訂正、権利、安全上の問題はこちら'
            : 'Bugs, corrections, rights, accessibility, and safety concerns'
        }
        back
      />

      <section className="px-5">
        <div className="soft-surface relative overflow-hidden rounded-panel px-5 py-5 shadow-soft">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
              <LifeBuoy aria-hidden size={21} />
            </span>
            <div>
              <h1 className="text-h2 font-bold text-text">
                {locale === 'ja' ? '内容に応じて優先して確認します' : 'Reports are prioritized by risk'}
              </h1>
              <p className="mt-1 text-caption leading-relaxed text-muted">
                {locale === 'ja'
                  ? '権利侵害、安全上の問題、重大な事実誤認は通常の要望より優先して確認し、必要に応じて記事を一時非公開にします。'
                  : 'Rights issues, safety concerns, and serious factual errors are reviewed before ordinary requests. A story may be temporarily unpublished while we investigate.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">
          {locale === 'ja' ? '問い合わせの種類' : 'Type of report'}
        </h2>
        <Card className="divide-y divide-line/45">
          <SupportType
            Icon={AlertCircle}
            title={locale === 'ja' ? 'アプリの不具合' : 'App problem'}
            body={
              locale === 'ja'
                ? '起きた画面、操作手順、期待した動作、実際の動作をお知らせください。'
                : 'Tell us the screen, steps, expected behavior, and what actually happened.'
            }
          />
          <SupportType
            Icon={BookOpenCheck}
            title={locale === 'ja' ? '記事の訂正・出典切れ' : 'Article correction or broken source'}
            body={
              locale === 'ja'
                ? '記事タイトルまたは記事ID、問題箇所、確認できる根拠をお知らせください。'
                : 'Include the article title or ID, the affected passage, and supporting evidence.'
            }
          />
          <SupportType
            Icon={ShieldAlert}
            title={locale === 'ja' ? '権利侵害・安全上の問題' : 'Rights or safety concern'}
            body={
              locale === 'ja'
                ? '対象記事、権利者との関係、緊急性、希望する対応をお知らせください。'
                : 'Include the article, your relationship to the rights holder, urgency, and requested action.'
            }
          />
          <SupportType
            Icon={Accessibility}
            title={locale === 'ja' ? 'アクセシビリティ' : 'Accessibility'}
            body={
              locale === 'ja'
                ? '読めない、操作できない、読み上げや動きが負担になる箇所をお知らせください。'
                : 'Tell us where content is unreadable, controls are unusable, or speech and motion create a burden.'
            }
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">
          {locale === 'ja' ? '問い合わせ先' : 'Contact'}
        </h2>
        <Card inset className="space-y-4">
          {email ? (
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(locale === 'ja' ? 'Hot News サポート問い合わせ' : 'Hot News support request')}`}
              className="flex min-h-12 items-center justify-center gap-2 rounded-pill bg-accent-strong px-5 text-body font-bold text-white shadow-glow"
            >
              <Mail aria-hidden size={18} />
              {locale === 'ja' ? 'メールで問い合わせる' : 'Contact support by email'}
            </a>
          ) : (
            <div className="rounded-card border border-amber-500/20 bg-amber-100/55 px-4 py-4 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100">
              <p className="text-body font-bold">
                {locale === 'ja'
                  ? '問い合わせ先は正式公開前に設定します'
                  : 'A public support contact is required before release'}
              </p>
              <p className="mt-1 text-caption leading-relaxed opacity-80">
                {locale === 'ja'
                  ? '商用リリースチェックでは、一般公開されたサポートURLと連絡先が未設定の場合に失敗します。'
                  : 'The commercial release check fails while a public support URL and contact address are missing.'}
              </p>
            </div>
          )}
          <p className="text-caption leading-relaxed text-muted">
            {locale === 'ja' ? '連絡先' : 'Contact'}: {configuredValue(email)}
          </p>
          <DiagnosticCopyButton />
          <p className="text-[0.68rem] leading-relaxed text-muted/75">
            {locale === 'ja'
              ? '診断情報にはアプリ版、画面パス、通信状態、端末のブラウザ情報が含まれます。保存した記事、閲覧履歴、記事本文、氏名、メール、入力内容は含めません。'
              : 'Diagnostic information includes the app version, page path, network status, language, and browser information. It excludes saved stories, reading history, article content, names, email addresses, and input.'}
          </p>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">
          {locale === 'ja' ? 'よくある確認' : 'Common questions'}
        </h2>
        <Card inset className="space-y-5">
          <Faq
            title={locale === 'ja' ? '記事が表示されない' : 'Why is an article missing?'}
            body={
              locale === 'ja'
                ? '明るさ・安全性・出典・権利の掲載基準を満たさない記事は表示しません。公開後に問題が判明した記事も非公開になる場合があります。'
                : 'Stories that fail the brightness, safety, source, or rights standard are not shown. Published stories may also be withdrawn if a problem is discovered.'
            }
          />
          <Faq
            title={locale === 'ja' ? '通知が届かない' : 'Why am I not receiving notifications?'}
            body={
              locale === 'ja'
                ? '現在の通知画面は希望設定のプレビューです。実際のプッシュ通知はまだ提供していません。'
                : 'Notification controls are currently a preference preview. Push delivery is not active yet.'
            }
          />
          <Faq
            title={locale === 'ja' ? 'プレミアム料金が発生した' : 'Was I charged for Premium?'}
            body={
              locale === 'ja'
                ? '現在のプレビューでは購入処理を実装していないため、Hot Newsから料金は発生しません。正式提供後は購入履歴とAppleのサブスクリプション管理を確認できる導線を用意します。'
                : 'The preview has no purchase flow, so Hot News cannot create a charge. A production subscription must include purchase history and Apple subscription management.'
            }
          />
          <Faq
            title={locale === 'ja' ? '端末内データを消したい' : 'How do I delete local data?'}
            body={
              locale === 'ja'
                ? '設定のプライバシー画面から、保存した記事、閲覧履歴、表示設定、言語設定、同意履歴、キャッシュを削除できます。'
                : 'Open Privacy in Settings to delete saved stories, reading history, display and language settings, consent choices, and caches.'
            }
          />
        </Card>
      </section>

      <section className="space-y-2 px-5">
        <PolicyLink href="/legal/editorial-policy" label={t('settings.editorial')} />
        <PolicyLink href="/legal/accessibility" label={t('settings.accessibility')} />
        <PolicyLink href="/legal/privacy" label={t('settings.privacyPolicy')} />
        <PolicyLink href="/legal/terms" label={t('settings.terms')} />
      </section>

      {isCommercialPreview && (
        <p className="px-5 text-center text-[0.68rem] leading-relaxed text-muted/70">
          {locale === 'ja'
            ? 'このページは商用公開前の運用プレビューです。'
            : 'This page is a pre-release operations preview.'}
        </p>
      )}
    </div>
  );
}

function SupportType({
  Icon,
  title,
  body,
}: {
  Icon: typeof AlertCircle;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft/70 text-accent">
        <Icon aria-hidden size={17} />
      </span>
      <div>
        <h3 className="text-body font-semibold text-text">{title}</h3>
        <p className="mt-1 text-caption leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}

function Faq({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-body font-semibold text-text">{title}</h3>
      <p className="mt-1 text-caption leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function PolicyLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-12 items-center rounded-card border border-line/55 bg-surface/65 px-4 text-body font-semibold text-text shadow-inner-light"
    >
      <span className="flex-1">{label}</span>
      <ChevronRight
        aria-hidden
        size={17}
        className="text-muted transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}
