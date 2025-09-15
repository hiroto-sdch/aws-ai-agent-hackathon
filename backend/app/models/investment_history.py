from sqlalchemy import Column, String, Numeric, DateTime, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
import enum
from app.core.database import Base

class TransactionType(str, enum.Enum):
    BUY = "buy"
    SELL = "sell"

class InvestmentHistory(Base):
    __tablename__ = "investment_history"

    transaction_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
    symbol = Column(String(20), nullable=False, index=True)
    transaction_type = Column(Enum(TransactionType), nullable=False)
    quantity = Column(Numeric(15, 4), nullable=False)
    price = Column(Numeric(15, 4), nullable=False)
    transaction_date = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="investment_history")

    def __repr__(self):
        return f"<InvestmentHistory(symbol={self.symbol}, type={self.transaction_type}, quantity={self.quantity})>"

# Add relationship to User model
from app.models.user import User
User.investment_history = relationship("InvestmentHistory", back_populates="user")