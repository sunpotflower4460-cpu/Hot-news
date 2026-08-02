import Link from 'next/link';
import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument';

export default function AccessibilityPage() {
  return (
    <LegalDocument title="アクセシビリティ方針" summary="心が休まる体験を、できるだけ多くの人へ">
      <LegalSection title="1. 目標">
        <p>
          Hot
          Newsは、視覚、聴覚、運動、認知特性、利用端末にかかわらず、主要なニュース閲覧と設定へ到達できることを目指します。柔らかな表現と読みやすさを両立し、装飾だけに情報を依存させません。
        </p>
      </LegalSection>

      <LegalSection title="2. 現在の対応">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>キーボードで本文へ移動できるスキップリンク</li>
          <li>見出し、ナビゲーション、リスト、時刻、ボタンの意味構造</li>
          <li>フォーカス表示と十分な操作領域</li>
          <li>OSのモーション低減設定</li>
          <li>高コントラスト設定への補助</li>
          <li>ライト・ダーク・時間帯テーマ</li>
          <li>画像なしでも内容が理解できる構成</li>
          <li>エラー、空状態、オフライン状態の文章による説明</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 商用公開前の確認">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>VoiceOverによる主要動線の実機確認</li>
          <li>Dynamic Typeと文字拡大時のレイアウト確認</li>
          <li>色覚特性を想定したコントラスト確認</li>
          <li>スイッチコントロールと外部キーボード確認</li>
          <li>画面回転、ズーム、狭い画面、長い日本語の確認</li>
          <li>読み上げ順序と重複通知の確認</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. 既知の制約">
        <p>
          現在は開発プレビューであり、全支援技術・全端末での検証は完了していません。外部の出典サイトのアクセシビリティはHot
          Newsが管理できません。
        </p>
      </LegalSection>

      <LegalSection title="5. フィードバック">
        <p>
          読めない、操作できない、読み上げが不自然、動きが負担になるなどの問題は、
          <Link href="/support" className="font-semibold text-accent underline underline-offset-4">
            サポート
          </Link>
          へお知らせください。画面名、利用した端末・OS・支援技術、起きたことを添えると確認しやすくなります。
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
