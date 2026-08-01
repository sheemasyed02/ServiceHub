import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
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
    description=(
        "Authenticate using the OAuth2 password flow. "
        "Enter your **email address** in the `username` field and your account password."
    ),
    openapi_extra={
        "requestBody": {
            "required": True,
            "content": {
                "application/x-www-form-urlencoded": {
                    "schema": {
                        "type": "object",
                        "required": ["username", "password"],
                        "properties": {
                            "grant_type": {
                                "type": "string",
                                "default": "password",
                                "description": "OAuth2 grant type. Use `password` for login.",
                            },
                            "username": {
                                "type": "string",
                                "format": "email",
                                "title": "Email",
                                "description": "User email address. OAuth2 requires this field to be named `username`.",
                                "example": "user@example.com",
                            },
                            "password": {
                                "type": "string",
                                "format": "password",
                                "description": "Account password.",
                            },
                            "scope": {
                                "type": "string",
                                "description": "Optional OAuth2 scopes.",
                                "default": "",
                            },
                            "client_id": {
                                "type": "string",
                                "description": "Optional OAuth2 client ID.",
                            },
                            "client_secret": {
                                "type": "string",
                                "format": "password",
                                "description": "Optional OAuth2 client secret.",
                            },
                        },
                    }
                }
            },
        }
    },
    responses={
        status.HTTP_200_OK: {"description": "Login successful."},
        status.HTTP_401_UNAUTHORIZED: {"description": "Invalid credentials."},
        status.HTTP_422_UNPROCESSABLE_CONTENT: {"description": "Validation error."},
    },
)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    service: AuthService = Depends(get_auth_service),
) -> TokenResponse:
    try:
        return await service.login(
            LoginRequest(email=form_data.username, password=form_data.password)
        )
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(exc),
        ) from exc
