from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from .models import UserCreate, Token, UserResponse
from .crud import create_user, get_user_by_username, get_user_by_email, update_user_password
from .auth import hash_password, verify_password, create_access_token
from .database import get_db


# Pydantic модель для получения данных из JSON
class LoginRequest(BaseModel):
    username: str
    password: str

routes = APIRouter(
    prefix='/auth',  # Префикс для всех маршрутов в этом роутере
)

# Endpoint for register
@routes.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Проверяем, существует ли уже пользователь с таким именем
    db_user_by_username = get_user_by_username(db, user.username)
    if db_user_by_username:
        raise HTTPException(status_code=400, detail="Имя пользователя уже зарегистрировано")
    
    # Проверяем, существует ли уже пользователь с таким email
    db_user_by_email = get_user_by_email(db, user.email)
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")

    # Создаем нового пользователя
    new_user = create_user(db=db, user=user)
    return new_user

# Endpoint for login
@routes.post("/login", response_model=Token)
def login_for_access_token(request: LoginRequest, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, request.username)
    if not db_user or not verify_password(request.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Неверное имя пользователя или пароль")
    
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(data={"sub": db_user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


# Endpoint for change password
@routes.post('/change-password')
def change_password(username: str, old_password: str, new_password: str, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username)
    if not db_user or not verify_password(old_password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Неверное имя пользователя или пароль")
    
    # Хешируем новый пароль
    new_hashed_password = hash_password(new_password)

    # Обновляем пароль в БД
    update_user_password(db, db_user, new_hashed_password)
    return {"message": "Пароль успешно изменен"}

