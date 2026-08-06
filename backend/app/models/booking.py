import uuid
from datetime import date, time
from typing import TYPE_CHECKING

from sqlalchemy import Date, Float, ForeignKey, Numeric, String, Text, Time
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.enums.booking_status import BookingStatus
from app.models.base_model import BaseModel

if TYPE_CHECKING:
    from app.models.provider import Provider
    from app.models.user import User


class Booking(BaseModel):
    __tablename__ = "bookings"

    booking_number: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    customer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    provider_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("providers.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    service_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False, index=True)
    scheduled_date: Mapped[date] = mapped_column(Date, nullable=False)
    scheduled_time: Mapped[time] = mapped_column(Time, nullable=False)
    problem_description: Mapped[str] = mapped_column(Text, nullable=False)
    customer_address: Mapped[str] = mapped_column(Text, nullable=False)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    estimated_price: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    final_price: Mapped[float | None] = mapped_column(Numeric(10, 2), nullable=True)
    status: Mapped[str] = mapped_column(
        String(50),
        default=BookingStatus.PENDING.value,
        nullable=False,
    )
    payment_status: Mapped[str] = mapped_column(String(50), default="PENDING", nullable=False)
    cancel_reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    customer: Mapped["User"] = relationship(foreign_keys=[customer_id])
    provider: Mapped["Provider"] = relationship(foreign_keys=[provider_id])
