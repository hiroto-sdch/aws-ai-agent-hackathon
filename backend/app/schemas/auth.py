from pydantic import BaseModel, EmailStr
from typing import Optional

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    risk_tolerance: Optional[str] = "medium"

    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "securepassword123",
                "risk_tolerance": "medium"
            }
        }