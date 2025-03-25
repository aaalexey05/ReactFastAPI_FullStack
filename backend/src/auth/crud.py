from sqlalchemy.orm import Session
from .models import User, UserCreate
from .auth import hash_password


# Функция для обновления пароля пользователя
def update_user_password(db: Session, user: User, new_password: str):
    user.password_hash = new_password  # Обновляем поле с хешированным паролем
    db.commit()  # Сохраняем изменения в базе
    db.refresh(user)  # Обновляем объект user с новыми данными
    return user

# Функция для получения пользователя по имени
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Функция для создания нового пользователя
def create_user(db: Session, user: UserCreate):
    from .auth import hash_password  # Перемещаем импорт сюда
    hashed_password = hash_password(user.password)  # Хешируем пароль
    db_user = User(username=user.username, email=user.email, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Функция для получения пользователя по email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()