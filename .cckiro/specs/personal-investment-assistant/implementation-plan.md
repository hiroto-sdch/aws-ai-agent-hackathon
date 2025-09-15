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

## 2. 改修実装フェーズ

### Phase 1: フロントエンド統合・UI完成 - 2週間
**目標**: sample/v0-AWS_hackathon準拠の完全UI実装とバックエンド統合

#### 主要機能（既存バックエンドAPI活用）
- ✅ ユーザー認証（JWT） - バックエンド実装済み
- 🔄 sample UIベースダッシュボード - 進行中
- 🔄 ポートフォリオ管理UI - sample準拠で実装
- 🔄 チャット相談UI - sample準拠で実装
- 📋 外部API連携（Yahoo Finance） - バックエンド側で追加

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

### 3.1 Phase 1: フロントエンド統合・UI完成 (Week 1-2)

#### Week 1: sample UI実装・バックエンド統合
**Sprint 1.1 - Frontend Integration with Existing Backend**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 | 状態 |
|------|------|------------|--------|----------|------|
| sample UIコンポーネント移植 | Frontend | 2 | P0 | - | ✅ 完了 |
| フロントエンド・バックエンドAPI統合 | Frontend | 2 | P0 | sample UI | 🔄 進行中 |
| ポートフォリオページ実装 | Frontend | 1 | P0 | API統合 | 📋 待機 |
| チャットページ実装 | Frontend | 1 | P0 | API統合 | 📋 待機 |
| 認証フロー統合 | Frontend | 1 | P1 | API統合 | 📋 待機 |

**完了定義 (DoD)**:
- [x] sample/v0-AWS_hackathon UIが移植済み
- [x] 開発環境がDocker Composeで起動済み
- [ ] フロントエンド・バックエンドAPI完全統合
- [ ] 全ページが既存バックエンドAPIと連携
- [ ] レスポンシブデザイン動作確認

#### Week 2: 完全UI実装・市場データ統合
**Sprint 1.2 - Complete UI Implementation & Market Data Integration**

| Task | 担当 | 工数(人日) | 優先度 | 依存関係 | 状態 |
|------|------|------------|--------|----------|------|
| ポートフォリオ管理ページ完成 | Frontend | 2 | P0 | sample UI移植 | 📋 待機 |
| チャット機能ページ完成 | Frontend | 2 | P0 | sample UI移植 | 📋 待機 |
| Yahoo Finance API統合（Backend） | Backend | 1 | P0 | 既存API | 📋 待機 |
| 市場データ表示機能 | Frontend | 1 | P0 | Market API | 📋 待機 |
| レスポンシブ対応・最適化 | Frontend | 1 | P1 | 全UI完成 | 📋 待機 |

**完了定義 (DoD)**:
- [x] 全テーブルのマイグレーション実行済み
- [x] ユーザー登録・ログインが動作中
- [x] JWT認証でAPIアクセス制御済み
- [ ] sample UI準拠の全ページ実装完了
- [ ] リアルタイム市場データ表示
- [ ] フロントエンド・バックエンド完全統合

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

### 4.1 必要なコマンド・スクリプト（現在稼働中）

#### 実装済み・動作確認済みコマンド
```bash
# プロジェクト初期化（実装済み・動作確認済み）
make init

# 開発環境起動（実装済み・動作確認済み）
make dev

# 個別サービス確認
docker ps  # 5サービス稼働中確認済み

# データベースマイグレーション（実装済み・実行済み）
docker exec investment-api alembic upgrade head

# サンプルデータ投入（実装済み）
docker exec investment-api python scripts/seed_data.py

# API動作確認（確認済み）
curl http://localhost:8000/health      # ✅ 正常
curl http://localhost:8000/            # ✅ 正常

# フロントエンド確認（確認済み）
curl http://localhost:3000/            # ✅ 正常
curl http://localhost:3000/dashboard   # ✅ 正常
```

#### sample/v0-AWS_hackathon 準拠の追加フロントエンド機能
```bash
# フロントエンドビルド・起動（sample UI適用後）
cd frontend
npm install    # Radix UI、新パッケージ追加済み
npm run dev    # sample準拠UI起動

# API統合テスト
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'  # ✅ 動作確認済み
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

## 9. 完了基準・成功指標（現状更新）

### 9.1 技術的成功指標
- [x] Docker環境構築・5サービス正常稼働
- [x] API基本動作確認（健康診断・認証API動作）
- [x] データベース構築・マイグレーション完了
- [x] フロントエンド基盤構築・sample UI移植完了
- [ ] sample準拠UI・バックエンドAPI完全統合
- [ ] ポートフォリオ・チャット機能完動

### 9.2 ビジネス成功指標
- [x] ユーザー登録・ログイン機能 動作確認済み
- [x] 基本ダッシュボード表示 完動
- [ ] sample準拠ポートフォリオ管理機能 完動
- [ ] sample準拠チャット相談機能 完動
- [ ] 市場データリアルタイム表示機能 完動

### 9.3 Phase 1完了基準（sample UI統合完了）
- [x] sample/v0-AWS_hackathon UI移植完了
- [x] 既存バックエンドとの接続確立
- [ ] 全ページ（dashboard/portfolio/chat）動作完了
- [ ] sample準拠レスポンシブデザイン動作確認
- [ ] 実データでの動作テスト完了

### 9.4 次期Phase準備完了基準
- [ ] AI機能統合準備（OpenAI API設定）
- [ ] RAG検索機能基盤準備（Elasticsearch活用）
- [ ] 外部API統合準備（Yahoo Finance等）

## 10. sample/v0-AWS_hackathon準拠実装方針

### 10.1 フロントエンドアーキテクチャ対応
**sample構造に合わせたAPI設計:**
- Next.js App Router (`app/` directory) 準拠
- sample APIルート構造をバックエンドAPI経由に変更
- Radix UI + Tailwind CSS デザインシステム活用
- Zustand状態管理でバックエンドAPI統合

### 10.2 バックエンドAPI最小修正方針
**既存FastAPIを活用し最小変更で対応:**
```
既存API構造:
  /api/v1/auth/login     ← sample app/api/auth/login/route.ts 機能
  /api/v1/auth/register  ← sample app/api/auth/signup/route.ts 機能
  /api/v1/portfolio/     ← sample app/api/portfolio/route.ts 機能
  /api/v1/conversations/ ← sample app/api/chat/message/route.ts 機能
  /api/v1/market/        ← 新規追加（Yahoo Finance統合）
```

### 10.3 段階実装戦略
1. **Phase 1週間目**: sample UI移植（✅完了）
2. **Phase 1残り**: フロントエンド・バックエンドAPI統合
3. **Phase 2**: AI機能（OpenAI）、RAG機能追加
4. **Phase 3**: 高度な分析機能追加

この改修された実装計画により、既存のバックエンドを最大限活用しながらsample/v0-AWS_hackathon準拠のモダンUI実装を実現できます。
