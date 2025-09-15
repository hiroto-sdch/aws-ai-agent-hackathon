from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import structlog

from app.core.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate

router = APIRouter()
logger = structlog.get_logger()

@router.get("/profile", response_model=UserResponse)
async def get_user_profile(
    current_user: User = Depends(get_current_user)
):
    """Get current user profile"""
    return current_user

@router.put("/profile", response_model=UserResponse)
async def update_user_profile(
    profile_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Update user profile"""
    try:
        # Update user fields
        if profile_update.risk_tolerance is not None:
            current_user.risk_tolerance = profile_update.risk_tolerance

        await db.commit()
        await db.refresh(current_user)

        logger.info("User profile updated", user_id=str(current_user.user_id))
        return current_user

    except Exception as e:
        logger.error("Profile update failed", error=str(e), user_id=str(current_user.user_id))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Profile update failed"
        )