from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .models import Base

# Подключение к базе данных
SQLACLHEMY_DATABASE_URL = "sqlite:///./users.db"

# Настройка SessionLocal для работы с сессиями
engine = create_engine(SQLACLHEMY_DATABASE_URL, connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Создание всех таблиц, если их еще нет
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()  # создание сессии
    try:
        yield db
    finally:
        db.close()  # закрытие сессии