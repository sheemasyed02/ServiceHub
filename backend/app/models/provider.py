import uuid
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Date, Float, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel

if TYPE_CHECKING:
    from app.models.provider_document import ProviderDocument
    from app.models.user import User
    from app.models.verification_history import VerificationHistory


class Provider(BaseModel):
    __tablename__ = "providers"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
        index=True,
    )
    business_name: Mapped[str] = mapped_column(String(255), nullable=False)
    primary_service: Mapped[str] = mapped_column(String(100), nullable=False)
    secondary_services: Mapped[list[str] | None] = mapped_column(JSONB, nullable=True)
    profile_photo_url: Mapped[str | None] = mapped_column(String(512), nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    experience_years: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    rating: Mapped[float] = mapped_column(Numeric(3, 2), default=0, nullable=False)
    completed_jobs: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    verification_status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    working_radius: Mapped[float | None] = mapped_column(Float, nullable=True)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    address_line1: Mapped[str | None] = mapped_column(String(255), nullable=True)
    address_line2: Mapped[str | None] = mapped_column(String(255), nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    pincode: Mapped[str | None] = mapped_column(String(20), nullable=True)
    country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    gender: Mapped[str | None] = mapped_column(String(50), nullable=True)
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    is_available: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    user: Mapped["User"] = relationship()
    documents: Mapped[list["ProviderDocument"]] = relationship(
        back_populates="provider",
        cascade="all, delete-orphan",
    )
    verification_history: Mapped[list["VerificationHistory"]] = relationship(
        back_populates="provider",
        cascade="all, delete-orphan",
    )
