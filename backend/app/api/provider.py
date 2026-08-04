import uuid
from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Path, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.dependencies.auth import get_current_user
from app.dependencies.roles import require_admin, require_provider
from app.models.provider_document import ProviderDocument
from app.models.user import User
from app.repositories.provider_repository import ProviderRepository
from app.schemas.provider import (
    ApiVerificationStatus,
    ProviderApprovalRequest,
    ProviderApprovalResponse,
    ProviderProfileResponse,
    ProviderRegistrationRequest,
    ProviderRegistrationResponse,
    ProviderRejectionRequest,
    ProviderRejectionResponse,
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


def _to_api_verification_status(status: str) -> ApiVerificationStatus:
    return ApiVerificationStatus(status.upper())


async def _load_provider_documents(
    service: ProviderService,
    provider_id: uuid.UUID,
) -> list[ProviderDocument]:
    result = await service.repository.db.execute(
        select(ProviderDocument).where(ProviderDocument.provider_id == provider_id)
    )
    return list(result.scalars().all())


@provider_router.post(
    "/register",
    response_model=ProviderRegistrationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register provider profile",
    description="Create a provider profile for any authenticated user and promote their account to the provider role.",
    responses={
        status.HTTP_201_CREATED: {"description": "Provider registered successfully."},
        status.HTTP_401_UNAUTHORIZED: {"description": "Authentication required."},
        status.HTTP_409_CONFLICT: {"description": "Provider profile already exists."},
    },
)
async def register_provider(
    payload: Annotated[
        ProviderRegistrationRequest,
        Body(..., description="Provider profile details submitted during registration."),
    ],
    current_user: Annotated[User, Depends(get_current_user)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderRegistrationResponse:
    try:
        provider = await service.register_provider(current_user, payload)
    except ProviderAlreadyExistsError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    return ProviderRegistrationResponse(
        provider_id=provider.id,
        verification_status=_to_api_verification_status(provider.verification_status),
        message="Provider profile created successfully",
    )


@provider_router.get(
    "/me",
    response_model=ProviderProfileResponse,
    summary="Get current provider profile",
    description="Return the complete provider profile for the authenticated provider user.",
    responses={
        status.HTTP_200_OK: {"description": "Provider profile returned."},
        status.HTTP_404_NOT_FOUND: {"description": "Provider profile not found."},
        status.HTTP_403_FORBIDDEN: {"description": "Provider access required."},
    },
)
async def get_my_provider(
    current_user: Annotated[User, Depends(require_provider)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderProfileResponse:
    provider = await service.repository.get_provider_by_user_id(current_user.id)
    if provider is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider profile not found.",
        )

    documents = await _load_provider_documents(service, provider.id)
    return ProviderProfileResponse.from_provider(provider, documents)


@admin_router.get(
    "/pending",
    response_model=list[ProviderProfileResponse],
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
) -> list[ProviderProfileResponse]:
    providers = await service.repository.list_pending_providers()
    return [ProviderProfileResponse.from_provider(provider) for provider in providers]


@admin_router.patch(
    "/{provider_id}/approve",
    response_model=ProviderApprovalResponse,
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
    provider_id: Annotated[
        uuid.UUID,
        Path(..., description="Unique identifier of the provider profile to approve."),
    ],
    payload: Annotated[
        ProviderApprovalRequest,
        Body(..., description="Approval details including optional admin remarks."),
    ],
    current_user: Annotated[User, Depends(require_admin)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderApprovalResponse:
    try:
        await service.approve_provider(provider_id, current_user.id, payload)
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

    return ProviderApprovalResponse(message="Provider approved successfully")


@admin_router.patch(
    "/{provider_id}/reject",
    response_model=ProviderRejectionResponse,
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
    provider_id: Annotated[
        uuid.UUID,
        Path(..., description="Unique identifier of the provider profile to reject."),
    ],
    payload: Annotated[
        ProviderRejectionRequest,
        Body(..., description="Rejection details including required admin remarks."),
    ],
    current_user: Annotated[User, Depends(require_admin)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderRejectionResponse:
    try:
        await service.reject_provider(provider_id, current_user.id, payload)
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

    return ProviderRejectionResponse(message="Provider rejected")
