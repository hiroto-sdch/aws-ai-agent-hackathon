from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Dict, List, Optional
import yfinance as yf
from datetime import datetime, timedelta
import asyncio
import structlog
import pandas as pd

from app.core.database import get_db
from app.models.market_data import MarketData
from app.core.deps import get_current_user
from app.models.user import User

logger = structlog.get_logger()
router = APIRouter()

@router.get("/quote/{symbol}")
async def get_stock_quote(
    symbol: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """個別株式の最新価格を取得"""
    try:
        # Yahoo Finance APIから株価データを取得
        ticker = yf.Ticker(symbol)
        info = ticker.info
        history = ticker.history(period="1d")

        if history.empty:
            raise HTTPException(status_code=404, detail=f"Stock data not found for symbol: {symbol}")

        latest = history.iloc[-1]
        previous_close = info.get('regularMarketPreviousClose', latest['Close'])
        current_price = latest['Close']
        change = current_price - previous_close
        change_percent = (change / previous_close) * 100 if previous_close else 0

        quote_data = {
            "symbol": symbol.upper(),
            "name": info.get('longName', symbol),
            "current_price": float(current_price),
            "previous_close": float(previous_close),
            "change": float(change),
            "change_percent": float(change_percent),
            "volume": int(latest.get('Volume', 0)),
            "market_cap": info.get('marketCap'),
            "pe_ratio": info.get('forwardPE'),
            "dividend_yield": info.get('dividendYield'),
            "fifty_two_week_high": info.get('fiftyTwoWeekHigh'),
            "fifty_two_week_low": info.get('fiftyTwoWeekLow'),
            "last_updated": datetime.now().isoformat()
        }

        # データベースに保存
        market_data = MarketData(
            symbol=symbol.upper(),
            price=current_price,
            volume=int(latest.get('Volume', 0)),
            change_percent=change_percent,
            last_updated=datetime.now(),
            data_source="yahoo_finance"
        )

        # 既存データがあれば更新、なければ新規作成
        existing = await db.get(MarketData, symbol.upper())
        if existing:
            existing.price = current_price
            existing.volume = int(latest.get('Volume', 0))
            existing.change_percent = change_percent
            existing.last_updated = datetime.now()
        else:
            db.add(market_data)

        await db.commit()

        return quote_data

    except Exception as e:
        logger.error("Failed to get stock quote", symbol=symbol, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch stock data")

@router.get("/index")
async def get_market_indices(
    current_user: User = Depends(get_current_user)
):
    """主要市場指数を取得"""
    try:
        indices = {
            "^N225": "日経平均株価",
            "^GSPC": "S&P 500",
            "^IXIC": "NASDAQ",
            "^DJI": "ダウ・ジョーンズ",
            "USDJPY=X": "USD/JPY"
        }

        results = {}

        for symbol, name in indices.items():
            try:
                ticker = yf.Ticker(symbol)
                history = ticker.history(period="2d")

                if not history.empty:
                    latest = history.iloc[-1]
                    previous = history.iloc[-2] if len(history) > 1 else latest

                    current_price = latest['Close']
                    previous_close = previous['Close']
                    change = current_price - previous_close
                    change_percent = (change / previous_close) * 100

                    results[symbol] = {
                        "symbol": symbol,
                        "name": name,
                        "current_price": float(current_price),
                        "change": float(change),
                        "change_percent": float(change_percent),
                        "volume": int(latest.get('Volume', 0)),
                        "last_updated": datetime.now().isoformat()
                    }

            except Exception as e:
                logger.warning("Failed to get index data", symbol=symbol, error=str(e))
                continue

        return {"indices": results}

    except Exception as e:
        logger.error("Failed to get market indices", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch market indices")

@router.get("/search")
async def search_stocks(
    q: str,
    limit: Optional[int] = 10,
    current_user: User = Depends(get_current_user)
):
    """株式銘柄検索"""
    try:
        if len(q) < 1:
            return {"results": []}

        # 簡単な検索実装（実際の実装では検索サービスを使用）
        ticker = yf.Ticker(q.upper())
        info = ticker.info

        if info and info.get('longName'):
            result = {
                "symbol": q.upper(),
                "name": info.get('longName', ''),
                "sector": info.get('sector', ''),
                "industry": info.get('industry', ''),
                "market_cap": info.get('marketCap'),
                "currency": info.get('currency', 'USD')
            }
            return {"results": [result]}

        return {"results": []}

    except Exception as e:
        logger.error("Failed to search stocks", query=q, error=str(e))
        return {"results": []}

@router.get("/history/{symbol}")
async def get_stock_history(
    symbol: str,
    period: str = "1y",  # 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
    interval: str = "1d",  # 1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo
    current_user: User = Depends(get_current_user)
):
    """株価履歴データを取得"""
    try:
        ticker = yf.Ticker(symbol)
        history = ticker.history(period=period, interval=interval)

        if history.empty:
            raise HTTPException(status_code=404, detail=f"No historical data found for symbol: {symbol}")

        # データを辞書形式に変換
        data = []
        for date, row in history.iterrows():
            data.append({
                "date": date.isoformat(),
                "open": float(row['Open']),
                "high": float(row['High']),
                "low": float(row['Low']),
                "close": float(row['Close']),
                "volume": int(row['Volume']) if not pd.isna(row['Volume']) else 0
            })

        return {
            "symbol": symbol.upper(),
            "period": period,
            "interval": interval,
            "data": data
        }

    except Exception as e:
        logger.error("Failed to get stock history", symbol=symbol, error=str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch historical data")