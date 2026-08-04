import uuid
from pathlib import Path

from fastapi import UploadFile

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".pdf"}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
UPLOADS_ROOT = Path("uploads")
PROVIDERS_UPLOAD_ROOT = UPLOADS_ROOT / "providers"


class InvalidFileExtensionError(Exception):
    """Raised when an uploaded file has an unsupported extension."""


class FileTooLargeError(Exception):
    """Raised when an uploaded file exceeds the allowed size."""


class InvalidFilenameError(Exception):
    """Raised when an uploaded file does not include a valid filename."""


def validate_file_extension(filename: str) -> str:
    if not filename or not filename.strip():
        raise InvalidFilenameError("Filename is required.")

    extension = Path(filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        allowed = ", ".join(sorted(ext.lstrip(".") for ext in ALLOWED_EXTENSIONS))
        raise InvalidFileExtensionError(
            f"Unsupported file type. Allowed extensions: {allowed}."
        )

    return extension


def validate_file_size(file_size: int) -> None:
    if file_size <= 0:
        raise FileTooLargeError("File is empty.")

    if file_size > MAX_FILE_SIZE_BYTES:
        raise FileTooLargeError("File exceeds the maximum allowed size of 5 MB.")


def generate_unique_filename(filename: str) -> str:
    extension = validate_file_extension(filename)
    return f"{uuid.uuid4()}{extension}"


def get_provider_upload_dir(provider_id: uuid.UUID) -> Path:
    return PROVIDERS_UPLOAD_ROOT / str(provider_id)


def ensure_provider_upload_dir(provider_id: uuid.UUID) -> Path:
    upload_dir = get_provider_upload_dir(provider_id)
    upload_dir.mkdir(parents=True, exist_ok=True)
    return upload_dir


def save_provider_file(
    provider_id: uuid.UUID,
    *,
    filename: str,
    content: bytes,
) -> str:
    validate_file_size(len(content))
    unique_filename = generate_unique_filename(filename)
    upload_dir = ensure_provider_upload_dir(provider_id)
    destination = upload_dir / unique_filename
    destination.write_bytes(content)

    return str(Path("uploads") / "providers" / str(provider_id) / unique_filename).replace("\\", "/")


async def save_provider_upload_file(
    provider_id: uuid.UUID,
    file: UploadFile,
    *,
    document_type: str = "DOCUMENT",
) -> str:
    from app.services.provider_document_service import ProviderDocumentService

    document_service = ProviderDocumentService()
    return await document_service.upload_to_storage(
        provider_id=provider_id,
        document_type=document_type,
        file=file,
    )
