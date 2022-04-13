import os
from typing import List
from app.utils import get_db_url

from pydantic import AnyHttpUrl, BaseSettings


class Settings(BaseSettings):
    SECRET_KEY: str = os.environ["SECRET_KEY"]

    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",
        "http://localhost",
    ]

    PROJECT_NAME: str = os.environ["PROJECT_NAME"]

    SQLALCHEMY_DATABASE_URI: str = get_db_url()

    class Config:
        case_sensitive = True


settings = Settings()
