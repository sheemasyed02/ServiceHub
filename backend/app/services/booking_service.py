import uuid
from datetime import date, datetime, time

from app.enums.booking_status import BookingStatus
from app.models.booking import Booking
from app.repositories.booking_repository import BookingRepository
from app.schemas.booking import CreateBookingRequest


class BookingNotFoundError(Exception):
    """Raised when a booking cannot be found."""


class BookingPastDateError(Exception):
    """Raised when a booking is scheduled in the past."""


class ProviderUnavailableError(Exception):
    """Raised when a provider is already booked for the requested slot."""


class InvalidBookingStatusTransitionError(Exception):
    """Raised when a booking status transition is not allowed."""


class BookingUnauthorizedError(Exception):
    """Raised when a user is not allowed to perform a booking action."""


ALLOWED_TRANSITIONS: dict[BookingStatus, set[BookingStatus]] = {
    BookingStatus.PENDING: {
        BookingStatus.ACCEPTED,
        BookingStatus.REJECTED,
        BookingStatus.CANCELLED,
    },
    BookingStatus.ACCEPTED: {BookingStatus.IN_PROGRESS},
    BookingStatus.IN_PROGRESS: {BookingStatus.COMPLETED},
}

CUSTOMER_TRANSITIONS: dict[BookingStatus, set[BookingStatus]] = {
    BookingStatus.PENDING: {BookingStatus.CANCELLED},
}

PROVIDER_TRANSITIONS: dict[BookingStatus, set[BookingStatus]] = {
    BookingStatus.PENDING: {BookingStatus.ACCEPTED, BookingStatus.REJECTED},
    BookingStatus.ACCEPTED: {BookingStatus.IN_PROGRESS},
    BookingStatus.IN_PROGRESS: {BookingStatus.COMPLETED},
}


class BookingService:
    def __init__(self, repository: BookingRepository) -> None:
        self.repository = repository

    async def create_booking(
        self,
        customer_id: uuid.UUID,
        data: CreateBookingRequest,
    ) -> Booking:
        self._validate_scheduled_datetime_not_in_past(data.scheduled_date, data.scheduled_time)

        is_available = await self.repository.check_provider_availability(
            data.provider_id,
            data.scheduled_date,
            data.scheduled_time,
        )
        if not is_available:
            raise ProviderUnavailableError(
                "Provider is not available for the selected date and time."
            )

        booking = await self.repository.create_booking(
            customer_id=customer_id,
            provider_id=data.provider_id,
            service_id=data.service_id,
            scheduled_date=data.scheduled_date,
            scheduled_time=data.scheduled_time,
            problem_description=data.problem_description,
            customer_address=data.customer_address,
            latitude=data.latitude,
            longitude=data.longitude,
        )
        await self.repository.commit()
        return booking

    async def get_booking(self, booking_id: uuid.UUID) -> Booking:
        booking = await self.repository.get_booking(booking_id)
        if booking is None:
            raise BookingNotFoundError("Booking not found.")
        return booking

    async def list_customer_bookings(self, customer_id: uuid.UUID) -> list[Booking]:
        return await self.repository.list_customer_bookings(customer_id)

    async def list_provider_bookings(self, provider_id: uuid.UUID) -> list[Booking]:
        return await self.repository.list_provider_bookings(provider_id)

    async def cancel_booking(
        self,
        customer_id: uuid.UUID,
        booking_id: uuid.UUID,
        cancel_reason: str,
    ) -> Booking:
        booking = await self.get_booking(booking_id)
        self._validate_actor(
            booking.customer_id,
            customer_id,
            message="Only the customer who created the booking can cancel it.",
        )
        return await self._update_booking_status(
            booking,
            BookingStatus.CANCELLED,
            allowed_transitions=CUSTOMER_TRANSITIONS,
            cancel_reason=cancel_reason,
        )

    async def accept_booking(self, provider_id: uuid.UUID, booking_id: uuid.UUID) -> Booking:
        booking = await self.get_booking(booking_id)
        self._validate_actor(
            booking.provider_id,
            provider_id,
            message="Only the assigned provider can accept this booking.",
        )
        return await self._update_booking_status(
            booking,
            BookingStatus.ACCEPTED,
            allowed_transitions=PROVIDER_TRANSITIONS,
        )

    async def reject_booking(self, provider_id: uuid.UUID, booking_id: uuid.UUID) -> Booking:
        booking = await self.get_booking(booking_id)
        self._validate_actor(
            booking.provider_id,
            provider_id,
            message="Only the assigned provider can reject this booking.",
        )
        return await self._update_booking_status(
            booking,
            BookingStatus.REJECTED,
            allowed_transitions=PROVIDER_TRANSITIONS,
        )

    async def start_booking(self, provider_id: uuid.UUID, booking_id: uuid.UUID) -> Booking:
        booking = await self.get_booking(booking_id)
        self._validate_actor(
            booking.provider_id,
            provider_id,
            message="Only the assigned provider can start this booking.",
        )
        return await self._update_booking_status(
            booking,
            BookingStatus.IN_PROGRESS,
            allowed_transitions=PROVIDER_TRANSITIONS,
        )

    async def complete_booking(self, provider_id: uuid.UUID, booking_id: uuid.UUID) -> Booking:
        booking = await self.get_booking(booking_id)
        self._validate_actor(
            booking.provider_id,
            provider_id,
            message="Only the assigned provider can complete this booking.",
        )
        return await self._update_booking_status(
            booking,
            BookingStatus.COMPLETED,
            allowed_transitions=PROVIDER_TRANSITIONS,
        )

    async def _update_booking_status(
        self,
        booking: Booking,
        new_status: BookingStatus,
        *,
        allowed_transitions: dict[BookingStatus, set[BookingStatus]],
        cancel_reason: str | None = None,
    ) -> Booking:
        current_status = BookingStatus(booking.status)
        self._validate_status_transition(
            current_status,
            new_status,
            allowed_transitions=allowed_transitions,
        )

        updated_booking = await self.repository.update_status(
            booking.id,
            new_status,
            cancel_reason=cancel_reason,
        )
        if updated_booking is None:
            raise BookingNotFoundError("Booking not found.")

        await self.repository.commit()
        return updated_booking

    @staticmethod
    def _validate_scheduled_datetime_not_in_past(
        scheduled_date: date,
        scheduled_time: time,
    ) -> None:
        scheduled_datetime = datetime.combine(scheduled_date, scheduled_time)
        if scheduled_datetime < datetime.now().replace(tzinfo=None):
            raise BookingPastDateError("Booking cannot be scheduled in the past.")

    @staticmethod
    def _validate_status_transition(
        current_status: BookingStatus,
        new_status: BookingStatus,
        *,
        allowed_transitions: dict[BookingStatus, set[BookingStatus]],
    ) -> None:
        global_allowed = ALLOWED_TRANSITIONS.get(current_status, set())
        role_allowed = allowed_transitions.get(current_status, set())

        if new_status not in global_allowed:
            raise InvalidBookingStatusTransitionError(
                f"Cannot transition booking from {current_status.value} to {new_status.value}."
            )

        if new_status not in role_allowed:
            raise BookingUnauthorizedError(
                f"You are not allowed to change booking status from "
                f"{current_status.value} to {new_status.value}."
            )

    @staticmethod
    def _validate_actor(
        expected_id: uuid.UUID,
        actor_id: uuid.UUID,
        *,
        message: str,
    ) -> None:
        if expected_id != actor_id:
            raise BookingUnauthorizedError(message)
