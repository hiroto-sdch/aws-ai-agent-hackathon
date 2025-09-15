from pydantic import BaseModel, UUID4
from typing import Optional
from datetime import date, datetime
from decimal import Decimal

class PortfolioBase(BaseModel):
    symbol: str
    quantity: Decimal
    average_price: Decimal
    purchase_date: Optional[date] = None

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioUpdate(BaseModel):
    quantity: Optional[Decimal] = None
    average_price: Optional[Decimal] = None
    purchase_date: Optional[date] = None

class PortfolioResponse(PortfolioBase):
    portfolio_id: UUID4
    user_id: UUID4
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class PortfolioWithMarketData(PortfolioResponse):
    """Portfolio with current market data"""
    current_price: Optional[Decimal] = None
    current_value: Optional[Decimal] = None
    unrealized_pnl: Optional[Decimal] = None
    unrealized_pnl_percent: Optional[Decimal] = None