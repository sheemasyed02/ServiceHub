from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = "Service Marketplace API"
    app_version: str = "1.0.0"
    app_env: str = "development"


settings = Settings()
