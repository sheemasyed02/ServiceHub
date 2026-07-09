from fastapi import APIRouter

api_router = APIRouter()


@api_router.get("/", tags=["root"])
def read_root() -> dict[str, str]:
    return {"message": "Welcome to Service Marketplace API"}


@api_router.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    return {"status": "healthy"}
