import uuid
from datetime import date, datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field

from app.models.provider import Provider
from app.models.provider_document import ProviderDocument


class VerificationStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    VERIFIED = "verified"


class ApiVerificationStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    VERIFIED = "VERIFIED"


class DocumentType(str, Enum):
    AADHAAR = "AADHAAR"
    PAN = "PAN"
    PROFILE_PHOTO = "PROFILE_PHOTO"
    EXPERIENCE_CERTIFICATE = "EXPERIENCE_CERTIFICATE"
    TRADE_LICENSE = "TRADE_LICENSE"


class ProviderRegistrationRequest(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        json_schema_extra={
            "example": {
                "business_name": "Spark Electric Services",
                "primary_service": "Electrical Repair",
                "secondary_services": ["Wiring", "Appliance Installation"],
                "bio": "Experienced electrician with 5 years in residential wiring.",
                "experience_years": 5,
                "working_radius": 15,
                "latitude": 17.3850,
                "longitude": 78.4867,
                "address_line1": "123 Main Street",
                "address_line2": "Suite 4B",
                "city": "Hyderabad",
                "state": "Telangana",
                "pincode": "500001",
                "country": "India",
                "gender": "male",
                "date_of_birth": "1990-05-15",
            }
        },
    )

    business_name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Registered or trading business name.",
    )
    primary_service: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Main service category offered by the provider.",
    )
    secondary_services: list[str] | None = Field(
        default=None,
        description="Additional service categories offered by the provider.",
    )
    profile_photo_url: str | None = Field(
        default=None,
        max_length=512,
        description="URL or relative path to the provider profile photo.",
    )
    bio: str | None = Field(
        default=None,
        max_length=500,
        description="Short provider biography.",
    )
    experience_years: int = Field(
        default=0,
        ge=0,
        description="Years of professional experience.",
    )
    working_radius: float = Field(
        ...,
        gt=0,
        description="Service coverage radius in kilometers.",
    )
    latitude: float = Field(
        ...,
        ge=-90,
        le=90,
        description="Provider base location latitude.",
    )
    longitude: float = Field(
        ...,
        ge=-180,
        le=180,
        description="Provider base location longitude.",
    )
    address_line1: str | None = Field(
        default=None,
        max_length=255,
        description="Primary address line.",
    )
    address_line2: str | None = Field(
        default=None,
        max_length=255,
        description="Secondary address line.",
    )
    city: str | None = Field(
        default=None,
        max_length=100,
        description="City of the provider's business address.",
    )
    state: str | None = Field(
        default=None,
        max_length=100,
        description="State or province of the provider's business address.",
    )
    pincode: str | None = Field(
        default=None,
        max_length=20,
        description="Postal or ZIP code.",
    )
    country: str | None = Field(
        default=None,
        max_length=100,
        description="Country of the provider's business address.",
    )
    gender: str | None = Field(
        default=None,
        max_length=50,
        description="Provider gender.",
    )
    date_of_birth: date | None = Field(
        default=None,
        description="Provider date of birth.",
    )


class ProviderRegistrationResponse(BaseModel):
    provider_id: uuid.UUID = Field(..., description="Unique identifier of the created provider profile.")
    verification_status: ApiVerificationStatus = Field(
        ...,
        description="Current verification status of the provider profile.",
    )
    message: str = Field(
        default="Provider profile created successfully",
        description="Outcome message for the registration request.",
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "provider_id": "35d432d0-ca51-49cf-958a-908bd0fc85ac",
                "verification_status": "PENDING",
                "message": "Provider profile created successfully",
            }
        }
    )


class ProviderResponse(BaseModel):
    provider_id: uuid.UUID = Field(..., description="Unique provider profile identifier.")
    full_name: str = Field(..., description="Full name from the authenticated user account.")
    email: str = Field(..., description="Email address from the authenticated user account.")
    phone: str = Field(..., description="Phone number from the authenticated user account.")
    business_name: str = Field(..., description="Registered or trading business name.")
    primary_service: str = Field(..., description="Main service category offered by the provider.")
    secondary_services: list[str] | None = Field(
        default=None,
        description="Additional service categories offered by the provider.",
    )
    verification_status: ApiVerificationStatus = Field(
        ...,
        description="Current verification status of the provider profile.",
    )
    rating: float = Field(..., description="Average provider rating.")
    completed_jobs: int = Field(..., description="Total completed jobs.")
    experience_years: int = Field(..., description="Years of professional experience.")
    bio: str | None = Field(None, description="Provider biography.")
    working_radius: float | None = Field(None, description="Service coverage radius in kilometers.")
    latitude: float | None = Field(None, description="Provider base location latitude.")
    longitude: float | None = Field(None, description="Provider base location longitude.")

    @classmethod
    def from_provider(cls, provider: Provider) -> "ProviderResponse":
        return cls(
            provider_id=provider.id,
            full_name=provider.user.full_name,
            email=provider.user.email,
            phone=provider.user.phone,
            business_name=provider.business_name,
            primary_service=provider.primary_service,
            secondary_services=provider.secondary_services,
            verification_status=ApiVerificationStatus(provider.verification_status.upper()),
            rating=float(provider.rating),
            completed_jobs=provider.completed_jobs,
            experience_years=provider.experience_years,
            bio=provider.bio,
            working_radius=provider.working_radius,
            latitude=provider.latitude,
            longitude=provider.longitude,
        )


class ProviderDocumentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID = Field(..., description="Unique document identifier.")
    provider_id: uuid.UUID = Field(..., description="Provider profile this document belongs to.")
    document_type: str = Field(..., description="Type of uploaded document.")
    file_url: str = Field(..., description="Relative path or URL to the uploaded file.")
    status: VerificationStatus = Field(..., description="Verification status of the document.")
    uploaded_at: datetime = Field(..., description="Timestamp when the document was uploaded.")


class ProviderProfileResponse(ProviderResponse):
    profile_photo_url: str | None = Field(None, description="URL or relative path to the provider profile photo.")
    address_line1: str | None = Field(None, description="Primary address line.")
    address_line2: str | None = Field(None, description="Secondary address line.")
    city: str | None = Field(None, description="City of the provider's business address.")
    state: str | None = Field(None, description="State or province of the provider's business address.")
    pincode: str | None = Field(None, description="Postal or ZIP code.")
    country: str | None = Field(None, description="Country of the provider's business address.")
    gender: str | None = Field(None, description="Provider gender.")
    date_of_birth: date | None = Field(None, description="Provider date of birth.")
    is_available: bool = Field(..., description="Whether the provider is currently available for jobs.")
    created_at: datetime = Field(..., description="Profile creation timestamp.")
    updated_at: datetime = Field(..., description="Profile last update timestamp.")
    documents: list[ProviderDocumentResponse] = Field(
        default_factory=list,
        description="Verification documents uploaded by the provider.",
    )

    @classmethod
    def from_provider(
        cls,
        provider: Provider,
        documents: list[ProviderDocument] | None = None,
    ) -> "ProviderProfileResponse":
        base = ProviderResponse.from_provider(provider)
        return cls(
            **base.model_dump(),
            profile_photo_url=provider.profile_photo_url,
            address_line1=provider.address_line1,
            address_line2=provider.address_line2,
            city=provider.city,
            state=provider.state,
            pincode=provider.pincode,
            country=provider.country,
            gender=provider.gender,
            date_of_birth=provider.date_of_birth,
            is_available=provider.is_available,
            created_at=provider.created_at,
            updated_at=provider.updated_at,
            documents=[
                ProviderDocumentResponse.model_validate(document)
                for document in (documents or [])
            ],
        )


class ProviderDocumentUploadResponse(BaseModel):
    message: str = Field(
        default="Document uploaded successfully",
        description="Outcome message for the upload request.",
    )
    document_type: DocumentType = Field(..., description="Type of document that was uploaded.")
    file_path: str = Field(..., description="Relative path to the uploaded file.")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "message": "Document uploaded successfully",
                "document_type": "AADHAAR",
                "file_path": "uploads/providers/35d432d0-ca51-49cf-958a-908bd0fc85ac/file.pdf",
            }
        }
    )


class ProviderApprovalRequest(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        json_schema_extra={"example": {"remarks": "Verified successfully"}},
    )

    remarks: str | None = Field(
        default=None,
        max_length=500,
        description="Optional admin remarks for the approval decision.",
    )


class ProviderRejectionRequest(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        json_schema_extra={
            "example": {
                "remarks": "Photo is blurry. Please upload a clearer Aadhaar.",
            }
        },
    )

    remarks: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Required admin remarks explaining the rejection reason.",
    )


class ProviderApprovalResponse(BaseModel):
    message: str = Field(
        default="Provider approved successfully",
        description="Outcome message for the approval request.",
    )

    model_config = ConfigDict(
        json_schema_extra={"example": {"message": "Provider approved successfully"}}
    )


class ProviderRejectionResponse(BaseModel):
    message: str = Field(
        default="Provider rejected",
        description="Outcome message for the rejection request.",
    )

    model_config = ConfigDict(json_schema_extra={"example": {"message": "Provider rejected"}})
