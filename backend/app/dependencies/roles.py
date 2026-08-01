from typing import Annotated

from fastapi import Depends, HTTPException, status

from app.dependencies.auth import get_current_user
from app.models.user import User


async def require_customer(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if current_user.role != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customer access required.",
        )
    return current_user


async def require_provider(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if current_user.role != "provider":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Provider access required.",
        )
    return current_user


async def require_admin(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required.",
        )
    return current_user
