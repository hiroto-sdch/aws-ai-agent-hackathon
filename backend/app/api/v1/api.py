from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, portfolio
from app.api.v1 import market

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(portfolio.router, prefix="/portfolio", tags=["portfolio"])
api_router.include_router(market.router, prefix="/market", tags=["market"])