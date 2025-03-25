from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Создание базового класса для моделей
Base = declarative_base()

# Модели базы данных
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    avatar_url = Column(String, default="https://api.dicebear.com/7.x/miniavs/svg?seed=8")  # Добавленное поле
    font_url = Column(String, default="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png")  # Добавленное поле


# Схема pydantic для создания пользователя
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

# Схема pydantic для пользователя в базе данных
class UserInDB(UserCreate):
    password_hash: str

class UserResponse(BaseModel):
    username: str
    email: str

    class Config:
        from_attributes = True

# Schemas for token
class Token(BaseModel):
    access_token: str
    token_type: str