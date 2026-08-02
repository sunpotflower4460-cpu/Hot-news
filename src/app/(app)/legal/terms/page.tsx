import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument';
import { commercialConfig, configuredValue } from '@/config/commercial';

export default function TermsPage() {
  const operator = configuredValue(
    commercialConfig.operator.legalName,
    'Hot News 運営者（公開前に確定）',
  );

  return (
    <LegalDocument
      title="利用規約"
      summary="明るいニュースを安心して利用するための約束"
      effectiveDate={commercialConfig.legal.termsEffectiveDate}
    >
      <LegalSection title="1. 適用">
        <p>
          本規約は、{operator}（以下「運営者」）が提供する「明るいニュース｜Hot
          News」（以下「本サービス」）の利用条件を定めるものです。利用者は、本規約とプライバシーポリシーに同意したうえで本サービスを利用します。
        </p>
      </LegalSection>

      <LegalSection title="2. サービスの目的">
        <p>
          本サービスは、出来事そのものが明るく、希望、喜び、創造、親切、美しさ、前進を感じられるニュースを選び、出典へたどれる形で届けることを目的とします。
        </p>
        <p>
          暗い出来事を単にやわらかく言い換えることや、悲劇を前提とした感動話を主目的とはしません。
        </p>
      </LegalSection>

      <LegalSection title="3. 記事と出典">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>記事は、出典をもとに短く再編集する場合があります。</li>
          <li>権利や安全上の理由により、短縮版または出典リンクのみを表示する場合があります。</li>
          <li>最新かつ完全な情報は、必ず元の出典で確認してください。</li>
          <li>誤りが判明した場合は、訂正、非公開、出典差し替えなどを行います。</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. 情報の性質">
        <p>
          本サービスは一般的なニュース・情報提供を目的とし、医療、法律、投資、税務、災害対応などの専門的助言を提供するものではありません。重要な判断は、公式情報や資格を持つ専門家へ確認してください。
        </p>
      </LegalSection>

      <LegalSection title="5. 禁止事項">
        <p>利用者は、次の行為を行ってはなりません。</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>法令、公序良俗、本規約に反する行為</li>
          <li>本サービスや第三者の権利、信用、プライバシーを侵害する行為</li>
          <li>不正アクセス、脆弱性の悪用、過度な負荷、妨害行為</li>
          <li>記事やデザインを、許可なく大量複製・再配布・販売する行為</li>
          <li>出典や文脈を改変し、誤解を招く形で利用する行為</li>
          <li>自動取得によってサービス運営や権利者へ不利益を与える行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. 知的財産権">
        <p>
          本サービスの名称、デザイン、文章、編集構成、プログラムなどに関する権利は、運営者または正当な権利者に帰属します。出典記事、画像、商標などは各権利者に帰属します。
        </p>
      </LegalSection>

      <LegalSection title="7. 外部サービス">
        <p>
          本サービスには外部サイトへのリンクが含まれます。外部サイトの内容、安全性、継続性、個人情報の取扱いについて、運営者は管理できません。移動先の規約と方針を確認してください。
        </p>
      </LegalSection>

      <LegalSection title="8. 有料機能">
        <p>
          現在の開発プレビューでは購入、契約、請求は発生しません。将来有料機能を提供する場合は、価格、期間、自動更新、解約、復元、返金、無料範囲を購入前に明示し、Appleのアプリ内課金規則に従います。
        </p>
      </LegalSection>

      <LegalSection title="9. サービスの変更・停止">
        <p>
          運営者は、保守、安全確保、法令対応、出典や権利上の問題、事業上の理由により、機能や掲載内容を変更・停止することがあります。重要な変更は可能な範囲で事前または速やかに案内します。
        </p>
      </LegalSection>

      <LegalSection title="10. 保証と責任の範囲">
        <p>
          運営者は、正確性、完全性、継続性、安全性の向上に努めますが、すべてを保証するものではありません。法令上免責が認められない場合を除き、本サービスの利用により生じた間接的・特別・結果的損害について責任を負わないものとします。
        </p>
      </LegalSection>

      <LegalSection title="11. 利用環境">
        <p>
          利用に必要な端末、通信環境、OS、ブラウザ、通信料金は利用者が用意します。古い環境や改変された端末では、正常に動作しない場合があります。
        </p>
      </LegalSection>

      <LegalSection title="12. 規約の変更">
        <p>
          機能、法令、運用方針の変更に応じて本規約を更新する場合があります。利用者へ重大な影響がある変更は、アプリ内など分かりやすい方法で案内します。
        </p>
      </LegalSection>

      <LegalSection title="13. 準拠法・裁判管轄">
        <p>
          正式公開前に、運営主体、所在地、提供地域を確定したうえで、適用法令に沿って準拠法と合意管轄を設定します。消費者に認められる強行法規上の権利を制限するものではありません。
        </p>
      </LegalSection>

      <LegalSection title="14. 問い合わせ">
        <p>運営者：{operator}</p>
        <p>連絡先：{configuredValue(commercialConfig.operator.contactEmail)}</p>
      </LegalSection>
    </LegalDocument>
  );
}
