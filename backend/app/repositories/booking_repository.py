import uuid
from datetime import date, time

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.enums.booking_status import BookingStatus
from app.models.booking import Booking

BLOCKING_STATUSES = (
    BookingStatus.PENDING.value,
    BookingStatus.ACCEPTED.value,
    BookingStatus.ON_THE_WAY.value,
    BookingStatus.ARRIVED.value,
    BookingStatus.IN_PROGRESS.value,
)


class BookingRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    def _booking_query(self):
        return select(Booking).options(
            selectinload(Booking.customer),
            selectinload(Booking.provider),
        )

    @staticmethod
    def _generate_booking_number() -> str:
        return f"BK-{uuid.uuid4().hex[:12].upper()}"

    async def create_booking(
        self,
        *,
        customer_id: uuid.UUID,
        provider_id: uuid.UUID,
        service_id: uuid.UUID,
        scheduled_date: date,
        scheduled_time: time,
        problem_description: str,
        customer_address: str,
        latitude: float,
        longitude: float,
        estimated_price: float | None = None,
    ) -> Booking:
        booking = Booking(
            booking_number=self._generate_booking_number(),
            customer_id=customer_id,
            provider_id=provider_id,
            service_id=service_id,
            scheduled_date=scheduled_date,
            scheduled_time=scheduled_time,
            problem_description=problem_description,
            customer_address=customer_address,
            latitude=latitude,
            longitude=longitude,
            estimated_price=estimated_price,
            status=BookingStatus.PENDING.value,
        )
        self.db.add(booking)
        await self.db.flush()
        return await self.get_booking(booking.id)

    async def get_booking(self, booking_id: uuid.UUID) -> Booking | None:
        result = await self.db.execute(
            self._booking_query().where(
                Booking.id == booking_id,
                Booking.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none()

    async def list_customer_bookings(self, customer_id: uuid.UUID) -> list[Booking]:
        result = await self.db.execute(
            self._booking_query()
            .where(
                Booking.customer_id == customer_id,
                Booking.deleted_at.is_(None),
            )
            .order_by(Booking.scheduled_date.desc(), Booking.scheduled_time.desc())
        )
        return list(result.scalars().all())

    async def list_provider_bookings(self, provider_id: uuid.UUID) -> list[Booking]:
        result = await self.db.execute(
            self._booking_query()
            .where(
                Booking.provider_id == provider_id,
                Booking.deleted_at.is_(None),
            )
            .order_by(Booking.scheduled_date.desc(), Booking.scheduled_time.desc())
        )
        return list(result.scalars().all())

    async def update_status(
        self,
        booking_id: uuid.UUID,
        status: BookingStatus,
        cancel_reason: str | None = None,
    ) -> Booking | None:
        booking = await self.get_booking(booking_id)
        if booking is None:
            return None

        booking.status = status.value
        booking.cancel_reason = cancel_reason if status == BookingStatus.CANCELLED else None
        await self.db.flush()
        return await self.get_booking(booking.id)

    async def check_provider_availability(
        self,
        provider_id: uuid.UUID,
        scheduled_date: date,
        scheduled_time: time,
    ) -> bool:
        result = await self.db.execute(
            select(Booking.id).where(
                Booking.provider_id == provider_id,
                Booking.scheduled_date == scheduled_date,
                Booking.scheduled_time == scheduled_time,
                Booking.status.in_(BLOCKING_STATUSES),
                Booking.deleted_at.is_(None),
            )
        )
        return result.scalar_one_or_none() is None

    async def commit(self) -> None:
        await self.db.commit()
