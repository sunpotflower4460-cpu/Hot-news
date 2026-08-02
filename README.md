# 明るいニュース｜Hot News

世界の中から、**出来事そのものが明るいニュースだけ**を届けるアプリです。

暗いニュースをやさしい表現へ言い換えるのではなく、希望、喜び、創造、前進、親切、美しさを感じられる出来事を選ぶことを最優先にしています。

## 現在の状態

現在はNext.jsの静的出力で作られた、商用化準備中のUI/UXプロトタイプです。

実装済みの土台：

- 明るいニュース専用の編集基準と中央掲載ゲート
- 記事の明るさ、安全性、信頼性、権利、公開形式の型
- 出典、公開日、記事ID、訂正状態、AI補助、確認履歴を表示する信頼性パネル
- 朝・昼・夕・夜で変わる柔らかな空と配色
- ホーム、カテゴリ、記事詳細、お気に入り、週刊まとめ、寝る前モード
- 読み込み、空、エラー、404、オフライン状態
- キーボード、スクリーンリーダー、モーション低減、高コントラストへの配慮
- PWA登録、オフラインフォールバック、アプリショートカット
- プライバシー選択、端末内データの完全削除
- プライバシーポリシー、利用規約、編集・訂正方針、特商法表示、アクセシビリティ方針
- 不具合、訂正、権利、安全性を分けたサポート導線
- 商用設定、リリースブロッカー、CI、CodeQL、依存関係監査、SBOM
- App Store、データ、編集、障害対応、本番アーキテクチャの運用文書

まだ実装されていないもの：

- 実ニュース取得APIと本番データベース
- 候補収集、重複排除、AI補助、複数出典確認の実処理
- 編集管理画面と監査ログ
- 実際の通知配信
- StoreKit購入とサーバー側取引検証
- アカウント、同期、アプリ内アカウント削除
- Capacitor/XcodeプロジェクトとApp Store提出ビルド

> **重要:** `src/mock/articles.ts` の記事、媒体名、URLはUI確認用の架空データです。実在ニュースとして公開、引用、配信しないでください。

## 製品原則

編集上の絶対条件は [`PRODUCT_PRINCIPLES.md`](./PRODUCT_PRINCIPLES.md) にまとめています。

読者向けに表示される記事は、必ず中央の掲載ゲートを通します。実ニュースは次を満たさなければ表示できません。

- 公開可能なステータス
- 安全なHTTPS出典
- 明るさ、安全性、希望、前進、暗い文脈、信頼性、権利の審査
- 出典数、事実確認、編集確認、最終確認、訂正状態を含む公開履歴
- `RETRACTED`ではないこと

記事画面は掲載モードも尊重します。

- `normal`: 通常本文
- `no_image`: 外部画像なしで本文
- `safe_short`: 安全な短縮版だけ
- `source_link_only`: 本文を再掲載せず出典へ案内

## 商用設定

商用状態は [`src/config/commercial.json`](./src/config/commercial.json) に集約しています。

ここで管理するもの：

- プレビュー／本番
- アプリ名、版、Bundle ID、公開URL
- 運営者情報と連絡先
- 法務ページの経路と施行日
- 実ニュースAPI、分析、診断、アカウント、課金、通知、広告、モックの有効状態
- 使用する外部プロバイダ

現在は意図的に`preview`で、機密情報は含みません。秘密鍵やサーバー認証情報をこのJSONやクライアントコードへ入れてはいけません。

## セットアップ

Node.js 20を使用します。

```bash
npm ci
npm run dev
```

開発サーバーは通常`http://localhost:3000`で起動します。

## 品質確認

```bash
npm run check
```

次を順番に実行します。

1. Prettier
2. 商用準備状況のプレビュー検査
3. 依存追加なしのリポジトリ不変条件テスト
4. TypeScript
5. ESLint
6. Next.js静的ビルド

個別実行：

```bash
npm run format:check
npm run commercial:check
npm test
npm run typecheck
npm run lint
npm run build
```

## 本番リリースゲート

```bash
npm run release:check
```

または：

```bash
COMMERCIAL_RELEASE=1 npm run commercial:check
```

本番ゲートは、設定フラグだけでなく次も検査します。

- 運営者、連絡先、Bundle ID、公開HTTPS URL、法務施行日
- モック記事とモックAPIの無効化
- 安全なNext.js最低バージョン
- 読者セレクタからのモック直接参照がないこと
- 記事ページがビルド時の固定モックルートではないこと
- iOSプロジェクト、Privacy Manifest、App Iconの存在
- 課金・通知を有効化した場合のネイティブ／サーバー実装証跡
- 本番のrobots設定
- 法務、セキュリティ、運用文書

現在のリポジトリは、これらが未完了なので本番ゲートを通りません。これは意図した安全動作です。

## 静的出力の確認

```bash
npm run build
npm start
```

追加パッケージを使わず、`out`ディレクトリをローカル配信します。

## 手動確認項目

- iPhone相当の狭い画面と実機
- ライト、ダーク、朝、昼、夕、夜
- キーボードだけでの移動
- VoiceOverなどによる読み上げ
- Dynamic Typeと文字拡大
- OSのモーション低減設定
- 高コントラスト設定
- オフラインと接続復帰
- 記事0件、保存0件、通信エラー、404
- `normal`、`safe_short`、`source_link_only`の表示差
- プライバシー同意と端末内データ削除
- 訂正記事、撤回記事、出典切れ
- 通知・課金機能が無効な本番設定で直接URLが閉じること

## 主な構成

```text
src/app                         画面・ルート
src/components                  UI、法務、サポート、PWA、レイアウト
src/config                      商用設定と機能状態
src/lib/data/selectors.ts       読者向けデータ取得の窓口
src/lib/editorial               明るいニュース掲載基準
src/lib/telemetry               同意・機能フラグ付き送信境界
src/mock                        架空の画面確認データ
src/types                       記事・審査・公開履歴の型
tests                           商用品質の不変条件
scripts                         静的配信と商用リリース検査
docs                            商用運用・App Store・障害対応資料
ios-template                    iOS Privacy Manifestの開始テンプレート
public                          PWA、オフライン、セキュリティヘッダー
.github                         CI、CodeQL、依存監査、Issue運用
```

## 重要文書

- [商用リリース総合チェック](./docs/COMMERCIAL_RELEASE_CHECKLIST.md)
- [App Store提出チェック](./docs/APP_STORE_SUBMISSION.md)
- [App Store日本語メタデータ案](./docs/APP_STORE_METADATA_JA.md)
- [本番アーキテクチャ](./docs/PRODUCTION_ARCHITECTURE.md)
- [データ棚卸し](./docs/DATA_INVENTORY.md)
- [編集運用](./docs/CONTENT_OPERATIONS.md)
- [障害対応](./docs/INCIDENT_RESPONSE.md)
- [セキュリティ報告方針](./SECURITY.md)

## 次の実装順序

1. Next.jsと関連依存を安全な版へ更新し、ロックファイルを再生成
2. 本番DB、公開読取API、編集管理認証を作る
3. 手動で記事を登録・公開・隔離・訂正・撤回できるようにする
4. クライアントを実行時API取得へ変更し、静的モック依存を除く
5. 候補収集、重複排除、出典確認、AI補助を追加
6. 通知を掲載ゲートと撤回機能へ接続
7. Capacitor/Xcodeプロジェクト、Privacy Manifest、署名、実機試験
8. 必要性が確認できた後にStoreKit課金やアカウント同期を追加

検索エンジンには現在のモック記事を登録させない設定です。本番データ、運用体制、法務表示、セキュリティ、実機検証が揃うまで解除しないでください。
