import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, ConfigDict, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.services.auth_service import (
    AuthService,
    DuplicateEmailError,
    InvalidCredentialsError,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


class RegisterResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    full_name: str
    email: EmailStr
    message: str = "User registered successfully."


def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    return AuthService(AuthRepository(db))


@router.post(
    "/register",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Create a new user account with email, phone, and password.",
    responses={
        status.HTTP_201_CREATED: {"description": "User registered successfully."},
        status.HTTP_409_CONFLICT: {"description": "Email is already registered."},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"description": "Validation error."},
    },
)
async def register(
    payload: RegisterRequest,
    service: AuthService = Depends(get_auth_service),
) -> RegisterResponse:
    try:
        user = await service.register(payload)
    except DuplicateEmailError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    return RegisterResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login user",
    description="Authenticate a user with email and password and return JWT tokens.",
    responses={
        status.HTTP_200_OK: {"description": "Login successful."},
        status.HTTP_401_UNAUTHORIZED: {"description": "Invalid credentials."},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"description": "Validation error."},
    },
)
async def login(
    payload: LoginRequest,
    service: AuthService = Depends(get_auth_service),
) -> TokenResponse:
    try:
        return await service.login(payload)
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc
