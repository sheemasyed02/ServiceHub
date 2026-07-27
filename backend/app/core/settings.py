from functools import lru_cache

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables and `.env`."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application
    app_name: str = Field(default="Service Marketplace API", validation_alias="APP_NAME")
    app_version: str = Field(default="1.0.0", validation_alias="APP_VERSION")
    app_env: str = Field(default="development", validation_alias="APP_ENV")
    debug: bool = Field(default=False, validation_alias="DEBUG")
    host: str = Field(default="127.0.0.1", validation_alias="HOST")
    port: int = Field(default=8000, validation_alias="PORT")

    # Database
    database_url: str = Field(default="", validation_alias="DATABASE_URL")

    # JWT
    jwt_secret: SecretStr = Field(default=SecretStr(""), validation_alias="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", validation_alias="JWT_ALGORITHM")
    access_token_expiry_minutes: int = Field(
        default=60,
        validation_alias="ACCESS_TOKEN_EXPIRE_MINUTES",
    )
    refresh_token_expiry_days: int = Field(
        default=7,
        validation_alias="REFRESH_TOKEN_EXPIRE_DAYS",
    )

    # AWS
    aws_access_key_id: str = Field(default="", validation_alias="AWS_ACCESS_KEY_ID")
    aws_secret_access_key: SecretStr = Field(
        default=SecretStr(""),
        validation_alias="AWS_SECRET_ACCESS_KEY",
    )
    aws_region: str = Field(default="ap-south-1", validation_alias="AWS_REGION")
    aws_s3_bucket: str = Field(default="", validation_alias="AWS_S3_BUCKET")

    # Redis
    redis_url: str = Field(default="", validation_alias="REDIS_URL")

    # Third-party integrations
    google_maps_api_key: SecretStr = Field(
        default=SecretStr(""),
        validation_alias="GOOGLE_MAPS_API_KEY",
    )
    razorpay_key_id: str = Field(default="", validation_alias="RAZORPAY_KEY_ID")
    razorpay_key_secret: SecretStr = Field(
        default=SecretStr(""),
        validation_alias="RAZORPAY_SECRET",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
