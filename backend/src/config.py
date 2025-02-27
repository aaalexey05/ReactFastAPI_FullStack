from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    CMC_API_KEY: str = "da9aa8be-a868-493e-864d-ece0a8deb8a5"
    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()