from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import router as router_crypto
from auth.auth_routes import routes as auth_routes
from router import user_router as user_router

app = FastAPI()

# Подключаем маршруты для криптовалюты
app.include_router(router_crypto)

# Подключаем ммаршруты для аутентификации
app.include_router(auth_routes)  # Включаем маршруты для регистрации и входа

app.include_router(user_router)  # Включаем маршруты для работы с пользователями (защищенные маршруты)

# Найстройка CORS
origins = [
    "https://127.0.0.1:5173",
    "https://localhost",
    "https://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)