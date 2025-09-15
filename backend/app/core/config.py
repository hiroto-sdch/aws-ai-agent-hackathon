from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Basic settings
    DEBUG: bool = True
    PROJECT_NAME: str = "Personal Investment Assistant"
    VERSION: str = "1.0.0"

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/investment_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://localhost:9200"

    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # External APIs
    OPENAI_API_KEY: str = ""
    YAHOO_FINANCE_API_KEY: str = ""
    ALPHA_VANTAGE_API_KEY: str = ""

    # CORS
    ALLOWED_HOSTS: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    # Logging
    LOG_LEVEL: str = "INFO"

    # Cache
    CACHE_TTL_SECONDS: int = 300  # 5 minutes
    MARKET_DATA_CACHE_TTL: int = 60  # 1 minute

    # Rate limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 60  # seconds

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()