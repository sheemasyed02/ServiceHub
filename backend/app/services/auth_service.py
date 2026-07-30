from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse


class DuplicateEmailError(Exception):
    """Raised when attempting to register with an email that already exists."""


class InvalidCredentialsError(Exception):
    """Raised when login credentials are invalid."""


class AuthService:
    def __init__(self, repository: AuthRepository) -> None:
        self.repository = repository

    async def register(self, data: RegisterRequest):
        if await self.repository.email_exists(str(data.email)):
            raise DuplicateEmailError("Email is already registered.")

        password_hash = hash_password(data.password)
        user = await self.repository.create_user(
            full_name=data.full_name,
            email=str(data.email),
            phone=data.phone,
            password_hash=password_hash,
        )
        await self.repository.commit()
        return user

    async def login(self, data: LoginRequest) -> TokenResponse:
        user = await self.repository.find_by_email(str(data.email))

        if user is None or not verify_password(data.password, user.password_hash):
            raise InvalidCredentialsError("Invalid email or password.")

        if user.status != "active":
            raise InvalidCredentialsError("Account is not active.")

        subject = str(user.id)
        access_token = create_access_token(subject)
        refresh_token = create_refresh_token(subject)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
        )
