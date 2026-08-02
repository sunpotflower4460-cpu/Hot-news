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

export default function SupportPage() {
  const email = commercialConfig.operator.contactEmail.trim();

  return (
    <div className="space-y-7 pb-12">
      <ScreenHeader title="サポート" subtitle="不具合、訂正、権利、安全上の問題はこちら" back />

      <section className="px-5">
        <div className="soft-surface relative overflow-hidden rounded-panel px-5 py-5 shadow-soft">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-soft/70 blur-3xl" />
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent shadow-inner-light">
              <LifeBuoy aria-hidden size={21} />
            </span>
            <div>
              <h1 className="text-h2 font-bold text-text">内容に応じて優先して確認します</h1>
              <p className="mt-1 text-caption leading-relaxed text-muted">
                権利侵害、安全上の問題、重大な事実誤認は通常の要望より優先して確認し、必要に応じて記事を一時非公開にします。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">問い合わせの種類</h2>
        <Card className="divide-y divide-line/45">
          <SupportType
            Icon={AlertCircle}
            title="アプリの不具合"
            body="起きた画面、操作手順、期待した動作、実際の動作をお知らせください。"
          />
          <SupportType
            Icon={BookOpenCheck}
            title="記事の訂正・出典切れ"
            body="記事タイトルまたは記事ID、問題箇所、確認できる根拠をお知らせください。"
          />
          <SupportType
            Icon={ShieldAlert}
            title="権利侵害・安全上の問題"
            body="対象記事、権利者との関係、緊急性、希望する対応をお知らせください。"
          />
          <SupportType
            Icon={Accessibility}
            title="アクセシビリティ"
            body="読めない、操作できない、読み上げや動きが負担になる箇所をお知らせください。"
          />
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">問い合わせ先</h2>
        <Card inset className="space-y-4">
          {email ? (
            <a
              href={`mailto:${email}?subject=${encodeURIComponent('Hot News サポート問い合わせ')}`}
              className="flex min-h-12 items-center justify-center gap-2 rounded-pill bg-accent-strong px-5 text-body font-bold text-white shadow-glow"
            >
              <Mail aria-hidden size={18} />
              メールで問い合わせる
            </a>
          ) : (
            <div className="rounded-card border border-amber-500/20 bg-amber-100/55 px-4 py-4 text-amber-950 dark:bg-amber-950/25 dark:text-amber-100">
              <p className="text-body font-bold">問い合わせ先は正式公開前に設定します</p>
              <p className="mt-1 text-caption leading-relaxed opacity-80">
                商用リリースチェックでは、一般公開されたサポートURLと連絡先が未設定の場合に失敗します。
              </p>
            </div>
          )}
          <p className="text-caption leading-relaxed text-muted">
            連絡先：{configuredValue(email)}
          </p>
          <DiagnosticCopyButton />
          <p className="text-[0.68rem] leading-relaxed text-muted/75">
            診断情報にはアプリ版、画面パス、通信状態、端末のブラウザ情報が含まれます。お気に入り、記事本文、氏名、メール、入力内容は含めません。
          </p>
        </Card>
      </section>

      <section className="space-y-3 px-5">
        <h2 className="text-caption font-bold text-muted">よくある確認</h2>
        <Card inset className="space-y-5">
          <Faq title="記事が表示されない">
            明るさ・安全性・出典・権利の掲載基準を満たさない記事は表示しません。公開後に問題が判明した記事も非公開になる場合があります。
          </Faq>
          <Faq title="通知が届かない">
            現在の通知画面は希望設定のプレビューです。実際のプッシュ通知はまだ提供していません。
          </Faq>
          <Faq title="プレミアム料金が発生した">
            現在のプレビューでは購入処理を実装していないため、Hot Newsから料金は発生しません。正式提供後は購入履歴とAppleのサブスクリプション管理を確認できる導線を用意します。
          </Faq>
          <Faq title="端末内データを消したい">
            設定のプライバシー画面から、お気に入り、表示設定、同意履歴、キャッシュを削除できます。
          </Faq>
        </Card>
      </section>

      <section className="space-y-2 px-5">
        <PolicyLink href="/legal/editorial-policy" label="編集・訂正方針" />
        <PolicyLink href="/legal/accessibility" label="アクセシビリティ方針" />
        <PolicyLink href="/legal/privacy" label="プライバシーポリシー" />
        <PolicyLink href="/legal/terms" label="利用規約" />
      </section>

      {isCommercialPreview && (
        <p className="px-5 text-center text-[0.68rem] leading-relaxed text-muted/70">
          このページは商用公開前の運用プレビューです。
        </p>
      )}
    </div>
  );
}

function SupportType({ Icon, title, body }: { Icon: typeof AlertCircle; title: string; body: string }) {
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

function Faq({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h3 className="text-body font-semibold text-text">{title}</h3>
      <p className="mt-1 text-caption leading-relaxed text-muted">{children}</p>
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
      <ChevronRight aria-hidden size={17} className="text-muted transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
