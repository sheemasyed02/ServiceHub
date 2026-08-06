import uuid
from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException, Path, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.provider import get_provider_service
from app.database.session import get_db
from app.dependencies.roles import require_customer, require_provider
from app.models.user import User
from app.repositories.booking_repository import BookingRepository
from app.schemas.booking import (
    BookingListResponse,
    BookingResponse,
    CreateBookingRequest,
)
from app.services.booking_service import (
    BookingNotFoundError,
    BookingPastDateError,
    BookingService,
    BookingUnauthorizedError,
    InvalidBookingStatusTransitionError,
    ProviderUnavailableError,
)
from app.services.provider_service import ProviderService

booking_router = APIRouter(prefix="/bookings", tags=["Bookings"])
provider_booking_router = APIRouter(prefix="/provider", tags=["Provider Bookings"])


class CancelBookingRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    cancel_reason: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Reason for cancelling the booking.",
    )


def get_booking_service(db: AsyncSession = Depends(get_db)) -> BookingService:
    return BookingService(BookingRepository(db))


def _map_booking_exception(exc: Exception) -> HTTPException:
    if isinstance(exc, BookingNotFoundError):
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))
    if isinstance(exc, BookingUnauthorizedError):
        return HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(exc))
    if isinstance(exc, ProviderUnavailableError):
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(exc))
    if isinstance(exc, (BookingPastDateError, InvalidBookingStatusTransitionError)):
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    raise exc


async def _get_provider_id(
    current_user: User,
    provider_service: ProviderService,
) -> uuid.UUID:
    provider = await provider_service.repository.get_provider_by_user_id(current_user.id)
    if provider is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider profile not found.",
        )
    return provider.id


@booking_router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create booking",
    description="Create a new service booking for the authenticated customer.",
)
async def create_booking(
    payload: Annotated[CreateBookingRequest, Body(...)],
    current_user: Annotated[User, Depends(require_customer)],
    service: BookingService = Depends(get_booking_service),
) -> BookingResponse:
    try:
        booking = await service.create_booking(current_user.id, payload)
    except (BookingPastDateError, ProviderUnavailableError) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)


@booking_router.get(
    "/me",
    response_model=BookingListResponse,
    summary="List my bookings",
    description="Return all bookings for the authenticated customer.",
)
async def list_my_bookings(
    current_user: Annotated[User, Depends(require_customer)],
    service: BookingService = Depends(get_booking_service),
) -> BookingListResponse:
    bookings = await service.list_customer_bookings(current_user.id)
    booking_responses = [BookingResponse.model_validate(booking) for booking in bookings]
    return BookingListResponse(bookings=booking_responses, total=len(booking_responses))


@provider_booking_router.get(
    "/bookings",
    response_model=BookingListResponse,
    summary="List provider bookings",
    description="Return all bookings assigned to the authenticated provider.",
)
async def list_provider_bookings(
    current_user: Annotated[User, Depends(require_provider)],
    booking_service: BookingService = Depends(get_booking_service),
    provider_service: ProviderService = Depends(get_provider_service),
) -> BookingListResponse:
    provider_id = await _get_provider_id(current_user, provider_service)
    bookings = await booking_service.list_provider_bookings(provider_id)
    booking_responses = [BookingResponse.model_validate(booking) for booking in bookings]
    return BookingListResponse(bookings=booking_responses, total=len(booking_responses))


@booking_router.patch(
    "/{booking_id}/accept",
    response_model=BookingResponse,
    summary="Accept booking",
    description="Provider accepts a pending booking.",
)
async def accept_booking(
    booking_id: Annotated[uuid.UUID, Path(..., description="Booking identifier.")],
    current_user: Annotated[User, Depends(require_provider)],
    booking_service: BookingService = Depends(get_booking_service),
    provider_service: ProviderService = Depends(get_provider_service),
) -> BookingResponse:
    provider_id = await _get_provider_id(current_user, provider_service)
    try:
        booking = await booking_service.accept_booking(provider_id, booking_id)
    except (
        BookingNotFoundError,
        BookingUnauthorizedError,
        InvalidBookingStatusTransitionError,
    ) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)


@booking_router.patch(
    "/{booking_id}/reject",
    response_model=BookingResponse,
    summary="Reject booking",
    description="Provider rejects a pending booking.",
)
async def reject_booking(
    booking_id: Annotated[uuid.UUID, Path(..., description="Booking identifier.")],
    current_user: Annotated[User, Depends(require_provider)],
    booking_service: BookingService = Depends(get_booking_service),
    provider_service: ProviderService = Depends(get_provider_service),
) -> BookingResponse:
    provider_id = await _get_provider_id(current_user, provider_service)
    try:
        booking = await booking_service.reject_booking(provider_id, booking_id)
    except (
        BookingNotFoundError,
        BookingUnauthorizedError,
        InvalidBookingStatusTransitionError,
    ) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)


@booking_router.patch(
    "/{booking_id}/start",
    response_model=BookingResponse,
    summary="Start booking",
    description="Provider starts an accepted booking.",
)
async def start_booking(
    booking_id: Annotated[uuid.UUID, Path(..., description="Booking identifier.")],
    current_user: Annotated[User, Depends(require_provider)],
    booking_service: BookingService = Depends(get_booking_service),
    provider_service: ProviderService = Depends(get_provider_service),
) -> BookingResponse:
    provider_id = await _get_provider_id(current_user, provider_service)
    try:
        booking = await booking_service.start_booking(provider_id, booking_id)
    except (
        BookingNotFoundError,
        BookingUnauthorizedError,
        InvalidBookingStatusTransitionError,
    ) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)


@booking_router.patch(
    "/{booking_id}/complete",
    response_model=BookingResponse,
    summary="Complete booking",
    description="Provider completes an in-progress booking.",
)
async def complete_booking(
    booking_id: Annotated[uuid.UUID, Path(..., description="Booking identifier.")],
    current_user: Annotated[User, Depends(require_provider)],
    booking_service: BookingService = Depends(get_booking_service),
    provider_service: ProviderService = Depends(get_provider_service),
) -> BookingResponse:
    provider_id = await _get_provider_id(current_user, provider_service)
    try:
        booking = await booking_service.complete_booking(provider_id, booking_id)
    except (
        BookingNotFoundError,
        BookingUnauthorizedError,
        InvalidBookingStatusTransitionError,
    ) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)


@booking_router.patch(
    "/{booking_id}/cancel",
    response_model=BookingResponse,
    summary="Cancel booking",
    description="Customer cancels a pending booking.",
)
async def cancel_booking(
    booking_id: Annotated[uuid.UUID, Path(..., description="Booking identifier.")],
    payload: Annotated[CancelBookingRequest, Body(...)],
    current_user: Annotated[User, Depends(require_customer)],
    service: BookingService = Depends(get_booking_service),
) -> BookingResponse:
    try:
        booking = await service.cancel_booking(
            current_user.id,
            booking_id,
            payload.cancel_reason,
        )
    except (
        BookingNotFoundError,
        BookingUnauthorizedError,
        InvalidBookingStatusTransitionError,
    ) as exc:
        raise _map_booking_exception(exc) from exc

    return BookingResponse.model_validate(booking)
