"""
Seed database with sample data for development
"""
import asyncio
import sys
import os
from pathlib import Path

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from datetime import date, datetime
from decimal import Decimal
from app.core.database import AsyncSessionLocal
from app.models.user import User, RiskTolerance
from app.models.portfolio import Portfolio
from app.models.investment_history import InvestmentHistory, TransactionType
from app.models.market_data import MarketData
from app.utils.security import get_password_hash

async def seed_users():
    """Seed sample users"""
    async with AsyncSessionLocal() as session:
        # Check if users already exist
        from sqlalchemy import select
        stmt = select(User).where(User.email == "demo@example.com")
        result = await session.execute(stmt)
        existing_user = result.scalar_one_or_none()
        if existing_user:
            print("Sample users already exist, skipping...")
            return

        users_data = [
            {
                "email": "demo@example.com",
                "password": "demo123",
                "risk_tolerance": RiskTolerance.MEDIUM
            },
            {
                "email": "conservative@example.com",
                "password": "demo123",
                "risk_tolerance": RiskTolerance.LOW
            },
            {
                "email": "aggressive@example.com",
                "password": "demo123",
                "risk_tolerance": RiskTolerance.HIGH
            }
        ]

        users = []
        for user_data in users_data:
            user = User(
                email=user_data["email"],
                password_hash=get_password_hash(user_data["password"]),
                risk_tolerance=user_data["risk_tolerance"]
            )
            session.add(user)
            users.append(user)

        await session.commit()
        print(f"Created {len(users)} sample users")
        return users

async def seed_portfolios():
    """Seed sample portfolios"""
    async with AsyncSessionLocal() as session:
        # Get demo user
        from sqlalchemy import select
        stmt = select(User).where(User.email == "demo@example.com")
        result = await session.execute(stmt)
        demo_user = result.scalar_one_or_none()

        if not demo_user:
            print("Demo user not found, skipping portfolio seed")
            return

        # Check if portfolio already exists
        stmt = select(Portfolio).where(Portfolio.user_id == demo_user.user_id)
        existing = await session.execute(stmt)
        if existing.scalar_one_or_none():
            print("Sample portfolios already exist, skipping...")
            return

        portfolio_data = [
            {"symbol": "AAPL", "quantity": Decimal("10"), "average_price": Decimal("150.00")},
            {"symbol": "GOOGL", "quantity": Decimal("5"), "average_price": Decimal("2500.00")},
            {"symbol": "TSLA", "quantity": Decimal("20"), "average_price": Decimal("200.00")},
            {"symbol": "MSFT", "quantity": Decimal("15"), "average_price": Decimal("300.00")},
        ]

        portfolios = []
        for data in portfolio_data:
            portfolio = Portfolio(
                user_id=demo_user.user_id,
                symbol=data["symbol"],
                quantity=data["quantity"],
                average_price=data["average_price"],
                purchase_date=date(2024, 1, 1)
            )
            session.add(portfolio)
            portfolios.append(portfolio)

        await session.commit()
        print(f"Created {len(portfolios)} sample portfolio entries")

async def seed_market_data():
    """Seed sample market data"""
    async with AsyncSessionLocal() as session:
        # Check if market data already exists
        existing = await session.get(MarketData, "AAPL")
        if existing:
            print("Sample market data already exists, skipping...")
            return

        market_data = [
            {
                "symbol": "AAPL",
                "price": Decimal("175.50"),
                "volume": 45000000,
                "change_percent": Decimal("2.30"),
                "data_source": "yahoo_finance"
            },
            {
                "symbol": "GOOGL",
                "price": Decimal("2650.00"),
                "volume": 1200000,
                "change_percent": Decimal("-1.20"),
                "data_source": "yahoo_finance"
            },
            {
                "symbol": "TSLA",
                "price": Decimal("220.00"),
                "volume": 35000000,
                "change_percent": Decimal("5.80"),
                "data_source": "yahoo_finance"
            },
            {
                "symbol": "MSFT",
                "price": Decimal("320.00"),
                "volume": 20000000,
                "change_percent": Decimal("1.50"),
                "data_source": "yahoo_finance"
            },
        ]

        for data in market_data:
            market_entry = MarketData(**data, last_updated=datetime.now())
            session.add(market_entry)

        await session.commit()
        print(f"Created {len(market_data)} sample market data entries")

async def main():
    """Main seeding function"""
    print("🌱 Seeding database with sample data...")

    try:
        await seed_users()
        await seed_portfolios()
        await seed_market_data()
        print("✅ Database seeding completed successfully!")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(main())