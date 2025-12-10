from pydantic import BaseSettings

class Settings(BaseSettings):
    MONGODB_URI: str
    DATABASE_NAME: str = "todolist_db"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ORIGINS: list = ["*"]  # en producción restringir a dominio Vercel

    class Config:
        env_file = "../.env"  # relativo a backend/
        env_file_encoding = "utf-8"

settings = Settings()
