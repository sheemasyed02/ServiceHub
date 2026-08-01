from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies.roles import require_admin, require_customer, require_provider
from app.models.user import User

router = APIRouter(tags=["Role Tests"])


@router.get("/customer/dashboard")
async def customer_dashboard(
    current_user: Annotated[User, Depends(require_customer)],
) -> dict[str, str]:
    return {
        "message": "Welcome to the customer dashboard.",
        "role": current_user.role,
        "email": current_user.email,
    }


@router.get("/provider/dashboard")
async def provider_dashboard(
    current_user: Annotated[User, Depends(require_provider)],
) -> dict[str, str]:
    return {
        "message": "Welcome to the provider dashboard.",
        "role": current_user.role,
        "email": current_user.email,
    }


@router.get("/admin/dashboard")
async def admin_dashboard(
    current_user: Annotated[User, Depends(require_admin)],
) -> dict[str, str]:
    return {
        "message": "Welcome to the admin dashboard.",
        "role": current_user.role,
        "email": current_user.email,
    }
