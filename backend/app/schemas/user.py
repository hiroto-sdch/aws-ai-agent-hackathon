from pydantic import BaseModel, EmailStr, UUID4
from typing import Optional
from datetime import datetime
from app.models.user import RiskTolerance

class UserBase(BaseModel):
    email: EmailStr
    risk_tolerance: Optional[RiskTolerance] = RiskTolerance.MEDIUM

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    risk_tolerance: Optional[RiskTolerance] = None

class UserResponse(UserBase):
    user_id: UUID4
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class CurrentUser(UserResponse):
    """Extended user info for authenticated user"""
    pass