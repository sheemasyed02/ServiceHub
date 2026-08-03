import uuid
from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class VerificationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    VERIFIED = "verified"


class ProviderRegistrationRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    bio: str | None = Field(default=None, max_length=500)
    experience_years: int = Field(default=0, ge=0)
    working_radius: float = Field(..., gt=0)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)


class ProviderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: uuid.UUID
    bio: str | None
    experience_years: int
    rating: float
    completed_jobs: int
    verification_status: VerificationStatus
    working_radius: float | None
    latitude: float | None
    longitude: float | None
    is_available: bool
    created_at: datetime
    updated_at: datetime


class ProviderDocumentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    provider_id: uuid.UUID
    document_type: str
    file_url: str
    status: VerificationStatus
    uploaded_at: datetime


class ProviderApprovalRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    remarks: str | None = Field(default=None, max_length=500)


class ProviderRejectionRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    remarks: str = Field(..., min_length=1, max_length=500)
