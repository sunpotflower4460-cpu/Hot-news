import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument';
import { commercialConfig, configuredValue } from '@/config/commercial';

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid gap-1 border-b border-line/40 py-3 last:border-b-0 sm:grid-cols-[8rem_1fr] sm:gap-4">
    <dt className="text-caption font-bold text-muted">{label}</dt>
    <dd className="text-body leading-relaxed text-text">{value}</dd>
  </div>
);

export default function CommerceDisclosurePage() {
  const operator = commercialConfig.operator;

  return (
    <LegalDocument title="特定商取引法に基づく表記" summary="有料機能を提供する前に必要な販売情報">
      <LegalSection title="販売事業者情報">
        <dl>
          <Row label="販売事業者" value={configuredValue(operator.legalName)} />
          <Row label="代表者" value={configuredValue(operator.representative)} />
          <Row label="所在地" value={configuredValue(operator.postalAddress)} />
          <Row
            label="電話番号"
            value={configuredValue(
              operator.phone,
              '請求があった場合に遅滞なく開示できる状態へ整備します',
            )}
          />
          <Row label="メール" value={configuredValue(operator.contactEmail)} />
          <Row
            label="サポートURL"
            value={configuredValue(
              commercialConfig.app.publicBaseUrl
                ? `${commercialConfig.app.publicBaseUrl}${commercialConfig.urls.support}`
                : '',
            )}
          />
        </dl>
      </LegalSection>

      <LegalSection title="販売価格">
        <p>
          現在は購入機能を提供していません。将来有料プランを開始する場合、App
          Storeの購入画面に税込価格、課金期間、無料期間の有無を表示します。
        </p>
      </LegalSection>

      <LegalSection title="販売価格以外の負担">
        <p>
          アプリの利用に必要な端末、通信機器、インターネット接続料金、データ通信料金は利用者の負担です。
        </p>
      </LegalSection>

      <LegalSection title="支払方法・支払時期">
        <p>
          iOSアプリ内でデジタル機能を販売する場合は、Apple
          IDに設定された支払方法によるアプリ内課金を使用します。具体的な支払時期は購入画面に表示される条件に従います。
        </p>
      </LegalSection>

      <LegalSection title="提供時期">
        <p>購入手続きが正常に完了し、ストアの購入状態を確認できた後に利用可能になります。</p>
      </LegalSection>

      <LegalSection title="自動更新・解約">
        <p>
          自動更新サブスクリプションを提供する場合、期間終了の24時間以上前までに解約されない限り自動更新される条件を購入前に表示します。解約はApple
          IDのサブスクリプション管理画面から行います。
        </p>
      </LegalSection>

      <LegalSection title="返品・キャンセル・返金">
        <p>
          デジタル商品の性質上、提供開始後の返品は原則受け付けません。ただし、法令またはAppleの返金制度が適用される場合はその定めに従います。重複課金や機能不具合はサポートへ連絡してください。
        </p>
      </LegalSection>

      <LegalSection title="動作環境">
        <p>
          対応OS、対応端末、必要なネットワーク環境はApp
          Storeの製品ページとアプリ内サポートに表示します。
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
