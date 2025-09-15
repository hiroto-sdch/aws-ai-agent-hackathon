# 個人投資家向けパーソナル投資アシスタント - 設計書

## 1. システム全体アーキテクチャ

### 1.1 アーキテクチャ概要
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │  External APIs  │
│   React/Next.js │◄──►│   Python/FastAPI│◄──►│ Yahoo Finance   │
│                 │    │                 │    │ Alpha Vantage   │
│ - Dashboard     │    │ - Core API      │    │ Bloomberg       │
│ - Chat UI       │    │ - CoreAgent     │    │                 │
│ - Portfolio     │    │ - RAG Engine    │    └─────────────────┘
│ - Settings      │    │                 │           │
└─────────────────┘    └─────────────────┘           │
         │                        │                  │
         │              ┌─────────────────┐          │
         │              │   Data Layer    │          │
         └──────────────►│                 │◄─────────┘
                        │ - PostgreSQL    │
                        │ - Elasticsearch │
                        │ - Redis Cache   │
                        └─────────────────┘
```

### 1.2 主要コンポーネント
1. **Frontend Layer**: ユーザーインターフェース
2. **API Gateway**: リクエストルーティングと認証
3. **Core Service**: ビジネスロジック
4. **CoreAgent Service**: AI推論と会話管理
5. **RAG Service**: 情報検索と要約
6. **Data Service**: データ管理と永続化
7. **External API Service**: 外部データ取得

## 2. データベース設計

### 2.1 PostgreSQL スキーマ設計

#### Users テーブル
```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    risk_tolerance VARCHAR(10) CHECK (risk_tolerance IN ('low', 'medium', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);
```

#### Portfolios テーブル
```sql
CREATE TABLE portfolios (
    portfolio_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    symbol VARCHAR(20) NOT NULL,
    quantity DECIMAL(15,4) NOT NULL,
    average_price DECIMAL(15,4) NOT NULL,
    purchase_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Investment_history テーブル
```sql
CREATE TABLE investment_history (
    transaction_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    symbol VARCHAR(20) NOT NULL,
    transaction_type VARCHAR(10) CHECK (transaction_type IN ('buy', 'sell')),
    quantity DECIMAL(15,4) NOT NULL,
    price DECIMAL(15,4) NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Conversations テーブル
```sql
CREATE TABLE conversations (
    conversation_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    message_type VARCHAR(10) CHECK (message_type IN ('user', 'assistant')),
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Market_data テーブル (キャッシュ用)
```sql
CREATE TABLE market_data (
    symbol VARCHAR(20) PRIMARY KEY,
    price DECIMAL(15,4) NOT NULL,
    volume BIGINT,
    change_percent DECIMAL(5,2),
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL,
    data_source VARCHAR(50)
);
```

### 2.2 Elasticsearch インデックス設計

#### News インデックス
```json
{
  "mappings": {
    "properties": {
      "news_id": {"type": "keyword"},
      "headline": {"type": "text", "analyzer": "standard"},
      "summary": {"type": "text", "analyzer": "standard"},
      "content": {"type": "text", "analyzer": "standard"},
      "source": {"type": "keyword"},
      "symbols": {"type": "keyword"},
      "published_date": {"type": "date"},
      "relevance_score": {"type": "float"},
      "embedding": {"type": "dense_vector", "dims": 1536}
    }
  }
}
```

## 3. APIエンドポイント設計

### 3.1 認証系API
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/refresh
DELETE /api/auth/logout
```

### 3.2 ユーザー・ポートフォリオAPI
```
GET /api/user/profile
PUT /api/user/profile
GET /api/portfolio
POST /api/portfolio/import
PUT /api/portfolio/{portfolio_id}
DELETE /api/portfolio/{portfolio_id}
```

### 3.3 マーケットデータAPI
```
GET /api/market/quote?symbols={symbols}
GET /api/market/index?name={index}&period={period}
GET /api/market/history?symbol={symbol}&period={period}
```

### 3.4 AI・アドバイスAPI
```
POST /api/advice/summary
POST /api/advice/portfolio
POST /api/chat/message
GET /api/chat/history?limit={limit}
```

### 3.5 ニュース・検索API
```
GET /api/news/search?q={query}&symbols={symbols}
GET /api/news/latest?limit={limit}
```

## 4. CoreAgent設計

### 4.1 CoreAgentワークフロー
```
┌─────────────────┐
│ User Message    │
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Context Builder │ ← User Profile, Portfolio, History
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Intent Classifier│ → short_term | long_term | summary | analysis
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Data Collector  │ ← Market APIs, News APIs
└────────┬────────┘
         │
         v
┌─────────────────┐
│ RAG Retrieval   │ ← Elasticsearch, Vector Search
└────────┬────────┘
         │
         v
┌─────────────────┐
│ LLM Inference   │ → Structured Response
└────────┬────────┘
         │
         v
┌─────────────────┐
│ Memory Update   │ → Save to Database
└─────────────────┘
```

### 4.2 プロンプトテンプレート設計

#### システムプロンプト
```
あなたは個人投資家向けのパーソナル投資アシスタントです。
以下の情報を基に、ユーザーの投資判断をサポートしてください。

ユーザープロファイル:
- リスク許容度: {risk_tolerance}
- 投資経験: {investment_experience}

現在のポートフォリオ:
{portfolio_summary}

市場データ:
{market_data}

関連ニュース:
{relevant_news}

回答は以下の構造で提供してください:
1. 要約（3行以内）
2. 詳細分析
3. 推奨アクション
4. リスク評価
5. 根拠となる情報源
```

## 5. RAG（Retrieval-Augmented Generation）設計

### 5.1 RAGパイプライン
```
Query → Query Enhancement → Vector Search → Rerank → Context Assembly → LLM
```

### 5.2 検索戦略
1. **キーワード検索**: Elasticsearch BM25スコア
2. **セマンティック検索**: OpenAI Embeddings + ベクトル類似度
3. **ハイブリッド検索**: キーワード + セマンティック検索の組み合わせ
4. **リランキング**: 関連度スコアによる再順位付け

### 5.3 コンテキスト構築
```python
class ContextBuilder:
    def build_context(self, query: str, user_profile: dict) -> dict:
        # 1. ユーザーコンテキスト取得
        user_context = self.get_user_context(user_profile)

        # 2. 市場データ取得
        market_data = self.get_market_data(query)

        # 3. ニュース検索
        relevant_news = self.search_news(query, user_profile.get('portfolio'))

        # 4. 決算情報検索
        earnings_data = self.search_earnings(query)

        return {
            'user_context': user_context,
            'market_data': market_data,
            'relevant_news': relevant_news,
            'earnings_data': earnings_data
        }
```

## 6. キャッシュ戦略

### 6.1 Redis キャッシュ設計
```
market_data:{symbol} → TTL: 60秒
news:latest → TTL: 300秒
user_portfolio:{user_id} → TTL: 3600秒
api_response:{hash} → TTL: 1800秒
```

### 6.2 キャッシュ更新戦略
1. **Write-Through**: データ書き込み時にキャッシュも更新
2. **Time-based Expiration**: TTLベースの自動削除
3. **Event-based Invalidation**: データ変更時のキャッシュ削除

## 7. エラーハンドリング設計

### 7.1 エラー分類
```python
class ErrorTypes:
    VALIDATION_ERROR = "VALIDATION_ERROR"
    AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"
    AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR"
    EXTERNAL_API_ERROR = "EXTERNAL_API_ERROR"
    DATABASE_ERROR = "DATABASE_ERROR"
    AI_SERVICE_ERROR = "AI_SERVICE_ERROR"
    RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR"
    SYSTEM_ERROR = "SYSTEM_ERROR"
```

### 7.2 エラーレスポンス構造
```json
{
  "error": {
    "code": "EXTERNAL_API_ERROR",
    "message": "Market data is temporarily unavailable",
    "details": "Yahoo Finance API returned 503",
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_123456789"
  }
}
```

### 7.3 リトライ戦略
```python
class RetryStrategy:
    EXTERNAL_API_RETRY = {
        'max_attempts': 3,
        'backoff_factor': 2,
        'backoff_max': 30
    }

    AI_SERVICE_RETRY = {
        'max_attempts': 2,
        'backoff_factor': 1.5,
        'backoff_max': 10
    }
```

## 8. セキュリティ設計

### 8.1 認証・認可
1. **JWT Token**: アクセストークン（15分）+ リフレッシュトークン（7日）
2. **OAuth2.0**: 外部APIアクセス用
3. **Role-based Access Control**: ユーザー権限管理

### 8.2 データ暗号化
1. **保存時暗号化**: AES-256でユーザーデータを暗号化
2. **通信暗号化**: TLS1.3による通信保護
3. **API Key管理**: AWS Secrets Managerでキー管理

## 9. 監視・ログ設計

### 9.1 ログ設計
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "service": "core-api",
  "request_id": "req_123456789",
  "user_id": "user_789",
  "action": "portfolio_advice",
  "duration_ms": 1250,
  "status": "success",
  "metadata": {
    "symbols": ["AAPL", "GOOGL"],
    "advice_type": "long_term"
  }
}
```

### 9.2 監視メトリクス
1. **アプリケーション指標**: レスポンス時間、エラー率、スループット
2. **ビジネス指標**: アドバイス生成数、ユーザー満足度
3. **システム指標**: CPU、メモリ、ディスク使用率
4. **外部API指標**: API応答時間、成功率

## 10. パフォーマンス最適化

### 10.1 データベース最適化
```sql
-- インデックス設計
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_investment_history_user_symbol ON investment_history(user_id, symbol);
CREATE INDEX idx_market_data_symbol_updated ON market_data(symbol, last_updated);
CREATE INDEX idx_conversations_user_created ON conversations(user_id, created_at);
```

### 10.2 API最適化
1. **Connection Pooling**: データベース接続プール
2. **Query Batching**: 複数クエリの一括実行
3. **Async Processing**: 非同期処理による並列実行
4. **CDN**: 静的コンテンツの配信最適化

## 11. デプロイメント設計

### 11.1 Docker コンテナ構成
```yaml
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]

  api:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL
      - REDIS_URL
      - JWT_SECRET

  postgres:
    image: postgres:15
    volumes: ["./data/postgres:/var/lib/postgresql/data"]

  redis:
    image: redis:7

  elasticsearch:
    image: elasticsearch:8.11.0
```

### 11.2 AWS インフラ構成
```
ALB → ECS Fargate → RDS PostgreSQL
                 → ElastiCache Redis
                 → OpenSearch
                 → S3 (静的ファイル)
                 → CloudWatch (監視)
```

この設計書の内容について、追加・修正したい点はありますか？
確認・承認いただけましたら、実装計画フェーズに進みます。