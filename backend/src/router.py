from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from init import cmc_client
from auth.auth import get_current_user
from auth.models import UserResponse
from auth.database import get_db
from auth.models import User  # Импортируем модель User, если нужно для возвращаемых данных


router = APIRouter(
    prefix="/cryptocurrencies",
)

@router.get("/")
async def get_cryptocurrencies():
    return await cmc_client.get_listings()

@router.get("/{currency_id}")
async def get_currency(currency_id: int):
    return await cmc_client.get_currency(currency_id)


user_router = APIRouter(
    prefix="/users",
)

@user_router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@user_router.patch("/update-avatar")
async def update_avatar(avatar_url: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Обновить аватар пользователя
    """
    current_user.avatar_url = avatar_url
    db.commit()
    db.refresh(current_user)
    return {"message": "Avatar updated successfully", "avatar_url": current_user.avatar_url}


@user_router.patch("/update-font")
async def update_font(font_url: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Обновить фон пользователя
    """
    current_user.font_url = font_url
    db.commit()
    db.refresh(current_user)
    return {"message": "Font updated successfully", "font_url": current_user.font_url}