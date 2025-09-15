# 個人投資家向けパーソナル投資アシスタント - 実装計画書（改修版）

## 1. 実装概要

### 1.1 開発方針
- **既存バックエンド活用**: 実装済みFastAPIバックエンドを基盤として活用
- **サンプルUI基準**: sample/v0-AWS_hackathonのフロントエンドアーキテクチャに準拠
- **段階的機能追加**: バックエンド統合 → UI拡張 → AI機能強化の順序
- **最小変更原則**: バックエンドAPIは最小限の修正のみ

### 1.2 技術スタック（確定済み）
```
Frontend: Next.js 14 + TypeScript + Tailwind CSS + Radix UI + Zustand
Backend: Python 3.11 + FastAPI + SQLAlchemy + Alembic (実装済み)
Database: PostgreSQL 15 + Redis 7 + Elasticsearch 8.11 (稼働中)
AI/ML: OpenAI API + LangChain + Sentence-Transformers (Phase 2で追加)
Infrastructure: Docker + Docker Compose (現在稼働中)
```

### 1.3 現在の状態
**✅ 完了済み機能:**
- Docker環境（5サービス稼働中）
- FastAPI バックエンド（認証、CRUD API実装済み）
- PostgreSQL + Redis + Elasticsearch 構成
- Next.js フロントエンド基盤
- 基本認証システム（JWT対応）
- データベーススキーマ（全テーブル作成済み）

**🔄 進行中機能:**
- sample/v0-AWS_hackathon ベースのUI実装
- フロントエンド・バックエンド統合

## 2. 実装フェーズ

### Phase 1: MVP (Minimum Viable Product) - 4週間
**目標**: 基本的な投資相談機能の提供

#### 主要機能
- ユーザー認証（JWT）
- 基本ダッシュボード
- ポートフォリオ管理
- シンプルなチャット相談
- 外部API連携（Yahoo Finance）

### Phase 2: Core Features - 6週間
**目標**: AI機能とRAGの実装

#### 主要機能
- CoreAgent統合
- RAG検索エンジン
- ニュース分析機能
- 高度なポートフォリオ分析
- リアルタイムデータ更新

### Phase 3: Advanced Features - 4週間
**目標**: 高度な機能と最適化

#### 主要機能
- 複数外部API統合
- 高度な可視化
- 通知機能
- パフォーマンス最適化
- セキュリティ強化

## 3. 詳細実装スケジュール

### 3.1 Phase 1: MVP実装 (Week 1-4)

#### Week 1: インフラ・基盤構築
**Sprint 1.1 - Infrastructure Setup**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| Docker環境構築 | DevOps | 1 | P0 | - |
| PostgreSQL + Redis セットアップ | DevOps | 1 | P0 | Docker |
| CI/CD パイプライン構築 | DevOps | 2 | P0 | - |
| AWS基本インフラ構築 | DevOps | 2 | P0 | - |
| プロジェクト構造作成 | Lead | 1 | P0 | - |

**完了定義 (DoD)**:
- [ ] 開発環境がDocker Composeで起動可能
- [ ] GitHub Actions でCI/CDが動作
- [ ] AWS環境に最低限のリソースがデプロイ済み
- [ ] コード品質チェック（Lint, Format）が自動実行

#### Week 2: バックエンドAPI基盤
**Sprint 1.2 - Backend Foundation**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| FastAPI プロジェクト作成 | Backend | 1 | P0 | Infrastructure |
| データベーススキーマ実装 | Backend | 2 | P0 | PostgreSQL |
| ユーザー認証API実装 | Backend | 3 | P0 | DB Schema |
| JWT認証ミドルウェア | Backend | 1 | P0 | Auth API |
| 基本的なCRUD API実装 | Backend | 2 | P1 | Auth |

**完了定義 (DoD)**:
- [ ] 全テーブルのマイグレーション実行可能
- [ ] ユーザー登録・ログインが動作
- [ ] JWT認証でAPIアクセス制御
- [ ] API仕様書(OpenAPI)が自動生成
- [ ] 単体テストカバレッジ80%以上

#### Week 3: フロントエンド基盤
**Sprint 1.3 - Frontend Foundation**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| Next.js プロジェクト作成 | Frontend | 1 | P0 | - |
| 認証機能実装 | Frontend | 2 | P0 | Auth API |
| 基本レイアウト・ルーティング | Frontend | 2 | P0 | Next.js |
| API クライアント実装 | Frontend | 1 | P0 | Backend API |
| 状態管理（Zustand）設定 | Frontend | 1 | P1 | - |

**完了定義 (DoD)**:
- [ ] ログイン・サインアップ画面完成
- [ ] ダッシュボード基本レイアウト完成
- [ ] APIとの通信確立
- [ ] レスポンシブデザイン対応
- [ ] TypeScript型安全性確保

