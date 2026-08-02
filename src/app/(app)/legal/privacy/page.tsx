import Link from 'next/link';
import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument';
import { commercialConfig, configuredValue } from '@/config/commercial';

export default function PrivacyPolicyPage() {
  const operator = configuredValue(
    commercialConfig.operator.legalName,
    'Hot News 運営者（公開前に確定）',
  );
  const contact = configuredValue(commercialConfig.operator.contactEmail);

  return (
    <LegalDocument
      title="プライバシーポリシー"
      summary="データの扱いと、利用者が選べること"
      effectiveDate={commercialConfig.legal.privacyEffectiveDate}
    >
      <LegalSection title="1. 基本方針">
        <p>
          {operator}（以下「運営者」）は、「明るいニュース｜Hot
          News」（以下「本サービス」）において、必要以上の情報を収集せず、利用目的を明確にし、利用者が選択・削除できる設計を優先します。
        </p>
      </LegalSection>

      <LegalSection title="2. 現在取り扱う情報">
        <p>現在の開発プレビューでは、次の情報を利用者の端末内に保存します。</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>お気に入りにした記事の識別子</li>
          <li>テーマ、時間帯、通知希望などの表示設定</li>
          <li>分析・診断に関する同意の希望</li>
          <li>オフライン表示のための静的キャッシュ</li>
        </ul>
        <p>これらは現在、運営者のサーバや第三者の分析サービスへ送信されません。</p>
      </LegalSection>

      <LegalSection title="3. 現在収集していない情報">
        <p>
          現在、アカウント、氏名、メールアドレス、電話番号、住所、正確な位置情報、連絡先、写真、広告識別子、決済情報、閲覧履歴の外部送信は行っていません。
        </p>
      </LegalSection>

      <LegalSection title="4. 外部サイトへの移動">
        <p>
          記事の出典リンクを選ぶと、外部のウェブサイトへ移動します。移動先で行われるデータ収集やCookie利用には、そのサイトの方針が適用されます。本サービスは外部サイトの内容やデータ処理を管理しません。
        </p>
      </LegalSection>

      <LegalSection title="5. 将来導入する任意の分析・診断">
        <p>
          品質改善のため匿名の利用状況や不具合診断を導入する場合があります。その場合、提供開始前に本ポリシーとApp
          Store上のプライバシー表示を更新し、必要な同意を取得します。
        </p>
        <p>
          原則として、記事本文、出典URL、検索語、自由入力、連絡先、氏名などを分析イベントへ含めません。
        </p>
      </LegalSection>

      <LegalSection title="6. 利用目的">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>利用者が選んだ表示・通知・お気に入り設定を端末内で維持するため</li>
          <li>オフライン時の最低限の表示を提供するため</li>
          <li>同意を得た場合に限り、品質改善や障害低減を行うため</li>
          <li>問い合わせ、権利侵害、訂正依頼、安全上の問題へ対応するため</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. 第三者提供と外部委託">
        <p>
          現在、利用者データの第三者提供や外部分析事業者への送信は行っていません。将来SDKや外部事業者を導入する場合は、提供先、目的、データ種類、保持期間を確認し、本ポリシーとストア表示へ反映します。
        </p>
      </LegalSection>

      <LegalSection title="8. 保存期間と削除">
        <p>
          端末内データは、利用者がアプリ内の「プライバシー」から削除するか、ブラウザ・OSの保存領域を消去するまで保持されます。アプリ内の削除操作では、お気に入り、設定、同意履歴、対象キャッシュを削除できます。
        </p>
      </LegalSection>

      <LegalSection title="9. 同意の変更">
        <p>
          分析・診断の希望は、
          <Link
            href="/settings/privacy"
            className="font-semibold text-accent underline underline-offset-4"
          >
            プライバシー設定
          </Link>
          からいつでも変更できます。将来データ送信を開始する場合も、拒否した利用者の情報は送信しません。
        </p>
      </LegalSection>

      <LegalSection title="10. 安全管理">
        <p>
          収集を最小限にし、アクセス権限、秘密情報の分離、依存関係の監視、脆弱性対応、障害時の記録と再発防止を行います。ただし、インターネット上の安全を完全に保証するものではありません。
        </p>
      </LegalSection>

      <LegalSection title="11. 子どものプライバシー">
        <p>
          本サービスは子どもを対象に個人情報の入力を求めません。将来アカウントや入力機能を追加する場合は、対象年齢、保護者同意、削除方法を別途設計します。
        </p>
      </LegalSection>

      <LegalSection title="12. ポリシーの変更">
        <p>
          機能や法令、外部サービスの変更に応じて本ポリシーを更新することがあります。重要な変更はアプリ内など分かりやすい方法で案内し、必要な場合は改めて同意を確認します。
        </p>
      </LegalSection>

      <LegalSection title="13. 問い合わせ">
        <p>運営者：{operator}</p>
        <p>連絡先：{contact}</p>
        <p>
          正式公開前に、一般公開されたサポートURLと、削除・訂正・苦情を受け付ける連絡先を設定します。
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
