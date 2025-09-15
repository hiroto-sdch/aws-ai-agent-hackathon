from sqlalchemy import Column, String, Numeric, BigInteger, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class MarketData(Base):
    __tablename__ = "market_data"

    symbol = Column(String(20), primary_key=True, index=True)
    price = Column(Numeric(15, 4), nullable=False)
    volume = Column(BigInteger)
    change_percent = Column(Numeric(5, 2))
    last_updated = Column(DateTime(timezone=True), nullable=False, default=func.now())
    data_source = Column(String(50))

    def __repr__(self):
        return f"<MarketData(symbol={self.symbol}, price={self.price}, change={self.change_percent}%)>"