#### Week 4: ポートフォリオ管理・外部API
**Sprint 1.4 - Portfolio & External API**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| Yahoo Finance API 統合 | Backend | 2 | P0 | - |
| ポートフォリオ CRUD API | Backend | 2 | P0 | Auth |
| マーケットデータ取得機能 | Backend | 1 | P0 | Yahoo API |
| ポートフォリオ画面実装 | Frontend | 3 | P0 | Portfolio API |
| 基本的な株価表示機能 | Frontend | 1 | P1 | Market API |

**完了定義 (DoD)**:
- [ ] Yahoo Finance から株価データ取得可能
- [ ] ポートフォリオの追加・編集・削除機能
- [ ] 保有銘柄の損益計算表示
- [ ] リアルタイム株価表示
- [ ] エラーハンドリング実装

### 3.2 Phase 2: Core Features実装 (Week 5-10)

#### Week 5-6: AIエンジン基盤
**Sprint 2.1-2.2 - AI Infrastructure**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| OpenAI API 統合 | AI/Backend | 2 | P0 | - |
| CoreAgent基本実装 | AI/Backend | 4 | P0 | OpenAI |
| プロンプトテンプレート作成 | AI/Backend | 2 | P0 | CoreAgent |
| チャット機能バックエンド | Backend | 3 | P0 | CoreAgent |
| 会話履歴管理 | Backend | 2 | P1 | Chat Backend |

**完了定義 (DoD)**:
- [ ] OpenAI GPTとの通信確立
- [ ] 基本的な投資相談応答が可能
- [ ] 会話履歴の保存・取得機能
- [ ] プロンプトエンジニアリング完了
- [ ] レート制限・エラー処理実装

#### Week 7-8: RAG検索エンジン
**Sprint 2.3-2.4 - RAG Implementation**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| Elasticsearch セットアップ | DevOps | 1 | P0 | - |
| ベクトル検索機能実装 | AI/Backend | 3 | P0 | Elasticsearch |
| ニュースクローリング機能 | Backend | 3 | P0 | - |
| RAGパイプライン実装 | AI/Backend | 4 | P0 | Vector Search |
| ハイブリッド検索実装 | AI/Backend | 2 | P1 | RAG Pipeline |

**完了定義 (DoD)**:
- [ ] ニュースデータの自動収集・インデックス化
- [ ] セマンティック検索機能の動作確認
- [ ] RAGによる回答生成の動作確認
- [ ] 検索精度の基準値クリア
- [ ] バッチ処理のスケジューリング

#### Week 9-10: フロントエンド機能拡張
**Sprint 2.5-2.6 - Frontend Enhancement**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| チャットUI実装 | Frontend | 3 | P0 | Chat Backend |
| ダッシュボード機能拡張 | Frontend | 3 | P0 | Market API |
| 可視化コンポーネント | Frontend | 3 | P0 | Chart Library |
| レスポンシブ対応強化 | Frontend | 2 | P1 | UI Components |
| ユーザビリティ改善 | Frontend | 2 | P1 | - |

**完了定義 (DoD)**:
- [ ] チャット機能の完全動作
- [ ] インタラクティブなチャート表示
- [ ] モバイル対応完了
- [ ] ユーザビリティテスト合格
- [ ] パフォーマンス基準値クリア

### 3.3 Phase 3: Advanced Features実装 (Week 11-14)

#### Week 11-12: 高度なAI機能
**Sprint 3.1-3.2 - Advanced AI Features**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| 複数API統合 (Alpha Vantage) | Backend | 2 | P1 | - |
| ポートフォリオ最適化機能 | AI/Backend | 4 | P1 | Portfolio API |
| リスク分析機能 | AI/Backend | 3 | P1 | Market Data |
| パーソナライゼーション強化 | AI/Backend | 3 | P1 | User History |
| A/Bテスト機能 | Backend | 1 | P2 | - |

**完了定義 (DoD)**:
- [ ] 複数データソースからの情報統合
- [ ] ポートフォリオ最適化提案の実装
- [ ] リスク指標の自動計算
- [ ] ユーザー行動に基づく学習機能
- [ ] 推奨精度の向上確認

#### Week 13-14: 最終統合・最適化
**Sprint 3.3-3.4 - Integration & Optimization**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 |
|------|------|------------|--------|----------|
| パフォーマンス最適化 | Full Stack | 3 | P0 | All Features |
| セキュリティ強化 | Backend/DevOps | 2 | P0 | - |
| 通知機能実装 | Full Stack | 2 | P1 | - |
| 本番環境セットアップ | DevOps | 2 | P0 | - |
| 総合テスト・デバッグ | Full Team | 3 | P0 | All Features |

**完了定義 (DoD)**:
- [ ] 全機能の統合テスト完了
- [ ] パフォーマンス要件の達成
- [ ] セキュリティ監査完了
- [ ] 本番環境での動作確認
- [ ] ユーザー受け入れテスト合格

