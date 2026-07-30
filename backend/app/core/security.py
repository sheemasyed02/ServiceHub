from datetime import UTC, datetime, timedelta
from typing import Any

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class TokenValidationError(Exception):
    """Raised when a JWT is invalid, expired, or has an unexpected type."""


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def _get_jwt_secret() -> str:
    secret = settings.jwt_secret.get_secret_value()
    if not secret:
        raise RuntimeError("JWT_SECRET_KEY is not configured.")
    return secret


def _create_token(
    *,
    subject: str,
    token_type: str,
    expires_delta: timedelta,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    now = datetime.now(UTC)
    expire = now + expires_delta

    payload: dict[str, Any] = {
        "sub": subject,
        "type": token_type,
        "iat": int(now.timestamp()),
        "exp": int(expire.timestamp()),
    }

    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(
        payload,
        _get_jwt_secret(),
        algorithm=settings.jwt_algorithm,
    )


def create_access_token(
    subject: str,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    return _create_token(
        subject=subject,
        token_type="access",
        expires_delta=timedelta(minutes=settings.access_token_expiry_minutes),
        extra_claims=extra_claims,
    )


def create_refresh_token(
    subject: str,
    extra_claims: dict[str, Any] | None = None,
) -> str:
    return _create_token(
        subject=subject,
        token_type="refresh",
        expires_delta=timedelta(days=settings.refresh_token_expiry_days),
        extra_claims=extra_claims,
    )


def verify_token(token: str, expected_type: str | None = None) -> dict[str, Any]:
    try:
        payload = jwt.decode(
            token,
            _get_jwt_secret(),
            algorithms=[settings.jwt_algorithm],
        )
    except JWTError as exc:
        raise TokenValidationError("Invalid or expired token.") from exc

    token_type = payload.get("type")
    if expected_type and token_type != expected_type:
        raise TokenValidationError(f"Expected token type '{expected_type}'.")

    if payload.get("sub") is None:
        raise TokenValidationError("Token subject is missing.")

    return payload


def verify_access_token(token: str) -> dict[str, Any]:
    return verify_token(token, expected_type="access")


def verify_refresh_token(token: str) -> dict[str, Any]:
    return verify_token(token, expected_type="refresh")
