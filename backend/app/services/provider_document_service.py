import asyncio
import uuid

from fastapi import UploadFile

from app.models.provider_document import ProviderDocument
from app.repositories.provider_repository import ProviderRepository
from app.schemas.provider import DocumentType, VerificationStatus
from app.services.storage_service import (
    StorageConfigurationError,
    StorageService,
    StorageUploadError,
)
from app.utils.file_upload import (
    FileTooLargeError,
    InvalidFilenameError,
    InvalidFileExtensionError,
    validate_file_extension,
    validate_file_size,
)

CONTENT_TYPE_BY_EXTENSION = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
}


class ProviderDocumentService:
    def __init__(
        self,
        repository: ProviderRepository | None = None,
        storage_service: StorageService | None = None,
    ) -> None:
        self.repository = repository
        self.storage_service = storage_service or StorageService()

    async def upload_to_storage(
        self,
        *,
        provider_id: uuid.UUID,
        document_type: str,
        file: UploadFile,
    ) -> str:
        if not file.filename:
            raise InvalidFilenameError("Filename is required.")

        content = await file.read()
        validate_file_size(len(content))
        extension = validate_file_extension(file.filename)
        content_type = file.content_type or CONTENT_TYPE_BY_EXTENSION.get(
            extension,
            "application/octet-stream",
        )

        try:
            return await asyncio.to_thread(
                self.storage_service.upload_file,
                provider_id=provider_id,
                document_type=document_type,
                file_content=content,
                content_type=content_type,
                file_extension=extension,
            )
        except StorageConfigurationError as exc:
            raise StorageUploadError(str(exc)) from exc

    async def upload_document(
        self,
        *,
        provider_id: uuid.UUID,
        document_type: DocumentType,
        file: UploadFile,
    ) -> ProviderDocument:
        if self.repository is None:
            raise RuntimeError("ProviderDocumentService requires a repository for database persistence.")

        object_key = await self.upload_to_storage(
            provider_id=provider_id,
            document_type=document_type.value,
            file=file,
        )

        document = ProviderDocument(
            provider_id=provider_id,
            document_type=document_type.value,
            file_url=object_key,
            status=VerificationStatus.PENDING.value,
        )
        self.repository.db.add(document)
        await self.repository.db.flush()
        await self.repository.db.refresh(document)
        await self.repository.commit()
        return document