## 4. 開発環境・ツール

### 4.1 必要なコマンド・スクリプト

#### 初期セットアップ
```bash
# プロジェクト初期化
make init

# 開発環境起動
make dev

# テスト実行
make test

# データベースマイグレーション
make db-migrate

# サンプルデータ投入
make db-seed
```

#### 開発フロー
```bash
# 新機能ブランチ作成
git checkout -b feature/portfolio-api

# フォーマット・Lint
make format
make lint

# 単体テスト
make test-unit

# 統合テスト
make test-integration

# E2Eテスト
make test-e2e

# ビルド
make build

# デプロイ
make deploy-staging
make deploy-prod
```

### 4.2 Makefile 構成例
```makefile
.PHONY: init dev test build deploy

init:
	docker-compose build
	docker-compose run --rm api alembic upgrade head
	docker-compose run --rm api python scripts/seed_data.py

dev:
	docker-compose up -d

test:
	docker-compose run --rm api pytest
	cd frontend && npm test

build:
	docker build -t investment-assistant-api ./backend
	cd frontend && npm run build

deploy-staging:
	aws ecr get-login-password | docker login --username AWS --password-stdin
	docker push investment-assistant-api:latest
	aws ecs update-service --cluster staging --service api --force-new-deployment

lint:
	docker-compose run --rm api flake8 .
	docker-compose run --rm api black --check .
	cd frontend && npm run lint

format:
	docker-compose run --rm api black .
	cd frontend && npm run format
```

## 5. テスト戦略

### 5.1 テストピラミッド
```
      E2E Tests (10%)
   ──────────────────
  Integration Tests (20%)
 ──────────────────────────
Unit Tests (70%)
```

### 5.2 テスト種別

#### 単体テスト
- **Backend**: pytest + pytest-asyncio
- **Frontend**: Jest + React Testing Library
- **カバレッジ目標**: 80%以上

#### 統合テスト
- **API統合**: FastAPI TestClient
- **Database統合**: pytest-postgresql
- **外部API**: Mock/Stub使用

#### E2Eテスト
- **ツール**: Playwright
- **シナリオ**: 主要ユーザージャーニー
- **頻度**: リリース前必須

## 6. リスク管理・依存関係

### 6.1 技術的リスク

| リスク | 影響度 | 確率 | 対策 |
|--------|--------|------|------|
| 外部API制限 | High | Medium | 複数API対応、キャッシュ強化 |
| AI応答品質 | Medium | Medium | プロンプト改善、ファインチューニング |
| パフォーマンス問題 | High | Low | 早期負荷テスト、最適化 |
| セキュリティ脆弱性 | High | Low | 定期監査、ペネトレーションテスト |

### 6.2 依存関係管理

#### クリティカルパス
```
Infrastructure Setup → Database Schema → Auth API → Core Features → AI Integration → Frontend Integration → Testing & Deployment
```

#### 並列実行可能タスク
- フロントエンド基盤 ∥ バックエンドAPI開発
- AI機能開発 ∥ 外部API統合
- テスト作成 ∥ 機能実装

## 7. 品質保証

### 7.1 コード品質基準
- **Python**: Black (formatter), Flake8 (linter), MyPy (type check)
- **TypeScript**: Prettier (formatter), ESLint (linter)
- **コミット**: Conventional Commits
- **コードレビュー**: 必須2名承認

### 7.2 継続的インテグレーション
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          make test
          make lint
          make security-check
```

## 8. デプロイメント計画

### 8.1 環境構成
- **Development**: Docker Compose (ローカル)
- **Staging**: AWS ECS (本番同等環境)
- **Production**: AWS ECS (Auto Scaling)

### 8.2 デプロイメント戦略
- **Blue-Green Deployment**: ゼロダウンタイム
- **Feature Flags**: 段階的機能有効化
- **Database Migration**: 後方互換性維持

## 9. 完了基準・成功指標

### 9.1 技術的成功指標
- [ ] 全自動テストが通過（95%以上）
- [ ] API応答時間 < 3秒
- [ ] フロントエンド初期表示 < 2秒
- [ ] テストカバレッジ > 80%
- [ ] セキュリティ監査 合格

### 9.2 ビジネス成功指標
- [ ] ユーザー登録機能 完動
- [ ] 基本的な投資相談応答 完動
- [ ] ポートフォリオ管理機能 完動
- [ ] 市場データ表示機能 完動
- [ ] ユーザビリティテスト 合格

### 9.3 運用準備完了基準
- [ ] 監視・アラート設定完了
- [ ] ログ分析環境構築完了
- [ ] バックアップ・復旧手順確立
- [ ] 運用マニュアル作成完了
- [ ] 障害対応手順作成完了

この実装計画について、調整が必要な点や追加したい要素はありますか？
承認いただけましたら、実装フェーズに進むことができます。