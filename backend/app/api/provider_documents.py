import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.api.provider import get_provider_service
from app.dependencies.roles import require_provider
from app.models.provider_document import ProviderDocument
from app.models.user import User
from app.schemas.provider import (
    DocumentType,
    ProviderDocumentUploadResponse,
    VerificationStatus,
)
from app.services.provider_service import ProviderService
from app.utils.file_upload import (
    FileTooLargeError,
    InvalidFilenameError,
    InvalidFileExtensionError,
    save_provider_upload_file,
)

router = APIRouter(prefix="/providers", tags=["Provider Documents"])


async def _create_provider_document(
    service: ProviderService,
    *,
    provider_id: uuid.UUID,
    document_type: DocumentType,
    file_path: str,
) -> ProviderDocument:
    document = ProviderDocument(
        provider_id=provider_id,
        document_type=document_type.value,
        file_url=file_path,
        status=VerificationStatus.PENDING.value,
    )
    service.repository.db.add(document)
    await service.repository.db.flush()
    await service.repository.db.refresh(document)
    await service.repository.commit()
    return document


@router.post(
    "/documents",
    response_model=ProviderDocumentUploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload provider document",
    description=(
        "Upload a verification document for the authenticated provider profile. "
        "Accepted file types: jpg, jpeg, png, pdf. Maximum file size: 5 MB."
    ),
    responses={
        status.HTTP_201_CREATED: {"description": "Document uploaded successfully."},
        status.HTTP_400_BAD_REQUEST: {"description": "Invalid file or document type."},
        status.HTTP_404_NOT_FOUND: {"description": "Provider profile not found."},
        status.HTTP_403_FORBIDDEN: {"description": "Provider access required."},
    },
)
async def upload_provider_document(
    document_type: Annotated[
        DocumentType,
        Form(
            ...,
            description=(
                "Type of document being uploaded. "
                "Allowed values: AADHAAR, PAN, PROFILE_PHOTO, "
                "EXPERIENCE_CERTIFICATE, TRADE_LICENSE."
            ),
        ),
    ],
    file: Annotated[
        UploadFile,
        File(..., description="Document file to upload (jpg, jpeg, png, or pdf)."),
    ],
    current_user: Annotated[User, Depends(require_provider)],
    service: ProviderService = Depends(get_provider_service),
) -> ProviderDocumentUploadResponse:
    provider = await service.repository.get_provider_by_user_id(current_user.id)
    if provider is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider profile not found.",
        )

    try:
        file_path = await save_provider_upload_file(
            provider.id,
            file,
            document_type=document_type.value,
        )
    except (InvalidFileExtensionError, FileTooLargeError, InvalidFilenameError) as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc

    await _create_provider_document(
        service,
        provider_id=provider.id,
        document_type=document_type,
        file_path=file_path,
    )

    return ProviderDocumentUploadResponse(
        message="Document uploaded successfully",
        document_type=document_type,
        file_path=file_path,
    )
