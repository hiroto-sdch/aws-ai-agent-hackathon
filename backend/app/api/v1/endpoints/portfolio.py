from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import structlog

from app.core.deps import get_db, get_current_user
from app.models.user import User
from app.models.portfolio import Portfolio
from app.schemas.portfolio import PortfolioCreate, PortfolioResponse, PortfolioUpdate

router = APIRouter()
logger = structlog.get_logger()

@router.get("/", response_model=List[PortfolioResponse])
async def get_portfolio(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get user's portfolio"""
    try:
        stmt = select(Portfolio).where(Portfolio.user_id == current_user.user_id)
        result = await db.execute(stmt)
        portfolios = result.scalars().all()

        return portfolios

    except Exception as e:
        logger.error("Failed to fetch portfolio", error=str(e), user_id=str(current_user.user_id))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch portfolio"
        )

@router.post("/", response_model=PortfolioResponse, status_code=status.HTTP_201_CREATED)
async def add_portfolio_item(
    portfolio_data: PortfolioCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Add a new portfolio item"""
    try:
        # Check if symbol already exists for this user
        stmt = select(Portfolio).where(
            Portfolio.user_id == current_user.user_id,
            Portfolio.symbol == portfolio_data.symbol
        )
        result = await db.execute(stmt)
        existing = result.scalar_one_or_none()

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Symbol {portfolio_data.symbol} already exists in portfolio"
            )

        # Create new portfolio item
        db_portfolio = Portfolio(
            user_id=current_user.user_id,
            symbol=portfolio_data.symbol,
            quantity=portfolio_data.quantity,
            average_price=portfolio_data.average_price,
            purchase_date=portfolio_data.purchase_date
        )

        db.add(db_portfolio)
        await db.commit()
        await db.refresh(db_portfolio)

        logger.info("Portfolio item added", symbol=portfolio_data.symbol, user_id=str(current_user.user_id))
        return db_portfolio

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to add portfolio item", error=str(e), user_id=str(current_user.user_id))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to add portfolio item"
        )

@router.put("/{portfolio_id}", response_model=PortfolioResponse)
async def update_portfolio_item(
    portfolio_id: str,
    portfolio_update: PortfolioUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update a portfolio item"""
    try:
        # Get portfolio item
        stmt = select(Portfolio).where(
            Portfolio.portfolio_id == portfolio_id,
            Portfolio.user_id == current_user.user_id
        )
        result = await db.execute(stmt)
        portfolio = result.scalar_one_or_none()

        if not portfolio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio item not found"
            )

        # Update fields
        if portfolio_update.quantity is not None:
            portfolio.quantity = portfolio_update.quantity
        if portfolio_update.average_price is not None:
            portfolio.average_price = portfolio_update.average_price
        if portfolio_update.purchase_date is not None:
            portfolio.purchase_date = portfolio_update.purchase_date

        await db.commit()
        await db.refresh(portfolio)

        logger.info("Portfolio item updated", portfolio_id=portfolio_id, user_id=str(current_user.user_id))
        return portfolio

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to update portfolio item", error=str(e), portfolio_id=portfolio_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update portfolio item"
        )

@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_portfolio_item(
    portfolio_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Delete a portfolio item"""
    try:
        # Get portfolio item
        stmt = select(Portfolio).where(
            Portfolio.portfolio_id == portfolio_id,
            Portfolio.user_id == current_user.user_id
        )
        result = await db.execute(stmt)
        portfolio = result.scalar_one_or_none()

        if not portfolio:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Portfolio item not found"
            )

        await db.delete(portfolio)
        await db.commit()

        logger.info("Portfolio item deleted", portfolio_id=portfolio_id, user_id=str(current_user.user_id))

    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to delete portfolio item", error=str(e), portfolio_id=portfolio_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete portfolio item"
        )