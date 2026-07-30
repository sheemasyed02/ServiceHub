from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.settings import settings


from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.router import api_router
from app.core.settings import settings
from app.database.session import engine


@asynccontextmanager
async def lifespan(_app: FastAPI):
    print(f"Application Name: {settings.app_name}")
    print(f"Version: {settings.app_version}")
    print(f"Environment: {settings.app_env}")

    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
        print("Database Connected Successfully")
    except Exception as exc:
        print(exc)

    yield

    await engine.dispose()


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        lifespan=lifespan,
    )

    # Open CORS for local development. Restrict in production.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router)
    return app


app = create_application()
