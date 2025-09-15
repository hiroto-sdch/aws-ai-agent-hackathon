from sqlalchemy import Column, String, Numeric, Date, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"

    portfolio_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    symbol = Column(String(20), nullable=False, index=True)
    quantity = Column(Numeric(15, 4), nullable=False)
    average_price = Column(Numeric(15, 4), nullable=False)
    purchase_date = Column(Date)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), default=func.now())

    # Relationships
    user = relationship("User", back_populates="portfolios")

    def __repr__(self):
        return f"<Portfolio(symbol={self.symbol}, quantity={self.quantity}, price={self.average_price})>"

# Add relationship to User model
from app.models.user import User
User.portfolios = relationship("Portfolio", back_populates="user")