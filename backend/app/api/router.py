from fastapi import APIRouter

from app.api.auth import router as auth_router
from app.api.test_roles import router as test_roles_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(test_roles_router)


@api_router.get("/", tags=["root"])
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Service Marketplace API"}


@api_router.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "healthy"}
