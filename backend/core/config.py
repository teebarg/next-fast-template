from typing import Any, Optional

from pydantic import EmailStr, PostgresDsn, ValidationInfo, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ACCESS_TOKEN_EXPIRE_SECONDS: int = 3000  # 50 minutes
    PROJECT_NAME: str
    FIREBASE_CONFIG: dict = {}
    FIREBASE_CRED: dict = {}

    POSTGRES_SERVER: str
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "postgres"
    STORAGE_BUCKET: str = "bucket"
    SQLALCHEMY_DATABASE_URI: str | None = None

    @field_validator("SQLALCHEMY_DATABASE_URI", mode="before")
    def assemble_db_connection(cls, v: Optional[str], info: ValidationInfo) -> Any:
        if isinstance(v, str):
            return v
        return str(
            PostgresDsn.build(
                scheme="postgresql",
                username=info.data.get("POSTGRES_USER"),
                password=info.data.get("POSTGRES_PASSWORD"),
                host=info.data.get("POSTGRES_SERVER"),
                path=f"{info.data.get('POSTGRES_DB') or ''}",
            )
        )

    EMAIL_TEST_USER: EmailStr = "test@example.com"  # type: ignore
    FIRST_SUPERUSER_FIRSTNAME: str
    FIRST_SUPERUSER_LASTNAME: str
    FIRST_SUPERUSER: EmailStr
    FIRST_SUPERUSER_PASSWORD: str
    USERS_OPEN_REGISTRATION: bool = False

    SMTP_HOST:str = "smtp.gmail.com"
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM_EMAIL: str = "info@example.com"
    SMTP_TLS: bool = True
    SMTP_SSL: bool = False
    SMTP_PORT: int = 587

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
