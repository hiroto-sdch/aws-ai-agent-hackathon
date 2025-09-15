---
description: "spec-driven development (/kiro)"
argument-hint: "[spec-name] [short-goal]"
# mkdir を実行したいので Bash(mkdir:*) を許可
allowed-tools: Bash(mkdir:*)
---

Claude Codeを用いた「Kiro風の spec-driven development」を行います。
与えられた引数から **spec名** と **タスク概要** を決めて進めます。

# 0. 事前準備
- 作業用ディレクトリ`.cckiro/specs`を用意します。
- spec名は引数 `$1`（なければ "default-spec"）を kebab-case で使います。
- 例: `/kiro create-article-component "記事コンポーネントを作る"`

!`mkdir -p ./.cckiro/specs`

# 1. 要件フェーズ（requirements.md）
- ユーザーの目的（$2 以降の `$ARGUMENTS`）を要件に翻訳し、**./.cckiro/specs/$1/requirements.md** を作成してください。
- 非機能要件（性能・運用・セキュリティ・ログ設計）も列挙。
- ユーザーに差分確認を求め、フィードバック反映を繰り返します。

# 2. 設計フェーズ（design.md）
- 要件を満たすためのシステム/モジュール構成、I/O、データ構造、インターフェース、エラー方針を
  **design.md** として作成。図が必要なら簡易テキスト図で。
- ユーザー承認まで反復。

# 3. 実装計画フェーズ（implementation-plan.md）
- タスク分割、優先度、見積り、依存関係、完了定義(DoD)を計画化し **implementation-plan.md** を作成。
- CLI/Make/スクリプトの実行順序があれば明記。承認まで反復。

# 4. 実装フェーズ
- 設計と計画に従い、最小単位から実装を開始。
- 各ステップで「要件」「設計」「計画」との整合性を自己チェック。
- 変更が必要なら必ず上流ドキュメントに反映してから実装を更新。

# 出力先
- すべて **./.cckiro/specs/$1/** に保存してください。
- 期待ファイル: requirements.md, design.md, implementation-plan.md（＋必要に応じて補助ファイル）

# メモ
- 以降の会話では「まずドキュメント→承認→実装」の順で進めてください。
- `$ARGUMENTS` が空なら、ユーザーに spec名と目的を短く尋ねてください。
