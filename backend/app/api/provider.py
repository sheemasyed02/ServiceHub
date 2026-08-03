import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.dependencies.roles import require_admin, require_provider
from app.models.user import User
from app.repositories.provider_repository import ProviderRepository
from app.schemas.provider import (
    ProviderApprovalRequest,
    ProviderRegistrationRequest,
    ProviderRejectionRequest,
    ProviderResponse,
)
from app.services.provider_service import (
    ProviderAlreadyExistsError,
    ProviderNotFoundError,
    ProviderNotPendingError,
    ProviderService,
)

provider_router = APIRouter(prefix="/providers", tags=["Providers"])
admin_router = APIRouter(prefix="/admin/providers", tags=["Admin Providers"])


def get_provider_service(db: AsyncSession = Depends(get_db)) -> ProviderService:
    return ProviderService(ProviderRepository(db))


@provider_router.post(
    "/register",
    response_model=ProviderResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register provider profile",
    description="Create a provider profile for the authenticated provider user.",
    responses={
        status.HTTP_201_CREATED: {"description": "Provider registered successfully."},
        status.HTTP_409_CONFLICT: {"description": "Provider profile already exists."},
        status.HTTP_403_FORBIDDEN: {"description": "Provider access required."},
    },
)
async def register_provider(
    payload: ProviderRegistrationRequest,
    current_user: Annotated[User, Depends(require_provider)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderResponse:
    try:
        provider = await service.register_provider(current_user.id, payload)
    except ProviderAlreadyExistsError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    return ProviderResponse.model_validate(provider)


@provider_router.get(
    "/me",
    response_model=ProviderResponse,
    summary="Get current provider profile",
    description="Return the provider profile for the authenticated provider user.",
    responses={
        status.HTTP_200_OK: {"description": "Provider profile returned."},
        status.HTTP_404_NOT_FOUND: {"description": "Provider profile not found."},
        status.HTTP_403_FORBIDDEN: {"description": "Provider access required."},
    },
)
async def get_my_provider(
    current_user: Annotated[User, Depends(require_provider)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderResponse:
    provider = await service.repository.get_provider_by_user_id(current_user.id)
    if provider is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider profile not found.",
        )

    return ProviderResponse.model_validate(provider)


@admin_router.get(
    "/pending",
    response_model=list[ProviderResponse],
    summary="List pending providers",
    description="Return all provider profiles awaiting admin verification.",
    responses={
        status.HTTP_200_OK: {"description": "Pending providers returned."},
        status.HTTP_403_FORBIDDEN: {"description": "Admin access required."},
    },
)
async def list_pending_providers(
    _: Annotated[User, Depends(require_admin)],
    service: ProviderService = Depends(get_provider_service),
) -> list[ProviderResponse]:
    providers = await service.repository.list_pending_providers()
    return [ProviderResponse.model_validate(provider) for provider in providers]


@admin_router.patch(
    "/{provider_id}/approve",
    response_model=ProviderResponse,
    summary="Approve provider",
    description="Approve a pending provider profile.",
    responses={
        status.HTTP_200_OK: {"description": "Provider approved."},
        status.HTTP_404_NOT_FOUND: {"description": "Provider not found."},
        status.HTTP_400_BAD_REQUEST: {"description": "Provider is not pending."},
        status.HTTP_403_FORBIDDEN: {"description": "Admin access required."},
    },
)
async def approve_provider(
    provider_id: uuid.UUID,
    payload: ProviderApprovalRequest,
    current_user: Annotated[User, Depends(require_admin)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderResponse:
    try:
        provider = await service.approve_provider(provider_id, current_user.id, payload)
    except ProviderNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except ProviderNotPendingError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return ProviderResponse.model_validate(provider)


@admin_router.patch(
    "/{provider_id}/reject",
    response_model=ProviderResponse,
    summary="Reject provider",
    description="Reject a pending provider profile.",
    responses={
        status.HTTP_200_OK: {"description": "Provider rejected."},
        status.HTTP_404_NOT_FOUND: {"description": "Provider not found."},
        status.HTTP_400_BAD_REQUEST: {"description": "Provider is not pending."},
        status.HTTP_403_FORBIDDEN: {"description": "Admin access required."},
    },
)
async def reject_provider(
    provider_id: uuid.UUID,
    payload: ProviderRejectionRequest,
    current_user: Annotated[User, Depends(require_admin)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderResponse:
    try:
        provider = await service.reject_provider(provider_id, current_user.id, payload)
    except ProviderNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except ProviderNotPendingError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    return ProviderResponse.model_validate(provider)
