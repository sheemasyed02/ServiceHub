import uuid
from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.enums.booking_status import BookingStatus


class CreateBookingRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    provider_id: uuid.UUID = Field(..., description="Provider assigned to the booking.")
    service_id: uuid.UUID = Field(..., description="Service being requested.")
    scheduled_date: date = Field(..., description="Date the service is scheduled for.")
    scheduled_time: time = Field(..., description="Time the service is scheduled for.")
    problem_description: str = Field(
        ...,
        min_length=1,
        max_length=1000,
        description="Description of the customer's problem.",
    )
    customer_address: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Address where the service will be performed.",
    )
    latitude: float = Field(..., ge=-90, le=90, description="Service location latitude.")
    longitude: float = Field(..., ge=-180, le=180, description="Service location longitude.")

    @field_validator("scheduled_date")
    @classmethod
    def validate_scheduled_date_not_in_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Scheduled date cannot be in the past.")
        return value


class BookingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    booking_number: str
    customer_id: uuid.UUID
    provider_id: uuid.UUID
    service_id: uuid.UUID
    scheduled_date: date
    scheduled_time: time
    problem_description: str
    customer_address: str
    latitude: float | None
    longitude: float | None
    estimated_price: float | None
    final_price: float | None
    status: BookingStatus
    payment_status: str
    cancel_reason: str | None
    created_at: datetime
    updated_at: datetime

    @field_validator("status", mode="before")
    @classmethod
    def normalize_status(cls, value: str | BookingStatus) -> BookingStatus:
        if isinstance(value, BookingStatus):
            return value
        return BookingStatus(value)


class BookingStatusUpdate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    status: BookingStatus = Field(..., description="Updated booking status.")
    cancel_reason: str | None = Field(
        default=None,
        max_length=500,
        description="Reason for cancellation, required when status is CANCELLED.",
    )

    @model_validator(mode="after")
    def validate_cancel_reason(self) -> "BookingStatusUpdate":
        if self.status == BookingStatus.CANCELLED and not self.cancel_reason:
            raise ValueError("Cancel reason is required when status is CANCELLED.")
        return self


class BookingListResponse(BaseModel):
    bookings: list[BookingResponse] = Field(
        default_factory=list,
        description="List of bookings.",
    )
    total: int = Field(..., ge=0, description="Total number of bookings returned.")
