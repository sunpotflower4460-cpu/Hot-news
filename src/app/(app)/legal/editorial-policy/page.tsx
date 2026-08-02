import Link from 'next/link';
import { LegalDocument, LegalSection } from '@/components/legal/LegalDocument';

export default function EditorialPolicyPage() {
  return (
    <LegalDocument
      title="編集・訂正方針"
      summary="何を明るいニュースとして掲載し、どう確かめるか"
    >
      <LegalSection title="1. 最優先すること">
        <p>
          Hot Newsは、暗いニュースをやさしい言葉へ置き換えるサービスではありません。出来事の中心そのものが、希望、喜び、創造、親切、美しさ、進歩、つながりを含むことを掲載の前提にします。
        </p>
      </LegalSection>

      <LegalSection title="2. 原則掲載しないもの">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>戦争、犯罪、暴力、事故、災害、虐待、炎上を中心とする内容</li>
          <li>死、重い病気、救急、喪失を前提にしなければ成立しない内容</li>
          <li>暗い出来事の後に一つ良い行動があっただけの内容</li>
          <li>根拠のない奇跡、医療効果、予言、噂、広告をニュースに見せかけた内容</li>
          <li>見出しだけで期待や怒りをあおる内容</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 掲載前の確認">
        <p>実ニュースは、少なくとも次の観点を確認してから公開します。</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>出来事自体の明るさ</li>
          <li>読む人への感情的負担</li>
          <li>具体的な前進や改善があるか</li>
          <li>暗い背景へ依存していないか</li>
          <li>出典の信頼性と追跡可能性</li>
          <li>本文・画像・引用の権利</li>
          <li>誇張や重要な条件の省略がないか</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. 出典と複数ソース">
        <p>
          可能な限り、公式発表、原資料、研究機関、自治体、当事者による一次情報を優先します。重要な数値や効果を扱う場合は、独立した追加ソースも確認します。出典へ直接移動できるリンクと公開日を表示します。
        </p>
      </LegalSection>

      <LegalSection title="5. AIの利用">
        <p>
          AIは候補収集、重複判定、分類、要約案、危険表現の検出を補助できます。ただし、AIの出力だけで真実性や掲載可否を確定しません。実運用では、出典との照合、権利確認、公開履歴、使用したモデル・方針バージョンを記録します。
        </p>
      </LegalSection>

      <LegalSection title="6. 公開形式">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>通常版：内容の核を保った短い記事</li>
          <li>画像なし：画像権利が確認できない場合</li>
          <li>安全な短縮版：読む負担や権利上の理由で要点だけを掲載</li>
          <li>出典リンクのみ：転載・要約を行わず元記事へ案内</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. 訂正・非公開・撤回">
        <p>
          誤り、出典変更、権利問題、安全上の問題が判明した場合は、内容の訂正、注記、出典差し替え、隔離、非公開、撤回を行います。重大な訂正は変更理由と日時を記録し、キャッシュや通知からも到達できないようにします。
        </p>
      </LegalSection>

      <LegalSection title="8. 利害関係と広告">
        <p>
          広告、提供、アフィリエイト、運営者との関係がある場合は明示し、通常の記事と区別します。金銭や関係性によって掲載審査を緩めません。ネイティブ広告をニュースに見せかけません。
        </p>
      </LegalSection>

      <LegalSection title="9. 指摘の受付">
        <p>
          事実誤認、権利侵害、不適切な暗い文脈、出典切れを見つけた場合は、
          <Link
            href="/support"
            className="font-semibold text-accent underline underline-offset-4"
          >
            サポート
          </Link>
          から記事IDと理由をお知らせください。
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
